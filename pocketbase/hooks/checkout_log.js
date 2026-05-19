routerAdd(
  'POST',
  '/backend/v1/checkouts/log',
  (e) => {
    const body = e.requestInfo().body || {}
    let nextCheckoutNumber = 5500
    let recordId = null

    $app.runInTransaction((txApp) => {
      try {
        const records = txApp.findRecordsByFilter('checkouts', '', '-checkout_number', 1, 0)
        if (records.length > 0) {
          nextCheckoutNumber = records[0].getInt('checkout_number') + 1
        }
      } catch (_) {}

      const checkoutCol = txApp.findCollectionByNameOrId('checkouts')
      const checkout = new Record(checkoutCol)
      checkout.set('checkout_number', nextCheckoutNumber)
      checkout.set('client_id', body.client_id)
      checkout.set('barber_id', body.barber_id)
      checkout.set('total_amount', body.total_amount)
      checkout.set('date', body.date || new Date().toISOString())
      checkout.set('payment_method', body.payment_method)
      checkout.set('items_snapshot', body.items_snapshot)
      txApp.save(checkout)
      recordId = checkout.id

      const checkTimeStr =
        checkout.getString('date') || checkout.getString('created') || new Date().toISOString()
      const checkTime = new Date(checkTimeStr).getTime()

      const recentComms = txApp.findRecordsByFilter(
        'commissions',
        `created >= '${new Date(checkTime - 120000).toISOString().replace('T', ' ')}'`,
        '',
        100,
        0,
      )
      for (const comm of recentComms) {
        let isMatch = false
        if (comm.getString('appointment_id')) {
          try {
            const apt = txApp.findRecordById('appointments', comm.getString('appointment_id'))
            if (apt.getString('client_id') === body.client_id) isMatch = true
          } catch (e) {}
        } else if (comm.getString('product_purchase_id')) {
          try {
            const prod = txApp.findRecordById(
              'product_purchases',
              comm.getString('product_purchase_id'),
            )
            if (prod.getString('client_id') === body.client_id) isMatch = true
          } catch (e) {}
        } else if (comm.getString('client_package_id')) {
          try {
            const pack = txApp.findRecordById(
              'client_packages',
              comm.getString('client_package_id'),
            )
            if (pack.getString('client_id') === body.client_id) isMatch = true
          } catch (e) {}
        }

        if (isMatch && !comm.getString('checkout_id')) {
          comm.set('checkout_id', recordId)
          if (body.payment_method) {
            comm.set('payment_method', body.payment_method)
          }
          txApp.save(comm)
        }
      }
    })

    return e.json(200, { success: true, id: recordId, checkout_number: nextCheckoutNumber })
  },
  $apis.requireAuth(),
)
