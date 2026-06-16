migrate(
  (app) => {
    const queries = [
      `UPDATE commissions 
     SET organization_id = (SELECT organization_id FROM appointments WHERE appointments.id = commissions.appointment_id) 
     WHERE (organization_id = '' OR organization_id IS NULL) 
     AND appointment_id != '' 
     AND EXISTS (SELECT 1 FROM appointments WHERE appointments.id = commissions.appointment_id AND appointments.organization_id != '')`,

      `UPDATE commissions 
     SET organization_id = (SELECT organization_id FROM checkouts WHERE checkouts.id = commissions.checkout_id) 
     WHERE (organization_id = '' OR organization_id IS NULL) 
     AND checkout_id != '' 
     AND EXISTS (SELECT 1 FROM checkouts WHERE checkouts.id = commissions.checkout_id AND checkouts.organization_id != '')`,

      `UPDATE commissions 
     SET organization_id = (SELECT organization_id FROM product_purchases WHERE product_purchases.id = commissions.product_purchase_id) 
     WHERE (organization_id = '' OR organization_id IS NULL) 
     AND product_purchase_id != '' 
     AND EXISTS (SELECT 1 FROM product_purchases WHERE product_purchases.id = commissions.product_purchase_id AND product_purchases.organization_id != '')`,

      `UPDATE commissions 
     SET organization_id = (SELECT organization_id FROM client_packages WHERE client_packages.id = commissions.client_package_id) 
     WHERE (organization_id = '' OR organization_id IS NULL) 
     AND client_package_id != '' 
     AND EXISTS (SELECT 1 FROM client_packages WHERE client_packages.id = commissions.client_package_id AND client_packages.organization_id != '')`,

      `UPDATE commissions 
     SET organization_id = (SELECT organization_id FROM barbers WHERE barbers.id = commissions.barber_id) 
     WHERE (organization_id = '' OR organization_id IS NULL) 
     AND barber_id != '' 
     AND EXISTS (SELECT 1 FROM barbers WHERE barbers.id = commissions.barber_id AND barbers.organization_id != '')`,
    ]

    for (const q of queries) {
      app.db().newQuery(q).execute()
    }
  },
  (app) => {
    // Cannot automatically rollback safely since there may be commissions
    // that were created with an organization_id legitimately and we do not
    // want to mistakenly clear them.
  },
)
