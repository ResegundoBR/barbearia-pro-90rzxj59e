migrate(
  (app) => {
    const rulesMap = {
      users: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        update:
          "organization_id = @request.auth.organization_id && (id = @request.auth.id || @request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        delete:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
      },
      barbers: {
        list: "organization_id = @request.auth.organization_id && (user_id = @request.auth.id || @request.auth.access_level != 'Autonomo' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        view: "organization_id = @request.auth.organization_id && (user_id = @request.auth.id || @request.auth.access_level != 'Autonomo' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        create: 'organization_id = @request.auth.organization_id',
        update: 'organization_id = @request.auth.organization_id',
        delete: 'organization_id = @request.auth.organization_id',
      },
      clients: {
        list: "organization_id = @request.auth.organization_id && (@request.auth.access_level != 'Autonomo' || created_by_id.user_id = @request.auth.id || preferred_barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        view: "organization_id = @request.auth.organization_id && (@request.auth.access_level != 'Autonomo' || created_by_id.user_id = @request.auth.id || preferred_barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        create: 'organization_id = @request.auth.organization_id',
        update: 'organization_id = @request.auth.organization_id',
        delete: 'organization_id = @request.auth.organization_id',
      },
      services: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create: 'organization_id = @request.auth.organization_id',
        update: 'organization_id = @request.auth.organization_id',
        delete: 'organization_id = @request.auth.organization_id',
      },
      appointments: {
        list: "organization_id = @request.auth.organization_id && (@request.auth.access_level != 'Autonomo' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        view: "organization_id = @request.auth.organization_id && (@request.auth.access_level != 'Autonomo' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        create: 'organization_id = @request.auth.organization_id',
        update:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level != 'Autonomo' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        delete: 'organization_id = @request.auth.organization_id',
      },
      commissions: {
        list: "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        view: "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        create: 'organization_id = @request.auth.organization_id',
        update: 'organization_id = @request.auth.organization_id',
        delete: 'organization_id = @request.auth.organization_id',
      },
      packages: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        update:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        delete:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
      },
      client_packages: {
        list: "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || barber_id = '' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        view: "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || barber_id = '' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        create: 'organization_id = @request.auth.organization_id',
        update: 'organization_id = @request.auth.organization_id',
        delete: 'organization_id = @request.auth.organization_id',
      },
      products: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create: 'organization_id = @request.auth.organization_id',
        update: 'organization_id = @request.auth.organization_id',
        delete: 'organization_id = @request.auth.organization_id',
      },
      product_purchases: {
        list: "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        view: "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        create: 'organization_id = @request.auth.organization_id',
        update: 'organization_id = @request.auth.organization_id',
        delete: 'organization_id = @request.auth.organization_id',
      },
      commission_rules: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        update:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        delete:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
      },
      business_hours: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        update:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        delete:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
      },
      categories: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create: 'organization_id = @request.auth.organization_id',
        update: 'organization_id = @request.auth.organization_id',
        delete: 'organization_id = @request.auth.organization_id',
      },
      settings: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        update:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        delete:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
      },
      payment_methods: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        update:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        delete:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
      },
      client_logs: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create: 'organization_id = @request.auth.organization_id',
        update: 'organization_id = @request.auth.organization_id',
        delete: 'organization_id = @request.auth.organization_id',
      },
      notifications: {
        list: "organization_id = @request.auth.organization_id && (user_id = @request.auth.id || @request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        view: "organization_id = @request.auth.organization_id && (user_id = @request.auth.id || @request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        create: 'organization_id = @request.auth.organization_id',
        update: 'organization_id = @request.auth.organization_id',
        delete: 'organization_id = @request.auth.organization_id',
      },
      notification_rules: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        update:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        delete:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
      },
      suppliers: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create: 'organization_id = @request.auth.organization_id',
        update: 'organization_id = @request.auth.organization_id',
        delete: 'organization_id = @request.auth.organization_id',
      },
      inventory_purchases: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        update:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        delete:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
      },
      stock_movements: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        update:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        delete:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
      },
      checkouts: {
        list: "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        view: "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        create: null,
        update: null,
        delete: null,
      },
      barber_blocks: {
        list: "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        view: "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        create:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        update:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        delete:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || barber_id.user_id = @request.auth.id || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
      },
      role_permissions: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        update:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
        delete:
          "organization_id = @request.auth.organization_id && (@request.auth.access_level = 'Admin' || @request.auth.access_level = 'Socio' || @request.auth.email = 'alissonmayer7@gmail.com' || @request.auth.email = 'reginaldo.segundo@planagroup.com.br')",
      },
      queue_entries: {
        list: 'organization_id = @request.auth.organization_id',
        view: 'organization_id = @request.auth.organization_id',
        create:
          "organization_id = @request.auth.organization_id && @request.auth.access_level != 'Autonomo'",
        update:
          "organization_id = @request.auth.organization_id && @request.auth.access_level != 'Autonomo'",
        delete:
          "organization_id = @request.auth.organization_id && @request.auth.access_level != 'Autonomo'",
      },
    }

    for (const [name, rules] of Object.entries(rulesMap)) {
      try {
        const col = app.findCollectionByNameOrId(name)
        col.listRule = rules.list
        col.viewRule = rules.view
        col.createRule = rules.create
        col.updateRule = rules.update
        col.deleteRule = rules.delete
        app.save(col)
      } catch (e) {
        console.log('Failed to update collection:', name, e.message)
      }
    }
  },
  (app) => {},
)
