routerAdd('GET', '/backend/v1/public/settings', (e) => {
  try {
    const orgs = $app.findRecordsByFilter('organizations', '1=1', '', 1, 0)
    const orgName = orgs.length > 0 ? orgs[0].getString('name') : 'La Barberiá'

    let logoUrl = null
    try {
      const setting = $app.findFirstRecordByData('settings', 'key', 'general')
      if (setting && setting.getString('logo')) {
        logoUrl = `/api/files/settings/${setting.id}/${setting.getString('logo')}`
      }
    } catch (_) {}

    return e.json(200, { name: orgName, logoUrl })
  } catch (err) {
    return e.json(200, { name: 'La Barberiá', logoUrl: null })
  }
})
