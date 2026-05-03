migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('appointments')
    if (!col.fields.getByName('client_package_id')) {
      col.fields.add(
        new RelationField({
          name: 'client_package_id',
          type: 'relation',
          collectionId: app.findCollectionByNameOrId('client_packages').id,
          cascadeDelete: false,
          maxSelect: 1,
        }),
      )
      app.save(col)
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('appointments')
    if (col.fields.getByName('client_package_id')) {
      col.fields.removeByName('client_package_id')
      app.save(col)
    }
  },
)
