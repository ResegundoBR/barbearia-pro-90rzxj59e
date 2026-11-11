/*
 * 0117 — REVERSÃO dos dados demo criados por 0112–0116.
 *
 * O usuário (Reginaldo) pediu expressamente: "reverta as migrações 0112 a
 * 0116, removendo somente os dados demo". Executa, na ordem inversa
 * (0116 → 0112), as MESMAS regras down já definidas em cada migração, com
 * duas correções de cobertura para não deixar órfãos:
 *   - 0114.down: apagava checkouts/comissões apenas dos 5 primeiros clientes
 *     demo (slice(0,5)) — aqui são TODOS os clientes demo.
 *   - 0116.down: apagava entradas de fila apenas dos 10 primeiros clientes
 *     demo (slice(0,10)) — aqui são TODOS os clientes demo.
 *
 * Resto 100% preservado: nada além de registros demo é apagado. Coleções,
 * campos e índices continuam existindo (a reversão remove registros, não
 * estrutura). Os agendamentos "Concluído"/FALTOU/Cancelado do histórico demo
 * são removidos pelo mesmo critério do down da 0113 (client_id ∈ clientes demo).
 * A 0114 também alterou last_visit dos clientes demo — removidos junto.
 *
 * down: no-op (nada para restaurar; a série 0112–0116 não deve voltar).
 */
migrate(
  (app) => {
    const DEMO_TAG = '(Demo)'
    const totals = {
      queue: 0,
      purchases: 0,
      products: 0,
      suppliers: 0,
      commissions: 0,
      checkouts: 0,
      appts: 0,
      clients: 0,
    }

    app.runInTransaction((tx) => {
      // ---------- 1. 0116 down — entradas de fila demo ----------
      // (down original cobria só os 10 primeiros clientes demo; aqui são todos)
      const demoClients = tx.findRecordsByFilter(
        'clients',
        "surname = '" + DEMO_TAG + "'",
        '',
        1000,
        0,
      )
      const clientIds = demoClients.map((c) => c.id)
      console.log('[revert-0117] clientes demo encontrados: ' + clientIds.length)

      const chunk = (arr, size) => {
        const out = []
        for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
        return out
      }
      const deleteByClientIds = (col, ids, counter) => {
        for (const part of chunk(ids, 25)) {
          const cond = part.map((id) => "client_id = '" + id + "'").join(' || ')
          const recs = tx.findRecordsByFilter(col, cond, '', 100000, 0)
          for (const r of recs) {
            tx.delete(r)
            totals[counter]++
          }
        }
      }

      deleteByClientIds('queue_entries', clientIds, 'queue')

      // ---------- 2. 0115 down — compras de produtos (Demo), produtos e fornecedores ----------
      const demoProducts = tx.findRecordsByFilter(
        'products',
        "name ~ '" + DEMO_TAG + "'",
        '',
        1000,
        0,
      )
      const prodIds = {}
      for (const p of demoProducts) prodIds[p.id] = true
      for (const part of chunk(
        demoProducts.map((p) => p.id),
        25,
      )) {
        const cond = part.map((id) => "product_id = '" + id + "'").join(' || ')
        const recs = tx.findRecordsByFilter('inventory_purchases', cond, '', 100000, 0)
        for (const r of recs) {
          tx.delete(r)
          totals.purchases++
        }
      }
      for (const p of demoProducts) tx.delete(p)
      totals.products = demoProducts.length

      const demoSuppliers = tx.findRecordsByFilter(
        'suppliers',
        "contact_person = '" + DEMO_TAG + "'",
        '',
        100,
        0,
      )
      for (const s of demoSuppliers) tx.delete(s)
      totals.suppliers = demoSuppliers.length

      // ---------- 3. 0114 down — comissões e checkouts de clientes demo ----------
      // (down original cobria só os 5 primeiros clientes demo; aqui são todos)
      for (const part of chunk(clientIds, 25)) {
        const cond = part.map((id) => "client_id = '" + id + "'").join(' || ')
        const cos = tx.findRecordsByFilter('checkouts', cond, '', 100000, 0)
        for (const co of cos) {
          try {
            const cms = tx.findRecordsByFilter(
              'commissions',
              "checkout_id = '" + co.id + "'",
              '',
              100,
              0,
            )
            for (const cm of cms) {
              tx.delete(cm)
              totals.commissions++
            }
          } catch (e) {
            /* segue */
          }
          tx.delete(co)
          totals.checkouts++
        }
      }

      // ---------- 4. 0113/0114 down — agendamentos de clientes demo ----------
      deleteByClientIds('appointments', clientIds, 'appts')

      // ---------- 5. 0112 down — clientes demo ----------
      for (const c of demoClients) tx.delete(c)
      totals.clients = clientIds.length
    })

    console.log(
      '[revert-0117] done — fila: ' +
        totals.queue +
        ', compras: ' +
        totals.purchases +
        ', produtos: ' +
        totals.products +
        ', fornecedores: ' +
        totals.suppliers +
        ', comissões: ' +
        totals.commissions +
        ', checkouts: ' +
        totals.checkouts +
        ', agendamentos: ' +
        totals.appts +
        ', clientes: ' +
        totals.clients,
    )
  },
  (app) => {
    // down: no-op
    console.log('[revert-0117] down: no-op')
  },
)
