routerAdd(
  'GET',
  '/backend/v1/users',
  (e) => {
    const auth = e.auth
    if (!auth) throw new UnauthorizedError('Unauthorized')

    const isAdmin =
      auth.getString('access_level') === 'Admin' ||
      auth.getString('access_level') === 'Socio' ||
      auth.getString('email') === 'reginaldo.segundo@planagroup.com.br' ||
      auth.getString('email') === 'alissonmayer7@gmail.com'

    if (!isAdmin) {
      throw new ForbiddenError('Forbidden')
    }

    const orgId = auth.getString('organization_id')
    let filter = `organization_id = '${orgId}'`
    if (
      auth.getString('email') === 'reginaldo.segundo@planagroup.com.br' ||
      auth.getString('email') === 'alissonmayer7@gmail.com'
    ) {
      filter = '1=1'
    }
    const records = $app.findRecordsByFilter('users', filter, '-created', 2000, 0)
    const result = []

    for (const r of records) {
      result.push({
        id: r.id,
        created: r.getString('created'),
        updated: r.getString('updated'),
        name: r.getString('name'),
        surname: r.getString('surname'),
        email: r.getString('email'),
        whatsapp: r.getString('whatsapp'),
        phone: r.getString('phone'),
        address: r.getString('address'),
        access_level: r.getString('access_level'),
        plan: r.getString('plan'),
        specialties: r.getString('specialties'),
      })
    }

    return e.json(200, result)
  },
  $apis.requireAuth(),
)
