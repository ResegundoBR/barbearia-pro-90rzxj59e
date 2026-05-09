onRecordAfterUpdateSuccess((e) => {
  const record = e.record
  const original = record.original()

  // Extract just the date part (yyyy-mm-dd)
  const oldDate = original.getString('date').split(' ')[0]
  const newDate = record.getString('date').split(' ')[0]
  const oldTime = original.getString('time')
  const newTime = record.getString('time')

  // If date or time changed, it's considered a reschedule
  if ((oldDate !== newDate || oldTime !== newTime) && oldDate && newDate) {
    try {
      $app.expandRecord(record, ['barber_id'])
      const barberName = record.expandedOne('barber_id')?.getString('name') || 'Desconhecido'

      const parts = newDate.split('-')
      const dateBr = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : newDate

      const logsCol = $app.findCollectionByNameOrId('client_logs')
      const log = new Record(logsCol)
      log.set('client_id', record.getString('client_id'))
      log.set('appointment_id', record.id)
      log.set('event_type', 'reschedule')
      log.set(
        'details',
        `Remarcou o agendamento no dia ${dateBr}, horário ${newTime}, barbeiro ${barberName}`,
      )

      $app.save(log)
    } catch (err) {
      $app
        .logger()
        .error('Failed to process reschedule log', 'apt_id', record.id, 'error', err.message)
    }
  }

  e.next()
}, 'appointments')
