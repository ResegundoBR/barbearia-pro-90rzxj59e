migrate(
  (app) => {
    // Update appointments rules
    const appointments = app.findCollectionByNameOrId('appointments')
    appointments.listRule =
      "organization_id = @request.auth.organization_id && (@request.auth.access_level != 'Autonomo' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com')"
    appointments.viewRule = appointments.listRule
    app.save(appointments)

    // Update clients rules
    const clients = app.findCollectionByNameOrId('clients')
    clients.listRule =
      "organization_id = @request.auth.organization_id && (@request.auth.access_level != 'Autonomo' || created_by_id.user_id = @request.auth.id || preferred_barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com')"
    clients.viewRule = clients.listRule
    app.save(clients)
  },
  (app) => {
    // Revert appointments rules
    const appointments = app.findCollectionByNameOrId('appointments')
    appointments.listRule =
      "organization_id = @request.auth.organization_id || @request.auth.email = 'alissonmayer7@gmail.com'"
    appointments.viewRule = appointments.listRule
    app.save(appointments)

    // Revert clients rules
    const clients = app.findCollectionByNameOrId('clients')
    clients.listRule =
      "organization_id = @request.auth.organization_id || @request.auth.email = 'alissonmayer7@gmail.com'"
    clients.viewRule = clients.listRule
    app.save(clients)
  },
)
