/*
 * 0107 — Clientes de demonstração (idempotente).
 *
 * Cria 30 clientes com sobrenome "(Demo)", distribuídos entre os barbeiros
 * da organização (a que tem mais clientes). Rodar de novo não duplica:
 * a existência de clientes com sobrenome "(Demo)" é a guarda.
 * Não altera nem apaga nenhum registro real.
 */
migrate(
  (app) => {
    // ---------- organização alvo: a que tem mais clientes ----------
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
      console.log('[demo-0107] nenhuma organização com clientes — no-op')
      return
    }

    // ---------- guarda de idempotência: já existem clientes (Demo)? ----------
    const existing = app.findRecordsByFilter(
      'clients',
      "organization_id = '" + orgId + "' && surname = '(Demo)'",
      '',
      1,
      0,
    )
    if (existing.length > 0) {
      console.log('[demo-0107] clientes demo já existem — no-op')
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
      console.log('[demo-0107] nenhum barbeiro na organização — no-op')
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
    for (let i = 0; i < defs.length; i++) {
      const def = defs[i]
      const phone = '(41) 98' + pad(50 + i) + '-' + pad(4000 + i * 37).slice(0, 4)
      // dedup por telefone+org (clients não tem índice único aqui)
      let dup = null
      try {
        dup = app.findFirstRecordByFilter(
          'clients',
          "organization_id = '" + orgId + "' && phone = '" + phone + "'",
        )
      } catch (e) {
        dup = null
      }
      if (dup) continue

      const r = new Record(app.findCollectionByNameOrId('clients'))
      r.set('name', def[0])
      r.set('surname', '(Demo)')
      r.set('phone', phone)
      r.set(
        'birthday',
        1978 + (i % 25) + '-' + pad((i % 12) + 1) + '-' + pad((i % 27) + 1) + ' 00:00:00',
      )
      r.set('location_type', LOCATIONS[i % LOCATIONS.length])
      r.set('is_active', true)
      r.set('is_at_risk', false)
      r.set('preferred_barber_id', barbers[i % barbers.length].id)
      r.set('organization_id', orgId)
      app.save(r)
      created++
    }
    console.log('[demo-0107] ' + created + ' clientes demo criados na org ' + orgId)
  },
  (app) => {
    try {
      const recs = app.findRecordsByFilter('clients', "surname = '(Demo)'", '', 1000, 0)
      for (const r of recs) app.delete(r)
    } catch (e) {
      console.log('[demo-0107] down: ' + e)
    }
  },
)
