migrate(
  (app) => {
    const orgs = new Collection({
      name: 'organizations',
      type: 'base',
      listRule:
        "@request.auth.organization_id = id || @request.auth.email = 'alissonmayer7@gmail.com'",
      viewRule:
        "@request.auth.organization_id = id || @request.auth.email = 'alissonmayer7@gmail.com'",
      createRule: "@request.auth.email = 'alissonmayer7@gmail.com'",
      updateRule:
        "@request.auth.organization_id = id || @request.auth.email = 'alissonmayer7@gmail.com'",
      deleteRule: "@request.auth.email = 'alissonmayer7@gmail.com'",
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'plan',
          type: 'select',
          required: true,
          values: ['Free', 'Basic', 'Pro', 'Platinum'],
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(orgs)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('organizations')
    app.delete(col)
  },
)
