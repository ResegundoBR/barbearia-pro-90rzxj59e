migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('settings')

    if (!col.fields.getByName('organization_id')) {
      col.fields.add(
        new RelationField({
          name: 'organization_id',
          collectionId: app.findCollectionByNameOrId('organizations').id,
          maxSelect: 1,
        }),
      )
    }

    const logoField = col.fields.getByName('logo')
    if (logoField) {
      logoField.mimeTypes = ['image/png', 'image/jpeg', 'image/svg+xml']
      logoField.maxSize = 5242880
    }

    col.listRule =
      "organization_id = @request.auth.organization_id || @request.auth.email = 'alissonmayer7@gmail.com'"
    col.viewRule =
      "organization_id = @request.auth.organization_id || @request.auth.email = 'alissonmayer7@gmail.com'"
    col.createRule =
      "((@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio') && organization_id = @request.auth.organization_id) || @request.auth.email = 'alissonmayer7@gmail.com'"
    col.updateRule =
      "((@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio') && organization_id = @request.auth.organization_id) || @request.auth.email = 'alissonmayer7@gmail.com'"
    col.deleteRule =
      "((@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio') && organization_id = @request.auth.organization_id) || @request.auth.email = 'alissonmayer7@gmail.com'"

    app.save(col)

    try {
      const firstOrg = app.findFirstRecordByFilter('organizations', '1=1')
      if (firstOrg) {
        app
          .db()
          .newQuery(
            "UPDATE settings SET organization_id = {:orgId} WHERE organization_id = '' OR organization_id IS NULL",
          )
          .bind({ orgId: firstOrg.id })
          .execute()
      }
    } catch (e) {
      console.log('No organizations found for backfill')
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('settings')

    col.fields.removeByName('organization_id')

    col.listRule = "(@request.auth.id != '') || @request.auth.email = 'alissonmayer7@gmail.com'"
    col.viewRule = "(@request.auth.id != '') || @request.auth.email = 'alissonmayer7@gmail.com'"
    col.createRule =
      "@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com'"
    col.updateRule =
      "@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com'"
    col.deleteRule =
      "@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com'"

    app.save(col)
  },
)
