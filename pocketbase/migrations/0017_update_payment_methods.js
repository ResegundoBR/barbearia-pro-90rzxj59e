migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('commissions')
    const field = col.fields.getByName('payment_method')
    if (field) {
      field.values = ['cash', 'pix', 'debito', 'credito']
      app.save(col)
    }
    app
      .db()
      .newQuery("UPDATE commissions SET payment_method = 'credito' WHERE payment_method = 'card'")
      .execute()
  },
  (app) => {
    const col = app.findCollectionByNameOrId('commissions')
    const field = col.fields.getByName('payment_method')
    if (field) {
      field.values = ['cash', 'pix', 'card']
      app.save(col)
    }
    app
      .db()
      .newQuery(
        "UPDATE commissions SET payment_method = 'card' WHERE payment_method = 'credito' OR payment_method = 'debito'",
      )
      .execute()
  },
)
