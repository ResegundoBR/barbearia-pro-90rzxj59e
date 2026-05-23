migrate(
  (app) => {
    const orgs = app.findCollectionByNameOrId('organizations')
    const defaultOrg = new Record(orgs)
    defaultOrg.set('name', 'Barbearia Default')
    defaultOrg.set('plan', 'Platinum')
    app.save(defaultOrg)

    const cols = [
      'users',
      'clients',
      'products',
      'suppliers',
      'barbers',
      'services',
      'appointments',
      'categories',
    ]
    for (const name of cols) {
      const col = app.findCollectionByNameOrId(name)
      if (!col.fields.getByName('organization_id')) {
        col.fields.add(
          new RelationField({
            name: 'organization_id',
            collectionId: orgs.id,
            maxSelect: 1,
          }),
        )
        app.save(col)
        app
          .db()
          .newQuery(`UPDATE ${name} SET organization_id = {:orgId}`)
          .bind({ orgId: defaultOrg.id })
          .execute()
      }
    }
  },
  (app) => {
    const cols = [
      'users',
      'clients',
      'products',
      'suppliers',
      'barbers',
      'services',
      'appointments',
      'categories',
    ]
    for (const name of cols) {
      try {
        const col = app.findCollectionByNameOrId(name)
        if (col.fields.getByName('organization_id')) {
          col.fields.removeByName('organization_id')
          app.save(col)
        }
      } catch (e) {}
    }
  },
)
