onRecordAfterCreateSuccess((e) => {
  const stockMovements = $app.findCollectionByNameOrId('stock_movements')
  const movement = new Record(stockMovements)
  movement.set('product_id', e.record.get('product_id'))
  movement.set('type', 'sale')
  movement.set('quantity', -1) // 1 per sale in checkout flow
  movement.set('client_id', e.record.get('client_id'))
  movement.set('barber_id', e.record.get('barber_id'))
  movement.set('description', 'Venda de produto')
  $app.saveNoValidate(movement)
  e.next()
}, 'product_purchases')
