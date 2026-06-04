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
)
