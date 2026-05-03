migrate(
  (app) => {
    const barbers = app.findCollectionByNameOrId('barbers')
    const commissions = app.findCollectionByNameOrId('commissions')

    // Add barbers
    const joao = new Record(barbers)
    joao.set('name', 'João')
    app.save(joao)

    const carlos = new Record(barbers)
    carlos.set('name', 'Carlos')
    app.save(carlos)

    const pedro = new Record(barbers)
    pedro.set('name', 'Pedro')
    app.save(pedro)

    // Add Commissions
    const c1 = new Record(commissions)
    c1.set('barber_id', joao.id)
    c1.set('amount', 1125)
    c1.set('type', 'service')
    app.save(c1)

    const c2 = new Record(commissions)
    c2.set('barber_id', joao.id)
    c2.set('amount', 150)
    c2.set('type', 'package')
    app.save(c2)

    const c3 = new Record(commissions)
    c3.set('barber_id', joao.id)
    c3.set('amount', 500)
    c3.set('type', 'advance')
    c3.set('is_advance', true)
    app.save(c3)

    const c4 = new Record(commissions)
    c4.set('barber_id', carlos.id)
    c4.set('amount', 950)
    c4.set('type', 'service')
    app.save(c4)

    const c5 = new Record(commissions)
    c5.set('barber_id', carlos.id)
    c5.set('amount', 100)
    c5.set('type', 'package')
    app.save(c5)

    const c6 = new Record(commissions)
    c6.set('barber_id', carlos.id)
    c6.set('amount', 300)
    c6.set('type', 'advance')
    c6.set('is_advance', true)
    app.save(c6)
  },
  (app) => {
    app.truncateCollection(app.findCollectionByNameOrId('commissions'))
    app.truncateCollection(app.findCollectionByNameOrId('barbers'))
  },
)
