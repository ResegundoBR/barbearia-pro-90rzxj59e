migrate(
  (app) => {
    // Clear commissions linked to operational data that is tied to clients
    app
      .db()
      .newQuery(`
    DELETE FROM commissions 
    WHERE appointment_id IN (SELECT id FROM appointments WHERE client_id != '' AND client_id IS NOT NULL)
       OR product_purchase_id IN (SELECT id FROM product_purchases WHERE client_id != '' AND client_id IS NOT NULL)
       OR client_package_id IN (SELECT id FROM client_packages WHERE client_id != '' AND client_id IS NOT NULL)
       OR checkout_id IN (SELECT id FROM checkouts WHERE client_id != '' AND client_id IS NOT NULL)
  `)
      .execute()

    const tables = [
      'client_logs',
      'client_packages',
      'appointments',
      'queue_entries',
      'product_purchases',
      'checkouts',
      'stock_movements',
    ]

    for (const table of tables) {
      if (app.hasTable(table)) {
        app
          .db()
          .newQuery(`DELETE FROM ${table} WHERE client_id != '' AND client_id IS NOT NULL`)
          .execute()
      }
    }

    app.db().newQuery('DELETE FROM clients').execute()
  },
  (app) => {
    // Irreversible
  },
)
