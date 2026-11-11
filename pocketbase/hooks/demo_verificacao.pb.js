///
/// Hook TEMPORÁRIO de diagnóstico: registra a contagem de linhas demo.
/// Usado para verificar as migrações 0112–0116 (dados demo na org ozzi2oua5psdyho).
/// Removê-lo após a verificação.
///
cronAdd('demo_verificacao_tmp', '*/2 * * * *', () => {
  const org = 'ozzi2oua5psdyho'
  const count = (col, filter) => {
    try {
      return $app.countRecords(col, filter)
    } catch (err) {
      return 'ERR ' + err
    }
  }
  console.log(
    '[demo-verificacao] clientes (Demo):',
    count('clients', "organization_id = '" + org + "' && surname = '(Demo)'"),
  )
  console.log(
    '[demo-verificacao] agendamentos futuros (demo):',
    count(
      'appointments',
      "organization_id = '" + org + "' && client_id.surname = '(Demo)' && date > @now",
    ),
  )
  console.log(
    '[demo-verificacao] agendamentos Concluídos (demo):',
    count(
      'appointments',
      "organization_id = '" + org + "' && client_id.surname = '(Demo)' && status = 'Concluído'",
    ),
  )
  console.log(
    '[demo-verificacao] checkouts (org):',
    count('checkouts', "organization_id = '" + org + "'"),
  )
  console.log(
    '[demo-verificacao] comissões (org):',
    count('commissions', "organization_id = '" + org + "'"),
  )
  console.log(
    '[demo-verificacao] fornecedores (Demo):',
    count('suppliers', "organization_id = '" + org + "' && contact_person = '(Demo)'"),
  )
  console.log(
    '[demo-verificacao] produtos (Demo):',
    count('products', "organization_id = '" + org + "' && name ~ '(Demo)'"),
  )
  console.log(
    '[demo-verificacao] compras (org):',
    count('inventory_purchases', "organization_id = '" + org + "'"),
  )
  console.log(
    '[demo-verificacao] fila (org):',
    count('queue_entries', "organization_id = '" + org + "'"),
  )
})
