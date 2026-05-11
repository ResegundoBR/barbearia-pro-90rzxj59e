migrate(
  (app) => {
    const col = app.findCollectionByNameOrId('client_logs')
    col.fields.add(
      new RelationField({
        name: 'barber_id',
        collectionId: app.findCollectionByNameOrId('barbers').id,
        maxSelect: 1,
      }),
    )
    col.fields.add(
      new SelectField({
        name: 'sentiment',
        values: ['positive', 'negative', 'neutral'],
        maxSelect: 1,
      }),
    )

    const eventType = col.fields.getByName('event_type')
    if (eventType && !eventType.values.includes('manual_entry')) {
      eventType.values.push('manual_entry')
    }
    app.save(col)
  },
  (app) => {
    const col = app.findCollectionByNameOrId('client_logs')
    col.fields.removeByName('barber_id')
    col.fields.removeByName('sentiment')

    const eventType = col.fields.getByName('event_type')
    if (eventType) {
      eventType.values = eventType.values.filter((v) => v !== 'manual_entry')
    }
    app.save(col)
  },
)
