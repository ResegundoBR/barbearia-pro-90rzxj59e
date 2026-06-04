migrate(
  (app) => {
    let org
    try {
      org = app.findFirstRecordByData('organizations', 'name', 'La Barberia')
    } catch (_) {
      try {
        org = app.findFirstRecordByData('organizations', 'name', 'La Barberiá')
      } catch (_) {
        try {
          const orgCol = app.findCollectionByNameOrId('organizations')
          org = new Record(orgCol)
          org.set('name', 'La Barberia')
          org.set('plan', 'Pro')
          app.save(org)
        } catch (err) {
          console.log('Could not create org: ' + err.message)
        }
      }
    }

    let user
    try {
      user = app.findAuthRecordByEmail('users', 'reginaldo.segundo@planagroup.com.br')
    } catch (_) {}

    if (user) {
      user.set('access_level', 'Admin')
      user.set('is_active', true)
      if (org) {
        user.set('organization_id', org.id)
      }
      app.save(user)
    } else {
      try {
        const usersCol = app.findCollectionByNameOrId('users')
        user = new Record(usersCol)
        user.setEmail('reginaldo.segundo@planagroup.com.br')
        user.setPassword('Skip@Pass')
        user.setVerified(true)
        user.set('name', 'Reginaldo Segundo')
        user.set('access_level', 'Admin')
        user.set('is_active', true)
        if (org) {
          user.set('organization_id', org.id)
        }
        app.save(user)
      } catch (err) {
        console.log('Could not create user: ' + err.message)
      }
    }

    const collections = [
      'users',
      'organizations',
      'settings',
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
      'payment_methods',
      'client_logs',
      'notifications',
      'notification_rules',
      'suppliers',
      'inventory_purchases',
      'stock_movements',
      'checkouts',
      'barber_blocks',
      'role_permissions',
      'queue_entries',
    ]

    const adminEmail = 'reginaldo.segundo@planagroup.com.br'

    for (const name of collections) {
      try {
        const col = app.findCollectionByNameOrId(name)

        const appendRule = (rule) => {
          if (rule === null || rule === '') return rule
          if (rule.includes(adminEmail)) return rule
          return rule + ` || @request.auth.email = '${adminEmail}'`
        }

        col.listRule = appendRule(col.listRule)
        col.viewRule = appendRule(col.viewRule)
        col.createRule = appendRule(col.createRule)
        col.updateRule = appendRule(col.updateRule)
        col.deleteRule = appendRule(col.deleteRule)

        app.save(col)
      } catch (err) {
        console.log('Error updating rules for ' + name + ': ' + err.message)
      }
    }
  },
  (app) => {
    const collections = [
      'users',
      'organizations',
      'settings',
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
      'payment_methods',
      'client_logs',
      'notifications',
      'notification_rules',
      'suppliers',
      'inventory_purchases',
      'stock_movements',
      'checkouts',
      'barber_blocks',
      'role_permissions',
      'queue_entries',
    ]
    const adminEmail = 'reginaldo.segundo@planagroup.com.br'

    for (const name of collections) {
      try {
        const col = app.findCollectionByNameOrId(name)
        const removeRule = (rule) => {
          if (rule === null || rule === '') return rule
          return rule.replace(` || @request.auth.email = '${adminEmail}'`, '')
        }

        col.listRule = removeRule(col.listRule)
        col.viewRule = removeRule(col.viewRule)
        col.createRule = removeRule(col.createRule)
        col.updateRule = removeRule(col.updateRule)
        col.deleteRule = removeRule(col.deleteRule)

        app.save(col)
      } catch (err) {
        console.log('Error reverting rules for ' + name + ': ' + err.message)
      }
    }
  },
)
