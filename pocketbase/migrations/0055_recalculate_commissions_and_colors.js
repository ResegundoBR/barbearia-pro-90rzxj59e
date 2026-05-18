migrate(
  (app) => {
    // 1. Update barbers colors based on their names to match the new visual guidelines
    const barbers = app.findRecordsByFilter('barbers', '1=1', '', 100, 0)
    const barbersMap = {}
    for (const b of barbers) {
      barbersMap[b.id] = b
      const name = b.getString('name').toLowerCase()
      let changed = false
      if (name.includes('roberto')) {
        b.set('color', '#f97316')
        changed = true
      } else if (name.includes('luiz')) {
        b.set('color', '#3b82f6')
        changed = true
      } else if (name.includes('alisson')) {
        b.set('color', '#a855f7')
        changed = true
      } else if (name.includes('claudete')) {
        b.set('color', '#ec4899')
        changed = true
      }

      if (changed) app.save(b)
    }

    // 2. Fetch required reference data to correct historical commissions
    const rules = app.findRecordsByFilter('commission_rules', '1=1', '', 10000, 0)
    const pms = app.findRecordsByFilter('payment_methods', '1=1', '', 100, 0)
    const pmFeeMap = {}
    for (const pm of pms) {
      pmFeeMap[pm.getString('type')] = pm.getFloat('fee_percentage')
    }

    // Commission logic matching the backend hooks exactly
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

    const comms = app.findRecordsByFilter('commissions', '1=1', '', 100000, 0)

    app.runInTransaction((txApp) => {
      for (const c of comms) {
        const bId = c.getString('barber_id')
        if (!bId) continue

        const type = c.getString('type')
        let price = 0
        let itemId = ''

        if (type === 'service') {
          const aptId = c.getString('appointment_id')
          if (aptId) {
            try {
              const apt = txApp.findRecordById('appointments', aptId)
              price = apt.getFloat('price')
              itemId = apt.getString('service_id')
              // Fallback to service price if the appointment price is exactly 0 and it's not a package
              if (price === 0 && !apt.getString('client_package_id')) {
                const svc = txApp.findRecordById('services', itemId)
                price = svc.getFloat('price')
              }
            } catch (err) {}
          }
        } else if (type === 'product') {
          const purId = c.getString('product_purchase_id')
          if (purId) {
            try {
              const pur = txApp.findRecordById('product_purchases', purId)
              price = pur.getFloat('price_at_sale')
              itemId = pur.getString('product_id')
            } catch (err) {}
          }
        } else if (type === 'package' || type === 'package_sale') {
          const cpId = c.getString('client_package_id')
          if (cpId) {
            try {
              const cp = txApp.findRecordById('client_packages', cpId)
              itemId = cp.getString('package_id')
              const pkg = txApp.findRecordById('packages', itemId)
              price = pkg.getFloat('price')
            } catch (err) {}
          }
        }

        const barber = barbersMap[bId]
        let grossComm = getCommission(bId, type, itemId, price)
        if (barber && barber.getString('work_level') === 'socio') {
          grossComm = price
        }

        let pmRaw = c.getString('payment_method')
        let pmType = 'pix'
        if (pmRaw === 'credito') pmType = 'credit_card'
        if (pmRaw === 'debito') pmType = 'debit_card'
        if (pmRaw === 'cash') pmType = 'cash'

        const feePct = pmFeeMap[pmType] || 0
        const feeVal = Number((price * (feePct / 100)).toFixed(2))
        const amount = Number((grossComm - feeVal).toFixed(2))

        c.set('gross_amount', grossComm)
        c.set('fee_amount', feeVal)
        c.set('amount', amount)
        txApp.save(c)
      }
    })
  },
  (app) => {
    // Irreversible
  },
)
