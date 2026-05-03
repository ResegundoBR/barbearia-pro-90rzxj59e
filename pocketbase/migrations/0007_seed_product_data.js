migrate(
  (app) => {
    const productsCol = app.findCollectionByNameOrId('products')

    const p1 = new Record(productsCol)
    p1.set('name', 'Pomada Modeladora')
    p1.set('price', 35.0)
    p1.set('is_active', true)
    app.save(p1)

    const p2 = new Record(productsCol)
    p2.set('name', 'Óleo para Barba')
    p2.set('price', 45.0)
    p2.set('is_active', true)
    app.save(p2)

    const clients = app.findRecordsByFilter('clients', '1=1', '', 1, 0)
    if (clients.length > 0) {
      const ppCol = app.findCollectionByNameOrId('product_purchases')
      const pp = new Record(ppCol)
      pp.set('client_id', clients[0].id)
      pp.set('product_id', p1.id)
      pp.set('price_at_sale', 35.0)
      pp.set('date', new Date().toISOString())
      app.save(pp)
    }
  },
  (app) => {
    try {
      app.truncateCollection(app.findCollectionByNameOrId('products'))
    } catch (e) {}
    try {
      app.truncateCollection(app.findCollectionByNameOrId('product_purchases'))
    } catch (e) {}
  },
)
