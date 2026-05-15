migrate(
  (app) => {
    const usersCol = app.findCollectionByNameOrId('_pb_users_auth_')

    // 1. Ensure user exists with Admin access
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'alissonmayer7@gmail.com')
      if (record.getString('access_level') !== 'Admin') {
        record.set('access_level', 'Admin')
        app.save(record)
      }
    } catch (_) {
      const record = new Record(usersCol)
      record.setEmail('alissonmayer7@gmail.com')
      record.setPassword('Skip@Pass')
      record.setVerified(true)
      record.set('name', 'Admin')
      record.set('access_level', 'Admin')
      app.save(record)
    }

    // 2. Update API rules to use new admin email
    const collectionsToUpdate = [
      'users',
      'barbers',
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
      'notifications',
      'notification_rules',
      'suppliers',
      'inventory_purchases',
    ]

    for (const name of collectionsToUpdate) {
      try {
        const col = app.findCollectionByNameOrId(name)
        let updated = false

        const replaceRule = (rule) => {
          if (!rule) return rule
          const newRule = rule.replace(
            /reginaldo\.segundo@planagroup\.com\.br/g,
            'alissonmayer7@gmail.com',
          )
          if (rule !== newRule) updated = true
          return newRule
        }

        col.listRule = replaceRule(col.listRule)
        col.viewRule = replaceRule(col.viewRule)
        col.createRule = replaceRule(col.createRule)
        col.updateRule = replaceRule(col.updateRule)
        col.deleteRule = replaceRule(col.deleteRule)

        if (updated) {
          app.save(col)
        }
      } catch (e) {
        console.log('Error updating rules for collection:', name, e)
      }
    }
  },
  (app) => {
    const collectionsToUpdate = [
      'users',
      'barbers',
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
      'notifications',
      'notification_rules',
      'suppliers',
      'inventory_purchases',
    ]

    for (const name of collectionsToUpdate) {
      try {
        const col = app.findCollectionByNameOrId(name)
        let updated = false

        const replaceRule = (rule) => {
          if (!rule) return rule
          const newRule = rule.replace(
            /alissonmayer7@gmail\.com/g,
            'reginaldo.segundo@planagroup.com.br',
          )
          if (rule !== newRule) updated = true
          return newRule
        }

        col.listRule = replaceRule(col.listRule)
        col.viewRule = replaceRule(col.viewRule)
        col.createRule = replaceRule(col.createRule)
        col.updateRule = replaceRule(col.updateRule)
        col.deleteRule = replaceRule(col.deleteRule)

        if (updated) {
          app.save(col)
        }
      } catch (e) {
        console.log('Error reverting rules for collection:', name, e)
      }
    }
  },
)
