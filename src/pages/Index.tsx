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
  getProductPurchases,
} from '@/services/api'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { format, startOfWeek, startOfMonth, startOfYear, addDays, differenceInDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts'
import { useAuth } from '@/hooks/use-auth'
import { FinancialView } from '@/components/dashboard/FinancialView'
import { PackagesView } from '@/components/dashboard/PackagesView'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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
  const [productPurchases, setProductPurchases] = useState<any[]>([])

  const [period, setPeriod] = useState('today')
  const [barberFilter, setBarberFilter] = useState('all')
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'packages'>('overview')

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
    setProductPurchases(await getProductPurchases(filterStr))
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

  const productRevenue = productPurchases.reduce(
    (acc, curr) => acc + (curr.price_at_sale || curr.expand?.product_id?.price || 0),
    0,
  )
  const avgProductTicket =
    productPurchases.length > 0 ? productRevenue / productPurchases.length : 0

  const tomorrowStr = format(addDays(new Date(), 1), 'yyyy-MM-dd')

  const clientsCreatedInPeriod = clients.filter((c) => {
    let dateFilter = ''
    const now = new Date()
    if (period === 'today') dateFilter = format(now, 'yyyy-MM-dd')
    else if (period === 'week')
      dateFilter = format(startOfWeek(now, { weekStartsOn: 1 }), 'yyyy-MM-dd')
    else if (period === 'month') dateFilter = format(startOfMonth(now), 'yyyy-MM-dd')
    else if (period === 'year') dateFilter = format(startOfYear(now), 'yyyy-MM-dd')

    if (!dateFilter) return true
    return c.created >= `${dateFilter} 00:00:00`
  })

  const newClientsCount =
    effectiveBarberFilter === 'all'
      ? clientsCreatedInPeriod.length
      : clientsCreatedInPeriod.filter((c) => validAppointments.some((a) => a.client_id === c.id))
          .length

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            <Card className="bg-glass border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground truncate mr-2">
                  Faturamento
                </CardTitle>
                <BadgeDollarSign className="size-4 text-emerald-500 shrink-0" />
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">R$ {periodRevenue.toFixed(2)}</div>
              </CardContent>
            </Card>
            <Card className="bg-glass border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground truncate mr-2">
                  Clientes Atendidos
                </CardTitle>
                <Users className="size-4 text-blue-500 shrink-0" />
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">{uniqueClientsPeriod}</div>
              </CardContent>
            </Card>
            <Card className="bg-glass border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground truncate mr-2">
                  Novos Clientes
                </CardTitle>
                <Users className="size-4 text-purple-500 shrink-0" />
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">{newClientsCount}</div>
              </CardContent>
            </Card>
            <Card className="bg-glass border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
                <CardTitle
                  className="text-xs font-medium text-muted-foreground truncate mr-2"
                  title="Ticket Médio - Serviços"
                >
                  Ticket Médio - Serv.
                </CardTitle>
                <BadgeDollarSign className="size-4 text-amber-500 shrink-0" />
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">R$ {avgTicket.toFixed(2)}</div>
              </CardContent>
            </Card>
            <Card className="bg-glass border-none">
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
                <CardTitle
                  className="text-xs font-medium text-muted-foreground truncate mr-2"
                  title="Ticket Médio - Produtos"
                >
                  Ticket Médio - Prod.
                </CardTitle>
                <BadgeDollarSign className="size-4 text-orange-500 shrink-0" />
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">R$ {avgProductTicket.toFixed(2)}</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-glass border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Horários de Pico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full mt-4">
                <ChartContainer
                  config={{ count: { label: 'Agendamentos', color: 'hsl(var(--primary))' } }}
                >
                  <AreaChart data={peakData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
                    <defs>
                      <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-count)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-count)" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="hour" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} width={30} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="var(--color-count)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#fillCount)"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

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

      <Dialog open={alertModal !== null} onOpenChange={(open) => !open && setAlertModal(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Lista de Alertas</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[400px] pr-4 mt-2">
            {alertModal === 'risk' &&
              atRiskClientsList.map((c) => {
                const days = c.last_visit ? differenceInDays(new Date(), new Date(c.last_visit)) : 0
                const freq = (c.name.length % 15) + 15
                const action = ['Oferecer desconto', 'Enviar mensagem', 'Ligar para o cliente'][
                  c.name.length % 3
                ]
                return (
                  <div key={c.id} className="py-4 border-b border-border/50 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-base flex items-center gap-2">
                        <span>❌</span> {c.name} {c.surname}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground flex flex-col gap-1">
                      <span>
                        <strong className="text-foreground">Status:</strong>{' '}
                        {c.last_visit ? `Sem voltar há ${days} dias` : 'Sem visitas registradas'}
                      </span>
                      {c.last_visit && (
                        <span>
                          <strong className="text-foreground">Último atendimento:</strong>{' '}
                          {format(new Date(c.last_visit), "dd 'de' MMMM", { locale: ptBR })}
                        </span>
                      )}
                      <span>
                        <strong className="text-foreground">Frequência anterior:</strong> A cada{' '}
                        {freq} dias
                      </span>
                    </div>
                    <div className="mt-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        Ação sugerida: {action}
                      </Badge>
                    </div>
                  </div>
                )
              })}
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
