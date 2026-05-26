routerAdd(
  'GET',
  '/backend/v1/dashboard',
  (e) => {
    const period = e.request.url.query().get('period') || 'semana'
    const orgId = e.auth?.get('organization_id')

    if (!orgId) {
      return e.badRequestError('Organização não encontrada.')
    }

    const now = new Date()
    let startDate = new Date()
    let endDate = new Date()

    if (period === 'hoje') {
      startDate.setHours(0, 0, 0, 0)
      endDate.setHours(23, 59, 59, 999)
    } else if (period === 'semana') {
      const day = now.getDay()
      const diff = now.getDate() - day
      startDate.setDate(diff)
      startDate.setHours(0, 0, 0, 0)
      endDate.setDate(diff + 6)
      endDate.setHours(23, 59, 59, 999)
    } else if (period === 'mes') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
    } else if (period === 'ano') {
      startDate = new Date(now.getFullYear(), 0, 1)
      endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)
    }

    // Format to PocketBase date string format (UTC)
    const startStr = startDate.toISOString().replace('T', ' ')
    const endStr = endDate.toISOString().replace('T', ' ')

    // 1. Fetch valid appointments
    const appointments = $app.findRecordsByFilter(
      'appointments',
      `organization_id = {:orgId} && date >= {:start} && date <= {:end}`,
      '-date',
      10000,
      0,
      { orgId, start: startStr, end: endStr },
    )

    let totalRevenue = 0
    let completedDurationMinutes = 0
    let validAppointmentsCount = 0

    for (const appt of appointments) {
      const st = (appt.get('status') || '').toLowerCase()
      // Ignore canceled or no-show appointments
      if (st.includes('cancel') || st.includes('no_show') || st.includes('falta')) {
        continue
      }

      validAppointmentsCount++
      totalRevenue += appt.get('price') || 0

      try {
        const srvId = appt.get('service_id')
        if (srvId) {
          const srv = $app.findRecordById('services', srvId)
          completedDurationMinutes += srv.get('duration_minutes') || 0
        }
      } catch (_) {
        // Service not found or deleted, ignore duration
      }
    }

    // 2. Fetch Fixed Barbers
    const barbers = $app.findRecordsByFilter(
      'barbers',
      `organization_id = {:orgId} && work_regime = 'fixed'`,
      '',
      1000,
      0,
      { orgId },
    )

    const fixedBarbersCount = barbers.length

    // 3. Fetch Business Hours to calculate total active weekly capacity
    const businessHours = $app.findRecordsByFilter('business_hours', `is_active = true`, '', 100, 0)

    let todayCapacityMinutes = 0
    let weeklyCapacityMinutes = 0
    const currentDayOfWeek = String(now.getDay())

    for (const bh of businessHours) {
      const open = bh.get('open_time') || '09:00'
      const close = bh.get('close_time') || '18:00'

      const [oH, oM] = open.split(':').map(Number)
      const [cH, cM] = close.split(':').map(Number)

      const duration = cH * 60 + (cM || 0) - (oH * 60 + (oM || 0))
      if (duration > 0) {
        weeklyCapacityMinutes += duration
        // Also grab today's specific capacity for the 'hoje' filter
        if (bh.get('day_of_week') === currentDayOfWeek) {
          todayCapacityMinutes = duration
        }
      }
    }

    // Calculate Total Capacity depending on the requested period
    let totalCapacityMinutes = 0

    if (period === 'hoje') {
      totalCapacityMinutes = todayCapacityMinutes * fixedBarbersCount
    } else if (period === 'semana') {
      totalCapacityMinutes = weeklyCapacityMinutes * fixedBarbersCount
    } else if (period === 'mes') {
      // Approx 4 weeks per month for standardized capacity
      totalCapacityMinutes = weeklyCapacityMinutes * 4 * fixedBarbersCount
    } else if (period === 'ano') {
      // 52 weeks per year
      totalCapacityMinutes = weeklyCapacityMinutes * 52 * fixedBarbersCount
    }

    // 4. Final Efficiency Metrics
    const occupiedHours = completedDurationMinutes / 60
    const capacityHours = totalCapacityMinutes / 60
    const idleHours = Math.max(0, capacityHours - occupiedHours)
    const efficiencyPercentage = capacityHours > 0 ? (occupiedHours / capacityHours) * 100 : 0

    return e.json(200, {
      period,
      revenue: totalRevenue,
      appointmentsCount: validAppointmentsCount,
      efficiency: {
        capacityHours: parseFloat(capacityHours.toFixed(1)),
        occupiedHours: parseFloat(occupiedHours.toFixed(1)),
        idleHours: parseFloat(idleHours.toFixed(1)),
        percentage: parseFloat(efficiencyPercentage.toFixed(1)),
      },
    })
  },
  $apis.requireAuth(),
)
