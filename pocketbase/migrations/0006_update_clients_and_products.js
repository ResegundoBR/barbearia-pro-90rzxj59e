migrate(
  (app) => {
    const clients = app.findCollectionByNameOrId('clients')
    const locField = clients.fields.getByName('location_type')
    if (locField) locField.values = ['passage', 'nearby', 'other_city', 'mora_cidade']
    if (!clients.fields.getByName('is_active'))
      clients.fields.add(new BoolField({ name: 'is_active' }))
    app.save(clients)

    const products = new Collection({
      name: 'products',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'price', type: 'number', required: true },
        { name: 'is_active', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(products)

    const product_purchases = new Collection({
      name: 'product_purchases',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'client_id', type: 'relation', required: true, collectionId: clients.id },
        { name: 'product_id', type: 'relation', required: true, collectionId: products.id },
        { name: 'price_at_sale', type: 'number', required: true },
        { name: 'date', type: 'date', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(product_purchases)
  },
  (app) => {
    try {
      app.delete(app.findCollectionByNameOrId('product_purchases'))
    } catch (e) {}
    try {
      app.delete(app.findCollectionByNameOrId('products'))
    } catch (e) {}
    const clients = app.findCollectionByNameOrId('clients')
    clients.fields.removeByName('is_active')
    const locField = clients.fields.getByName('location_type')
    if (locField) locField.values = ['passage', 'nearby', 'other_city']
    app.save(clients)
  },
)
