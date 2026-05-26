migrate(
  (app) => {
    const collection = new Collection({
      name: 'role_permissions',
      type: 'base',
      listRule: "@request.auth.id != '' && organization_id = @request.auth.organization_id",
      viewRule: "@request.auth.id != '' && organization_id = @request.auth.organization_id",
      createRule:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio') && organization_id = @request.auth.organization_id",
      updateRule:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio') && organization_id = @request.auth.organization_id",
      deleteRule:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio') && organization_id = @request.auth.organization_id",
      fields: [
        {
          name: 'role',
          type: 'select',
          required: true,
          values: ['Socio', 'Autonomo'],
          maxSelect: 1,
        },
        { name: 'module_name', type: 'text', required: true },
        { name: 'is_enabled', type: 'bool' },
        {
          name: 'organization_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('organizations').id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE UNIQUE INDEX idx_role_perms ON role_permissions (organization_id, role, module_name)',
      ],
    })

    try {
      app.findCollectionByNameOrId('role_permissions')
    } catch (_) {
      app.save(collection)
    }
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId('role_permissions')
      app.delete(collection)
    } catch (_) {}
  },
)
