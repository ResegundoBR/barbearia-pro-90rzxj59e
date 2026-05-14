migrate(
  (app) => {
    // 1. Update `users` rules
    const usersCol = app.findCollectionByNameOrId('users')
    usersCol.createRule =
      "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')"
    usersCol.updateRule =
      "id = @request.auth.id || @request.auth.access_level = 'Admin' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br'"
    usersCol.listRule =
      "id = @request.auth.id || @request.auth.access_level = 'Admin' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br' || @request.auth.access_level = 'Socio'"
    usersCol.viewRule =
      "id = @request.auth.id || @request.auth.access_level = 'Admin' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br' || @request.auth.access_level = 'Socio'"

    // Ensure access_level has proper options
    const accessLevelField = usersCol.fields.getByName('access_level')
    if (accessLevelField) {
      accessLevelField.values = ['Admin', 'Autonomo', 'Socio']
    }
    app.save(usersCol)

    // 2. Add user_id to barbers if not exists
    const barbersCol = app.findCollectionByNameOrId('barbers')
    if (!barbersCol.fields.getByName('user_id')) {
      barbersCol.fields.add(
        new RelationField({
          name: 'user_id',
          collectionId: '_pb_users_auth_',
          cascadeDelete: false,
          maxSelect: 1,
        }),
      )
      app.save(barbersCol)
    }

    // 3. Map users to barbers by name
    const users = app.findRecordsByFilter('users', '1=1', '', 1000, 0)
    const barbers = app.findRecordsByFilter('barbers', '1=1', '', 1000, 0)

    let robertoId = ''
    let alissonId = ''

    for (const user of users) {
      const uName = user.getString('name').toLowerCase()
      if (uName.includes('roberto')) robertoId = user.id
      if (uName.includes('alisson')) alissonId = user.id

      for (const barber of barbers) {
        if (barber.getString('name').toLowerCase() === uName) {
          barber.set('user_id', user.id)
          app.save(barber)
        }
      }
    }

    // 4. Update visibility rules
    const collections = ['appointments', 'commissions', 'product_purchases', 'client_packages']

    const rule = `@request.auth.id != '' && (
    barber_id = '' ||
    (@request.auth.access_level = 'Autonomo' && barber_id.user_id = @request.auth.id) ||
    (@request.auth.id = '${robertoId}' && (barber_id.user_id = @request.auth.id || barber_id.work_level = 'autonomo')) ||
    (@request.auth.access_level != 'Autonomo' && @request.auth.id != '${robertoId}' && barber_id.user_id != '${robertoId}')
  )`

    for (const name of collections) {
      try {
        const col = app.findCollectionByNameOrId(name)
        col.listRule = rule
        col.viewRule = rule
        app.save(col)
      } catch (_) {}
    }
  },
  (app) => {
    // down
  },
)
