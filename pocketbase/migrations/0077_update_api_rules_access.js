migrate(
  (app) => {
    const collections = [
      {
        name: 'appointments',
        rule: "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id.user_id = @request.auth.id)",
      },
      {
        name: 'clients',
        rule: "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || created_by_id.user_id = @request.auth.id || preferred_barber_id.user_id = @request.auth.id)",
      },
      {
        name: 'commissions',
        rule: "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id.user_id = @request.auth.id)",
      },
      {
        name: 'product_purchases',
        rule: "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id.user_id = @request.auth.id)",
      },
      {
        name: 'checkouts',
        rule: "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id.user_id = @request.auth.id)",
      },
      {
        name: 'users',
        rule: "id = @request.auth.id || @request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com'",
      },
    ]

    for (const c of collections) {
      try {
        const col = app.findCollectionByNameOrId(c.name)
        col.listRule = c.rule
        col.viewRule = c.rule
        app.save(col)
      } catch (err) {
        console.log('Migration failed for ' + c.name, err)
      }
    }
  },
  (app) => {
    const rules = {
      appointments:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id = '' || barber_id.user_id = @request.auth.id)",
      clients:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || created_by_id.user_id = @request.auth.id || preferred_barber_id.user_id = @request.auth.id)",
      commissions:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id = '' || barber_id.user_id = @request.auth.id)",
      product_purchases:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id = '' || barber_id.user_id = @request.auth.id)",
      checkouts:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id = '' || barber_id.user_id = @request.auth.id)",
      users:
        "id = @request.auth.id || @request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com'",
    }

    for (const [name, rule] of Object.entries(rules)) {
      try {
        const col = app.findCollectionByNameOrId(name)
        col.listRule = rule
        col.viewRule = rule
        app.save(col)
      } catch (err) {
        console.log('Migration revert failed for ' + name, err)
      }
    }
  },
)
