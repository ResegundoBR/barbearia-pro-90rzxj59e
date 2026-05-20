migrate(
  (app) => {
    // Fix Pedido 5506: Unbind R$ 35,00 service that was incorrectly added to Luiz.
    try {
      const ck5506 = app.findFirstRecordByData('checkouts', 'checkout_number', 5506)
      if (ck5506) {
        const comms = app.findRecordsByFilter(
          'commissions',
          `checkout_id='${ck5506.id}' && gross_amount=35`,
          '',
          10,
          0,
        )
        for (const comm of comms) {
          comm.set('checkout_id', '')
          app.save(comm)
        }
      }
    } catch (e) {
      // Ignore if not found
    }
  },
  (app) => {},
)
