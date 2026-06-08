onRecordCreateRequest(
  (e) => {
    if (e.auth) {
      const orgId = e.auth.getString('organization_id')
      if (orgId && !e.record.getString('organization_id')) {
        e.record.set('organization_id', orgId)
      }
    }
    e.next()
  },
  'clients',
  'appointments',
  'barbers',
  'services',
  'products',
  'categories',
  'suppliers',
  'role_permissions',
  'users',
  'packages',
  'client_packages',
  'commission_rules',
  'business_hours',
  'payment_methods',
  'client_logs',
  'notifications',
  'notification_rules',
  'inventory_purchases',
  'stock_movements',
  'checkouts',
  'barber_blocks',
  'product_purchases',
  'commissions',
  'queue_entries',
  'settings',
)
