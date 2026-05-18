migrate(
  (app) => {
    const barbers = app.findRecordsByFilter('barbers', '1=1', '', 1000, 0)
    const barbersMap = {}
    for (const b of barbers) {
      barbersMap[b.id] = b
    }

    const rules = app.findRecordsByFilter('commission_rules', '1=1', '', 10000, 0)

    const paymentMethods = app.findRecordsByFilter('payment_methods', '1=1', '', 100, 0)
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
          const svc = app.findRecordById('services', itemId)
          svcRate = svc.getFloat('commission_rate')
          const cat = app.findRecordById('categories', svc.getString('category_id'))
          catRate = cat.getFloat('commission_percentage')
        } else if (type === 'product') {
          const prod = app.findRecordById('products', itemId)
          const cat = app.findRecordById('categories', prod.getString('category_id'))
          catRate = cat.getFloat('commission_percentage')
        } else if (type === 'package' || type === 'package_sale') {
          const pkg = app.findRecordById('packages', itemId)
          const svc = app.findRecordById('services', pkg.getString('service_id'))
          svcRate = svc.getFloat('commission_rate')
          const cat = app.findRecordById('categories', svc.getString('category_id'))
          catRate = cat.getFloat('commission_percentage')
        }
      } catch (err) {}

      if (svcRate > 0) return basePrice * (svcRate / 100)
      return basePrice * (catRate / 100)
    }

    app.runInTransaction((txApp) => {
      const existingCommsAll = txApp.findRecordsByFilter('commissions', '1=1', '', 100000, 0)

      for (const comm of existingCommsAll) {
        let barberId = comm.getString('barber_id')
        let type = comm.getString('type')

        let price = 0
        let itemId = ''

        if (type === 'service' && comm.getString('appointment_id')) {
          try {
            const apt = txApp.findRecordById('appointments', comm.getString('appointment_id'))
            price = apt.getFloat('price')
            if (price === 0 && !apt.getString('client_package_id')) {
              const srv = txApp.findRecordById('services', apt.getString('service_id'))
              price = srv.getFloat('price')
            }
            itemId = apt.getString('service_id')
            if (price <= 0 && apt.getString('client_package_id')) continue
          } catch (e) {}
        } else if (type === 'product' && comm.getString('product_purchase_id')) {
          try {
            const prod = txApp.findRecordById(
              'product_purchases',
              comm.getString('product_purchase_id'),
            )
            price = prod.getFloat('price_at_sale')
            itemId = prod.getString('product_id')
          } catch (e) {}
        } else if (
          (type === 'package' || type === 'package_sale') &&
          comm.getString('client_package_id')
        ) {
          try {
            const pack = txApp.findRecordById(
              'client_packages',
              comm.getString('client_package_id'),
            )
            const pkg = txApp.findRecordById('packages', pack.getString('package_id'))
            price = pkg.getFloat('price')
            itemId = pack.getString('package_id')
          } catch (e) {}
        }

        if (!itemId) continue

        const barber = barbersMap[barberId]
        let calculatedGross = getCommission(barberId, type, itemId, price)
        if (barber && barber.getString('work_level') === 'socio') {
          calculatedGross = price
        }

        let pmRaw = comm.getString('payment_method') || 'pix'
        let pmType = 'pix'
        if (pmRaw === 'credito') pmType = 'credit_card'
        if (pmRaw === 'debito') pmType = 'debit_card'
        if (pmRaw === 'cash') pmType = 'cash'

        const feePct = pmFeeMap[pmType] || 0
        const calculatedFee = Number((price * (feePct / 100)).toFixed(2))
        const calculatedNet = Number((calculatedGross - calculatedFee).toFixed(2))

        comm.set('amount', calculatedNet)
        comm.set('gross_amount', calculatedGross)
        comm.set('fee_amount', calculatedFee)

        txApp.save(comm)
      }
    })
  },
  (app) => {
    // no-op down migration
  },
)
