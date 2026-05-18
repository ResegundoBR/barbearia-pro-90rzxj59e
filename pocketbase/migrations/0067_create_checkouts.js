migrate(
  (app) => {
    const collection = new Collection({
      name: 'checkouts',
      type: 'base',
      listRule:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id = '' || barber_id.user_id = @request.auth.id)",
      viewRule:
        "@request.auth.id != '' && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || barber_id = '' || barber_id.user_id = @request.auth.id)",
      createRule: null,
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'checkout_number', type: 'number', required: true },
        {
          name: 'client_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('clients').id,
          maxSelect: 1,
        },
        {
          name: 'barber_id',
          type: 'relation',
          required: true,
          collectionId: app.findCollectionByNameOrId('barbers').id,
          maxSelect: 1,
        },
        { name: 'total_amount', type: 'number', required: true },
        { name: 'date', type: 'date', required: true },
        { name: 'payment_method', type: 'text' },
        { name: 'items_snapshot', type: 'json' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [],
    })

    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('checkouts')
    app.delete(collection)
  },
)
