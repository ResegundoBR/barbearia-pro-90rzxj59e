onRecordAfterCreateSuccess((e) => {
  try {
    const rules = $app.findRecordsByFilter(
      'notification_rules',
      "event_type='new_appointment' && is_active=true",
      '',
      10,
      0,
    )
    if (!rules || rules.length === 0) return e.next()

    const rule = rules[0]
    const recipients = rule.get('recipients') || []
    if (recipients.length === 0) return e.next()

    const users = $app
      .findRecordsByFilter('users', '', '', 100, 0)
      .filter((u) => recipients.includes(u.get('access_level')))

    for (const u of users) {
      const notif = new Record($app.findCollectionByNameOrId('notifications'))
      notif.set('user_id', u.id)
      notif.set('title', 'Novo Agendamento')
      notif.set('message', `Um novo agendamento foi criado.`)
      notif.set('type', 'new_appointment')
      notif.set('is_read', false)
      $app.save(notif)
    }
  } catch (err) {
    $app.logger().error('Error creating notification', 'err', err.message)
  }
  return e.next()
}, 'appointments')

onRecordAfterUpdateSuccess((e) => {
  try {
    const status = e.record.getString('status')
    const originalStatus = e.record.original().getString('status')

    if (status !== originalStatus && (status === 'Cancelado' || status === 'Faltou')) {
      const eventType = status === 'Cancelado' ? 'cancellation' : 'no_show'
      const rules = $app.findRecordsByFilter(
        'notification_rules',
        `event_type='${eventType}' && is_active=true`,
        '',
        10,
        0,
      )
      if (!rules || rules.length === 0) return e.next()

      const rule = rules[0]
      const recipients = rule.get('recipients') || []
      if (recipients.length === 0) return e.next()

      const users = $app
        .findRecordsByFilter('users', '', '', 100, 0)
        .filter((u) => recipients.includes(u.get('access_level')))

      for (const u of users) {
        const notif = new Record($app.findCollectionByNameOrId('notifications'))
        notif.set('user_id', u.id)
        notif.set('title', status === 'Cancelado' ? 'Agendamento Cancelado' : 'Cliente Faltou')
        notif.set('message', `O status de um agendamento mudou para ${status}.`)
        notif.set('type', eventType)
        notif.set('is_read', false)
        $app.save(notif)
      }
    }
  } catch (err) {
    $app.logger().error('Error creating update notification', 'err', err.message)
  }
  return e.next()
}, 'appointments')
