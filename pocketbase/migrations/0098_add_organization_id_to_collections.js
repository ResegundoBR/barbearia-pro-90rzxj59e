migrate(
  (app) => {
    const collectionsToAddOrg = [
      'commissions',
      'packages',
      'client_packages',
      'product_purchases',
      'commission_rules',
      'business_hours',
      'payment_methods',
      'client_logs',
      'notifications',
      'notification_rules',
      'inventory_purchases',
      'stock_movements',
      'checkouts',
      'barber_blocks',
    ]

    const orgCollection = app.findCollectionByNameOrId('organizations')

    for (const name of collectionsToAddOrg) {
      try {
        const col = app.findCollectionByNameOrId(name)
        if (!col.fields.getByName('organization_id')) {
          col.fields.add(
            new RelationField({
              name: 'organization_id',
              collectionId: orgCollection.id,
              maxSelect: 1,
            }),
          )
          app.save(col)
        }
      } catch (e) {
        console.log('Error adding org to ' + name, e)
      }
    }

    // Backfill existing data where organization_id is missing
    let defaultOrgId = ''
    try {
      const defaultOrg = app.findFirstRecordByFilter('organizations', '1=1')
      if (defaultOrg) {
        defaultOrgId = defaultOrg.id
      }
    } catch (e) {}

    if (defaultOrgId) {
      const backfillQueries = [
        `UPDATE client_packages SET organization_id = COALESCE((SELECT organization_id FROM clients WHERE clients.id = client_packages.client_id), '${defaultOrgId}') WHERE organization_id = '' OR organization_id IS NULL`,
        `UPDATE commissions SET organization_id = COALESCE((SELECT organization_id FROM barbers WHERE barbers.id = commissions.barber_id), '${defaultOrgId}') WHERE organization_id = '' OR organization_id IS NULL`,
        `UPDATE product_purchases SET organization_id = COALESCE((SELECT organization_id FROM clients WHERE clients.id = product_purchases.client_id), '${defaultOrgId}') WHERE organization_id = '' OR organization_id IS NULL`,
        `UPDATE client_logs SET organization_id = COALESCE((SELECT organization_id FROM clients WHERE clients.id = client_logs.client_id), '${defaultOrgId}') WHERE organization_id = '' OR organization_id IS NULL`,
        `UPDATE notifications SET organization_id = COALESCE((SELECT organization_id FROM users WHERE users.id = notifications.user_id), '${defaultOrgId}') WHERE organization_id = '' OR organization_id IS NULL`,
        `UPDATE inventory_purchases SET organization_id = COALESCE((SELECT organization_id FROM products WHERE products.id = inventory_purchases.product_id), '${defaultOrgId}') WHERE organization_id = '' OR organization_id IS NULL`,
        `UPDATE checkouts SET organization_id = COALESCE((SELECT organization_id FROM clients WHERE clients.id = checkouts.client_id), '${defaultOrgId}') WHERE organization_id = '' OR organization_id IS NULL`,
        `UPDATE barber_blocks SET organization_id = COALESCE((SELECT organization_id FROM barbers WHERE barbers.id = barber_blocks.barber_id), '${defaultOrgId}') WHERE organization_id = '' OR organization_id IS NULL`,
        `UPDATE stock_movements SET organization_id = COALESCE((SELECT organization_id FROM products WHERE products.id = stock_movements.product_id), '${defaultOrgId}') WHERE organization_id = '' OR organization_id IS NULL`,
        `UPDATE commission_rules SET organization_id = COALESCE((SELECT organization_id FROM barbers WHERE barbers.id = commission_rules.barber_id), '${defaultOrgId}') WHERE (organization_id = '' OR organization_id IS NULL)`,
      ]

      for (const q of backfillQueries) {
        try {
          app.db().newQuery(q).execute()
        } catch (e) {}
      }

      // Generic fallback for others
      for (const name of collectionsToAddOrg) {
        try {
          app
            .db()
            .newQuery(
              `UPDATE ${name} SET organization_id = {:orgId} WHERE organization_id = '' OR organization_id IS NULL`,
            )
            .bind({ orgId: defaultOrgId })
            .execute()
        } catch (e) {}
      }
    }

    const allColls = [
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
      'role_permissions',
      'queue_entries',
    ]

    for (const name of allColls) {
      try {
        const col = app.findCollectionByNameOrId(name)

        const enforceOrg = (rule) => {
          if (rule === null) return rule
          if (rule === '')
            return `organization_id = @request.auth.organization_id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br'`
          if (rule.includes('organization_id = @request.auth.organization_id')) return rule
          return `(organization_id = @request.auth.organization_id && (${rule})) || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br'`
        }

        col.listRule = enforceOrg(col.listRule)
        col.viewRule = enforceOrg(col.viewRule)
        col.createRule = enforceOrg(col.createRule)
        col.updateRule = enforceOrg(col.updateRule)
        col.deleteRule = enforceOrg(col.deleteRule)
        app.save(col)
      } catch (e) {
        console.log('Error updating rules for ' + name, e)
      }
    }

    try {
      const users = app.findCollectionByNameOrId('users')
      users.listRule = `id = @request.auth.id || organization_id = @request.auth.organization_id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br'`
      users.viewRule = `id = @request.auth.id || organization_id = @request.auth.organization_id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br'`
      app.save(users)
    } catch (e) {
      console.log('Error updating users', e)
    }
  },
  (app) => {
    // Revert logic intentionally omitted to avoid data loss on rollback
  },
)
