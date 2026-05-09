migrate(
  (app) => {
    const categories = app.findCollectionByNameOrId('categories')

    const services = app.findCollectionByNameOrId('services')
    if (!services.fields.getByName('category_id')) {
      services.fields.add(
        new RelationField({ name: 'category_id', collectionId: categories.id, maxSelect: 1 }),
      )
      app.save(services)
    }

    const products = app.findCollectionByNameOrId('products')
    if (!products.fields.getByName('category_id')) {
      products.fields.add(
        new RelationField({ name: 'category_id', collectionId: categories.id, maxSelect: 1 }),
      )
      app.save(products)
    }
  },
  (app) => {
    const services = app.findCollectionByNameOrId('services')
    if (services.fields.getByName('category_id')) {
      services.fields.removeByName('category_id')
      app.save(services)
    }

    const products = app.findCollectionByNameOrId('products')
    if (products.fields.getByName('category_id')) {
      products.fields.removeByName('category_id')
      app.save(products)
    }
  },
)
