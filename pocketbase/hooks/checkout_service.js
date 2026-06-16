routerAdd(
  'POST',
  '/backend/v1/checkout/service',
  (e) => {
    const body = e.requestInfo().body || {}
    const {
      isManual,
      manualForm,
      svcForm,
      selectedProducts,
      packageToConsume,
      extraServices,
      discount,
    } = body

    if (!svcForm || !svcForm.payment_method) {
      throw new BadRequestError('Método de pagamento é obrigatório.')
    }

    const orgId = e.auth?.getString('organization_id') || ''
    if (!orgId) {
      throw new BadRequestError('organization_id is missing from auth session.')
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
        barberId = manualForm.barber_id
        clientId = manualForm.client_id
        serviceId = manualForm.service_id
      } else {
        if (!appointmentId) throw new BadRequestError('ID do agendamento não fornecido.')
        appointment = txApp.findRecordById('appointments', appointmentId)
        barberId = appointment.getString('barber_id')
        clientId = appointment.getString('client_id')
        serviceId = appointment.getString('service_id')
      }

      const servicePrice = Number(svcForm.service_price) || 0
      let additionalServicesTotal = 0
      if (extraServices && Array.isArray(extraServices)) {
        for (const ext of extraServices) {
          additionalServicesTotal += Number(ext.price) || 0
        }
      }

      let productsTotal = 0
      const snapshotProducts = []
      if (selectedProducts && Array.isArray(selectedProducts)) {
        for (const item of selectedProducts) {
          if (!item.product_id) continue
          const prod = txApp.findRecordById('products', item.product_id)
          const qty = Number(item.quantity) || 1
          const itemPrice = item.product?.price || prod.getFloat('price')
          productsTotal += itemPrice * qty
          snapshotProducts.push({
            product_id: item.product_id,
            name: item.product?.name || prod.getString('name') || 'Produto',
            price: itemPrice,
            quantity: qty,
            barber_id: item.barber_id || barberId,
            prodRecord: prod,
          })
        }
      }

      const servicesTotal = servicePrice + additionalServicesTotal
      const subtotal = servicesTotal + productsTotal

      let discountAmount = 0
      if (discount) {
        if (discount.type === 'percentage')
          discountAmount = subtotal * ((Number(discount.value) || 0) / 100)
        else discountAmount = Number(discount.value) || 0
      }
      const grandTotal = Math.max(0, subtotal - discountAmount)
      const proportion = subtotal > 0 ? 1 - discountAmount / subtotal : 1

      let pmName = svcForm.payment_method
      let pmFeePct = 0
      let commissionPm = 'pix'
      try {
        const pm = txApp.findRecordById('payment_methods', svcForm.payment_method)
        pmName = pm.getString('name')
        pmFeePct = pm.getFloat('fee_percentage')
        const pType = pm.getString('type')
        if (pType === 'credit_card') commissionPm = 'credito'
        else if (pType === 'debit_card') commissionPm = 'debito'
        else if (pType === 'cash') commissionPm = 'cash'
        else if (pType === 'pix') commissionPm = 'pix'
        else commissionPm = pm.getString('name')
      } catch (_) {}

      let nextCheckoutNumber = 5500
      try {
        const records = txApp.findRecordsByFilter('checkouts', '', '-checkout_number', 1, 0)
        if (records.length > 0) {
          nextCheckoutNumber = records[0].getInt('checkout_number') + 1
        }
      } catch (_) {}

      const checkoutCol = txApp.findCollectionByNameOrId('checkouts')
      const checkout = new Record(checkoutCol)
      checkout.set('checkout_number', nextCheckoutNumber)
      checkout.set('client_id', clientId)
      checkout.set('barber_id', barberId)
      checkout.set('total_amount', grandTotal)
      checkout.set('date', new Date().toISOString())
      checkout.set('payment_method', pmName)
      if (orgId) checkout.set('organization_id', orgId)
      txApp.save(checkout)
      const checkoutId = checkout.id

      const finalServicePrice = servicePrice * proportion
      if (isManual) {
        const aptCollection = txApp.findCollectionByNameOrId('appointments')
        appointment = new Record(aptCollection)
        appointment.set('client_id', clientId)
        appointment.set('barber_id', barberId)
        appointment.set('service_id', serviceId)
        appointment.set('price', finalServicePrice)
        appointment.set('date', new Date().toISOString())
        appointment.set(
          'time',
          new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        )
        appointment.set('status', 'Concluído')
        if (packageToConsume) {
          appointment.set('client_package_id', packageToConsume)
        }
        if (orgId) appointment.set('organization_id', orgId)
        txApp.save(appointment)
        appointmentId = appointment.id
      } else {
        appointment.set('status', 'Concluído')
        appointment.set('price', finalServicePrice)
        if (packageToConsume) {
          appointment.set('client_package_id', packageToConsume)
        }
        txApp.save(appointment)
      }

      resultId = appointmentId

      if (packageToConsume) {
        const pkg = txApp.findRecordById('client_packages', packageToConsume)
        const remaining = pkg.getInt('remaining_uses') - 1
        pkg.set('remaining_uses', Math.max(0, remaining))
        txApp.save(pkg)
      }

      let finConfig = {}
      try {
        const sett = txApp.findFirstRecordByData('settings', 'key', 'financial_config')
        if (sett) finConfig = sett.get('value') || {}
      } catch (e) {}

      const inventoryOwnerId = finConfig.inventory_owner_id

      function calculateComm(type, itemId, price, bId) {
        let isBebida = false
        let catRate = 0
        let svcRate = 0
        try {
          if (type === 'service') {
            const svc = txApp.findRecordById('services', itemId)
            svcRate = svc.getFloat('commission_rate')
            const cat = txApp.findRecordById('categories', svc.getString('category_id'))
            catRate = cat.getFloat('commission_percentage')
            if (cat.getString('name').toLowerCase() === 'bebidas') isBebida = true
          } else if (type === 'product') {
            const prod = txApp.findRecordById('products', itemId)
            const cat = txApp.findRecordById('categories', prod.getString('category_id'))
            catRate = cat.getFloat('commission_percentage')
            if (cat.getString('name').toLowerCase() === 'bebidas') isBebida = true
          }
        } catch (e) {}

        if (isBebida) return 0

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

        if (type === 'service' && svcRate > 0) return price * (svcRate / 100)

        let finalRate = catRate
        if (type === 'product' && finalRate === 0) {
          finalRate = finConfig.default_product_commission || 0
        }

        return price * (finalRate / 100)
      }

      let isSocio = false
      let isAutonomo = false
      try {
        const barber = txApp.findRecordById('barbers', barberId)
        const workLevel = barber.getString('work_level')
        if (workLevel === 'socio') isSocio = true
        if (workLevel === 'autonomo') isAutonomo = true
      } catch (_) {}

      if (finalServicePrice > 0 || (packageToConsume && finalServicePrice === 0)) {
        const feeVal = Number((finalServicePrice * (pmFeePct / 100)).toFixed(2))
        let netComm = 0
        if (isSocio) {
          netComm = finalServicePrice
        } else {
          const baseComm = calculateComm('service', serviceId, finalServicePrice, barberId)
          // For Autonomo, ensure no fee deduction. For others, apply existing rules if any (currently none, but future proofing).
          netComm = baseComm
        }

        if (netComm > 0 || isSocio || packageToConsume) {
          const commCol = txApp.findCollectionByNameOrId('commissions')
          const comm = new Record(commCol)
          comm.set('appointment_id', appointmentId)
          comm.set('checkout_id', checkoutId)
          comm.set('barber_id', barberId)
          comm.set('amount', netComm)
          comm.set('gross_amount', finalServicePrice)
          // Fee is recorded for accounting but not deducted for Autonomo
          comm.set('fee_amount', isSocio ? 0 : feeVal)
          comm.set('type', 'service')
          comm.set('date', new Date().toISOString())
          comm.set('payment_method', commissionPm)
          comm.set('status', isSocio ? 'paid' : 'pending')
          if (orgId) comm.set('organization_id', orgId)
          txApp.save(comm)
        }
      }

      const extraServicesSnapshot = []
      if (extraServices && Array.isArray(extraServices) && extraServices.length > 0) {
        for (const ext of extraServices) {
          const extBarberId = ext.barber_id || barberId
          const baseExtPrice = Number(ext.price) || 0
          const extPrice = baseExtPrice * proportion

          let extName = ext.name || ext.description || 'Extra'
          let extAptId = null

          if (ext.service_id) {
            const extApt = new Record(txApp.findCollectionByNameOrId('appointments'))
            extApt.set('client_id', clientId)
            extApt.set('barber_id', extBarberId)
            extApt.set('service_id', ext.service_id)
            extApt.set('price', extPrice)
            extApt.set('date', new Date().toISOString())
            extApt.set(
              'time',
              new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            )
            extApt.set('status', 'Concluído')
            if (orgId) extApt.set('organization_id', orgId)
            txApp.save(extApt)
            extAptId = extApt.id
          }

          if (extPrice > 0) {
            let isExtSocio = false
            let isExtAutonomo = false
            let catCommPct = 0
            try {
              const b = txApp.findRecordById('barbers', extBarberId)
              const workLvl = b.getString('work_level')
              if (workLvl === 'socio') isExtSocio = true
              if (workLvl === 'autonomo') isExtAutonomo = true
              catCommPct = b.getFloat('commission_value') || 0
            } catch (_) {}

            let extGross = 0
            if (isExtSocio) {
              extGross = extPrice
            } else {
              if (ext.service_id) {
                extGross = calculateComm('service', ext.service_id, extPrice, extBarberId)
              } else {
                extGross = extPrice * (catCommPct / 100)
              }
            }

            let extFeeVal = Number((extPrice * (pmFeePct / 100)).toFixed(2))

            if (extGross > 0 || isExtSocio) {
              const cComm = new Record(txApp.findCollectionByNameOrId('commissions'))
              if (extAptId) cComm.set('appointment_id', extAptId)
              cComm.set('checkout_id', checkoutId)
              cComm.set('barber_id', extBarberId)
              cComm.set('amount', extGross)
              cComm.set('gross_amount', extPrice)
              cComm.set('fee_amount', isExtSocio ? 0 : extFeeVal)
              cComm.set('type', 'service')
              cComm.set('date', new Date().toISOString())
              cComm.set('payment_method', commissionPm)
              cComm.set('status', isExtSocio ? 'paid' : 'pending')
              if (orgId) cComm.set('organization_id', orgId)
              txApp.save(cComm)
            }
          }

          extraServicesSnapshot.push({
            name: extName,
            price: extPrice,
            barber_id: extBarberId,
            isManual: !ext.service_id,
          })
        }
      }

      if (snapshotProducts.length > 0) {
        for (const item of snapshotProducts) {
          const prod = item.prodRecord
          const qty = item.quantity
          const stock = prod.getInt('stock_quantity') - qty
          prod.set('stock_quantity', Math.max(0, stock))
          txApp.save(prod)

          const totalProdPrice = item.price * qty * proportion

          const purchaseCol = txApp.findCollectionByNameOrId('product_purchases')
          const purchase = new Record(purchaseCol)
          purchase.set('client_id', clientId)
          purchase.set('product_id', item.product_id)
          purchase.set('barber_id', item.barber_id)
          purchase.set('price_at_sale', totalProdPrice)
          purchase.set('date', new Date().toISOString())
          if (orgId) purchase.set('organization_id', orgId)
          txApp.save(purchase)

          let isSocioProd = false
          let isAutonomoProd = false
          try {
            const barberProd = txApp.findRecordById('barbers', item.barber_id)
            const wLvl = barberProd.getString('work_level')
            if (wLvl === 'socio') {
              isSocioProd = true
            }
            if (wLvl === 'autonomo') {
              isAutonomoProd = true
            }
          } catch (_) {}

          const feeValP = Number((totalProdPrice * (pmFeePct / 100)).toFixed(2))

          let sellerComm = 0
          let ownerComm = 0

          if (inventoryOwnerId) {
            if (item.barber_id === inventoryOwnerId) {
              sellerComm = isSocioProd ? 0 : totalProdPrice
            } else {
              sellerComm = isSocioProd
                ? 0
                : calculateComm('product', item.product_id, totalProdPrice, item.barber_id)
              ownerComm = Number((totalProdPrice - sellerComm).toFixed(2))
            }
          } else {
            sellerComm = isSocioProd
              ? 0
              : calculateComm('product', item.product_id, totalProdPrice, item.barber_id)
          }

          if (sellerComm > 0) {
            const pComm = new Record(txApp.findCollectionByNameOrId('commissions'))
            pComm.set('product_purchase_id', purchase.id)
            pComm.set('checkout_id', checkoutId)
            pComm.set('barber_id', item.barber_id)
            pComm.set('amount', sellerComm)
            pComm.set('gross_amount', totalProdPrice)
            pComm.set('fee_amount', isSocioProd ? 0 : feeValP)
            pComm.set('type', 'product')
            pComm.set('date', new Date().toISOString())
            pComm.set('payment_method', commissionPm)
            const st = inventoryOwnerId && item.barber_id === inventoryOwnerId ? 'paid' : 'pending'
            pComm.set('status', st)
            if (orgId) pComm.set('organization_id', orgId)
            txApp.save(pComm)
          }

          if (ownerComm > 0 && inventoryOwnerId && item.barber_id !== inventoryOwnerId) {
            let isOwnerSocio = false
            try {
              const ownerB = txApp.findRecordById('barbers', inventoryOwnerId)
              if (ownerB.getString('work_level') === 'socio') isOwnerSocio = true
            } catch (_) {}

            if (!isOwnerSocio) {
              const oComm = new Record(txApp.findCollectionByNameOrId('commissions'))
              oComm.set('checkout_id', checkoutId)
              oComm.set('barber_id', inventoryOwnerId)
              oComm.set('amount', ownerComm)
              oComm.set('type', 'product')
              oComm.set('date', new Date().toISOString())
              oComm.set('payment_method', commissionPm)
              oComm.set('status', 'paid')
              if (orgId) oComm.set('organization_id', orgId)
              txApp.save(oComm)
            }
          }
        }
      }

      let svcName = 'Serviço Base'
      try {
        if (serviceId) {
          const s = txApp.findRecordById('services', serviceId)
          svcName = s.getString('name')
        }
      } catch (_) {}

      const itemsSnapshot = {
        service: svcName,
        scheduledPrice: finalServicePrice,
        packageUsed: !!packageToConsume,
        additionalServices: extraServicesSnapshot.filter((e) => !e.isManual),
        manualExtras: extraServicesSnapshot
          .filter((e) => e.isManual)
          .map((e) => ({ description: e.name, price: e.price })),
        products: snapshotProducts.map((p) => ({
          name: p.name,
          price: p.price,
          quantity: p.quantity,
        })),
        discount: discountAmount,
      }

      checkout.set('items_snapshot', itemsSnapshot)
      txApp.save(checkout)
    })

    return e.json(200, { success: true, id: resultId })
  },
  $apis.requireAuth(),
)
