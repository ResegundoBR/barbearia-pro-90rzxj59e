import { useEffect, useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
  DialogDescription,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Plus,
  DollarSign,
  Printer,
  CalendarIcon,
  Trash,
  Wallet,
  Copy,
  CheckCircle2,
  Receipt,
  RefreshCw,
} from 'lucide-react'
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
import { getBarbers, createBarber, updateBarber } from '@/services/barbers'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import {
  getCommissions,
  getAppointments,
  getProductPurchases,
  getClientPackages,
  getPaymentMethods,
} from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { usePermissions } from '@/hooks/use-permissions'
import { useRealtime } from '@/hooks/use-realtime'
import pb from '@/lib/pocketbase/client'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import type { DateRange } from 'react-day-picker'

const WEEK_DAYS = [
  { value: 0, label: 'Dom' },
  { value: 1, label: 'Seg' },
  { value: 2, label: 'Ter' },
  { value: 3, label: 'Qua' },
  { value: 4, label: 'Qui' },
  { value: 5, label: 'Sex' },
  { value: 6, label: 'Sáb' },
]

export default function Staff() {
  const { hasAccess } = usePermissions()
  const canEdit = hasAccess('staff_edit')

  const [barbers, setBarbers] = useState<any[]>([])
  const [commissions, setCommissions] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [commissionRules, setCommissionRules] = useState<any[]>([])

  const [dateFilter, setDateFilter] = useState('this_month')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const [bDialog, setBDialog] = useState(false)
  const [selectedBarberDetailed, setSelectedBarberDetailed] = useState<any>(null)
  const [reportItems, setReportItems] = useState<any[]>([])

  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [ticketItem, setTicketItem] = useState<any>(null)

  const [payDialog, setPayDialog] = useState(false)
  const [barberToPay, setBarberToPay] = useState<any>(null)
  const [pendingCommsToPay, setPendingCommsToPay] = useState<any[]>([])
  const [selectedComms, setSelectedComms] = useState<string[]>([])
  const [paymentMethod, setPaymentMethod] = useState<string>('pix')
  const [isPaying, setIsPaying] = useState(false)
  const [receiptDialog, setReceiptDialog] = useState(false)
  const [paymentReceipt, setPaymentReceipt] = useState<{ url: string; text: string } | null>(null)
  const [paymentReceiptDetails, setPaymentReceiptDetails] = useState<any>(null)
  const [businessName, setBusinessName] = useState('Barbearia Pro')
  const [copied, setCopied] = useState(false)
  const [isReconciling, setIsReconciling] = useState(false)

  const [form, setForm] = useState<any>({
    name: '',
    work_level: 'autonomo',
    payment_schedule_config: {
      frequency: 'semanal',
      cycles: [
        { workDays: [1, 2, 3], paymentDay: 4 },
        { workDays: [4, 5, 6], paymentDay: 1 },
      ],
    },
  })

  const getNextPayDate = (date: Date, config?: any) => {
    const day = date.getDay()
    let frequency = 'semanal'
    let cycles = [
      { workDays: [1, 2, 3], paymentDay: 4 },
      { workDays: [4, 5, 6], paymentDay: 1 },
      { workDays: [0], paymentDay: 1 },
    ]

    if (config && config.cycles && config.cycles.length > 0) {
      frequency = config.frequency || 'semanal'
      cycles = config.cycles
    }

    let activeCycle = cycles.find((c: any) => c.workDays.includes(day))
    if (!activeCycle) {
      activeCycle = { workDays: [day], paymentDay: (day + 7) % 7 || 1 }
    }

    const pDay = activeCycle.paymentDay
    let daysToAdd = (pDay - day + 7) % 7
    if (daysToAdd === 0) daysToAdd = 7

    const d = new Date(date)
    d.setDate(d.getDate() + daysToAdd)

    if (frequency === 'quinzenal') {
      d.setDate(d.getDate() + 7)
    }

    return d
  }

  const { toast } = useToast()

  const loadData = async () => {
    setBarbers(await getBarbers())
    setCommissions(await getCommissions())
    try {
      setPaymentMethods(await getPaymentMethods())
      setServices(await pb.collection('services').getFullList({ expand: 'category_id' }))
      setProducts(await pb.collection('products').getFullList({ expand: 'category_id' }))
      setPackages(await pb.collection('packages').getFullList())
      setCommissionRules(await pb.collection('commission_rules').getFullList())
    } catch {
      /* intentionally ignored */
    }
    try {
      const settings = await pb.collection('settings').getFirstListItem(`key='business_info'`)
      if (settings && settings.value && settings.value.name) {
        setBusinessName(settings.value.name)
      }
    } catch (e) {
      // Ignorar se não houver
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('barbers', loadData)
  useRealtime('commissions', loadData)
  useRealtime('appointments', loadData)

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

  const getCommissionInfo = (type: string, itemId: string, barberId: string) => {
    let rule = commissionRules.find(
      (r) =>
        r.barber_id === barberId &&
        (r.item_type === type || (type === 'package_sale' && r.item_type === 'package')) &&
        r.item_id === itemId,
    )
    if (!rule)
      rule = commissionRules.find(
        (r) =>
          !r.barber_id &&
          (r.item_type === type || (type === 'package_sale' && r.item_type === 'package')) &&
          r.item_id === itemId,
      )
    if (rule) return { type: rule.type, value: rule.value }

    let svcRate = 0
    let catRate = 0

    if (type === 'service') {
      const svc = services.find((s) => s.id === itemId)
      svcRate = svc?.commission_rate || 0
      catRate = svc?.expand?.category_id?.commission_percentage || 0
    } else if (type === 'product') {
      const prod = products.find((p) => p.id === itemId)
      catRate = prod?.expand?.category_id?.commission_percentage || 0
    } else if (type === 'package' || type === 'package_sale') {
      const pkg = packages.find((p) => p.id === itemId)
      const svc = services.find((s) => s.id === pkg?.service_id)
      svcRate = svc?.commission_rate || 0
      catRate = svc?.expand?.category_id?.commission_percentage || 0
    }

    if (svcRate > 0) return { type: 'percentage', value: svcRate }
    return { type: 'percentage', value: catRate }
  }

  const openDetailedReport = async (b: any) => {
    setSelectedBarberDetailed(b)
    try {
      const apts = await getAppointments(`barber_id='${b.id}' && status='Concluído'`)
      const prods = await getProductPurchases(`barber_id='${b.id}'`)
      const packs = await getClientPackages(`barber_id='${b.id}'`)

      const matchedComms = commissions.filter(
        (c) => c.barber_id === b.id && c.status !== 'paid' && !c.is_advance,
      )

      const consumptionComms = matchedComms.filter((c) => c.type === 'consumption')

      const items = [
        ...apts.map((a) => {
          const c = matchedComms.find(
            (cm) =>
              cm.type === 'service' &&
              Math.abs(new Date(cm.created).getTime() - new Date(a.updated).getTime()) < 120000,
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
            dueDate: c?.due_date ? new Date(c.due_date) : null,
            commDate: c?.date ? new Date(c.date) : new Date(a.updated),
            commissionObj: c,
            basePrice: a.expand?.service_id?.price || a.price || 0,
            commissionInfo: getCommissionInfo('service', a.service_id, b.id),
          }
        }),
        ...prods.map((p) => {
          const c = matchedComms.find(
            (cm) =>
              cm.type === 'product' &&
              Math.abs(new Date(cm.created).getTime() - new Date(p.created).getTime()) < 120000,
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
            dueDate: c?.due_date ? new Date(c.due_date) : null,
            commDate: c?.date ? new Date(c.date) : new Date(p.created),
            commissionObj: c,
            basePrice: p.expand?.product_id?.price || p.price_at_sale || 0,
            commissionInfo: getCommissionInfo('product', p.product_id, b.id),
          }
        }),
        ...packs.map((pk) => {
          const c = matchedComms.find(
            (cm) =>
              (cm.type === 'package_sale' || cm.type === 'package') &&
              Math.abs(new Date(cm.created).getTime() - new Date(pk.created).getTime()) < 120000,
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
            dueDate: c?.due_date ? new Date(c.due_date) : null,
            commDate: c?.date ? new Date(c.date) : new Date(pk.created),
            commissionObj: c,
            basePrice: pk.expand?.package_id?.price || 0,
            commissionInfo: getCommissionInfo('package', pk.package_id, b.id),
          }
        }),
        ...consumptionComms.map((c) => ({
          id: c.id,
          type: 'Consumo',
          client: '-',
          item: 'Consumo Interno',
          date: c.date ? new Date(c.date) : new Date(c.created),
          time: format(new Date(c.created), 'HH:mm'),
          packageUsed: false,
          price: 0,
          commission: c.amount,
          dueDate: c.due_date ? new Date(c.due_date) : null,
          commDate: c.date ? new Date(c.date) : new Date(c.created),
          commissionObj: c,
          basePrice: 0,
          commissionInfo: { type: 'fixed', value: c.amount },
        })),
      ].sort((a, b) => b.commDate.getTime() - a.commDate.getTime())

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
              <p>Comissões Pendentes</p>
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
      work_level: 'autonomo',
      payment_schedule_config: {
        frequency: 'semanal',
        cycles: [
          { workDays: [1, 2, 3], paymentDay: 4 },
          { workDays: [4, 5, 6], paymentDay: 1 },
        ],
      },
    })
    setBDialog(true)
  }

  const editBarber = (b: any) => {
    setForm({
      id: b.id,
      name: b.name,
      work_level: b.work_level || 'autonomo',
      payment_schedule_config: b.payment_schedule_config || {
        frequency: 'semanal',
        cycles: [
          { workDays: [1, 2, 3], paymentDay: 4 },
          { workDays: [4, 5, 6], paymentDay: 1 },
        ],
      },
    })
    setBDialog(true)
  }

  const addCycle = () => {
    setForm((prev: any) => ({
      ...prev,
      payment_schedule_config: {
        ...prev.payment_schedule_config,
        cycles: [...(prev.payment_schedule_config?.cycles || []), { workDays: [], paymentDay: 1 }],
      },
    }))
  }

  const removeCycle = (index: number) => {
    const newCycles = [...form.payment_schedule_config.cycles]
    newCycles.splice(index, 1)
    setForm((prev: any) => ({
      ...prev,
      payment_schedule_config: {
        ...prev.payment_schedule_config,
        cycles: newCycles,
      },
    }))
  }

  const updateCycleWorkDays = (index: number, day: number, checked: boolean) => {
    const newCycles = [...form.payment_schedule_config.cycles]
    const cycle = newCycles[index]
    if (checked) {
      cycle.workDays = [...cycle.workDays, day]
    } else {
      cycle.workDays = cycle.workDays.filter((d: number) => d !== day)
    }
    setForm((prev: any) => ({
      ...prev,
      payment_schedule_config: {
        ...prev.payment_schedule_config,
        cycles: newCycles,
      },
    }))
  }

  const updateCyclePaymentDay = (index: number, day: number) => {
    const newCycles = [...form.payment_schedule_config.cycles]
    newCycles[index].paymentDay = day
    setForm((prev: any) => ({
      ...prev,
      payment_schedule_config: {
        ...prev.payment_schedule_config,
        cycles: newCycles,
      },
    }))
  }

  const typeMap: Record<string, string> = {
    service: 'Serviço',
    product: 'Produto',
    package_sale: 'Pacote',
    package: 'Pacote',
    category: 'Categoria',
    consumption: 'Consumo Interno',
  }

  const handleReconcile = async () => {
    setIsReconciling(true)
    try {
      const fromStr = startOfDay(range.from).toISOString().replace('T', ' ')
      const toStr = endOfDay(range.to).toISOString().replace('T', ' ')

      const res = await pb.send('/backend/v1/commissions/reconcile', {
        method: 'POST',
        body: JSON.stringify({ startDate: fromStr, endDate: toStr }),
        headers: { 'Content-Type': 'application/json' },
      })
      toast({
        title: 'Reconciliação concluída',
        description: `Foram geradas ${res.createdCount} novas comissões.`,
      })
      loadData()
    } catch (e) {
      toast({
        title: 'Erro',
        description: getErrorMessage(e),
        variant: 'destructive',
      })
    } finally {
      setIsReconciling(false)
    }
  }

  const openPayModal = async (b: any) => {
    setBarberToPay(b)
    try {
      const records = await pb.collection('commissions').getFullList({
        filter: `barber_id='${b.id}' && status!='paid'`,
        sort: 'due_date,-created',
      })
      setPendingCommsToPay(records)
      setSelectedComms(records.map((r) => r.id))
      setPaymentMethod('pix')
      setPaymentReceipt(null)
      setPayDialog(true)
    } catch (e) {
      toast({ title: 'Erro ao carregar comissões', variant: 'destructive' })
    }
  }

  const handleToggleComm = (id: string) => {
    setSelectedComms((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const handleToggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedComms(pendingCommsToPay.map((c) => c.id))
    } else {
      setSelectedComms([])
    }
  }

  const handleConfirmPayment = async () => {
    if (selectedComms.length === 0)
      return toast({ title: 'Selecione ao menos uma comissão', variant: 'destructive' })
    if (!paymentMethod)
      return toast({ title: 'Selecione a forma de pagamento', variant: 'destructive' })

    setIsPaying(true)
    try {
      await pb.send('/backend/v1/commissions/pay', {
        method: 'POST',
        body: JSON.stringify({
          commissionIds: selectedComms,
          paymentMethod,
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      const paidItems = pendingCommsToPay.filter((c) => selectedComms.includes(c.id))
      const totalPaid = paidItems.reduce((acc, c) => acc + (c.amount || 0), 0)
      const paidEarnings = paidItems.filter((c) => (c.amount || 0) >= 0)
      const paidDeductions = paidItems.filter((c) => (c.amount || 0) < 0)

      let receiptText = `*Recibo de Pagamento*\n\nOlá ${barberToPay?.name},\nRecebemos o pagamento de suas comissões no valor de *R$ ${totalPaid.toFixed(2)}*.\n\nDetalhes:\n${paidEarnings
        .map(
          (c) =>
            `- ${format(c.date ? new Date(c.date) : new Date(c.created), 'dd/MM/yyyy')}: R$ ${(
              c.amount || 0
            ).toFixed(2)} (${typeMap[c.type] || c.type})`,
        )
        .join('\n')}`

      if (paidDeductions.length > 0) {
        receiptText += `\n\nDeduções / Consumo Interno:\n${paidDeductions.map((c) => `- ${format(c.date ? new Date(c.date) : new Date(c.created), 'dd/MM/yyyy')}: R$ ${(c.amount || 0).toFixed(2)} (${typeMap[c.type] || c.type})`).join('\n')}`
      }
      receiptText += `\n\nObrigado!`

      const phone =
        barberToPay?.expand?.user_id?.whatsapp || barberToPay?.expand?.user_id?.phone || ''
      const cleanPhone = phone.replace(/\D/g, '')
      const url = cleanPhone
        ? `https://api.whatsapp.com/send?phone=55${cleanPhone}&text=${encodeURIComponent(
            receiptText,
          )}`
        : `https://api.whatsapp.com/send?text=${encodeURIComponent(receiptText)}`

      const paymentMethodName =
        paymentMethod === 'pix'
          ? 'Pix'
          : paymentMethod === 'cash'
            ? 'Dinheiro'
            : paymentMethod === 'debito'
              ? 'Débito'
              : 'Crédito'

      setPaymentReceiptDetails({
        barberName: barberToPay?.name,
        date: new Date(),
        items: paidItems,
        total: totalPaid,
        method: paymentMethodName,
      })

      setPaymentReceipt({ url, text: receiptText })

      toast({ title: 'Pagamento registrado com sucesso!' })
      setPayDialog(false)
      setReceiptDialog(true)
      loadData()
    } catch (e) {
      toast({
        title: 'Erro ao processar pagamento',
        description: getErrorMessage(e),
        variant: 'destructive',
      })
    } finally {
      setIsPaying(false)
    }
  }

  const mapCommPayMethod = (pm: string) => {
    if (pm === 'credito') return 'credit_card'
    if (pm === 'debito') return 'debit_card'
    return pm
  }

  const ticketData = useMemo(() => {
    if (!ticketItem) return null

    // Group items from the same transaction
    const transactionItems = reportItems.filter(
      (i) =>
        i.client === ticketItem.client &&
        Math.abs(i.commDate.getTime() - ticketItem.commDate.getTime()) < 120000 &&
        (!i.commissionObj ||
          !ticketItem.commissionObj ||
          i.commissionObj.payment_method === ticketItem.commissionObj.payment_method),
    )

    const pmType = ticketItem.commissionObj?.payment_method || 'other'
    const matchedPm = paymentMethods.find(
      (p: any) =>
        p.type === mapCommPayMethod(pmType) || p.name.toLowerCase() === pmType.toLowerCase(),
    )
    const feePercentage = matchedPm?.fee_percentage || 0

    const commissionableItems = transactionItems.filter((i) => i.commission > 0)
    const nonCommissionableItems = transactionItems.filter(
      (i) => !i.commission || i.commission <= 0,
    )

    const nonCommProducts = nonCommissionableItems.filter((i) => i.type === 'Produto')
    const nonCommOthers = nonCommissionableItems.filter((i) => i.type !== 'Produto')

    const totalPaid = transactionItems.reduce((acc, i) => acc + i.price, 0)
    const commissionBase = commissionableItems.reduce((acc, i) => acc + i.price, 0)

    // Gross commission per item (no reverse calc)
    const itemsWithGross = commissionableItems.map((i) => {
      let gross = i.commission
      if (i.commissionInfo?.type === 'percentage') {
        gross = i.price * (i.commissionInfo.value / 100)
      } else if (i.commissionInfo?.type === 'fixed') {
        gross = i.commissionInfo.value
      } else if (feePercentage > 0 && feePercentage < 100) {
        gross = i.commission + Number((i.price * (feePercentage / 100)).toFixed(2))
      }
      return { ...i, grossCommission: gross }
    })

    const grossTotal = itemsWithGross.reduce((acc, i) => acc + i.grossCommission, 0)
    const netTotal = transactionItems.reduce((acc, i) => acc + (i.commission || 0), 0)
    const feeDeduction = itemsWithGross.reduce(
      (acc, i) => acc + Number((i.price * (feePercentage / 100)).toFixed(2)),
      0,
    )

    const memoryLines = itemsWithGross.map((i: any) => {
      let rateStr = ''
      if (i.commissionInfo?.type === 'percentage') {
        rateStr = `${i.commissionInfo.value}%`
      } else if (i.commissionInfo?.type === 'fixed') {
        rateStr = `Fixo R$ ${i.commissionInfo.value.toFixed(2)}`
      } else {
        rateStr = 'Desconhecido'
      }
      return {
        label: `${i.item} (${rateStr})`,
        value: i.grossCommission,
      }
    })

    const isPackageUse = ticketItem.packageUsed
    const paymentMethodName = isPackageUse
      ? 'Uso de Pacote'
      : matchedPm?.name || pmType || 'Não informado'

    return {
      professionalName: selectedBarberDetailed?.name,
      clientName: ticketItem.client,
      date: ticketItem.date || ticketItem.commDate,
      paymentMethodName,

      totalPaid,
      nonCommProducts,
      nonCommOthers,
      commissionableItems,
      commissionBase,

      memoryLines,
      feePercentage,
      feeDeduction,

      netCommission: netTotal,
    }
  }, [ticketItem, selectedBarberDetailed, paymentMethods, reportItems])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = { ...form }
      if (payload.work_level === 'socio') {
        payload.commission_type = 'percentage'
        payload.commission_value = 100
      } else {
        payload.commission_type = 'percentage'
        payload.commission_value = 0
      }
      if (payload.id) {
        const { id, ...data } = payload
        await updateBarber(id, data)
        toast({ title: 'Profissional atualizado!' })
      } else {
        const { id, ...data } = payload
        await createBarber(data)
        toast({ title: 'Profissional salvo!' })
      }
      setBDialog(false)
      loadData()
    } catch (err) {
      toast({ title: 'Erro ao salvar', description: getErrorMessage(err), variant: 'destructive' })
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
        {canEdit && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReconcile} disabled={isReconciling}>
              <RefreshCw className={`size-4 mr-2 ${isReconciling ? 'animate-spin' : ''}`} />
              Recalcular
            </Button>
            <Button onClick={openBarber}>
              <Plus className="size-4 mr-2" /> Adicionar Profissional
            </Button>
          </div>
        )}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profissional</TableHead>
                <TableHead>Contato (WhatsApp)</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Comissão a Receber</TableHead>
                <TableHead>A Pagar</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {barbers.map((b) => {
                const bCommsAll = commissions.filter((c) => c.barber_id === b.id)
                const pendingComms = bCommsAll.filter((c) => c.status !== 'paid')
                const aReceber = pendingComms.reduce((acc, c) => acc + (c.amount || 0), 0)

                const earliestDue = pendingComms.reduce(
                  (earliest, c) => {
                    const cDate = c.due_date
                      ? new Date(c.due_date)
                      : getNextPayDate(
                          c.date ? new Date(c.date) : new Date(c.created),
                          b.payment_schedule_config,
                        )
                    if (!earliest || cDate < earliest) return cDate
                    return earliest
                  },
                  null as Date | null,
                )
                const displayPayDate = earliestDue
                  ? format(earliestDue, 'dd/MM/yyyy')
                  : format(getNextPayDate(new Date(), b.payment_schedule_config), 'dd/MM/yyyy')

                return (
                  <TableRow key={b.id}>
                    <TableCell
                      className={`font-medium ${canEdit ? 'cursor-pointer group' : ''}`}
                      onClick={() => canEdit && editBarber(b)}
                      title={canEdit ? 'Clique para editar' : ''}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
                          {b.avatar ? (
                            <img
                              src={b.avatar}
                              alt={b.name}
                              className="h-full w-full object-cover"
                            />
                          ) : b.expand?.user_id?.avatar ? (
                            <img
                              src={pb.files.getUrl(b.expand.user_id, b.expand.user_id.avatar)}
                              alt={b.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-primary font-bold">
                              {b.name.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <span
                            className={`${canEdit ? 'group-hover:underline text-blue-600' : ''}`}
                          >
                            {b.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {b.expand?.user_id?.whatsapp || (
                        <span className="text-muted-foreground italic">Não informado</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={b.work_level === 'socio' ? 'default' : 'outline'}>
                        {b.work_level === 'socio' ? 'Sócio' : 'Autônomo'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-amber-600 font-bold">
                      R$ {aReceber.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {b.work_level === 'socio' ? (
                        <Badge className="bg-emerald-500 hover:bg-emerald-600 border-0">
                          Pago na hora
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">{displayPayDate}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDetailedReport(b)}
                          title="Relatório Detalhado"
                        >
                          <DollarSign className="size-4 text-emerald-600" />
                        </Button>
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openPayModal(b)}
                            title="Pagar Comissões"
                          >
                            <Wallet className="size-4 text-blue-600" />
                          </Button>
                        )}
                      </div>
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
            <div className="flex gap-2 mr-4">
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  await handleReconcile()
                  if (selectedBarberDetailed) {
                    openDetailedReport(selectedBarberDetailed)
                  }
                }}
                disabled={isReconciling}
              >
                <RefreshCw className={`size-4 mr-2 ${isReconciling ? 'animate-spin' : ''}`} />
                Recalcular
              </Button>
              <Button variant="outline" size="sm" onClick={printReport}>
                <Printer className="size-4 mr-2" /> Gerar PDF
              </Button>
            </div>
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
                    <TableHead>A Pagar</TableHead>
                    <TableHead className="text-right">Valor Venda</TableHead>
                    <TableHead className="text-right">Comissão a Receber</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportItems
                    .filter((i) => i.commission !== 0)
                    .map((item, i) => (
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
                          {selectedBarberDetailed?.work_level === 'socio' ? (
                            <Badge className="bg-emerald-500 hover:bg-emerald-600 border-0">
                              Pago na hora
                            </Badge>
                          ) : (
                            <span className="font-medium text-amber-600">
                              {item.dueDate
                                ? format(item.dueDate, 'dd/MM/yyyy')
                                : format(
                                    getNextPayDate(
                                      item.commDate,
                                      selectedBarberDetailed?.payment_schedule_config,
                                    ),
                                    'dd/MM/yyyy',
                                  )}
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">R$ {item.price.toFixed(2)}</TableCell>
                        <TableCell
                          className={`text-right font-semibold ${item.commission < 0 ? 'text-red-600' : 'text-emerald-600'}`}
                        >
                          R$ {item.commission.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTicketItem(item)}
                            title="Memória de Cálculo"
                          >
                            <Receipt className="size-4 text-slate-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  {reportItems.filter((i) => i.commission !== 0).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        Nenhuma comissão registrada para este período.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {reportItems.filter((i) => i.commission !== 0).length > 0 && (
                <div className="summary flex flex-col gap-2 mt-6">
                  <div className="flex justify-between items-center text-lg">
                    <span>Total de Comissões no Período:</span>
                    <span className="text-primary font-bold">
                      R$ {reportItems.reduce((acc, curr) => acc + curr.commission, 0).toFixed(2)}
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

      <Card className="mt-8 border-none shadow-sm">
        <CardHeader className="bg-muted/30 pb-4 border-b">
          <CardTitle className="text-xl">Configurações de Pagamento</CardTitle>
          <CardDescription>
            As regras de vencimento agora são configuradas individualmente para cada profissional
            Autônomo.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3">
            <div className="mt-0.5">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                Autônomo
              </Badge>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              As datas da coluna "A Pagar" são calculadas automaticamente com base nos ciclos
              definidos no perfil de cada profissional.
            </p>
          </div>
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-start gap-3">
            <div className="mt-0.5">
              <Badge className="bg-emerald-500 hover:bg-emerald-600 border-0">Sócio</Badge>
            </div>
            <p className="text-sm text-emerald-800 dark:text-emerald-200">
              Profissionais com nível de trabalho configurado como "Sócio" recebem comissionamento
              integral. O status de suas transações é sempre classificado como{' '}
              <strong>"Pago na hora"</strong>.
            </p>
          </div>
        </CardContent>
      </Card>

      <Dialog open={bDialog} onOpenChange={setBDialog}>
        <DialogContent className="sm:max-w-[425px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{form.id ? 'Editar Profissional' : 'Novo Profissional'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
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

            {form.work_level === 'autonomo' && (
              <div className="space-y-4 border p-4 rounded-lg bg-muted/20">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold">Configuração de Pagamento</Label>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Frequência</Label>
                  <Select
                    value={form.payment_schedule_config?.frequency || 'semanal'}
                    onValueChange={(v) =>
                      setForm({
                        ...form,
                        payment_schedule_config: { ...form.payment_schedule_config, frequency: v },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="quinzenal">Quinzenal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Ciclos de Pagamento</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addCycle}>
                      <Plus className="size-3 mr-1" /> Adicionar
                    </Button>
                  </div>

                  {form.payment_schedule_config?.cycles?.map((cycle: any, index: number) => (
                    <div
                      key={index}
                      className="border p-3 rounded-md space-y-3 bg-background relative"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-6 w-6 text-destructive hover:bg-destructive/10"
                        onClick={() => removeCycle(index)}
                      >
                        <Trash className="size-3" />
                      </Button>

                      <div className="space-y-2 pr-8">
                        <Label className="text-xs text-muted-foreground">Dias Trabalhados</Label>
                        <div className="flex flex-wrap gap-2">
                          {WEEK_DAYS.map((day) => (
                            <div key={day.value} className="flex items-center space-x-1">
                              <Checkbox
                                id={`cycle-${index}-day-${day.value}`}
                                checked={cycle.workDays?.includes(day.value)}
                                onCheckedChange={(checked) =>
                                  updateCycleWorkDays(index, day.value, !!checked)
                                }
                              />
                              <Label
                                htmlFor={`cycle-${index}-day-${day.value}`}
                                className="text-xs font-normal cursor-pointer"
                              >
                                {day.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Dia do Pagamento</Label>
                        <Select
                          value={cycle.paymentDay?.toString()}
                          onValueChange={(v) => updateCyclePaymentDay(index, parseInt(v))}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {WEEK_DAYS.map((day) => (
                              <SelectItem key={day.value} value={day.value.toString()}>
                                {day.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                  {(!form.payment_schedule_config?.cycles ||
                    form.payment_schedule_config.cycles.length === 0) && (
                    <p className="text-sm text-muted-foreground text-center py-2 border border-dashed rounded-md">
                      Nenhum ciclo configurado.
                    </p>
                  )}
                </div>
              </div>
            )}

            <DialogFooter className="pt-4">
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={payDialog} onOpenChange={setPayDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Pagar Comissões - {barberToPay?.name}</DialogTitle>
            <DialogDescription>
              Selecione as comissões que deseja baixar como pagas.
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-auto flex-1 mt-4 border rounded-md max-h-[40vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        selectedComms.length === pendingCommsToPay.length &&
                        pendingCommsToPay.length > 0
                      }
                      onCheckedChange={(c) => handleToggleAll(!!c)}
                    />
                  </TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(() => {
                  const allEarnings = pendingCommsToPay.filter((c) => (c.amount || 0) >= 0)
                  const allDeductions = pendingCommsToPay.filter((c) => (c.amount || 0) < 0)

                  const periodComms = allEarnings.filter((c) => {
                    const d = c.date ? new Date(c.date) : new Date(c.created)
                    return d >= range.from && d <= range.to
                  })
                  const previousComms = allEarnings.filter((c) => {
                    const d = c.date ? new Date(c.date) : new Date(c.created)
                    return d < range.from
                  })
                  const futureComms = allEarnings.filter((c) => {
                    const d = c.date ? new Date(c.date) : new Date(c.created)
                    return d > range.to
                  })

                  return (
                    <>
                      {periodComms.length > 0 && (
                        <>
                          <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableCell
                              colSpan={4}
                              className="font-semibold text-xs uppercase text-muted-foreground"
                            >
                              Comissões do Período
                            </TableCell>
                          </TableRow>
                          {periodComms.map((c) => (
                            <TableRow key={c.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedComms.includes(c.id)}
                                  onCheckedChange={() => handleToggleComm(c.id)}
                                />
                              </TableCell>
                              <TableCell>
                                {format(
                                  c.date ? new Date(c.date) : new Date(c.created),
                                  'dd/MM/yyyy',
                                )}
                              </TableCell>
                              <TableCell>{typeMap[c.type] || c.type}</TableCell>
                              <TableCell className="text-right">
                                R$ {(c.amount || 0).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      )}

                      {previousComms.length > 0 && (
                        <>
                          <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableCell
                              colSpan={4}
                              className="font-semibold text-xs uppercase text-muted-foreground"
                            >
                              Saldos Anteriores
                            </TableCell>
                          </TableRow>
                          {previousComms.map((c) => (
                            <TableRow key={c.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedComms.includes(c.id)}
                                  onCheckedChange={() => handleToggleComm(c.id)}
                                />
                              </TableCell>
                              <TableCell>
                                {format(
                                  c.date ? new Date(c.date) : new Date(c.created),
                                  'dd/MM/yyyy',
                                )}
                              </TableCell>
                              <TableCell>{typeMap[c.type] || c.type}</TableCell>
                              <TableCell className="text-right">
                                R$ {(c.amount || 0).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      )}

                      {futureComms.length > 0 && (
                        <>
                          <TableRow className="bg-muted/50 hover:bg-muted/50">
                            <TableCell
                              colSpan={4}
                              className="font-semibold text-xs uppercase text-muted-foreground"
                            >
                              Comissões Futuras
                            </TableCell>
                          </TableRow>
                          {futureComms.map((c) => (
                            <TableRow key={c.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedComms.includes(c.id)}
                                  onCheckedChange={() => handleToggleComm(c.id)}
                                />
                              </TableCell>
                              <TableCell>
                                {format(
                                  c.date ? new Date(c.date) : new Date(c.created),
                                  'dd/MM/yyyy',
                                )}
                              </TableCell>
                              <TableCell>{typeMap[c.type] || c.type}</TableCell>
                              <TableCell className="text-right">
                                R$ {(c.amount || 0).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      )}

                      {allDeductions.length > 0 && (
                        <>
                          <TableRow className="bg-red-50 hover:bg-red-50">
                            <TableCell
                              colSpan={4}
                              className="font-semibold text-xs uppercase text-red-600"
                            >
                              Deduções / Consumo Interno
                            </TableCell>
                          </TableRow>
                          {allDeductions.map((c) => (
                            <TableRow key={c.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedComms.includes(c.id)}
                                  onCheckedChange={() => handleToggleComm(c.id)}
                                />
                              </TableCell>
                              <TableCell>
                                {format(
                                  c.date ? new Date(c.date) : new Date(c.created),
                                  'dd/MM/yyyy',
                                )}
                              </TableCell>
                              <TableCell className="text-red-700">
                                {typeMap[c.type] || c.type}
                              </TableCell>
                              <TableCell className="text-right text-red-600 font-medium">
                                R$ {(c.amount || 0).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      )}

                      {pendingCommsToPay.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                            Nenhuma comissão pendente encontrada.
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  )
                })()}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex flex-col gap-4 shrink-0">
            <div className="flex justify-between items-center bg-muted/30 p-4 rounded-lg">
              <span className="font-semibold">Total Selecionado:</span>
              <span className="text-xl font-bold text-emerald-600">
                R${' '}
                {pendingCommsToPay
                  .filter((c) => selectedComms.includes(c.id))
                  .reduce((acc, c) => acc + (c.amount || 0), 0)
                  .toFixed(2)}
              </span>
            </div>

            <div className="space-y-2">
              <Label>Forma de Pagamento</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pix">Pix</SelectItem>
                  <SelectItem value="cash">Dinheiro</SelectItem>
                  <SelectItem value="debito">Cartão de Débito</SelectItem>
                  <SelectItem value="credito">Cartão de Crédito</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setPayDialog(false)} disabled={isPaying}>
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmPayment}
              disabled={isPaying || selectedComms.length === 0}
            >
              {isPaying ? 'Processando...' : 'Confirmar Pagamento'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={receiptDialog} onOpenChange={setReceiptDialog}>
        <DialogContent className="sm:max-w-md bg-stone-50">
          <DialogHeader>
            <DialogTitle className="text-center text-xl text-primary">
              Pagamento Concluído!
            </DialogTitle>
          </DialogHeader>

          <div className="bg-white p-6 border-y-2 border-dashed border-gray-300 shadow-sm font-mono text-sm space-y-4 my-2 max-h-[50vh] overflow-y-auto">
            <div className="text-center space-y-1">
              <h3 className="font-bold text-lg">{businessName}</h3>
              <p>Recibo de Comissões</p>
              <p>{format(paymentReceiptDetails?.date || new Date(), 'dd/MM/yyyy HH:mm')}</p>
            </div>

            <div className="border-t border-dashed border-gray-300 pt-3">
              <p>
                <strong>Profissional:</strong> {paymentReceiptDetails?.barberName}
              </p>
              <p>
                <strong>Forma de Pag.:</strong> {paymentReceiptDetails?.method}
              </p>
            </div>

            <div className="border-t border-dashed border-gray-300 pt-3 space-y-2">
              <div className="grid grid-cols-12 font-bold mb-1 border-b border-gray-100 pb-1">
                <div className="col-span-8">Descrição</div>
                <div className="col-span-4 text-right">Valor</div>
              </div>
              {paymentReceiptDetails?.items
                .filter((i: any) => (i.amount || 0) >= 0)
                .map((item: any, i: number) => (
                  <div key={i} className="grid grid-cols-12 text-gray-700 py-0.5">
                    <div
                      className="col-span-8 truncate pr-2"
                      title={`${format(item.date ? new Date(item.date) : new Date(item.created), 'dd/MM/yy')} - ${typeMap[item.type] || item.type}`}
                    >
                      {format(item.date ? new Date(item.date) : new Date(item.created), 'dd/MM/yy')}{' '}
                      {typeMap[item.type] || item.type}
                    </div>
                    <div className="col-span-4 text-right">R$ {(item.amount || 0).toFixed(2)}</div>
                  </div>
                ))}

              {paymentReceiptDetails?.items.some((i: any) => (i.amount || 0) < 0) && (
                <>
                  <div className="grid grid-cols-12 font-bold mt-4 mb-1 border-b border-gray-100 pb-1 text-red-800">
                    <div className="col-span-12">Deduções / Consumo Interno</div>
                  </div>
                  {paymentReceiptDetails?.items
                    .filter((i: any) => (i.amount || 0) < 0)
                    .map((item: any, i: number) => (
                      <div key={`deduction-${i}`} className="grid grid-cols-12 text-red-700 py-0.5">
                        <div
                          className="col-span-8 truncate pr-2"
                          title={`${format(item.date ? new Date(item.date) : new Date(item.created), 'dd/MM/yy')} - ${typeMap[item.type] || item.type}`}
                        >
                          {format(
                            item.date ? new Date(item.date) : new Date(item.created),
                            'dd/MM/yy',
                          )}{' '}
                          {typeMap[item.type] || item.type}
                        </div>
                        <div className="col-span-4 text-right">
                          R$ {(item.amount || 0).toFixed(2)}
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>

            <div className="border-t border-dashed border-gray-300 pt-3 flex justify-between font-bold text-base">
              <span>TOTAL PAGO</span>
              <span>R$ {paymentReceiptDetails?.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <Button
              onClick={() => {
                const text = paymentReceipt?.text || ''
                navigator.clipboard.writeText(text.replace(/\*/g, ''))
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              variant="outline"
              className="w-full gap-2"
            >
              {copied ? (
                <CheckCircle2 className="size-4 text-green-500" />
              ) : (
                <Copy className="size-4" />
              )}
              {copied ? 'Copiado!' : 'Copiar Recibo'}
            </Button>
            <Button
              onClick={() => {
                if (paymentReceipt?.url) window.open(paymentReceipt.url, '_blank')
              }}
              className="bg-green-600 hover:bg-green-700 text-white gap-2 w-full"
            >
              <Wallet className="size-4" />
              Enviar via WhatsApp
            </Button>
          </div>
          <DialogFooter className="mt-2">
            <Button variant="ghost" onClick={() => setReceiptDialog(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={!!ticketItem} onOpenChange={(v) => !v && setTicketItem(null)}>
        <DialogContent className="sm:max-w-sm bg-white text-black font-mono shadow-xl max-h-[90vh] overflow-y-auto rounded-md border border-gray-300">
          <DialogHeader className="mb-2">
            <DialogTitle className="flex flex-col items-center justify-center space-y-2">
              <Receipt className="size-8 text-black" />
              <span className="text-xl font-bold uppercase tracking-widest text-black">
                Recibo de Comissão
              </span>
            </DialogTitle>
          </DialogHeader>

          {ticketData && (
            <div className="space-y-4 text-sm">
              <div className="space-y-1 text-center border-b border-dashed border-gray-400 pb-4">
                <p className="font-bold text-base uppercase tracking-wider">{businessName}</p>
                <p className="text-gray-600">Profissional: {ticketData.professionalName}</p>
                <p className="text-gray-600">Cliente: {ticketData.clientName}</p>
                <p className="text-gray-600">{format(ticketData.date, 'dd/MM/yyyy HH:mm')}</p>
                <p className="text-gray-600">Pgto: {ticketData.paymentMethodName}</p>
              </div>

              <div className="flex justify-between font-bold text-base bg-gray-100 p-2 rounded">
                <span>Total Pago:</span>
                <span>R$ {ticketData.totalPaid.toFixed(2)}</span>
              </div>

              {ticketData.nonCommProducts.length > 0 && (
                <div className="space-y-1">
                  <p className="font-bold uppercase text-gray-500 text-xs mt-4 mb-2">
                    Produtos (Sem Comissão)
                  </p>
                  {ticketData.nonCommProducts.map((p: any, i: number) => (
                    <div key={i} className="flex justify-between text-gray-500">
                      <span className="truncate max-w-[200px]">{p.item}</span>
                      <span>R$ {p.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-dashed border-gray-300 my-2" />
                </div>
              )}

              {ticketData.nonCommOthers.length > 0 && (
                <div className="space-y-1">
                  <p className="font-bold uppercase text-gray-500 text-xs mt-4 mb-2">
                    Outros (Sem Comissão)
                  </p>
                  {ticketData.nonCommOthers.map((p: any, i: number) => (
                    <div key={i} className="flex justify-between text-gray-500">
                      <span className="truncate max-w-[200px]">{p.item}</span>
                      <span>R$ {p.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-dashed border-gray-300 my-2" />
                </div>
              )}

              <div className="space-y-1">
                <p className="font-bold uppercase text-gray-800 text-xs mt-4 mb-2">
                  Itens Comissionáveis
                </p>
                {ticketData.commissionableItems.map((i: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-gray-800">
                    <span className="truncate max-w-[200px]">{i.item}</span>
                    <span>R$ {i.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-bold text-sm pt-2">
                <span>Total Base de Cálculo:</span>
                <span>R$ {ticketData.commissionBase.toFixed(2)}</span>
              </div>

              <div className="border-t border-dashed border-gray-400 my-4" />

              <div className="space-y-1">
                <p className="font-bold uppercase text-gray-800 text-xs mb-2">Memória de Cálculo</p>
                {ticketData.memoryLines.map((line: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-gray-800">
                    <span>{line.label}</span>
                    <span>R$ {line.value.toFixed(2)}</span>
                  </div>
                ))}

                {ticketData.feeDeduction > 0 && (
                  <div className="flex justify-between text-red-600 pt-1">
                    <span>Taxa Financeira ({ticketData.feePercentage}%):</span>
                    <span>- R$ {ticketData.feeDeduction.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-black border-2 my-4" />

              <div className="flex justify-between font-black text-lg uppercase tracking-wide">
                <span>Total a Pagar:</span>
                <span>R$ {ticketData.netCommission.toFixed(2)}</span>
              </div>
            </div>
          )}

          <DialogFooter className="mt-4 border-t border-dashed border-gray-300 pt-4">
            <Button
              variant="outline"
              className="w-full font-sans border-gray-300 hover:bg-gray-100"
              onClick={() => setTicketItem(null)}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
