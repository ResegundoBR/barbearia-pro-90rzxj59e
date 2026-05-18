onRecordAfterUpdateSuccess((e) => {
  const apt = e.record
  const original = apt.original()

  // If price, status, or barber didn't change, we can probably skip.
  if (
    apt.getString('status') === original.getString('status') &&
    apt.getFloat('price') === original.getFloat('price') &&
    apt.getString('barber_id') === original.getString('barber_id')
  ) {
    return e.next()
  }

  $app.runInTransaction((txApp) => {
    let existingComm = null
    try {
      existingComm = txApp.findFirstRecordByData('commissions', 'appointment_id', apt.id)
    } catch (_) {}

    if (apt.getString('status') !== 'Concluído') {
      if (existingComm) {
        txApp.delete(existingComm)
      }
      return
    }

    const barberId = apt.getString('barber_id')
    const serviceId = apt.getString('service_id')
    const price = apt.getFloat('price')
    if (!barberId || !serviceId) return

    // If price is 0 and it has a package attached, no commission for the service
    if (price <= 0 && apt.getString('client_package_id')) {
      if (existingComm) txApp.delete(existingComm)
      return
    }

    let isSocio = false
    try {
      const barber = txApp.findRecordById('barbers', barberId)
      if (barber.getString('work_level') === 'socio') isSocio = true
    } catch (_) {}

    let pmRaw = existingComm ? existingComm.getString('payment_method') : 'pix'
    let pmType = 'pix'
    if (pmRaw === 'credito') pmType = 'credit_card'
    if (pmRaw === 'debito') pmType = 'debit_card'
    if (pmRaw === 'cash') pmType = 'cash'

    let pmFeePct = 0
    try {
      const pm = txApp.findFirstRecordByData('payment_methods', 'type', pmType)
      pmFeePct = pm.getFloat('fee_percentage')
    } catch (_) {}

    let ruleVal = null
    let ruleType = 'percentage'
    try {
      const rules = txApp.findRecordsByFilter(
        'commission_rules',
        `item_type='service' && item_id='${serviceId}'`,
        '',
        100,
        0,
      )
      for (let i = 0; i < rules.length; i++) {
        if (rules[i].getString('barber_id') === barberId) {
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
    } catch (_) {}

    let svcRate = 0
    let catRate = 0
    if (ruleVal === null) {
      try {
        const svc = txApp.findRecordById('services', serviceId)
        svcRate = svc.getFloat('commission_rate')
        const cat = txApp.findRecordById('categories', svc.getString('category_id'))
        catRate = cat.getFloat('commission_percentage')
      } catch (_) {}
    }

    let grossComm = 0
    if (isSocio) {
      grossComm = price
    } else if (ruleVal !== null) {
      grossComm = ruleType === 'percentage' ? price * (ruleVal / 100) : ruleVal
    } else if (svcRate > 0) {
      grossComm = price * (svcRate / 100)
    } else {
      grossComm = price * (catRate / 100)
    }

    const feeVal = Number((price * (pmFeePct / 100)).toFixed(2))
    const netComm = Number((grossComm - feeVal).toFixed(2))

    if (netComm === 0 && !isSocio) {
      if (existingComm) txApp.delete(existingComm)
      return
    }

    const comm = existingComm || new Record(txApp.findCollectionByNameOrId('commissions'))
    comm.set('appointment_id', apt.id)
    comm.set('barber_id', barberId)
    comm.set('amount', netComm)
    comm.set('gross_amount', grossComm)
    comm.set('fee_amount', feeVal)
    comm.set('type', 'service')
    if (!existingComm) {
      comm.set('date', apt.getString('date') || apt.getString('updated'))
      comm.set('payment_method', pmRaw)
      comm.set('status', isSocio ? 'paid' : 'pending')
    } else if (isSocio && existingComm.getString('status') !== 'paid') {
      comm.set('status', 'paid')
    }
    txApp.save(comm)
  })
  e.next()
}, 'appointments')
