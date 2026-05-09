import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, DollarSign, Printer, CalendarIcon, Trash } from 'lucide-react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  subDays,
  startOfDay,
  endOfDay,
} from 'date-fns'
import { getBarbers, createBarber } from '@/services/barbers'
import {
  getCommissions,
  getAppointments,
  getProductPurchases,
  getClientPackages,
} from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import type { DateRange } from 'react-day-picker'

export default function Staff() {
  const [barbers, setBarbers] = useState<any[]>([])
  const [commissions, setCommissions] = useState<any[]>([])

  const [dateFilter, setDateFilter] = useState('this_month')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const [bDialog, setBDialog] = useState(false)
  const [selectedBarberDetailed, setSelectedBarberDetailed] = useState<any>(null)
  const [reportItems, setReportItems] = useState<any[]>([])

  const [form, setForm] = useState<any>({
    name: '',
    commission_type: 'percentage',
    commission_value: 0,
    color: '#3b82f6',
    work_level: 'autonomo',
    payment_schedule_config: { rules: [] },
  })

  const { toast } = useToast()

  const loadData = async () => {
    setBarbers(await getBarbers())
    setCommissions(await getCommissions())
  }

  useEffect(() => {
    loadData()
  }, [])

  const getRange = () => {
    const today = new Date()
    switch (dateFilter) {
      case 'this_month':
        return { from: startOfMonth(today), to: endOfMonth(today) }
      case 'this_week':
        return { from: startOfWeek(today), to: endOfWeek(today) }
      case 'last_30':
        return { from: subDays(today, 30), to: endOfDay(today) }
      case 'last_7':
        return { from: subDays(today, 7), to: endOfDay(today) }
      case 'all_time':
        return { from: new Date(0), to: new Date(2100, 1, 1) }
      case 'custom':
        return dateRange && dateRange.from
          ? {
              from: startOfDay(dateRange.from),
              to: dateRange.to ? endOfDay(dateRange.to) : endOfDay(dateRange.from),
            }
          : { from: new Date(0), to: new Date(2100, 1, 1) }
      default:
        return { from: startOfMonth(today), to: endOfMonth(today) }
    }
  }

  const range = getRange()

  const filteredCommissions = commissions.filter((c) => {
    const d = c.date ? new Date(c.date) : new Date(c.created)
    return d >= range.from && d <= range.to
  })

  const openDetailedReport = async (b: any) => {
    setSelectedBarberDetailed(b)
    try {
      const apts = await getAppointments(`barber_id='${b.id}' && status='Concluído'`)
      const prods = await getProductPurchases(`barber_id='${b.id}'`)
      const packs = await getClientPackages(`barber_id='${b.id}'`)

      const matchedComms = commissions.filter((c) => c.barber_id === b.id && !c.is_advance)

      const items = [
        ...apts.map((a) => {
          const c = matchedComms.find(
            (cm) =>
              cm.type === 'service' &&
              Math.abs(new Date(cm.created).getTime() - new Date(a.updated).getTime()) < 15000,
          )
          return {
            id: a.id,
            type: 'Serviço',
            client: a.expand?.client_id?.name || 'Avulso',
            item: a.expand?.service_id?.name || 'Serviço',
            date: a.date ? new Date(a.date) : new Date(a.updated),
            time: a.time || format(new Date(a.updated), 'HH:mm'),
            packageUsed: !!a.client_package_id,
            price: a.price || a.expand?.service_id?.price || 0,
            commission: c?.amount || 0,
            status: c ? c.status : 'none',
            commDate: c?.date ? new Date(c.date) : new Date(a.updated),
          }
        }),
        ...prods.map((p) => {
          const c = matchedComms.find(
            (cm) =>
              cm.type === 'product' &&
              Math.abs(new Date(cm.created).getTime() - new Date(p.created).getTime()) < 15000,
          )
          return {
            id: p.id,
            type: 'Produto',
            client: p.expand?.client_id?.name || 'Avulso',
            item: p.expand?.product_id?.name || 'Produto',
            date: p.date ? new Date(p.date) : new Date(p.created),
            time: format(new Date(p.created), 'HH:mm'),
            packageUsed: false,
            price: p.price_at_sale || 0,
            commission: c?.amount || 0,
            status: c ? c.status : 'none',
            commDate: c?.date ? new Date(c.date) : new Date(p.created),
          }
        }),
        ...packs.map((pk) => {
          const c = matchedComms.find(
            (cm) =>
              cm.type === 'package_sale' &&
              Math.abs(new Date(cm.created).getTime() - new Date(pk.created).getTime()) < 15000,
          )
          return {
            id: pk.id,
            type: 'Pacote',
            client: pk.expand?.client_id?.name || 'Avulso',
            item: pk.expand?.package_id?.name || 'Pacote',
            date: new Date(pk.created),
            time: format(new Date(pk.created), 'HH:mm'),
            packageUsed: false,
            price: pk.expand?.package_id?.price || 0,
            commission: c?.amount || 0,
            status: c ? c.status : 'none',
            commDate: c?.date ? new Date(c.date) : new Date(pk.created),
          }
        }),
      ]
        .filter((i) => {
          if (i.commission <= 0) return false
          const d = i.commDate
          return d >= range.from && d <= range.to
        })
        .sort((a, b) => b.commDate.getTime() - a.commDate.getTime())

      setReportItems(items)
    } catch (e) {
      toast({ title: 'Erro ao carregar detalhes', variant: 'destructive' })
    }
  }

  const printReport = () => {
    const content = document.getElementById('printable-report')?.innerHTML
    if (!content) return
    const win = window.open('', '', 'width=900,height=650')
    if (win) {
      win.document.write(`
        <html>
          <head>
            <title>Relatório Detalhado de Comissões</title>
            <style>
              body { font-family: sans-serif; padding: 20px; color: #333; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f4f4f4; }
              .text-right { text-align: right; }
              .font-bold { font-weight: bold; }
              .header { margin-bottom: 20px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
              .summary { display: flex; justify-content: space-between; margin-top: 20px; font-size: 16px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>Relatório Detalhado - ${selectedBarberDetailed?.name}</h2>
              <p>Período selecionado: ${format(range.from, 'dd/MM/yyyy')} a ${format(range.to, 'dd/MM/yyyy')}</p>
              <p>Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
            </div>
            ${content}
          </body>
        </html>
      `)
      win.document.close()
      win.focus()
      setTimeout(() => {
        win.print()
        win.close()
      }, 250)
    }
  }

  const openBarber = () => {
    setForm({
      name: '',
      commission_type: 'percentage',
      commission_value: 0,
      color: '#3b82f6',
      work_level: 'autonomo',
      payment_schedule_config: { rules: [] },
    })
    setBDialog(true)
  }

  const editBarber = (b: any) => {
    setForm({
      id: b.id,
      name: b.name,
      commission_type: b.commission_type || 'percentage',
      commission_value: b.commission_value || 0,
      color: b.color || '#3b82f6',
      work_level: b.work_level || 'autonomo',
      payment_schedule_config: b.payment_schedule_config || { rules: [] },
    })
    setBDialog(true)
  }

  const DAYS = [
    { value: 0, label: 'Dom' },
    { value: 1, label: 'Seg' },
    { value: 2, label: 'Ter' },
    { value: 3, label: 'Qua' },
    { value: 4, label: 'Qui' },
    { value: 5, label: 'Sex' },
    { value: 6, label: 'Sáb' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (form.id) {
        await updateBarber(form.id, form)
        toast({ title: 'Profissional atualizado!' })
      } else {
        await createBarber(form)
        toast({ title: 'Profissional salvo!' })
      }
      setBDialog(false)
      loadData()
    } catch {
      toast({ title: 'Erro', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Equipes & Comissões</h2>
        <p className="text-muted-foreground">
          Gestão de profissionais e acompanhamento de comissões.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={dateFilter === 'all_time' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateFilter('all_time')}
          >
            Período Todo
          </Button>
          <Button
            variant={dateFilter === 'this_month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateFilter('this_month')}
          >
            Este mês
          </Button>
          <Button
            variant={dateFilter === 'this_week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateFilter('this_week')}
          >
            Esta semana
          </Button>
          <Button
            variant={dateFilter === 'last_30' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateFilter('last_30')}
          >
            Últimos 30 dias
          </Button>
          <Button
            variant={dateFilter === 'last_7' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDateFilter('last_7')}
          >
            Últimos 7 dias
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={dateFilter === 'custom' ? 'default' : 'outline'}
                size="sm"
                className="gap-2"
              >
                <CalendarIcon className="size-4" />
                {dateFilter === 'custom' && dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'dd/MM/yy')} - {format(dateRange.to, 'dd/MM/yy')}
                    </>
                  ) : (
                    format(dateRange.from, 'dd/MM/yy')
                  )
                ) : (
                  'Intervalo'
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range as any)
                  setDateFilter('custom')
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button onClick={openBarber}>
          <Plus className="size-4 mr-2" /> Adicionar Profissional
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Pagos (Total)</TableHead>
                <TableHead>Comissão Disponível</TableHead>
                <TableHead>Comissão a Receber</TableHead>
                <TableHead>Total a Receber</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {barbers.map((b) => {
                const bComms = filteredCommissions.filter((c) => c.barber_id === b.id)
                const paid = bComms
                  .filter((c) => c.status === 'paid')
                  .reduce((acc, c) => acc + (c.amount || 0), 0)
                const available = bComms
                  .filter((c) => c.status === 'available')
                  .reduce((acc, c) => acc + (c.amount || 0), 0)
                const pending = bComms
                  .filter((c) => c.status === 'pending')
                  .reduce((acc, c) => acc + (c.amount || 0), 0)
                const totalReceber = available + pending
                return (
                  <TableRow key={b.id}>
                    <TableCell
                      className="font-medium cursor-pointer hover:underline text-blue-600"
                      onClick={() => editBarber(b)}
                      title="Clique para editar"
                    >
                      {b.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant={b.work_level === 'socio' ? 'default' : 'outline'}>
                        {b.work_level === 'socio' ? 'Sócio' : 'Autônomo'}
                      </Badge>
                    </TableCell>
                    <TableCell>R$ {paid.toFixed(2)}</TableCell>
                    <TableCell className="text-emerald-600 font-medium">
                      R$ {available.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-amber-500 font-medium">
                      R$ {pending.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-primary font-bold">
                      R$ {totalReceber.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDetailedReport(b)}
                        title="Relatório Detalhado"
                      >
                        <DollarSign className="size-4 text-emerald-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
              {barbers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    Nenhum profissional encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedBarberDetailed}
        onOpenChange={(v) => !v && setSelectedBarberDetailed(null)}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>Relatório Detalhado - {selectedBarberDetailed?.name}</DialogTitle>
            <Button variant="outline" size="sm" onClick={printReport} className="mr-4">
              <Printer className="size-4 mr-2" /> Gerar PDF
            </Button>
          </DialogHeader>
          <div className="overflow-auto flex-1 mt-4 p-1">
            <div id="printable-report">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Valor Venda</TableHead>
                    <TableHead className="text-right">Comissão</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportItems.map((item, i) => (
                    <TableRow key={`${item.id}-${i}`}>
                      <TableCell>
                        {format(item.date, 'dd/MM/yyyy')} às {item.time}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            item.type === 'Serviço'
                              ? 'bg-blue-100 text-blue-800 border-blue-200'
                              : item.type === 'Produto'
                                ? 'bg-purple-100 text-purple-800 border-purple-200'
                                : 'bg-gray-100 text-gray-800 border-gray-200'
                          }
                        >
                          {item.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.item}</TableCell>
                      <TableCell>{item.client}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === 'paid'
                              ? 'default'
                              : item.status === 'available'
                                ? 'outline'
                                : 'secondary'
                          }
                        >
                          {item.status === 'paid'
                            ? 'Pago'
                            : item.status === 'available'
                              ? 'Disponível'
                              : item.status === 'pending'
                                ? 'A Receber'
                                : '-'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">R$ {item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-semibold text-emerald-600">
                        R$ {item.commission.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {reportItems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Nenhuma comissão registrada para este período.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {reportItems.length > 0 && (
                <div className="summary flex flex-col gap-2 mt-6">
                  <div className="flex justify-between items-center text-lg">
                    <span>Total de Comissões no Período:</span>
                    <span className="text-primary font-bold">
                      R$ {reportItems.reduce((acc, curr) => acc + curr.commission, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Comissão Disponível:</span>
                    <span className="text-emerald-600 font-semibold">
                      R${' '}
                      {reportItems
                        .filter((i) => i.status === 'available')
                        .reduce((acc, curr) => acc + curr.commission, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Comissão a Receber:</span>
                    <span className="text-amber-500 font-semibold">
                      R${' '}
                      {reportItems
                        .filter((i) => i.status === 'pending')
                        .reduce((acc, curr) => acc + curr.commission, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="mt-4 border-t pt-4">
            <Button variant="ghost" onClick={() => setSelectedBarberDetailed(null)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={bDialog} onOpenChange={setBDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Profissional</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Nível de Trabalho</Label>
              <Select
                value={form.work_level}
                onValueChange={(v) => setForm({ ...form, work_level: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="autonomo">Autônomo (Comissionado)</SelectItem>
                  <SelectItem value="socio">Sócio (100% Repasse)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.work_level !== 'socio' && (
              <>
                <div className="space-y-2">
                  <Label>Tipo Comissão Padrão</Label>
                  <Select
                    value={form.commission_type}
                    onValueChange={(v) => setForm({ ...form, commission_type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                      <SelectItem value="fixed">Fixo (R$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Valor</Label>
                  <Input
                    type="number"
                    required
                    value={form.commission_value}
                    onChange={(e) => setForm({ ...form, commission_value: Number(e.target.value) })}
                  />
                </div>
              </>
            )}

            <div className="space-y-2 pt-2 border-t">
              <Label className="text-base font-semibold">Ciclos de Pagamento</Label>
              <p className="text-xs text-muted-foreground mb-2">
                Configure regras específicas de dias da semana para o repasse.
              </p>
              {form.payment_schedule_config?.rules?.map((rule: any, i: number) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 p-3 border rounded-md bg-slate-50 dark:bg-slate-900"
                >
                  <div className="space-y-1">
                    <Label className="text-xs font-medium">
                      Dias trabalhados (Vendas/Serviços):
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {DAYS.map((d) => (
                        <label
                          key={d.value}
                          className="flex items-center gap-1 text-sm cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            className="rounded"
                            checked={rule.days.includes(d.value)}
                            onChange={(e) => {
                              const newRules = [...form.payment_schedule_config.rules]
                              if (e.target.checked) newRules[i].days.push(d.value)
                              else
                                newRules[i].days = newRules[i].days.filter(
                                  (x: any) => x !== d.value,
                                )
                              setForm({ ...form, payment_schedule_config: { rules: newRules } })
                            }}
                          />
                          {d.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <div className="flex items-center gap-2">
                      <Label className="text-xs font-medium">Pagar na:</Label>
                      <Select
                        value={rule.payDay.toString()}
                        onValueChange={(v) => {
                          const newRules = [...form.payment_schedule_config.rules]
                          newRules[i].payDay = Number(v)
                          setForm({ ...form, payment_schedule_config: { rules: newRules } })
                        }}
                      >
                        <SelectTrigger className="w-[120px] h-8 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {DAYS.map((d) => (
                            <SelectItem key={d.value} value={d.value.toString()}>
                              {d.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newRules = form.payment_schedule_config.rules.filter(
                          (_: any, idx: number) => idx !== i,
                        )
                        setForm({ ...form, payment_schedule_config: { rules: newRules } })
                      }}
                      title="Remover regra"
                    >
                      <Trash className="size-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full mt-2 border-dashed"
                onClick={() => {
                  setForm({
                    ...form,
                    payment_schedule_config: {
                      ...form.payment_schedule_config,
                      rules: [
                        ...(form.payment_schedule_config?.rules || []),
                        { days: [], payDay: 1 },
                      ],
                    },
                  })
                }}
              >
                <Plus className="size-4 mr-2" /> Adicionar Regra de Ciclo
              </Button>
            </div>
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
