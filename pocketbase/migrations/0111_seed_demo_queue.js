/*
 * 0111 — Fila de atendimento simulada para os próximos 3 dias (idempotente).
 *
 * Hoje: 1 em atendimento + 4 aguardando; amanhã: 4 aguardando; depois de
 * amanhã: 3 aguardando. Usa apenas clientes demo (criados em 0107).
 * Guarda: existe queue_entry de cliente demo.
 */
migrate(
  (app) => {
    let orgId = ''
    try {
      const rows = app
        .db()
        .newQuery(
          "SELECT organization_id AS org, COUNT(*) AS n FROM clients WHERE organization_id != '' GROUP BY organization_id ORDER BY n DESC LIMIT 1",
        )
        .all()
      if (rows && rows.length > 0) orgId = rows[0].org
    } catch (e) {
      orgId = ''
    }
    if (!orgId) {
      console.log('[demo-0111] nenhuma organização com clientes — no-op')
      return
    }

    const barbers = app.findRecordsByFilter(
      'barbers',
      "organization_id = '" + orgId + "'",
      'created',
      50,
      0,
    )
    const services = app.findRecordsByFilter(
      'services',
      "organization_id = '" + orgId + "' && is_active = true",
      '',
      100,
      0,
    )
    const demoClients = app.findRecordsByFilter(
      'clients',
      "organization_id = '" + orgId + "' && surname = '(Demo)'",
      '',
      100,
      0,
    )
    if (barbers.length === 0 || services.length === 0 || demoClients.length === 0) {
      console.log('[demo-0111] dependências ausentes — no-op')
      return
    }

    // guarda
    const guardIds = demoClients
      .slice(0, 5)
      .map((c) => "client_id = '" + c.id + "'")
      .join(' || ')
    try {
      app.findFirstRecordByFilter('queue_entries', guardIds)
      console.log('[demo-0111] fila demo já existe — no-op')
      return
    } catch (e) {
      /* prosseguir */
    }

    // ---------- helpers determinísticos ----------
    let seedState = 20260212
    const rnd = () => {
      seedState = (seedState * 1103515245 + 12345) % 2147483648
      return seedState / 2147483648
    }
    const pick = (arr) => arr[Math.floor(rnd() * arr.length)]
    const pad = (n) => (n < 10 ? '0' + n : '' + n)
    const atISO = (d, h, m) =>
      d.getFullYear() +
      '-' +
      pad(d.getMonth() + 1) +
      '-' +
      pad(d.getDate()) +
      ' ' +
      pad(h) +
      ':' +
      pad(m) +
      ':00.000Z'

    const plans = [
      {
        offset: 0,
        items: [
          { status: 'in_progress' },
          { status: 'waiting' },
          { status: 'waiting' },
          { status: 'waiting' },
          { status: 'waiting' },
        ],
      },
      {
        offset: 1,
        items: [
          { status: 'waiting' },
          { status: 'waiting' },
          { status: 'waiting' },
          { status: 'waiting' },
        ],
      },
      { offset: 2, items: [{ status: 'waiting' }, { status: 'waiting' }, { status: 'waiting' }] },
    ]
    let created = 0
    app.runInTransaction((tx) => {
      for (const plan of plans) {
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        d.setDate(d.getDate() + plan.offset)
        plan.items.forEach((item, i) => {
          const r = new Record(tx.findCollectionByNameOrId('queue_entries'))
          r.set('client_id', pick(demoClients).id)
          r.set('service_id', pick(services).id)
          r.set('barber_id', pick(barbers).id)
          r.set('status', item.status)
          r.set('joined_at', atISO(d, 8 + i, 10 + i * 7))
          r.set('estimated_start_time', atISO(d, 9 + i, 0))
          r.set('organization_id', orgId)
          tx.save(r)
          created++
        })
      }
      console.log('[demo-0111] ' + created + ' entradas de fila demo criadas na org ' + orgId)
    })
  },
  (app) => {
    try {
      const demo = app.findRecordsByFilter('clients', "surname = '(Demo)'", '', 1000, 0)
      const cond = demo
        .slice(0, 5)
        .map((c) => "client_id = '" + c.id + "'")
        .join(' || ')
      if (!cond) return
      const recs = app.findRecordsByFilter('queue_entries', cond, '', 1000, 0)
      for (const r of recs) app.delete(r)
    } catch (e) {
      console.log('[demo-0111] down: ' + e)
    }
  },
)
