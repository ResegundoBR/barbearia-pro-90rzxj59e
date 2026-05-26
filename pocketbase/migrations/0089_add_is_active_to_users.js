migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('_pb_users_auth_')
    if (!col.fields.getByName('is_active')) {
      col.fields.add(new BoolField({ name: 'is_active', required: false }))
    }
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('_pb_users_auth_')
    col.fields.removeByName('is_active')
    app.save(col)
  },
)
