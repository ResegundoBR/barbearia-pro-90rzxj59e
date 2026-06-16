migrate(
  (app) => {
    // 1. Find all checkout records for Alisson that don't have corresponding commissions
    const checkouts = app.findRecordsByFilter('checkouts', '1=1', '', 10000, 0)

    app.runInTransaction((txApp) => {
      for (const checkout of checkouts) {
        const barberId = checkout.getString('barber_id')
        if (!barberId) continue

        let barber = null
        try {
          barber = txApp.findRecordById('barbers', barberId)
        } catch (err) {
          continue
        }

        if (!barber.getString('name').toLowerCase().includes('alisson')) {
          continue
        }

        // Check if commission for this checkout already exists
        let commExists = false
        try {
          txApp.findFirstRecordByData('commissions', 'checkout_id', checkout.id)
          commExists = true
        } catch (err) {}

        if (!commExists) {
          const items = checkout.get('items_snapshot') || []

          for (const item of items) {
            // Double check if item has specific commission
            let itemCommExists = false
            if (item.type === 'service' && item.appointment_id) {
              try {
                txApp.findFirstRecordByData('commissions', 'appointment_id', item.appointment_id)
                itemCommExists = true
              } catch (e) {}
            } else if (item.type === 'product' && item.product_purchase_id) {
              try {
                txApp.findFirstRecordByData(
                  'commissions',
                  'product_purchase_id',
                  item.product_purchase_id,
                )
                itemCommExists = true
              } catch (e) {}
            } else if (
              (item.type === 'package_sale' || item.type === 'package') &&
              item.client_package_id
            ) {
              try {
                txApp.findFirstRecordByData(
                  'commissions',
                  'client_package_id',
                  item.client_package_id,
                )
                itemCommExists = true
              } catch (e) {}
            }

            if (!itemCommExists) {
              const comm = new Record(txApp.findCollectionByNameOrId('commissions'))
              comm.set('barber_id', barberId)
              comm.set('type', item.type === 'package' ? 'package_sale' : item.type || 'service')

              // For Socio (Alisson), amount = gross_amount
              const price = Number(item.price || 0)
              comm.set('amount', price)
              comm.set('gross_amount', price)
              comm.set('fee_amount', 0)

              comm.set('date', checkout.getString('date') || checkout.getString('created'))
              comm.set('payment_method', checkout.getString('payment_method') || 'pix')
              comm.set('status', 'paid')

              comm.set(
                'organization_id',
                checkout.getString('organization_id') || barber.getString('organization_id'),
              )
              comm.set('checkout_id', checkout.id)

              if (item.type === 'service' && item.appointment_id)
                comm.set('appointment_id', item.appointment_id)
              if (item.type === 'product' && item.product_purchase_id)
                comm.set('product_purchase_id', item.product_purchase_id)
              if (
                (item.type === 'package_sale' || item.type === 'package') &&
                item.client_package_id
              )
                comm.set('client_package_id', item.client_package_id)

              txApp.save(comm)
            }
          }

          // If checkout had no parseable items, but we need to create a comm anyway
          if (items.length === 0) {
            const comm = new Record(txApp.findCollectionByNameOrId('commissions'))
            comm.set('barber_id', barberId)
            comm.set('type', 'service') // default

            const price = checkout.getFloat('total_amount')
            comm.set('amount', price)
            comm.set('gross_amount', price)
            comm.set('fee_amount', 0)

            comm.set('date', checkout.getString('date') || checkout.getString('created'))
            comm.set('payment_method', checkout.getString('payment_method') || 'pix')
            comm.set('status', 'paid')

            comm.set(
              'organization_id',
              checkout.getString('organization_id') || barber.getString('organization_id'),
            )
            comm.set('checkout_id', checkout.id)
            txApp.save(comm)
          }
        }
      }

      // Check missing standalone appointments too (maybe no checkout)
      const barbersList = txApp.findRecordsByFilter('barbers', '1=1', '', 1000, 0)
      const alissonBarbers = barbersList.filter((b) =>
        b.getString('name').toLowerCase().includes('alisson'),
      )
      for (const b of alissonBarbers) {
        const apts = txApp.findRecordsByFilter(
          'appointments',
          `barber_id = '${b.id}' && status = 'Concluído'`,
          '',
          10000,
          0,
        )
        for (const apt of apts) {
          let commExists = false
          try {
            txApp.findFirstRecordByData('commissions', 'appointment_id', apt.id)
            commExists = true
          } catch (e) {}

          if (!commExists) {
            let price = apt.getFloat('price')
            if (price === 0 && !apt.getString('client_package_id')) {
              try {
                const srv = txApp.findRecordById('services', apt.getString('service_id'))
                price = srv.getFloat('price')
              } catch (e) {}
            }
            if (price > 0 || !apt.getString('client_package_id')) {
              const comm = new Record(txApp.findCollectionByNameOrId('commissions'))
              comm.set('barber_id', b.id)
              comm.set('type', 'service')
              comm.set('amount', price)
              comm.set('gross_amount', price)
              comm.set('fee_amount', 0)
              comm.set('date', apt.getString('date') || apt.getString('created'))
              comm.set('payment_method', 'pix')
              comm.set('status', 'paid')
              comm.set(
                'organization_id',
                apt.getString('organization_id') || b.getString('organization_id'),
              )
              comm.set('appointment_id', apt.id)
              txApp.save(comm)
            }
          }
        }
      }
    })
  },
  (app) => {},
)
