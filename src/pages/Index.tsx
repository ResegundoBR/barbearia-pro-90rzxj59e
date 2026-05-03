import { useEffect, useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BadgeDollarSign,
  Users,
  TrendingUp,
  Clock,
  CalendarDays,
  AlertTriangle,
  PackageSearch,
} from 'lucide-react'
import {
  getAppointments,
  getClients,
  getClientPackages,
  getBarbers,
  getServices,
} from '@/services/api'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { format, startOfWeek, startOfMonth, startOfYear, addDays, differenceInDays } from 'date-fns'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

export default function Index() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [barbers, setBarbers] = useState<any[]>([])
  const [period, setPeriod] = useState('today')
  const [isPeakModalOpen, setIsPeakModalOpen] = useState(false)

  const loadData = async () => {
    let dateFilter = ''
    const now = new Date()

    if (period === 'today') {
      dateFilter = format(now, 'yyyy-MM-dd')
    } else if (period === 'week') {
      dateFilter = format(startOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd')
    } else if (period === 'month') {
      dateFilter = format(startOfMonth(now), 'yyyy-MM-dd')
    } else if (period === 'year') {
      dateFilter = format(startOfYear(now), 'yyyy-MM-dd')
    }

    const filterStr = dateFilter ? `date >= "${dateFilter} 00:00:00"` : ''
    setAppointments(await getAppointments(filterStr))
    setClients(await getClients())
    setPackages(await getClientPackages())
    setBarbers(await getBarbers())
  }

  useEffect(() => {
    loadData()
  }, [period])

  const todayStr = format(new Date(), 'yyyy-MM-dd')
  const tomorrowStr = format(addDays(new Date(), 1), 'yyyy-MM-dd')

  const aptsToday = appointments.filter((a) => a.date && a.date.startsWith(todayStr))
  const completedToday = aptsToday.filter((a) => a.status === 'Concluído')
  const todayRevenue = completedToday.reduce(
    (acc, curr) => acc + (curr.price || curr.expand?.service_id?.price || 0),
    0,
  )

  const uniqueClientsToday = new Set(completedToday.map((a) => a.client_id)).size
  const avgTicket = uniqueClientsToday > 0 ? todayRevenue / uniqueClientsToday : 0

  const totalMinutesAvailable = barbers.length * 12 * 60
  const totalBookedMinutesToday = aptsToday.length * 30
  const occupancyRate =
    totalMinutesAvailable > 0
      ? Math.min((totalBookedMinutesToday / totalMinutesAvailable) * 100, 100)
      : 0

  const rankings = barbers
    .map((b) => {
      const bApts = appointments.filter((a) => a.barber_id === b.id && a.status === 'Concluído')
      const rev = bApts.reduce(
        (acc, curr) => acc + (curr.price || curr.expand?.service_id?.price || 0),
        0,
      )
      return { name: b.name, rev, count: bApts.length }
    })
    .sort((a, b) => b.rev - a.rev)

  const atRiskClients = clients.filter(
    (c) =>
      c.is_at_risk || (c.last_visit && differenceInDays(new Date(), new Date(c.last_visit)) > 30),
  ).length
  const expiringPackages = packages.filter(
    (p) =>
      p.expires_at &&
      differenceInDays(new Date(p.expires_at), new Date()) <= 7 &&
      differenceInDays(new Date(p.expires_at), new Date()) >= 0,
  ).length
  const aptsTomorrow = appointments.filter((a) => a.date && a.date.startsWith(tomorrowStr)).length

  const serviceCounts = appointments.reduce(
    (acc, a) => {
      const s = a.expand?.service_id
      if (!s) return acc
      if (!acc[s.id]) acc[s.id] = { name: s.name, count: 0, rev: 0 }
      acc[s.id].count++
      acc[s.id].rev += a.price || s.price || 0
      return acc
    },
    {} as Record<string, { name: string; count: number; rev: number }>,
  )

  const topService = Object.values(serviceCounts).sort((a, b) => b.count - a.count)[0]

  const peakData = useMemo(() => {
    const hours = Array.from({ length: 13 }, (_, i) => i + 8)
    const counts = hours.map((h) => ({ hour: `${h}h`, count: 0 }))
    appointments.forEach((a) => {
      if (a.time) {
        const h = parseInt(a.time.split(':')[0], 10)
        const entry = counts.find((c) => c.hour === `${h}h`)
        if (entry) entry.count++
      }
    })
    return counts
  }, [appointments])

  return (
    <div className="space-y-6 pb-20 md:pb-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight text-gradient">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Monitoramento e desempenho.</p>
        </div>
        <Tabs value={period} onValueChange={setPeriod} className="w-full sm:w-auto">
          <TabsList className="bg-card">
            <TabsTrigger value="today">Hoje</TabsTrigger>
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="month">Mês</TabsTrigger>
            <TabsTrigger value="year">Ano</TabsTrigger>
            <TabsTrigger value="all">Sempre</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <h3 className="text-lg font-semibold -mb-2">HOJE</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="bg-glass border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">Faturamento</CardTitle>
            <BadgeDollarSign className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold">R$ {todayRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="bg-glass border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">Clientes</CardTitle>
            <Users className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold">{uniqueClientsToday}</div>
          </CardContent>
        </Card>
        <Card className="bg-glass border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Ticket Médio
            </CardTitle>
            <BadgeDollarSign className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold">R$ {avgTicket.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="bg-glass border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Taxa Ocupação
            </CardTitle>
            <TrendingUp className="size-4 text-primary" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold">{occupancyRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-glass border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
              Alertas Proativos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 bg-red-500/10 text-red-500 p-2 rounded-md">
              <AlertTriangle className="size-5 shrink-0" />
              <div>
                <p className="font-semibold text-sm">{atRiskClients} clientes em risco</p>
                <p className="text-xs opacity-80">+30 dias sem visita</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-amber-500/10 text-amber-500 p-2 rounded-md">
              <PackageSearch className="size-5 shrink-0" />
              <div>
                <p className="font-semibold text-sm">{expiringPackages} pacotes vencendo</p>
                <p className="text-xs opacity-80">Próximos 7 dias</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-blue-500/10 text-blue-500 p-2 rounded-md">
              <CalendarDays className="size-5 shrink-0" />
              <div>
                <p className="font-semibold text-sm">{aptsTomorrow} agendamentos amanhã</p>
                <p className="text-xs opacity-80">Previsão para o próximo dia</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-glass border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
              Ranking de Profissionais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {rankings.map((r, i) => (
              <div
                key={r.name}
                className="flex justify-between items-center bg-muted/30 p-2 rounded-md"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-muted-foreground w-4">{i + 1}º</span>
                  <span className="font-medium text-sm">{r.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">R$ {r.rev.toFixed(2)}</p>
                  <p className="text-[10px] text-muted-foreground">{r.count} serv.</p>
                </div>
              </div>
            ))}
            {rankings.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhum dado no período.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <Card
          className="bg-glass border-none cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setIsPeakModalOpen(true)}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Pico de Movimento
            </CardTitle>
            <Clock className="size-4 text-primary" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-lg font-bold">Ver Gráfico</div>
            <p className="text-xs text-muted-foreground mt-1">Análise de horários</p>
          </CardContent>
        </Card>

        <Card className="bg-glass border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Serviço Top 1
            </CardTitle>
            <TrendingUp className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-lg font-bold truncate">{topService?.name || '-'}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {topService?.count || 0} feitos (R$ {topService?.rev.toFixed(2) || 0})
            </p>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isPeakModalOpen} onOpenChange={setIsPeakModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Pico de Movimento (Agendamentos)</DialogTitle>
          </DialogHeader>
          <div className="h-[300px] w-full mt-4">
            <ChartContainer
              config={{ count: { label: 'Agendamentos', color: 'hsl(var(--primary))' } }}
            >
              <LineChart data={peakData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} width={30} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-count)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
