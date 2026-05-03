migrate(
  (app) => {
    const barbers = app.findCollectionByNameOrId('barbers')
    const clients = app.findCollectionByNameOrId('clients')
    const services = app.findCollectionByNameOrId('services')
    const packages = app.findCollectionByNameOrId('packages')
    const clientPackages = app.findCollectionByNameOrId('client_packages')

    // Services
    let sCorte, sBarba, sCorteBarba
    try {
      sCorte = app.findFirstRecordByData('services', 'name', 'Corte')
    } catch (_) {
      sCorte = new Record(services)
      sCorte.set('name', 'Corte')
      sCorte.set('price', 50)
      sCorte.set('is_active', true)
      app.save(sCorte)
    }
    try {
      sBarba = app.findFirstRecordByData('services', 'name', 'Barba')
    } catch (_) {
      sBarba = new Record(services)
      sBarba.set('name', 'Barba')
      sBarba.set('price', 35)
      sBarba.set('is_active', true)
      app.save(sBarba)
    }
    try {
      sCorteBarba = app.findFirstRecordByData('services', 'name', 'Corte + Barba')
    } catch (_) {
      sCorteBarba = new Record(services)
      sCorteBarba.set('name', 'Corte + Barba')
      sCorteBarba.set('price', 75)
      sCorteBarba.set('is_active', true)
      app.save(sCorteBarba)
    }

    // Barbers
    let bJoao, bCarlos
    try {
      bJoao = app.findFirstRecordByData('barbers', 'name', 'João')
    } catch (_) {
      bJoao = new Record(barbers)
      bJoao.set('name', 'João')
      bJoao.set('commission_type', 'fixed')
      bJoao.set('commission_value', 20)
      app.save(bJoao)
    }
    try {
      bCarlos = app.findFirstRecordByData('barbers', 'name', 'Carlos')
    } catch (_) {
      bCarlos = new Record(barbers)
      bCarlos.set('name', 'Carlos')
      bCarlos.set('commission_type', 'percentage')
      bCarlos.set('commission_value', 40)
      app.save(bCarlos)
    }

    // Clients
    let cJoao, cMaria
    try {
      cJoao = app.findFirstRecordByData('clients', 'name', 'João Silva')
    } catch (_) {
      cJoao = new Record(clients)
      cJoao.set('name', 'João Silva')
      cJoao.set('phone', '11999999999')
      cJoao.set('location_type', 'nearby')
      app.save(cJoao)
    }
    try {
      cMaria = app.findFirstRecordByData('clients', 'name', 'Maria Santos')
    } catch (_) {
      cMaria = new Record(clients)
      cMaria.set('name', 'Maria Santos')
      cMaria.set('phone', '11888888888')
      cMaria.set('location_type', 'other_city')
      app.save(cMaria)
    }

    // Packages
    let pCorte, pBarba
    try {
      pCorte = app.findFirstRecordByData('packages', 'name', 'Pack 6 Cortes')
    } catch (_) {
      pCorte = new Record(packages)
      pCorte.set('name', 'Pack 6 Cortes')
      pCorte.set('service_id', sCorte.id)
      pCorte.set('quantity', 6)
      pCorte.set('price', 250)
      pCorte.set('is_active', true)
      app.save(pCorte)
    }
    try {
      pBarba = app.findFirstRecordByData('packages', 'name', 'Pack 10 Barbas')
    } catch (_) {
      pBarba = new Record(packages)
      pBarba.set('name', 'Pack 10 Barbas')
      pBarba.set('service_id', sBarba.id)
      pBarba.set('quantity', 10)
      pBarba.set('price', 300)
      pBarba.set('is_active', true)
      app.save(pBarba)
    }

    // Client Packages
    try {
      app.findFirstRecordByData('client_packages', 'client_id', cJoao.id)
    } catch (_) {
      const cp1 = new Record(clientPackages)
      cp1.set('client_id', cJoao.id)
      cp1.set('package_id', pCorte.id)
      cp1.set('remaining_uses', 4)
      app.save(cp1)
    }
    try {
      app.findFirstRecordByData('client_packages', 'client_id', cMaria.id)
    } catch (_) {
      const cp2 = new Record(clientPackages)
      cp2.set('client_id', cMaria.id)
      cp2.set('package_id', pBarba.id)
      cp2.set('remaining_uses', 2)
      app.save(cp2)
    }
  },
  (app) => {
    // down migration
  },
)
