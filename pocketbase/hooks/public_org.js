routerAdd('GET', '/backend/v1/public-org', (e) => {
  try {
    const orgs = $app.findRecordsByFilter('organizations', '1=1', 'created', 1, 0)
    if (orgs.length > 0) {
      return e.json(200, { name: orgs[0].getString('name') })
    }
  } catch (_) {}

  return e.json(200, { name: 'La Barberiá' })
})
