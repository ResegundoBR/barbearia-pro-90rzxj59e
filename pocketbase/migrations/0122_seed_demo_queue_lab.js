/*
 * 0122 — Fila de atendimento simulada para os próximos 3 dias na org
 * Laboratório.
 *
 * ORGANIZAÇÃO-ALVO FIXA (pinned): qwc9rf8564p8pev ("Laboratório"). Sem
 * fallback dinâmico; erros abortam com throw.
 *
 * Cria entradas de fila (status "waiting") para hoje + 2 dias, vinculando
 * clientes demo, serviços e barbeiros da própria org. Hoje: 1 "em
 * atendimento" (serving) + alguns aguardando; amanhã e depois: 3–5 cada.
 * joined_at / estimated_start_time coerentes (estimativa após joined_at).
 *
 * Marcador demo: cliente com surname "(Demo)".
 * Idempotente: guarda = existe queue_entry desta org de cliente demo.
 */
migrate(
  (app) => {
    const ORG = 'qwc9rf8564p8pev'
    const DEMO_TAG = '(Demo)'

    const org = app.findRecordById('organizations', ORG)
    const orgId = org.id

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
      throw new Error('[demo-0122] dependências ausentes (barbeiros/serviços/clientes demo) — abortando')
    }

    // guarda: já existe entrada de fila desta org de cliente demo?
    const guardIds = demoClients
      .slice(0, 5)
      .map((c) => "client_id = '" + c.id + "'")
      .join(' || ')
    const existingQ = app.findRecordsByFilter(
      'queue_entries',
      "organization_id = '" + orgId + "' && (" + guardIds + ')',
      '',
      1,
      0,
    )
    if (existingQ.length > 0) {
      console.log('[demo-0122] queue_entries demo já existem — no-op')
      return
    }

    // ---------- helpers determinísticos ----------
    let seedState = 20261122
    const rnd = () => {
      seedState = (seedState * 1103515245 + 12345) % 2147483648
      return seedState / 2147483648
    }
    const pick = (arr) => arr[Math.floor(rnd() * arr.length)]
    const int = (min, max) => min + Math.floor(rnd() * (max - min + 1))
    const pad = (n) => (n < 10 ? '0' + n : '' + n)
    const dayStr = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())

    let created = 0
    let nServing = 0
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

          if (offset === 0 && nServing === 0 && k === 0) {
            // hoje: 1 em atendimento, entrado há ~15 min, início estimado agora
            r.set('status', 'serving')
            const startedAt = new Date()
            startedAt.setMinutes(startedAt.getMinutes() - 15)
            r.set(
              'joined_at',
              dayStr(startedAt) +
                ' ' +
                pad(startedAt.getHours()) +
                ':' +
                pad(startedAt.getMinutes()) +
                ':00.000Z',
            )
            r.set('estimated_start_time', dayStr(d) + ' ' + pad(hh) + ':' + pad(mm) + ':00.000Z')
            nServing++
          } else {
            r.set('status', 'waiting')
            r.set('joined_at', dayStr(joined) + ' ' + pad(hh) + ':' + pad(mm) + ':00.000Z')
            r.set(
              'estimated_start_time',
              dayStr(est) + ' ' + pad(est.getHours()) + ':' + pad(est.getMinutes()) + ':00.000Z',
            )
          }
          r.set('organization_id', orgId)
          if (r.getString('organization_id') !== orgId) {
            throw new Error('[demo-0122] violação de org em queue_entry — abortando')
          }
          tx.save(r)
          created++
        }
      }
      console.log(
        '[demo-0122] criadas ' +
          created +
          ' entradas de fila demo (' +
          nServing +
          ' em atendimento) na org ' +
          orgId,
      )
      if (created === 0) {
        throw new Error('[demo-0122] nenhuma entrada de fila criada — abortando')
      }
    })
  },
  (app) => {
    const ORG = 'qwc9rf8564p8pev'
    const demo = app.findRecordsByFilter(
      'clients',
      "organization_id = '" + ORG + "' && surname = '(Demo)'",
      '',
      1000,
      0,
    )
    if (demo.length === 0) return
    const cond = demo
      .slice(0, 10)
      .map((c) => "client_id = '" + c.id + "'")
      .join(' || ')
    const recs = app.findRecordsByFilter(
      'queue_entries',
      "organization_id = '" + ORG + "' && (" + cond + ')',
      '',
      1000,
      0,
    )
    for (const r of recs) app.delete(r)
    console.log('[demo-0122] down: removidas queue_entries demo da org ' + ORG)
  },
)
