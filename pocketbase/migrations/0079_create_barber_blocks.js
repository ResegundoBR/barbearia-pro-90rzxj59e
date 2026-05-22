migrate(
  (app) => {
    const collection = new Collection({
      name: 'barber_blocks',
      type: 'base',
      listRule:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id.user_id = @request.auth.id)",
      viewRule:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id.user_id = @request.auth.id)",
      createRule:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id.user_id = @request.auth.id)",
      updateRule:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id.user_id = @request.auth.id)",
      deleteRule:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id.user_id = @request.auth.id)",
      fields: [
        {
          name: 'barber_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('barbers').id,
          cascadeDelete: true,
          maxSelect: 1,
        },
        { name: 'start_time', type: 'date', required: true },
        { name: 'end_time', type: 'date', required: true },
        { name: 'reason', type: 'text', required: false },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('barber_blocks')
    app.delete(collection)
  },
)
