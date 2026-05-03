migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('commission_rules')

    const barberField = col.fields.getByName('barber_id')
    if (barberField) {
      barberField.required = false
    }

    const itemIdField = col.fields.getByName('item_id')
    if (itemIdField) {
      itemIdField.required = false
    }

    app.save(col)

    // Clean up old rules as the logic has changed to global categories
    app.db().newQuery('DELETE FROM commission_rules').execute()

    const defaults = [
      { item_type: 'service', item_id: '', value: 50, type: 'percentage' },
      { item_type: 'package', item_id: '', value: 50, type: 'percentage' },
      { item_type: 'category', item_id: 'Beleza', value: 10, type: 'percentage' },
      { item_type: 'category', item_id: 'Bebidas', value: 5, type: 'percentage' },
    ]

    for (const d of defaults) {
      const record = new Record(col)
      record.set('item_type', d.item_type)
      record.set('item_id', d.item_id)
      record.set('value', d.value)
      record.set('type', d.type)
      app.save(record)
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('commission_rules')
    const barberField = col.fields.getByName('barber_id')
    if (barberField) barberField.required = true
    const itemIdField = col.fields.getByName('item_id')
    if (itemIdField) itemIdField.required = true
    app.save(col)
  },
)
