onRecordAfterUpdateSuccess((e) => {
  const originalStatus = e.record.original().getString('status')
  const newStatus = e.record.getString('status')

  const productId = e.record.getString('product_id')
  const quantity = e.record.getInt('quantity')

  if (productId && quantity > 0) {
    if (originalStatus !== 'received' && newStatus === 'received') {
      try {
        const product = $app.findRecordById('products', productId)
        const currentStock = product.getInt('stock_quantity')
        product.set('stock_quantity', currentStock + quantity)
        $app.save(product)
      } catch (err) {
        $app
          .logger()
          .error('Failed to increase product stock', 'error', err, 'product_id', productId)
      }
    } else if (originalStatus === 'received' && newStatus === 'pending') {
      try {
        const product = $app.findRecordById('products', productId)
        const currentStock = product.getInt('stock_quantity')
        product.set('stock_quantity', Math.max(0, currentStock - quantity))
        $app.save(product)
      } catch (err) {
        $app
          .logger()
          .error('Failed to decrease product stock', 'error', err, 'product_id', productId)
      }
    }
  }

  e.next()
}, 'inventory_purchases')
