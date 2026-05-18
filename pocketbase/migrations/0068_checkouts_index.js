migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('checkouts')
    col.addIndex('idx_checkouts_number', true, 'checkout_number', '')
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('checkouts')
    col.removeIndex('idx_checkouts_number')
    app.save(col)
  },
)
