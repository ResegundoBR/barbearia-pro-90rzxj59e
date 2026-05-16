routerAdd(
  'POST',
  '/backend/v1/commissions/pay',
  (e) => {
    const body = e.requestInfo().body || {}
    const { commissionIds, paymentMethod } = body

    if (!Array.isArray(commissionIds) || commissionIds.length === 0) {
      throw new BadRequestError('Nenhuma comissão selecionada.')
    }

    $app.runInTransaction((txApp) => {
      for (const id of commissionIds) {
        const comm = txApp.findRecordById('commissions', id)
        comm.set('status', 'paid')
        if (paymentMethod) {
          comm.set('payment_method', paymentMethod)
        }
        txApp.save(comm)
      }
    })

    return e.json(200, { success: true })
  },
  $apis.requireAuth(),
)
