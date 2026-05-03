routerAdd(
  'GET',
  '/backend/v1/dashboard',
  (e) => {
    return e.json(200, {
      daily: {
        faturamento: '1.850',
        clientesAtendidos: 12,
        ticketMedio: 154,
        taxaOcupacao: 87,
      },
      ranking: [
        { name: 'João', revenue: 520, cuts: 5, medal: '🥇' },
        { name: 'Carlos', revenue: 480, cuts: 4, medal: '🥈' },
        { name: 'Pedro', revenue: 350, cuts: 3, medal: '🥉' },
      ],
      alerts: {
        clientesRisco: 2,
        pacotesVencendo: 3,
        agendamentosAmanha: 5,
      },
      weekly: {
        period: '3-9 de Fevereiro',
        faturamento: '12.450',
        crescimento: 8,
        novosClientes: 7,
        taxaRetorno: 68,
        barbeiroProcurado: 'João (32%)',
        servicoVendido: 'Corte + Barba',
        pico: '14h-17h',
      },
      commissions: [
        {
          name: 'João',
          cortes: 45,
          cortesTotal: '1.125',
          pacotes: 3,
          pacotesTotal: 150,
          adiantamentos: 500,
          receber: 775,
          total: '1.275',
        },
        {
          name: 'Carlos',
          cortes: 38,
          cortesTotal: 950,
          pacotes: 2,
          pacotesTotal: 100,
          adiantamentos: 300,
          receber: 750,
          total: '1.050',
        },
      ],
    })
  },
  $apis.requireAuth(),
)
