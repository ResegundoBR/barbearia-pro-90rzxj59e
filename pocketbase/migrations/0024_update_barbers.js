migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('barbers')

    if (!col.fields.getByName('work_level')) {
      col.fields.add(
        new SelectField({
          name: 'work_level',
          values: ['socio', 'autonomo'],
          maxSelect: 1,
        }),
      )
    }

    if (!col.fields.getByName('payment_schedule_config')) {
      col.fields.add(
        new JSONField({
          name: 'payment_schedule_config',
        }),
      )
    }

    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('barbers')
    col.fields.removeByName('work_level')
    col.fields.removeByName('payment_schedule_config')
    app.save(col)
  },
)
