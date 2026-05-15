migrate(
  (app) => {
    const adminEmailRule = "@request.auth.email = 'alissonmayer7@gmail.com'"

    const collectionsToUpdate = [
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

    for (const name of collectionsToUpdate) {
      try {
        const col = app.findCollectionByNameOrId(name)
        let changed = false
        const rules = ['listRule', 'viewRule', 'createRule', 'updateRule', 'deleteRule']

        for (const rule of rules) {
          const currentRule = col[rule]

          if (currentRule === null) {
            col[rule] = adminEmailRule
            changed = true
          } else if (currentRule !== '') {
            if (currentRule.indexOf('alissonmayer7@gmail.com') === -1) {
              col[rule] = `(${currentRule}) || ${adminEmailRule}`
              changed = true
            }
          }
        }

        if (changed) {
          app.save(col)
        }
      } catch (err) {
        // ignore if collection not found
      }
    }

    // Seed Admin User
    const usersCol = app.findCollectionByNameOrId('users')
    let adminUser

    try {
      adminUser = app.findAuthRecordByEmail('users', 'alissonmayer7@gmail.com')
    } catch (_) {
      adminUser = new Record(usersCol)
      adminUser.setEmail('alissonmayer7@gmail.com')
    }

    adminUser.setPassword('Skip@Pass')
    adminUser.setVerified(true)
    adminUser.set('access_level', 'Admin')

    if (!adminUser.get('name')) {
      adminUser.set('name', 'Admin (Alisson)')
    }

    app.save(adminUser)
  },
  (app) => {
    // Safe empty revert
  },
)
