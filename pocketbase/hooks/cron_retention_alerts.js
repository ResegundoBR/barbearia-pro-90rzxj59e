cronAdd('retention_alerts_daily', '0 8 * * *', () => {
  const clients = $app.findRecordsByFilter('clients', 'is_active = true', '', 10000, 0)
  const now = new Date()

  for (const client of clients) {
    try {
      const futureApts = $app.findRecordsByFilter(
        'appointments',
        `client_id = {:clientId} && status != 'Concluído' && status != 'Cancelado' && date >= {:now}`,
        '',
        1,
        0,
        { clientId: client.id, now: now.toISOString().replace('T', ' ').substring(0, 19) },
      )
      if (futureApts.length > 0) continue

      const lastApts = $app.findRecordsByFilter(
        'appointments',
        `client_id = {:clientId} && status = 'Concluído'`,
        '-date',
        1,
        0,
        { clientId: client.id },
      )
      if (lastApts.length === 0) continue

      const lastApt = lastApts[0]
      $app.expandRecord(lastApt, ['service_id', 'barber_id'])

      const service = lastApt.expandedOne('service_id')
      if (!service) continue

      const serviceName = (service.getString('name') || '').toLowerCase()

      let type = 'other'
      if (
        (serviceName.includes('cabelo') || serviceName.includes('corte')) &&
        serviceName.includes('barba')
      ) {
        type = 'hair_beard'
      } else if (serviceName.includes('cabelo') || serviceName.includes('corte')) {
        type = 'hair'
      } else if (serviceName.includes('barba')) {
        type = 'beard'
      }

      const lastDateStr = lastApt.getString('date')
      const lastDate = new Date(lastDateStr.replace(' ', 'T') + 'Z')
      const diffDays = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

      let shouldAlert = false
      if (type === 'beard' && diffDays >= 20) shouldAlert = true
      if (type === 'hair' && diffDays >= 35) shouldAlert = true
      if (type === 'hair_beard' && diffDays >= 30) shouldAlert = true

      if (!shouldAlert) continue

      const recentNotifs = $app.findRecordsByFilter(
        'notifications',
        `title ~ 'Retenção' && message ~ {:clientId} && created >= {:weekAgo}`,
        '',
        1,
        0,
        {
          clientId: client.id,
          weekAgo: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      )
      if (recentNotifs.length > 0) continue

      const barberId = lastApt.getString('barber_id')
      const clientName = client.getString('name')
      const notifCol = $app.findCollectionByNameOrId('notifications')

      const admins = $app.findRecordsByFilter('users', "access_level = 'Admin'", '', 10, 0)
      for (const admin of admins) {
        const n = new Record(notifCol)
        n.set('user_id', admin.id)
        n.set('title', 'Alerta de Retenção')
        n.set(
          'message',
          `O cliente ${clientName} não retorna há ${diffDays} dias (Último serviço: ${serviceName}). [ID: ${client.id}]`,
        )
        n.set('is_read', false)
        $app.save(n)
      }

      if (barberId) {
        try {
          const barber = lastApt.expandedOne('barber_id')
          if (barber) {
            const barberUsers = $app.findRecordsByFilter('users', `name = {:bName}`, '', 1, 0, {
              bName: barber.getString('name'),
            })
            if (barberUsers.length > 0 && barberUsers[0].getString('access_level') !== 'Admin') {
              const n = new Record(notifCol)
              n.set('user_id', barberUsers[0].id)
              n.set('title', 'Alerta de Retenção (Seu Cliente)')
              n.set(
                'message',
                `O cliente ${clientName} não retorna há ${diffDays} dias (Último serviço: ${serviceName}). [ID: ${client.id}]`,
              )
              n.set('is_read', false)
              $app.save(n)
            }
          }
        } catch (_) {}
      }
    } catch (err) {
      $app.logger().error('Failed retention check', 'client_id', client.id, 'error', err.message)
    }
  }
})
