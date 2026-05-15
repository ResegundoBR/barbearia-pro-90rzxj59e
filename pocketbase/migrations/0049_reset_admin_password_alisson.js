migrate(
  (app) => {
    try {
      const user = app.findAuthRecordByEmail('_pb_users_auth_', 'alissonmayer7@gmail.com')
      user.setPassword('Mudar@123')
      user.setVerified(true)
      user.set('access_level', 'Admin')
      app.save(user)
    } catch (_) {
      const collection = app.findCollectionByNameOrId('_pb_users_auth_')
      const user = new Record(collection)
      user.setEmail('alissonmayer7@gmail.com')
      user.setPassword('Mudar@123')
      user.setVerified(true)
      user.set('access_level', 'Admin')
      user.set('name', 'Alisson Mayer')
      app.save(user)
    }
  },
  (app) => {
    // Revert is not implemented for password resets
  },
)
