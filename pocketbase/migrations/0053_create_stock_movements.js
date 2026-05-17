migrate(
  (app) => {
    const collection = new Collection({
      name: 'stock_movements',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule:
        "@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com'",
      updateRule:
        "@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com'",
      deleteRule:
        "@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com'",
      fields: [
        {
          name: 'product_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('products').id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          values: ['purchase', 'sale', 'consumption', 'adjustment'],
          maxSelect: 1,
        },
        { name: 'quantity', type: 'number', required: true },
        {
          name: 'barber_id',
          type: 'relation',
          required: false,
          collectionId: app.findCollectionByNameOrId('barbers').id,
          cascadeDelete: false,
          maxSelect: 1,
        },
        {
          name: 'client_id',
          type: 'relation',
          required: false,
          collectionId: app.findCollectionByNameOrId('clients').id,
          cascadeDelete: false,
          maxSelect: 1,
        },
        { name: 'description', type: 'text', required: false },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_stock_movements_product ON stock_movements (product_id)',
        'CREATE INDEX idx_stock_movements_type ON stock_movements (type)',
        'CREATE INDEX idx_stock_movements_created ON stock_movements (created)',
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('stock_movements')
    app.delete(collection)
  },
)
