migrate(
  (app) => {
    let defaultOrgId = ''
    try {
      const adminUser = app.findAuthRecordByEmail(
        '_pb_users_auth_',
        'reginaldo.segundo@planagroup.com.br',
      )
      defaultOrgId = adminUser.getString('organization_id')
    } catch (_) {}

    if (!defaultOrgId) {
      try {
        const orgs = app.findRecordsByFilter('organizations', '1=1', '', 1, 0)
        if (orgs.length > 0) defaultOrgId = orgs[0].id
      } catch (_) {}
    }

    if (defaultOrgId) {
      // Backfill checkouts
      app
        .db()
        .newQuery(
          `UPDATE checkouts SET organization_id = {:orgId} WHERE organization_id = '' OR organization_id IS NULL`,
        )
        .bind({ orgId: defaultOrgId })
        .execute()

      // Backfill commissions
      app
        .db()
        .newQuery(
          `UPDATE commissions SET organization_id = {:orgId} WHERE organization_id = '' OR organization_id IS NULL`,
        )
        .bind({ orgId: defaultOrgId })
        .execute()

      // Backfill appointments
      app
        .db()
        .newQuery(
          `UPDATE appointments SET organization_id = {:orgId} WHERE organization_id = '' OR organization_id IS NULL`,
        )
        .bind({ orgId: defaultOrgId })
        .execute()

      // Backfill product_purchases
      app
        .db()
        .newQuery(
          `UPDATE product_purchases SET organization_id = {:orgId} WHERE organization_id = '' OR organization_id IS NULL`,
        )
        .bind({ orgId: defaultOrgId })
        .execute()

      // Backfill client_packages
      app
        .db()
        .newQuery(
          `UPDATE client_packages SET organization_id = {:orgId} WHERE organization_id = '' OR organization_id IS NULL`,
        )
        .bind({ orgId: defaultOrgId })
        .execute()

      // Backfill client_logs
      app
        .db()
        .newQuery(
          `UPDATE client_logs SET organization_id = {:orgId} WHERE organization_id = '' OR organization_id IS NULL`,
        )
        .bind({ orgId: defaultOrgId })
        .execute()
    }

    // Commission Replay logic
    try {
      const checkouts = app.findRecordsByFilter('checkouts', '1=1', '', 5000, 0)
      for (let checkout of checkouts) {
        try {
          const comms = app.findRecordsByFilter(
            'commissions',
            `checkout_id = '${checkout.id}'`,
            '',
            1,
            0,
          )
          if (comms.length === 0 && checkout.getFloat('total_amount') > 0) {
            const apts = app.findRecordsByFilter(
              'appointments',
              `date >= '${checkout.getString('date').split(' ')[0]}' && barber_id = '${checkout.getString('barber_id')}' && client_id = '${checkout.getString('client_id')}'`,
              '-created',
              1,
              0,
            )

            if (apts.length > 0) {
              const apt = apts[0]

              const commCol = app.findCollectionByNameOrId('commissions')
              const comm = new Record(commCol)
              comm.set('appointment_id', apt.id)
              comm.set('checkout_id', checkout.id)
              comm.set('barber_id', checkout.getString('barber_id'))

              let amount = checkout.getFloat('total_amount') * 0.5
              let isSocio = false
              try {
                const barber = app.findRecordById('barbers', checkout.getString('barber_id'))
                if (barber.getString('work_level') === 'socio') {
                  amount = checkout.getFloat('total_amount')
                  isSocio = true
                } else {
                  if (barber.getFloat('commission_value') > 0) {
                    amount =
                      checkout.getFloat('total_amount') *
                      (barber.getFloat('commission_value') / 100)
                  }
                }
              } catch (_) {}

              comm.set('amount', amount)
              comm.set('gross_amount', checkout.getFloat('total_amount'))
              comm.set('fee_amount', 0)
              comm.set('type', 'service')
              comm.set('date', checkout.getString('date'))

              let pm = checkout.getString('payment_method') || 'pix'
              if (pm === 'credit_card') pm = 'credito'
              else if (pm === 'debit_card') pm = 'debito'
              comm.set('payment_method', pm)

              comm.set('status', isSocio ? 'paid' : 'pending')
              if (defaultOrgId) comm.set('organization_id', defaultOrgId)

              app.save(comm)
            }
          }
        } catch (_) {}
      }
    } catch (_) {}
  },
  (app) => {
    // down is no-op
  },
)
