migrate(
  (app) => {
    try {
      const barbers = app.findRecordsByFilter('barbers', "name ~ 'Alisson'", '', 10, 0)
      for (const b of barbers) {
        b.set('color', '#10b981')
        app.save(b)
      }
    } catch (e) {
      // ignore if not found
    }
  },
  (app) => {
    // No-op down migration
  },
)
