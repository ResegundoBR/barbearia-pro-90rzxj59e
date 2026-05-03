migrate(
  (app) => {
    const products = app.findCollectionByNameOrId('products')
    products.fields.add(new NumberField({ name: 'stock_initial' }))
    products.fields.add(new NumberField({ name: 'reorder_point' }))
    products.fields.add(new NumberField({ name: 'min_stock' }))
    products.fields.add(new NumberField({ name: 'last_purchase_price' }))
    products.fields.add(new NumberField({ name: 'stock_quantity' }))
    app.save(products)

    const barbers = app.findCollectionByNameOrId('barbers')
    barbers.fields.add(new TextField({ name: 'color' }))
    app.save(barbers)

    try {
      const records = app.findRecordsByFilter('barbers', '1=1', '', 100, 0)
      const colors = [
        '#ef4444',
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#8b5cf6',
        '#6366f1',
        '#ec4899',
        '#14b8a6',
      ]
      for (let i = 0; i < records.length; i++) {
        records[i].set('color', colors[i % colors.length])
        app.save(records[i])
      }
    } catch (_) {}
  },
  (app) => {
    const products = app.findCollectionByNameOrId('products')
    products.fields.removeByName('stock_initial')
    products.fields.removeByName('reorder_point')
    products.fields.removeByName('min_stock')
    products.fields.removeByName('last_purchase_price')
    products.fields.removeByName('stock_quantity')
    app.save(products)

    const barbers = app.findCollectionByNameOrId('barbers')
    barbers.fields.removeByName('color')
    app.save(barbers)
  },
)
