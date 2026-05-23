onRecordCreateRequest(
  (e) => {
    const collection = e.collection.name
    if (collection !== 'clients' && collection !== 'barbers') return e.next()

    const user = e.auth
    if (!user) return e.next()
    if (user.getString('email') === 'alissonmayer7@gmail.com') return e.next()

    const orgId = user.getString('organization_id')
    if (!orgId) return e.next()

    let org
    try {
      org = $app.findRecordById('organizations', orgId)
    } catch (_) {
      return e.next()
    }

    const plan = org.getString('plan') || 'Free'
    const limits = {
      Free: { barbers: 1, clients: 10 },
      Basic: { barbers: 3, clients: -1 },
      Pro: { barbers: 7, clients: -1 },
      Platinum: { barbers: -1, clients: -1 },
    }
    const planLimits = limits[plan]
    if (!planLimits) return e.next()

    const limit = planLimits[collection]
    if (limit !== undefined && limit !== -1) {
      const res = new DynamicModel({ c: 0 })
      $app
        .db()
        .newQuery(`SELECT count(*) as c FROM ${collection} WHERE organization_id = {:org}`)
        .bind({ org: orgId })
        .one(res)
      if (res.c >= limit) {
        throw new BadRequestError(
          `O limite do seu plano (${plan}) para ${collection} foi atingido (${limit}).`,
        )
      }
    }
    e.next()
  },
  'clients',
  'barbers',
)
