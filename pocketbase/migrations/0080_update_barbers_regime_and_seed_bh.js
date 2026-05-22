migrate(
  (app) => {
    const barbers = app.findCollectionByNameOrId('barbers')

    if (!barbers.fields.getByName('work_regime')) {
      barbers.fields.add(
        new SelectField({
          name: 'work_regime',
          values: ['fixed', 'on_demand'],
          maxSelect: 1,
        }),
      )
      app.save(barbers)
    }

    app
      .db()
      .newQuery(
        "UPDATE barbers SET work_regime = 'fixed' WHERE work_regime = '' OR work_regime IS NULL",
      )
      .execute()

    const bhCount = app.countRecords('business_hours')
    if (bhCount === 0) {
      const bhCollection = app.findCollectionByNameOrId('business_hours')
      for (let day = 0; day <= 6; day++) {
        const record = new Record(bhCollection)
        record.set('day_of_week', day.toString())
        record.set('is_active', day !== 0)
        record.set('open_time', '09:00')
        record.set('close_time', '18:00')
        app.save(record)
      }
    }
  },
  (app) => {
    const barbers = app.findCollectionByNameOrId('barbers')
    if (barbers.fields.getByName('work_regime')) {
      barbers.fields.removeByName('work_regime')
      app.save(barbers)
    }
  },
)
