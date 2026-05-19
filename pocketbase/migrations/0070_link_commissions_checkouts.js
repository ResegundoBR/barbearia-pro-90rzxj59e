migrate(
  (app) => {
    const commissions = app.findRecordsByFilter('commissions', '1=1', '', 100000, 0)
    const checkouts = app.findRecordsByFilter('checkouts', '1=1', '', 100000, 0)

    const apts = app.findRecordsByFilter('appointments', '1=1', '', 100000, 0)
    const aptMap = {}
    for (const a of apts) aptMap[a.id] = a

    const prods = app.findRecordsByFilter('product_purchases', '1=1', '', 100000, 0)
    const prodMap = {}
    for (const p of prods) prodMap[p.id] = p

    const packs = app.findRecordsByFilter('client_packages', '1=1', '', 100000, 0)
    const packMap = {}
    for (const p of packs) packMap[p.id] = p

    for (const c of commissions) {
      if (c.getString('checkout_id')) continue

      let clientId = null
      let refTime = new Date(c.getString('created')).getTime()

      if (c.getString('appointment_id') && aptMap[c.getString('appointment_id')]) {
        clientId = aptMap[c.getString('appointment_id')].getString('client_id')
        refTime = new Date(
          aptMap[c.getString('appointment_id')].getString('updated') ||
            aptMap[c.getString('appointment_id')].getString('created'),
        ).getTime()
      } else if (
        c.getString('product_purchase_id') &&
        prodMap[c.getString('product_purchase_id')]
      ) {
        clientId = prodMap[c.getString('product_purchase_id')].getString('client_id')
        refTime = new Date(
          prodMap[c.getString('product_purchase_id')].getString('created'),
        ).getTime()
      } else if (c.getString('client_package_id') && packMap[c.getString('client_package_id')]) {
        clientId = packMap[c.getString('client_package_id')].getString('client_id')
        refTime = new Date(packMap[c.getString('client_package_id')].getString('created')).getTime()
      }

      if (clientId) {
        let matched = null
        for (const ck of checkouts) {
          if (ck.getString('client_id') === clientId) {
            const ckTime = new Date(ck.getString('date') || ck.getString('created')).getTime()
            if (Math.abs(ckTime - refTime) < 120000) {
              matched = ck.id
              break
            }
          }
        }
        if (matched) {
          c.set('checkout_id', matched)
          app.save(c)
        }
      }
    }
  },
  (app) => {},
)
