migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('client_packages')
    col.fields.add(
      new NumberField({
        name: 'remaining_uses',
        required: false,
      }),
    )
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('client_packages')
    col.fields.add(
      new NumberField({
        name: 'remaining_uses',
        required: true,
      }),
    )
    app.save(col)
  },
)
