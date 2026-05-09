migrate(
  (app) => {
    const collection = new Collection({
      name: 'categories',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'type', type: 'select', required: true, values: ['service', 'product'] },
        { name: 'commission_percentage', type: 'number' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('categories')
    app.delete(col)
  },
)
