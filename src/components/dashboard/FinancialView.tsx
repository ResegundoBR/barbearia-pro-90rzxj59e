import React, { useState, useEffect, useMemo } from 'react'
import { format, endOfWeek, endOfMonth } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { ChevronDown, ChevronUp, CalendarIcon, X } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import pb from '@/lib/pocketbase/client'

interface FinancialViewProps {
  commissions: any[]
  isAdmin: boolean
  onOpenAdvanceModal: () => void
}

interface TransactionGroup {
  id: string
  date: string
  created: string
  barber: any
  client: any
  type: string
  payment_method: string
  status: string
  grossAmount: number
  serviceAmount: number
  productAmount: number
  commissionAmount: number
  items: string[]
  commissions: any[]
}

export function FinancialView({ commissions, isAdmin, onOpenAdvanceModal }: FinancialViewProps) {
  const [transactions, setTransactions] = useState<TransactionGroup[]>([])
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

  const [date, setDate] = useState<{ from?: Date; to?: Date } | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  })
  const [statusFilter, setStatusFilter] = useState('all')

  const [grossRevenue, setGrossRevenue] = useState(0)
  const [futureRevenue, setFutureRevenue] = useState(0)
  const [futureApts, setFutureApts] = useState<any[]>([])
  const [modalType, setModalType] = useState<
    'comissoes' | 'adiantamentos' | 'totalLiquido' | 'recebimentos' | null
  >(null)
  const [forecastModal, setForecastModal] = useState<'tomorrow' | 'week' | 'month' | null>(null)

  const getForecastApts = (type: 'tomorrow' | 'week' | 'month') => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const endOfTomorrow = new Date(tomorrow)
    endOfTomorrow.setHours(23, 59, 59, 999)

    const endOfThisWeek = endOfWeek(today, { weekStartsOn: 0 })
    endOfThisWeek.setHours(23, 59, 59, 999)

    const endOfThisMonth = endOfMonth(today)
    endOfThisMonth.setHours(23, 59, 59, 999)

    return futureApts.filter((a) => {
      const datePart = a.date ? a.date.split(' ')[0] : ''
      if (!datePart) return false
      const [y, m, d] = datePart.split('-').map(Number)
      const aptDate = new Date(y, m - 1, d)

      if (type === 'tomorrow') {
        return aptDate.getTime() === tomorrow.getTime()
      } else if (type === 'week') {
        return aptDate > tomorrow && aptDate <= endOfThisWeek
      } else if (type === 'month') {
        return aptDate > tomorrow && aptDate <= endOfThisMonth
      }
      return false
    })
  }

  const calcForecast = (type: 'tomorrow' | 'week' | 'month') => {
    return getForecastApts(type).reduce(
      (acc, a) => acc + (a.price || a.expand?.service_id?.price || 0),
      0,
    )
  }

  const normalizedCommissions = useMemo(() => {
    return commissions.map((c) => {
      let effectiveStatus =
        c.payment_method === 'credito' ||
        c.payment_method === 'credit_card' ||
        c.payment_method === 'card'
          ? 'paid'
          : c.status
      if (effectiveStatus === 'available') effectiveStatus = 'pending'
      return { ...c, status: effectiveStatus }
    })
  }, [commissions])

  const filteredCommissions = useMemo(() => {
    return normalizedCommissions.filter((c) => {
      const cDate = new Date(c.date || c.created)
      let inRange = true
      if (date?.from) {
        if (date.to) {
          inRange = cDate >= date.from && cDate <= new Date(date.to.getTime() + 86400000)
        } else {
          inRange = cDate >= date.from
        }
      }
      let matchStatus = statusFilter === 'all' || c.status === statusFilter
      if (statusFilter !== 'all' && c.is_advance) {
        matchStatus = statusFilter === 'paid'
      }
      return inRange && matchStatus
    })
  }, [commissions, date, statusFilter])

  const totalAdvances = filteredCommissions
    .filter((c) => c.is_advance)
    .reduce((acc, c) => acc + c.amount, 0)

  const totalReceivables = filteredCommissions
    .filter((c) => !c.is_advance && c.status === 'pending')
    .reduce((acc, c) => acc + c.amount, 0)

  const netPayable = Math.max(0, totalReceivables - totalAdvances)

  const barberStats = filteredCommissions.reduce(
    (acc, c) => {
      const barberId = c.expand?.barber_id?.id || 'unknown'
      const barberName = c.expand?.barber_id?.name || 'Desconhecido'
      if (!acc[barberId]) {
        acc[barberId] = {
          name: barberName,
          servicesCount: 0,
          servicesTotal: 0,
          packagesCount: 0,
          packagesTotal: 0,
          productsCount: 0,
          productsTotal: 0,
          advances: 0,
          total: 0,
        }
      }
      if (c.is_advance) {
        acc[barberId].advances += c.amount
      } else {
        acc[barberId].total += c.amount
        if (c.type === 'service') {
          acc[barberId].servicesCount++
          acc[barberId].servicesTotal += c.amount
        } else if (c.type === 'product') {
          acc[barberId].productsCount++
          acc[barberId].productsTotal += c.amount
        } else {
          acc[barberId].packagesCount++
          acc[barberId].packagesTotal += c.amount
        }
      }
      return acc
    },
    {} as Record<string, any>,
  )

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const startStr = date?.from ? format(date.from, 'yyyy-MM-dd') + ' 00:00:00' : ''
        const endStr = date?.to ? format(date.to, 'yyyy-MM-dd') + ' 23:59:59' : ''

        let aptFilter = `status = 'Concluído'`
        let prodFilter = ''
        let futureAptFilter = `status != 'Concluído' && status != 'Cancelado' && date > "${new Date().toISOString().substring(0, 10)} 23:59:59"`

        if (startStr && endStr) {
          aptFilter += ` && date >= "${startStr}" && date <= "${endStr}"`
          prodFilter = `date >= "${startStr}" && date <= "${endStr}"`
        } else if (startStr) {
          aptFilter += ` && date >= "${startStr}"`
          prodFilter = `date >= "${startStr}"`
        }

        const [aptsRes, prodsRes, pkgsRes, futureAptsRes] = await Promise.all([
          pb
            .collection('appointments')
            .getFullList({ filter: aptFilter, expand: 'client_id,service_id,barber_id' }),
          pb
            .collection('product_purchases')
            .getFullList({ filter: prodFilter, expand: 'client_id,product_id,barber_id' }),
          pb.collection('client_packages').getFullList({
            filter: prodFilter ? prodFilter.replace(/date/g, 'created') : '',
            expand: 'client_id,package_id,barber_id',
          }),
          pb
            .collection('appointments')
            .getFullList({ filter: futureAptFilter, expand: 'service_id' }),
        ])

        const totalFuture = futureAptsRes.reduce(
          (acc, a) => acc + (a.price || a.expand?.service_id?.price || 0),
          0,
        )
        setFutureRevenue(totalFuture)
        setFutureApts(futureAptsRes)

        const groups: TransactionGroup[] = []
        const usedComms = new Set()

        for (const apt of aptsRes) {
          const aptTime = new Date(apt.updated).getTime()
          const prods = prodsRes.filter(
            (p) =>
              p.client_id === apt.client_id &&
              Math.abs(new Date(p.created).getTime() - aptTime) < 15000,
          )
          const comms = filteredCommissions.filter(
            (c) =>
              c.barber_id === apt.barber_id &&
              !c.is_advance &&
              Math.abs(new Date(c.created).getTime() - aptTime) < 15000,
          )

          comms.forEach((c) => usedComms.add(c.id))

          if (comms.length === 0 && statusFilter !== 'all') continue
          if (comms.length === 0 && date?.from && aptTime < date.from.getTime()) continue

          const serviceAmount = apt.price || 0
          const productAmount = prods.reduce((acc, p) => acc + (p.price_at_sale || 0), 0)
          const commissionAmount = comms.reduce((acc, c) => acc + (c.amount || 0), 0)
          const grossAmount = serviceAmount + productAmount

          const payment_method = comms[0]?.payment_method || '-'
          const status = comms[0]?.status || 'paid'

          if (statusFilter !== 'all' && status !== statusFilter) continue

          const items = [apt.expand?.service_id?.name || 'Serviço']
          prods.forEach((p) => items.push(p.expand?.product_id?.name || 'Produto'))

          groups.push({
            id: apt.id,
            date: apt.updated,
            created: apt.updated,
            barber: apt.expand?.barber_id,
            client: apt.expand?.client_id,
            type: 'service_checkout',
            payment_method,
            status,
            grossAmount,
            serviceAmount,
            productAmount,
            commissionAmount,
            items,
            commissions: comms,
          })
        }

        for (const pkg of pkgsRes) {
          const pkgTime = new Date(pkg.created).getTime()
          const comms = filteredCommissions.filter(
            (c) =>
              c.barber_id === pkg.barber_id &&
              !c.is_advance &&
              Math.abs(new Date(c.created).getTime() - pkgTime) < 15000,
          )

          comms.forEach((c) => usedComms.add(c.id))

          if (comms.length === 0 && statusFilter !== 'all') continue
          if (comms.length === 0 && date?.from && pkgTime < date.from.getTime()) continue

          const serviceAmount = pkg.expand?.package_id?.price || 0
          const commissionAmount = comms.reduce((acc, c) => acc + (c.amount || 0), 0)

          const payment_method = comms[0]?.payment_method || '-'
          const status = comms[0]?.status || 'paid'

          if (statusFilter !== 'all' && status !== statusFilter) continue

          groups.push({
            id: pkg.id,
            date: pkg.created,
            created: pkg.created,
            barber: pkg.expand?.barber_id,
            client: pkg.expand?.client_id,
            type: 'package_sale',
            payment_method,
            status,
            grossAmount: serviceAmount,
            serviceAmount,
            productAmount: 0,
            commissionAmount,
            items: [pkg.expand?.package_id?.name || 'Pacote'],
            commissions: comms,
          })
        }

        for (const comm of filteredCommissions) {
          if (usedComms.has(comm.id)) continue

          groups.push({
            id: comm.id,
            date: comm.date || comm.created,
            created: comm.created,
            barber: comm.expand?.barber_id,
            client: null,
            type: comm.is_advance ? 'advance' : 'commission_only',
            payment_method: comm.payment_method,
            status: comm.status,
            grossAmount: comm.is_advance ? -comm.amount : comm.amount,
            serviceAmount: 0,
            productAmount: 0,
            commissionAmount: comm.is_advance ? 0 : comm.amount,
            items: [
              comm.is_advance
                ? 'Adiantamento/Vale'
                : comm.type === 'service'
                  ? 'Serviço'
                  : comm.type === 'product'
                    ? 'Produto'
                    : 'Comissão',
            ],
            commissions: [comm],
          })
        }

        const sorted = groups.sort(
          (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
        )

        const calcGross = sorted
          .filter(
            (t) =>
              (t.type === 'service_checkout' || t.type === 'package_sale') && t.status === 'paid',
          )
          .reduce((acc, t) => acc + t.grossAmount, 0)
        setGrossRevenue(calcGross)

        setTransactions(sorted.slice(0, 100))
      } catch (err) {
        console.error('Error loading transactions', err)
      }
    }

    loadTransactions()
  }, [filteredCommissions, date, statusFilter])

  const translatePayment = (method: string) => {
    if (method === 'cash') return 'Dinheiro'
    if (method === 'credito') return 'Crédito'
    if (method === 'debito') return 'Débito'
    if (method === 'pix') return 'Pix'
    if (method === 'card') return 'Cartão'
    return method
  }

  const resetDateFilter = () => {
    setDate({
      from: new Date(new Date().setDate(new Date().getDate() - 30)),
      to: new Date(),
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="relative w-[280px]">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-card pr-8"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'dd/MM/yyyy')} - {format(date.to, 'dd/MM/yyyy')}
                      </>
                    ) : (
                      format(date.from, 'dd/MM/yyyy')
                    )
                  ) : (
                    <span>Selecione o período</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(range: any) => {
                    if (!range) {
                      setDate(undefined)
                    } else {
                      setDate({ from: range.from, to: range.to || range.from })
                    }
                  }}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            {date?.from && (
              <div
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full cursor-pointer z-10 text-muted-foreground"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setDate(undefined)
                }}
              >
                <X className="h-4 w-4" />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1 sm:ml-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const from = new Date()
                from.setHours(0, 0, 0, 0)
                const to = new Date()
                to.setHours(23, 59, 59, 999)
                setDate({ from, to })
              }}
            >
              Hoje
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const now = new Date()
                const from = new Date(now)
                from.setDate(now.getDate() - now.getDay())
                from.setHours(0, 0, 0, 0)
                const to = new Date(from)
                to.setDate(from.getDate() + 6)
                to.setHours(23, 59, 59, 999)
                setDate({ from, to })
              }}
            >
              Semana
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const now = new Date()
                const from = new Date(now.getFullYear(), now.getMonth(), 1)
                const to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
                setDate({ from, to })
              }}
            >
              Mês
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const now = new Date()
                const from = new Date(now.getFullYear(), 0, 1)
                const to = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)
                setDate({ from, to })
              }}
            >
              Ano
            </Button>
          </div>
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px] bg-card">
            <SelectValue placeholder="Filtrar por Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="paid">Pago</SelectItem>
            <SelectItem value="pending">A Vencer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card
          className="bg-glass border-none cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setModalType('recebimentos')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recebimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">R$ {grossRevenue.toFixed(2)}</div>
            <p className="text-[10px] text-muted-foreground">
              Faturamento bruto no período (Ver detalhes)
            </p>
          </CardContent>
        </Card>
        <Card className="bg-glass border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Previsão de Recebimento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div
              className="flex justify-between items-center text-sm cursor-pointer hover:bg-muted/50 p-1 rounded transition-colors"
              onClick={() => setForecastModal('tomorrow')}
            >
              <span className="text-muted-foreground text-xs">Amanhã</span>
              <span className="font-bold text-blue-500">
                R$ {calcForecast('tomorrow').toFixed(2)}
              </span>
            </div>
            <div
              className="flex justify-between items-center text-sm cursor-pointer hover:bg-muted/50 p-1 rounded transition-colors"
              onClick={() => setForecastModal('week')}
            >
              <span className="text-muted-foreground text-xs">Restante da Semana</span>
              <span className="font-bold text-blue-500">R$ {calcForecast('week').toFixed(2)}</span>
            </div>
            <div
              className="flex justify-between items-center text-sm cursor-pointer hover:bg-muted/50 p-1 rounded transition-colors"
              onClick={() => setForecastModal('month')}
            >
              <span className="text-muted-foreground text-xs">Restante do Mês</span>
              <span className="font-bold text-blue-500">R$ {calcForecast('month').toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        <Card
          className="bg-glass border-none cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setModalType('comissoes')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Comissão a Pagar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              R$ {totalReceivables.toFixed(2)}
            </div>
            <p className="text-[10px] text-muted-foreground">
              Total bruto a repassar (Ver detalhes)
            </p>
          </CardContent>
        </Card>
        <Card
          className="bg-glass border-none cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setModalType('adiantamentos')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Adiantamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">R$ {totalAdvances.toFixed(2)}</div>
            <p className="text-[10px] text-muted-foreground">Vales já pagos (Ver detalhes)</p>
          </CardContent>
        </Card>
        <Card
          className="bg-glass border-none cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setModalType('totalLiquido')}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Líquido a Pagar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">R$ {netPayable.toFixed(2)}</div>
            <p className="text-[10px] text-muted-foreground">
              Valor final deduzido de vales (Ver repasses)
            </p>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!forecastModal} onOpenChange={(o) => !o && setForecastModal(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Previsão de Recebimento -{' '}
              {forecastModal === 'tomorrow'
                ? 'Amanhã'
                : forecastModal === 'week'
                  ? 'Restante da Semana'
                  : 'Restante do Mês'}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto mt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data / Hora</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Serviço/Pacote</TableHead>
                  <TableHead className="text-right">Valor Esperado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {forecastModal &&
                  getForecastApts(forecastModal).map((apt) => (
                    <TableRow key={apt.id}>
                      <TableCell>
                        {apt.date
                          ? format(new Date(apt.date.split(' ')[0] + 'T00:00:00'), 'dd/MM/yyyy')
                          : ''}{' '}
                        {apt.time}
                      </TableCell>
                      <TableCell>{apt.expand?.client_id?.name || 'Avulso'}</TableCell>
                      <TableCell>{apt.expand?.service_id?.name || 'Serviço'}</TableCell>
                      <TableCell className="text-right font-bold text-blue-500">
                        R$ {(apt.price || apt.expand?.service_id?.price || 0).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                {forecastModal && getForecastApts(forecastModal).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      Nenhum agendamento encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!modalType} onOpenChange={(o) => !o && setModalType(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {modalType === 'comissoes' && 'Comissões a Pagar (Detalhado)'}
              {modalType === 'adiantamentos' && 'Adiantamentos Registrados (Detalhado)'}
              {modalType === 'totalLiquido' && 'Repasses Agendados por Profissional'}
              {modalType === 'recebimentos' && 'Recebimentos (Detalhado)'}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto mt-2">
            {modalType === 'comissoes' && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data Serv/Venda</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Profissional</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCommissions
                    .filter((c) => !c.is_advance)
                    .map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>{format(new Date(c.date || c.created), 'dd/MM/yyyy')}</TableCell>
                        <TableCell>
                          {c.due_date
                            ? format(new Date(c.due_date), 'dd/MM/yyyy')
                            : c.expand?.barber_id?.payment_schedule_config?.days
                              ? format(
                                  new Date(
                                    new Date(c.date || c.created).getTime() +
                                      c.expand.barber_id.payment_schedule_config.days * 86400000,
                                  ),
                                  'dd/MM/yyyy',
                                )
                              : '-'}
                        </TableCell>
                        <TableCell className="font-medium">
                          {c.expand?.barber_id?.name || '-'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={c.status === 'paid' ? 'default' : 'secondary'}>
                            {c.status === 'paid' ? 'Pago' : 'A Vencer'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right text-emerald-500 font-bold">
                          R$ {c.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  {filteredCommissions.filter((c) => !c.is_advance).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        Nenhuma comissão encontrada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
            {modalType === 'recebimentos' && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Itens</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions
                    .filter((t) => t.type === 'service_checkout' || t.type === 'package_sale')
                    .map((t) => (
                      <TableRow key={t.id}>
                        <TableCell>
                          {format(new Date(t.date || t.created), 'dd/MM/yyyy HH:mm')}
                        </TableCell>
                        <TableCell>{t.client?.name || 'Avulso'}</TableCell>
                        <TableCell>{t.items.join(', ')}</TableCell>
                        <TableCell className="capitalize">
                          {translatePayment(t.payment_method)}
                        </TableCell>
                        <TableCell className="text-right text-emerald-500 font-bold">
                          R$ {t.grossAmount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  {transactions.filter(
                    (t) => t.type === 'service_checkout' || t.type === 'package_sale',
                  ).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        Nenhum recebimento registrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
            {modalType === 'adiantamentos' && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Profissional</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead className="text-right">Valor Deduzido</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCommissions
                    .filter((c) => c.is_advance)
                    .map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>{format(new Date(c.date || c.created), 'dd/MM/yyyy')}</TableCell>
                        <TableCell className="font-medium">
                          {c.expand?.barber_id?.name || '-'}
                        </TableCell>
                        <TableCell className="capitalize">
                          {translatePayment(c.payment_method)}
                        </TableCell>
                        <TableCell className="text-right text-red-500 font-bold">
                          - R$ {c.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  {filteredCommissions.filter((c) => c.is_advance).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6">
                        Nenhum adiantamento registrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
            {modalType === 'totalLiquido' && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Profissional</TableHead>
                    <TableHead className="text-right">Total Comissões</TableHead>
                    <TableHead className="text-right">Total Adiantamentos (-)</TableHead>
                    <TableHead className="text-right">Líquido a Pagar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.values(barberStats)
                    .filter((s: any) => s.total - s.advances > 0)
                    .map((s: any) => (
                      <TableRow key={s.name}>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell className="text-right text-emerald-500">
                          R$ {s.total.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right text-red-500">
                          - R$ {s.advances.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-bold text-primary">
                          R$ {(s.total - s.advances).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  {Object.values(barberStats).filter((s: any) => s.total - s.advances > 0)
                    .length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6">
                        Nenhum repasse agendado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between items-center mt-6">
        <h3 className="text-lg font-semibold">Histórico de Transações</h3>
        {isAdmin && (
          <Button onClick={onOpenAdvanceModal} variant="outline">
            Registrar Vale
          </Button>
        )}
      </div>

      <Card className="bg-glass border-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"></TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Cliente / Profissional</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valores</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <React.Fragment key={t.id}>
                  <TableRow
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleRow(t.id)}
                  >
                    <TableCell className="w-10">
                      {t.type !== 'advance' && (
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          {expandedRows[t.id] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>{format(new Date(t.date), 'dd/MM/yyyy HH:mm')}</TableCell>
                    <TableCell>
                      <div className="font-medium">{t.client?.name || 'Avulso'}</div>
                      <div className="text-xs text-muted-foreground">{t.barber?.name || '-'}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm truncate max-w-[150px]">{t.items.join(', ')}</div>
                    </TableCell>
                    <TableCell className="capitalize">
                      {translatePayment(t.payment_method)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={t.status === 'paid' ? 'default' : 'secondary'}>
                        {t.status === 'pending' ? 'A Vencer' : 'Pago'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {t.type === 'advance' ? (
                        <span className="text-red-500 font-medium">
                          - R$ {Math.abs(t.grossAmount).toFixed(2)}
                        </span>
                      ) : (
                        <div className="flex flex-col items-end">
                          <span className="text-emerald-500 font-bold">
                            R$ {t.grossAmount.toFixed(2)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Comissão: R$ {t.commissionAmount.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                  {expandedRows[t.id] && t.type !== 'advance' && (
                    <TableRow className="bg-muted/30">
                      <TableCell colSpan={7} className="p-0 border-b">
                        <div className="flex flex-wrap items-center justify-between p-4 text-sm gap-4">
                          <div className="flex flex-col">
                            <span className="text-muted-foreground text-xs">Serviços/Pacotes</span>
                            <span className="font-medium">R$ {t.serviceAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-muted-foreground text-xs">Produtos</span>
                            <span className="font-medium">R$ {t.productAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-muted-foreground text-xs">
                              Comissão Profissional
                            </span>
                            <span className="font-medium">R$ {t.commissionAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-muted-foreground text-xs">Total da Venda</span>
                            <span className="font-bold text-emerald-500">
                              R$ {t.grossAmount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
              {transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    Nenhuma transação encontrada no período e filtros selecionados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold uppercase">Comissões Filtradas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(barberStats).map((stats: any) => (
            <Card key={stats.name} className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold">{stats.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serviços ({stats.servicesCount})</span>
                  <span>R$ {stats.servicesTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pacotes ({stats.packagesCount})</span>
                  <span>R$ {stats.packagesTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b pb-2 border-border/50">
                  <span className="text-muted-foreground">Produtos ({stats.productsCount})</span>
                  <span>R$ {stats.productsTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-1">
                  <span>Total</span>
                  <span>R$ {stats.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Adiantamentos</span>
                  <span>- R$ {stats.advances.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-500 pt-2 border-t border-border/50">
                  <span>Total Líquido</span>
                  <span>R$ {(stats.total - stats.advances).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          {Object.keys(barberStats).length === 0 && (
            <div className="text-muted-foreground text-sm col-span-full">
              Nenhuma comissão registrada.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
