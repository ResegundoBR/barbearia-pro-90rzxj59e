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
    })

    return e.json(200, { success: true, id: recordId, checkout_number: nextCheckoutNumber })
  },
  $apis.requireAuth(),
)
