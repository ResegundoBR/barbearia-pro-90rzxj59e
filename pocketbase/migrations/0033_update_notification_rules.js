migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('notification_rules')
    if (!col.fields.getByName('timing_offset')) {
      const { NumberField } = require('pocketbase/models/fields')
      col.fields.add(new NumberField({ name: 'timing_offset', required: false }))
    }
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('notification_rules')
    col.fields.removeByName('timing_offset')
    app.save(col)
  },
)
