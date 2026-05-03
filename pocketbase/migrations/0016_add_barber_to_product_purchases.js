migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('product_purchases')
    col.fields.add(
      new RelationField({
        name: 'barber_id',
        collectionId: app.findCollectionByNameOrId('barbers').id,
        cascadeDelete: false,
        maxSelect: 1,
      }),
    )
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('product_purchases')
    col.fields.removeByName('barber_id')
    app.save(col)
  },
)
