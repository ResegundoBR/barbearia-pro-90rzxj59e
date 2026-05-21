migrate(
  (app) => {
    const barbers = app.findRecordsByFilter('barbers', '1=1', '', 1000, 0)
    const users = app.findRecordsByFilter('users', '1=1', '', 1000, 0)

    for (const barber of barbers) {
      if (!barber.get('user_id')) {
        const barberName = barber.get('name').toLowerCase().trim()
        const user = users.find((u) => {
          const uName = (u.get('name') + ' ' + u.get('surname')).toLowerCase().trim()
          return uName.includes(barberName) || barberName.includes(uName.split(' ')[0])
        })
        if (user) {
          barber.set('user_id', user.id)
          app.saveNoValidate(barber)
        }
      }
    }

    const barbersCol = app.findCollectionByNameOrId('barbers')
    barbersCol.listRule =
      "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || user_id = @request.auth.id)"
    barbersCol.viewRule =
      "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || user_id = @request.auth.id)"
    app.save(barbersCol)
  },
  (app) => {
    const barbersCol = app.findCollectionByNameOrId('barbers')
    barbersCol.listRule =
      "(@request.auth.id != '') || @request.auth.email = 'alissonmayer7@gmail.com'"
    barbersCol.viewRule =
      "(@request.auth.id != '') || @request.auth.email = 'alissonmayer7@gmail.com'"
    app.save(barbersCol)
  },
)
