migrate(
  (app) => {
    // Update users rules to isolate Autonomo
    const users = app.findCollectionByNameOrId('users')
    users.listRule =
      "id = @request.auth.id || (@request.auth.access_level != 'Autonomo' && organization_id = @request.auth.organization_id) || @request.auth.email = 'alissonmayer7@gmail.com'"
    users.viewRule = users.listRule
    app.save(users)

    // Update barbers rules to isolate Autonomo
    const barbers = app.findCollectionByNameOrId('barbers')
    barbers.listRule =
      "user_id = @request.auth.id || (@request.auth.access_level != 'Autonomo' && organization_id = @request.auth.organization_id) || @request.auth.email = 'alissonmayer7@gmail.com'"
    barbers.viewRule = barbers.listRule
    app.save(barbers)

    // Update appointments rules
    const appts = app.findCollectionByNameOrId('appointments')
    appts.listRule =
      "(organization_id = @request.auth.organization_id && (@request.auth.access_level != 'Autonomo' || barber_id.user_id = @request.auth.id)) || @request.auth.email = 'alissonmayer7@gmail.com'"
    appts.viewRule = appts.listRule
    appts.updateRule = appts.listRule
    app.save(appts)

    // Update clients rules
    const clients = app.findCollectionByNameOrId('clients')
    clients.listRule =
      "(organization_id = @request.auth.organization_id && (@request.auth.access_level != 'Autonomo' || created_by_id.user_id = @request.auth.id || preferred_barber_id.user_id = @request.auth.id)) || @request.auth.email = 'alissonmayer7@gmail.com'"
    clients.viewRule = clients.listRule
    app.save(clients)
  },
  (app) => {
    // Safe down migration is omitted as standard practice for API rules
  },
)
