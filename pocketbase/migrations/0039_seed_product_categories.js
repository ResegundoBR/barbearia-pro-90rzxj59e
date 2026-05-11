migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('categories')
    const types = ['Uso e Consumo', 'Beleza', 'Bebidas', 'Rouparia']
    for (const t of types) {
      try {
        app.findFirstRecordByData('categories', 'name', t)
      } catch (_) {
        const record = new Record(col)
        record.set('name', t)
        record.set('type', 'product')
        app.save(record)
      }
    }
  },
  (app) => {},
)
