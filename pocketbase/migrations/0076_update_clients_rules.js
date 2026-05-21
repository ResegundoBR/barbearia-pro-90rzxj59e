migrate(
  (app) => {
    const clients = app.findCollectionByNameOrId('clients')

    const rule =
      "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || created_by_id.user_id = @request.auth.id || preferred_barber_id.user_id = @request.auth.id)"

    clients.listRule = rule
    clients.viewRule = rule

    app.save(clients)
  },
  (app) => {
    const clients = app.findCollectionByNameOrId('clients')

    const oldRule = "(@request.auth.id != '') || @request.auth.email = 'alissonmayer7@gmail.com'"
    clients.listRule = oldRule
    clients.viewRule = oldRule

    app.save(clients)
  },
)
