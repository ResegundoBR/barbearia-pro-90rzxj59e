onRecordAfterCreateSuccess((e) => {
  const newStatus = e.record.getString('status')
  const productId = e.record.getString('product_id')
  const quantity = e.record.getInt('quantity')
  const unitPrice = e.record.getFloat('unit_price')

  if (productId) {
    try {
      const product = $app.findRecordById('products', productId)
      let needsUpdate = false

      if (newStatus === 'received' && quantity > 0) {
        const currentStock = product.getInt('stock_quantity')
        product.set('stock_quantity', currentStock + quantity)
        needsUpdate = true

        const stockMovements = $app.findCollectionByNameOrId('stock_movements')
        const movement = new Record(stockMovements)
        movement.set('product_id', productId)
        movement.set('type', 'purchase')
        movement.set('quantity', quantity)
        movement.set('description', 'Compra de estoque (Fornecedor)')
        $app.saveNoValidate(movement)
      }

      if (unitPrice > 0 && Math.abs(product.getFloat('cost_price') - unitPrice) > 0.001) {
        product.set('cost_price', unitPrice)
        needsUpdate = true
      }

      if (needsUpdate) {
        $app.save(product)
      }
    } catch (err) {
      $app
        .logger()
        .error('Failed to update product on create', 'error', err, 'product_id', productId)
    }
  }

  e.next()
}, 'inventory_purchases')
