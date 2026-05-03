import { useEffect, useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  BadgeDollarSign,
  Users,
  Clock,
  CalendarDays,
  AlertTriangle,
  PackageSearch,
  ChevronRight,
} from 'lucide-react'
import {
  getAppointments,
  getClients,
  getClientPackages,
  getBarbers,
  getProducts,
  getBusinessHours,
  getCommissions,
  createCommission,
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'
import { useAuth } from '@/hooks/use-auth'
import { FinancialView } from '@/components/dashboard/FinancialView'
import { PackagesView } from '@/components/dashboard/PackagesView'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function Index() {
  const { user } = useAuth()
  const isAdmin =
    user?.access_level === 'Admin' || user?.email === 'reginaldo.segundo@planagroup.com.br'

  const [appointments, setAppointments] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [barbers, setBarbers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [commissions, setCommissions] = useState<any[]>([])

  const [period, setPeriod] = useState('today')
  const [barberFilter, setBarberFilter] = useState('all')
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'packages'>('overview')

  const [isPeakModalOpen, setIsPeakModalOpen] = useState(false)
  const [alertModal, setAlertModal] = useState<'risk' | 'packages' | 'stock' | 'tomorrow' | null>(
    null,
  )

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false)
  const [advanceBarber, setAdvanceBarber] = useState('')
  const [advanceAmount, setAdvanceAmount] = useState('')

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
    const createdFilterStr = dateFilter ? `created >= "${dateFilter} 00:00:00"` : ''

    setAppointments(await getAppointments(filterStr))
    setClients(await getClients())
    setPackages(await getClientPackages())
    setBarbers(await getBarbers())
    setProducts(await getProducts())
    setCommissions(await getCommissions(filterStr || createdFilterStr))
  }

  useEffect(() => {
    loadData()
  }, [period])

  const loggedInBarber = barbers.find((b) => b.name === user?.name)
  const effectiveBarberFilter = isAdmin ? barberFilter : loggedInBarber?.id || 'all'

  const filteredAppointments = useMemo(() => {
    return appointments.filter(
      (a) => effectiveBarberFilter === 'all' || a.barber_id === effectiveBarberFilter,
    )
  }, [appointments, effectiveBarberFilter])

  const filteredCommissions = useMemo(() => {
    return commissions.filter(
      (c) => effectiveBarberFilter === 'all' || c.barber_id === effectiveBarberFilter,
    )
  }, [commissions, effectiveBarberFilter])

  const filteredPackages = useMemo(() => {
    return packages.filter(
      (p) => effectiveBarberFilter === 'all' || p.barber_id === effectiveBarberFilter,
    )
  }, [packages, effectiveBarberFilter])

  const handleCreateAdvance = async () => {
    if (!advanceBarber || !advanceAmount) return
    await createCommission({
      barber_id: advanceBarber,
      amount: parseFloat(advanceAmount),
      type: 'advance',
      is_advance: true,
      payment_method: 'cash',
      status: 'paid',
      date: format(new Date(), 'yyyy-MM-dd 12:00:00'),
    })
    setAdvanceModalOpen(false)
    setAdvanceBarber('')
    setAdvanceAmount('')
    loadData()
  }

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
  const tomorrowStr = format(addDays(new Date(), 1), 'yyyy-MM-dd')

  const atRiskClientsList = clients.filter(
    (c) =>
      c.is_at_risk || (c.last_visit && differenceInDays(new Date(), new Date(c.last_visit)) > 30),
  )
  const expiringPackagesList = packages.filter(
    (p) =>
      p.expires_at &&
      differenceInDays(new Date(p.expires_at), new Date()) <= 7 &&
      p.remaining_uses > 0,
  )
  const aptsTomorrowList = filteredAppointments.filter(
    (a) => a.date && a.date.startsWith(tomorrowStr) && a.status !== 'Cancelado',
  )
  const stockAlertsList = products.filter((p) => (p.stock_quantity ?? 0) <= (p.reorder_point ?? 5))

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

  return (
    <div className="space-y-6 pb-20 md:pb-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight text-gradient">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Monitoramento e desempenho.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {isAdmin && (
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
          )}
          <Tabs value={period} onValueChange={setPeriod} className="w-full sm:w-auto">
            <TabsList className="bg-card">
              <TabsTrigger value="today">Hoje</TabsTrigger>
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="month">Mês</TabsTrigger>
              <TabsTrigger value="year">Ano</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="border-b border-border mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab as any} className="w-full">
          <TabsList className="bg-transparent w-full justify-start rounded-none px-0 h-auto gap-4">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-2 py-2"
            >
              Visão Geral
            </TabsTrigger>
            <TabsTrigger
              value="financial"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-2 py-2"
            >
              Financeiro
            </TabsTrigger>
            <TabsTrigger
              value="packages"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-2 py-2"
            >
              Pacotes Ativos
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Card className="bg-glass border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Faturamento
                </CardTitle>
                <BadgeDollarSign className="size-4 text-emerald-500" />
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">R$ {periodRevenue.toFixed(2)}</div>
              </CardContent>
            </Card>
            <Card className="bg-glass border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Clientes
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
            <Card
              className="bg-glass border-none cursor-pointer hover:bg-muted/50"
              onClick={() => setIsPeakModalOpen(true)}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  Horários de Pico
                </CardTitle>
                <Clock className="size-4 text-primary" />
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">Ver Gráfico</div>
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
                  className="flex items-center justify-between gap-3 bg-red-500/10 text-red-500 p-2 rounded-md cursor-pointer"
                  onClick={() => setAlertModal('risk')}
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="size-5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">
                        {atRiskClientsList.length} clientes em risco
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 opacity-50" />
                </div>
                <div
                  className="flex items-center justify-between gap-3 bg-amber-500/10 text-amber-500 p-2 rounded-md cursor-pointer"
                  onClick={() => setAlertModal('packages')}
                >
                  <div className="flex items-center gap-3">
                    <PackageSearch className="size-5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">
                        {expiringPackagesList.length} pacotes vencendo
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 opacity-50" />
                </div>
                <div
                  className="flex items-center justify-between gap-3 bg-blue-500/10 text-blue-500 p-2 rounded-md cursor-pointer"
                  onClick={() => setAlertModal('tomorrow')}
                >
                  <div className="flex items-center gap-3">
                    <CalendarDays className="size-5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">
                        {aptsTomorrowList.length} agendamentos amanhã
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="size-4 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'financial' && (
        <FinancialView
          commissions={filteredCommissions}
          isAdmin={isAdmin}
          onOpenAdvanceModal={() => setAdvanceModalOpen(true)}
        />
      )}
      {activeTab === 'packages' && <PackagesView packages={filteredPackages} />}

      <Dialog open={advanceModalOpen} onOpenChange={setAdvanceModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Adiantamento (Vale)</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Profissional</Label>
              <Select value={advanceBarber} onValueChange={setAdvanceBarber}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o profissional" />
                </SelectTrigger>
                <SelectContent>
                  {barbers.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Valor (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleCreateAdvance}
              disabled={!advanceBarber || !advanceAmount}
            >
              Confirmar Vale
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isPeakModalOpen} onOpenChange={setIsPeakModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Pico de Movimento</DialogTitle>
          </DialogHeader>
          <div className="h-[300px] w-full mt-4">
            <ChartContainer
              config={{ count: { label: 'Agendamentos', color: 'hsl(var(--primary))' } }}
            >
              <LineChart data={peakData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={30} />
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

      <Dialog open={alertModal !== null} onOpenChange={(open) => !open && setAlertModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lista de Alertas</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[400px] pr-4">
            {alertModal === 'risk' &&
              atRiskClientsList.map((c) => (
                <div key={c.id} className="py-2 border-b flex justify-between text-sm">
                  <span>
                    {c.name} {c.surname}
                  </span>
                  <span className="text-red-500">
                    {c.last_visit
                      ? `${differenceInDays(new Date(), new Date(c.last_visit))} dias atrás`
                      : 'Sem visitas'}
                  </span>
                </div>
              ))}
            {alertModal === 'packages' &&
              expiringPackagesList.map((p) => (
                <div key={p.id} className="py-2 border-b flex justify-between text-sm">
                  <span>
                    {p.expand?.client_id?.name} ({p.expand?.package_id?.name})
                  </span>
                  <span className="text-amber-500">Restam {p.remaining_uses}</span>
                </div>
              ))}
            {alertModal === 'tomorrow' &&
              aptsTomorrowList.map((a) => (
                <div key={a.id} className="py-2 border-b flex justify-between text-sm">
                  <span>{a.expand?.client_id?.name}</span>
                  <span className="text-blue-500">
                    {a.time} - {a.expand?.barber_id?.name}
                  </span>
                </div>
              ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
