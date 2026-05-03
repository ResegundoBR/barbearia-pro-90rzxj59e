migrate(
  (app) => {
    const collection = new Collection({
      name: 'commission_rules',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        {
          name: 'barber_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('barbers').id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'item_id', type: 'text', required: true },
        {
          name: 'item_type',
          type: 'select',
          required: true,
          values: ['service', 'package', 'product'],
          maxSelect: 1,
        },
        { name: 'value', type: 'number', required: true },
        {
          name: 'type',
          type: 'select',
          required: true,
          values: ['percentage', 'fixed'],
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId('commission_rules')
      app.delete(collection)
    } catch (_) {}
  },
)
