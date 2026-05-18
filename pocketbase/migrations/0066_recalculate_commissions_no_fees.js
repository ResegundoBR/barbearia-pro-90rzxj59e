migrate(
  (app) => {
    app.runInTransaction((txApp) => {
      // 1. Recalculate commissions: amount = gross_amount
      const comms = txApp.findRecordsByFilter('commissions', '1=1', '', 100000, 0)
      for (const c of comms) {
        const gross = c.getFloat('gross_amount')
        const fee = c.getFloat('fee_amount')
        let amount = c.getFloat('amount')
        let changed = false

        // Ensure amount matches gross_amount exactly to reflect no fee deduction
        if (gross > 0 && amount !== gross) {
          c.set('amount', gross)
          changed = true
        } else if (gross === 0 && fee > 0) {
          // If gross_amount is 0 but we have fee_amount and amount, infer gross
          c.set('gross_amount', amount + fee)
          c.set('amount', amount + fee)
          changed = true
        }

        if (changed) {
          txApp.save(c)
        }
      }

      // 2. Map colors to barbers
      const barbers = txApp.findRecordsByFilter('barbers', '1=1', '', 10000, 0)
      for (const b of barbers) {
        const name = b.getString('name').toLowerCase()
        let changed = false
        if (name.includes('roberto')) {
          b.set('color', '#F97316') // Orange
          changed = true
        } else if (name.includes('luiz')) {
          b.set('color', '#3B82F6') // Blue
          changed = true
        } else if (name.includes('alisson')) {
          b.set('color', '#A855F7') // Lilac/Purple
          changed = true
        } else if (name.includes('claudete')) {
          b.set('color', '#EC4899') // Pink
          changed = true
        }
        if (changed) txApp.save(b)
      }
    })
  },
  (app) => {
    // Not easily reversible
  },
)
