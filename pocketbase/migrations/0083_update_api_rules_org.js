migrate(
  (app) => {
    const cols = [
      'clients',
      'products',
      'suppliers',
      'barbers',
      'services',
      'appointments',
      'categories',
    ]
    for (const name of cols) {
      const col = app.findCollectionByNameOrId(name)
      const rule =
        "organization_id = @request.auth.organization_id || @request.auth.email = 'alissonmayer7@gmail.com'"
      col.listRule = rule
      col.viewRule = rule
      col.createRule = rule
      col.updateRule = rule
      col.deleteRule = rule
      app.save(col)
    }

    const users = app.findCollectionByNameOrId('users')
    const uRule =
      "id = @request.auth.id || organization_id = @request.auth.organization_id || @request.auth.email = 'alissonmayer7@gmail.com'"
    users.listRule = uRule
    users.viewRule = uRule
    app.save(users)
  },
  (app) => {},
)
