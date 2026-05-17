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
      const barber = barbersMap[barberId]
      if (!barber) return 0
      if (barber.getString('work_level') === 'socio') return basePrice

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
      } catch (e) {}

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

    let createdCount = 0

    $app.runInTransaction((txApp) => {
      // 1. Appointments
      for (const apt of apts) {
        const barberId = apt.getString('barber_id')
        if (!barberId) continue

        const createdTime = new Date(apt.getString('created')).getTime()

        let found = false
        let inferredPm = 'pix'

        for (const c of existingCommsArr) {
          const cTime = new Date(c.getString('created')).getTime()
          const diff = Math.abs(cTime - createdTime)

          if (diff < 120000 && c.getString('payment_method')) {
            inferredPm = c.getString('payment_method')
          }

          if (c.getString('barber_id') === barberId && c.getString('type') === 'service') {
            if (diff < 300000) {
              found = true
            }
          }
        }

        if (!found) {
          let price = apt.getFloat('price')
          const serviceId = apt.getString('service_id')

          let cRate = 0
          if (price === 0 && serviceId) {
            try {
              const srv = txApp.findRecordById('services', serviceId)
              price = srv.getFloat('price')
              cRate = srv.getFloat('commission_rate')
            } catch (err) {}
          } else if (serviceId) {
            try {
              const srv = txApp.findRecordById('services', serviceId)
              cRate = srv.getFloat('commission_rate')
            } catch (err) {}
          }

          let amount = getCommission(barberId, 'service', serviceId, price)
          const barber = barbersMap[barberId]

          if (amount === 0 && barber && barber.getString('work_level') !== 'socio' && cRate > 0) {
            amount = price * (cRate / 100)
          }

          let pmType = 'pix'
          if (inferredPm === 'credito') pmType = 'credit_card'
          if (inferredPm === 'debito') pmType = 'debit_card'
          if (inferredPm === 'cash') pmType = 'cash'

          const feePct = pmFeeMap[pmType] || 0
          const feeVal = price * (feePct / 100)
          amount = amount - feeVal

          if (amount > 0 || (barber && barber.getString('work_level') === 'socio')) {
            const newComm = new Record(txApp.findCollectionByNameOrId('commissions'))
            newComm.set('barber_id', barberId)
            newComm.set('amount', amount)
            newComm.set('type', 'service')
            newComm.set('date', apt.getString('date') || apt.getString('created'))
            newComm.set(
              'status',
              barber && barber.getString('work_level') === 'socio' ? 'paid' : 'pending',
            )
            newComm.set('payment_method', inferredPm)
            txApp.save(newComm)
            existingCommsArr.push(newComm)
            createdCount++
          }
        }
      }

      // 2. Products
      for (const prod of prods) {
        const barberId = prod.getString('barber_id')
        if (!barberId) continue

        const createdTime = new Date(prod.getString('created')).getTime()

        let found = false
        let inferredPm = 'pix'

        for (const c of existingCommsArr) {
          const cTime = new Date(c.getString('created')).getTime()
          const diff = Math.abs(cTime - createdTime)

          if (diff < 120000 && c.getString('payment_method')) {
            inferredPm = c.getString('payment_method')
          }

          if (c.getString('barber_id') === barberId && c.getString('type') === 'product') {
            if (diff < 300000) {
              found = true
            }
          }
        }

        if (!found) {
          const price = prod.getFloat('price_at_sale')
          const productId = prod.getString('product_id')
          let amount = getCommission(barberId, 'product', productId, price)
          const barber = barbersMap[barberId]

          let pmType = 'pix'
          if (inferredPm === 'credito') pmType = 'credit_card'
          if (inferredPm === 'debito') pmType = 'debit_card'
          if (inferredPm === 'cash') pmType = 'cash'

          const feePct = pmFeeMap[pmType] || 0
          const feeVal = price * (feePct / 100)
          amount = amount - feeVal

          if (amount > 0 || (barber && barber.getString('work_level') === 'socio')) {
            const newComm = new Record(txApp.findCollectionByNameOrId('commissions'))
            newComm.set('barber_id', barberId)
            newComm.set('amount', amount)
            newComm.set('type', 'product')
            newComm.set('date', prod.getString('date') || prod.getString('created'))
            newComm.set(
              'status',
              barber && barber.getString('work_level') === 'socio' ? 'paid' : 'pending',
            )
            newComm.set('payment_method', inferredPm)
            txApp.save(newComm)
            existingCommsArr.push(newComm)
            createdCount++
          }
        }
      }

      // 3. Packages
      for (const pack of packs) {
        const barberId = pack.getString('barber_id')
        if (!barberId) continue

        const createdTime = new Date(pack.getString('created')).getTime()

        let found = false
        let inferredPm = 'pix'

        for (const c of existingCommsArr) {
          const cTime = new Date(c.getString('created')).getTime()
          const diff = Math.abs(cTime - createdTime)

          if (diff < 120000 && c.getString('payment_method')) {
            inferredPm = c.getString('payment_method')
          }

          if (
            c.getString('barber_id') === barberId &&
            (c.getString('type') === 'package' || c.getString('type') === 'package_sale')
          ) {
            if (diff < 300000) {
              found = true
            }
          }
        }

        if (!found) {
          const packageId = pack.getString('package_id')
          let price = 0
          try {
            const pkg = txApp.findRecordById('packages', packageId)
            price = pkg.getFloat('price')
          } catch (e) {}

          let amount = getCommission(barberId, 'package', packageId, price)
          const barber = barbersMap[barberId]

          let pmType = 'pix'
          if (inferredPm === 'credito') pmType = 'credit_card'
          if (inferredPm === 'debito') pmType = 'debit_card'
          if (inferredPm === 'cash') pmType = 'cash'

          const feePct = pmFeeMap[pmType] || 0
          const feeVal = price * (feePct / 100)
          amount = amount - feeVal

          if (amount > 0 || (barber && barber.getString('work_level') === 'socio')) {
            const newComm = new Record(txApp.findCollectionByNameOrId('commissions'))
            newComm.set('barber_id', barberId)
            newComm.set('amount', amount)
            newComm.set('type', 'package_sale')
            newComm.set('date', pack.getString('created'))
            newComm.set(
              'status',
              barber && barber.getString('work_level') === 'socio' ? 'paid' : 'pending',
            )
            newComm.set('payment_method', inferredPm)
            txApp.save(newComm)
            existingCommsArr.push(newComm)
            createdCount++
          }
        }
      }
    })

    return e.json(200, { success: true, createdCount })
  },
  $apis.requireAuth(),
)
