migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('clients')

    if (!col.fields.getByName('phone_secondary')) {
      col.fields.add(new TextField({ name: 'phone_secondary' }))
    }

    if (!col.fields.getByName('created_by_id')) {
      col.fields.add(
        new RelationField({
          name: 'created_by_id',
          collectionId: app.findCollectionByNameOrId('barbers').id,
          maxSelect: 1,
        }),
      )
    }

    if (!col.fields.getByName('preferred_barber_id')) {
      col.fields.add(
        new RelationField({
          name: 'preferred_barber_id',
          collectionId: app.findCollectionByNameOrId('barbers').id,
          maxSelect: 1,
        }),
      )
    }

    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('clients')
    col.fields.removeByName('phone_secondary')
    col.fields.removeByName('created_by_id')
    col.fields.removeByName('preferred_barber_id')
    app.save(col)
  },
)
