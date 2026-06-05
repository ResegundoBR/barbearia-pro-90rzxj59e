migrate(
  (app) => {
    const orgsCollection = app.findCollectionByNameOrId('organizations')
    let org
    try {
      org = app.findFirstRecordByData('organizations', 'name', 'Laboratório')
    } catch (_) {
      org = new Record(orgsCollection)
      org.set('name', 'Laboratório')
      org.set('plan', 'Pro')
      app.save(org)
    }

    const usersCollection = app.findCollectionByNameOrId('_pb_users_auth_')
    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'teste.reginaldo@planagroup.com.br')
    } catch (_) {
      const user = new Record(usersCollection)
      user.setEmail('teste.reginaldo@planagroup.com.br')
      user.setPassword('Skip@Pass')
      user.setVerified(true)
      user.set('name', 'Administrative Test User')
      user.set('access_level', 'Admin')
      user.set('is_active', true)
      user.set('organization_id', org.id)
      app.save(user)
    }
  },
  (app) => {
    try {
      const user = app.findAuthRecordByEmail('_pb_users_auth_', 'teste.reginaldo@planagroup.com.br')
      app.delete(user)
    } catch (_) {}

    try {
      const org = app.findFirstRecordByData('organizations', 'name', 'Laboratório')
      app.delete(org)
    } catch (_) {}
  },
)
