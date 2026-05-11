migrate(
  (app) => {
    app.db().newQuery('UPDATE users SET emailVisibility = 1').execute()
  },
  (app) => {
    // no-op
  },
)
