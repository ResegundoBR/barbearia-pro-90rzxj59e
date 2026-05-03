migrate(
  (app) => {
    const commissions = app.findCollectionByNameOrId('commissions')
    commissions.fields.add(
      new SelectField({ name: 'payment_method', values: ['cash', 'pix', 'card'], required: false }),
    )
    commissions.fields.add(
      new SelectField({
        name: 'status',
        values: ['available', 'pending', 'paid'],
        required: false,
      }),
    )
    commissions.fields.add(new DateField({ name: 'due_date', required: false }))
    app.save(commissions)

    const clientPackages = app.findCollectionByNameOrId('client_packages')
    const barbers = app.findCollectionByNameOrId('barbers')
    clientPackages.fields.add(
      new RelationField({
        name: 'barber_id',
        collectionId: barbers.id,
        maxSelect: 1,
        required: false,
      }),
    )
    app.save(clientPackages)
  },
  (app) => {
    const commissions = app.findCollectionByNameOrId('commissions')
    commissions.fields.removeByName('payment_method')
    commissions.fields.removeByName('status')
    commissions.fields.removeByName('due_date')
    app.save(commissions)

    const clientPackages = app.findCollectionByNameOrId('client_packages')
    clientPackages.fields.removeByName('barber_id')
    app.save(clientPackages)
  },
)
