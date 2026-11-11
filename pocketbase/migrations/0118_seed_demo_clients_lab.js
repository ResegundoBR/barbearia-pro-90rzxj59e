/*
 * 0118 — Clientes de demonstração na org Laboratório.
 *
 * ORGANIZAÇÃO-ALVO FIXA (pinned): qwc9rf8564p8pev ("Laboratório").
 * NENHUM fallback dinâmico: se a org não existir, a migração ABORTA com erro
 * (não aplica silenciosamente em outra org). Nenhum registro é criado fora
 * dela — todo Record.save passa por assertOrg().
 *
 * Marcador demo: sobrenome (surname) = "(Demo)".
 * Idempotente: guarda por existência de clientes demo na própria org.
 * Erros abortam a migração (throw), nunca são engolidos.
 */
migrate(
  (app) => {
    const ORG = 'qwc9rf8564p8pev'
    const DEMO_TAG = '(Demo)'

    // ---------- organização-alvo: deve existir, senão aborta ----------
    const org = app.findRecordById('organizations', ORG) // lança se não existir
    if (!org || !org.id) {
      throw new Error('[demo-0118] organização-alvo ' + ORG + ' não encontrada — abortando')
    }
    const orgId = org.id

    // Toda gravação passa por aqui: organization_id é SEMPRE a org-alvo.
    const assertOrg = (r) => {
      if (r.getString('organization_id') !== orgId) {
        throw new Error(
          '[demo-0118] violação de org: registro de ' +
            r.collection().name +
            ' com organization_id inesperado — abortando',
        )
      }
    }

    // ---------- guardas de idempotência ----------
    const existingDemo = app.countRecords(
      'clients',
      "organization_id = '" + orgId + "' && surname = '" + DEMO_TAG + "'",
    )
    if (existingDemo > 0) {
      console.log('[demo-0118] ' + existingDemo + ' clientes demo já existem — no-op')
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
      throw new Error(
        '[demo-0118] nenhum barbeiro na org ' + orgId + ' — abortando (sem fallback de org)',
      )
    }

    // ---------- definição dos clientes demo ----------
    const defs = [
      ['Anderson', 'Ribeiro'],
      ['Bruno', 'Carvalho'],
      ['Caio', 'Martins'],
      ['Diego', 'Nunes'],
      ['Everton', 'Siqueira'],
      ['Fabio', 'Toledo'],
      ['Gabriel', 'Moura'],
      ['Henrique', 'Dantas'],
      ['Ivan', 'Barreto'],
      ['Joao Pedro', 'Vasconcelos'],
      ['Kleber', 'Rocha'],
      ['Leandro', 'Fontes'],
      ['Marcelo', 'Tavares'],
      ['Nathan', 'Correa'],
      ['Otavio', 'Bezerra'],
      ['Paulo', 'Andrade'],
      ['Rafael', 'Queiroz'],
      ['Sergio', 'Bittencourt'],
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
      ['Italo', 'Benedito'],
      ['Jonas', 'Werner'],
    ]
    const LOCATIONS = ['nearby', 'nearby', 'mora_cidade', 'other_city', 'passage']
    const pad = (n) => (n < 10 ? '0' + n : '' + n)

    let created = 0
    app.runInTransaction((tx) => {
      for (let i = 0; i < defs.length; i++) {
        const def = defs[i]
        const phone = '(41) 97' + pad(50 + i) + '-' + pad(4000 + i * 37).slice(0, 4)
        // dedup por telefone+org (idempotência por registro)
        let dup = null
        dup = tx.findFirstRecordByFilter(
          'clients',
          "organization_id = '" + orgId + "' && phone = '" + phone + "'",
        )
        if (dup) continue

        const r = new Record(tx.findCollectionByNameOrId('clients'))
        r.set('name', def[0] + ' ' + def[1] + ' ' + DEMO_TAG)
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
        assertOrg(r)
        created++
      }
      console.log('[demo-0118] criados ' + created + ' clientes demo na org ' + orgId)
      if (created === 0 && existingDemo === 0) {
        throw new Error('[demo-0118] nada foi criado e nada existia — abortando')
      }
    })
  },
  (app) => {
    const ORG = 'qwc9rf8564p8pev'
    const recs = app.findRecordsByFilter(
      'clients',
      "organization_id = '" + ORG + "' && surname = '(Demo)'",
      '',
      1000,
      0,
    )
    for (const r of recs) app.delete(r)
    console.log('[demo-0118] down: removidos clientes demo da org ' + ORG)
  },
)
