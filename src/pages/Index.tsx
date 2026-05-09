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
import {
  format,
  startOfWeek,
  startOfMonth,
  startOfYear,
  endOfWeek,
  endOfMonth,
  addDays,
  differenceInDays,
  isTomorrow,
  isThisWeek,
  isThisMonth,
  startOfDay,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
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
import { AreaChart, Area, BarChart, Bar, Legend, XAxis, YAxis, CartesianGrid } from 'recharts'
import { useAuth } from '@/hooks/use-auth'
import { FinancialView } from '@/components/dashboard/FinancialView'
import { PackagesView } from '@/components/dashboard/PackagesView'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useRealtime } from '@/hooks/use-realtime'

export default function Index() {
  const { user } = useAuth()
  const isAdmin =
    user?.access_level === 'Admin' || user?.email === 'reginaldo.segundo@planagroup.com.br'

  const [isLoading, setIsLoading] = useState(true)
  const [appointments, setAppointments] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [barbers, setBarbers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [commissions, setCommissions] = useState<any[]>([])
  const [productPurchases, setProductPurchases] = useState<any[]>([])

  const [period, setPeriod] = useState('month')
  const [barberFilter, setBarberFilter] = useState('all')
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'packages'>('overview')

  const [alertModal, setAlertModal] = useState<'risk' | 'packages' | 'stock' | 'tomorrow' | null>(
    null,
  )
  const [dashboardModal, setDashboardModal] = useState<
    'revenue' | 'clients' | 'new_clients' | null
  >(null)

  const [historyType, setHistoryType] = useState<'services' | 'products'>('services')

  const [advanceModalOpen, setAdvanceModalOpen] = useState(false)
  const [advanceBarber, setAdvanceBarber] = useState('')
  const [advanceAmount, setAdvanceAmount] = useState('')

  const loadData = async () => {
    setIsLoading(true)
    setAppointments(await getAppointments(''))
    setClients(await getClients())
    setPackages(await getClientPackages())
    setBarbers(await getBarbers())
    setProducts(await getProducts())
    setCommissions(await getCommissions(''))
    setProductPurchases(await getProductPurchases(''))
    setIsLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('appointments', () => loadData())
  useRealtime('client_packages', () => loadData())
  useRealtime('product_purchases', () => loadData())
  useRealtime('commissions', () => loadData())
  useRealtime('clients', () => loadData())

  const periodStart = useMemo(() => {
    const now = new Date()
    if (period === 'today') return startOfDay(now)
    if (period === 'week') return startOfWeek(now, { weekStartsOn: 1 })
    if (period === 'month') return startOfMonth(now)
    if (period === 'year') return startOfYear(now)
    return new Date(0)
  }, [period])

  const periodEnd = useMemo(() => {
    const now = new Date()
    if (period === 'today') {
      const d = new Date(startOfDay(now))
      d.setHours(23, 59, 59, 999)
      return d
    }
    if (period === 'week') {
      const end = endOfWeek(now, { weekStartsOn: 1 })
      end.setHours(23, 59, 59, 999)
      return end
    }
    if (period === 'month') {
      const end = endOfMonth(now)
      end.setHours(23, 59, 59, 999)
      return end
    }
    if (period === 'year') {
      const end = new Date(now.getFullYear(), 11, 31)
      end.setHours(23, 59, 59, 999)
      return end
    }
    return new Date(8640000000000000)
  }, [period])

  const isInPeriod = (dateString: string) => {
    if (!dateString) return false
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return false
    return d >= periodStart && d <= periodEnd
  }

  const loggedInBarber = barbers.find((b) => b.name === user?.name)
  const effectiveBarberFilter = isAdmin ? barberFilter : loggedInBarber?.id || 'all'

  const filteredAppointments = useMemo(
    () =>
      appointments.filter(
        (a) => effectiveBarberFilter === 'all' || a.barber_id === effectiveBarberFilter,
      ),
    [appointments, effectiveBarberFilter],
  )
  const filteredCommissions = useMemo(
    () =>
      commissions.filter(
        (c) => effectiveBarberFilter === 'all' || c.barber_id === effectiveBarberFilter,
      ),
    [commissions, effectiveBarberFilter],
  )
  const filteredPackages = useMemo(
    () =>
      packages.filter(
        (p) => effectiveBarberFilter === 'all' || p.barber_id === effectiveBarberFilter,
      ),
    [packages, effectiveBarberFilter],
  )

  const validAppointments = filteredAppointments.filter((a) => a.status !== 'Cancelado')
  const completedPeriod = validAppointments.filter(
    (a) =>
      (a.status === 'Concluído' || a.status === 'Confirmado') && isInPeriod(a.date || a.updated),
  )
  const productPurchasesPeriod = productPurchases.filter((p) => isInPeriod(p.date || p.created))

  const periodRevenue = completedPeriod.reduce(
    (acc, curr) => acc + (curr.price || curr.expand?.service_id?.price || 0),
    0,
  )

  const productRevenue = productPurchasesPeriod.reduce(
    (acc, curr) => acc + (curr.price_at_sale || curr.expand?.product_id?.price || 0),
    0,
  )
  const totalRevenue = periodRevenue + productRevenue

  const uniqueClientsPeriod = new Set(completedPeriod.map((a) => a.client_id)).size
  const avgTicket = completedPeriod.length > 0 ? periodRevenue / completedPeriod.length : 0
  const avgProductTicket =
    productPurchasesPeriod.length > 0 ? productRevenue / productPurchasesPeriod.length : 0

  const clientsCreatedInPeriod = clients.filter((c) => isInPeriod(c.created))

  const newClientsCount =
    effectiveBarberFilter === 'all'
      ? clientsCreatedInPeriod.length
      : clientsCreatedInPeriod.filter((c) => validAppointments.some((a) => a.client_id === c.id))
          .length

  const atRiskClientsList = clients.filter(
    (c) =>
      c.is_at_risk || (c.last_visit && differenceInDays(new Date(), new Date(c.last_visit)) > 30),
  )

  const lowUsesPackagesList = filteredPackages.filter((p) => p.remaining_uses === 1)

  const aptsTomorrowList = filteredAppointments.filter(
    (a) => a.date && isTomorrow(new Date(a.date)) && a.status !== 'Cancelado',
  )

  const calcApptRevenue = (a: any) => {
    let price = a.price || a.expand?.service_id?.price || 0
    if (a.expand?.client_package_id?.expand?.package_id) {
      const pkg = a.expand.client_package_id.expand.package_id
      if (pkg.quantity > 0) price = pkg.price / pkg.quantity
    }
    return price
  }

  const tomorrow = addDays(startOfDay(new Date()), 1)
  const tomorrowEnd = new Date(tomorrow)
  tomorrowEnd.setHours(23, 59, 59, 999)

  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 })
  weekEnd.setHours(23, 59, 59, 999)

  const monthEnd = endOfMonth(new Date())
  monthEnd.setHours(23, 59, 59, 999)

  const pendingAppointments = filteredAppointments.filter(
    (a) => a.status !== 'Cancelado' && a.status !== 'Concluído' && a.date,
  )

  const predictedTomorrow = pendingAppointments
    .filter((a) => {
      const d = new Date(a.date)
      return d >= tomorrow && d <= tomorrowEnd
    })
    .reduce((acc, a) => acc + calcApptRevenue(a), 0)

  const predictedRestOfWeek = pendingAppointments
    .filter((a) => {
      const d = new Date(a.date)
      return d > tomorrowEnd && d <= weekEnd
    })
    .reduce((acc, a) => acc + calcApptRevenue(a), 0)

  const predictedRestOfMonth = pendingAppointments
    .filter((a) => {
      const d = new Date(a.date)
      return d > tomorrowEnd && d <= monthEnd
    })
    .reduce((acc, a) => acc + calcApptRevenue(a), 0)

  const lowStockProductsList = products.filter(
    (p) => (p.stock_quantity || 0) <= Math.max(p.reorder_point || 0, p.min_stock || 0),
  )

  const peakData = useMemo(() => {
    const hours = Array.from({ length: 13 }, (_, i) => i + 8)
    const counts = hours.map((h) => ({ hour: `${h}h`, count: 0 }))
    completedPeriod.forEach((a) => {
      if (a.time) {
        const h = parseInt(a.time.split(':')[0], 10)
        const entry = counts.find((c) => c.hour === `${h}h`)
        if (entry) entry.count++
      }
    })
    return counts
  }, [completedPeriod])

  const topSellers = useMemo(() => {
    const counts: Record<string, { name: string; type: string; count: number; revenue: number }> =
      {}

    completedPeriod.forEach((a) => {
      const name = a.expand?.service_id?.name || 'Serviço Avulso'
      const price = a.price || a.expand?.service_id?.price || 0
      if (!counts[name]) counts[name] = { name, type: 'Serviço', count: 0, revenue: 0 }
      counts[name].count++
      counts[name].revenue += price
    })

    productPurchasesPeriod.forEach((p) => {
      const name = p.expand?.product_id?.name || 'Produto Avulso'
      const price = p.price_at_sale || p.expand?.product_id?.price || 0
      if (!counts[name]) counts[name] = { name, type: 'Produto', count: 0, revenue: 0 }
      counts[name].count++
      counts[name].revenue += price
    })

    return Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }, [completedPeriod, productPurchasesPeriod])

  const historyData = useMemo(() => {
    const dataMap: Record<string, { date: string; services: number; products: number }> = {}

    completedPeriod.forEach((a) => {
      const d = a.date ? a.date.substring(0, 10) : a.updated.substring(0, 10)
      if (!dataMap[d]) dataMap[d] = { date: d, services: 0, products: 0 }
      dataMap[d].services += a.price || a.expand?.service_id?.price || 0
    })

    productPurchasesPeriod.forEach((p) => {
      const d = p.date ? p.date.substring(0, 10) : p.created.substring(0, 10)
      if (!dataMap[d]) dataMap[d] = { date: d, services: 0, products: 0 }
      dataMap[d].products += p.price_at_sale || p.expand?.product_id?.price || 0
    })

    const sortedDates = Object.keys(dataMap).sort()
    return sortedDates.map((dateStr) => ({
      date: format(new Date(dateStr + 'T12:00:00'), 'dd/MM'),
      services: dataMap[dateStr].services,
      products: dataMap[dateStr].products,
    }))
  }, [completedPeriod, productPurchasesPeriod])

  const clientsServed = useMemo(() => {
    return Array.from(new Set(completedPeriod.map((a) => a.client_id))).map((id) => {
      const apts = completedPeriod.filter((a) => a.client_id === id)
      const client = apts[0]?.expand?.client_id
      const barbers = Array.from(new Set(apts.map((a) => a.expand?.barber_id?.name)))
        .filter(Boolean)
        .join(', ')
      return { client, barbers }
    })
  }, [completedPeriod])

  const translateMethod = (m: string) =>
    m === 'cash'
      ? 'Dinheiro'
      : m === 'pix'
        ? 'Pix'
        : m === 'debito'
          ? 'Débito'
          : m === 'credito'
            ? 'Crédito'
            : m

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
          {activeTab === 'overview' && (
            <Tabs value={period} onValueChange={setPeriod} className="w-full sm:w-auto">
              <TabsList className="bg-card">
                <TabsTrigger value="today">Hoje</TabsTrigger>
                <TabsTrigger value="week">Semana</TabsTrigger>
                <TabsTrigger value="month">Mês</TabsTrigger>
                <TabsTrigger value="year">Ano</TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        </div>
      </div>

      <div className="border-b border-border mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab as any} className="w-full">
          <TabsList className="bg-transparent w-full justify-start rounded-none px-0 h-auto gap-4">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 py-2"
            >
              Visão Geral
            </TabsTrigger>
            <TabsTrigger
              value="financial"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 py-2"
            >
              Financeiro
            </TabsTrigger>
            <TabsTrigger
              value="packages"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 py-2"
            >
              Pacotes Ativos
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            <Card
              className="bg-glass border-none cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => setDashboardModal('revenue')}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
                <CardTitle className="text-xs font-medium text-muted-foreground truncate mr-2">
                  Faturamento
                </CardTitle>
                <BadgeDollarSign className="size-4 text-emerald-500 shrink-0" />
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
              </CardContent>
            </Card>
            <Card
              className="bg-glass border-none cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => setDashboardModal('clients')}
            >
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
            <Card
              className="bg-glass border-none cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => setDashboardModal('new_clients')}
            >
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
                <CardTitle className="text-xs font-medium text-muted-foreground truncate mr-2">
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
                <CardTitle className="text-xs font-medium text-muted-foreground truncate mr-2">
                  Ticket Médio - Prod.
                </CardTitle>
                <BadgeDollarSign className="size-4 text-orange-500 shrink-0" />
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="text-2xl font-bold">R$ {avgProductTicket.toFixed(2)}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4">
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
                    <AreaChart
                      data={peakData}
                      margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
                    >
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

            <Card className="bg-glass border-none w-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Histórico de Vendas (Receita)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full mt-4">
                  {historyData.length > 0 ? (
                    <ChartContainer
                      config={{
                        services: { label: 'Serviços & Pacotes', color: 'hsl(var(--primary))' },
                        products: { label: 'Produtos', color: '#10b981' },
                      }}
                    >
                      <BarChart
                        data={historyData}
                        margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
                      >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickLine={false} axisLine={false} />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          width={50}
                          tickFormatter={(val) => `R$ ${val}`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend verticalAlign="top" height={36} />
                        <Bar
                          dataKey="services"
                          stackId="a"
                          fill="var(--color-services)"
                          radius={[0, 0, 4, 4]}
                        />
                        <Bar
                          dataKey="products"
                          stackId="a"
                          fill="var(--color-products)"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ChartContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      Sem dados para o período.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-glass border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Itens Mais Vendidos (Top 5)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Qtd</TableHead>
                      <TableHead className="text-right">Receita</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topSellers.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px]">
                            {item.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{item.count}</TableCell>
                        <TableCell className="text-right text-emerald-500 font-medium">
                          R$ {item.revenue.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    {topSellers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                          Nenhuma venda no período.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-glass border-none w-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                  Previsão de Recebimento
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Amanhã</p>
                  {isLoading ? (
                    <div className="h-8 w-24 bg-muted animate-pulse rounded-md mt-1" />
                  ) : (
                    <p className="text-2xl font-bold text-primary">
                      R$ {predictedTomorrow.toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Restante da Semana</p>
                  {isLoading ? (
                    <div className="h-8 w-24 bg-muted animate-pulse rounded-md mt-1" />
                  ) : (
                    <p className="text-2xl font-bold text-primary">
                      R$ {predictedRestOfWeek.toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Restante do Mês</p>
                  {isLoading ? (
                    <div className="h-8 w-24 bg-muted animate-pulse rounded-md mt-1" />
                  ) : (
                    <p className="text-2xl font-bold text-primary">
                      R$ {predictedRestOfMonth.toFixed(2)}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-glass border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                  Alertas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lowStockProductsList.length > 0 && (
                  <div
                    className="flex items-center justify-between gap-3 bg-orange-500/10 text-orange-500 p-2 rounded-md cursor-pointer"
                    onClick={() => setAlertModal('stock')}
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="size-5 shrink-0" />
                      <div>
                        <p className="font-semibold text-sm">
                          {lowStockProductsList.length} produtos com baixo estoque
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="size-4 opacity-50" />
                  </div>
                )}
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
                        {lowUsesPackagesList.length} pacotes com 1 uso restante
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

      <Dialog open={alertModal === 'stock'} onOpenChange={(v) => !v && setAlertModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Produtos com Estoque Baixo</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Estoque Atual</TableHead>
                  <TableHead className="text-right">Estoque Mínimo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockProductsList.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell className="text-right text-red-500 font-bold">
                      {p.stock_quantity || 0}
                    </TableCell>
                    <TableCell className="text-right">
                      {p.min_stock || p.reorder_point || 0}
                    </TableCell>
                  </TableRow>
                ))}
                {lowStockProductsList.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                      Nenhum produto com estoque baixo.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={alertModal === 'packages'} onOpenChange={(v) => !v && setAlertModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Pacotes com 1 uso restante</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Pacote</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead className="text-right">Usos Restantes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowUsesPackagesList.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.expand?.client_id?.name || '-'}</TableCell>
                    <TableCell>{p.expand?.package_id?.name || '-'}</TableCell>
                    <TableCell>
                      {p.expires_at ? format(new Date(p.expires_at), 'dd/MM/yyyy') : '-'}
                    </TableCell>
                    <TableCell className="text-right font-bold text-amber-500">
                      {p.remaining_uses}
                    </TableCell>
                  </TableRow>
                ))}
                {lowUsesPackagesList.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      Nenhum pacote com 1 uso restante.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={alertModal === 'tomorrow'} onOpenChange={(v) => !v && setAlertModal(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Agendamentos para Amanhã</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Horário</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Profissional</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aptsTomorrowList.map((a) => {
                  let price = a.price || a.expand?.service_id?.price || 0
                  if (a.expand?.client_package_id?.expand?.package_id) {
                    const pkg = a.expand.client_package_id.expand.package_id
                    if (pkg.quantity > 0) price = pkg.price / pkg.quantity
                  }
                  return (
                    <TableRow key={a.id}>
                      <TableCell>{a.time}</TableCell>
                      <TableCell>{a.expand?.client_id?.name || 'Avulso'}</TableCell>
                      <TableCell>{a.expand?.barber_id?.name || '-'}</TableCell>
                      <TableCell>{a.expand?.service_id?.name || '-'}</TableCell>
                      <TableCell className="text-right font-medium">
                        R$ {price.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{a.status}</Badge>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {aptsTomorrowList.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      Nenhum agendamento para amanhã.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={!!dashboardModal} onOpenChange={(v) => !v && setDashboardModal(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {dashboardModal === 'revenue' && 'Detalhamento de Faturamento'}
              {dashboardModal === 'clients' && 'Clientes Atendidos'}
              {dashboardModal === 'new_clients' && 'Novos Clientes'}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 mt-4">
            {dashboardModal === 'revenue' && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Profissional</TableHead>
                    <TableHead>Método de Pagamento</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedPeriod.map((a) => {
                    const comm = commissions.find(
                      (c) =>
                        c.barber_id === a.barber_id &&
                        c.type === 'service' &&
                        Math.abs(new Date(c.created).getTime() - new Date(a.updated).getTime()) <
                          15000,
                    )
                    return (
                      <TableRow key={a.id}>
                        <TableCell>
                          {a.date ? format(new Date(a.date), 'dd/MM/yyyy') : ''}
                        </TableCell>
                        <TableCell>{a.expand?.client_id?.name || 'Avulso'}</TableCell>
                        <TableCell>{a.expand?.barber_id?.name || '-'}</TableCell>
                        <TableCell>{translateMethod(comm?.payment_method || '-')}</TableCell>
                        <TableCell className="text-right">
                          R$ {(a.price || a.expand?.service_id?.price || 0).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {productPurchasesPeriod.map((p) => {
                    const comm = commissions.find(
                      (c) =>
                        c.type === 'product' &&
                        Math.abs(new Date(c.created).getTime() - new Date(p.created).getTime()) <
                          15000,
                    )
                    return (
                      <TableRow key={p.id}>
                        <TableCell>
                          {p.date ? format(new Date(p.date), 'dd/MM/yyyy') : ''}
                        </TableCell>
                        <TableCell>{p.expand?.client_id?.name || 'Avulso'}</TableCell>
                        <TableCell>{p.expand?.barber_id?.name || '-'}</TableCell>
                        <TableCell>{translateMethod(comm?.payment_method || '-')}</TableCell>
                        <TableCell className="text-right">
                          R$ {(p.price_at_sale || 0).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                  {completedPeriod.length === 0 && productPurchasesPeriod.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        Nenhuma venda no período.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
            {dashboardModal === 'clients' && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Profissional(is)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientsServed.map((data, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        {data.client?.name} {data.client?.surname}
                      </TableCell>
                      <TableCell>{data.barbers}</TableCell>
                    </TableRow>
                  ))}
                  {clientsServed.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2} className="text-center py-6 text-muted-foreground">
                        Nenhum cliente no período.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
            {dashboardModal === 'new_clients' && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data Cadastro</TableHead>
                    <TableHead>Atendido por</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientsCreatedInPeriod.map((c) => {
                    const firstApt = appointments.find((a) => a.client_id === c.id)
                    return (
                      <TableRow key={c.id}>
                        <TableCell>
                          {c.name} {c.surname}
                        </TableCell>
                        <TableCell>{format(new Date(c.created), 'dd/MM/yyyy')}</TableCell>
                        <TableCell>{firstApt?.expand?.barber_id?.name || '-'}</TableCell>
                      </TableRow>
                    )
                  })}
                  {clientsCreatedInPeriod.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                        Nenhum novo cliente no período.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
