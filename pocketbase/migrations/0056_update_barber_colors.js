migrate(
  (app) => {
    const barbers = app.findRecordsByFilter('barbers', '1=1', '', 1000, 0)
    for (const b of barbers) {
      const name = b.getString('name').toLowerCase()
      if (name.includes('roberto')) {
        b.set('color', '#f97316')
        app.save(b)
      } else if (name.includes('luiz')) {
        b.set('color', '#3b82f6')
        app.save(b)
      } else if (name.includes('alisson')) {
        b.set('color', '#a855f7')
        app.save(b)
      } else if (name.includes('claudete')) {
        b.set('color', '#ec4899')
        app.save(b)
      }
    }
  },
  (app) => {
    // no-op down migration
  },
)
