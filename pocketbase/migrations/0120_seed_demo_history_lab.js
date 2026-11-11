/*
 * 0120 — Histórico de atendimentos (~60 dias), checkouts e comissões na org
 * Laboratório.
 *
 * ORGANIZAÇÃO-ALVO FIXA (pinned): qwc9rf8564p8pev ("Laboratório"). Sem
 * fallback dinâmico; erros abortam com throw.
 *
 * Cria agendamentos "Concluído" (e alguns FALTOU/Cancelado) para os últimos
 * 60 dias, checkouts coerentes (items_snapshot no formato do CheckoutMobile,
 * numeração sequencial a partir do maior checkout_number global + 1) e
 * comissões type='service' com gross/fee/amount — antigas 'paid', as dos
 * últimos 5 dias 'available' (a pagar).
 *
 * Marcador demo: cliente com surname "(Demo)".
 * Idempotente: guarda = existe checkout desta org apontando para cliente demo.
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
      throw new Error(
        '[demo-0120] dependências ausentes (barbeiros/serviços/clientes demo) — abortando',
      )
    }

    // guarda: já existe checkout desta org de cliente demo?
    const guardIds = demoClients
      .slice(0, 5)
      .map((c) => "client_id = '" + c.id + "'")
      .join(' || ')
    const existingCo = app.findRecordsByFilter(
      'checkouts',
      "organization_id = '" + orgId + "' && (" + guardIds + ')',
      '',
      1,
      0,
    )
    if (existingCo.length > 0) {
      console.log('[demo-0120] checkouts demo já existem — no-op')
      return
    }

    // numeração global de checkouts (índice único) — parte do maior existente
    let checkoutSeq = 0
    const last = app.findRecordsByFilter('checkouts', '', '-checkout_number', 1, 0)
    if (last.length > 0) checkoutSeq = last[0].getInt('checkout_number')
    const seqStart = checkoutSeq

    // ---------- helpers determinísticos ----------
    let seedState = 20261120
    const rnd = () => {
      seedState = (seedState * 1103515245 + 12345) % 2147483648
      return seedState / 2147483648
    }
    const pick = (arr) => arr[Math.floor(rnd() * arr.length)]
    const int = (min, max) => min + Math.floor(rnd() * (max - min + 1))
    const pad = (n) => (n < 10 ? '0' + n : '' + n)
    const dayStr = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
    const apptDate = (d) => dayStr(d) + ' 12:00:00'
    const atISO = (d, h, m) => dayStr(d) + ' ' + pad(h) + ':' + pad(m) + ':00.000Z'

    const PAYMENTS = [
      { label: 'Pix', sel: 'pix', fee: 0 },
      { label: 'Dinheiro', sel: 'cash', fee: 0 },
      { label: 'Cartão de Débito', sel: 'debito', fee: 0.0099 },
      { label: 'Cartão de Crédito', sel: 'credito', fee: 0.0349 },
    ]
    const SLOTS = []
    for (let h = 9; h <= 19; h++) {
      SLOTS.push(pad(h) + ':00')
      if (h < 19) SLOTS.push(pad(h) + ':30')
    }
    const usedSlots = {}
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

    const completed = []
    let nAppts = 0
    let nCo = 0
    let nCm = 0
    app.runInTransaction((tx) => {
      for (let offset = 59; offset >= 1; offset--) {
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        d.setDate(d.getDate() - offset)
        let n
        if (offset <= 14) n = int(2, 3)
        else if (offset <= 30) n = rnd() < 0.5 ? 2 : 1
        else n = rnd() < 0.4 ? 1 : 0
        for (let k = 0; k < n; k++) {
          const barber = pick(barbers)
          const svc = pick(services)
          const time = pick(SLOTS)
          if (!slotFree(barber.id, d, time)) continue
          takeSlot(barber.id, d, time)
          const client = pick(demoClients)
          const price = svc.getFloat('price') || 50
          const r = new Record(tx.findCollectionByNameOrId('appointments'))
          r.set('barber_id', barber.id)
          r.set('client_id', client.id)
          r.set('service_id', svc.id)
          r.set('date', apptDate(d))
          r.set('time', time)
          r.set('end_time', slotEnd(time, svc.getInt('duration_minutes') || 30))
          r.set('price', price)
          r.set('status', 'Concluído')
          r.set('organization_id', orgId)
          if (r.getString('organization_id') !== orgId) {
            throw new Error('[demo-0120] violação de org em agendamento — abortando')
          }
          tx.save(r)
          completed.push({
            barberId: barber.id,
            barberName: barber.getString('name'),
            clientId: client.id,
            svcName: svc.getString('name'),
            price,
            date: d,
            time,
            pct: barber.getFloat('commission_value') || 50,
          })
          nAppts++
          client.set('last_visit', dayStr(d) + ' 00:00:00.000Z')
          tx.save(client)
        }
        // alguns faltos/cancelados espalhados (não geram checkout)
        if (offset % 11 === 0) {
          const barber = pick(barbers)
          const svc = pick(services)
          const time = pick(SLOTS)
          if (slotFree(barber.id, d, time)) {
            takeSlot(barber.id, d, time)
            const r = new Record(tx.findCollectionByNameOrId('appointments'))
            r.set('barber_id', barber.id)
            r.set('client_id', pick(demoClients).id)
            r.set('service_id', svc.id)
            r.set('date', apptDate(d))
            r.set('time', time)
            r.set('end_time', slotEnd(time, svc.getInt('duration_minutes') || 30))
            r.set('price', svc.getFloat('price') || 50)
            r.set('status', offset % 22 === 0 ? 'Cancelado' : 'FALTOU')
            r.set('organization_id', orgId)
            tx.save(r)
            nAppts++
          }
        }
      }

      // ---------- checkouts + comissões ----------
      for (const c of completed) {
        const pay = pick(PAYMENTS)
        checkoutSeq++
        const hh = parseInt(c.time.split(':')[0])
        const mm = parseInt(c.time.split(':')[1])
        const co = new Record(tx.findCollectionByNameOrId('checkouts'))
        co.set('checkout_number', checkoutSeq)
        co.set('client_id', c.clientId)
        co.set('barber_id', c.barberId)
        co.set('total_amount', c.price)
        co.set('date', atISO(c.date, hh, mm))
        co.set('payment_method', pay.label + ' - ' + c.barberName)
        co.set('items_snapshot', {
          additionalServices: [],
          discount: 0,
          manualExtras: [],
          packageUsed: false,
          products: [],
          scheduledPrice: c.price,
          service: c.svcName,
        })
        co.set('organization_id', orgId)
        if (co.getString('organization_id') !== orgId) {
          throw new Error('[demo-0120] violação de org em checkout — abortando')
        }
        tx.save(co)
        nCo++

        const gross = c.price
        const fee = Math.round(gross * pay.fee * 100) / 100
        const amount = Math.round((gross * (c.pct / 100) - fee) * 100) / 100
        const cm = new Record(tx.findCollectionByNameOrId('commissions'))
        cm.set('barber_id', c.barberId)
        cm.set('type', 'service')
        cm.set('gross_amount', gross)
        cm.set('fee_amount', fee)
        cm.set('amount', amount)
        cm.set('payment_method', pay.sel)
        cm.set('date', atISO(c.date, hh, mm))
        cm.set(
          'status',
          c.date.getTime() >= new Date().setDate(new Date().getDate() - 5) ? 'available' : 'paid',
        )
        cm.set('is_advance', false)
        cm.set('checkout_id', co.id)
        cm.set('organization_id', orgId)
        if (cm.getString('organization_id') !== orgId) {
          throw new Error('[demo-0120] violação de org em comissão — abortando')
        }
        tx.save(cm)
        nCm++
      }
      console.log(
        '[demo-0120] org ' +
          orgId +
          ' (checkout_seq ' +
          seqStart +
          '→' +
          checkoutSeq +
          '): ' +
          nAppts +
          ' agendamentos históricos, ' +
          nCo +
          ' checkouts, ' +
          nCm +
          ' comissões',
      )
      if (nCo === 0 || nCm === 0) {
        throw new Error('[demo-0120] nenhum checkout/comissão criado — abortando')
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
      .slice(0, 5)
      .map((c) => "client_id = '" + c.id + "'")
      .join(' || ')
    const cos = app.findRecordsByFilter(
      'checkouts',
      "organization_id = '" + ORG + "' && (" + cond + ')',
      '',
      100000,
      0,
    )
    for (const co of cos) {
      const cms = app.findRecordsByFilter(
        'commissions',
        "organization_id = '" + ORG + "' && checkout_id = '" + co.id + "'",
        '',
        100,
        0,
      )
      for (const cm of cms) app.delete(cm)
      app.delete(co)
    }
    console.log('[demo-0120] down: removidos checkouts/comissões demo da org ' + ORG)
  },
)
