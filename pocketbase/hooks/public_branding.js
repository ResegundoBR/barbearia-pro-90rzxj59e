routerAdd('GET', '/backend/v1/public/branding', (e) => {
  let name = 'Barbearia Pro'
  let logo = ''

  try {
    const orgs = $app.findRecordsByFilter('organizations', '1=1', 'created', 1, 0)
    if (orgs.length > 0) {
      name = orgs[0].getString('name')
    }
  } catch (_) {}

  try {
    const setting = $app.findFirstRecordByData('settings', 'key', 'branding')
    const val = setting.get('value')
    if (val && val.name) name = val.name
    if (setting.getString('logo')) {
      logo = `/api/files/settings/${setting.id}/${setting.getString('logo')}`
    }
  } catch (_) {}

  return e.json(200, { name, logo })
})
