migrate(
  (app) => {
    app
      .db()
      .newQuery(`
    UPDATE appointments 
    SET status = 'FALTOU' 
    WHERE status = 'Ausente'
  `)
      .execute()
  },
  (app) => {
    app
      .db()
      .newQuery(`
    UPDATE appointments 
    SET status = 'Ausente' 
    WHERE status = 'FALTOU'
  `)
      .execute()
  },
)
