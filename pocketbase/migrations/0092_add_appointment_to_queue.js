migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('queue_entries')
    col.fields.add(
      new RelationField({
        name: 'appointment_id',
        collectionId: app.findCollectionByNameOrId('appointments').id,
        cascadeDelete: false,
        maxSelect: 1,
      }),
    )
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('queue_entries')
    col.fields.removeByName('appointment_id')
    app.save(col)
  },
)
