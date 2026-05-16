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

      let rules = []
      try {
        rules = txApp.findRecordsByFilter(
          'commission_rules',
          `barber_id='${barberId}' || barber_id=''`,
          '',
          100,
          0,
        )
      } catch (_) {}

      const servicePrice = Number(svcForm.service_price) || 0

      let serviceRule = rules.find(
        (r) =>
          r.getString('item_type') === 'service' &&
          r.getString('item_id') === serviceId &&
          r.getString('barber_id') === barberId,
      )
      if (!serviceRule) {
        serviceRule = rules.find(
          (r) =>
            r.getString('item_type') === 'service' &&
            r.getString('item_id') === '' &&
            r.getString('barber_id') === barberId,
        )
      }
      if (!serviceRule) {
        serviceRule = rules.find(
          (r) => r.getString('item_type') === 'service' && r.getString('item_id') === '',
        )
      }

      if (serviceRule || servicePrice > 0) {
        let commissionAmount = 0
        if (serviceRule) {
          if (serviceRule.getString('type') === 'percentage') {
            commissionAmount = servicePrice * (serviceRule.getFloat('value') / 100)
          } else {
            commissionAmount = serviceRule.getFloat('value')
          }
        } else {
          try {
            const barber = txApp.findRecordById('barbers', barberId)
            if (barber.getString('work_level') === 'socio') {
              commissionAmount = servicePrice
            } else if (barber.getString('commission_type') === 'percentage') {
              commissionAmount = servicePrice * (barber.getFloat('commission_value') / 100)
            }
          } catch (_) {}
        }

        if (commissionAmount > 0) {
          const commCol = txApp.findCollectionByNameOrId('commissions')
          const comm = new Record(commCol)
          comm.set('barber_id', barberId)
          comm.set('amount', commissionAmount)
          comm.set('type', 'service')
          comm.set('date', new Date().toISOString())
          comm.set('payment_method', svcForm.payment_method)
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
          purchase.set('price_at_sale', itemPrice * qty)
          purchase.set('date', new Date().toISOString())
          txApp.save(purchase)

          let prodRule = rules.find(
            (r) =>
              r.getString('item_type') === 'product' &&
              r.getString('item_id') === item.product_id &&
              r.getString('barber_id') === barberId,
          )
          if (!prodRule)
            prodRule = rules.find(
              (r) =>
                r.getString('item_type') === 'product' &&
                r.getString('item_id') === '' &&
                r.getString('barber_id') === barberId,
            )
          if (!prodRule)
            prodRule = rules.find(
              (r) => r.getString('item_type') === 'product' && r.getString('item_id') === '',
            )

          if (prodRule) {
            let cAmt = 0
            const totalProdPrice = itemPrice * qty
            if (prodRule.getString('type') === 'percentage') {
              cAmt = totalProdPrice * (prodRule.getFloat('value') / 100)
            } else {
              cAmt = prodRule.getFloat('value') * qty
            }

            if (cAmt > 0) {
              const commCol = txApp.findCollectionByNameOrId('commissions')
              const pComm = new Record(commCol)
              pComm.set('barber_id', barberId)
              pComm.set('amount', cAmt)
              pComm.set('type', 'product')
              pComm.set('date', new Date().toISOString())
              pComm.set('payment_method', svcForm.payment_method)
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
      }
    })

    return e.json(200, { success: true, id: resultId })
  },
  $apis.requireAuth(),
)
