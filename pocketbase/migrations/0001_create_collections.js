migrate(
  (app) => {
    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    users.fields.add(
      new SelectField({
        name: 'plan',
        values: ['Free', 'Basic', 'Pro', 'Platinum'],
        maxSelect: 1,
        required: false,
      }),
    )
    app.save(users)

    const barbers = new Collection({
      name: 'barbers',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'avatar', type: 'url' },
        { name: 'created', type: 'autodate', onCreate: true },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(barbers)

    const clients = new Collection({
      name: 'clients',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'last_visit', type: 'date' },
        { name: 'is_at_risk', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(clients)

    const services = new Collection({
      name: 'services',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'price', type: 'number' },
        { name: 'commission_rate', type: 'number' },
        { name: 'created', type: 'autodate', onCreate: true },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(services)

    const appointments = new Collection({
      name: 'appointments',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'barber_id', type: 'relation', collectionId: barbers.id, maxSelect: 1 },
        { name: 'client_id', type: 'relation', collectionId: clients.id, maxSelect: 1 },
        { name: 'service_id', type: 'relation', collectionId: services.id, maxSelect: 1 },
        { name: 'price', type: 'number' },
        { name: 'date', type: 'date' },
        { name: 'status', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(appointments)

    const commissions = new Collection({
      name: 'commissions',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'barber_id', type: 'relation', collectionId: barbers.id, maxSelect: 1 },
        { name: 'amount', type: 'number' },
        { name: 'type', type: 'text' },
        { name: 'date', type: 'date' },
        { name: 'is_advance', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(commissions)
  },
  (app) => {
    app.delete(app.findCollectionByNameOrId('commissions'))
    app.delete(app.findCollectionByNameOrId('appointments'))
    app.delete(app.findCollectionByNameOrId('services'))
    app.delete(app.findCollectionByNameOrId('clients'))
    app.delete(app.findCollectionByNameOrId('barbers'))

    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    users.fields.removeByName('plan')
    app.save(users)
  },
)
