migrate(
  (app) => {
    const collectionsToClear = [
      'queue_entries',
      'commissions',
      'checkouts',
      'client_logs',
      'stock_movements',
      'inventory_purchases',
      'product_purchases',
      'appointments',
      'client_packages',
      'barber_blocks',
      'clients',
      'products',
      'suppliers',
    ]

    for (const table of collectionsToClear) {
      app.db().newQuery(`DELETE FROM ${table}`).execute()
    }
  },
  (app) => {
    // This is a data cleanup migration; it cannot be reversed.
  },
)
