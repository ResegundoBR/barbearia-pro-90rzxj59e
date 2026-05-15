migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('users')

    let record
    try {
      record = app.findAuthRecordByEmail('users', 'alissonmayer7@gmail.com')
    } catch (_) {
      record = new Record(collection)
      record.setEmail('alissonmayer7@gmail.com')
    }

    record.setPassword('Skip@Pass123')
    record.set('access_level', 'Admin')
    record.setVerified(true)

    app.save(record)
  },
  (app) => {
    // Not reverting seed data to avoid accidental lockouts
  },
)
