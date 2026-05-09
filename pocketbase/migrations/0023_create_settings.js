migrate(
  (app) => {
    const settings = new Collection({
      name: 'settings',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'key', type: 'text', required: true },
        { name: 'value', type: 'json', required: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(settings)

    try {
      app.findFirstRecordByData('settings', 'key', 'payment_methods')
    } catch (_) {
      const r = new Record(settings)
      r.set('key', 'payment_methods')
      r.set('value', ['cash', 'pix', 'debito', 'credito'])
      app.save(r)
    }
  },
  (app) => {
    const col = app.findCollectionByNameOrId('settings')
    app.delete(col)
  },
)
