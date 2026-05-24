migrate(
  (app) => {
    const collectionsToClear = [
      'notifications',
      'client_logs',
      'commissions',
      'checkouts',
      'stock_movements',
      'inventory_purchases',
      'product_purchases',
      'appointments',
      'client_packages',
      'barber_blocks',
      'products',
      'suppliers',
      'clients',
    ]

    for (const name of collectionsToClear) {
      try {
        const col = app.findCollectionByNameOrId(name)
        app.truncateCollection(col)
      } catch (err) {
        console.log('Could not truncate ' + name + ': ' + err)
      }
    }
  },
  (app) => {
    // Cannot reverse data deletion
  },
)
