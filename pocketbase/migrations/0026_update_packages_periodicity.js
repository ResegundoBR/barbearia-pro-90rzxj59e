migrate(
  (app) => {
    const packagesCol = app.findCollectionByNameOrId('packages')
    if (!packagesCol.fields.getByName('periodicity')) {
      packagesCol.fields.add(
        new SelectField({
          name: 'periodicity',
          values: ['semanal', 'quinzenal'],
          required: false,
        }),
      )
    }
    app.save(packagesCol)

    app
      .db()
      .newQuery(`
    UPDATE client_packages
    SET expires_at = datetime(created, '+30 days')
    WHERE expires_at IS NULL OR expires_at > datetime(created, '+30 days')
  `)
      .execute()
  },
  (app) => {
    const packagesCol = app.findCollectionByNameOrId('packages')
    packagesCol.fields.removeByName('periodicity')
    app.save(packagesCol)
  },
)
