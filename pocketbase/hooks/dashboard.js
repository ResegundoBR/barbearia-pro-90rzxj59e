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
      commissions: $app.findRecordsByFilter('barbers', '1=1', '', 100, 0).map((b) => {
        const isSocio = b.getString('work_level') === 'socio'
        return {
          name: b.getString('name'),
          work_level: b.getString('work_level'),
          // Para Sócios: recebem valor integral menos taxa (lucro líquido do serviço)
          // Para Autônomos: recebem o percentual de comissão sobre o valor líquido
          nota: isSocio ? 'Repasse Integral (Sócio)' : 'Comissão (Autônomo)',
        }
      }),
    })
  },
  $apis.requireAuth(),
)
