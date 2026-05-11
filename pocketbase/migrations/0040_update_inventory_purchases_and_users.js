migrate(
  (app) => {
    const purchasesCol = app.findCollectionByNameOrId('inventory_purchases')
    if (!purchasesCol.fields.getByName('unit_price')) {
      purchasesCol.fields.add(new NumberField({ name: 'unit_price' }))
    }
    app.save(purchasesCol)

    const usersCol = app.findCollectionByNameOrId('_pb_users_auth_')
    const adminRule =
      "id = @request.auth.id || @request.auth.access_level = 'Admin' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br'"
    usersCol.listRule = adminRule
    usersCol.viewRule = adminRule
    usersCol.updateRule = adminRule
    usersCol.deleteRule = adminRule
    app.save(usersCol)
  },
  (app) => {
    const purchasesCol = app.findCollectionByNameOrId('inventory_purchases')
    purchasesCol.fields.removeByName('unit_price')
    app.save(purchasesCol)

    const usersCol = app.findCollectionByNameOrId('_pb_users_auth_')
    const oldRule = "id = @request.auth.id || @request.auth.access_level = 'Admin'"
    usersCol.listRule = oldRule
    usersCol.viewRule = oldRule
    usersCol.updateRule = oldRule
    usersCol.deleteRule = oldRule
    app.save(usersCol)
  },
)
