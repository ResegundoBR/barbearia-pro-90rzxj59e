migrate(
  (app) => {
    // users
    const users = app.findCollectionByNameOrId('users')
    users.fields.add(new TextField({ name: 'specialties' }))
    users.fields.add(new DateField({ name: 'join_date' }))
    users.fields.add(new NumberField({ name: 'experience_years' }))
    users.fields.add(
      new SelectField({ name: 'access_level', values: ['Admin', 'Barber', 'Staff'], maxSelect: 1 }),
    )
    app.save(users)

    // barbers
    const barbers = app.findCollectionByNameOrId('barbers')
    barbers.fields.add(
      new SelectField({ name: 'commission_type', values: ['percentage', 'fixed'], maxSelect: 1 }),
    )
    barbers.fields.add(new NumberField({ name: 'commission_value' }))
    app.save(barbers)

    // clients
    const clients = app.findCollectionByNameOrId('clients')
    clients.fields.add(new TextField({ name: 'surname' }))
    clients.fields.add(new TextField({ name: 'phone' }))
    clients.fields.add(new EmailField({ name: 'email' }))
    clients.fields.add(new DateField({ name: 'birthday' }))
    clients.fields.add(
      new SelectField({
        name: 'location_type',
        values: ['passage', 'nearby', 'other_city'],
        maxSelect: 1,
      }),
    )
    app.save(clients)

    // services - toggleable
    const services = app.findCollectionByNameOrId('services')
    services.fields.add(new BoolField({ name: 'is_active' }))
    app.save(services)

    // packages
    const packages = new Collection({
      name: 'packages',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'service_id', type: 'relation', collectionId: services.id, maxSelect: 1 },
        { name: 'quantity', type: 'number', required: true },
        { name: 'price', type: 'number', required: true },
        { name: 'is_active', type: 'bool' },
        { name: 'created', type: 'autodate', onCreate: true },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(packages)

    // client_packages
    const clientPackages = new Collection({
      name: 'client_packages',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: '',
      deleteRule: '',
      fields: [
        { name: 'client_id', type: 'relation', collectionId: clients.id, maxSelect: 1 },
        { name: 'package_id', type: 'relation', collectionId: packages.id, maxSelect: 1 },
        { name: 'remaining_uses', type: 'number', required: true },
        { name: 'expires_at', type: 'date' },
        { name: 'created', type: 'autodate', onCreate: true },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(clientPackages)
  },
  (app) => {
    // down migration
  },
)
