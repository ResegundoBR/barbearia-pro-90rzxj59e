migrate(
  (app) => {
    const admin =
      "@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br'"
    const anyAuth = "@request.auth.id != ''"
    const autonomoRead =
      anyAuth + ' && (' + admin + " || barber_id = '' || barber_id.user_id = @request.auth.id)"

    const rules = {
      users: {
        list: 'id = @request.auth.id || ' + admin,
        view: 'id = @request.auth.id || ' + admin,
        create: admin,
        update: 'id = @request.auth.id || ' + admin,
        delete: admin,
      },
      barbers: { list: anyAuth, view: anyAuth, create: admin, update: admin, delete: admin },
      services: { list: anyAuth, view: anyAuth, create: admin, update: admin, delete: admin },
      packages: { list: anyAuth, view: anyAuth, create: admin, update: admin, delete: admin },
      products: { list: anyAuth, view: anyAuth, create: admin, update: admin, delete: admin },
      commission_rules: {
        list: anyAuth,
        view: anyAuth,
        create: admin,
        update: admin,
        delete: admin,
      },
      business_hours: { list: anyAuth, view: anyAuth, create: admin, update: admin, delete: admin },
      categories: { list: anyAuth, view: anyAuth, create: admin, update: admin, delete: admin },
      settings: { list: anyAuth, view: anyAuth, create: admin, update: admin, delete: admin },
      payment_methods: {
        list: anyAuth,
        view: anyAuth,
        create: admin,
        update: admin,
        delete: admin,
      },
      notification_rules: {
        list: anyAuth,
        view: anyAuth,
        create: admin,
        update: admin,
        delete: admin,
      },
      suppliers: { list: anyAuth, view: anyAuth, create: admin, update: admin, delete: admin },
      inventory_purchases: {
        list: anyAuth,
        view: anyAuth,
        create: admin,
        update: admin,
        delete: admin,
      },

      clients: { list: anyAuth, view: anyAuth, create: anyAuth, update: anyAuth, delete: anyAuth },
      client_logs: {
        list: anyAuth,
        view: anyAuth,
        create: anyAuth,
        update: anyAuth,
        delete: anyAuth,
      },

      appointments: {
        list: autonomoRead,
        view: autonomoRead,
        create: anyAuth,
        update: anyAuth,
        delete: anyAuth,
      },
      client_packages: {
        list: autonomoRead,
        view: autonomoRead,
        create: anyAuth,
        update: anyAuth,
        delete: anyAuth,
      },
      product_purchases: {
        list: autonomoRead,
        view: autonomoRead,
        create: anyAuth,
        update: anyAuth,
        delete: anyAuth,
      },
      commissions: {
        list: autonomoRead,
        view: autonomoRead,
        create: anyAuth,
        update: anyAuth,
        delete: anyAuth,
      },

      notifications: {
        list: 'user_id = @request.auth.id || ' + admin,
        view: 'user_id = @request.auth.id || ' + admin,
        create: anyAuth,
        update: anyAuth,
        delete: anyAuth,
      },
    }

    const keys = Object.keys(rules)
    for (let i = 0; i < keys.length; i++) {
      const colName = keys[i]
      const colRules = rules[colName]
      try {
        const col = app.findCollectionByNameOrId(colName)
        col.listRule = colRules.list
        col.viewRule = colRules.view
        col.createRule = colRules.create
        col.updateRule = colRules.update
        col.deleteRule = colRules.delete
        app.save(col)
      } catch (err) {
        console.log('Could not update rules for collection: ' + colName)
      }
    }
  },
  (app) => {
    // Safe forward-only migration.
  },
)
