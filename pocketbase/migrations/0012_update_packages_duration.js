migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('packages')

    if (!col.fields.getByName('duration_minutes')) {
      col.fields.add(
        new NumberField({
          name: 'duration_minutes',
          required: false,
        }),
      )
      app.save(col)

      app
        .db()
        .newQuery(
          'UPDATE packages SET duration_minutes = 30 WHERE duration_minutes IS NULL OR duration_minutes = 0',
        )
        .execute()

      const colUpdated = app.findCollectionByNameOrId('packages')
      colUpdated.fields.getByName('duration_minutes').required = true
      app.save(colUpdated)
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('packages')
    if (col.fields.getByName('duration_minutes')) {
      col.fields.removeByName('duration_minutes')
      app.save(col)
    }
  },
)
