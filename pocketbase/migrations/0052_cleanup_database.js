migrate(
  (app) => {
    // Clean up transactional and operational data in a safe child-to-parent order
    // to avoid SQLite foreign key constraint errors, while explicitly preserving:
    // users, services, packages, payment_methods, and settings.
    const collectionsToClean = [
      'client_logs',
      'notifications',
      'inventory_purchases',
      'product_purchases',
      'appointments',
      'client_packages',
      'commissions',
      'commission_rules',
      'notification_rules',
      'clients',
      'products',
      'suppliers',
      'categories',
      'business_hours',
      'barbers',
    ]

    for (const tableName of collectionsToClean) {
      app.db().newQuery(`DELETE FROM ${tableName}`).execute()
    }
  },
  (app) => {
    // Down migration is intentionally empty as we cannot restore deleted data
  },
)
