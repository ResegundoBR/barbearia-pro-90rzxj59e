import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Plus,
  Trash2,
  Check,
  ShoppingBag,
  Scissors,
  ReceiptText,
  Users,
  Tag,
  Landmark,
} from 'lucide-react'
import {
  getBarbers,
  getClients,
  getPackages,
  getAppointments,
  getProducts,
  getClientPackages,
} from '@/services/api'
import pb from '@/lib/pocketbase/client'
import { useToast } from '@/hooks/use-toast'
import { Separator } from '@/components/ui/separator'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import { CheckoutHistory } from '@/components/CheckoutHistory'

export default function Checkout() {
  const [barbers, setBarbers] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [clientPackages, setClientPackages] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [commissionRules, setCommissionRules] = useState<any[]>([])
  const [financialConfig, setFinancialConfig] = useState<any>({})

  const [pkgForm, setPkgForm] = useState({
    barber_id: '',
    client_id: '',
    package_id: '',
    payment_method: '',
  })

  const [svcForm, setSvcForm] = useState({
    appointment_id: '',
    service_price: '',
    payment_method: '',
  })

  const [isManual, setIsManual] = useState(false)
  const [manualForm, setManualForm] = useState({ client_id: '', barber_id: '', service_id: '' })
  const [packageToConsume, setPackageToConsume] = useState<string | null>(null)

  const [additionalServices, setAdditionalServices] = useState<
    { id: string; service_id: string; name: string; price: number }[]
  >([])
  const [manualExtras, setManualExtras] = useState<
    { id: string; description: string; price: number }[]
  >([])
  const [serviceToAdd, setServiceToAdd] = useState('')
  const [extraDesc, setExtraDesc] = useState('')
  const [extraPrice, setExtraPrice] = useState('')

  const [selectedProducts, setSelectedProducts] = useState<
    { product_id: string; product: any; quantity: number }[]
  >([])
  const [productToAdd, setProductToAdd] = useState('')

  const [discount, setDiscount] = useState<{ type: 'fixed' | 'percentage'; value: number }>({
    type: 'fixed',
    value: 0,
  })
  const [showTicket, setShowTicket] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successState, setSuccessState] = useState<{
    type: 'service' | 'package'
    message: string
  } | null>(null)
  const { toast } = useToast()

  const loadData = () => {
    Promise.all([
      getBarbers(),
      getClients(),
      getPackages(),
      getAppointments(`status != 'Concluído' && status != 'Cancelado'`),
      pb.collection('products').getFullList({ filter: 'is_active=true', expand: 'category_id' }),
      getClientPackages(),
      pb.collection('services').getFullList({ filter: 'is_active=true' }),
      pb
        .collection('payment_methods')
        .getFullList({ filter: 'is_active=true', sort: 'name' })
        .catch(() => []),
      pb
        .collection('commission_rules')
        .getFullList()
        .catch(() => []),
      pb
        .collection('settings')
        .getFullList()
        .catch(() => []),
    ]).then(([b, c, p, a, prods, cp, svcs, pms, rules, settingsArr]) => {
      setBarbers(b)
      setClients(c)
      setPackages(p)
      setAppointments(a)
      setProducts(prods.filter((prod) => prod.is_active !== false))
      setClientPackages(
        cp.filter(
          (pkg) =>
            pkg.remaining_uses > 0 && (!pkg.expires_at || new Date(pkg.expires_at) >= new Date()),
        ),
      )
      setServices(svcs)
      setPaymentMethods(pms)
      setCommissionRules(rules)

      const fin = settingsArr.find((s) => s.key === 'financial_config')?.value || {}
      setFinancialConfig(fin)
    })
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSellPackage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !pkgForm.barber_id ||
      !pkgForm.client_id ||
      !pkgForm.package_id ||
      !pkgForm.payment_method
    ) {
      return toast({ title: 'Preencha todos os campos obrigatórios', variant: 'destructive' })
    }

    setIsSubmitting(true)
    try {
      await pb.send('/backend/v1/checkout/package', {
        method: 'POST',
        body: JSON.stringify(pkgForm),
        headers: { 'Content-Type': 'application/json' },
      })

      const pkg = packages.find((p) => p.id === pkgForm.package_id)
      const pmRecord = paymentMethods.find((p) => p.id === pkgForm.payment_method)

      try {
        await pb.send('/backend/v1/checkouts/log', {
          method: 'POST',
          body: JSON.stringify({
            client_id: pkgForm.client_id,
            barber_id: pkgForm.barber_id,
            total_amount: pkg?.price || 0,
            payment_method: pmRecord?.name || pkgForm.payment_method,
            items_snapshot: {
              packages: [{ name: pkg?.name || 'Pacote', price: pkg?.price || 0, quantity: 1 }],
              discount: 0,
            },
          }),
        })
      } catch {
        /* intentionally ignored */
      }

      setPkgForm({ barber_id: '', client_id: '', package_id: '', payment_method: '' })
      setSuccessState({ type: 'package', message: 'Pacote vendido com sucesso!' })
      loadData()
    } catch (err: any) {
      toast({
        title: err instanceof Error ? err.message : getErrorMessage(err),
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddService = () => {
    if (!serviceToAdd) return
    const svc = services.find((s) => s.id === serviceToAdd)
    if (!svc) return
    setAdditionalServices([
      ...additionalServices,
      {
        id: Math.random().toString(36).substr(2, 9),
        service_id: svc.id,
        name: svc.name,
        price: svc.price,
      },
    ])
    setServiceToAdd('')
  }

  const handleAddExtra = () => {
    if (!extraDesc || !extraPrice) return
    setManualExtras([
      ...manualExtras,
      {
        id: Math.random().toString(36).substr(2, 9),
        description: extraDesc,
        price: Number(extraPrice),
      },
    ])
    setExtraDesc('')
    setExtraPrice('')
  }

  const handleCloseService = async () => {
    setIsSubmitting(true)
    try {
      for (const sp of selectedProducts) {
        const prod = sp.product
        if ((prod.stock_quantity || 0) - sp.quantity < 0) {
          throw new Error(`Estoque insuficiente para: ${prod.name}.`)
        }
      }

      let finalAptId = svcForm.appointment_id
      let clientId = manualForm.client_id
      let barberId = manualForm.barber_id
      let baseServiceId = manualForm.service_id

      const proportion = subtotal > 0 ? 1 - discountAmount / subtotal : 1

      if (isManual) {
        const apt = await pb.collection('appointments').create({
          client_id: clientId,
          barber_id: barberId,
          service_id: baseServiceId,
          price: servicesTotal * proportion,
          status: 'Concluído',
          date: new Date().toISOString(),
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          client_package_id: packageToConsume || null,
        })
        finalAptId = apt.id
      } else {
        const apt = appointments.find((a) => a.id === finalAptId)
        if (!apt) throw new Error('Agendamento não encontrado')
        clientId = apt.client_id
        barberId = apt.barber_id
        baseServiceId = apt.service_id

        await pb.collection('appointments').update(finalAptId, {
          status: 'Concluído',
          price: servicesTotal * proportion,
          client_package_id: packageToConsume || apt.client_package_id,
        })
      }

      if (packageToConsume) {
        const pkg = clientPackages.find((p) => p.id === packageToConsume)
        if (pkg && pkg.remaining_uses > 0) {
          await pb
            .collection('client_packages')
            .update(packageToConsume, { remaining_uses: pkg.remaining_uses - 1 })
        }
      }

      const pmRecord = paymentMethods.find((p) => p.id === svcForm.payment_method)
      let commissionPm = 'pix'
      if (pmRecord) {
        if (pmRecord.type === 'credit_card') commissionPm = 'credito'
        else if (pmRecord.type === 'debit_card') commissionPm = 'debito'
        else if (pmRecord.type === 'pix') commissionPm = 'pix'
        else if (pmRecord.type === 'cash') commissionPm = 'cash'
      }

      const barber = barbers.find((b) => b.id === barberId)

      const createComm = async (
        amount: number,
        type: string,
        specificBarberId: string = barberId,
      ) => {
        const targetBarber = barbers.find((b) => b.id === specificBarberId)
        if (amount > 0 && targetBarber) {
          await pb.collection('commissions').create({
            barber_id: specificBarberId,
            amount,
            type,
            date: new Date().toISOString(),
            status: targetBarber.work_level === 'socio' ? 'paid' : 'pending',
            payment_method: commissionPm,
          })
        }
      }

      const feePct = pmRecord?.fee_percentage || 0

      const getCommissionInfo = (type: string, itemId: string, bId: string) => {
        let rule = commissionRules.find(
          (r) => r.barber_id === bId && r.item_type === type && r.item_id === itemId,
        )
        if (!rule)
          rule = commissionRules.find(
            (r) => !r.barber_id && r.item_type === type && r.item_id === itemId,
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
        }
        if (svcRate > 0) return { type: 'percentage', value: svcRate }
        return { type: 'percentage', value: catRate }
      }

      const getCommAmount = (type: string, itemId: string, itemPrice: number, bId: string) => {
        const info = getCommissionInfo(type, itemId, bId)
        const feeVal = itemPrice * (feePct / 100)
        const netBase = itemPrice - feeVal
        const isSocio = barber?.work_level === 'socio'

        if (isSocio) {
          if (type === 'product') return 0 // Sócio não recebe repasse/comissão de produtos
          return netBase
        }
        if (info.type === 'percentage') {
          return netBase * (info.value / 100)
        }
        return info.value
      }

      if (scheduledPrice > 0) {
        await createComm(
          getCommAmount('service', baseServiceId, scheduledPrice * proportion, barberId),
          'service',
        )
      }

      for (const add of additionalServices) {
        if (add.price > 0) {
          await createComm(
            getCommAmount('service', add.service_id, add.price * proportion, barberId),
            'service',
          )
        }
      }

      for (const extra of manualExtras) {
        if (extra.price > 0) {
          const p = extra.price * proportion
          const feeVal = p * (feePct / 100)
          const netBase = p - feeVal
          const isSocio = barber?.work_level === 'socio'
          const catCommPct = barber?.commission_value || 0

          let netComm = 0
          if (isSocio) {
            netComm = netBase
          } else {
            netComm = netBase * (catCommPct / 100)
          }

          await createComm(netComm, 'service')
        }
      }

      for (const sp of selectedProducts) {
        const itemPrice = sp.product.price * sp.quantity * proportion
        await pb.collection('product_purchases').create({
          client_id: clientId,
          product_id: sp.product_id,
          barber_id: barberId,
          price_at_sale: itemPrice,
          date: new Date().toISOString(),
        })

        const currentProd = await pb.collection('products').getOne(sp.product_id)
        await pb.collection('products').update(sp.product_id, {
          stock_quantity: Math.max(0, (currentProd.stock_quantity || 0) - sp.quantity),
        })

        const inventoryOwnerId = financialConfig.inventory_owner_id
        if (inventoryOwnerId) {
          const feeVal = itemPrice * (feePct / 100)
          const netBase = itemPrice - feeVal

          if (barberId === inventoryOwnerId) {
            // Owner sale
            const ownerBarber = barbers.find((b) => b.id === inventoryOwnerId)
            if (ownerBarber?.work_level !== 'socio') {
              await createComm(netBase, 'product', inventoryOwnerId)
            }
          } else {
            // Staff sale
            const defaultProductCommission = financialConfig.default_product_commission ?? 10
            const catRate =
              sp.product?.expand?.category_id?.commission_percentage ?? defaultProductCommission

            const isSellerSocio = barber?.work_level === 'socio'
            const sellerComm = isSellerSocio ? 0 : netBase * (catRate / 100)
            const ownerComm = netBase - sellerComm

            if (sellerComm > 0) {
              await createComm(sellerComm, 'product', barberId)
            }
            if (ownerComm > 0) {
              const ownerBarber = barbers.find((b) => b.id === inventoryOwnerId)
              if (ownerBarber?.work_level !== 'socio') {
                await createComm(ownerComm, 'product', inventoryOwnerId)
              }
            }
          }
        } else {
          // Fallback se gestor de estoque não configurado
          await createComm(
            getCommAmount('product', sp.product_id, itemPrice, barberId),
            'product',
            barberId,
          )
        }
      }

      try {
        await pb.send('/backend/v1/checkouts/log', {
          method: 'POST',
          body: JSON.stringify({
            client_id: clientId,
            barber_id: barberId,
            total_amount: grandTotal,
            payment_method: pmRecord?.name || svcForm.payment_method,
            items_snapshot: {
              service: ticketServiceName,
              scheduledPrice,
              packageUsed: !!packageToConsume,
              additionalServices,
              manualExtras,
              products: selectedProducts.map((p) => ({
                name: p.product.name,
                price: p.product.price,
                quantity: p.quantity,
              })),
              discount: discountAmount,
            },
          }),
        })
      } catch (logErr) {
        console.error('Failed to log checkout', logErr)
      }

      setSvcForm({ appointment_id: '', service_price: '', payment_method: '' })
      setManualForm({ client_id: '', barber_id: '', service_id: '' })
      setIsManual(false)
      setSelectedProducts([])
      setAdditionalServices([])
      setManualExtras([])
      setDiscount({ type: 'fixed', value: 0 })
      setPackageToConsume(null)
      setShowTicket(false)
      loadData()
      setSuccessState({ type: 'service', message: 'Venda finalizada com sucesso!' })
    } catch (err: any) {
      toast({
        title: err instanceof Error ? err.message : getErrorMessage(err),
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAppointmentChange = (val: string) => {
    setAdditionalServices([])
    setManualExtras([])
    setDiscount({ type: 'fixed', value: 0 })

    if (val === 'manual') {
      setIsManual(true)
      setSvcForm({ ...svcForm, appointment_id: 'manual', service_price: '' })
      setPackageToConsume(null)
      return
    }

    setIsManual(false)
    const apt = appointments.find((a) => a.id === val)
    let price = apt?.price?.toString() || apt?.expand?.service_id?.price?.toString() || '0'
    let pkgIdToConsume = apt?.client_package_id || null

    if (apt?.expand?.client_package_id?.expand?.package_id) {
      price = '0'
    } else if (apt) {
      const availablePkg = clientPackages.find(
        (cp) =>
          cp.client_id === apt.client_id && cp.expand?.package_id?.service_id === apt.service_id,
      )
      if (availablePkg && availablePkg.expand?.package_id) {
        price = '0'
        pkgIdToConsume = availablePkg.id
      }
    }

    setSvcForm({ ...svcForm, appointment_id: val, service_price: price })
    setPackageToConsume(pkgIdToConsume)
  }

  const handleAddProduct = () => {
    if (!productToAdd) return
    const prod = products.find((p) => p.id === productToAdd)
    if (!prod) return
    const existing = selectedProducts.find((sp) => sp.product_id === productToAdd)
    if (existing) {
      setSelectedProducts(
        selectedProducts.map((sp) =>
          sp.product_id === productToAdd ? { ...sp, quantity: sp.quantity + 1 } : sp,
        ),
      )
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { product_id: prod.id, product: prod, quantity: 1 },
      ])
    }
    setProductToAdd('')
  }

  const scheduledPrice = parseFloat(svcForm.service_price.replace(',', '.') || '0')
  const additionalServicesTotal = additionalServices.reduce((acc, curr) => acc + curr.price, 0)
  const manualExtrasTotal = manualExtras.reduce((acc, curr) => acc + curr.price, 0)
  const productsTotal = selectedProducts.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0,
  )

  const servicesTotal = scheduledPrice + additionalServicesTotal + manualExtrasTotal
  const subtotal = servicesTotal + productsTotal

  const discountAmount =
    discount.type === 'percentage' ? (subtotal * (discount.value || 0)) / 100 : discount.value || 0

  const grandTotal = Math.max(0, subtotal - discountAmount)

  let ticketClientName = ''
  let ticketServiceName = ''
  if (isManual) {
    const c = clients.find((x) => x.id === manualForm.client_id)
    if (c) ticketClientName = `${c.name} ${c.surname || ''}`
    const s = services.find((x) => x.id === manualForm.service_id)
    if (s) ticketServiceName = s.name
  } else {
    const apt = appointments.find((a) => a.id === svcForm.appointment_id)
    if (apt) {
      ticketClientName = `${apt.expand?.client_id?.name || ''} ${apt.expand?.client_id?.surname || ''}`
      ticketServiceName = apt.expand?.service_id?.name || ''
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gradient">Checkout POS</h2>
        <p className="text-muted-foreground">Finalize atendimentos, venda produtos e pacotes.</p>
      </div>

      {successState ? (
        <Card className="animate-fade-in mt-6 border-emerald-500/20 bg-emerald-500/5">
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-16">
            <div className="h-20 w-20 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Check className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-emerald-600">{successState.message}</h2>
            <p className="text-muted-foreground text-center max-w-sm">
              A transação foi registrada com sucesso no financeiro e o estoque foi atualizado.
            </p>
            <Button
              onClick={() => setSuccessState(null)}
              size="lg"
              className="mt-4 shadow-md bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Novo Atendimento
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="service" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mb-6">
            <TabsTrigger value="service">Checkout de Serviços</TabsTrigger>
            <TabsTrigger value="package">Venda de Pacotes</TabsTrigger>
            <TabsTrigger value="history">Histórico de Checkouts</TabsTrigger>
          </TabsList>

          <TabsContent value="service" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 space-y-6">
                <Card className="border-border shadow-sm">
                  <CardHeader className="bg-muted/30 pb-4 border-b">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Scissors className="size-5 text-primary" /> Dados do Atendimento
                    </CardTitle>
                    <CardDescription>
                      Selecione o serviço base do agendamento ou manual.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-5">
                    <div className="space-y-2">
                      <Label>Agendamento ou Modalidade</Label>
                      <Select
                        value={svcForm.appointment_id}
                        onValueChange={handleAppointmentChange}
                      >
                        <SelectTrigger className="h-12 border-primary/20 bg-primary/5">
                          <SelectValue placeholder="Selecione para iniciar..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual" className="font-bold text-primary">
                            <Users className="size-4 inline mr-2" /> Novo Atendimento Avulso
                          </SelectItem>
                          {appointments.map((a) => (
                            <SelectItem key={a.id} value={a.id}>
                              {a.date ? a.date.substring(0, 10).split('-').reverse().join('/') : ''}{' '}
                              às {a.time} - {a.expand?.client_id?.name} (
                              {a.expand?.service_id?.name})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {isManual && (
                      <div className="space-y-4 p-5 bg-card border border-dashed border-primary/30 rounded-xl animate-fade-in">
                        <h4 className="font-semibold text-primary flex items-center gap-2">
                          <Tag className="size-4" /> Serviço Base (Manual)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Cliente</Label>
                            <Select
                              value={manualForm.client_id}
                              onValueChange={(v) => {
                                setManualForm({ ...manualForm, client_id: v, service_id: '' })
                                setPackageToConsume(null)
                                setSvcForm((prev) => ({ ...prev, service_price: '' }))
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione..." />
                              </SelectTrigger>
                              <SelectContent>
                                {clients.map((c) => (
                                  <SelectItem key={c.id} value={c.id}>
                                    {c.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Profissional</Label>
                            <Select
                              value={manualForm.barber_id}
                              onValueChange={(v) => setManualForm({ ...manualForm, barber_id: v })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione..." />
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
                        </div>
                        <div className="space-y-2">
                          <Label>Serviço Principal</Label>
                          <Select
                            value={manualForm.service_id}
                            onValueChange={(v) => {
                              setManualForm({ ...manualForm, service_id: v })
                              const svc = services.find((s) => s.id === v)
                              let price = svc?.price?.toString() || '0'
                              let pkgToConsume = null
                              if (manualForm.client_id) {
                                const availablePkg = clientPackages.find(
                                  (cp) =>
                                    cp.client_id === manualForm.client_id &&
                                    cp.expand?.package_id?.service_id === v,
                                )
                                if (availablePkg && availablePkg.remaining_uses > 0) {
                                  price = '0'
                                  pkgToConsume = availablePkg.id
                                }
                              }
                              setPackageToConsume(pkgToConsume)
                              setSvcForm((prev) => ({ ...prev, service_price: price }))
                            }}
                            disabled={!manualForm.client_id}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o serviço..." />
                            </SelectTrigger>
                            <SelectContent>
                              {services.map((s) => (
                                <SelectItem key={s.id} value={s.id}>
                                  {s.name} - R$ {s.price.toFixed(2)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Valor do Serviço Base (R$)</Label>
                      <div className="flex flex-col gap-1">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          value={svcForm.service_price}
                          onChange={(e) =>
                            setSvcForm({ ...svcForm, service_price: e.target.value })
                          }
                          className="text-lg h-12"
                        />
                        {packageToConsume && (
                          <span className="text-xs font-medium text-emerald-500 flex items-center gap-1 mt-1">
                            <Check className="size-3" /> Pacote do cliente aplicado automaticamente.
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border shadow-sm">
                  <CardHeader className="bg-muted/30 pb-4 border-b">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Plus className="size-5 text-primary" /> Serviços Adicionais & Extras
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-2">
                      <Label>Serviço do Catálogo</Label>
                      <div className="flex gap-2">
                        <Select value={serviceToAdd} onValueChange={setServiceToAdd}>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Buscar serviço adicional..." />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.name} - R$ {s.price.toFixed(2)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button type="button" variant="secondary" onClick={handleAddService}>
                          Adicionar
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Extra Manual</Label>
                      <div className="flex gap-2 items-end">
                        <div className="flex-1 space-y-1">
                          <Input
                            placeholder="Descrição do Extra"
                            value={extraDesc}
                            onChange={(e) => setExtraDesc(e.target.value)}
                          />
                        </div>
                        <div className="w-32 space-y-1">
                          <Input
                            type="number"
                            placeholder="Valor (R$)"
                            min="0"
                            step="0.01"
                            value={extraPrice}
                            onChange={(e) => setExtraPrice(e.target.value)}
                          />
                        </div>
                        <Button type="button" variant="secondary" onClick={handleAddExtra}>
                          Adicionar
                        </Button>
                      </div>
                    </div>

                    {(additionalServices.length > 0 || manualExtras.length > 0) && (
                      <div className="mt-4 space-y-2">
                        {additionalServices.map((s) => (
                          <div
                            key={s.id}
                            className="flex justify-between items-center p-3 border rounded-lg animate-fade-in"
                          >
                            <span>
                              {s.name}{' '}
                              <span className="text-xs text-muted-foreground ml-1">(Catálogo)</span>
                            </span>
                            <div className="flex items-center gap-4">
                              <span className="font-semibold">R$ {s.price.toFixed(2)}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  setAdditionalServices((prev) => prev.filter((x) => x.id !== s.id))
                                }
                              >
                                <Trash2 className="size-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {manualExtras.map((m) => (
                          <div
                            key={m.id}
                            className="flex justify-between items-center p-3 border rounded-lg animate-fade-in"
                          >
                            <span>
                              {m.description}{' '}
                              <span className="text-xs text-muted-foreground ml-1">(Manual)</span>
                            </span>
                            <div className="flex items-center gap-4">
                              <span className="font-semibold">R$ {m.price.toFixed(2)}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  setManualExtras((prev) => prev.filter((x) => x.id !== m.id))
                                }
                              >
                                <Trash2 className="size-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-border shadow-sm">
                  <CardHeader className="bg-muted/30 pb-4 border-b">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ShoppingBag className="size-5 text-primary" /> Venda de Produtos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex gap-2">
                      <Select value={productToAdd} onValueChange={setProductToAdd}>
                        <SelectTrigger className="flex-1 h-12">
                          <SelectValue placeholder="Buscar produto..." />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name} - R$ {p.price.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleAddProduct}
                        className="h-12 w-12 shrink-0"
                      >
                        <Plus className="size-5" />
                      </Button>
                    </div>

                    {selectedProducts.length > 0 && (
                      <div className="mt-6 space-y-3">
                        <Label className="text-xs text-muted-foreground uppercase tracking-wider">
                          Itens no Carrinho
                        </Label>
                        {selectedProducts.map((sp) => (
                          <div
                            key={sp.product_id}
                            className="flex items-center justify-between gap-4 p-3 rounded-lg border bg-background shadow-sm animate-fade-in"
                          >
                            <div className="flex-1 font-medium truncate">{sp.product.name}</div>
                            <div className="flex items-center gap-3">
                              <Input
                                type="number"
                                className="w-16 h-9 text-center"
                                min={1}
                                value={sp.quantity}
                                onChange={(e) => {
                                  const qty = parseInt(e.target.value)
                                  if (qty <= 0)
                                    setSelectedProducts(
                                      selectedProducts.filter(
                                        (x) => x.product_id !== sp.product_id,
                                      ),
                                    )
                                  else
                                    setSelectedProducts(
                                      selectedProducts.map((x) =>
                                        x.product_id === sp.product_id
                                          ? { ...x, quantity: qty }
                                          : x,
                                      ),
                                    )
                                }}
                              />
                              <div className="w-20 text-right font-semibold">
                                R$ {(sp.product.price * sp.quantity).toFixed(2)}
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() =>
                                  setSelectedProducts(
                                    selectedProducts.filter((x) => x.product_id !== sp.product_id),
                                  )
                                }
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-5">
                <Card className="border-border shadow-md sticky top-20 bg-card overflow-hidden">
                  <div className="h-2 w-full bg-primary" />
                  <CardHeader className="pb-4 border-b">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <ReceiptText className="size-5 text-primary" /> Resumo da Venda
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Serviços e Extras</span>
                        <span className="font-medium">
                          R$ {isNaN(servicesTotal) ? '0.00' : servicesTotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Produtos</span>
                        <span className="font-medium">R$ {productsTotal.toFixed(2)}</span>
                      </div>

                      <div className="space-y-3 pt-4 border-t">
                        <Label>Desconto</Label>
                        <div className="flex gap-2">
                          <Select
                            value={discount.type}
                            onValueChange={(v: 'fixed' | 'percentage') =>
                              setDiscount({ ...discount, type: v })
                            }
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fixed">Fixo (R$)</SelectItem>
                              <SelectItem value="percentage">Percent (%)</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            type="number"
                            min="0"
                            step={discount.type === 'percentage' ? '1' : '0.01'}
                            value={discount.value}
                            onChange={(e) =>
                              setDiscount({ ...discount, value: parseFloat(e.target.value) || 0 })
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <Separator />
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-bold text-lg">Total Geral</span>
                        <span className="font-bold text-2xl text-primary">
                          R$ {grandTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <Label>Forma de Pagamento</Label>
                      <Select
                        required
                        value={svcForm.payment_method}
                        onValueChange={(v) => setSvcForm({ ...svcForm, payment_method: v })}
                      >
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Selecione o pagamento..." />
                        </SelectTrigger>
                        <SelectContent>
                          {paymentMethods.map((pm) => (
                            <SelectItem key={pm.id} value={pm.id}>
                              {pm.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="pb-8 px-6">
                    <Button
                      type="button"
                      onClick={() => {
                        if (!svcForm.payment_method)
                          return toast({
                            title: 'Selecione o método de pagamento',
                            variant: 'destructive',
                          })
                        if (!isManual && !svcForm.appointment_id)
                          return toast({ title: 'Selecione o agendamento', variant: 'destructive' })
                        setShowTicket(true)
                      }}
                      disabled={isSubmitting || (!isManual && !svcForm.appointment_id)}
                      size="lg"
                      className="w-full text-base h-14 shadow-lg font-bold"
                    >
                      Revisar e Finalizar
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="package" className="space-y-6">
            <Card className="max-w-2xl mx-auto border-border shadow-sm">
              <CardHeader className="bg-muted/30 pb-4 border-b">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Landmark className="size-5 text-primary" /> Vender Novo Pacote
                </CardTitle>
                <CardDescription>Selecione o cliente, pacote e quem está vendendo.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSellPackage} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label>Profissional (Vendedor)</Label>
                      <Select
                        required
                        value={pkgForm.barber_id}
                        onValueChange={(v) => setPkgForm({ ...pkgForm, barber_id: v })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Quem vendeu?" />
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
                      <Label>Cliente</Label>
                      <Select
                        required
                        value={pkgForm.client_id}
                        onValueChange={(v) => setPkgForm({ ...pkgForm, client_id: v })}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Para qual cliente?" />
                        </SelectTrigger>
                        <SelectContent>
                          {clients.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name} {c.surname || ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Pacote</Label>
                    <Select
                      required
                      value={pkgForm.package_id}
                      onValueChange={(v) => setPkgForm({ ...pkgForm, package_id: v })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione o pacote..." />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name} - R$ {p.price.toFixed(2)} ({p.quantity}x)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Método de Pagamento</Label>
                    <Select
                      required
                      value={pkgForm.payment_method}
                      onValueChange={(v) => setPkgForm({ ...pkgForm, payment_method: v })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Selecione o pagamento..." />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((pm) => (
                          <SelectItem key={pm.id} value={pm.id}>
                            {pm.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 text-base font-bold shadow-md mt-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Processando...' : 'Confirmar Venda de Pacote'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <CheckoutHistory />
          </TabsContent>
        </Tabs>
      )}

      <Dialog open={showTicket} onOpenChange={setShowTicket}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ticket de Resumo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm mt-2">
            <div>
              <span className="text-muted-foreground">Cliente:</span>{' '}
              <span className="font-semibold text-base">
                {ticketClientName || 'Não identificado'}
              </span>
            </div>

            <Separator />

            <div className="font-semibold uppercase text-xs tracking-wider">Serviços e Extras</div>
            <div className="flex justify-between">
              <span>
                {ticketServiceName || 'Serviço Base'}{' '}
                <span className="text-muted-foreground text-xs">(Agendado)</span>
              </span>
              <span>R$ {scheduledPrice.toFixed(2)}</span>
            </div>
            {additionalServices.map((s) => (
              <div key={s.id} className="flex justify-between">
                <span>{s.name}</span>
                <span>R$ {s.price.toFixed(2)}</span>
              </div>
            ))}
            {manualExtras.map((m) => (
              <div key={m.id} className="flex justify-between text-muted-foreground">
                <span>{m.description} (Extra)</span>
                <span>R$ {m.price.toFixed(2)}</span>
              </div>
            ))}

            {selectedProducts.length > 0 && (
              <>
                <Separator />
                <div className="font-semibold uppercase text-xs tracking-wider">Produtos</div>
                {selectedProducts.map((p) => (
                  <div key={p.product_id} className="flex justify-between">
                    <span>
                      {p.quantity}x {p.product.name}
                    </span>
                    <span>R$ {(p.quantity * p.product.price).toFixed(2)}</span>
                  </div>
                ))}
              </>
            )}

            {discountAmount > 0 && (
              <>
                <Separator />
                <div className="flex justify-between text-destructive font-medium">
                  <span>Desconto Aplicado</span>
                  <span>- R$ {discountAmount.toFixed(2)}</span>
                </div>
              </>
            )}

            <Separator />
            <div className="flex justify-between font-bold text-xl pt-2">
              <span>Total a Pagar</span>
              <span>R$ {grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setShowTicket(false)}>
              Voltar
            </Button>
            <Button onClick={handleCloseService} disabled={isSubmitting}>
              {isSubmitting ? 'Processando...' : 'Confirmar e Cobrar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
