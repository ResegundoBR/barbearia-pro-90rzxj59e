///
/// Hook de verificação de dados demo — org Laboratório (qwc9rf8564p8pev).
///
/// Loga, a cada 10 minutos, as contagens de dados demo na org alvo E o total
/// de registros nas duas orgs de clientes reais (La Barberia e Barbearia
/// Default), para provar que nada foi criado nelas. Remover após conferência.
///
/// Contagens via SQL cru: $app.countRecords espera dbx.Expression, não string
/// de filtro — a versão anterior falhava em TODAS as contagens com
/// "could not convert function call parameter 1 ... to dbx.Expression".
///
cronAdd('demo_verificacao_tmp', '*/10 * * * *', () => {
  const LAB = 'qwc9rf8564p8pev'
  const REAL1 = '1p50utwrzq1hv35' // La Barberia (cliente real)
  const REAL2 = 'ozzi2oua5psdyho' // Barbearia Default (cliente real)

  const count = (col, where) => {
    try {
      const rows = new Record(col).all('SELECT COUNT(*) as total FROM ' + col + ' WHERE ' + where)
      return rows.length > 0 ? rows[0].getInt('total') : 0
    } catch (err) {
      console.error('[demo-verif] count(' + col + ') falhou: ' + err)
      return 'ERR ' + err
    }
  }

  console.log('[demo-verif] ===== org Laboratório ' + LAB + ' =====')
  console.log(
    '[demo-verif] clientes demo:',
    count('clients', "organization_id = '" + LAB + "' && surname = '(Demo)'"),
  )
  console.log(
    '[demo-verif] agendamentos futuros demo:',
    count(
      'appointments',
      "organization_id = '" + LAB + "' && client_id.surname = '(Demo)' && date > @now",
    ),
  )
  console.log(
    '[demo-verif] agendamentos Concluído demo:',
    count(
      'appointments',
      "organization_id = '" + LAB + "' && client_id.surname = '(Demo)' && status = 'Concluído'",
    ),
  )
  console.log(
    '[demo-verif] checkouts (LAB):',
    count('checkouts', "organization_id = '" + LAB + "'"),
  )
  console.log(
    '[demo-verif] comissões available (LAB):',
    count('commissions', "organization_id = '" + LAB + "' && status = 'available'"),
  )
  console.log(
    '[demo-verif] comissões paid (LAB):',
    count('commissions', "organization_id = '" + LAB + "' && status = 'paid'"),
  )
  console.log(
    '[demo-verif] fornecedores demo:',
    count('suppliers', "organization_id = '" + LAB + "' && contact_person = '(Demo)'"),
  )
  console.log(
    '[demo-verif] produtos demo:',
    count('products', "organization_id = '" + LAB + "' && name ~ '(Demo)'"),
  )
  console.log(
    '[demo-verif] compras received (LAB):',
    count('inventory_purchases', "organization_id = '" + LAB + "' && status = 'received'"),
  )
  console.log(
    '[demo-verif] compras pending (LAB):',
    count('inventory_purchases', "organization_id = '" + LAB + "' && status = 'pending'"),
  )
  console.log('[demo-verif] fila (LAB):', count('queue_entries', "organization_id = '" + LAB + "'"))

  console.log('[demo-verif] ===== orgs reais (não deve ter demo) =====')
  console.log(
    '[demo-verif] La Barberia ' + REAL1 + ':',
    'clientes=' +
      count('clients', "organization_id = '" + REAL1 + "'") +
      ' agendamentos=' +
      count('appointments', "organization_id = '" + REAL1 + "'") +
      ' checkouts=' +
      count('checkouts', "organization_id = '" + REAL1 + "'") +
      ' comissoes=' +
      count('commissions', "organization_id = '" + REAL1 + "'") +
      ' fornecedores=' +
      count('suppliers', "organization_id = '" + REAL1 + "'") +
      ' produtos=' +
      count('products', "organization_id = '" + REAL1 + "'") +
      ' compras=' +
      count('inventory_purchases', "organization_id = '" + REAL1 + "'") +
      ' fila=' +
      count('queue_entries', "organization_id = '" + REAL1 + "'"),
  )
  console.log(
    '[demo-verif] Barbearia Default ' + REAL2 + ':',
    'clientes=' +
      count('clients', "organization_id = '" + REAL2 + "'") +
      ' agendamentos=' +
      count('appointments', "organization_id = '" + REAL2 + "'") +
      ' checkouts=' +
      count('checkouts', "organization_id = '" + REAL2 + "'") +
      ' comissoes=' +
      count('commissions', "organization_id = '" + REAL2 + "'") +
      ' fornecedores=' +
      count('suppliers', "organization_id = '" + REAL2 + "'") +
      ' produtos=' +
      count('products', "organization_id = '" + REAL2 + "'") +
      ' compras=' +
      count('inventory_purchases', "organization_id = '" + REAL2 + "'") +
      ' fila=' +
      count('queue_entries', "organization_id = '" + REAL2 + "'"),
  )
})
