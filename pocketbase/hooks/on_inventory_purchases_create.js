onRecordAfterCreateSuccess((e) => {
  const newStatus = e.record.getString('status')

  if (newStatus === 'received') {
    const productId = e.record.getString('product_id')
    const quantity = e.record.getInt('quantity')

    if (productId && quantity > 0) {
      try {
        const product = $app.findRecordById('products', productId)
        const currentStock = product.getInt('stock_quantity')
        product.set('stock_quantity', currentStock + quantity)
        $app.save(product)
      } catch (err) {
        $app
          .logger()
          .error('Failed to update product stock on create', 'error', err, 'product_id', productId)
      }
    }
  }

  e.next()
}, 'inventory_purchases')
