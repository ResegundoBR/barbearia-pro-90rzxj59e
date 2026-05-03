migrate(
  (app) => {
    const apts = app.findCollectionByNameOrId('appointments')
    apts.addIndex('idx_appointments_date', false, 'date', '')
    apts.addIndex('idx_appointments_status', false, 'status', '')
    app.save(apts)

    const pkgs = app.findCollectionByNameOrId('client_packages')
    pkgs.addIndex('idx_client_packages_expires_at', false, 'expires_at', '')
    app.save(pkgs)
  },
  (app) => {
    try {
      const apts = app.findCollectionByNameOrId('appointments')
      apts.removeIndex('idx_appointments_date')
      apts.removeIndex('idx_appointments_status')
      app.save(apts)
    } catch (_) {}

    try {
      const pkgs = app.findCollectionByNameOrId('client_packages')
      pkgs.removeIndex('idx_client_packages_expires_at')
      app.save(pkgs)
    } catch (_) {}
  },
)
