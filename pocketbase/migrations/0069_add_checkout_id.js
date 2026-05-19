migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('commissions')
    col.fields.add(
      new RelationField({
        name: 'checkout_id',
        collectionId: app.findCollectionByNameOrId('checkouts').id,
        cascadeDelete: false,
        maxSelect: 1,
      }),
    )
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('commissions')
    col.fields.removeByName('checkout_id')
    app.save(col)
  },
)
