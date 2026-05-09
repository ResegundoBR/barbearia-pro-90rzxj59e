routerAdd(
  'POST',
  '/backend/v1/checkout/package',
  (e) => {
    const body = e.requestInfo().body
    const { barber_id, client_id, package_id, payment_method } = body

    $app.runInTransaction((txApp) => {
      const pkg = txApp.findRecordById('packages', package_id)
      const barber = txApp.findRecordById('barbers', barber_id)

      const d = new Date()
      d.setDate(d.getDate() + 90)
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
          commAmount = pkg.getFloat('price') * (perc / 100)
        } else {
          commAmount =
            barber.getString('commission_type') === 'percentage'
              ? pkg.getFloat('price') * (barber.getFloat('commission_value') / 100)
              : barber.getFloat('commission_value')
        }
      } else {
        commAmount =
          barber.getString('commission_type') === 'percentage'
            ? pkg.getFloat('price') * (barber.getFloat('commission_value') / 100)
            : barber.getFloat('commission_value')
      }

      if (commAmount > 0) {
        const now = new Date().toISOString().replace('T', ' ').substring(0, 19)
        const isCredit = payment_method === 'credito'
        const status = isCredit ? 'pending' : 'available'

        let due_date = ''
        if (isCredit) {
          const d2 = new Date()
          d2.setDate(d2.getDate() + 30)
          due_date = d2.toISOString().replace('T', ' ').substring(0, 19)
        }

        const commCol = txApp.findCollectionByNameOrId('commissions')
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
    })
    return e.json(200, { success: true })
  },
  $apis.requireAuth(),
)
