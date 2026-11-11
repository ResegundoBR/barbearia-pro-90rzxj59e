/*
 * 0113 — Agendamentos futuros de demonstração (idempotente).
 *
 * Complementa a série 0107–0111 (que aplicou como no-op por falha na
 * resolução da organização). Cria ~80 agendamentos para os próximos 21 dias,
 * distribuídos entre barbeiros, serviços e clientes demo da organização
 * ozzi2oua5psdyho, em horários plausíveis dentro do expediente
 * (09:00–19:30, slots de 30 min), sem conflito de mesmo barbeiro/horário.
 * Nada real é alterado ou apagado.
 *
 * Idempotência: guarda = existência de agendamento futuro de cliente (Demo).
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
      console.log('[demo-0113] nenhuma organização válida — no-op')
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
      console.log('[demo-0113] nenhum barbeiro — no-op')
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
      console.log('[demo-0113] nenhum serviço ativo — no-op')
      return
    }
    const demoClients = app.findRecordsByFilter(
      'clients',
      "organization_id = '" + orgId + "' && surname = '" + DEMO_TAG + "'",
      '',
      100,
      0,
    )
    if (demoClients.length === 0) {
      console.log('[demo-0113] sem clientes demo (rode 0112 primeiro) — no-op')
      return
    }

    // guarda de idempotência: já existe agendamento futuro de cliente demo?
    try {
      const future = app.findRecordsByFilter(
        'appointments',
        "organization_id = '" +
          orgId +
          "' && client_id.surname = '" +
          DEMO_TAG +
          "' && date > @now",
        '',
        1,
        0,
      )
      if (future.length > 0) {
        console.log('[demo-0113] agendamentos demo futuros já existem — no-op')
        return
      }
    } catch (e) {
      console.log('[demo-0113] guarda falhou: ' + e + ' — prosseguindo')
    }

    // ---------- helpers determinísticos ----------
    let seedState = 20260213
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
    })
    console.log('[demo-0113] ' + created + ' agendamentos futuros demo criados na org ' + orgId)
  },
  (app) => {
    try {
      const demo = app.findRecordsByFilter('clients', "surname = '(Demo)'", '', 1000, 0)
      const ids = demo.map((c) => "client_id = '" + c.id + "'").join(' || ')
      if (!ids) return
      const recs = app.findRecordsByFilter('appointments', ids, '', 100000, 0)
      for (const r of recs) app.delete(r)
    } catch (e) {
      console.log('[demo-0113] down: ' + e)
    }
  },
)
