/*
 * 0108 — Agendamentos futuros de demonstração (idempotente).
 *
 * Cria ~80 agendamentos para os próximos 21 dias, distribuídos entre os
 * barbeiros e serviços da organização (a que tem mais clientes), em horários
 * plausíveis dentro do expediente (09:00–19:30, slots de 30 min), sem conflito
 * de mesmo barbeiro no mesmo horário. Nada real é alterado ou apagado.
 *
 * Idempotência: guarda = existência de agendamento com client (Demo) futuro.
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
      console.log('[demo-0108] nenhuma organização com clientes — no-op')
      return
    }

    const barbers = app.findRecordsByFilter(
      'barbers',
      "organization_id = '" + orgId + "'",
      'created',
      50,
      0,
    )
    if (barbers.length === 0) {
      console.log('[demo-0108] nenhum barbeiro — no-op')
      return
    }
    const services = app.findRecordsByFilter(
      'services',
      "organization_id = '" + orgId + "' && is_active = true",
      '',
      100,
      0,
    )
    if (services.length === 0) {
      console.log('[demo-0108] nenhum serviço ativo — no-op')
      return
    }
    const demoClients = app.findRecordsByFilter(
      'clients',
      "organization_id = '" + orgId + "' && surname = '(Demo)'",
      '',
      100,
      0,
    )
    if (demoClients.length === 0) {
      console.log('[demo-0108] sem clientes demo (rode 0107 primeiro) — no-op')
      return
    }

    // guarda de idempotência: já existe agendamento futuro de cliente demo?
    try {
      app.findFirstRecordByFilter(
        'appointments',
        "organization_id = '" + orgId + "' && client_id.surname = '(Demo)'",
      )
      console.log('[demo-0108] agendamentos demo já existem — no-op')
      return
    } catch (e) {
      /* não existe: prosseguir */
    }

    // ---------- helpers determinísticos ----------
    let seedState = 20260210
    const rnd = () => {
      seedState = (seedState * 1103515245 + 12345) % 2147483648
      return seedState / 2147483648
    }
    const pick = (arr) => arr[Math.floor(rnd() * arr.length)]
    const int = (min, max) => min + Math.floor(rnd() * (max - min + 1))
    const pad = (n) => (n < 10 ? '0' + n : '' + n)
    const dayStr = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
    const apptDate = (d) => dayStr(d) + ' 12:00:00' // formato usado pelo frontend
    const atISO = (d, h, m) => dayStr(d) + ' ' + pad(h) + ':' + pad(m) + ':00.000Z'

    // horários comerciais: 09:00–19:30, slots de 30 min
    const SLOTS = []
    for (let h = 9; h <= 19; h++) {
      SLOTS.push(pad(h) + ':00')
      if (h < 19) SLOTS.push(pad(h) + ':30')
    }

    const usedSlots = {} // "barberId|dayStr" -> { "09:00": true }
    const slotFree = (barberId, d, time) => {
      const k = barberId + '|' + dayStr(d)
      if (!usedSlots[k]) usedSlots[k] = {}
      return !usedSlots[k][time]
    }
    const takeSlot = (barberId, d, time) => {
      usedSlots[barberId + '|' + dayStr(d)][time] = true
    }
    const slotEnd = (time, minutes) => {
      const parts = time.split(':')
      const total = parseInt(parts[0]) * 60 + parseInt(parts[1]) + minutes
      return pad(Math.floor(total / 60) % 24) + ':' + pad(total % 60)
    }

    const STATUS_FUT = [
      'Confirmado',
      'Confirmado',
      'Confirmado',
      'Confirmado',
      'Confirmado',
      'Confirmado',
      'Pendente',
    ]
    let created = 0
    app.runInTransaction((tx) => {
      for (let offset = 0; offset < 21; offset++) {
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        d.setDate(d.getDate() + offset)
        const nAppts = offset === 0 ? int(4, 6) : int(3, 5)
        for (let k = 0; k < nAppts; k++) {
          const barber = pick(barbers)
          const svc = pick(services)
          const time = pick(SLOTS)
          if (!slotFree(barber.id, d, time)) continue
          takeSlot(barber.id, d, time)
          const client = pick(demoClients)
          const r = new Record(tx.findCollectionByNameOrId('appointments'))
          r.set('barber_id', barber.id)
          r.set('client_id', client.id)
          r.set('service_id', svc.id)
          r.set('date', apptDate(d))
          r.set('time', time)
          r.set('end_time', slotEnd(time, svc.getInt('duration_minutes') || 30))
          r.set('price', svc.getFloat('price') || 50)
          r.set('status', STATUS_FUT[int(0, STATUS_FUT.length - 1)])
          r.set('organization_id', orgId)
          tx.save(r)
          created++
        }
      }
      // fila de hoje reaproveita os agendamentos do dia (marcada em 0111)
    })
    console.log('[demo-0108] ' + created + ' agendamentos futuros demo criados na org ' + orgId)
  },
  (app) => {
    try {
      const demo = app.findRecordsByFilter('clients', "surname = '(Demo)'", '', 1000, 0)
      const ids = demo.map((c) => "'" + c.id + "'").join(' || ')
      if (!ids) return
      const recs = app.findRecordsByFilter('appointments', 'client_id = ' + ids, '', 100000, 0)
      for (const r of recs) app.delete(r)
    } catch (e) {
      console.log('[demo-0108] down: ' + e)
    }
  },
)
