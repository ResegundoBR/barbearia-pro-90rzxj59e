routerAdd(
  'POST',
  '/backend/v1/checkout/service',
  (e) => {
    const body = e.requestInfo().body
    const { isManual, manualForm, svcForm, selectedProducts, packageToConsume } = body

    let finalServicePrice = Number(svcForm.service_price) || 0

    $app.runInTransaction((txApp) => {
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

        apt.set('status', 'Concluído')
        apt.set('price', finalServicePrice)
        if (finalPackageId) apt.set('client_package_id', finalPackageId)
        txApp.save(apt)
      }

      // 2. Commissions & Products
      const now = new Date().toISOString().replace('T', ' ').substring(0, 19)
      const isCredit = svcForm.payment_method === 'credito'
      const status = isCredit ? 'pending' : 'available'

      let due_date = ''
      if (isCredit) {
        const d = new Date()
        d.setDate(d.getDate() + 30)
        due_date = d.toISOString().replace('T', ' ').substring(0, 19)
      }

      const barber = txApp.findRecordById('barbers', barberId)

      // Service Commission
      if (apt && finalServicePrice > 0) {
        let commAmount = 0
        const svcId = apt.getString('service_id')
        if (svcId) {
          const svc = txApp.findRecordById('services', svcId)
          const catId = svc.getString('category_id')
          if (catId) {
            const cat = txApp.findRecordById('categories', catId)
            const perc = cat.getFloat('commission_percentage') || 0
            commAmount = finalServicePrice * (perc / 100)
          } else {
            commAmount =
              barber.getString('commission_type') === 'percentage'
                ? finalServicePrice * (barber.getFloat('commission_value') / 100)
                : barber.getFloat('commission_value')
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
          const catId = prod.getString('category_id')
          if (catId) {
            const cat = txApp.findRecordById('categories', catId)
            const perc = cat.getFloat('commission_percentage') || 0
            prodComm = prod.getFloat('price') * sp.quantity * (perc / 100)
          } else {
            prodComm =
              barber.getString('commission_type') === 'percentage'
                ? prod.getFloat('price') * sp.quantity * (barber.getFloat('commission_value') / 100)
                : barber.getFloat('commission_value') * sp.quantity
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
