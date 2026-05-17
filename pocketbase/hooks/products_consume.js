routerAdd(
  'POST',
  '/backend/v1/products/consume',
  (e) => {
    const body = e.requestInfo().body || {}
    const productId = body.product_id
    const barberId = body.barber_id
    const quantity = Number(body.quantity) || 1
    const description = body.description || ''

    if (!productId || !barberId) {
      throw new BadRequestError('product_id and barber_id are required')
    }

    let success = false

    $app.runInTransaction((txApp) => {
      // Decrement stock
      const product = txApp.findRecordById('products', productId)
      const currentStock = product.getInt('stock_quantity')
      product.set('stock_quantity', currentStock - quantity)
      txApp.save(product)

      // Create stock movement
      const stockMovements = txApp.findCollectionByNameOrId('stock_movements')
      const movement = new Record(stockMovements)
      movement.set('product_id', productId)
      movement.set('type', 'consumption')
      movement.set('quantity', -quantity)
      movement.set('barber_id', barberId)
      movement.set('description', description)
      txApp.save(movement)

      success = true
    })

    return e.json(200, { success })
  },
  $apis.requireAuth(),
)
