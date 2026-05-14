routerAdd(
  'POST',
  '/backend/v1/checkout/service',
  (e) => {
    const body = e.requestInfo().body
    const { isManual, manualForm, svcForm, selectedProducts, packageToConsume } = body

    let finalServicePrice = Number(svcForm.service_price) || 0

    $app.runInTransaction((txApp) => {
      let feePerc = 0
      try {
        if (svcForm.payment_method) {
          let pmType = svcForm.payment_method
          if (pmType === 'credito') pmType = 'credit_card'
          if (pmType === 'debito') pmType = 'debit_card'
          const pm = txApp.findFirstRecordByData('payment_methods', 'type', pmType)
          feePerc = pm.getFloat('fee_percentage') || 0
        }
      } catch (_) {}
      const feeMultiplier = 1 - feePerc / 100
      const netServicePrice = finalServicePrice * feeMultiplier

      let apt
      let clientId = ''
      let barberId = ''

      // 1. Appointment Management
      if (isManual) {
        if (!manualForm.client_id || !manualForm.barber_id)
          throw new Error('Cliente ou profissional ausente.')
        clientId = manualForm.client_id
        barberId = manualForm.barber_id

        if (manualForm.service_id) {
          const col = txApp.findCollectionByNameOrId('appointments')
          apt = new Record(col)
          apt.set('client_id', clientId)
          apt.set('barber_id', barberId)
          apt.set('service_id', manualForm.service_id)
          apt.set('status', 'Concluído')
          apt.set('date', new Date().toISOString().split('T')[0] + ' 12:00:00')
          apt.set('time', '12:00')
          apt.set('price', finalServicePrice)
          txApp.save(apt)
        }
      } else {
        apt = txApp.findRecordById('appointments', svcForm.appointment_id)
        clientId = apt.getString('client_id')
        barberId = apt.getString('barber_id')

        let finalPackageId = apt.getString('client_package_id')
        if (packageToConsume) {
          finalPackageId = packageToConsume
          const cp = txApp.findRecordById('client_packages', packageToConsume)
          cp.set('remaining_uses', Math.max(0, cp.getInt('remaining_uses') - 1))
          txApp.save(cp)
        } else if (finalPackageId) {
          const cp = txApp.findRecordById('client_packages', finalPackageId)
          cp.set('remaining_uses', Math.max(0, cp.getInt('remaining_uses') - 1))
          txApp.save(cp)
        }

        if (finalPackageId) {
          finalServicePrice = 0
        }

        apt.set('status', 'Concluído')
        apt.set('price', finalServicePrice)
        if (finalPackageId) apt.set('client_package_id', finalPackageId)
        txApp.save(apt)
      }

      // 2. Commissions & Products
      const now = new Date().toISOString().replace('T', ' ').substring(0, 19)

      const barber = txApp.findRecordById('barbers', barberId)
      const workLevel = barber.getString('work_level') || 'autonomo'

      let status = 'pending'
      let due_date = ''

      if (workLevel === 'socio') {
        status = 'available'
        due_date = now
      } else {
        const aptDateStr = apt ? apt.getString('date') : ''
        const txDate = aptDateStr ? new Date(aptDateStr) : new Date()
        const day = txDate.getDay()
        let daysToAdd = 0
        if (day >= 0 && day <= 3) {
          daysToAdd = 4 - day
        } else {
          daysToAdd = 8 - day
        }
        const d = new Date(txDate)
        d.setDate(d.getDate() + daysToAdd)
        due_date = d.toISOString().replace('T', ' ').substring(0, 19)
      }

      // Service Commission
      if (apt && finalServicePrice > 0) {
        let commAmount = 0

        if (workLevel === 'socio') {
          commAmount = netServicePrice
        } else {
          const svcId = apt.getString('service_id')
          if (svcId) {
            const svc = txApp.findRecordById('services', svcId)
            const catId = svc.getString('category_id')
            if (catId) {
              const cat = txApp.findRecordById('categories', catId)
              const perc = cat.getFloat('commission_percentage') || 0
              commAmount = netServicePrice * (perc / 100)
            } else {
              commAmount =
                barber.getString('commission_type') === 'percentage'
                  ? netServicePrice * (barber.getFloat('commission_value') / 100)
                  : Math.min(netServicePrice, barber.getFloat('commission_value'))
            }
          }
        }

        if (commAmount > 0) {
          const commCol = txApp.findCollectionByNameOrId('commissions')
          const c = new Record(commCol)
          c.set('barber_id', barberId)
          c.set('amount', commAmount)
          c.set('type', 'service')
          c.set('date', now)
          c.set('is_advance', false)
          c.set('payment_method', svcForm.payment_method)
          c.set('status', status)
          if (due_date) c.set('due_date', due_date)
          txApp.save(c)
        }
      }

      // Products
      if (selectedProducts && selectedProducts.length > 0) {
        for (const sp of selectedProducts) {
          const prod = txApp.findRecordById('products', sp.product_id)
          const currentStock = prod.getInt('stock_quantity')
          if (currentStock - sp.quantity < 0) {
            throw new Error(`Estoque insuficiente para o produto: ${prod.getString('name')}`)
          }
          prod.set('stock_quantity', currentStock - sp.quantity)
          txApp.save(prod)

          const purchCol = txApp.findCollectionByNameOrId('product_purchases')
          const purch = new Record(purchCol)
          purch.set('client_id', clientId)
          purch.set('product_id', prod.id)
          purch.set('price_at_sale', prod.getFloat('price'))
          purch.set('date', now)
          purch.set('barber_id', barberId)
          txApp.save(purch)

          let prodComm = 0
          const netProductPrice = prod.getFloat('price') * sp.quantity * feeMultiplier

          if (workLevel === 'socio') {
            prodComm = netProductPrice
          } else {
            const catId = prod.getString('category_id')
            if (catId) {
              const cat = txApp.findRecordById('categories', catId)
              const perc = cat.getFloat('commission_percentage') || 0
              prodComm = netProductPrice * (perc / 100)
            } else {
              prodComm =
                barber.getString('commission_type') === 'percentage'
                  ? netProductPrice * (barber.getFloat('commission_value') / 100)
                  : Math.min(netProductPrice, barber.getFloat('commission_value') * sp.quantity)
            }
          }

          if (prodComm > 0) {
            const commCol = txApp.findCollectionByNameOrId('commissions')
            const c = new Record(commCol)
            c.set('barber_id', barberId)
            c.set('amount', prodComm)
            c.set('type', 'product')
            c.set('date', now)
            c.set('is_advance', false)
            c.set('payment_method', svcForm.payment_method)
            c.set('status', status)
            if (due_date) c.set('due_date', due_date)
            txApp.save(c)
          }
        }
      }
    })

    return e.json(200, { success: true })
  },
  $apis.requireAuth(),
)
