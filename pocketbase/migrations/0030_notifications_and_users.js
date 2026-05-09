migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('users')
    const accessLevelField = users.fields.getByName('access_level')
    if (accessLevelField) {
      accessLevelField.values = ['Admin', 'Autonomo', 'Socio']
    }

    if (!users.fields.getByName('surname')) users.fields.add(new TextField({ name: 'surname' }))
    if (!users.fields.getByName('whatsapp')) users.fields.add(new TextField({ name: 'whatsapp' }))
    if (!users.fields.getByName('phone')) users.fields.add(new TextField({ name: 'phone' }))
    if (!users.fields.getByName('address')) users.fields.add(new TextField({ name: 'address' }))
    app.save(users)

    try {
      app.findCollectionByNameOrId('notifications')
    } catch (_) {
      const notifications = new Collection({
        name: 'notifications',
        type: 'base',
        listRule: "@request.auth.id != '' && user_id = @request.auth.id",
        viewRule: "@request.auth.id != '' && user_id = @request.auth.id",
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != '' && user_id = @request.auth.id",
        deleteRule: "@request.auth.id != '' && user_id = @request.auth.id",
        fields: [
          {
            name: 'user_id',
            type: 'relation',
            required: true,
            collectionId: '_pb_users_auth_',
            cascadeDelete: true,
            maxSelect: 1,
          },
          { name: 'title', type: 'text', required: true },
          { name: 'message', type: 'text', required: true },
          { name: 'is_read', type: 'bool' },
          { name: 'type', type: 'text' },
          { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
          { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
        ],
      })
      app.save(notifications)
    }

    try {
      app.findCollectionByNameOrId('notification_rules')
    } catch (_) {
      const notificationRules = new Collection({
        name: 'notification_rules',
        type: 'base',
        listRule: "@request.auth.id != ''",
        viewRule: "@request.auth.id != ''",
        createRule: "@request.auth.id != ''",
        updateRule: "@request.auth.id != ''",
        deleteRule: "@request.auth.id != ''",
        fields: [
          { name: 'event_type', type: 'text', required: true },
          { name: 'recipients', type: 'json' },
          { name: 'channel', type: 'text' },
          { name: 'is_active', type: 'bool' },
          { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
          { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
        ],
      })
      app.save(notificationRules)
    }
  },
  (app) => {
    // skip revert
  },
)
