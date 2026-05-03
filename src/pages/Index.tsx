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
  Hourglass,
} from 'lucide-react'
import {
  getAppointments,
  getClients,
  getClientPackages,
  getBarbers,
  getProducts,
  getBusinessHours,
} from '@/services/api'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { format, startOfWeek, startOfMonth, startOfYear, addDays, differenceInDays } from 'date-fns'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronRight } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'

export default function Index() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [barbers, setBarbers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [businessHours, setBusinessHours] = useState<any[]>([])
  const [period, setPeriod] = useState('today')
  const [barberFilter, setBarberFilter] = useState('all')
  const [isPeakModalOpen, setIsPeakModalOpen] = useState(false)
  const [alertModal, setAlertModal] = useState<'risk' | 'packages' | 'stock' | 'tomorrow' | null>(
    null,
  )

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
    setProducts(await getProducts())
    setBusinessHours(await getBusinessHours())
  }

  useEffect(() => {
    loadData()
  }, [period])

  const tomorrowStr = format(addDays(new Date(), 1), 'yyyy-MM-dd')

  const filteredAppointments = useMemo(() => {
    return appointments.filter((a) => barberFilter === 'all' || a.barber_id === barberFilter)
  }, [appointments, barberFilter])

  const validAppointments = filteredAppointments.filter((a) => a.status !== 'Cancelado')
  const completedPeriod = validAppointments.filter(
    (a) => a.status === 'Concluído' || a.status === 'Confirmado',
  )

  const periodRevenue = completedPeriod.reduce(
    (acc, curr) => acc + (curr.price || curr.expand?.service_id?.price || 0),
    0,
  )

  const uniqueClientsPeriod = new Set(completedPeriod.map((a) => a.client_id)).size
  const avgTicket = completedPeriod.length > 0 ? periodRevenue / completedPeriod.length : 0

  const daysInPeriod =
    period === 'today'
      ? 1
      : period === 'week'
        ? 7
        : period === 'month'
          ? 30
          : period === 'year'
            ? 365
            : 30

  const occupancyRate = useMemo(() => {
    let weeklyOpenMinutes = 0
    const activeDays = businessHours.filter((b) => b.is_active)
    if (activeDays.length > 0) {
      activeDays.forEach((b) => {
        const [oH, oM] = (b.open_time || '09:00').split(':').map(Number)
        const [cH, cM] = (b.close_time || '18:00').split(':').map(Number)
        weeklyOpenMinutes += cH * 60 + cM - (oH * 60 + oM)
      })
    } else {
      weeklyOpenMinutes = 5 * 8 * 60
    }
    const avgDailyMinutes = weeklyOpenMinutes / 7
    const filteredBarbers =
      barberFilter === 'all' ? barbers : barbers.filter((b) => b.id === barberFilter)
    const totalAvailableMinutes = avgDailyMinutes * daysInPeriod * filteredBarbers.length

    const totalBookedMinutes = validAppointments.reduce(
      (acc, a) =>
        acc +
        (a.expand?.service_id?.duration_minutes || a.expand?.package_id?.duration_minutes || 30),
      0,
    )
    return totalAvailableMinutes > 0
      ? Math.min((totalBookedMinutes / totalAvailableMinutes) * 100, 100)
      : 0
  }, [businessHours, barbers, barberFilter, daysInPeriod, validAppointments])

  const rankings = barbers
    .map((b) => {
      const bApts = completedPeriod.filter((a) => a.barber_id === b.id)
      const rev = bApts.reduce(
        (acc, curr) => acc + (curr.price || curr.expand?.service_id?.price || 0),
        0,
      )
      return { name: b.name, rev, count: bApts.length }
    })
    .sort((a, b) => b.rev - a.rev)

  const atRiskClientsList = clients.filter(
    (c) =>
      c.is_at_risk || (c.last_visit && differenceInDays(new Date(), new Date(c.last_visit)) > 30),
  )

  const expiringPackagesList = packages.filter(
    (p) =>
      p.expires_at &&
      differenceInDays(new Date(p.expires_at), new Date()) <= 7 &&
      differenceInDays(new Date(p.expires_at), new Date()) >= 0 &&
      p.remaining_uses > 0,
  )

  const aptsTomorrowList = filteredAppointments.filter(
    (a) => a.date && a.date.startsWith(tomorrowStr) && a.status !== 'Cancelado',
  )

  const stockAlertsList = products.filter(
    (p) =>
      (p.stock_quantity ?? 0) <= (p.reorder_point ?? 5) ||
      (p.stock_quantity ?? 0) <= (p.min_stock ?? 2),
  )

  const serviceCounts = validAppointments.reduce(
    (acc, a) => {
      const s = a.expand?.service_id || a.expand?.package_id?.expand?.service_id
      if (!s) return acc
      if (!acc[s.id]) acc[s.id] = { name: s.name, count: 0, rev: 0 }
      acc[s.id].count++
      acc[s.id].rev += a.price || s.price || 0
      return acc
    },
    {} as Record<string, { name: string; count: number; rev: number }>,
  )

  const topServices = Object.values(serviceCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const peakData = useMemo(() => {
    const hours = Array.from({ length: 13 }, (_, i) => i + 8)
    const counts = hours.map((h) => ({ hour: `${h}h`, count: 0 }))
    validAppointments.forEach((a) => {
      if (a.time) {
        const h = parseInt(a.time.split(':')[0], 10)
        const entry = counts.find((c) => c.hour === `${h}h`)
        if (entry) entry.count++
      }
    })
    return counts
  }, [validAppointments])

  const idleReport = useMemo(() => {
    let maxIdleOverall = 0
    let mostIdleBarber = '-'
    const filteredBarbers =
      barberFilter === 'all' ? barbers : barbers.filter((b) => b.id === barberFilter)

    filteredBarbers.forEach((b) => {
      const bApts = validAppointments
        .filter((a) => a.barber_id === b.id && a.time)
        .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
      let maxIdle = 0
      for (let i = 0; i < bApts.length - 1; i++) {
        if (bApts[i].date === bApts[i + 1].date) {
          const end1 = bApts[i].end_time || bApts[i].time
          const start2 = bApts[i + 1].time
          const e1 = new Date(`1970-01-01T${end1}:00Z`).getTime()
          const s2 = new Date(`1970-01-01T${start2}:00Z`).getTime()
          const gap = (s2 - e1) / 60000
          if (gap > maxIdle) maxIdle = gap
        }
      }
      if (maxIdle > maxIdleOverall) {
        maxIdleOverall = maxIdle
        mostIdleBarber = b.name
      }
    })
    return { mostIdleBarber, maxIdleOverall }
  }, [appointments, barbers])

  const periodLabel =
    period === 'today'
      ? 'HOJE'
      : period === 'week'
        ? 'ESTA SEMANA'
        : period === 'month'
          ? 'ESTE MÊS'
          : period === 'year'
            ? 'ESTE ANO'
            : 'SEMPRE'

  return (
    <div className="space-y-6 pb-20 md:pb-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight text-gradient">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Monitoramento e desempenho.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Select value={barberFilter} onValueChange={setBarberFilter}>
            <SelectTrigger className="w-[200px] bg-card">
              <SelectValue placeholder="Todos os Profissionais" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Profissionais</SelectItem>
              {barbers.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      </div>

      <h3 className="text-lg font-semibold -mb-2">{periodLabel}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="bg-glass border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">Faturamento</CardTitle>
            <BadgeDollarSign className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold">R$ {periodRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="bg-glass border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Clientes Atendidos
            </CardTitle>
            <Users className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold">{uniqueClientsPeriod}</div>
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
            <div
              className="flex items-center justify-between gap-3 bg-red-500/10 text-red-500 p-2 rounded-md cursor-pointer hover:bg-red-500/20 transition-colors"
              onClick={() => setAlertModal('risk')}
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="size-5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">
                    {atRiskClientsList.length} clientes em risco
                  </p>
                  <p className="text-xs opacity-80">+30 dias sem visita</p>
                </div>
              </div>
              <ChevronRight className="size-4 opacity-50" />
            </div>
            <div
              className="flex items-center justify-between gap-3 bg-amber-500/10 text-amber-500 p-2 rounded-md cursor-pointer hover:bg-amber-500/20 transition-colors"
              onClick={() => setAlertModal('packages')}
            >
              <div className="flex items-center gap-3">
                <PackageSearch className="size-5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">
                    {expiringPackagesList.length} pacotes vencendo
                  </p>
                  <p className="text-xs opacity-80">Próximos 7 dias</p>
                </div>
              </div>
              <ChevronRight className="size-4 opacity-50" />
            </div>
            {stockAlertsList.length > 0 && (
              <div
                className="flex items-center justify-between gap-3 bg-orange-500/10 text-orange-500 p-2 rounded-md cursor-pointer hover:bg-orange-500/20 transition-colors"
                onClick={() => setAlertModal('stock')}
              >
                <div className="flex items-center gap-3">
                  <PackageSearch className="size-5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">
                      {stockAlertsList.length} produtos em baixa
                    </p>
                    <p className="text-xs opacity-80">Reabastecimento necessário</p>
                  </div>
                </div>
                <ChevronRight className="size-4 opacity-50" />
              </div>
            )}
            <div
              className="flex items-center justify-between gap-3 bg-blue-500/10 text-blue-500 p-2 rounded-md cursor-pointer hover:bg-blue-500/20 transition-colors"
              onClick={() => setAlertModal('tomorrow')}
            >
              <div className="flex items-center gap-3">
                <CalendarDays className="size-5 shrink-0" />
                <div>
                  <p className="font-semibold text-sm">
                    {aptsTomorrowList.length} agendamentos amanhã
                  </p>
                  <p className="text-xs opacity-80">Previsão para o próximo dia</p>
                </div>
              </div>
              <ChevronRight className="size-4 opacity-50" />
            </div>
            <div className="flex items-center gap-3 bg-slate-500/10 text-slate-500 p-2 rounded-md">
              <Hourglass className="size-5 shrink-0" />
              <div>
                <p className="font-semibold text-sm">Maior ociosidade</p>
                <p className="text-xs opacity-80">
                  {idleReport.maxIdleOverall > 0
                    ? `${idleReport.mostIdleBarber} (${Math.floor(idleReport.maxIdleOverall / 60)}h ${idleReport.maxIdleOverall % 60}m)`
                    : 'Nenhuma ociosidade registrada'}
                </p>
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

        <Card className="bg-glass border-none h-full">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground flex justify-between">
              <span>Serviços Populares</span>
              <TrendingUp className="size-4 text-amber-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            {topServices.map((s, i) => (
              <div
                key={s.name}
                className="flex justify-between items-center bg-muted/30 p-2 rounded-md"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="font-bold text-muted-foreground w-4">{i + 1}º</span>
                  <span className="font-medium text-xs truncate">{s.name}</span>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-amber-500">{s.count} serv.</p>
                </div>
              </div>
            ))}
            {topServices.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-2">
                Nenhum serviço no período.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={alertModal === 'risk'} onOpenChange={(open) => !open && setAlertModal(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Clientes em Risco</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[400px] mt-4 pr-4">
            <div className="space-y-4">
              {atRiskClientsList.map((c) => (
                <div key={c.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold text-sm">
                      {c.name} {c.surname}
                    </p>
                    <p className="text-xs text-muted-foreground">{c.phone || 'Sem telefone'}</p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="text-red-500 font-medium">
                      {c.last_visit
                        ? `${differenceInDays(new Date(), new Date(c.last_visit))} dias atrás`
                        : 'Sem visitas'}
                    </p>
                  </div>
                </div>
              ))}
              {atRiskClientsList.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhum cliente em risco.</p>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog
        open={alertModal === 'packages'}
        onOpenChange={(open) => !open && setAlertModal(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Pacotes Vencendo</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[400px] mt-4 pr-4">
            <div className="space-y-4">
              {expiringPackagesList.map((p) => (
                <div key={p.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold text-sm">{p.expand?.client_id?.name}</p>
                    <p className="text-xs text-muted-foreground">{p.expand?.package_id?.name}</p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="text-amber-500 font-medium">Restam {p.remaining_uses} usos</p>
                    <p className="text-muted-foreground">
                      Vence em: {p.expires_at ? format(new Date(p.expires_at), 'dd/MM/yyyy') : '-'}
                    </p>
                  </div>
                </div>
              ))}
              {expiringPackagesList.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhum pacote vencendo.</p>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={alertModal === 'stock'} onOpenChange={(open) => !open && setAlertModal(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Produtos em Baixa</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[400px] mt-4 pr-4">
            <div className="space-y-4">
              {stockAlertsList.map((p) => (
                <div key={p.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Ponto de reposição: {p.reorder_point}
                    </p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="text-orange-500 font-medium">Estoque: {p.stock_quantity}</p>
                  </div>
                </div>
              ))}
              {stockAlertsList.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhum produto em baixa.</p>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog
        open={alertModal === 'tomorrow'}
        onOpenChange={(open) => !open && setAlertModal(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Agendamentos de Amanhã</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[400px] mt-4 pr-4">
            <div className="space-y-4">
              {aptsTomorrowList.map((a) => (
                <div key={a.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-semibold text-sm">{a.expand?.client_id?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {a.expand?.service_id?.name || a.expand?.package_id?.name} com{' '}
                      {a.expand?.barber_id?.name}
                    </p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="text-blue-500 font-medium">
                      {a.time} - {a.end_time || '?'}
                    </p>
                  </div>
                </div>
              ))}
              {aptsTomorrowList.length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhum agendamento para amanhã.</p>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

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
