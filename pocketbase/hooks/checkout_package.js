routerAdd(
  'POST',
  '/backend/v1/checkout/package',
  (e) => {
    const body = e.requestInfo().body || {}
    const { barber_id, client_id, package_id, payment_method } = body

    if (!barber_id || !client_id || !package_id || !payment_method) {
      throw new BadRequestError('Preencha todos os campos obrigatórios.')
    }

    $app.runInTransaction((txApp) => {
      const pkg = txApp.findRecordById('packages', package_id)

      const cpCol = txApp.findCollectionByNameOrId('client_packages')
      const cp = new Record(cpCol)
      cp.set('client_id', client_id)
      cp.set('package_id', package_id)
      cp.set('barber_id', barber_id)
      cp.set('remaining_uses', pkg.getInt('quantity'))

      const periodicity = pkg.getString('periodicity')
      if (periodicity === 'semanal') {
        const d = new Date()
        d.setDate(d.getDate() + pkg.getInt('quantity') * 7)
        cp.set('expires_at', d.toISOString())
      } else if (periodicity === 'quinzenal') {
        const d = new Date()
        d.setDate(d.getDate() + pkg.getInt('quantity') * 15)
        cp.set('expires_at', d.toISOString())
      }

      txApp.save(cp)

      let rules = []
      try {
        rules = txApp.findRecordsByFilter(
          'commission_rules',
          `barber_id='${barber_id}' || barber_id=''`,
          '',
          100,
          0,
        )
      } catch (_) {}

      let rule = rules.find(
        (r) =>
          r.getString('item_type') === 'package' &&
          r.getString('item_id') === package_id &&
          r.getString('barber_id') === barber_id,
      )
      if (!rule)
        rule = rules.find(
          (r) =>
            r.getString('item_type') === 'package' &&
            r.getString('item_id') === '' &&
            r.getString('barber_id') === barber_id,
        )
      if (!rule)
        rule = rules.find(
          (r) => r.getString('item_type') === 'package' && r.getString('item_id') === '',
        )

      if (rule) {
        let cAmt = 0
        const price = pkg.getFloat('price')
        if (rule.getString('type') === 'percentage') {
          cAmt = price * (rule.getFloat('value') / 100)
        } else {
          cAmt = rule.getFloat('value')
        }

        if (cAmt > 0) {
          const commCol = txApp.findCollectionByNameOrId('commissions')
          const comm = new Record(commCol)
          comm.set('barber_id', barber_id)
          comm.set('amount', cAmt)
          comm.set('type', 'package_sale')
          comm.set('date', new Date().toISOString())
          comm.set('payment_method', payment_method)
          comm.set('status', 'available')

          try {
            const barber = txApp.findRecordById('barbers', barber_id)
            if (barber.getString('work_level') === 'socio') {
              comm.set('status', 'paid')
            }
          } catch (_) {}

          txApp.save(comm)
        }
      }
    })

    return e.json(200, { success: true })
  },
  $apis.requireAuth(),
)
