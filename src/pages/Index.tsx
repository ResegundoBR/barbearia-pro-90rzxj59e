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
  Gift,
} from 'lucide-react'
import {
  getAppointments,
  getClients,
  getClientPackages,
  getBarbers,
  getProducts,
  getBusinessHours,
  getCategories,
  getCommissions,
  getProductPurchases,
  getPaymentMethods,
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
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'
import { useAuth } from '@/hooks/use-auth'
import { FinancialView } from '@/components/dashboard/FinancialView'
import { PackagesView } from '@/components/dashboard/PackagesView'
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
import { usePermissions } from '@/hooks/use-permissions'
import pb from '@/lib/pocketbase/client'

export default function Index() {
  const { user } = useAuth()
  const { hasAccess } = usePermissions()
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
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [businessHours, setBusinessHours] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  const [period, setPeriod] = useState('month')
  const [barberFilter, setBarberFilter] = useState('all')
  const [activeTab, setActiveTab] = useState<'overview' | 'financial' | 'packages'>('overview')

  useEffect(() => {
    if (!hasAccess('dash_tab_overview') && activeTab === 'overview') {
      if (hasAccess('dash_tab_financial')) setActiveTab('financial')
      else if (hasAccess('dash_tab_packages')) setActiveTab('packages')
    }
  }, [hasAccess, activeTab])

  const [alertModal, setAlertModal] = useState<
    'risk' | 'packages' | 'stock' | 'tomorrow' | 'birthdays' | null
  >(null)
  const [dashboardModal, setDashboardModal] = useState<
    'revenue' | 'clients' | 'new_clients' | null
  >(null)
  const [forecastModal, setForecastModal] = useState<'tomorrow' | 'week' | 'month' | null>(null)

  const [historyModalDate, setHistoryModalDate] = useState<string | null>(null)
  const [selectedTeamMember, setSelectedTeamMember] = useState<any>(null)
  const [gaugeMetric, setGaugeMetric] = useState<'revenue' | 'attendance' | 'occupancy'>('revenue')

  const [checkouts, setCheckouts] = useState<any[]>([])

  const loadData = async () => {
    setIsLoading(true)
    setAppointments(await getAppointments(''))
    setClients(await getClients())
    setPackages(await getClientPackages())
    setBarbers(await getBarbers())
    setProducts(await getProducts())
    setCommissions(await getCommissions(''))
    setProductPurchases(await getProductPurchases(''))
    setPaymentMethods(await getPaymentMethods())
    setBusinessHours(await getBusinessHours())
    try {
      setCategories(await getCategories())
    } catch {
      /* intentionally ignored */
    }
    try {
      setCheckouts(await pb.collection('checkouts').getFullList({ expand: 'client_id,barber_id' }))
    } catch {
      /* intentionally ignored */
    }
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
  useRealtime('payment_methods', () => loadData())
  useRealtime('checkouts', () => loadData())

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

  const filteredProductPurchases = useMemo(
    () =>
      productPurchases.filter(
        (p) => effectiveBarberFilter === 'all' || p.barber_id === effectiveBarberFilter,
      ),
    [productPurchases, effectiveBarberFilter],
  )

  const filteredCheckouts = useMemo(
    () =>
      checkouts.filter(
        (c) => effectiveBarberFilter === 'all' || c.barber_id === effectiveBarberFilter,
      ),
    [checkouts, effectiveBarberFilter],
  )

  const validAppointments = filteredAppointments.filter((a) => a.status !== 'Cancelado')
  const completedPeriod = validAppointments.filter(
    (a) => a.status === 'Concluído' && isInPeriod(a.date || a.updated),
  )
  const productPurchasesPeriod = filteredProductPurchases.filter((p) =>
    isInPeriod(p.date || p.created),
  )
  const commissionsPeriod = filteredCommissions.filter((c) => isInPeriod(c.date || c.created))

  const periodRevenue = completedPeriod.reduce(
    (acc, curr) =>
      acc + (curr.client_package_id ? 0 : curr.price || curr.expand?.service_id?.price || 0),
    0,
  )

  const productRevenue = productPurchasesPeriod.reduce(
    (acc, curr) => acc + (curr.price_at_sale || curr.expand?.product_id?.price || 0),
    0,
  )

  const packagesPeriod = filteredPackages.filter((p) => isInPeriod(p.created))
  const packagesRevenue = packagesPeriod.reduce(
    (acc, curr) => acc + (curr.expand?.package_id?.price || 0),
    0,
  )

  const totalRevenue = periodRevenue + productRevenue + packagesRevenue

  const uniqueClientsPeriod = new Set(completedPeriod.map((a) => a.client_id)).size
  const serviceAndPackageRevenue = periodRevenue + packagesRevenue
  const serviceAndPackageCount = completedPeriod.length + packagesPeriod.length
  const avgTicket =
    serviceAndPackageCount > 0 ? serviceAndPackageRevenue / serviceAndPackageCount : 0
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
    (a) =>
      a.date &&
      isTomorrow(new Date(a.date)) &&
      a.status !== 'Cancelado' &&
      a.status !== 'Concluído',
  )

  const calcApptRevenue = (a: any) => {
    if (a.client_package_id) return 0
    return a.price || a.expand?.service_id?.price || 0
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

  const birthdayClientsList = useMemo(() => {
    const todayDate = startOfDay(new Date())
    const nextWeek = addDays(todayDate, 7)

    return clients
      .filter((c) => {
        if (!c.birthday) return false
        if (
          effectiveBarberFilter !== 'all' &&
          c.preferred_barber_id !== effectiveBarberFilter &&
          c.created_by_id !== effectiveBarberFilter
        ) {
          return false
        }

        const b = new Date(c.birthday)
        if (isNaN(b.getTime())) return false

        const bThisYear = new Date(todayDate.getFullYear(), b.getMonth(), b.getDate())
        const bNextYear = new Date(todayDate.getFullYear() + 1, b.getMonth(), b.getDate())

        return (
          (bThisYear >= todayDate && bThisYear <= nextWeek) ||
          (bNextYear >= todayDate && bNextYear <= nextWeek)
        )
      })
      .sort((a, b) => {
        const dA = new Date(
          todayDate.getFullYear(),
          new Date(a.birthday).getMonth(),
          new Date(a.birthday).getDate(),
        )
        const dB = new Date(
          todayDate.getFullYear(),
          new Date(b.birthday).getMonth(),
          new Date(b.birthday).getDate(),
        )
        if (dA < todayDate) dA.setFullYear(dA.getFullYear() + 1)
        if (dB < todayDate) dB.setFullYear(dB.getFullYear() + 1)
        return dA.getTime() - dB.getTime()
      })
  }, [clients, effectiveBarberFilter])

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
      const price = a.client_package_id ? 0 : a.price || a.expand?.service_id?.price || 0
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

    packagesPeriod.forEach((pkg) => {
      const name = pkg.expand?.package_id?.name || 'Pacote Avulso'
      const price = pkg.expand?.package_id?.price || 0
      if (!counts[name]) counts[name] = { name, type: 'Pacote', count: 0, revenue: 0 }
      counts[name].count++
      counts[name].revenue += price
    })

    return Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }, [completedPeriod, productPurchasesPeriod, packagesPeriod])

  const historyData = useMemo(() => {
    const dataMap: Record<string, { date: string; services: number; products: number }> = {}

    completedPeriod.forEach((a) => {
      const d = a.date ? a.date.substring(0, 10) : a.updated.substring(0, 10)
      if (!dataMap[d]) dataMap[d] = { date: d, services: 0, products: 0 }
      dataMap[d].services += a.client_package_id ? 0 : a.price || a.expand?.service_id?.price || 0
    })

    productPurchasesPeriod.forEach((p) => {
      const d = p.date ? p.date.substring(0, 10) : p.created.substring(0, 10)
      if (!dataMap[d]) dataMap[d] = { date: d, services: 0, products: 0 }
      dataMap[d].products += p.price_at_sale || p.expand?.product_id?.price || 0
    })

    packagesPeriod.forEach((pkg) => {
      const d = pkg.created.substring(0, 10)
      if (!dataMap[d]) dataMap[d] = { date: d, services: 0, products: 0 }
      dataMap[d].services += pkg.expand?.package_id?.price || 0
    })

    const sortedDates = Object.keys(dataMap).sort()
    return sortedDates.map((dateStr) => ({
      fullDate: dateStr,
      date: format(new Date(dateStr + 'T12:00:00'), 'dd/MM'),
      services: dataMap[dateStr].services,
      products: dataMap[dateStr].products,
    }))
  }, [completedPeriod, productPurchasesPeriod, packagesPeriod])

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

  const getMethodName = (m: string) => {
    if (!m) return 'Não Informado'
    const pmById = paymentMethods.find((p: any) => p.id === m)
    if (pmById) return pmById.name

    if (m === 'cash') return 'Dinheiro'
    if (m === 'pix') return 'Pix'
    if (m === 'debito' || m === 'debit_card') return 'Cartão de Débito'
    if (m === 'credito' || m === 'credit_card') return 'Cartão de Crédito'

    return 'Outro'
  }

  const transactions = useMemo(() => {
    const list: any[] = []
    const processedCheckoutIds = new Set<string>()

    const findCheckout = (clientId: string, date: Date, checkoutId?: string) => {
      if (checkoutId) {
        return checkouts.find((c: any) => c.id === checkoutId)
      }
      return checkouts.find(
        (c: any) =>
          c.client_id === clientId &&
          Math.abs(new Date(c.created).getTime() - date.getTime()) < 60000,
      )
    }

    const addCheckout = (ck: any) => {
      if (!ck || processedCheckoutIds.has(ck.id)) return true
      processedCheckoutIds.add(ck.id)

      let itemNames: string[] = []
      if (ck.items_snapshot) {
        if (ck.items_snapshot.service) itemNames.push(ck.items_snapshot.service)
        if (ck.items_snapshot.products)
          itemNames.push(...ck.items_snapshot.products.map((p: any) => p.name))
        if (ck.items_snapshot.packages)
          itemNames.push(...ck.items_snapshot.packages.map((p: any) => p.name))
      }

      list.push({
        id: `chk_${ck.id}`,
        date: new Date(ck.date || ck.created),
        client: ck.expand?.client_id?.name || 'Avulso',
        item: itemNames.length > 0 ? itemNames.join(', ') : 'Múltiplos itens',
        barber: ck.expand?.barber_id?.name || '-',
        method: getMethodName(ck.payment_method || '-'),
        value: ck.total_amount,
        type: 'checkout',
      })
      return true
    }

    completedPeriod.forEach((a: any) => {
      const comm = commissions.find(
        (c: any) =>
          c.barber_id === a.barber_id &&
          c.type === 'service' &&
          Math.abs(new Date(c.created).getTime() - new Date(a.created).getTime()) < 15000,
      )
      const ck = findCheckout(a.client_id, new Date(a.created), comm?.checkout_id)
      if (ck) {
        addCheckout(ck)
      } else {
        list.push({
          id: `apt_${a.id}`,
          date: new Date(a.updated || a.created),
          client: a.expand?.client_id?.name || 'Avulso',
          item: a.expand?.service_id?.name || 'Serviço',
          barber: a.expand?.barber_id?.name || '-',
          method: getMethodName(
            comm?.payment_method || (paymentMethods.length > 0 ? paymentMethods[0].type : '-'),
          ),
          value: a.client_package_id ? 0 : a.price || a.expand?.service_id?.price || 0,
          type: 'service',
        })
      }
    })

    productPurchasesPeriod.forEach((p: any) => {
      const comm = commissions.find(
        (c: any) =>
          c.type === 'product' &&
          Math.abs(new Date(c.created).getTime() - new Date(p.created).getTime()) < 15000,
      )
      const ck = findCheckout(p.client_id, new Date(p.created), comm?.checkout_id)
      if (ck) {
        addCheckout(ck)
      } else {
        list.push({
          id: `prod_${p.id}`,
          date: new Date(p.created),
          client: p.expand?.client_id?.name || 'Avulso',
          item: p.expand?.product_id?.name || 'Produto',
          barber: p.expand?.barber_id?.name || '-',
          method: getMethodName(
            comm?.payment_method || (paymentMethods.length > 0 ? paymentMethods[0].type : '-'),
          ),
          value: p.price_at_sale || p.expand?.product_id?.price || 0,
          type: 'product',
        })
      }
    })

    packagesPeriod.forEach((pkg: any) => {
      const comm = commissions.find(
        (c: any) =>
          (c.type === 'package' || c.type === 'package_sale') &&
          Math.abs(new Date(c.created).getTime() - new Date(pkg.created).getTime()) < 15000,
      )
      const ck = findCheckout(pkg.client_id, new Date(pkg.created), comm?.checkout_id)
      if (ck) {
        addCheckout(ck)
      } else {
        list.push({
          id: `pkg_${pkg.id}`,
          date: new Date(pkg.created),
          client: pkg.expand?.client_id?.name || 'Avulso',
          item: pkg.expand?.package_id?.name || 'Pacote',
          barber: pkg.expand?.barber_id?.name || '-',
          method: getMethodName(
            comm?.payment_method || (paymentMethods.length > 0 ? paymentMethods[0].type : '-'),
          ),
          value: pkg.expand?.package_id?.price || 0,
          type: 'package',
        })
      }
    })

    return list.sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [
    completedPeriod,
    productPurchasesPeriod,
    packagesPeriod,
    commissions,
    paymentMethods,
    checkouts,
  ])

  const totalWorkingMinutesInPeriod = useMemo(() => {
    if (!periodStart || !periodEnd || businessHours.length === 0) return 0
    let minutes = 0
    let d = new Date(periodStart)
    const end = new Date(periodEnd)
    const today = startOfDay(new Date())
    const actualEnd = end > today ? today : end

    while (d <= actualEnd) {
      const dayOfWeek = d.getDay().toString()
      const bh = businessHours.find((b) => b.day_of_week === dayOfWeek && b.is_active)
      if (bh) {
        const [oH, oM] = bh.open_time.split(':').map(Number)
        const [cH, cM] = bh.close_time.split(':').map(Number)
        minutes += cH * 60 + cM - (oH * 60 + oM)
      }
      d = addDays(d, 1)
    }
    const activeBarbersCount = effectiveBarberFilter === 'all' ? barbers.length : 1
    return minutes * activeBarbersCount
  }, [periodStart, periodEnd, businessHours, barbers.length, effectiveBarberFilter])

  const usedMinutesInPeriod = useMemo(() => {
    return completedPeriod.reduce((acc, a) => {
      return acc + (a.expand?.service_id?.duration_minutes || 0)
    }, 0)
  }, [completedPeriod])

  const occupancyRate =
    totalWorkingMinutesInPeriod > 0 ? (usedMinutesInPeriod / totalWorkingMinutesInPeriod) * 100 : 0

  const monthlyBillingData = useMemo(() => {
    const monthsData: Record<string, number> = {}
    const today = new Date()
    for (let i = 11; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1)
      const key = format(d, 'MMM/yy', { locale: ptBR })
      monthsData[key] = 0
    }

    filteredCheckouts.forEach((c) => {
      const d = new Date(c.date || c.created)
      const diffMonths =
        (today.getFullYear() - d.getFullYear()) * 12 + (today.getMonth() - d.getMonth())
      if (diffMonths >= 0 && diffMonths < 12) {
        const key = format(d, 'MMM/yy', { locale: ptBR })
        if (monthsData[key] !== undefined) {
          monthsData[key] += c.total_amount || 0
        }
      }
    })

    return Object.keys(monthsData).map((month) => ({ month, value: monthsData[month] }))
  }, [filteredCheckouts])

  const serviceMixData = useMemo(() => {
    const mix: Record<string, number> = {}
    completedPeriod.forEach((a) => {
      const name = a.expand?.service_id?.name || 'Serviço Avulso'
      const price = a.client_package_id ? 0 : a.price || a.expand?.service_id?.price || 0
      mix[name] = (mix[name] || 0) + price
    })
    return Object.entries(mix)
      .map(([name, value]) => ({ name, value }))
      .filter((m) => m.value > 0)
      .sort((a, b) => b.value - a.value)
  }, [completedPeriod])

  const productMixData = useMemo(() => {
    const mix: Record<string, number> = {}
    productPurchasesPeriod.forEach((p) => {
      const name = p.expand?.product_id?.name || 'Produto Avulso'
      const price = p.price_at_sale || p.expand?.product_id?.price || 0
      mix[name] = (mix[name] || 0) + price
    })
    return Object.entries(mix)
      .map(([name, value]) => ({ name, value }))
      .filter((m) => m.value > 0)
      .sort((a, b) => b.value - a.value)
  }, [productPurchasesPeriod])

  const COLORS = [
    '#10b981',
    '#3b82f6',
    '#f59e0b',
    '#8b5cf6',
    '#ef4444',
    '#6b7280',
    '#ec4899',
    '#14b8a6',
  ]

  const mixConfig = useMemo(() => {
    const cfg: Record<string, any> = {}
    serviceMixData.forEach((item, i) => {
      cfg[item.name] = { label: item.name, color: COLORS[i % COLORS.length] }
    })
    return cfg
  }, [serviceMixData])

  const productMixConfig = useMemo(() => {
    const cfg: Record<string, any> = {}
    productMixData.forEach((item, i) => {
      cfg[item.name] = { label: item.name, color: COLORS[(i + 4) % COLORS.length] }
    })
    return cfg
  }, [productMixData])

  const getBarberOccupancy = (barberId: string) => {
    if (!periodStart || !periodEnd || businessHours.length === 0) return 0
    let minutes = 0
    let d = new Date(periodStart)
    const end = new Date(periodEnd)
    const today = startOfDay(new Date())
    const actualEnd = end > today ? today : end

    while (d <= actualEnd) {
      const dayOfWeek = d.getDay().toString()
      const bh = businessHours.find((b) => b.day_of_week === dayOfWeek && b.is_active)
      if (bh) {
        const [oH, oM] = bh.open_time.split(':').map(Number)
        const [cH, cM] = bh.close_time.split(':').map(Number)
        minutes += cH * 60 + cM - (oH * 60 + oM)
      }
      d = addDays(d, 1)
    }
    if (minutes === 0) return 0

    const barberUsed = completedPeriod
      .filter((a) => a.barber_id === barberId)
      .reduce((acc, a) => {
        return acc + (a.expand?.service_id?.duration_minutes || 0)
      }, 0)

    return (barberUsed / minutes) * 100
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6 max-w-6xl mx-auto">
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
            {hasAccess('dash_tab_overview') && (
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 py-2"
              >
                Visão Geral
              </TabsTrigger>
            )}
            {hasAccess('dash_tab_financial') && (
              <TabsTrigger
                value="financial"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 py-2"
              >
                Financeiro
              </TabsTrigger>
            )}
            {hasAccess('dash_tab_packages') && (
              <TabsTrigger
                value="packages"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 py-2"
              >
                Pacotes Ativos
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {hasAccess('dash_block_revenue') && (
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
            )}
            {hasAccess('dash_block_clients') && (
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
            )}
            {hasAccess('dash_block_new_clients') && (
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
            )}
            {hasAccess('dash_block_ticket_serv') && (
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
            )}
            {hasAccess('dash_block_ticket_prod') && (
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
            )}
            {hasAccess('dash_block_revenue') && (
              <Card className="bg-glass border-none">
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
                  <CardTitle className="text-xs font-medium text-muted-foreground truncate mr-2">
                    Taxa Ocupação
                  </CardTitle>
                  <Clock className="size-4 text-indigo-500 shrink-0" />
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="text-2xl font-bold">{occupancyRate.toFixed(1)}%</div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            {hasAccess('dash_block_top_sellers') && (
              <Card className="bg-glass border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Itens Mais Vendidos (Top 5)
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-2 sm:px-4">
                  <Table className="w-full table-fixed">
                    <TableHeader>
                      <TableRow className="text-[11px] hover:bg-transparent">
                        <TableHead className="h-7 px-2">Item</TableHead>
                        <TableHead className="w-[60px] sm:w-[70px] h-7 px-2">Tipo</TableHead>
                        <TableHead className="w-[35px] sm:w-[45px] text-center h-7 px-2">
                          Qtd
                        </TableHead>
                        <TableHead className="w-[70px] sm:w-[80px] text-right h-7 px-2">
                          Receita
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topSellers.map((item, idx) => (
                        <TableRow key={idx} className="text-[11px]">
                          <TableCell className="font-medium px-2 py-1.5 truncate" title={item.name}>
                            {item.name}
                          </TableCell>
                          <TableCell className="px-2 py-1.5">
                            <Badge
                              variant="outline"
                              className="text-[9px] px-1 py-0 font-medium whitespace-nowrap"
                            >
                              {item.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center px-2 py-1.5">{item.count}</TableCell>
                          <TableCell className="text-right text-emerald-500 font-medium px-2 py-1.5 whitespace-nowrap">
                            R$ {item.revenue.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      {topSellers.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center py-6 text-muted-foreground text-sm"
                          >
                            Nenhuma venda no período.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {hasAccess('dash_block_top_sellers') && (
              <Card className="bg-glass border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Mix de Serviços (Receita)
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-2 sm:px-4 pb-4">
                  {serviceMixData.length > 0 ? (
                    <div className="flex flex-col w-full">
                      <div className="h-[200px] w-full mt-2">
                        <ChartContainer config={mixConfig} className="h-full w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 10, bottom: 10 }}>
                              <Pie
                                data={serviceMixData}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                              >
                                {serviceMixData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                      <div className="mt-4 flex flex-col gap-2 px-2">
                        {serviceMixData.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <div
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="truncate" title={item.name}>
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
                      Nenhum dado para o período.
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {hasAccess('dash_block_top_sellers') && (
              <Card className="bg-glass border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Mix de Produtos (Receita)
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-2 sm:px-4 pb-4">
                  {productMixData.length > 0 ? (
                    <div className="flex flex-col w-full">
                      <div className="h-[200px] w-full mt-2">
                        <ChartContainer config={productMixConfig} className="h-full w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 10, bottom: 10 }}>
                              <Pie
                                data={productMixData}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                              >
                                {productMixData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[(index + 4) % COLORS.length]}
                                  />
                                ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                      <div className="mt-4 flex flex-col gap-2 px-2">
                        {productMixData.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <div
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{ backgroundColor: COLORS[(index + 4) % COLORS.length] }}
                            />
                            <span className="truncate" title={item.name}>
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-[250px] items-center justify-center text-sm text-muted-foreground">
                      Nenhum dado para o período.
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {hasAccess('dash_block_peak') && (
              <Card className="bg-glass border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Horários de Pico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[280px] w-full mt-4 pb-4">
                    <ChartContainer
                      config={{ count: { label: 'Agendamentos', color: 'hsl(var(--primary))' } }}
                      className="h-full w-full"
                    >
                      <AreaChart
                        data={peakData}
                        margin={{ left: 0, right: 20, top: 20, bottom: 10 }}
                      >
                        <defs>
                          <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-count)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--color-count)" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                          dataKey="hour"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={10}
                          minTickGap={10}
                        />
                        <YAxis tickLine={false} axisLine={false} width={40} tickMargin={5} />
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
            )}

            {hasAccess('dash_tab_overview') && (
              <Card className="bg-glass border-none w-full mt-4">
                <CardHeader className="pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                    DESEMPENHO DA EQUIPE
                  </CardTitle>
                  <div className="flex items-center gap-2 bg-muted p-1 rounded-md">
                    <button
                      onClick={() => setGaugeMetric('revenue')}
                      className={cn(
                        'px-3 py-1.5 text-xs font-medium rounded transition-colors',
                        gaugeMetric === 'revenue'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-background/50',
                      )}
                    >
                      Faturamento
                    </button>
                    <button
                      onClick={() => setGaugeMetric('attendance')}
                      className={cn(
                        'px-3 py-1.5 text-xs font-medium rounded transition-colors',
                        gaugeMetric === 'attendance'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-background/50',
                      )}
                    >
                      Atendimento
                    </button>
                    <button
                      onClick={() => setGaugeMetric('occupancy')}
                      className={cn(
                        'px-3 py-1.5 text-xs font-medium rounded transition-colors',
                        gaugeMetric === 'occupancy'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-background/50',
                      )}
                    >
                      Ocupação
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4 pb-6">
                    {barbers
                      .filter(
                        (b) => effectiveBarberFilter === 'all' || b.id === effectiveBarberFilter,
                      )
                      .map((barber) => {
                        const barberApts = completedPeriod.filter((a) => a.barber_id === barber.id)
                        const barberPurchases = productPurchasesPeriod.filter(
                          (p) => p.barber_id === barber.id,
                        )
                        const barberPackages = packagesPeriod.filter(
                          (pkg) => pkg.barber_id === barber.id,
                        )
                        const attendance = barberApts.length
                        const revenue =
                          barberApts.reduce(
                            (acc, a) =>
                              acc +
                              (a.client_package_id
                                ? 0
                                : a.price || a.expand?.service_id?.price || 0),
                            0,
                          ) +
                          barberPurchases.reduce((acc, p) => acc + (p.price_at_sale || 0), 0) +
                          barberPackages.reduce(
                            (acc, pkg) => acc + (pkg.expand?.package_id?.price || 0),
                            0,
                          )

                        const occupancy = getBarberOccupancy(barber.id)

                        const value =
                          gaugeMetric === 'revenue'
                            ? revenue
                            : gaugeMetric === 'occupancy'
                              ? occupancy
                              : attendance
                        const max =
                          gaugeMetric === 'revenue'
                            ? Math.max(5000, revenue * 1.2)
                            : gaugeMetric === 'occupancy'
                              ? 100
                              : Math.max(100, attendance * 1.2)
                        const percent = Math.min(value / (max || 1), 1)
                        const angle = percent * 180

                        const BARBER_GRADIENTS = [
                          { start: '#fdba74', end: '#ea580c' }, // orange
                          { start: '#93c5fd', end: '#2563eb' }, // blue
                          { start: '#6ee7b7', end: '#059669' }, // green
                          { start: '#d8b4fe', end: '#9333ea' }, // purple
                          { start: '#fca5a5', end: '#dc2626' }, // red
                          { start: '#fde047', end: '#ca8a04' }, // yellow
                        ]
                        const bIndex = barbers.findIndex((b) => b.id === barber.id)
                        const gradient = BARBER_GRADIENTS[bIndex % BARBER_GRADIENTS.length]
                        const endColor = barber.color || gradient.end
                        const startColor = barber.color ? barber.color : gradient.start
                        const startOpacity = barber.color ? 0.4 : 1

                        return (
                          <div
                            key={barber.id}
                            className="flex flex-col items-center justify-center p-4 border rounded-xl bg-card/50 cursor-pointer hover:bg-card/80 transition-colors"
                            onClick={() => setSelectedTeamMember(barber)}
                          >
                            <h4 className="font-semibold mb-4 text-center">{barber.name}</h4>
                            <svg
                              width="160"
                              height="80"
                              viewBox="0 0 160 80"
                              className="overflow-visible"
                            >
                              <defs>
                                <linearGradient
                                  id={`grad-${barber.id}`}
                                  x1="0%"
                                  y1="0%"
                                  x2="100%"
                                  y2="0%"
                                >
                                  <stop
                                    offset="0%"
                                    stopColor={startColor}
                                    stopOpacity={startOpacity}
                                  />
                                  <stop offset="100%" stopColor={endColor} stopOpacity={1} />
                                </linearGradient>
                              </defs>
                              <path
                                d="M 20 80 A 60 60 0 0 1 140 80"
                                fill="none"
                                stroke="currentColor"
                                className="text-muted/30"
                                strokeWidth="20"
                                strokeLinecap="round"
                              />
                              <path
                                d="M 20 80 A 60 60 0 0 1 140 80"
                                fill="none"
                                stroke={`url(#grad-${barber.id})`}
                                className="transition-all duration-1000 ease-out"
                                strokeWidth="20"
                                strokeLinecap="round"
                                strokeDasharray="188.5"
                                strokeDashoffset={188.5 - percent * 188.5}
                              />
                              <g
                                transform={`translate(80, 80) rotate(${angle - 90})`}
                                className="transition-all duration-1000 ease-out"
                              >
                                <polygon
                                  points="-4,0 4,0 0,-50"
                                  fill="currentColor"
                                  className="text-foreground"
                                />
                                <circle
                                  cx="0"
                                  cy="0"
                                  r="6"
                                  fill="currentColor"
                                  className="text-foreground"
                                />
                              </g>
                            </svg>
                            <div className="mt-4 text-center">
                              <div className="text-2xl font-bold">
                                {gaugeMetric === 'revenue'
                                  ? new Intl.NumberFormat('pt-BR', {
                                      style: 'currency',
                                      currency: 'BRL',
                                    }).format(value)
                                  : gaugeMetric === 'occupancy'
                                    ? `${value.toFixed(1)}%`
                                    : value}
                              </div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                                {gaugeMetric === 'revenue'
                                  ? 'Faturamento'
                                  : gaugeMetric === 'occupancy'
                                    ? 'Ocupação'
                                    : 'Atendimentos'}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {hasAccess('dash_block_forecast') && (
            <div className="grid grid-cols-1 gap-4 mt-4">
              <Card className="bg-glass border-none w-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                    Previsão de Recebimento
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div
                    className="space-y-1 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                    onClick={() => setForecastModal('tomorrow')}
                  >
                    <p className="text-xs text-muted-foreground">Amanhã</p>
                    {isLoading ? (
                      <div className="h-8 w-24 bg-muted animate-pulse rounded-md mt-1" />
                    ) : (
                      <p className="text-2xl font-bold text-primary">
                        R$ {predictedTomorrow.toFixed(2)}
                      </p>
                    )}
                  </div>
                  <div
                    className="space-y-1 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                    onClick={() => setForecastModal('week')}
                  >
                    <p className="text-xs text-muted-foreground">Restante da Semana</p>
                    {isLoading ? (
                      <div className="h-8 w-24 bg-muted animate-pulse rounded-md mt-1" />
                    ) : (
                      <p className="text-2xl font-bold text-primary">
                        R$ {predictedRestOfWeek.toFixed(2)}
                      </p>
                    )}
                  </div>
                  <div
                    className="space-y-1 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                    onClick={() => setForecastModal('month')}
                  >
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
          )}

          {hasAccess('dash_block_alerts') && (
            <div className="grid grid-cols-1 gap-4 mt-4">
              <Card className="bg-glass border-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                    Alertas
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  {birthdayClientsList.length > 0 && (
                    <div
                      className="flex items-center justify-between gap-3 bg-purple-500/10 text-purple-600 p-2 rounded-md cursor-pointer"
                      onClick={() => setAlertModal('birthdays')}
                    >
                      <div className="flex items-center gap-3">
                        <Gift className="size-5 shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">
                            {birthdayClientsList.length} aniversariantes em breve
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="size-4 opacity-50" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {activeTab === 'financial' && (
        <FinancialView
          completedPeriod={completedPeriod}
          productPurchasesPeriod={productPurchasesPeriod}
          packagesPeriod={packagesPeriod}
          commissions={commissionsPeriod}
          isAdmin={isAdmin}
          effectiveBarberFilter={effectiveBarberFilter}
          paymentMethods={paymentMethods}
          checkouts={checkouts}
          monthlyBillingData={monthlyBillingData}
          historyData={historyData}
          setHistoryModalDate={setHistoryModalDate}
          hasAccess={hasAccess}
        />
      )}
      {activeTab === 'packages' && <PackagesView packages={filteredPackages} />}

      <Dialog open={alertModal === 'stock'} onOpenChange={(v) => !v && setAlertModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Produtos com Estoque Baixo</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 w-full mt-4">
            <div className="overflow-x-auto">
              <Table className="min-w-[500px]">
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
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={alertModal === 'packages'} onOpenChange={(v) => !v && setAlertModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Pacotes com 1 uso restante</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 w-full mt-4">
            <div className="overflow-x-auto">
              <Table className="min-w-[500px]">
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
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={alertModal === 'birthdays'} onOpenChange={(v) => !v && setAlertModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Aniversariantes - Próximos 7 dias</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 w-full mt-4">
            <div className="overflow-x-auto">
              <Table className="min-w-[500px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Contato</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {birthdayClientsList.map((c) => {
                    const bDate = new Date(c.birthday)
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{format(bDate, 'dd/MM')}</TableCell>
                        <TableCell>
                          {c.name} {c.surname}
                        </TableCell>
                        <TableCell>{c.whatsapp || c.phone || '-'}</TableCell>
                      </TableRow>
                    )
                  })}
                  {birthdayClientsList.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                        Nenhum aniversariante.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={alertModal === 'tomorrow'} onOpenChange={(v) => !v && setAlertModal(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Agendamentos para Amanhã</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 w-full mt-4">
            <div className="overflow-x-auto">
              <Table className="min-w-[600px]">
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
                    const price = a.client_package_id
                      ? 0
                      : a.price || a.expand?.service_id?.price || 0
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
            </div>
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
          <ScrollArea className="flex-1 w-full mt-4">
            <div className="overflow-x-auto">
              {dashboardModal === 'revenue' && (
                <Table className="min-w-[600px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data e Hora</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Profissional</TableHead>
                      <TableHead>Método de Pagamento</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((t) => (
                      <TableRow key={t.id}>
                        <TableCell>{format(t.date, 'dd/MM/yyyy HH:mm')}</TableCell>
                        <TableCell>{t.client}</TableCell>
                        <TableCell>{t.barber}</TableCell>
                        <TableCell>{t.method}</TableCell>
                        <TableCell className="text-right">R$ {t.value.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    {transactions.length === 0 && (
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
                <Table className="min-w-[500px]">
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
                <Table className="min-w-[500px]">
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
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={!!historyModalDate} onOpenChange={(v) => !v && setHistoryModalDate(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              Vendas em{' '}
              {historyModalDate
                ? format(new Date(historyModalDate + 'T12:00:00'), 'dd/MM/yyyy')
                : ''}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 w-full mt-4">
            <div className="overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Profissional</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedPeriod
                    .filter(
                      (a) =>
                        (a.date ? a.date.substring(0, 10) : a.updated.substring(0, 10)) ===
                        historyModalDate,
                    )
                    .map((a) => (
                      <TableRow key={`hist_apt_${a.id}`}>
                        <TableCell>
                          {a.updated ? format(new Date(a.updated), 'dd/MM/yyyy HH:mm') : ''}
                        </TableCell>
                        <TableCell>{a.expand?.client_id?.name || 'Avulso'}</TableCell>
                        <TableCell>{a.expand?.service_id?.name || 'Serviço'}</TableCell>
                        <TableCell>{a.expand?.barber_id?.name || '-'}</TableCell>
                        <TableCell className="text-right text-emerald-500 font-medium">
                          R${' '}
                          {(a.client_package_id
                            ? 0
                            : a.price || a.expand?.service_id?.price || 0
                          ).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  {productPurchasesPeriod
                    .filter(
                      (p) =>
                        (p.date ? p.date.substring(0, 10) : p.created.substring(0, 10)) ===
                        historyModalDate,
                    )
                    .map((p) => (
                      <TableRow key={`hist_prod_${p.id}`}>
                        <TableCell>
                          {p.created ? format(new Date(p.created), 'dd/MM/yyyy HH:mm') : ''}
                        </TableCell>
                        <TableCell>{p.expand?.client_id?.name || 'Avulso'}</TableCell>
                        <TableCell>{p.expand?.product_id?.name || 'Produto'}</TableCell>
                        <TableCell>{p.expand?.barber_id?.name || '-'}</TableCell>
                        <TableCell className="text-right text-emerald-500 font-medium">
                          R$ {(p.price_at_sale || p.expand?.product_id?.price || 0).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  {packagesPeriod
                    .filter((pkg) => pkg.created.substring(0, 10) === historyModalDate)
                    .map((pkg) => (
                      <TableRow key={`hist_pkg_${pkg.id}`}>
                        <TableCell>
                          {pkg.created ? format(new Date(pkg.created), 'dd/MM/yyyy HH:mm') : ''}
                        </TableCell>
                        <TableCell>{pkg.expand?.client_id?.name || 'Avulso'}</TableCell>
                        <TableCell>{pkg.expand?.package_id?.name || 'Pacote'}</TableCell>
                        <TableCell>{pkg.expand?.barber_id?.name || '-'}</TableCell>
                        <TableCell className="text-right text-emerald-500 font-medium">
                          R$ {(pkg.expand?.package_id?.price || 0).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  {completedPeriod.filter(
                    (a) =>
                      (a.date ? a.date.substring(0, 10) : a.updated.substring(0, 10)) ===
                      historyModalDate,
                  ).length === 0 &&
                    productPurchasesPeriod.filter(
                      (p) =>
                        (p.date ? p.date.substring(0, 10) : p.created.substring(0, 10)) ===
                        historyModalDate,
                    ).length === 0 &&
                    packagesPeriod.filter(
                      (pkg) => pkg.created.substring(0, 10) === historyModalDate,
                    ).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                          Nenhuma venda registrada nesta data.
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedTeamMember} onOpenChange={(v) => !v && setSelectedTeamMember(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Vendas - {selectedTeamMember?.name}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 w-full mt-4">
            <div className="overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-center">Qtd</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(() => {
                    if (!selectedTeamMember) return null
                    const memberSales: any[] = []

                    completedPeriod
                      .filter((a) => a.barber_id === selectedTeamMember.id)
                      .forEach((a) => {
                        memberSales.push({
                          id: `apt_${a.id}`,
                          date: new Date(a.date ? a.date : a.updated),
                          client: a.expand?.client_id?.name || 'Avulso',
                          item: a.expand?.service_id?.name || 'Serviço',
                          qty: 1,
                          val: a.client_package_id
                            ? 0
                            : a.price || a.expand?.service_id?.price || 0,
                        })
                      })

                    productPurchasesPeriod
                      .filter((p) => p.barber_id === selectedTeamMember.id)
                      .forEach((p) => {
                        memberSales.push({
                          id: `prod_${p.id}`,
                          date: new Date(p.date ? p.date : p.created),
                          client: p.expand?.client_id?.name || 'Avulso',
                          item: p.expand?.product_id?.name || 'Produto',
                          qty: 1,
                          val: p.price_at_sale || p.expand?.product_id?.price || 0,
                        })
                      })

                    packagesPeriod
                      .filter((pkg) => pkg.barber_id === selectedTeamMember.id)
                      .forEach((pkg) => {
                        memberSales.push({
                          id: `pkg_${pkg.id}`,
                          date: new Date(pkg.created),
                          client: pkg.expand?.client_id?.name || 'Avulso',
                          item: pkg.expand?.package_id?.name || 'Pacote',
                          qty: 1,
                          val: pkg.expand?.package_id?.price || 0,
                        })
                      })

                    memberSales.sort((a, b) => b.date.getTime() - a.date.getTime())

                    return memberSales.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{format(sale.date, 'dd/MM/yyyy HH:mm')}</TableCell>
                        <TableCell>{sale.client}</TableCell>
                        <TableCell>{sale.item}</TableCell>
                        <TableCell className="text-center">{sale.qty}</TableCell>
                        <TableCell className="text-right font-medium text-emerald-500">
                          R$ {sale.val.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))
                  })()}
                  {selectedTeamMember &&
                    completedPeriod.filter((a) => a.barber_id === selectedTeamMember.id).length ===
                      0 &&
                    productPurchasesPeriod.filter((p) => p.barber_id === selectedTeamMember.id)
                      .length === 0 &&
                    packagesPeriod.filter((pkg) => pkg.barber_id === selectedTeamMember.id)
                      .length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                          Nenhuma venda encontrada para este profissional no período.
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={!!forecastModal} onOpenChange={(v) => !v && setForecastModal(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {forecastModal === 'tomorrow' && 'Previsão de Recebimento - Amanhã'}
              {forecastModal === 'week' && 'Previsão de Recebimento - Restante da Semana'}
              {forecastModal === 'month' && 'Previsão de Recebimento - Restante do Mês'}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-1 w-full mt-4">
            <div className="overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Serviço/Pacote</TableHead>
                    <TableHead>Profissional</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingAppointments
                    .filter((a) => {
                      const d = new Date(a.date)
                      if (forecastModal === 'tomorrow') return d >= tomorrow && d <= tomorrowEnd
                      if (forecastModal === 'week') return d > tomorrowEnd && d <= weekEnd
                      if (forecastModal === 'month') return d > tomorrowEnd && d <= monthEnd
                      return false
                    })
                    .map((a) => (
                      <TableRow key={a.id}>
                        <TableCell>
                          {a.date ? format(new Date(a.date), 'dd/MM/yyyy') : ''} {a.time}
                        </TableCell>
                        <TableCell>{a.expand?.client_id?.name || 'Avulso'}</TableCell>
                        <TableCell>
                          {a.expand?.client_package_id
                            ? a.expand.client_package_id.expand?.package_id?.name
                            : a.expand?.service_id?.name || '-'}
                        </TableCell>
                        <TableCell>{a.expand?.barber_id?.name || '-'}</TableCell>
                        <TableCell className="text-right font-medium text-emerald-500">
                          R$ {calcApptRevenue(a).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  {pendingAppointments.filter((a) => {
                    const d = new Date(a.date)
                    if (forecastModal === 'tomorrow') return d >= tomorrow && d <= tomorrowEnd
                    if (forecastModal === 'week') return d > tomorrowEnd && d <= weekEnd
                    if (forecastModal === 'month') return d > tomorrowEnd && d <= monthEnd
                    return false
                  }).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        Nenhum agendamento previsto para este período.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}
