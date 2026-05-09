migrate(
  (app) => {
    const rules = [
      {
        event_type: 'new_appointment',
        recipients: ['Admin'],
        channel: 'internal',
        is_active: true,
      },
      { event_type: 'cancellation', recipients: ['Admin'], channel: 'internal', is_active: true },
      { event_type: 'no_show', recipients: ['Admin'], channel: 'internal', is_active: true },
    ]
    const col = app.findCollectionByNameOrId('notification_rules')
    for (const r of rules) {
      try {
        app.findFirstRecordByData('notification_rules', 'event_type', r.event_type)
      } catch (_) {
        const record = new Record(col)
        record.set('event_type', r.event_type)
        record.set('recipients', r.recipients)
        record.set('channel', r.channel)
        record.set('is_active', r.is_active)
        app.save(record)
      }
    }
  },
  (app) => {
    // skip revert
  },
)
