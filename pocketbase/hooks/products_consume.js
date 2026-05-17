routerAdd(
  'POST',
  '/backend/v1/products/consume',
  (e) => {
    const body = e.requestInfo().body || {}

    if (!body.product_id || !body.barber_id || !body.quantity || body.quantity <= 0) {
      return e.badRequestError('Dados inválidos. Barber, Product e Quantity são obrigatórios.')
    }

    let success = false
    let errorMsg = ''

    $app.runInTransaction((txApp) => {
      try {
        const product = txApp.findRecordById('products', body.product_id)
        const costPrice = product.getFloat('cost_price') || 0

        if (costPrice <= 0) {
          errorMsg = 'Produto não possui preço de custo definido.'
          throw new Error(errorMsg)
        }

        const qty = parseInt(body.quantity, 10)
        const currentStock = product.getInt('stock_quantity') || 0

        if (currentStock < qty) {
          errorMsg = 'Estoque insuficiente.'
          throw new Error(errorMsg)
        }

        product.set('stock_quantity', currentStock - qty)
        txApp.save(product)

        const commissionsCol = txApp.findCollectionByNameOrId('commissions')
        const comm = new Record(commissionsCol)
        comm.set('barber_id', body.barber_id)
        comm.set('amount', -(costPrice * qty))
        comm.set('type', 'consumption')
        comm.set('status', 'pending')
        comm.set('date', new Date().toISOString())

        txApp.save(comm)

        success = true
      } catch (err) {
        errorMsg = err.message
        throw err // trigger rollback
      }
    })

    if (!success) {
      return e.badRequestError(errorMsg || 'Erro ao registrar consumo.')
    }

    return e.json(200, { success: true })
  },
  $apis.requireAuth(),
)
