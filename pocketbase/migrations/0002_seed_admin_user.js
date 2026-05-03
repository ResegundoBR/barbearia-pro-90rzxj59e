migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    let record
    try {
      record = app.findAuthRecordByEmail('_pb_users_auth_', 'reginaldo.segundo@planagroup.com.br')
    } catch (_) {
      record = new Record(users)
      record.setEmail('reginaldo.segundo@planagroup.com.br')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Admin')
    }
    record.set('plan', 'Platinum')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'reginaldo.segundo@planagroup.com.br',
      )
      app.delete(record)
    } catch (_) {}
  },
)
