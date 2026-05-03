import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BadgeDollarSign, CalendarCheck, PackageX, TrendingUp } from 'lucide-react'
import useMainStore from '@/stores/main'
import { useMemo } from 'react'

export function KpiCards() {
  const { state } = useMainStore()

  const metrics = useMemo(() => {
    const today = '2026-05-03'
    const todaysApts = state.appointments.filter((a) => a.date === today)
    const confirmed = todaysApts.filter(
      (a) => a.status === 'Confirmado' || a.status === 'Concluído',
    )
    const completed = todaysApts.filter((a) => a.status === 'Concluído')

    const revenue = completed.reduce((sum, apt) => sum + apt.price, 0)
    const avgTicket = completed.length > 0 ? revenue / completed.length : 0
    const lowStock = state.products.filter((p) => p.stock <= p.minStock).length

    return { revenue, confirmed: confirmed.length, avgTicket, lowStock }
  }, [state.appointments, state.products])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:-translate-y-1 transition-transform duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Faturamento Hoje
          </CardTitle>
          <BadgeDollarSign className="size-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ {metrics.revenue.toFixed(2)}</div>
          <p className="text-xs text-emerald-500 mt-1">+12% vs ontem</p>
        </CardContent>
      </Card>

      <Card className="hover:-translate-y-1 transition-transform duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Agendamentos</CardTitle>
          <CalendarCheck className="size-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.confirmed}{' '}
            <span className="text-base font-normal text-muted-foreground">confirmados</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">2 pendentes</p>
        </CardContent>
      </Card>

      <Card className="hover:-translate-y-1 transition-transform duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Ticket Médio</CardTitle>
          <TrendingUp className="size-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ {metrics.avgTicket.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">Geral mensal: R$ 58.50</p>
        </CardContent>
      </Card>

      <Card className="hover:-translate-y-1 transition-transform duration-200 border-destructive/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Alertas de Estoque
          </CardTitle>
          <PackageX className="size-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            {metrics.lowStock}{' '}
            <span className="text-base font-normal text-muted-foreground">itens</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Abaixo do ponto de pedido</p>
        </CardContent>
      </Card>
    </div>
  )
}
