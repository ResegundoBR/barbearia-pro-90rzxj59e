/*
 * 0119 — Agendamentos futuros de demonstração na org Laboratório.
 *
 * ORGANIZAÇÃO-ALVO FIXA (pinned): qwc9rf8564p8pev ("Laboratório"). Sem
 * fallback dinâmico; erros abortam a migração com log claro.
 *
 * Cria ~80 agendamentos para os próximos 21 dias, distribuídos entre os
 * barbeiros e serviços JÁ CADASTRADOS na org, usando os clientes demo da
 * 0118, em horários plausíveis (09:00–19:30, slots de 30 min) sem conflito
 * por barbeiro/horário. Status: Confirmado (maioria) e Pendente.
 *
 * Marcador demo: cliente com surname "(Demo)".
 * Idempotente: guarda = existe agendamento FUTURO de cliente demo nesta org.
 */
migrate(
  (app) => {
    const ORG = 'qwc9rf8564p8pev'
    const DEMO_TAG = '(Demo)'

    const org = app.findRecordById('organizations', ORG) // lança se não existir
    const orgId = org.id

    const barbers = app.findRecordsByFilter(
      'barbers',
      "organization_id = '" + orgId + "'",
      'created',
      50,
      0,
    )
    if (barbers.length === 0) {
      throw new Error('[demo-0119] nenhum barbeiro na org ' + orgId + ' — abortando')
    }
    const services = app.findRecordsByFilter(
      'services',
      "organization_id = '" + orgId + "' && is_active = true",
      '',
      100,
      0,
    )
    if (services.length === 0) {
      throw new Error('[demo-0119] nenhum serviço ativo na org ' + orgId + ' — abortando')
    }
    const demoClients = app.findRecordsByFilter(
      'clients',
      "organization_id = '" + orgId + "' && surname = '" + DEMO_TAG + "'",
      '',
      100,
      0,
    )
    if (demoClients.length === 0) {
      throw new Error('[demo-0119] sem clientes demo (rode 0118 primeiro) — abortando')
    }

    // guarda de idempotência: já existe agendamento futuro de cliente demo?
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
      console.log('[demo-0119] agendamentos demo futuros já existem — no-op')
      return
    }

    // ---------- helpers determinísticos (LCG) ----------
    let seedState = 20261118
    const rnd = () => {
      seedState = (seedState * 1103515245 + 12345) % 2147483648
      return seedState / 2147483648
    }
    const pick = (arr) => arr[Math.floor(rnd() * arr.length)]
    const int = (min, max) => min + Math.floor(rnd() * (max - min + 1))
    const pad = (n) => (n < 10 ? '0' + n : '' + n)
    const dayStr = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
    const apptDate = (d) => dayStr(d) + ' 12:00:00' // formato usado pelo frontend

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
          if (r.getString('organization_id') !== orgId) {
            throw new Error('[demo-0119] violação de org em agendamento — abortando')
          }
          tx.save(r)
          created++
        }
      }
      console.log(
        '[demo-0119] criados ' + created + ' agendamentos futuros demo na org ' + orgId,
      )
      if (created < 60) {
        throw new Error(
          '[demo-0119] apenas ' + created + ' agendamentos criados (esperados ~80) — abortando',
        )
      }
    })
  },
  (app) => {
    const ORG = 'qwc9rf8564p8pev'
    const recs = app.findRecordsByFilter(
      'appointments',
      "organization_id = '" + ORG + "' && client_id.surname = '(Demo)' && status != 'Concluído'",
      '',
      100000,
      0,
    )
    for (const r of recs) app.delete(r)
    console.log('[demo-0119] down: removidos agendamentos futuros demo da org ' + ORG)
  },
)
