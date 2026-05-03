migrate(
  (app) => {
    const bh = app.findCollectionByNameOrId('business_hours')
    for (let i = 1; i <= 6; i++) {
      try {
        app.findFirstRecordByData('business_hours', 'day_of_week', String(i))
      } catch (_) {
        const record = new Record(bh)
        record.set('day_of_week', String(i))
        record.set('open_time', '08:00')
        record.set('close_time', '20:00')
        record.set('is_active', true)
        app.save(record)
      }
    }

    // update services with default duration 30
    const services = app.findRecordsByFilter(
      'services',
      'duration_minutes = null OR duration_minutes = 0',
      '',
      1000,
      0,
    )
    for (const s of services) {
      s.set('duration_minutes', 30)
      app.saveNoValidate(s)
    }
  },
  (app) => {},
)
