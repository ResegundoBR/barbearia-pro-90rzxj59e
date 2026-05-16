migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('inventory_purchases')

    if (!col.fields.getByName('status')) {
      col.fields.add(
        new SelectField({
          name: 'status',
          values: ['pending', 'received'],
          maxSelect: 1,
        }),
      )
    }

    if (!col.fields.getByName('received_at')) {
      col.fields.add(
        new DateField({
          name: 'received_at',
        }),
      )
    }

    col.addIndex('idx_inventory_purchases_status', false, 'status', '')
    app.save(col)

    // Update existing purchases to 'received' to avoid double-counting stock on subsequent updates
    app
      .db()
      .newQuery(
        "UPDATE inventory_purchases SET status = 'received' WHERE status IS NULL OR status = ''",
      )
      .execute()
  },
  (app) => {
    const col = app.findCollectionByNameOrId('inventory_purchases')
    col.fields.removeByName('status')
    col.fields.removeByName('received_at')
    col.removeIndex('idx_inventory_purchases_status')
    app.save(col)
  },
)
