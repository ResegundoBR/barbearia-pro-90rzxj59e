migrate(
  (app) => {
    const settings = app.findCollectionByNameOrId('settings')
    settings.fields.add(
      new FileField({
        name: 'logo',
        maxSelect: 1,
        maxSize: 5242880,
        mimeTypes: ['image/png', 'image/jpeg', 'image/svg+xml'],
      }),
    )
    app.save(settings)
  },
  (app) => {
    const settings = app.findCollectionByNameOrId('settings')
    settings.fields.removeByName('logo')
    app.save(settings)
  },
)
