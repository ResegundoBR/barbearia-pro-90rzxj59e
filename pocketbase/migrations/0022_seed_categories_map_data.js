migrate(
  (app) => {
    const categories = app.findCollectionByNameOrId('categories')

    const defs = [
      { name: 'Serviços', type: 'service', percentage: 50 },
      { name: 'Beleza', type: 'product', percentage: 10 },
      { name: 'Bebidas', type: 'product', percentage: 0 },
      { name: 'Acessórios', type: 'product', percentage: 0 },
    ]

    const catMap = {}

    for (const d of defs) {
      let record
      try {
        record = app.findFirstRecordByData('categories', 'name', d.name)
      } catch (_) {
        record = new Record(categories)
        record.set('name', d.name)
        record.set('type', d.type)
        record.set('commission_percentage', d.percentage)
        app.save(record)
      }
      catMap[d.name] = record.id
    }

    try {
      const services = app.findRecordsByFilter('services', '1=1', '', 1000, 0)
      for (const s of services) {
        if (!s.getString('category_id')) {
          s.set('category_id', catMap['Serviços'])
          app.save(s)
        }
      }
    } catch (e) {}

    try {
      const products = app.findRecordsByFilter('products', '1=1', '', 1000, 0)
      for (const p of products) {
        if (!p.getString('category_id')) {
          const catName = p.getString('category') || 'Beleza'
          if (catMap[catName]) {
            p.set('category_id', catMap[catName])
          } else {
            try {
              const newCat = new Record(categories)
              newCat.set('name', catName)
              newCat.set('type', 'product')
              newCat.set('commission_percentage', 0)
              app.save(newCat)
              catMap[catName] = newCat.id
              p.set('category_id', newCat.id)
            } catch (e) {}
          }
          app.save(p)
        }
      }
    } catch (e) {}
  },
  (app) => {},
)
