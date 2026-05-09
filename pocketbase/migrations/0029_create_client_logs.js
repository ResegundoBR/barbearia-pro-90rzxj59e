migrate(
  (app) => {
    const collection = new Collection({
      name: 'client_logs',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        {
          name: 'client_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('clients').id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'appointment_id',
          type: 'relation',
          required: false,
          collectionId: app.findCollectionByNameOrId('appointments').id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        {
          name: 'event_type',
          type: 'select',
          required: true,
          values: ['no_show', 'reschedule', 'other'],
          maxSelect: 1,
        },
        { name: 'details', type: 'text', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId('client_logs')
      app.delete(collection)
    } catch (_) {}
  },
)
