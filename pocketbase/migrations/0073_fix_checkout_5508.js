migrate(
  (app) => {
    try {
      const checkouts = app.findRecordsByFilter('checkouts', 'checkout_number = 5508', '', 10, 0)
      if (checkouts.length > 0) {
        const checkout = checkouts[0]
        checkout.set('total_amount', 190.0)
        checkout.set('payment_method', 'Cartão de Débito - Barbearia')
        app.save(checkout)

        const comms = app.findRecordsByFilter(
          'commissions',
          `checkout_id = '${checkout.id}'`,
          '',
          100,
          0,
        )
        for (const c of comms) {
          c.set('fee_amount', 0)
          const amt = c.getFloat('amount')

          if (
            Math.abs(amt - 78.58) < 0.1 ||
            Math.abs(amt - 80) < 0.1 ||
            Math.abs(amt - 39.29) < 0.1
          ) {
            c.set('gross_amount', 160.0)
            c.set('amount', 80.0)
          } else if (Math.abs(amt - 15) < 0.1 || Math.abs(amt - 14.73) < 0.1) {
            c.set('gross_amount', 30.0)
            c.set('amount', 15.0)
          }

          app.save(c)
        }
      }
    } catch (e) {
      console.log('Checkout 5508 not found or error:', e)
    }
  },
  (app) => {},
)
