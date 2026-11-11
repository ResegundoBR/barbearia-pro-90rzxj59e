/*
 * 0107 — Povoamento de dados de demonstração (idempotente, correção da 0106).
 *
 * A 0106 não inseriu nada: ela resolvia a organização por SQL cru dentro de
 * try/catch (qualquer falha → org vazia → return silencioso sem dados e sem
 * marcador). Esta migração resolve a organização pelo SDK, cria os dados
 * mesmo sem barbeiros pré-existentes (cria barbeiros demo se necessário) e
 * usa marcador de idempotência por registro existente (nenhum dado é
 * duplicado se reexecutar).
 *
 * Cria, na organização com mais clientes (dados reais do usuário):
 *  - 30 clientes demo (nomes brasileiros, preferindo barbeiros variados)
 *  - Histórico de ~90 dias de atendimentos concluídos (checkouts + comissões)
 *  - ~80 agendamentos futuros nas próximas 3 semanas
 *  - 10 fornecedores, 15 produtos (positivo/baixo/esgotado), 12 compras
 *    recebidas + 6 pendentes
 *  - Fila de atendimento para os próximos 3 dias
 *
 * Nenhum registro real do usuário é alterado — só criação de novos registros.
 */
migrate(
  (app) => {
    // ---------- 1. Resolver organização via SDK (sem try/catch engolidor) ----------
    const orgCounts = app
      .db()
      .newQuery(
        "SELECT organization_id AS org, COUNT(*) AS n FROM clients WHERE organization_id != '' GROUP BY organization_id ORDER BY n DESC",
      )
      .all()
    let orgId = ''
    for (const row of orgCounts) {
      if (row.org && String(row.org).length > 0) {
        orgId = String(row.org)
        break
      }
    }
    if (!orgId) {
      // fallback: organizações ordenadas por barbeiros, depois qualquer organização
      try {
        const orgs = app.findRecordsByFilter('organizations', '', 'created', 1, 0)
        if (orgs.length > 0) orgId = orgs[0].id
      } catch (e) {
        /* sem organizações */
      }
    }
    if (!orgId) {
      console.log('[demo-seed-0107] nenhuma organização encontrada — no-op')
      return
    }
    console.log('[demo-seed-0107] organização alvo: ' + orgId)

    const orgFilter = "organization_id = '" + orgId + "'"

    // ---------- 2. Idempotência: marcador em settings; ausente → povoa ----------
    let markerExists = false
    try {
      app.findFirstRecordByFilter('settings', "key = 'demo_seed_v2' && " + orgFilter)
      markerExists = true
    } catch (e) {
      /* marcador ausente: prosseguir */
    }
    if (markerExists) {
      console.log('[demo-seed-0107] já aplicado para esta organização — no-op')
      return
    }

    // ---------- 3. Barbeiros ----------
    const barbers = app.findRecordsByFilter('barbers', orgFilter, 'created', 50, 0)
    if (barbers.length === 0) {
      // cria barbeiros demo mínimos para dar consistência ao povoamento
      const demoBarbers = [
        ['Rafael Demo', '#10b981', 'socio', 50],
        ['Bruno Demo', '#F97316', 'autonomo', 50],
        ['Tiago Demo', '#3B82F6', 'autonomo', 50],
      ]
      for (const b of demoBarbers) {
        const r = new Record(app.findCollectionByNameOrId('barbers'))
        r.set('name', b[0])
        r.set('color', b[1])
        r.set('commission_type', 'percentage')
        r.set('commission_value', b[3])
        r.set('work_level', b[2])
        r.set('work_regime', 'fixed')
        r.set('organization_id', orgId)
        app.save(r)
        barbers.push(r)
      }
    }
    const barberIds = barbers.map((b) => b.id)

    // ---------- 4. Serviços ----------
    let services = []
    try {
      services = app.findRecordsByFilter('services', orgFilter + ' && is_active = true', '', 100, 0)
    } catch (e) {
      services = []
    }
    if (services.length === 0) {
      const typical = [
        ['Corte', 60, 30],
        ['Barba', 45, 30],
        ['Corte + Barba', 95, 60],
        ['Corte Máquina', 45, 20],
        ['Sobrancelha', 20, 15],
      ]
      for (const t of typical) {
        const r = new Record(app.findCollectionByNameOrId('services'))
        r.set('name', t[0])
        r.set('price', t[1])
        r.set('duration_minutes', t[2])
        r.set('commission_rate', 50)
        r.set('is_active', true)
        r.set('organization_id', orgId)
        app.save(r)
        services.push(r)
      }
    }

    // ---------- 5. Categorias ----------
    let cats = []
    try {
      cats = app.findRecordsByFilter('categories', orgFilter, '', 100, 0)
    } catch (e) {
      cats = []
    }
    const catByName = {}
    for (const c of cats) catByName[c.getString('name')] = c
    const catBeleza = catByName['Beleza'] || cats[0] || null
    const catBebidas = catByName['Bebidas'] || catBeleza
    const catUso = catByName['Uso e Consumo'] || catBeleza

    // ---------- 6. Próximo número de checkout ----------
    let checkoutSeq = 0
    try {
      const last = app.findRecordsByFilter('checkouts', '', '-checkout_number', 1, 0)
      if (last.length > 0) checkoutSeq = last[0].getInt('checkout_number')
    } catch (e) {
      checkoutSeq = 0
    }

    // ---------- helpers determinísticos ----------
    let seedState = 20270101
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

    app.runInTransaction((tx) => {
      // ================= 7. CLIENTES (30) =================
      const clientDefs = [
        ['Anderson', 'Ribeiro'],
        ['Bruno', 'Carvalho'],
        ['Caio', 'Martins'],
        ['Diego', 'Nunes'],
        ['Éverton', 'Siqueira'],
        ['Fábio', 'Toledo'],
        ['Gabriel', 'Moura'],
        ['Henrique', 'Dantas'],
        ['Ivan', 'Barreto'],
        ['João Pedro', 'Vasconcelos'],
        ['Kléber', 'Rocha'],
        ['Leandro', 'Fontes'],
        ['Marcelo', 'Tavares'],
        ['Nathan', 'Corrêa'],
        ['Otávio', 'Bezerra'],
        ['Paulo', 'Andrade'],
        ['Rafael', 'Queiroz'],
        ['Sérgio', 'Bittencourt'],
        ['Tiago', 'Peixoto'],
        ['Vitor', 'Hugo Camargo'],
        ['Wesley', 'Prado'],
        ['Alan', 'Teixeira'],
        ['Caue', 'Ferraz'],
        ['Danilo', 'Freitas'],
        ['Elias', 'Monteiro'],
        ['Fernando', 'Antunes'],
        ['Gustavo', 'Lemos'],
        ['Hugo', 'Sales'],
        ['Ítalo', 'Benedito'],
        ['Jonas', 'Werner'],
      ]
      const LOCATIONS = ['nearby', 'nearby', 'mora_cidade', 'other_city', 'passage']
      const clients = []
      clientDefs.forEach((def, i) => {
        const phone =
          '(41) 97' + pad(1 + Math.floor(i / 10)) + pad(i % 10) + '0' + pad((i * 7) % 10)
        let existing = null
        try {
          existing = tx.findFirstRecordByData('clients', 'phone', phone)
        } catch (e) {
          /* não existe */
        }
        if (existing) {
          clients.push(existing)
          return
        }
        const r = new Record(tx.findCollectionByNameOrId('clients'))
        r.set('name', def[0])
        r.set('surname', def[1])
        r.set('phone', phone)
        const by = 1978 + int(0, 24)
        r.set('birthday', by + '-' + pad(int(1, 12)) + '-' + pad(int(1, 28)) + ' 00:00:00')
        r.set('location_type', LOCATIONS[i % LOCATIONS.length])
        r.set('is_active', true)
        r.set('is_at_risk', false)
        const barber = barbers[i % barbers.length]
        r.set('preferred_barber_id', barber.id)
        r.set('organization_id', orgId)
        tx.save(r)
        clients.push(r)
      })

      // ================= 8. HISTÓRICO (últimos 90 dias, concluídos) =================
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const dayAt = (offset) => {
        const d = new Date(today)
        d.setDate(d.getDate() + offset)
        return d
      }
      const completed = []
      for (let offset = 89; offset >= 1; offset--) {
        const d = dayAt(-offset)
        let nAppts
        if (offset <= 14) nAppts = int(2, 3)
        else if (offset <= 30) nAppts = rnd() < 0.5 ? 2 : 1
        else nAppts = rnd() < 0.4 ? 1 : 0
        for (let k = 0; k < nAppts; k++) {
          const barber = pick(barbers)
          const svc = pick(services)
          const time = pick(SLOTS)
          if (!slotFree(barber.id, d, time)) continue
          takeSlot(barber.id, d, time)
          const client = pick(clients)
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
          tx.save(r)
          completed.push({
            apptId: r.id,
            barberId: barber.id,
            barberName: barber.getString('name'),
            clientId: client.id,
            serviceId: svc.id,
            serviceName: svc.getString('name'),
            price,
            date: d,
            time,
            pct: barber.getFloat('commission_value') || 50,
          })
          client.set('last_visit', dayStr(d) + ' 00:00:00')
          tx.save(client)
        }
        // alguns FALTOU / Cancelado espalhados
        if (offset % 13 === 0) {
          const barber = pick(barbers)
          const svc = pick(services)
          const time = pick(SLOTS)
          if (slotFree(barber.id, d, time)) {
            takeSlot(barber.id, d, time)
            const client = pick(clients)
            const r = new Record(tx.findCollectionByNameOrId('appointments'))
            r.set('barber_id', barber.id)
            r.set('client_id', client.id)
            r.set('service_id', svc.id)
            r.set('date', apptDate(d))
            r.set('time', time)
            r.set('end_time', slotEnd(time, svc.getInt('duration_minutes') || 30))
            r.set('price', svc.getFloat('price') || 50)
            r.set('status', offset % 26 === 0 ? 'Cancelado' : 'FALTOU')
            r.set('organization_id', orgId)
            tx.save(r)
          }
        }
      }

      // ================= 9. CHECKOUTS + COMISSÕES do histórico =================
      for (const c of completed) {
        const pay = pick(PAYMENTS)
        checkoutSeq++
        const co = new Record(tx.findCollectionByNameOrId('checkouts'))
        co.set('checkout_number', checkoutSeq)
        co.set('client_id', c.clientId)
        co.set('barber_id', c.barberId)
        co.set('total_amount', c.price)
        co.set(
          'date',
          atISO(c.date, parseInt(c.time.split(':')[0]), parseInt(c.time.split(':')[1])),
        )
        co.set('payment_method', pay.label + ' - ' + c.barberName)
        co.set('items_snapshot', {
          additionalServices: [],
          discount: 0,
          manualExtras: [],
          packageUsed: false,
          products: [],
          scheduledPrice: c.price,
          service: c.serviceName,
        })
        co.set('organization_id', orgId)
        tx.save(co)

        const gross = c.price
        const fee = Math.round(gross * pay.fee * 100) / 100
        const amount = Math.round((gross * (c.pct / 100) - fee) * 100) / 100
        const cm = new Record(tx.findCollectionByNameOrId('commissions'))
        cm.set('barber_id', c.barberId)
        cm.set('appointment_id', c.apptId)
        cm.set('checkout_id', co.id)
        cm.set('type', 'service')
        cm.set('gross_amount', gross)
        cm.set('fee_amount', fee)
        cm.set('amount', amount)
        cm.set('payment_method', pay.sel)
        cm.set(
          'date',
          atISO(c.date, parseInt(c.time.split(':')[0]), parseInt(c.time.split(':')[1])),
        )
        // mais antigo = pago; últimos ~7 dias = disponível (a pagar)
        cm.set('status', c.date >= dayAt(-7) ? 'available' : 'paid')
        cm.set('is_advance', false)
        cm.set('organization_id', orgId)
        tx.save(cm)
      }

      // ================= 10. AGENDAMENTOS FUTUROS (21 dias) =================
      const STATUS_FUT = ['Confirmado', 'Pendente', 'Confirmado', 'Confirmado', 'Pendente']
      for (let offset = 0; offset < 21; offset++) {
        const d = dayAt(offset)
        const nAppts = offset === 0 ? int(4, 6) : int(3, 5)
        for (let k = 0; k < nAppts; k++) {
          const barber = pick(barbers)
          const svc = pick(services)
          const time = pick(SLOTS)
          if (!slotFree(barber.id, d, time)) continue
          takeSlot(barber.id, d, time)
          const client = pick(clients)
          const r = new Record(tx.findCollectionByNameOrId('appointments'))
          r.set('barber_id', barber.id)
          r.set('client_id', client.id)
          r.set('service_id', svc.id)
          r.set('date', apptDate(d))
          r.set('time', time)
          r.set('end_time', slotEnd(time, svc.getInt('duration_minutes') || 30))
          r.set('price', svc.getFloat('price') || 50)
          r.set('status', pick(STATUS_FUT))
          r.set('organization_id', orgId)
          tx.save(r)
        }
      }

      // ================= 11. FORNECEDORES (10) =================
      const supplierDefs = [
        [
          'Distribuidora Barber Supply',
          'Contato Comercial',
          'Rua XV de Novembro, 1200 - Curitiba/PR',
        ],
        ['Náutica Cosméticos Ltda', 'Marina Souza', 'Av. Sete de Setembro, 450 - Curitiba/PR'],
        ['Alta Modena Perfumaria', 'Ricardo Lopes', 'Rua Chile, 1980 - Curitiba/PR'],
        ['Global Lâminas Import', 'Fernanda Dias', 'Rua da Glória, 333 - São José dos Pinhais/PR'],
        ['Bebidas Sul Distribuidora', 'Carlos Prado', 'Rod. BR-116, km 95 - Araucária/PR'],
        ['Rey Barbearia Products', 'Marcos Vinícius', 'Rua Pasteur, 52 - Curitiba/PR'],
        ['Studio Pro Acabamentos', 'Juliana Reis', 'Av. República Argentina, 88 - Curitiba/PR'],
        ['Higie Care Consumíveis', 'Patrícia Nunes', 'Rua Eduardo Sprada, 7710 - Curitiba/PR'],
        ['Metal Faro Máquinas', 'André Ferro', 'Rua Eduardo Pinto da Rocha, 210 - Curitiba/PR'],
        [
          'Cia do Tpo Acabamentos',
          'Silvia Prado',
          'Rua Padre Anchieta, 1840 - Campina Grande do Sul/PR',
        ],
      ]
      const suppliers = []
      supplierDefs.forEach((def, i) => {
        const document = '10' + String(100000000000 + i * 7919).slice(0, 12) // 14 dígitos únicos
        let existing = null
        try {
          existing = tx.findFirstRecordByData('suppliers', 'document', document)
        } catch (e) {
          /* não existe */
        }
        if (existing) {
          suppliers.push(existing)
          return
        }
        const r = new Record(tx.findCollectionByNameOrId('suppliers'))
        r.set('name', def[0])
        r.set('document', document)
        r.set('contact_person', def[1])
        r.set('address', def[2])
        r.set('phone', '(41) 3' + pad(200 + i) + '-' + pad(1000 + i * 13).slice(0, 4))
        r.set('whatsapp', '4198' + pad(700 + i) + '-' + pad(2000 + i * 17).slice(0, 4))
        const cat = [catBeleza, catBebidas, catUso][i % 3]
        if (cat) r.set('category_id', [cat.id])
        r.set('organization_id', orgId)
        tx.save(r)
        suppliers.push(r)
      })

      // ================= 12. PRODUTOS (15) — positivo/baixo/esgotado =================
      const productDefs = [
        ['Pomada Modeladora Efeito Matte 120g', catBeleza, 65, 28, 24, 6, 8, 0],
        ['Óleo para Barba 30ml', catBeleza, 48, 19, 15, 6, 8, 1],
        ['Shampoo Anticaspa 250ml', catBeleza, 42, 17, 4, 6, 8, 1],
        ['Balm Hidratante Pós-Barba 100g', catBeleza, 45, 18, 3, 5, 6, 1],
        ['Talco Pós-Barba 80g', catBeleza, 28, 11, 12, 4, 6, 0],
        ['Cera Modeladora Fixação Forte 90g', catBeleza, 55, 24, 0, 5, 6, 0],
        ['Tônico Fortalecedor Capilar 120ml', catBeleza, 58, 26, 9, 4, 6, 1],
        ['Condicionador Barbearia 250ml', catBeleza, 38, 15, 2, 5, 6, 1],
        ['Lâmina Barbear Profissional (caixa c/ 100)', catUso, 85, 45, 18, 5, 8, 3],
        ['Gillette Mach 3 (unidade)', catUso, 22, 10, 30, 8, 10, 3],
        ['Lenço Descartável Caixa c/ 100', catUso, 18, 7, 5, 5, 6, 7],
        ['Perfume Importado 100ml', catBeleza, 220, 110, 6, 3, 4, 2],
        ['Cerveja Artesanal 350ml', catBebidas, 12, 5.5, 48, 12, 24, 4],
        ['Água Mineral 300ml', catBebidas, 5, 2, 60, 15, 24, 4],
        ['Máquina Corte Profissional', catUso, 380, 210, 0, 1, 2, 8],
      ]
      const products = []
      for (const def of productDefs) {
        let existing = null
        try {
          existing = tx.findFirstRecordByFilter(
            'products',
            orgFilter + " && name = '" + def[0].replace(/'/g, "\\'") + "'",
          )
        } catch (e) {
          /* não existe */
        }
        if (existing) {
          products.push(existing)
          continue
        }
        const r = new Record(tx.findCollectionByNameOrId('products'))
        r.set('name', def[0])
        r.set('price', def[2])
        r.set('cost_price', def[3])
        r.set('last_purchase_price', def[3])
        r.set('stock_initial', def[4] + def[5] * 3)
        r.set('stock_quantity', def[4])
        r.set('min_stock', def[5])
        r.set('reorder_point', def[6])
        if (def[1]) r.set('category_id', def[1].id)
        const supplier = suppliers[def[7] % suppliers.length]
        if (supplier) r.set('supplier_ids', [supplier.id])
        r.set('is_active', true)
        r.set('organization_id', orgId)
        tx.save(r)
        products.push(r)
      }

      // ================= 13. COMPRAS DE ESTOQUE =================
      for (let i = 0; i < 12; i++) {
        const product = products[i % products.length]
        const supplier = suppliers[(i * 3) % suppliers.length]
        const qty = int(6, 30)
        const unit = product.getFloat('cost_price') || 20
        const d = dayAt(-int(5, 45))
        const r = new Record(tx.findCollectionByNameOrId('inventory_purchases'))
        r.set('product_id', product.id)
        r.set('supplier_id', supplier.id)
        r.set('quantity', qty)
        r.set('unit_price', unit)
        r.set('price_paid', Math.round(qty * unit * 100) / 100)
        r.set('purchase_date', dayStr(d) + ' 12:00:00')
        r.set('status', 'received')
        r.set('received_at', dayStr(d) + ' 12:00:00')
        r.set('organization_id', orgId)
        tx.save(r)
      }
      for (let i = 0; i < 6; i++) {
        const product = products[(i * 2 + 1) % products.length]
        const supplier = suppliers[(i * 4 + 1) % suppliers.length]
        const qty = int(10, 40)
        const unit = product.getFloat('cost_price') || 20
        const d = dayAt(int(2, 12))
        const r = new Record(tx.findCollectionByNameOrId('inventory_purchases'))
        r.set('product_id', product.id)
        r.set('supplier_id', supplier.id)
        r.set('quantity', qty)
        r.set('unit_price', unit)
        r.set('price_paid', Math.round(qty * unit * 100) / 100)
        r.set('purchase_date', dayStr(d) + ' 12:00:00')
        r.set('status', 'pending')
        r.set('organization_id', orgId)
        tx.save(r)
      }

      // ================= 14. FILA (próximos 3 dias) =================
      const queuePlans = [
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
      for (const plan of queuePlans) {
        const d = dayAt(plan.offset)
        plan.items.forEach((item, i) => {
          const client = pick(clients)
          const svc = pick(services)
          const barber = pick(barbers)
          const r = new Record(tx.findCollectionByNameOrId('queue_entries'))
          r.set('client_id', client.id)
          r.set('service_id', svc.id)
          r.set('barber_id', barber.id)
          r.set('status', item.status)
          r.set('joined_at', atISO(d, 8 + i, 10 + i * 7))
          r.set('estimated_start_time', atISO(d, 9 + i, 0))
          r.set('organization_id', orgId)
          tx.save(r)
        })
      }

      // ================= 15. Marcador =================
      const marker = new Record(tx.findCollectionByNameOrId('settings'))
      marker.set('key', 'demo_seed_v2')
      marker.set('value', { seeded: true, org: orgId })
      marker.set('organization_id', orgId)
      tx.save(marker)
    })

    console.log('[demo-seed-0107] dados de demonstração criados para a organização ' + orgId)
  },
  (app) => {
    // down: best-effort — remove o marcador e os registros de demonstração
    try {
      const marker = app.findFirstRecordByFilter('settings', "key = 'demo_seed_v2'")
      const orgId = marker.getString('organization_id')
      const orgFilter = "organization_id = '" + orgId + "'"
      for (const col of [
        'queue_entries',
        'inventory_purchases',
        'commissions',
        'checkouts',
        'appointments',
      ]) {
        const recs = app.findRecordsByFilter(col, orgFilter, '', 100000, 0)
        for (const r of recs) app.delete(r)
      }
      const demoClients = app.findRecordsByFilter(
        'clients',
        orgFilter + " && phone ~ '(41) 97'",
        '',
        1000,
        0,
      )
      for (const r of demoClients) app.delete(r)
      app.delete(marker)
    } catch (e) {
      console.log('[demo-seed-0107] down: ' + e)
    }
  },
)
