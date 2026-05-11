routerAdd(
  'GET',
  '/backend/v1/users',
  (e) => {
    const auth = e.auth
    if (!auth) throw new UnauthorizedError('Unauthorized')

    const isAdmin =
      auth.getString('access_level') === 'Admin' ||
      auth.getString('email') === 'reginaldo.segundo@planagroup.com.br'

    if (!isAdmin) {
      throw new ForbiddenError('Forbidden')
    }

    const records = $app.findRecordsByFilter('users', '1=1', '-created', 2000, 0)
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
