migrate(
  (app) => {
    const checkouts = app.findRecordsByFilter('checkouts', '', '', 100000, 0)

    app.runInTransaction((txApp) => {
      for (const chk of checkouts) {
        let items = []
        try {
          const snap = chk.get('items_snapshot')
          if (typeof snap === 'string') {
            items = JSON.parse(snap)
          } else if (snap && typeof snap === 'object') {
            items = snap
          }
        } catch (e) {}

        if (!Array.isArray(items)) continue

        for (const item of items) {
          if (!item.id) continue

          let filter = ''
          if (item.type === 'service' || item.type === 'appointment') {
            filter = `appointment_id = '${item.id}'`
          } else if (item.type === 'product' || item.type === 'product_purchase') {
            filter = `product_purchase_id = '${item.id}'`
          } else if (item.type === 'package' || item.type === 'client_package') {
            filter = `client_package_id = '${item.id}'`
          }

          if (!filter) continue

          try {
            const comms = txApp.findRecordsByFilter('commissions', filter, '', 10, 0)
            for (const comm of comms) {
              let needsSave = false
              if (!comm.getString('checkout_id')) {
                comm.set('checkout_id', chk.id)
                needsSave = true
              }
              if (!comm.getString('organization_id') && chk.getString('organization_id')) {
                comm.set('organization_id', chk.getString('organization_id'))
                needsSave = true
              }
              if (needsSave) {
                txApp.saveNoValidate(comm)
              }
            }
          } catch (e) {}
        }
      }
    })
  },
  (app) => {
    // Down migration left empty safely. Reverting the backfill is not strictly required.
  },
)
