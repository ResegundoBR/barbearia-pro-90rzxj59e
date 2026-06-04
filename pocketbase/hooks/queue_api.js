routerAdd(
  'POST',
  '/backend/v1/queue/estimate',
  (e) => {
    const body = e.requestInfo().body || {}
    const serviceId = body.service_id
    const reqBarberId = body.barber_id
    const orgId = e.auth?.get('organization_id')

    if (!serviceId) return e.badRequestError('service_id is required')

    let duration = 30
    try {
      const service = $app.findRecordById('services', serviceId)
      duration = service.getInt('duration_minutes') || 30
    } catch (err) {
      return e.badRequestError('Serviço inválido')
    }

    let barbers = []
    if (reqBarberId) {
      try {
        barbers.push($app.findRecordById('barbers', reqBarberId))
      } catch (err) {}
    } else {
      barbers = $app.findRecordsByFilter(
        'barbers',
        `organization_id='${orgId}'`,
        '-created',
        100,
        0,
      )
    }

    if (!barbers.length) return e.badRequestError('Nenhum profissional disponível')

    let bestBarber = null
    let bestWaitMinutes = null

    const now = new Date()
    const todayStart = new Date(now)
    todayStart.setUTCHours(0, 0, 0, 0)
    const dateStr = todayStart.toISOString().split('T')[0]

    for (const barber of barbers) {
      let blocks = []

      // 1. Appointments blocks
      const appts = $app.findRecordsByFilter(
        'appointments',
        `barber_id='${barber.id}' && date~'${dateStr}' && status!='cancelado' && status!='concluido' && status!='finalizado'`,
        '+time',
        200,
        0,
      )

      for (const a of appts) {
        const timeStr = a.getString('time')
        const endTimeStr = a.getString('end_time')
        if (!timeStr || !endTimeStr) continue

        const [startH, startM] = timeStr.split(':').map(Number)
        const [endH, endM] = endTimeStr.split(':').map(Number)

        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startH, startM)
        const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endH, endM)

        if (end > now) {
          blocks.push({ start, end })
        }
      }

      // 2. In-progress queue blocks
      const inProgQueue = $app.findRecordsByFilter(
        'queue_entries',
        `barber_id='${barber.id}' && status='in_progress' && joined_at>='${dateStr} 00:00:00.000Z'`,
        '+joined_at',
        50,
        0,
      )

      for (const q of inProgQueue) {
        const startStr = q.getString('updated') || q.getString('joined_at')
        const start = new Date(startStr)

        let svcDur = 30
        const sId = q.getString('service_id')
        if (sId) {
          try {
            const s = $app.findRecordById('services', sId)
            svcDur = s.getInt('duration_minutes') || 30
          } catch (err) {}
        }

        const end = new Date(start.getTime() + svcDur * 60000)
        if (end > now) {
          blocks.push({ start, end })
        }
      }

      // 3. Merge blocks
      blocks.sort((a, b) => a.start.getTime() - b.start.getTime())
      const mergedBlocks = []
      for (const b of blocks) {
        if (mergedBlocks.length === 0) {
          mergedBlocks.push(b)
        } else {
          const last = mergedBlocks[mergedBlocks.length - 1]
          if (b.start <= last.end) {
            if (b.end > last.end) {
              last.end = b.end
            }
          } else {
            mergedBlocks.push(b)
          }
        }
      }

      // 4. Find possible start
      let possibleStart = new Date(now.getTime())
      for (const b of mergedBlocks) {
        const neededEnd = new Date(possibleStart.getTime() + duration * 60000)
        if (b.start >= neededEnd) {
          break
        }
        if (possibleStart < b.end) {
          possibleStart = b.end
        }
      }

      const waitMinutes = Math.max(0, Math.floor((possibleStart.getTime() - now.getTime()) / 60000))

      if (bestWaitMinutes === null || waitMinutes < bestWaitMinutes) {
        bestWaitMinutes = waitMinutes
        bestBarber = barber
      }
    }

    return e.json(200, {
      wait_minutes: bestWaitMinutes || 0,
      barber_id: bestBarber ? bestBarber.id : null,
      duration_minutes: duration,
    })
  },
  $apis.requireAuth(),
)
