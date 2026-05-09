migrate(
  (app) => {
    const collection = new Collection({
      name: 'payment_methods',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          required: true,
          values: ['credit_card', 'debit_card', 'pix', 'cash', 'other'],
        },
        { name: 'fee_percentage', type: 'number' },
        { name: 'is_active', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)

    const methods = [
      { name: 'Dinheiro', type: 'cash', fee_percentage: 0, is_active: true },
      { name: 'Pix', type: 'pix', fee_percentage: 0, is_active: true },
      { name: 'Cartão de Débito', type: 'debit_card', fee_percentage: 1.5, is_active: true },
      { name: 'Cartão de Crédito', type: 'credit_card', fee_percentage: 3.5, is_active: true },
    ]

    const paymentCollection = app.findCollectionByNameOrId('payment_methods')
    for (const m of methods) {
      const record = new Record(paymentCollection)
      record.set('name', m.name)
      record.set('type', m.type)
      record.set('fee_percentage', m.fee_percentage)
      record.set('is_active', m.is_active)
      app.save(record)
    }
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('payment_methods')
    app.delete(collection)
  },
)
