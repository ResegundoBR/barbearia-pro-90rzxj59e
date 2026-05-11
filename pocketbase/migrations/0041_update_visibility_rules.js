migrate(
  (app) => {
    const collections = ['appointments', 'commissions', 'product_purchases', 'client_packages']
    const rule =
      "@request.auth.id != '' && (((@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio') && (barber_id = '' || barber_id.name = @request.auth.name || barber_id.work_level = 'autonomo')) || (@request.auth.access_level = 'Autonomo' && barber_id.name = @request.auth.name))"

    for (const name of collections) {
      try {
        const col = app.findCollectionByNameOrId(name)
        col.listRule = rule
        col.viewRule = rule
        app.save(col)
      } catch (_) {}
    }
  },
  (app) => {
    const collections = ['appointments', 'commissions', 'product_purchases', 'client_packages']
    for (const name of collections) {
      try {
        const col = app.findCollectionByNameOrId(name)
        col.listRule = ''
        col.viewRule = ''
        app.save(col)
      } catch (_) {}
    }
  },
)
