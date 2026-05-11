migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('products')
    col.fields.add(new NumberField({ name: 'cost_price' }))
    col.fields.add(
      new RelationField({
        name: 'supplier_ids',
        collectionId: app.findCollectionByNameOrId('suppliers').id,
        maxSelect: 100,
      }),
    )
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('products')
    col.fields.removeByName('cost_price')
    col.fields.removeByName('supplier_ids')
    app.save(col)
  },
)
