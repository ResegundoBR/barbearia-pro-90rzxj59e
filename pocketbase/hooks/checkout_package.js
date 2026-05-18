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

      function calculateComm(type, itemId, p, bId) {
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
          return ruleType === 'percentage' ? p * (ruleVal / 100) : ruleVal
        }

        let svcRate = 0
        let catRate = 0
        try {
          if (type === 'package') {
            const pk = txApp.findRecordById('packages', itemId)
            const svc = txApp.findRecordById('services', pk.getString('service_id'))
            svcRate = svc.getFloat('commission_rate')
            const cat = txApp.findRecordById('categories', svc.getString('category_id'))
            catRate = cat.getFloat('commission_percentage')
          }
        } catch (e) {}

        if (svcRate > 0) return p * (svcRate / 100)
        return p * (catRate / 100)
      }

      const price = pkg.getFloat('price')
      const feeVal = Number((price * (pmFeePct / 100)).toFixed(2))

      let isSocio = false
      try {
        const barber = txApp.findRecordById('barbers', barber_id)
        if (barber.getString('work_level') === 'socio') {
          isSocio = true
        }
      } catch (_) {}

      let grossComm = 0
      if (isSocio) {
        grossComm = price
      } else {
        grossComm = calculateComm('package', package_id, price, barber_id)
      }

      const netComm = grossComm // No longer deducting feeVal

      if (netComm !== 0 || isSocio) {
        const commCol = txApp.findCollectionByNameOrId('commissions')
        const comm = new Record(commCol)
        comm.set('client_package_id', cp.id)
        comm.set('barber_id', barber_id)
        comm.set('amount', netComm)
        comm.set('gross_amount', grossComm)
        comm.set('fee_amount', feeVal)
        comm.set('type', 'package_sale')
        comm.set('date', new Date().toISOString())
        comm.set('payment_method', commissionPm)
        comm.set('status', isSocio ? 'paid' : 'pending')
        txApp.save(comm)
      }

      let nextCheckoutNumber = 5500
      try {
        const records = txApp.findRecordsByFilter('checkouts', '', '-checkout_number', 1, 0)
        if (records.length > 0) {
          nextCheckoutNumber = records[0].getInt('checkout_number') + 1
        }
      } catch (_) {}

      let pkgName = 'Pacote'
      try {
        const p = txApp.findRecordById('packages', package_id)
        pkgName = p.getString('name')
      } catch (_) {}

      const checkoutCol = txApp.findCollectionByNameOrId('checkouts')
      const checkout = new Record(checkoutCol)
      checkout.set('checkout_number', nextCheckoutNumber)
      checkout.set('client_id', client_id)
      checkout.set('barber_id', barber_id)
      checkout.set('total_amount', price)
      checkout.set('date', new Date().toISOString())
      checkout.set('payment_method', payment_method)

      const itemsSnapshot = {
        packages: [
          {
            name: pkgName,
            price: price,
            quantity: 1,
          },
        ],
      }
      checkout.set('items_snapshot', itemsSnapshot)
      txApp.save(checkout)
    })

    return e.json(200, { success: true })
  },
  $apis.requireAuth(),
)
