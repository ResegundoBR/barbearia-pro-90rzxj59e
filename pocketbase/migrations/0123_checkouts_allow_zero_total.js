migrate(
  (app) => {
    // Checkout de pacote já pago tem total R$ 0,00: o campo não pode rejeitar zero.
    const col = app.findCollectionByNameOrId('checkouts')
    const totalField = col.fields.getByName('total_amount')
    if (totalField) {
      totalField.required = false
      app.save(col)
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('checkouts')
    const totalField = col.fields.getByName('total_amount')
    if (totalField) {
      totalField.required = true
      app.save(col)
    }
  },
)
