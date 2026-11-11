/*
 * 0110 — Fornecedores (10), produtos (15) e compras de estoque (recebidas + pendentes).
 *
 * Marcadores demo: fornecedores com "document" 930000000000NN e contato "(Demo)";
 * produtos com sufixo "(Demo)" no nome. Estoques nas três situações: positivo,
 * abaixo do mínimo e zerado (esgotado). Idempotente: guarda = existe fornecedor
 * com contato "(Demo)".
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
      console.log('[demo-0110] nenhuma organização com clientes — no-op')
      return
    }

    // guarda
    try {
      app.findFirstRecordByFilter('suppliers', "contact_person = '(Demo)'")
      console.log('[demo-0110] fornecedores demo já existem — no-op')
      return
    } catch (e) {
      /* prosseguir */
    }

    const cats = app.findRecordsByFilter(
      'categories',
      "organization_id = '" + orgId + "'",
      '',
      100,
      0,
    )
    const catByName = {}
    for (const c of cats) catByName[c.getString('name')] = c
    const catBeleza = catByName['Beleza'] || cats[0] || null
    const catBebidas = catByName['Bebidas'] || catBeleza
    const catUso = catByName['Uso e Consumo'] || catBeleza

    const pad = (n) => (n < 10 ? '0' + n : '' + n)
    const dayStr = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())

    const suppliers = []
    app.runInTransaction((tx) => {
      // ---------- 10 FORNECEDORES ----------
      const supplierDefs = [
        [
          'Distribuidora Barber Supply (Demo)',
          'Contato Comercial',
          'Rua XV de Novembro, 1200 - Curitiba/PR',
        ],
        ['Náutica Cosméticos (Demo)', 'Marina Souza', 'Av. Sete de Setembro, 450 - Curitiba/PR'],
        ['Alta Modena Perfumaria (Demo)', 'Ricardo Lopes', 'Rua Chile, 1980 - Curitiba/PR'],
        [
          'Global Lâminas Import (Demo)',
          'Fernanda Dias',
          'Rua da Glória, 333 - São José dos Pinhais/PR',
        ],
        ['Bebidas Sul Distribuidora (Demo)', 'Carlos Prado', 'Rod. BR-116, km 95 - Araucária/PR'],
        ['Rey Barbearia Products (Demo)', 'Marcos Vinícius', 'Rua Pasteur, 52 - Curitiba/PR'],
        [
          'Studio Pro Acabamentos (Demo)',
          'Juliana Reis',
          'Av. República Argentina, 88 - Curitiba/PR',
        ],
        [
          'Higie Care Consumíveis (Demo)',
          'Patrícia Nunes',
          'Rua Eduardo Sprada, 7710 - Curitiba/PR',
        ],
        [
          'Metal Faro Máquinas (Demo)',
          'André Ferro',
          'Rua Eduardo Pinto da Rocha, 210 - Curitiba/PR',
        ],
        [
          'Cia do Topo Acabamentos (Demo)',
          'Silvia Prado',
          'Rua Padre Anchieta, 1840 - Campina Grande do Sul/PR',
        ],
      ]
      supplierDefs.forEach((def, i) => {
        const document = String(93000000000000 + i * 7)
        let dup = null
        try {
          dup = tx.findFirstRecordByFilter('suppliers', "document = '" + document + "'")
        } catch (e) {
          dup = null
        }
        if (dup) {
          suppliers.push(dup)
          return
        }
        const r = new Record(tx.findCollectionByNameOrId('suppliers'))
        r.set('name', def[0])
        r.set('document', document)
        r.set('contact_person', '(Demo)')
        r.set('address', def[2])
        r.set('phone', '(41) 3' + pad(200 + i) + '-' + pad(1000 + i * 13).slice(0, 4))
        r.set('whatsapp', '4198' + pad(700 + i) + '-' + pad(2000 + i * 17).slice(0, 4))
        if (i % 3 === 0 && catBeleza) r.set('category_id', [catBeleza.id])
        else if (i % 3 === 1 && catBebidas) r.set('category_id', [catBebidas.id])
        else if (catUso) r.set('category_id', [catUso.id])
        r.set('organization_id', orgId)
        tx.save(r)
        suppliers.push(r)
      })

      // ---------- 15 PRODUTOS (estoque positivo / baixo / esgotado) ----------
      // [nome, categoria, preço venda, custo, estoque, minStock, reorderPoint, idx fornecedor]
      const productDefs = [
        ['Pomada Modeladora Efeito Matte 120g (Demo)', catBeleza, 65, 28, 24, 6, 8, 0],
        ['Óleo para Barba 30ml (Demo)', catBeleza, 48, 19, 15, 6, 8, 1],
        ['Shampoo Anticaspa 250ml (Demo)', catBeleza, 42, 17, 4, 6, 8, 1],
        ['Balm Hidratante Pós-Barba 100g (Demo)', catBeleza, 45, 18, 3, 5, 6, 1],
        ['Talco Pós-Barba 80g (Demo)', catBeleza, 28, 11, 12, 4, 6, 0],
        ['Cera Modeladora Fixação Forte 90g (Demo)', catBeleza, 55, 24, 0, 5, 6, 0],
        ['Tônico Fortalecedor Capilar 120ml (Demo)', catBeleza, 58, 26, 9, 4, 6, 1],
        ['Condicionador Barbearia 250ml (Demo)', catBeleza, 38, 15, 2, 5, 6, 1],
        ['Lâmina Barbear Profissional caixa c/100 (Demo)', catUso, 85, 45, 18, 5, 8, 3],
        ['Gillette Mach 3 unidade (Demo)', catUso, 22, 10, 30, 8, 10, 3],
        ['Lenço Descartável caixa c/100 (Demo)', catUso, 18, 7, 5, 5, 6, 7],
        ['Perfume Importado 100ml (Demo)', catBeleza, 220, 110, 6, 3, 4, 2],
        ['Cerveja Artesanal 350ml (Demo)', catBebidas, 12, 5.5, 48, 12, 24, 4],
        ['Água Mineral 300ml (Demo)', catBebidas, 5, 2, 60, 15, 24, 4],
        ['Máquina Corte Profissional (Demo)', catUso, 380, 210, 0, 1, 2, 8],
      ]
      const products = []
      for (const def of productDefs) {
        let dup = null
        try {
          dup = tx.findFirstRecordByFilter(
            'products',
            "organization_id = '" + orgId + "' && name = '" + def[0].replace(/'/g, "\\'") + "'",
          )
        } catch (e) {
          dup = null
        }
        if (dup) {
          products.push(dup)
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

      // ---------- 12 COMPRAS RECEBIDAS (últimos 45 dias) ----------
      for (let i = 0; i < 12; i++) {
        const product = products[i % products.length]
        const supplier = suppliers[(i * 3) % suppliers.length]
        const qty = 6 + ((i * 7) % 25)
        const unit = product.getFloat('cost_price') || 20
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        d.setDate(d.getDate() - (5 + ((i * 4) % 41)))
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
      // ---------- 6 COMPRAS PENDENTES (a receber) ----------
      for (let i = 0; i < 6; i++) {
        const product = products[(i * 2 + 1) % products.length]
        const supplier = suppliers[(i * 4 + 1) % suppliers.length]
        const qty = 10 + ((i * 11) % 31)
        const unit = product.getFloat('cost_price') || 20
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        d.setDate(d.getDate() + 2 + ((i * 2) % 11))
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
      console.log(
        '[demo-0110] org ' +
          orgId +
          ': ' +
          suppliers.length +
          ' fornecedores, ' +
          products.length +
          ' produtos, 12 compras recebidas, 6 pendentes',
      )
    })
  },
  (app) => {
    try {
      const prods = app.findRecordsByFilter('products', "name ~ '(Demo)'", '', 1000, 0)
      for (const p of prods) app.delete(p)
      const sups = app.findRecordsByFilter('suppliers', "contact_person = '(Demo)'", '', 100, 0)
      for (const s of sups) app.delete(s)
      // compras de estoque ligadas a esses registros são órfãs aqui — remoção best-effort
    } catch (e) {
      console.log('[demo-0110] down: ' + e)
    }
  },
)
