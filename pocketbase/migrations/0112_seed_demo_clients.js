/*
 * 0112 — Clientes de demonstração (idempotente).
 *
 * Correção da série 0107–0111, que aplicou como no-op: a resolução da
 * organização por SQL cru (rows[0] nunca chegou) abortava tudo antes de
 * inserir. Aqui a organização é resolvida em JS, com a organização real
 * "Barbearia Default" (ozzi2oua5psdyho) como alvo explícito e fallback
 * dinâmico pela organização que tem clientes, e toda saída é logada.
 *
 * Cria 30 clientes com sobrenome "(Demo)", distribuídos entre os barbeiros
 * da organização. Nada real é alterado ou apagado.
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
      // fallback: primeira organização que realmente tem clientes
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
      console.log('[demo-0112] nenhuma organização válida encontrada — no-op')
      return
    }

    // ---------- guarda de idempotência ----------
    const existing = app.findRecordsByFilter(
      'clients',
      "organization_id = '" + orgId + "' && surname = '" + DEMO_TAG + "'",
      '',
      1,
      0,
    )
    if (existing.length > 0) {
      console.log('[demo-0112] clientes demo já existem (' + existing.length + ') — no-op')
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
      console.log('[demo-0112] nenhum barbeiro na organização ' + orgId + ' — no-op')
      return
    }

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
    const pad = (n) => (n < 10 ? '0' + n : '' + n)

    let created = 0
    app.runInTransaction((tx) => {
      for (let i = 0; i < defs.length; i++) {
        const def = defs[i]
        const phone = '(41) 98' + pad(50 + i) + '-' + pad(4000 + i * 37).slice(0, 4)
        // dedup por telefone+org
        let dup = null
        try {
          dup = tx.findFirstRecordByFilter(
            'clients',
            "organization_id = '" + orgId + "' && phone = '" + phone + "'",
          )
        } catch (e) {
          dup = null
        }
        if (dup) continue

        const r = new Record(tx.findCollectionByNameOrId('clients'))
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
        created++
      }
    })
    console.log('[demo-0112] ' + created + ' clientes demo criados na org ' + orgId)
  },
  (app) => {
    try {
      const recs = app.findRecordsByFilter('clients', "surname = '(Demo)'", '', 1000, 0)
      for (const r of recs) app.delete(r)
    } catch (e) {
      console.log('[demo-0112] down: ' + e)
    }
  },
)
