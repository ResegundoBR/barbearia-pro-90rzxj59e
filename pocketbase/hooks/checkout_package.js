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

      let pmFeePct = 0
      let commissionPm = 'pix'
      try {
        const pm = txApp.findRecordById('payment_methods', payment_method)
        pmFeePct = pm.getFloat('fee_percentage')
        const pType = pm.getString('type')
        if (pType === 'credit_card') commissionPm = 'credito'
        else if (pType === 'debit_card') commissionPm = 'debito'
        else if (pType === 'cash') commissionPm = 'cash'
        else if (pType === 'pix') commissionPm = 'pix'
      } catch (_) {}

      let catCommPct = 0
      try {
        const svc = txApp.findRecordById('services', pkg.getString('service_id'))
        const cat = txApp.findRecordById('categories', svc.getString('category_id'))
        catCommPct = cat.getFloat('commission_percentage')
      } catch (_) {}

      const price = pkg.getFloat('price')
      const grossComm = price * (catCommPct / 100)
      const feeVal = price * (pmFeePct / 100)
      const netComm = grossComm - feeVal

      if (netComm !== 0 || grossComm !== 0) {
        const commCol = txApp.findCollectionByNameOrId('commissions')
        const comm = new Record(commCol)
        comm.set('barber_id', barber_id)
        comm.set('amount', netComm)
        comm.set('type', 'package_sale')
        comm.set('date', new Date().toISOString())
        comm.set('payment_method', commissionPm)
        comm.set('status', 'available')

        try {
          const barber = txApp.findRecordById('barbers', barber_id)
          if (barber.getString('work_level') === 'socio') {
            comm.set('status', 'paid')
          }
        } catch (_) {}

        txApp.save(comm)
      }
    })

    return e.json(200, { success: true })
  },
  $apis.requireAuth(),
)
