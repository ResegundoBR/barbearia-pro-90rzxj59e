onRecordCreateRequest(
  (e) => {
    const user = e.auth
    if (!user) return e.next()
    if (user.getString('email') === 'alissonmayer7@gmail.com') return e.next()

    const orgId = user.getString('organization_id')
    if (orgId && !e.record.getString('organization_id')) {
      e.record.set('organization_id', orgId)
    }
    e.next()
  },
  'clients',
  'products',
  'suppliers',
  'barbers',
  'services',
  'appointments',
  'categories',
  'client_packages',
  'commissions',
  'product_purchases',
  'client_logs',
  'checkouts',
  'barber_blocks',
  'inventory_purchases',
  'stock_movements',
)
