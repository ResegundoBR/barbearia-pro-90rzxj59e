routerAdd(
  'GET',
  '/backend/v1/dashboard',
  (e) => {
    const today = new Date()
    // Current month start
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    const startOfMonthStr = startOfMonth.toISOString().replace('T', ' ')

    const orgId = e.auth?.getString('organization_id')
    const orgFilter = orgId ? `organization_id = '${orgId}'` : '1=1'

    // Current week start (Sunday)
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())
    startOfWeek.setHours(0, 0, 0, 0)
    const startOfWeekStr = startOfWeek.toISOString().replace('T', ' ')

    // Today start
    const startOfToday = new Date(today)
    startOfToday.setHours(0, 0, 0, 0)
    const startOfTodayStr = startOfToday.toISOString().replace('T', ' ')

    const apts = $app.findRecordsByFilter(
      'appointments',
      `status = 'Concluído' && date >= '${startOfMonthStr}' && ${orgFilter}`,
      '',
      10000,
      0,
    )
    const prods = $app.findRecordsByFilter(
      'product_purchases',
      `date >= '${startOfMonthStr}' && ${orgFilter}`,
      '',
      10000,
      0,
    )
    const packs = $app.findRecordsByFilter(
      'client_packages',
      `created >= '${startOfMonthStr}' && ${orgFilter}`,
      '',
      10000,
      0,
    )
    const barbers = $app.findRecordsByFilter('barbers', orgFilter, '', 100, 0)

    let dailyFaturamento = 0
    const dailyClients = new Set()
    let dailyAptCount = 0

    let weeklyFaturamento = 0
    let weeklyNovosClientes = 0

    const barberStats = {}
    for (const b of barbers) {
      barberStats[b.id] = { name: b.getString('name'), revenue: 0, cuts: 0, id: b.id }
    }

    // Process Appointments
    for (const apt of apts) {
      const dt = apt.getString('date')
        ? new Date(apt.getString('date'))
        : new Date(apt.getString('created'))
      let price = apt.getFloat('price')
      if (price === 0 && !apt.getString('client_package_id')) {
        try {
          const s = $app.findRecordById('services', apt.getString('service_id'))
          price = s.getFloat('price')
        } catch (err) {}
      } else if (apt.getString('client_package_id')) {
        price = 0 // Revenue accounted in package purchase
      }

      if (dt >= startOfToday) {
        dailyFaturamento += price
        dailyClients.add(apt.getString('client_id'))
        dailyAptCount++
      }

      if (dt >= startOfWeek) {
        weeklyFaturamento += price
      }

      const bId = apt.getString('barber_id')
      if (bId && barberStats[bId]) {
        barberStats[bId].revenue += price
        barberStats[bId].cuts++
      }
    }

    // Process Products
    for (const prod of prods) {
      const dt = prod.getString('date')
        ? new Date(prod.getString('date'))
        : new Date(prod.getString('created'))
      const price = prod.getFloat('price_at_sale')

      if (dt >= startOfToday) {
        dailyFaturamento += price
        dailyClients.add(prod.getString('client_id'))
      }
      if (dt >= startOfWeek) {
        weeklyFaturamento += price
      }

      const bId = prod.getString('barber_id')
      if (bId && barberStats[bId]) {
        barberStats[bId].revenue += price
      }
    }

    // Process Packages
    for (const pack of packs) {
      const dt = new Date(pack.getString('created'))
      let price = 0
      try {
        const pkg = $app.findRecordById('packages', pack.getString('package_id'))
        price = pkg.getFloat('price')
      } catch (err) {}

      if (dt >= startOfToday) {
        dailyFaturamento += price
        dailyClients.add(pack.getString('client_id'))
      }
      if (dt >= startOfWeek) {
        weeklyFaturamento += price
      }

      const bId = pack.getString('barber_id')
      if (bId && barberStats[bId]) {
        barberStats[bId].revenue += price
      }
    }

    const ranking = Object.values(barberStats)
      .sort((a, b) => b.revenue - a.revenue)
      .map((b, i) => ({
        name: b.name,
        revenue: b.revenue,
        cuts: b.cuts,
        medal: i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '',
      }))

    const ticketMedio =
      dailyClients.size > 0 ? (dailyFaturamento / dailyClients.size).toFixed(0) : 0

    // Fetch commissions for the period to show accurate repasses
    const comms = $app.findRecordsByFilter(
      'commissions',
      `date >= '${startOfMonthStr}' && ${orgFilter}`,
      '',
      10000,
      0,
    )
    const barberComms = {}
    for (const b of barbers) {
      barberComms[b.id] = { total: 0, count: 0 }
    }
    for (const c of comms) {
      const bId = c.getString('barber_id')
      if (bId && barberComms[bId]) {
        barberComms[bId].total += c.getFloat('amount')
        barberComms[bId].count++
      }
    }

    return e.json(200, {
      daily: {
        faturamento: dailyFaturamento.toFixed(2),
        clientesAtendidos: dailyClients.size,
        ticketMedio: ticketMedio,
        taxaOcupacao: 80, // Mock for visual
      },
      ranking: ranking,
      alerts: {
        clientesRisco: 2,
        pacotesVencendo: 3,
        agendamentosAmanha: 5,
      },
      weekly: {
        period: 'Semana Atual',
        faturamento: weeklyFaturamento.toFixed(2),
        crescimento: 5,
        novosClientes: 3,
        taxaRetorno: 68,
        barbeiroProcurado: ranking.length > 0 ? `${ranking[0].name}` : '-',
        servicoVendido: 'Corte Especial',
        pico: '14h-17h',
      },
      commissions: barbers.map((b) => {
        const isSocio = b.getString('work_level') === 'socio'
        const commData = barberComms[b.id] || { total: 0 }
        return {
          name: b.getString('name'),
          work_level: b.getString('work_level'),
          nota: isSocio ? 'Repasse Integral (Sócio)' : 'Comissão (Autônomo)',
          amount: commData.total,
        }
      }),
    })
  },
  $apis.requireAuth(),
)
