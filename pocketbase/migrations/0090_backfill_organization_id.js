migrate(
  (app) => {
    const collections = [
      'clients',
      'appointments',
      'barbers',
      'services',
      'products',
      'categories',
      'suppliers',
    ]
    const targetOrgId = 'ozzi2oua5psdyho'

    for (const colName of collections) {
      try {
        app
          .db()
          .newQuery(
            `UPDATE ${colName} SET organization_id = {:orgId} WHERE organization_id IS NULL OR organization_id = ''`,
          )
          .bind({ orgId: targetOrgId })
          .execute()
      } catch (err) {
        console.log(`Failed to update ${colName}:`, err.message)
      }
    }
  },
  (app) => {
    // Irreversible migration
  },
)
