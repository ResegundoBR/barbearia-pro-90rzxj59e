migrate(
  (app) => {
    const collection = new Collection({
      name: 'inventory_purchases',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        {
          name: 'product_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('products').id,
          maxSelect: 1,
        },
        {
          name: 'supplier_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('suppliers').id,
          maxSelect: 1,
        },
        { name: 'price_paid', type: 'number', required: true },
        { name: 'quantity', type: 'number', required: true },
        { name: 'purchase_date', type: 'date', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('inventory_purchases')
    app.delete(collection)
  },
)
