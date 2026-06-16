migrate(
  (app) => {
    const checkouts = app.findRecordsByFilter(
      'checkouts',
      "organization_id = '' || organization_id = null",
      '',
      10000,
      0,
    )
    for (let i = 0; i < checkouts.length; i++) {
      const checkout = checkouts[i]
      try {
        const barber = app.findRecordById('barbers', checkout.getString('barber_id'))
        const orgId = barber.getString('organization_id')
        if (orgId) {
          checkout.set('organization_id', orgId)
          app.save(checkout)
        }
      } catch (_) {}
    }
  },
  (app) => {
    // No revert needed
  },
)
