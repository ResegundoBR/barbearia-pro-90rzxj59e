/*
 * 0116 — Fila de atendimento simulada para os próximos 3 dias (idempotente).
 *
 * Correção da série 0107–0111 (no-op por falha na resolução da organização).
 * Cria entradas de fila (status "waiting") para hoje + 2 dias, vinculando
 * clientes demo, serviços e barbeiros reais da organização alvo
 * ozzi2oua5psdyho (com fallback dinâmico). Nada real é alterado.
 *
 * Idempotência: guarda = existência de queue_entries de cliente demo.
 */
migrate(
  (app) => {
    const DEMO_TAG = '(Demo)'
    const TARGET_ORG = 'ozzi2oua5psdyho'

    // ---------- organização alvo ----------
    let orgId = TARGET_ORG
    let orgOK = false
    try {
      const org = app.findRecordById('organizations', orgId)
      orgOK = !!org && !!org.id
    } catch (e) {
      orgOK = false
    }
    if (!orgOK) {
      try {
        const anyClient = app.findFirstRecordByFilter('clients', "organization_id != ''")
        if (anyClient && anyClient.getString('organization_id')) {
          orgId = anyClient.getString('organization_id')
          orgOK = true
        }
      } catch (e) {
        orgOK = false
      }
    }
    if (!orgOK) {
      console.log('[demo-0116] nenhuma organização válida — no-op')
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
      "organization_id = '" + orgId + "' && surname = '" + DEMO_TAG + "'",
      '',
      100,
      0,
    )
    if (barbers.length === 0 || services.length === 0 || demoClients.length === 0) {
      console.log('[demo-0116] dependências ausentes — no-op')
      return
    }

    // guarda: já existe entrada de fila de cliente demo?
    try {
      const guardIds = demoClients
        .slice(0, 5)
        .map((c) => "client_id = '" + c.id + "'")
        .join(' || ')
      app.findFirstRecordByFilter('queue_entries', guardIds)
      console.log('[demo-0116] queue_entries demo já existem — no-op')
      return
    } catch (e) {
      /* prosseguir */
    }

    let seedState = 20260216
    const rnd = () => {
      seedState = (seedState * 1103515245 + 12345) % 2147483648
      return seedState / 2147483648
    }
    const pick = (arr) => arr[Math.floor(rnd() * arr.length)]
    const int = (min, max) => min + Math.floor(rnd() * (max - min + 1))
    const pad = (n) => (n < 10 ? '0' + n : '' + n)
    const dayStr = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())

    let created = 0
    app.runInTransaction((tx) => {
      for (let offset = 0; offset < 3; offset++) {
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        d.setDate(d.getDate() + offset)
        const n = offset === 0 ? int(4, 6) : int(3, 5)
        for (let k = 0; k < n; k++) {
          const hh = 9 + int(0, 9)
          const mm = pick([0, 15, 30, 45])
          const joined = new Date(d)
          joined.setHours(hh, mm, 0, 0)
          const est = new Date(joined)
          est.setMinutes(est.getMinutes() + int(10, 40))
          const r = new Record(tx.findCollectionByNameOrId('queue_entries'))
          r.set('client_id', pick(demoClients).id)
          r.set('service_id', pick(services).id)
          if (rnd() < 0.8) r.set('barber_id', pick(barbers).id)
          r.set('status', 'waiting')
          r.set('joined_at', dayStr(joined) + ' ' + pad(hh) + ':' + pad(mm) + ':00.000Z')
          r.set(
            'estimated_start_time',
            dayStr(est) + ' ' + pad(est.getHours()) + ':' + pad(est.getMinutes()) + ':00.000Z',
          )
          r.set('organization_id', orgId)
          tx.save(r)
          created++
        }
      }
    })
    console.log('[demo-0116] ' + created + ' entradas de fila demo criadas na org ' + orgId)
  },
  (app) => {
    try {
      const demo = app.findRecordsByFilter('clients', "surname = '(Demo)'", '', 1000, 0)
      const ids = demo
        .slice(0, 10)
        .map((c) => "client_id = '" + c.id + "'")
        .join(' || ')
      if (!ids) return
      const recs = app.findRecordsByFilter('queue_entries', ids, '', 1000, 0)
      for (const r of recs) app.delete(r)
    } catch (e) {
      console.log('[demo-0116] down: ' + e)
    }
  },
)
