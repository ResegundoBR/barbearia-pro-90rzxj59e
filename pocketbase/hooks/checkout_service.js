routerAdd(
  'POST',
  '/backend/v1/checkout/service',
  (e) => {
    const body = e.requestInfo().body || {}
    const { isManual, manualForm, svcForm, selectedProducts, packageToConsume } = body

    if (!svcForm || !svcForm.payment_method) {
      throw new BadRequestError('Método de pagamento é obrigatório.')
    }

    let resultId = null

    $app.runInTransaction((txApp) => {
      let appointmentId = svcForm.appointment_id
      let appointment
      let barberId
      let clientId
      let serviceId

      if (isManual) {
        if (!manualForm.client_id || !manualForm.barber_id || !manualForm.service_id) {
          throw new BadRequestError('Preencha todos os campos do atendimento avulso.')
        }
        const aptCollection = txApp.findCollectionByNameOrId('appointments')
        appointment = new Record(aptCollection)
        appointment.set('client_id', manualForm.client_id)
        appointment.set('barber_id', manualForm.barber_id)
        appointment.set('service_id', manualForm.service_id)
        appointment.set('price', Number(svcForm.service_price) || 0)
        appointment.set('date', new Date().toISOString())
        appointment.set('status', 'Concluído')
        txApp.save(appointment)
        appointmentId = appointment.id
        barberId = manualForm.barber_id
        clientId = manualForm.client_id
        serviceId = manualForm.service_id
      } else {
        if (!appointmentId) throw new BadRequestError('ID do agendamento não fornecido.')
        appointment = txApp.findRecordById('appointments', appointmentId)
        appointment.set('status', 'Concluído')
        appointment.set('price', Number(svcForm.service_price) || 0)
        if (packageToConsume) {
          appointment.set('client_package_id', packageToConsume)
        }
        txApp.save(appointment)
        barberId = appointment.getString('barber_id')
        clientId = appointment.getString('client_id')
        serviceId = appointment.getString('service_id')
      }

      resultId = appointmentId

      if (packageToConsume) {
        const pkg = txApp.findRecordById('client_packages', packageToConsume)
        const remaining = pkg.getInt('remaining_uses') - 1
        pkg.set('remaining_uses', Math.max(0, remaining))
        txApp.save(pkg)
      }

      let pmFeePct = 0
      let commissionPm = 'pix'
      try {
        const pm = txApp.findRecordById('payment_methods', svcForm.payment_method)
        pmFeePct = pm.getFloat('fee_percentage')
        const pType = pm.getString('type')
        if (pType === 'credit_card') commissionPm = 'credito'
        else if (pType === 'debit_card') commissionPm = 'debito'
        else if (pType === 'cash') commissionPm = 'cash'
        else if (pType === 'pix') commissionPm = 'pix'
      } catch (_) {}

      const servicePrice = Number(svcForm.service_price) || 0

      if (servicePrice > 0) {
        function calculateComm(type, itemId, price, bId) {
          let ruleVal = null
          let ruleType = 'percentage'
          try {
            const rules = txApp.findRecordsByFilter(
              'commission_rules',
              "item_type='" + type + "' && item_id='" + itemId + "'",
              '',
              100,
              0,
            )
            for (let i = 0; i < rules.length; i++) {
              if (rules[i].getString('barber_id') === bId) {
                ruleVal = rules[i].getFloat('value')
                ruleType = rules[i].getString('type')
                break
              }
            }
            if (ruleVal === null) {
              for (let i = 0; i < rules.length; i++) {
                if (rules[i].getString('barber_id') === '') {
                  ruleVal = rules[i].getFloat('value')
                  ruleType = rules[i].getString('type')
                  break
                }
              }
            }
          } catch (e) {}

          if (ruleVal !== null) {
            return ruleType === 'percentage' ? price * (ruleVal / 100) : ruleVal
          }

          let svcRate = 0
          let catRate = 0
          try {
            if (type === 'service') {
              const svc = txApp.findRecordById('services', itemId)
              svcRate = svc.getFloat('commission_rate')
              const cat = txApp.findRecordById('categories', svc.getString('category_id'))
              catRate = cat.getFloat('commission_percentage')
            } else if (type === 'product') {
              const prod = txApp.findRecordById('products', itemId)
              const cat = txApp.findRecordById('categories', prod.getString('category_id'))
              catRate = cat.getFloat('commission_percentage')
            }
          } catch (e) {}

          if (svcRate > 0) return price * (svcRate / 100)
          return price * (catRate / 100)
        }

        const grossComm = calculateComm('service', serviceId, servicePrice, barberId)
        const feeVal = servicePrice * (pmFeePct / 100)
        const netComm = grossComm - feeVal
        if (netComm !== 0 || grossComm !== 0) {
          const commCol = txApp.findCollectionByNameOrId('commissions')
          const comm = new Record(commCol)
          comm.set('barber_id', barberId)
          comm.set('amount', netComm)
          comm.set('type', 'service')
          comm.set('date', new Date().toISOString())
          comm.set('payment_method', commissionPm)
          comm.set('status', 'available')

          try {
            const barber = txApp.findRecordById('barbers', barberId)
            if (barber.getString('work_level') === 'socio') {
              comm.set('status', 'paid')
            }
          } catch (_) {}

          txApp.save(comm)
        }
      }

      if (selectedProducts && Array.isArray(selectedProducts) && selectedProducts.length > 0) {
        for (const item of selectedProducts) {
          if (!item.product_id) continue
          const prod = txApp.findRecordById('products', item.product_id)

          const qty = Number(item.quantity) || 1
          const stock = prod.getInt('stock_quantity') - qty
          prod.set('stock_quantity', Math.max(0, stock))
          txApp.save(prod)

          const purchaseCol = txApp.findCollectionByNameOrId('product_purchases')
          const purchase = new Record(purchaseCol)
          purchase.set('client_id', clientId)
          purchase.set('product_id', item.product_id)
          purchase.set('barber_id', barberId)
          const itemPrice = item.product?.price || prod.getFloat('price')
          const totalProdPrice = itemPrice * qty
          purchase.set('price_at_sale', totalProdPrice)
          purchase.set('date', new Date().toISOString())
          txApp.save(purchase)

          const grossComm = calculateComm('product', item.product_id, totalProdPrice, barberId)
          const feeVal = totalProdPrice * (pmFeePct / 100)
          const netComm = grossComm - feeVal

          if (netComm !== 0 || grossComm !== 0) {
            const commCol = txApp.findCollectionByNameOrId('commissions')
            const pComm = new Record(commCol)
            pComm.set('barber_id', barberId)
            pComm.set('amount', netComm)
            pComm.set('type', 'product')
            pComm.set('date', new Date().toISOString())
            pComm.set('payment_method', commissionPm)
            pComm.set('status', 'available')

            try {
              const barber = txApp.findRecordById('barbers', barberId)
              if (barber.getString('work_level') === 'socio') {
                pComm.set('status', 'paid')
              }
            } catch (_) {}

            txApp.save(pComm)
          }
        }
      }
    })

    return e.json(200, { success: true, id: resultId })
  },
  $apis.requireAuth(),
)
