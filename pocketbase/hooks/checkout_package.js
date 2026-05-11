routerAdd(
  'POST',
  '/backend/v1/checkout/package',
  (e) => {
    const body = e.requestInfo().body
    const { barber_id, client_id, package_id, payment_method } = body

    $app.runInTransaction((txApp) => {
      const pkg = txApp.findRecordById('packages', package_id)
      const barber = txApp.findRecordById('barbers', barber_id)

      let feePerc = 0
      try {
        if (payment_method) {
          const pm = txApp.findRecordById('payment_methods', payment_method)
          feePerc = pm.getFloat('fee_percentage') || 0
        }
      } catch (_) {}
      const feeMultiplier = 1 - feePerc / 100
      const netPackagePrice = pkg.getFloat('price') * feeMultiplier

      const d = new Date()
      d.setDate(d.getDate() + 30)
      const expiresAt = d.toISOString().replace('T', ' ').substring(0, 19)

      const cpCol = txApp.findCollectionByNameOrId('client_packages')
      const cp = new Record(cpCol)
      cp.set('client_id', client_id)
      cp.set('package_id', package_id)
      cp.set('barber_id', barber_id)
      cp.set('remaining_uses', pkg.getInt('quantity'))
      cp.set('expires_at', expiresAt)
      txApp.save(cp)

      let commAmount = 0
      const svcId = pkg.getString('service_id')
      if (svcId) {
        const svc = txApp.findRecordById('services', svcId)
        const catId = svc.getString('category_id')
        if (catId) {
          const cat = txApp.findRecordById('categories', catId)
          const perc = cat.getFloat('commission_percentage') || 0
          commAmount = netPackagePrice * (perc / 100)
        } else {
          commAmount =
            barber.getString('commission_type') === 'percentage'
              ? netPackagePrice * (barber.getFloat('commission_value') / 100)
              : Math.min(netPackagePrice, barber.getFloat('commission_value'))
        }
      } else {
        commAmount =
          barber.getString('commission_type') === 'percentage'
            ? netPackagePrice * (barber.getFloat('commission_value') / 100)
            : Math.min(netPackagePrice, barber.getFloat('commission_value'))
      }

      if (commAmount > 0) {
        const now = new Date().toISOString().replace('T', ' ').substring(0, 19)
        const workLevel = barber.getString('work_level') || 'autonomo'

        const commCol = txApp.findCollectionByNameOrId('commissions')

        if (workLevel === 'autonomo') {
          const txDate = new Date()
          const day = txDate.getDay()
          let daysToAdd = 0
          if (day >= 0 && day <= 3) {
            daysToAdd = 4 - day
          } else {
            daysToAdd = 8 - day
          }
          const d = new Date(txDate)
          d.setDate(d.getDate() + daysToAdd)
          const nextCycleStr = d.toISOString().replace('T', ' ').substring(0, 19)

          const futureD = new Date(d)
          futureD.setDate(futureD.getDate() + 15)
          const futureCycleStr = futureD.toISOString().replace('T', ' ').substring(0, 19)

          const c1 = new Record(commCol)
          c1.set('barber_id', barber_id)
          c1.set('amount', commAmount * 0.5)
          c1.set('type', 'package_sale')
          c1.set('date', now)
          c1.set('is_advance', false)
          c1.set('payment_method', payment_method)
          c1.set('status', 'pending')
          c1.set('due_date', nextCycleStr)
          txApp.save(c1)

          const c2 = new Record(commCol)
          c2.set('barber_id', barber_id)
          c2.set('amount', commAmount * 0.5)
          c2.set('type', 'package_sale')
          c2.set('date', now)
          c2.set('is_advance', false)
          c2.set('payment_method', payment_method)
          c2.set('status', 'pending')
          c2.set('due_date', futureCycleStr)
          txApp.save(c2)
        } else {
          let status = 'pending'
          let due_date = ''
          if (workLevel === 'socio') {
            status = 'available'
            due_date = now
          } else {
            const txDate = new Date()
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
          const c = new Record(commCol)
          c.set('barber_id', barber_id)
          c.set('amount', commAmount)
          c.set('type', 'package_sale')
          c.set('date', now)
          c.set('is_advance', false)
          c.set('payment_method', payment_method)
          c.set('status', status)
          if (due_date) c.set('due_date', due_date)
          txApp.save(c)
        }
      }
    })
    return e.json(200, { success: true })
  },
  $apis.requireAuth(),
)
