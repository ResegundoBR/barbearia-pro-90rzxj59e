migrate(
  (app) => {
    try {
      const user = app.findAuthRecordByEmail('_pb_users_auth_', 'alissonmayer7@gmail.com')
      const barbers = app.findRecordsByFilter('barbers', `user_id = '${user.id}'`, '', 1, 0)
      if (barbers.length > 0) {
        const barber = barbers[0]
        barber.set('color', '#10b981')
        app.save(barber)
      }
    } catch (e) {
      // If the user doesn't exist (e.g. in some isolated instances), fail silently
    }
  },
  (app) => {
    try {
      const user = app.findAuthRecordByEmail('_pb_users_auth_', 'alissonmayer7@gmail.com')
      const barbers = app.findRecordsByFilter('barbers', `user_id = '${user.id}'`, '', 1, 0)
      if (barbers.length > 0) {
        const barber = barbers[0]
        barber.set('color', '') // Revert
        app.save(barber)
      }
    } catch (e) {}
  },
)
