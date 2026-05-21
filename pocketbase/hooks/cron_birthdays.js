// @deps
cronAdd('cron_birthdays', '0 8 * * *', () => {
  const today = new Date()
  const m = String(today.getMonth() + 1).padStart(2, '0')
  const d = String(today.getDate()).padStart(2, '0')
  const mmdd = `${m}-${d}`

  const clients = $app.findRecordsByFilter('clients', "birthday != ''", '', 0, 0)
  const birthdayClients = []

  for (const c of clients) {
    const bday = c.getString('birthday')
    if (bday && bday.length >= 10 && bday.substring(5, 10) === mmdd) {
      birthdayClients.push(c)
    }
  }

  if (birthdayClients.length === 0) return

  const users = $app.findRecordsByFilter('users', "id != ''", '', 0, 0)
  const barbers = $app.findRecordsByFilter('barbers', "user_id != ''", '', 0, 0)

  for (const client of birthdayClients) {
    const clientName = client.getString('name')
    const prefBarberId = client.getString('preferred_barber_id')
    const creatorId = client.getString('created_by_id')

    const recipients = new Set()

    for (const u of users) {
      const access = u.getString('access_level')
      if (access === 'Admin' || access === 'Socio') {
        recipients.add(u.getId())
      }
    }

    for (const b of barbers) {
      if (b.getId() === prefBarberId || b.getId() === creatorId) {
        const uid = b.getString('user_id')
        if (uid) recipients.add(uid)
      }
    }

    for (const uid of recipients) {
      const notif = new Record($app.findCollectionByNameOrId('notifications'))
      notif.set('user_id', uid)
      notif.set('title', 'Aniversário de Cliente!')
      notif.set('message', `Hoje é o aniversário de ${clientName}. Deseje felicidades!`)
      notif.set('type', 'birthday')
      notif.set('is_read', false)
      $app.save(notif)
    }
  }
})
