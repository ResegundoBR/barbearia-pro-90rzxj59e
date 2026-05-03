migrate(
  (app) => {
    // services.duration_minutes
    const services = app.findCollectionByNameOrId('services')
    if (!services.fields.getByName('duration_minutes')) {
      services.fields.add(new NumberField({ name: 'duration_minutes', required: true, min: 1 }))
    }
    app.save(services)

    // products.category
    const products = app.findCollectionByNameOrId('products')
    if (!products.fields.getByName('category')) {
      products.fields.add(new TextField({ name: 'category' }))
    }
    app.save(products)

    // commission_rules.item_type
    const rules = app.findCollectionByNameOrId('commission_rules')
    const itemTypeField = rules.fields.getByName('item_type')
    if (itemTypeField) {
      itemTypeField.values = ['service', 'package', 'product', 'category']
    }
    app.save(rules)

    // appointments.time & end_time
    const appointments = app.findCollectionByNameOrId('appointments')
    if (!appointments.fields.getByName('time')) {
      appointments.fields.add(new TextField({ name: 'time' }))
    }
    if (!appointments.fields.getByName('end_time')) {
      appointments.fields.add(new TextField({ name: 'end_time' }))
    }
    app.save(appointments)

    // business_hours collection
    try {
      app.findCollectionByNameOrId('business_hours')
    } catch (_) {
      const bh = new Collection({
        name: 'business_hours',
        type: 'base',
        listRule: '',
        viewRule: '',
        createRule: '',
        updateRule: '',
        deleteRule: '',
        fields: [
          {
            name: 'day_of_week',
            type: 'select',
            required: true,
            maxSelect: 1,
            values: ['0', '1', '2', '3', '4', '5', '6'],
          },
          { name: 'open_time', type: 'text', required: true },
          { name: 'close_time', type: 'text', required: true },
          { name: 'is_active', type: 'bool' },
        ],
      })
      app.save(bh)
    }
  },
  (app) => {},
)
