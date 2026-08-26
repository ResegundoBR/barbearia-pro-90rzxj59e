import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
  Plus,
  Trash2,
  Check,
  ShoppingBag,
  Scissors,
  ReceiptText,
  User,
  ArrowRight,
  ArrowLeft,
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
  getServices,
} from '@/services/api'
import pb from '@/lib/pocketbase/client'
import { useToast } from '@/hooks/use-toast'
import { Separator } from '@/components/ui/separator'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import { CheckoutHistory } from '@/components/CheckoutHistory'
import { cn } from '@/lib/utils'

export function CheckoutMobile() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<'service' | 'package' | 'history'>('service')
  const [step, setStep] = useState<1 | 2 | 3>(1)

  // Lazy loaded states per step / tab
  const [clients, setClients] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [barbers, setBarbers] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [clientPackages, setClientPackages] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])

  // Flags for loaded steps
  const [loadedStep1, setLoadedStep1] = useState(false)
  const [loadedStep2, setLoadedStep2] = useState(false)
  const [loadedStep3, setLoadedStep3] = useState(false)
  const [loadedPackagesTab, setLoadedPackagesTab] = useState(false)

  // Form states for service checkout
  const [isManual, setIsManual] = useState(false)
  const [svcForm, setSvcForm] = useState({
    appointment_id: '',
    service_price: '',
    payment_method: '',
  })
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

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successState, setSuccessState] = useState<{
    type: 'service' | 'package'
    message: string
  } | null>(null)

  // Package sale form
  const [pkgForm, setPkgForm] = useState({
    barber_id: '',
    client_id: '',
    package_id: '',
    payment_method: '',
  })

  // STEP 1 DATA LOADING (Clients & Appointments)
  useEffect(() => {
    if (activeTab === 'service' && !loadedStep1) {
      Promise.all([
        getClients(),
        getAppointments(`status != 'Concluído' && status != 'Cancelado' && status != 'FALTOU'`),
      ]).then(([c, a]) => {
        setClients(c)
        setAppointments(a)
        setLoadedStep1(true)
      })
    }
  }, [activeTab, loadedStep1])

  // STEP 2 DATA LOADING (Services, Barbers, Products, ClientPackages)
  const loadStep2Data = async () => {
    if (loadedStep2) return
    try {
      const orgId = pb.authStore.record?.organization_id
      const [b, svcs, prods, cp] = await Promise.all([
        getBarbers(),
        getServices(),
        pb.collection('products').getFullList({
          filter: `is_active=true${orgId ? ` && organization_id='${orgId}'` : ''}`,
          expand: 'category_id',
        }),
        getClientPackages(),
      ])
      setBarbers(b)
      setServices(svcs)
      setProducts(prods.filter((prod) => prod.is_active !== false))
      setClientPackages(
        cp.filter(
          (pkg) =>
            pkg.remaining_uses > 0 && (!pkg.expires_at || new Date(pkg.expires_at) >= new Date()),
        ),
      )
      setLoadedStep2(true)
    } catch (e) {
      console.error('Error loading step 2 data', e)
    }
  }

  // STEP 3 DATA LOADING (Payment Methods)
  const loadStep3Data = async () => {
    if (loadedStep3) return
    try {
      const orgId = pb.authStore.record?.organization_id
      const pms = await pb
        .collection('payment_methods')
        .getFullList({
          filter: `is_active=true${orgId ? ` && organization_id='${orgId}'` : ''}`,
          sort: 'name',
        })
        .catch(() => [])
      setPaymentMethods(pms)
      setLoadedStep3(true)
    } catch (e) {
      console.error('Error loading step 3 data', e)
    }
  }

  // PACKAGE TAB DATA LOADING
  useEffect(() => {
    if (activeTab === 'package' && !loadedPackagesTab) {
      const orgId = pb.authStore.record?.organization_id
      Promise.all([
        getBarbers(),
        getClients(),
        getPackages(),
        pb
          .collection('payment_methods')
          .getFullList({
            filter: `is_active=true${orgId ? ` && organization_id='${orgId}'` : ''}`,
            sort: 'name',
          })
          .catch(() => []),
      ]).then(([b, c, p, pms]) => {
        setBarbers(b)
        setClients(c)
        setPackages(p)
        setPaymentMethods(pms)
        setLoadedPackagesTab(true)
      })
    }
  }, [activeTab, loadedPackagesTab])

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

  const goToStep2 = async () => {
    if (!isManual && !svcForm.appointment_id) {
      return toast({
        title: 'Selecione um agendamento ou atendimento avulso',
        variant: 'destructive',
      })
    }
    if (isManual && !manualForm.client_id) {
      return toast({ title: 'Selecione o cliente', variant: 'destructive' })
    }
    await loadStep2Data()
    setStep(2)
  }

  const goToStep3 = async () => {
    if (isManual && !manualForm.service_id) {
      return toast({ title: 'Selecione o serviço principal', variant: 'destructive' })
    }
    if (isManual && !manualForm.barber_id) {
      return toast({ title: 'Selecione o profissional', variant: 'destructive' })
    }
    await loadStep3Data()
    setStep(3)
  }

  const handleCloseService = async () => {
    if (!svcForm.payment_method) {
      return toast({ title: 'Selecione o método de pagamento', variant: 'destructive' })
    }

    setIsSubmitting(true)
    try {
      const pmRecord = paymentMethods.find((p) => p.id === svcForm.payment_method)
      if (!pmRecord) throw new Error('Método de pagamento inválido')

      for (const sp of selectedProducts) {
        const prod = sp.product
        if ((prod.stock_quantity || 0) - sp.quantity < 0) {
          throw new Error(`Estoque insuficiente para: ${prod.name}.`)
        }
      }

      const payload = {
        isManual,
        manualForm: isManual ? manualForm : undefined,
        svcForm: {
          appointment_id: svcForm.appointment_id,
          service_price: scheduledPrice.toString(),
          payment_method: svcForm.payment_method,
        },
        selectedProducts: selectedProducts.map((sp) => ({
          product_id: sp.product_id,
          quantity: sp.quantity,
          product: sp.product,
        })),
        packageToConsume,
        extraServices: [
          ...additionalServices.map((s) => ({
            service_id: s.service_id,
            price: s.price,
            name: s.name,
          })),
          ...manualExtras.map((m) => ({
            description: m.description,
            name: m.description,
            price: m.price,
          })),
        ],
        discount: discount,
      }

      await pb.send('/backend/v1/checkout/service', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      })

      setSvcForm({ appointment_id: '', service_price: '', payment_method: '' })
      setManualForm({ client_id: '', barber_id: '', service_id: '' })
      setIsManual(false)
      setSelectedProducts([])
      setAdditionalServices([])
      setManualExtras([])
      setDiscount({ type: 'fixed', value: 0 })
      setPackageToConsume(null)
      setStep(1)
      setLoadedStep1(false)
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
    } catch (err: any) {
      toast({
        title: err instanceof Error ? err.message : getErrorMessage(err),
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (successState) {
    return (
      <Card className="mt-4 border-emerald-500/20 bg-emerald-500/5">
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-12 px-4 text-center">
          <div className="h-16 w-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Check className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-600">{successState.message}</h2>
          <p className="text-xs text-muted-foreground max-w-xs">
            A transação foi registrada no financeiro e o estoque foi sincronizado.
          </p>
          <Button
            onClick={() => setSuccessState(null)}
            size="lg"
            className="w-full min-h-[44px] mt-2 font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Novo Atendimento
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4 pb-20 max-w-lg mx-auto">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-gradient">Checkout POS</h2>
        <p className="text-xs text-muted-foreground">Finalize atendimentos e venda pacotes</p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => {
          setActiveTab(v as any)
          setStep(1)
        }}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="service" className="text-xs">
            Serviço
          </TabsTrigger>
          <TabsTrigger value="package" className="text-xs">
            Pacotes
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs">
            Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="service" className="space-y-4">
          {/* Wizard Stepper Indicator */}
          <div className="flex items-center justify-between px-2 py-2.5 bg-muted/40 rounded-xl border">
            <div
              className={cn(
                'flex items-center gap-1.5 text-xs font-bold',
                step === 1 ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              <span
                className={cn(
                  'size-6 rounded-full flex items-center justify-center text-[11px]',
                  step === 1
                    ? 'bg-primary text-primary-foreground'
                    : step > 1
                      ? 'bg-emerald-600 text-white'
                      : 'bg-muted text-muted-foreground',
                )}
              >
                {step > 1 ? '✓' : '1'}
              </span>
              <span>Cliente</span>
            </div>
            <div className="h-0.5 w-6 bg-border" />
            <div
              className={cn(
                'flex items-center gap-1.5 text-xs font-bold',
                step === 2 ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              <span
                className={cn(
                  'size-6 rounded-full flex items-center justify-center text-[11px]',
                  step === 2
                    ? 'bg-primary text-primary-foreground'
                    : step > 2
                      ? 'bg-emerald-600 text-white'
                      : 'bg-muted text-muted-foreground',
                )}
              >
                {step > 2 ? '✓' : '2'}
              </span>
              <span>Itens</span>
            </div>
            <div className="h-0.5 w-6 bg-border" />
            <div
              className={cn(
                'flex items-center gap-1.5 text-xs font-bold',
                step === 3 ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              <span
                className={cn(
                  'size-6 rounded-full flex items-center justify-center text-[11px]',
                  step === 3
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground',
                )}
              >
                3
              </span>
              <span>Pagamento</span>
            </div>
          </div>

          {/* STEP 1: Selecionar Cliente e Agendamento */}
          {step === 1 && (
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="size-4 text-primary" /> Etapa 1: Cliente e Agendamento
                </CardTitle>
                <CardDescription className="text-xs">
                  Selecione o agendamento de hoje ou inicie um atendimento avulso.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs">Agendamento ou Modalidade</Label>
                  <Select value={svcForm.appointment_id} onValueChange={handleAppointmentChange}>
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue placeholder="Selecione para iniciar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual" className="font-bold text-primary">
                        + Novo Atendimento Avulso
                      </SelectItem>
                      {appointments.map((a) => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.time} - {a.expand?.client_id?.name} ({a.expand?.service_id?.name})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {isManual && (
                  <div className="space-y-3 p-3 bg-muted/30 border border-dashed rounded-lg">
                    <Label className="text-xs font-semibold">Cliente do Atendimento</Label>
                    <Select
                      value={manualForm.client_id}
                      onValueChange={(v) => {
                        setManualForm({ ...manualForm, client_id: v, service_id: '' })
                        setPackageToConsume(null)
                        setSvcForm((prev) => ({ ...prev, service_price: '' }))
                      }}
                    >
                      <SelectTrigger className="min-h-[44px]">
                        <SelectValue placeholder="Selecione o cliente..." />
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
                )}

                <Button onClick={goToStep2} className="w-full min-h-[44px] font-bold gap-2 mt-4">
                  Próximo: Serviços & Produtos <ArrowRight className="size-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* STEP 2: Selecionar Serviços e Produtos */}
          {step === 2 && (
            <div className="space-y-4">
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Scissors className="size-4 text-primary" /> Etapa 2: Serviços & Produtos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isManual && (
                    <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Profissional</Label>
                        <Select
                          value={manualForm.barber_id}
                          onValueChange={(v) => setManualForm({ ...manualForm, barber_id: v })}
                        >
                          <SelectTrigger className="min-h-[44px]">
                            <SelectValue placeholder="Selecione o profissional..." />
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

                      <div className="space-y-1.5">
                        <Label className="text-xs">Serviço Principal</Label>
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
                        >
                          <SelectTrigger className="min-h-[44px]">
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

                  <div className="space-y-1.5">
                    <Label className="text-xs">Valor do Serviço Base (R$)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={svcForm.service_price}
                      onChange={(e) => setSvcForm({ ...svcForm, service_price: e.target.value })}
                      className="min-h-[44px] font-bold"
                    />
                    {packageToConsume && (
                      <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-1">
                        <Check className="size-3" /> Pacote aplicado com sucesso (R$ 0).
                      </span>
                    )}
                  </div>

                  {/* Serviços Adicionais */}
                  <div className="space-y-2 pt-2 border-t">
                    <Label className="text-xs">Adicionar Serviço Extra</Label>
                    <div className="flex gap-2">
                      <Select value={serviceToAdd} onValueChange={setServiceToAdd}>
                        <SelectTrigger className="flex-1 min-h-[44px]">
                          <SelectValue placeholder="Buscar serviço..." />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.name} - R$ {s.price.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleAddService}
                        className="min-h-[44px] px-3 font-semibold"
                      >
                        + Add
                      </Button>
                    </div>

                    {additionalServices.map((s) => (
                      <div
                        key={s.id}
                        className="flex justify-between items-center p-2.5 bg-muted/40 rounded-lg text-xs"
                      >
                        <span className="font-medium truncate">{s.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">R$ {s.price.toFixed(2)}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-7 text-destructive"
                            onClick={() =>
                              setAdditionalServices((prev) => prev.filter((x) => x.id !== s.id))
                            }
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Produtos */}
                  <div className="space-y-2 pt-2 border-t">
                    <Label className="text-xs flex items-center gap-1">
                      <ShoppingBag className="size-3.5" /> Vender Produto
                    </Label>
                    <div className="flex gap-2">
                      <Select value={productToAdd} onValueChange={setProductToAdd}>
                        <SelectTrigger className="flex-1 min-h-[44px]">
                          <SelectValue placeholder="Buscar produto..." />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name} - R$ {p.price.toFixed(2)} (Estoque: {p.stock_quantity ?? 0})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleAddProduct}
                        className="min-h-[44px] px-3 font-semibold"
                      >
                        + Add
                      </Button>
                    </div>

                    {selectedProducts.map((sp) => (
                      <div
                        key={sp.product_id}
                        className="flex items-center justify-between p-2.5 bg-muted/40 rounded-lg text-xs gap-2"
                      >
                        <span className="font-medium truncate flex-1">{sp.product.name}</span>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            className="w-12 h-8 text-center text-xs p-1"
                            min={1}
                            value={sp.quantity}
                            onChange={(e) => {
                              const qty = parseInt(e.target.value) || 1
                              setSelectedProducts(
                                selectedProducts.map((x) =>
                                  x.product_id === sp.product_id ? { ...x, quantity: qty } : x,
                                ),
                              )
                            }}
                          />
                          <span className="font-bold w-16 text-right">
                            R$ {(sp.product.price * sp.quantity).toFixed(2)}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-7 text-destructive"
                            onClick={() =>
                              setSelectedProducts(
                                selectedProducts.filter((x) => x.product_id !== sp.product_id),
                              )
                            }
                          >
                            <Trash2 className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1 min-h-[44px] gap-1.5"
                >
                  <ArrowLeft className="size-4" /> Voltar
                </Button>
                <Button onClick={goToStep3} className="flex-1 min-h-[44px] font-bold gap-1.5">
                  Próximo: Pagamento <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Pagamento e Finalização */}
          {step === 3 && (
            <div className="space-y-4">
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ReceiptText className="size-4 text-primary" /> Etapa 3: Resumo e Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 bg-muted/40 p-3 rounded-lg text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Serviço Base:</span>
                      <span className="font-semibold">R$ {scheduledPrice.toFixed(2)}</span>
                    </div>
                    {additionalServicesTotal > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Serviços Extras:</span>
                        <span className="font-semibold">
                          R$ {additionalServicesTotal.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {productsTotal > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Produtos:</span>
                        <span className="font-semibold">R$ {productsTotal.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-sm pt-1">
                      <span>Subtotal:</span>
                      <span>R$ {subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Desconto */}
                  <div className="space-y-1.5">
                    <Label className="text-xs">Desconto (opcional)</Label>
                    <div className="flex gap-2">
                      <Select
                        value={discount.type}
                        onValueChange={(v: 'fixed' | 'percentage') =>
                          setDiscount({ ...discount, type: v })
                        }
                      >
                        <SelectTrigger className="w-[110px] min-h-[44px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixo (R$)</SelectItem>
                          <SelectItem value="percentage">% Percentual</SelectItem>
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
                        className="flex-1 min-h-[44px]"
                      />
                    </div>
                  </div>

                  {/* Total Final */}
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 flex justify-between items-center">
                    <span className="font-bold text-sm text-foreground">Total a Cobrar:</span>
                    <span className="font-extrabold text-2xl text-primary">
                      R$ {grandTotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Forma de Pagamento */}
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Forma de Pagamento *</Label>
                    <Select
                      required
                      value={svcForm.payment_method}
                      onValueChange={(v) => setSvcForm({ ...svcForm, payment_method: v })}
                    >
                      <SelectTrigger className="min-h-[44px] text-sm">
                        <SelectValue placeholder="Selecione a forma..." />
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
              </Card>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 min-h-[44px] gap-1.5"
                >
                  <ArrowLeft className="size-4" /> Voltar
                </Button>
                <Button
                  onClick={handleCloseService}
                  disabled={isSubmitting || !svcForm.payment_method}
                  className="flex-1 min-h-[44px] font-bold bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? 'Finalizando...' : 'Confirmar e Cobrar'}
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="package" className="space-y-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Landmark className="size-4 text-primary" /> Vender Pacote de Serviços
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSellPackage} className="space-y-3.5">
                <div className="space-y-1.5">
                  <Label className="text-xs">Profissional Vendedor *</Label>
                  <Select
                    required
                    value={pkgForm.barber_id}
                    onValueChange={(v) => setPkgForm({ ...pkgForm, barber_id: v })}
                  >
                    <SelectTrigger className="min-h-[44px]">
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

                <div className="space-y-1.5">
                  <Label className="text-xs">Cliente *</Label>
                  <Select
                    required
                    value={pkgForm.client_id}
                    onValueChange={(v) => setPkgForm({ ...pkgForm, client_id: v })}
                  >
                    <SelectTrigger className="min-h-[44px]">
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

                <div className="space-y-1.5">
                  <Label className="text-xs">Pacote *</Label>
                  <Select
                    required
                    value={pkgForm.package_id}
                    onValueChange={(v) => setPkgForm({ ...pkgForm, package_id: v })}
                  >
                    <SelectTrigger className="min-h-[44px]">
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

                <div className="space-y-1.5">
                  <Label className="text-xs">Forma de Pagamento *</Label>
                  <Select
                    required
                    value={pkgForm.payment_method}
                    onValueChange={(v) => setPkgForm({ ...pkgForm, payment_method: v })}
                  >
                    <SelectTrigger className="min-h-[44px]">
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
                  className="w-full min-h-[44px] font-bold mt-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processando...' : 'Confirmar Venda de Pacote'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <CheckoutHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
