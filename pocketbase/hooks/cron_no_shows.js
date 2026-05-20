cronAdd('no_shows_daily', '0 * * * *', () => {
  const now = new Date()
  now.setHours(now.getHours() - 24)
  const cutoffStr = now.toISOString().replace('T', ' ').substring(0, 19)

  // Find appointments that are older than 24 hours and haven't been completed, cancelled, or already marked as absent
  const apts = $app.findRecordsByFilter(
    'appointments',
    `date <= {:cutoff} && status != 'Concluído' && status != 'Cancelado' && status != 'Ausente' && status != 'FALTOU'`,
    '',
    1000,
    0,
    { cutoff: cutoffStr },
  )

  for (const apt of apts) {
    try {
      // Check if we already logged a no-show for this appointment
      $app.findFirstRecordByFilter(
        'client_logs',
        "appointment_id = {:aptId} && event_type = 'no_show'",
        { aptId: apt.id },
      )
      continue // already logged
    } catch (_) {
      // Not found, so we proceed to create
    }

    try {
      $app.expandRecord(apt, ['barber_id'])
      const barberName = apt.expandedOne('barber_id')?.getString('name') || 'Desconhecido'
      const aptDate = apt.getString('date').split(' ')[0] // yyyy-mm-dd

      const parts = aptDate.split('-')
      const dateBr = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : aptDate
      const time = apt.getString('time') || '00:00'

      const logsCol = $app.findCollectionByNameOrId('client_logs')
      const log = new Record(logsCol)
      log.set('client_id', apt.getString('client_id'))
      log.set('appointment_id', apt.id)
      log.set('barber_id', apt.getString('barber_id'))
      log.set('event_type', 'no_show')
      log.set('sentiment', 'negative')
      log.set('details', 'Falta registrada automaticamente pelo sistema (24h limite)')

      $app.save(log)

      // Update the appointment status so we don't query it again
      apt.set('status', 'FALTOU')
      $app.save(apt)
    } catch (err) {
      $app.logger().error('Failed to process no_show log', 'apt_id', apt.id, 'error', err.message)
    }
  }
})
