/*
 * 0118 — População de dados de demonstração na organização "Laboratório"
 * (qwc9rf8564p8pev), corrigindo a série 0112–0116 que aplicou como no-op.
 *
 * Correção da causa raiz: as migrações anteriores resolviam a organização com
 * fallback dinâmico e engoliam erros em try/catch (return silencioso). Aqui:
 *  - a organização é resolvida por findRecordById com o id EXATO
 *    qwc9rf8564p8pev e é validada por nome ("Laboratório");
 *  - se a resolução falhar, a migração ABORTA COM ERRO (throw) e o erro real
 *    é logado com console.error — nunca fallback para outra organização;
 *  - antes de qualquer escrita, a organização resolvida é revalidada contra
 *    qwc9rf8564p8pev; qualquer divergência é erro fatal.
 *
 * Dados criados (todos com marcador "(Demo)"):
 *  - 30 clientes distribuídos entre os barbeiros da org (preferred_barber_id);
 *  - ~80 agendamentos futuros (21 dias), Confirmado/Pendente, sem conflito de
 *    horário por barbeiro;
 *  - histórico de 60 dias com atendimentos "Concluído", checkouts e
 *    comissões type='service' (antigas 'paid', recentes 'available');
 *  - 10 fornecedores, 15 produtos (positivo/abaixo do mínimo/esgotado) e
 *    compras recebidas + pendentes;
 *  - fila de atendimento (queue_entries) para hoje, amanhã e depois de amanhã.
 *
 * Idempotente: cada bloco re-checa a própria tabela antes de inserir.
 */
migrate(
  (app) => {
    const DEMO_TAG = '(Demo)'
    const TARGET_ORG = 'qwc9rf8564p8pev' // Laboratório — org de testes do Reginaldo

    // ---------- organização alvo: fail loud ----------
    let orgId = ''
    try {
      const org = app.findRecordById('organizations', TARGET_ORG)
      if (!org || !org.id) throw new Error('registro de organização vazio')
      if (org.id !== TARGET_ORG) {
        throw new Error('id da organização resolvida (' + org.id + ') difere do alvo ' + TARGET_ORG)
      }
      orgId = org.id
      console.log('[demo-0118] organização alvo confirmada: ' + orgId)
    } catch (e) {
      console.error('[demo-0118] FALHA ao resolver a organização alvo ' + TARGET_ORG + ': ' + e)
      throw new Error(
        '[demo-0118] organização Laboratório (' +
          TARGET_ORG +
          ') não encontrada — migração abortada',
      )
    }

    const orgFilter = "organization_id = '" + orgId + "'"

    // ---------- dependências ----------
    const barbers = app.findRecordsByFilter('barbers', orgFilter, 'created', 50, 0)
    if (barbers.length === 0) {
      throw new Error('[demo-0118] nenhum barbeiro na org ' + orgId + ' — abortada')
    }
    console.log('[demo-0118] barbeiros na org: ' + barbers.length)

    const services = app.findRecordsByFilter(
      'services',
      orgFilter + ' && is_active = true',
      '',
      100,
      0,
    )
    if (services.length === 0) {
      throw new Error('[demo-0118] nenhum serviço ativo na org ' + orgId + ' — abortada')
    }
    console.log('[demo-0118] serviços ativos na org: ' + services.length)

    const cats = app.findRecordsByFilter('categories', orgFilter, '', 100, 0)
    const catByName = {}
    for (const c of cats) catByName[c.getString('name')] = c
    const catBeleza = catByName['Beleza'] || null
    const catBebidas = catByName['Bebidas'] || null
    const catDoces = catByName['Doces/Salgados'] || null
    const catServicos = catByName['Serviços'] || (cats.length > 0 ? cats[0] : null)
    console.log('[demo-0118] categorias na org: ' + cats.length)

    // ---------- helpers determinísticos ----------
    let seedState = 20260218
    const rnd = () => {
      seedState = (seedState * 1103515245 + 12345) % 2147483648
      return seedState / 2147483648
    }
    const pick = (arr) => arr[Math.floor(rnd() * arr.length)]
    const int = (min, max) => min + Math.floor(rnd() * (max - min + 1))
    const pad = (n) => (n < 10 ? '0' + n : '' + n)
    const dayStr = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
    const atISO = (d, h, m) => dayStr(d) + ' ' + pad(h) + ':' + pad(m) + ':00.000Z'

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

    const PAYMENTS = [
      { label: 'Pix', sel: 'pix', fee: 0 },
      { label: 'Dinheiro', sel: 'cash', fee: 0 },
      { label: 'Cartão de Débito', sel: 'debito', fee: 0.0099 },
      { label: 'Cartão de Crédito', sel: 'credito', fee: 0.0349 },
    ]

    const clientsCol = app.findCollectionByNameOrId('clients')
    const apptsCol = app.findCollectionByNameOrId('appointments')
    const coCol = app.findCollectionByNameOrId('checkouts')
    const cmCol = app.findCollectionByNameOrId('commissions')
    const supCol = app.findCollectionByNameOrId('suppliers')
    const prodCol = app.findCollectionByNameOrId('products')
    const purCol = app.findCollectionByNameOrId('inventory_purchases')
    const qCol = app.findCollectionByNameOrId('queue_entries')

    let nClients = 0
    let nAppts = 0
    let nCo = 0
    let nCm = 0
    let nSup = 0
    let nProd = 0
    let nPur = 0
    let nQueue = 0

    app.runInTransaction((tx) => {
      // ============================================================
      // 1) CLIENTES (30, marcador (Demo) no surname)
      // ============================================================
      const defs = [
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

      const demoClients = []
      for (let i = 0; i < defs.length; i++) {
        const def = defs[i]
        const phone = '(41) 99' + pad(10 + i) + '-' + pad(3000 + i * 37).slice(0, 4)
        let dup = null
        try {
          dup = tx.findFirstRecordByFilter('clients', orgFilter + " && phone = '" + phone + "'")
        } catch (e) {
          dup = null
        }
        if (dup) {
          demoClients.push(dup)
          continue
        }
        const r = new Record(clientsCol)
        r.set('name', def[0] + ' ' + DEMO_TAG)
        r.set('surname', DEMO_TAG)
        r.set('phone', phone)
        r.set(
          'birthday',
          1978 + (i % 25) + '-' + pad((i % 12) + 1) + '-' + pad((i % 27) + 1) + ' 00:00:00',
        )
        r.set('location_type', LOCATIONS[i % LOCATIONS.length])
        r.set('is_active', true)
        r.set('is_at_risk', false)
        r.set('preferred_barber_id', barbers[i % barbers.length].id)
        r.set('created_by_id', barbers[i % barbers.length].id)
        r.set('organization_id', orgId)
        tx.save(r)
        demoClients.push(r)
        nClients++
      }
      console.log('[demo-0118] clientes demo: ' + nClients)
      if (demoClients.length === 0) {
        throw new Error('[demo-0118] nenhum cliente demo disponível — abortada')
      }

      // ============================================================
      // 2) AGENDAMENTOS FUTUROS (~80 nos próximos 21 dias)
      // ============================================================
      // guarda: já existem agendamentos futuros de clientes demo nesta org?
      let hasFuture = false
      try {
        const future = tx.findRecordsByFilter(
          'appointments',
          orgFilter + " && client_id.surname = '" + DEMO_TAG + "' && date > @now",
          '',
          1,
          0,
        )
        hasFuture = future.length > 0
      } catch (e) {
        console.error('[demo-0118] guarda de agendamentos falhou: ' + e)
        throw e
      }
      if (!hasFuture) {
        const STATUS_FUT = ['Confirmado', 'Confirmado', 'Confirmado', 'Confirmado', 'Pendente']
        for (let offset = 0; offset < 21; offset++) {
          const d = new Date()
          d.setHours(0, 0, 0, 0)
          d.setDate(d.getDate() + offset)
          const nApptsDay = offset === 0 ? int(4, 6) : int(3, 5)
          for (let k = 0; k < nApptsDay; k++) {
            const barber = pick(barbers)
            const svc = pick(services)
            const time = pick(SLOTS)
            if (!slotFree(barber.id, d, time)) continue
            takeSlot(barber.id, d, time)
            const r = new Record(apptsCol)
            r.set('barber_id', barber.id)
            r.set('client_id', pick(demoClients).id)
            r.set('service_id', svc.id)
            r.set('date', dayStr(d) + ' 12:00:00')
            r.set('time', time)
            r.set('end_time', slotEnd(time, svc.getInt('duration_minutes') || 30))
            r.set('price', svc.getFloat('price') || 50)
            r.set('status', STATUS_FUT[int(0, STATUS_FUT.length - 1)])
            r.set('organization_id', orgId)
            tx.save(r)
            nAppts++
          }
        }
      }
      console.log('[demo-0118] agendamentos futuros demo: ' + nAppts)

      // ============================================================
      // 3) HISTÓRICO 60 D — atendimentos Concluído + checkouts + comissões
      // ============================================================
      let hasCheckout = false
      try {
        const guardIds = demoClients
          .slice(0, 5)
          .map((c) => "client_id = '" + c.id + "'")
          .join(' || ')
        tx.findFirstRecordByFilter('checkouts', orgFilter + ' && (' + guardIds + ')')
        hasCheckout = true
      } catch (e) {
        hasCheckout = false
      }
      if (!hasCheckout) {
        let checkoutSeq = 0
        try {
          const last = tx.findRecordsByFilter('checkouts', orgFilter, '-checkout_number', 1, 0)
          if (last.length > 0) checkoutSeq = last[0].getInt('checkout_number')
        } catch (e) {
          checkoutSeq = 0
        }

        const completed = []
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
            const pct = barber.getFloat('commission_value') || 50
            const r = new Record(apptsCol)
            r.set('barber_id', barber.id)
            r.set('client_id', client.id)
            r.set('service_id', svc.id)
            r.set('date', dayStr(d) + ' 12:00:00')
            r.set('time', time)
            r.set('end_time', slotEnd(time, svc.getInt('duration_minutes') || 30))
            r.set('price', price)
            r.set('status', 'Concluído')
            r.set('organization_id', orgId)
            tx.save(r)
            nAppts++
            completed.push({
              barberId: barber.id,
              barberName: barber.getString('name'),
              clientId: client.id,
              svcName: svc.getString('name'),
              price,
              date: d,
              time,
              pct,
            })
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
              const r = new Record(apptsCol)
              r.set('barber_id', barber.id)
              r.set('client_id', pick(demoClients).id)
              r.set('service_id', svc.id)
              r.set('date', dayStr(d) + ' 12:00:00')
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

        for (const c of completed) {
          const pay = pick(PAYMENTS)
          checkoutSeq++
          const hh = parseInt(c.time.split(':')[0])
          const mm = parseInt(c.time.split(':')[1])
          const co = new Record(coCol)
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
          tx.save(co)
          nCo++

          const gross = c.price
          const fee = Math.round(gross * pay.fee * 100) / 100
          const amount = Math.round((gross * (c.pct / 100) - fee) * 100) / 100
          const cm = new Record(cmCol)
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
          tx.save(cm)
          nCm++
        }
      }
      console.log('[demo-0118] histórico: checkouts ' + nCo + ', comissões ' + nCm)

      // ============================================================
      // 4) FORNECEDORES (10) + PRODUTOS (15) + COMPRAS (recebidas/pendentes)
      // ============================================================
      const supplierDefs = [
        ['Distribuidora Barber Supply (Demo)', 'Rua XV de Novembro, 1200 - Curitiba/PR'],
        ['Náutica Cosméticos (Demo)', 'Av. Sete de Setembro, 450 - Curitiba/PR'],
        ['Alta Modena Perfumaria (Demo)', 'Rua Chile, 1980 - Curitiba/PR'],
        ['Global Lâminas Import (Demo)', 'Rua da Glória, 333 - São José dos Pinhais/PR'],
        ['Bebidas Sul Distribuidora (Demo)', 'Rod. BR-116, km 95 - Araucária/PR'],
        ['Rey Barbearia Products (Demo)', 'Rua Pasteur, 52 - Curitiba/PR'],
        ['Studio Pro Acabamentos (Demo)', 'Av. República Argentina, 88 - Curitiba/PR'],
        ['Higie Care Consumíveis (Demo)', 'Rua Eduardo Sprada, 7710 - Curitiba/PR'],
        ['Metal Faro Máquinas (Demo)', 'Rua Eduardo Pinto da Rocha, 210 - Curitiba/PR'],
        ['Cia do Topo Acabamentos (Demo)', 'Rua Padre Anchieta, 1840 - Campina Grande do Sul/PR'],
      ]
      const SUPPLIER_CAT_BY_IDX = [
        catBeleza,
        catBeleza,
        catBeleza,
        catBeleza,
        catBebidas,
        catBeleza,
        catBeleza,
        catDoces,
        catBeleza,
        catDoces,
      ]

      const suppliers = []
      for (let i = 0; i < supplierDefs.length; i++) {
        const document = String(93100000000000 + i * 7)
        let dup = null
        try {
          dup = tx.findFirstRecordByFilter('suppliers', "document = '" + document + "'")
        } catch (e) {
          dup = null
        }
        if (dup) {
          suppliers.push(dup)
          continue
        }
        const r = new Record(supCol)
        r.set('name', supplierDefs[i][0])
        r.set('document', document)
        r.set('contact_person', DEMO_TAG)
        r.set('address', supplierDefs[i][1])
        r.set('phone', '(41) 3' + pad(200 + i) + '-' + pad(1000 + i * 13).slice(0, 4))
        r.set('whatsapp', '4198' + pad(700 + i) + '-' + pad(2000 + i * 17).slice(0, 4))
        const cat = SUPPLIER_CAT_BY_IDX[i]
        if (cat) r.set('category_id', [cat.id])
        r.set('organization_id', orgId)
        tx.save(r)
        suppliers.push(r)
        nSup++
      }
      console.log('[demo-0118] fornecedores demo: ' + nSup)

      // [nome, cat, preço, custo, estoque, minStock, reorderPoint, idx fornecedor]
      const productDefs = [
        ['Pomada Modeladora Efeito Matte 120g (Demo)', catBeleza, 65, 28, 24, 6, 8, 0],
        ['Óleo para Barba 30ml (Demo)', catBeleza, 48, 19, 15, 6, 8, 1],
        ['Shampoo Anticaspa 250ml (Demo)', catBeleza, 42, 17, 4, 6, 8, 1],
        ['Balm Hidratante Pós-Barba 100g (Demo)', catBeleza, 45, 18, 3, 5, 6, 1],
        ['Talco Pós-Barba 80g (Demo)', catBeleza, 28, 11, 12, 4, 6, 0],
        ['Cera Modeladora Fixação Forte 90g (Demo)', catBeleza, 55, 24, 0, 5, 6, 0],
        ['Tônico Fortalecedor Capilar 120ml (Demo)', catBeleza, 58, 26, 9, 4, 6, 1],
        ['Condicionador Barbearia 250ml (Demo)', catBeleza, 38, 15, 2, 5, 6, 1],
        ['Lâmina Barbear Profissional caixa c/100 (Demo)', catServicos, 85, 45, 18, 5, 8, 3],
        ['Gillette Mach 3 unidade (Demo)', catServicos, 22, 10, 30, 8, 10, 3],
        ['Lenço Descartável caixa c/100 (Demo)', catDoces, 18, 7, 5, 5, 6, 7],
        ['Perfume Importado 100ml (Demo)', catBeleza, 220, 110, 6, 3, 4, 2],
        ['Cerveja Artesanal 350ml (Demo)', catBebidas, 12, 5.5, 48, 12, 24, 4],
        ['Água Mineral 300ml (Demo)', catBebidas, 5, 2, 60, 15, 24, 4],
        ['Máquina Corte Profissional (Demo)', catServicos, 380, 210, 0, 1, 2, 8],
      ]
      const products = []
      for (const def of productDefs) {
        let dup = null
        try {
          dup = tx.findFirstRecordByFilter(
            'products',
            orgFilter + " && name = '" + def[0].replace(/'/g, "\\'") + "'",
          )
        } catch (e) {
          dup = null
        }
        if (dup) {
          products.push(dup)
          continue
        }
        const r = new Record(prodCol)
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
        nProd++
      }
      console.log('[demo-0118] produtos demo: ' + nProd)

      // compras recebidas (últimos 45 dias)
      let hasPurchase = false
      try {
        const prods = tx.findRecordsByFilter(
          'products',
          orgFilter + " && name ~ '(Demo)'",
          '',
          1000,
          0,
        )
        if (prods.length > 0) {
          const cond = prods
            .slice(0, 5)
            .map((p) => "product_id = '" + p.id + "'")
            .join(' || ')
          tx.findFirstRecordByFilter('inventory_purchases', orgFilter + ' && (' + cond + ')')
          hasPurchase = true
        }
      } catch (e) {
        hasPurchase = false
      }
      if (!hasPurchase) {
        for (let i = 0; i < 12; i++) {
          const product = products[i % products.length]
          const supplier = suppliers[(i * 3) % suppliers.length]
          const qty = 6 + ((i * 7) % 25)
          const unit = product.getFloat('cost_price') || 20
          const d = new Date()
          d.setHours(0, 0, 0, 0)
          d.setDate(d.getDate() - (5 + ((i * 4) % 41)))
          const r = new Record(purCol)
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
          nPur++
        }
        // compras pendentes (a receber)
        for (let i = 0; i < 6; i++) {
          const product = products[(i * 2 + 1) % products.length]
          const supplier = suppliers[(i * 4 + 1) % suppliers.length]
          const qty = 10 + ((i * 11) % 31)
          const unit = product.getFloat('cost_price') || 20
          const d = new Date()
          d.setHours(0, 0, 0, 0)
          d.setDate(d.getDate() + 2 + ((i * 2) % 11))
          const r = new Record(purCol)
          r.set('product_id', product.id)
          r.set('supplier_id', supplier.id)
          r.set('quantity', qty)
          r.set('unit_price', unit)
          r.set('price_paid', Math.round(qty * unit * 100) / 100)
          r.set('purchase_date', dayStr(d) + ' 12:00:00')
          r.set('status', 'pending')
          r.set('organization_id', orgId)
          tx.save(r)
          nPur++
        }
      }
      console.log('[demo-0118] compras demo: ' + nPur)

      // ============================================================
      // 5) FILA DE ATENDIMENTO (hoje + 2 dias)
      // ============================================================
      let hasQueue = false
      try {
        const guardIds = demoClients
          .slice(0, 5)
          .map((c) => "client_id = '" + c.id + "'")
          .join(' || ')
        tx.findFirstRecordByFilter('queue_entries', orgFilter + ' && (' + guardIds + ')')
        hasQueue = true
      } catch (e) {
        hasQueue = false
      }
      if (!hasQueue) {
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
            const r = new Record(qCol)
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
            nQueue++
          }
        }
      }
      console.log('[demo-0118] queue_entries demo: ' + nQueue)
    })

    console.log(
      '[demo-0118] RESUMO org ' +
        orgId +
        ': clientes ' +
        nClients +
        ', agendamentos ' +
        nAppts +
        ', checkouts ' +
        nCo +
        ', comissões ' +
        nCm +
        ', fornecedores ' +
        nSup +
        ', produtos ' +
        nProd +
        ', compras ' +
        nPur +
        ', fila ' +
        nQueue,
    )
  },
  (app) => {
    // down: remove apenas registros da org Laboratório (qwc9rf8564p8pev)
    const TARGET_ORG = 'qwc9rf8564p8pev'
    try {
      const demoClients = app.findRecordsByFilter(
        'clients',
        "organization_id = '" + TARGET_ORG + "' && surname = '(Demo)'",
        '',
        1000,
        0,
      )
      const ids = demoClients.map((c) => c.id)
      const byClient = (coll) =>
        ids
          .slice(0, 20)
          .map((id) => "client_id = '" + id + "'")
          .join(' || ')
      for (const coll of ['appointments', 'queue_entries']) {
        const cond = byClient(coll)
        if (!cond) continue
        const recs = app.findRecordsByFilter(coll, cond, '', 100000, 0)
        for (const r of recs) app.delete(r)
      }
      for (const cid of ids) {
        const cos = app.findRecordsByFilter('checkouts', "client_id = '" + cid + "'", '', 1000, 0)
        for (const co of cos) {
          try {
            const cms = app.findRecordsByFilter(
              'commissions',
              "checkout_id = '" + co.id + "'",
              '',
              100,
              0,
            )
            for (const cm of cms) app.delete(cm)
          } catch (e) {
            console.error('[demo-0118] down: comissões de checkout ' + co.id + ': ' + e)
          }
          app.delete(co)
        }
      }
      const prods = app.findRecordsByFilter(
        'products',
        "organization_id = '" + TARGET_ORG + "' && name ~ '(Demo)'",
        '',
        1000,
        0,
      )
      const prodIds = {}
      for (const p of prods) prodIds[p.id] = true
      const purs = app.findRecordsByFilter(
        'inventory_purchases',
        "organization_id = '" + TARGET_ORG + "'",
        '',
        1000,
        0,
      )
      for (const r of purs) {
        if (prodIds[r.getString('product_id')]) app.delete(r)
      }
      for (const p of prods) app.delete(p)
      const sups = app.findRecordsByFilter(
        'suppliers',
        "organization_id = '" + TARGET_ORG + "' && contact_person = '(Demo)'",
        '',
        100,
        0,
      )
      for (const s of sups) app.delete(s)
      console.log('[demo-0118] down concluído')
    } catch (e) {
      console.error('[demo-0118] down FALHOU: ' + e)
      throw e
    }
  },
)
