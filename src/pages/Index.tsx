import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BadgeDollarSign,
  Users,
  TrendingUp,
  Activity,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import { PlanGuard } from '@/components/PlanGuard'
import pb from '@/lib/pocketbase/client'

export default function Index() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    pb.send('/backend/v1/dashboard', { method: 'GET' }).then(setData).catch(console.error)
  }, [])

  if (!data) {
    return <div className="p-8 text-center text-muted-foreground">Carregando dashboard...</div>
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Monitoramento diário e desempenho.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">Faturamento</CardTitle>
            <BadgeDollarSign className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-lg md:text-2xl font-bold">R$ {data.daily.faturamento}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">Clientes</CardTitle>
            <Users className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-lg md:text-2xl font-bold">{data.daily.clientesAtendidos}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Ticket Médio
            </CardTitle>
            <TrendingUp className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-lg md:text-2xl font-bold">R$ {data.daily.ticketMedio}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">Ocupação</CardTitle>
            <Activity className="size-4 text-primary" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-lg md:text-2xl font-bold">{data.daily.taxaOcupacao}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Barber Ranking */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
              BARBEIROS (Ranking de Hoje)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.ranking.map((barber: any, i: number) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{barber.medal}</span>
                  <span className="font-medium text-sm">{barber.name}</span>
                </div>
                <div className="text-sm font-semibold text-muted-foreground">
                  R$ {barber.revenue}{' '}
                  <span className="font-normal text-xs">({barber.cuts} cortes)</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
              ALERTAS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  {data.alerts.clientesRisco} clientes em risco (sem voltar)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  {data.alerts.pacotesVencendo} pacotes vencendo esta semana
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CalendarDays className="size-5 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">
                  {data.alerts.agendamentosAmanha} agendamentos para amanhã
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <PlanGuard requiredPlan="Platinum">
        <div className="grid grid-cols-1 gap-6">
          <WeeklyAnalyticsCard weekly={data.weekly} />
          <CommissionsCard commissions={data.commissions} />
        </div>
      </PlanGuard>
    </div>
  )
}

function WeeklyAnalyticsCard({ weekly }: { weekly: any }) {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center justify-between">
          <span>SEMANA: {weekly.period}</span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Faturamento Total</p>
          <p className="font-bold">R$ {weekly.faturamento}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Crescimento</p>
          <p className="font-bold text-emerald-600">+{weekly.crescimento}%</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Clientes Novos</p>
          <p className="font-bold">{weekly.novosClientes}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Taxa de Retorno</p>
          <p className="font-bold">{weekly.taxaRetorno}%</p>
        </div>
        <div className="space-y-1 col-span-2">
          <p className="text-xs text-muted-foreground">Barbeiro Mais Procurado</p>
          <p className="font-bold">{weekly.barbeiroProcurado}</p>
        </div>
        <div className="space-y-1 col-span-2">
          <p className="text-xs text-muted-foreground">Serviço Mais Vendido</p>
          <p className="font-bold">{weekly.servicoVendido}</p>
        </div>
        <div className="space-y-1 col-span-2">
          <p className="text-xs text-muted-foreground">Horário de Pico</p>
          <p className="font-bold">{weekly.pico}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function CommissionsCard({ commissions }: { commissions: any[] }) {
  return (
    <Card>
      <CardHeader className="pb-3 border-b border-border/50">
        <CardTitle className="text-sm uppercase tracking-wider font-bold">
          COMISSÕES - Fevereiro
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        {commissions.map((c: any, i: number) => (
          <div
            key={i}
            className="flex flex-col gap-2 p-3 bg-muted/30 rounded-lg border border-border/50"
          >
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold">{c.name}</span>
              <span className="font-bold text-primary">A Receber: R$ {c.receber}</span>
            </div>
            <div className="grid grid-cols-2 gap-y-1 text-xs text-muted-foreground pt-1">
              <div>
                Cortes: {c.cortes} (R$ {c.cortesTotal})
              </div>
              <div>
                Pacotes: {c.pacotes} (R$ {c.pacotesTotal})
              </div>
              <div>Total Bruto: R$ {c.total}</div>
              <div className="text-destructive">Adiantamentos: -R$ {c.adiantamentos}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
