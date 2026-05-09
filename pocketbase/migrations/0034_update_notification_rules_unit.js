migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('notification_rules')
    if (!col.fields.getByName('timing_unit')) {
      const field = new SelectField({
        name: 'timing_unit',
        values: ['hours_minutes', 'days'],
        maxSelect: 1,
      })
      col.fields.add(field)
      app.save(col)
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('notification_rules')
    col.fields.removeByName('timing_unit')
    app.save(col)
  },
)
