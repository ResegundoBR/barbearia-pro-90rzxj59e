migrate(
  (app) => {
    const names = [
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
      'stock_movements',
      'checkouts',
      'barber_blocks',
      'organizations',
      'role_permissions',
      'queue_entries',
    ]

    for (const name of names) {
      try {
        const col = app.findCollectionByNameOrId(name)
        if (col.type === 'view') continue

        const rules = ['listRule', 'viewRule', 'createRule', 'updateRule', 'deleteRule']
        let changed = false

        for (const rule of rules) {
          let val = col[rule]
          if (
            val &&
            typeof val === 'string' &&
            (val.includes('alissonmayer7@gmail.com') ||
              val.includes('reginaldo.segundo@planagroup.com.br'))
          ) {
            // Remove the email bypass sections
            val = val.replace(
              /\s*\|\|\s*@request\.auth\.email\s*=\s*'alissonmayer7@gmail\.com'/g,
              '',
            )
            val = val.replace(
              /\s*\|\|\s*@request\.auth\.email\s*=\s*'reginaldo\.segundo@planagroup\.com\.br'/g,
              '',
            )
            // Remove potential leading/trailing || if they got exposed
            val = val.replace(/^\s*\|\|\s*/, '')
            val = val.replace(/\s*\|\|\s*$/, '')
            col[rule] = val
            changed = true
          }
        }

        if (changed) {
          app.save(col)
        }
      } catch (err) {
        // ignore missing collections
      }
    }
  },
  (app) => {
    // Irreversible structural change for strict security
  },
)
