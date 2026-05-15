migrate(
  (app) => {
    const adminOrSocio =
      "@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br'"
    const anyAuth = "@request.auth.id != ''"

    const readRestricted = `${anyAuth} && (${adminOrSocio} || barber_id = '' || barber_id.user_id = @request.auth.id)`

    const collections = [
      'users',
      'barbers',
      'clients',
      'services',
      'appointments',
      'commissions',
      'packages',
      'client_packages',
      'products',
      'product_purchases',
      'commission_rules',
      'business_hours',
      'categories',
      'settings',
      'payment_methods',
      'client_logs',
      'notifications',
      'notification_rules',
      'suppliers',
      'inventory_purchases',
    ]

    for (const name of collections) {
      try {
        const col = app.findCollectionByNameOrId(name)

        if (name === 'users') {
          col.listRule = `id = @request.auth.id || ${adminOrSocio}`
          col.viewRule = `id = @request.auth.id || ${adminOrSocio}`
          col.createRule = adminOrSocio
          col.updateRule = `id = @request.auth.id || ${adminOrSocio}`
          col.deleteRule = adminOrSocio
        } else if (
          ['appointments', 'commissions', 'client_packages', 'product_purchases'].includes(name)
        ) {
          col.listRule = readRestricted
          col.viewRule = readRestricted
          col.createRule = anyAuth
          col.updateRule = anyAuth
          col.deleteRule = anyAuth
        } else if (['clients', 'client_logs'].includes(name)) {
          col.listRule = anyAuth
          col.viewRule = anyAuth
          col.createRule = anyAuth
          col.updateRule = anyAuth
          col.deleteRule = anyAuth
        } else if (name === 'notifications') {
          col.listRule = `user_id = @request.auth.id || ${adminOrSocio}`
          col.viewRule = `user_id = @request.auth.id || ${adminOrSocio}`
          col.createRule = anyAuth
          col.updateRule = anyAuth
          col.deleteRule = anyAuth
        } else {
          col.listRule = anyAuth
          col.viewRule = anyAuth
          col.createRule = adminOrSocio
          col.updateRule = adminOrSocio
          col.deleteRule = adminOrSocio
        }

        app.save(col)
      } catch (e) {
        console.log('Error updating collection', name, e)
      }
    }
  },
  (app) => {
    // no-op down migration
  },
)
