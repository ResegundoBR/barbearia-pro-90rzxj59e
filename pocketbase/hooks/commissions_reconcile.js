routerAdd(
  'POST',
  '/backend/v1/commissions/reconcile',
  (e) => {
    const body = e.requestInfo().body || {}
    const { startDate, endDate } = body

    if (!startDate || !endDate) {
      throw new BadRequestError('startDate and endDate are required')
    }

    const barbers = $app.findRecordsByFilter('barbers', '1=1', '', 1000, 0)
    const barbersMap = {}
    for (const b of barbers) {
      barbersMap[b.id] = b
    }

    const rules = $app.findRecordsByFilter('commission_rules', '1=1', '', 10000, 0)

    const paymentMethods = $app.findRecordsByFilter('payment_methods', '1=1', '', 100, 0)
    const pmFeeMap = {}
    for (const pm of paymentMethods) {
      pmFeeMap[pm.getString('type')] = pm.getFloat('fee_percentage')
    }

    function getCommission(barberId, type, itemId, basePrice) {
      let isBebida = false
      try {
        if (type === 'service') {
          const svc = $app.findRecordById('services', itemId)
          const cat = $app.findRecordById('categories', svc.getString('category_id'))
          if (cat.getString('name').toLowerCase() === 'bebidas') isBebida = true
        } else if (type === 'product') {
          const prod = $app.findRecordById('products', itemId)
          const cat = $app.findRecordById('categories', prod.getString('category_id'))
          if (cat.getString('name').toLowerCase() === 'bebidas') isBebida = true
        } else if (type === 'package' || type === 'package_sale') {
          const pkg = $app.findRecordById('packages', itemId)
          const svc = $app.findRecordById('services', pkg.getString('service_id'))
          const cat = $app.findRecordById('categories', svc.getString('category_id'))
          if (cat.getString('name').toLowerCase() === 'bebidas') isBebida = true
        }
      } catch (err) {}

      if (isBebida) return 0

      const barber = barbersMap[barberId]
      if (!barber) return 0
      if (barber.getString('work_level') === 'socio' && type !== 'product') return basePrice
      if (barber.getString('work_level') === 'socio' && type === 'product') return 0

      let rule = null
      for (const r of rules) {
        if (
          r.getString('barber_id') === barberId &&
          (r.getString('item_type') === type ||
            (type === 'package_sale' && r.getString('item_type') === 'package')) &&
          r.getString('item_id') === itemId
        ) {
          rule = r
          break
        }
      }
      if (!rule) {
        for (const r of rules) {
          if (
            r.getString('barber_id') === '' &&
            (r.getString('item_type') === type ||
              (type === 'package_sale' && r.getString('item_type') === 'package')) &&
            r.getString('item_id') === itemId
          ) {
            rule = r
            break
          }
        }
      }

      if (rule) {
        const val = rule.getFloat('value')
        if (rule.getString('type') === 'percentage') return basePrice * (val / 100)
        return val
      }

      let svcRate = 0
      let catRate = 0
      try {
        if (type === 'service') {
          const svc = $app.findRecordById('services', itemId)
          svcRate = svc.getFloat('commission_rate')
          const cat = $app.findRecordById('categories', svc.getString('category_id'))
          catRate = cat.getFloat('commission_percentage')
        } else if (type === 'product') {
          const prod = $app.findRecordById('products', itemId)
          const cat = $app.findRecordById('categories', prod.getString('category_id'))
          catRate = cat.getFloat('commission_percentage')
        } else if (type === 'package' || type === 'package_sale') {
          const pkg = $app.findRecordById('packages', itemId)
          const svc = $app.findRecordById('services', pkg.getString('service_id'))
          svcRate = svc.getFloat('commission_rate')
          const cat = $app.findRecordById('categories', svc.getString('category_id'))
          catRate = cat.getFloat('commission_percentage')
        }
      } catch (err) {}

      if (svcRate > 0) return basePrice * (svcRate / 100)
      return basePrice * (catRate / 100)
    }

    const existingCommsAll = $app.findRecordsByFilter(
      'commissions',
      `created >= '${startDate}' && created <= '${endDate}'`,
      '',
      10000,
      0,
    )
    const existingCommsArr = []
    for (const c of existingCommsAll) {
      existingCommsArr.push(c)
    }

    const apts = $app.findRecordsByFilter(
      'appointments',
      `status = 'Concluído' && created >= '${startDate}' && created <= '${endDate}'`,
      '',
      10000,
      0,
    )
    const prods = $app.findRecordsByFilter(
      'product_purchases',
      `created >= '${startDate}' && created <= '${endDate}'`,
      '',
      10000,
      0,
    )
    const packs = $app.findRecordsByFilter(
      'client_packages',
      `created >= '${startDate}' && created <= '${endDate}'`,
      '',
      10000,
      0,
    )

    const checkoutsAll = $app.findRecordsByFilter(
      'checkouts',
      `created >= '${startDate}' && created <= '${endDate}'`,
      '',
      10000,
      0,
    )

    let createdCount = 0
    let updatedCount = 0

    $app.runInTransaction((txApp) => {
      // 1. Appointments
      for (const apt of apts) {
        const barberId = apt.getString('barber_id')
        if (!barberId) continue

        const clientId = apt.getString('client_id')
        const refTime = new Date(apt.getString('updated') || apt.getString('created')).getTime()
        let matchedCheckoutId = null
        for (const ck of checkoutsAll) {
          if (
            ck.getString('client_id') === clientId &&
            Math.abs(
              new Date(ck.getString('date') || ck.getString('created')).getTime() - refTime,
            ) < 120000
          ) {
            matchedCheckoutId = ck.id
            break
          }
        }

        let price = apt.getFloat('price')
        const serviceId = apt.getString('service_id')

        if (price === 0 && !apt.getString('client_package_id')) {
          try {
            const srv = txApp.findRecordById('services', serviceId)
            price = srv.getFloat('price')
          } catch (err) {}
        }

        // No commission for package usage (price 0 with package_id)
        if (price <= 0 && apt.getString('client_package_id')) {
          continue
        }

        const barber = barbersMap[barberId]
        let grossComm = getCommission(barberId, 'service', serviceId, price)
        if (barber && barber.getString('work_level') === 'socio') {
          grossComm = price
        }

        let existingComm = existingCommsArr.find((c) => c.getString('appointment_id') === apt.id)
        if (!existingComm) {
          const createdTime = new Date(apt.getString('created')).getTime()
          existingComm = existingCommsArr.find(
            (c) =>
              c.getString('barber_id') === barberId &&
              c.getString('type') === 'service' &&
              !c.getString('appointment_id') &&
              Math.abs(new Date(c.getString('created')).getTime() - createdTime) < 300000,
          )
        }

        let inferredPm = existingComm ? existingComm.getString('payment_method') : 'pix'
        let pmType = 'pix'
        if (inferredPm === 'credito') pmType = 'credit_card'
        if (inferredPm === 'debito') pmType = 'debit_card'
        if (inferredPm === 'cash') pmType = 'cash'

        const feePct = pmFeeMap[pmType] || 0
        const feeVal = Number((price * (feePct / 100)).toFixed(2))
        const amount = grossComm // No longer deducting feeVal

        if (amount !== 0 || (barber && barber.getString('work_level') === 'socio')) {
          const comm = existingComm || new Record(txApp.findCollectionByNameOrId('commissions'))
          comm.set('appointment_id', apt.id)
          comm.set('barber_id', barberId)
          comm.set('amount', amount)
          comm.set('gross_amount', grossComm)
          comm.set('fee_amount', feeVal)
          comm.set('type', 'service')

          if (matchedCheckoutId && !comm.getString('checkout_id')) {
            comm.set('checkout_id', matchedCheckoutId)
          }

          if (!existingComm) {
            comm.set('date', apt.getString('date') || apt.getString('created'))
            comm.set('payment_method', inferredPm)
            comm.set(
              'status',
              barber && barber.getString('work_level') === 'socio' ? 'paid' : 'pending',
            )
            createdCount++
          } else {
            if (
              barber &&
              barber.getString('work_level') === 'socio' &&
              comm.getString('status') !== 'paid'
            ) {
              comm.set('status', 'paid')
            }
            updatedCount++
          }
          txApp.save(comm)
        }
      }

      // 2. Products
      for (const prod of prods) {
        const barberId = prod.getString('barber_id')
        if (!barberId) continue

        const clientId = prod.getString('client_id')
        const refTime = new Date(prod.getString('created')).getTime()
        let matchedCheckoutId = null
        for (const ck of checkoutsAll) {
          if (
            ck.getString('client_id') === clientId &&
            Math.abs(
              new Date(ck.getString('date') || ck.getString('created')).getTime() - refTime,
            ) < 120000
          ) {
            matchedCheckoutId = ck.id
            break
          }
        }

        const price = prod.getFloat('price_at_sale')
        const productId = prod.getString('product_id')
        const barber = barbersMap[barberId]

        let grossComm = getCommission(barberId, 'product', productId, price)
        if (barber && barber.getString('work_level') === 'socio') {
          grossComm = 0 // Sócio não recebe repasse por produto, fica pro caixa
        }

        let existingComm = existingCommsArr.find(
          (c) => c.getString('product_purchase_id') === prod.id,
        )
        if (!existingComm) {
          const createdTime = new Date(prod.getString('created')).getTime()
          existingComm = existingCommsArr.find(
            (c) =>
              c.getString('barber_id') === barberId &&
              c.getString('type') === 'product' &&
              !c.getString('product_purchase_id') &&
              Math.abs(new Date(c.getString('created')).getTime() - createdTime) < 300000,
          )
        }

        let inferredPm = existingComm ? existingComm.getString('payment_method') : 'pix'
        let pmType = 'pix'
        if (inferredPm === 'credito') pmType = 'credit_card'
        if (inferredPm === 'debito') pmType = 'debit_card'
        if (inferredPm === 'cash') pmType = 'cash'

        const feePct = pmFeeMap[pmType] || 0
        const feeVal = Number((price * (feePct / 100)).toFixed(2))
        const amount = grossComm // No longer deducting feeVal

        if (amount !== 0 || (barber && barber.getString('work_level') === 'socio')) {
          const comm = existingComm || new Record(txApp.findCollectionByNameOrId('commissions'))
          comm.set('product_purchase_id', prod.id)
          comm.set('barber_id', barberId)
          comm.set('amount', amount)
          comm.set('gross_amount', grossComm)
          comm.set('fee_amount', feeVal)
          comm.set('type', 'product')

          if (matchedCheckoutId && !comm.getString('checkout_id')) {
            comm.set('checkout_id', matchedCheckoutId)
          }

          if (!existingComm) {
            comm.set('date', prod.getString('date') || prod.getString('created'))
            comm.set('payment_method', inferredPm)
            comm.set(
              'status',
              barber && barber.getString('work_level') === 'socio' ? 'paid' : 'pending',
            )
            createdCount++
          } else {
            updatedCount++
          }
          txApp.save(comm)
        }
      }

      // 3. Packages
      for (const pack of packs) {
        const barberId = pack.getString('barber_id')
        if (!barberId) continue

        const clientId = pack.getString('client_id')
        const refTime = new Date(pack.getString('created')).getTime()
        let matchedCheckoutId = null
        for (const ck of checkoutsAll) {
          if (
            ck.getString('client_id') === clientId &&
            Math.abs(
              new Date(ck.getString('date') || ck.getString('created')).getTime() - refTime,
            ) < 120000
          ) {
            matchedCheckoutId = ck.id
            break
          }
        }

        const packageId = pack.getString('package_id')
        let price = 0
        try {
          const pkg = txApp.findRecordById('packages', packageId)
          price = pkg.getFloat('price')
        } catch (e) {}

        const barber = barbersMap[barberId]
        let grossComm = getCommission(barberId, 'package', packageId, price)
        if (barber && barber.getString('work_level') === 'socio') {
          grossComm = price
        }

        let existingComm = existingCommsArr.find(
          (c) => c.getString('client_package_id') === pack.id,
        )
        if (!existingComm) {
          const createdTime = new Date(pack.getString('created')).getTime()
          existingComm = existingCommsArr.find(
            (c) =>
              c.getString('barber_id') === barberId &&
              (c.getString('type') === 'package_sale' || c.getString('type') === 'package') &&
              !c.getString('client_package_id') &&
              Math.abs(new Date(c.getString('created')).getTime() - createdTime) < 300000,
          )
        }

        let inferredPm = existingComm ? existingComm.getString('payment_method') : 'pix'
        let pmType = 'pix'
        if (inferredPm === 'credito') pmType = 'credit_card'
        if (inferredPm === 'debito') pmType = 'debit_card'
        if (inferredPm === 'cash') pmType = 'cash'

        const feePct = pmFeeMap[pmType] || 0
        const feeVal = Number((price * (feePct / 100)).toFixed(2))
        const amount = grossComm // No longer deducting feeVal

        if (amount !== 0 || (barber && barber.getString('work_level') === 'socio')) {
          const comm = existingComm || new Record(txApp.findCollectionByNameOrId('commissions'))
          comm.set('client_package_id', pack.id)
          comm.set('barber_id', barberId)
          comm.set('amount', amount)
          comm.set('gross_amount', grossComm)
          comm.set('fee_amount', feeVal)
          comm.set('type', 'package_sale')

          if (matchedCheckoutId && !comm.getString('checkout_id')) {
            comm.set('checkout_id', matchedCheckoutId)
          }

          if (!existingComm) {
            comm.set('date', pack.getString('created'))
            comm.set('payment_method', inferredPm)
            comm.set(
              'status',
              barber && barber.getString('work_level') === 'socio' ? 'paid' : 'pending',
            )
            createdCount++
          } else {
            updatedCount++
          }
          txApp.save(comm)
        }
      }
    })

    return e.json(200, { success: true, createdCount, updatedCount })
  },
  $apis.requireAuth(),
)
