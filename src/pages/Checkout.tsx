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
import { Plus, Trash2, Check } from 'lucide-react'
import {
  getBarbers,
  getClients,
  getPackages,
  getCommissionRules,
  getAppointments,
  getProducts,
  updateProduct,
  createProductPurchase,
  createClientPackage,
  createCommission,
  updateAppointment,
  consumePackage,
} from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { addDays, format } from 'date-fns'

export default function Checkout() {
  const [barbers, setBarbers] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [rules, setRules] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])

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
  const [selectedProducts, setSelectedProducts] = useState<
    { product_id: string; product: any; quantity: number }[]
  >([])
  const [productToAdd, setProductToAdd] = useState('')

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
      getCommissionRules(),
      getAppointments(`status != 'Concluído' && status != 'Cancelado'`),
      getProducts(),
    ]).then(([b, c, p, r, a, prods]) => {
      setBarbers(b)
      setClients(c)
      setPackages(p)
      setRules(r)
      setAppointments(a)
      setProducts(prods.filter((prod) => prod.is_active !== false))
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
      const pkg = packages.find((p) => p.id === pkgForm.package_id)
      const barber = barbers.find((b) => b.id === pkgForm.barber_id)
      if (!pkg || !barber) throw new Error('Dados inválidos')

      const expiresAt = addDays(new Date(), 90)
      await createClientPackage({
        client_id: pkgForm.client_id,
        package_id: pkg.id,
        barber_id: barber.id,
        remaining_uses: pkg.quantity,
        expires_at: format(expiresAt, 'yyyy-MM-dd 23:59:59'),
      })

      let commAmount = 0
      const rule = rules.find(
        (r) => r.barber_id === barber.id && r.item_id === pkg.id && r.item_type === 'package',
      )
      if (rule) {
        commAmount = rule.type === 'percentage' ? pkg.price * (rule.value / 100) : rule.value
      } else {
        commAmount =
          barber.commission_type === 'percentage'
            ? pkg.price * ((barber.commission_value || 0) / 100)
            : barber.commission_value || 0
      }

      if (commAmount > 0) {
        const isCredit = pkgForm.payment_method === 'credito'
        const status = isCredit ? 'pending' : 'available'
        const due_date = isCredit ? format(addDays(new Date(), 30), 'yyyy-MM-dd 12:00:00') : ''

        await createCommission({
          barber_id: barber.id,
          amount: commAmount,
          type: 'package_sale',
          date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          is_advance: false,
          payment_method: pkgForm.payment_method,
          status,
          due_date: due_date || undefined,
        })
      }

      toast({ title: 'Pacote vendido com sucesso!' })
      setPkgForm({ barber_id: '', client_id: '', package_id: '', payment_method: '' })
      setSuccessState({ type: 'package', message: 'Pacote vendido com sucesso!' })
    } catch (err: any) {
      toast({ title: 'Erro ao vender pacote', variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseService = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!svcForm.appointment_id || !svcForm.service_price || !svcForm.payment_method) {
      return toast({ title: 'Preencha todos os campos obrigatórios', variant: 'destructive' })
    }

    setIsSubmitting(true)
    try {
      const apt = appointments.find((a) => a.id === svcForm.appointment_id)
      if (!apt) throw new Error('Agendamento não encontrado')

      const finalServicePrice = parseFloat(svcForm.service_price.toString().replace(',', '.'))
      if (isNaN(finalServicePrice)) throw new Error('Preço do serviço inválido')

      await updateAppointment(apt.id, { status: 'Concluído', price: finalServicePrice })

      if (apt.client_package_id && apt.expand?.client_package_id) {
        const currentUses = apt.expand.client_package_id.remaining_uses || 0
        await consumePackage(apt.client_package_id, {
          remaining_uses: Math.max(0, currentUses - 1),
        })
      }

      const barber = barbers.find((b) => b.id === apt.barber_id)
      const now = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
      const isCredit = svcForm.payment_method === 'credito'
      const status = isCredit ? 'pending' : 'available'
      const due_date = isCredit ? format(addDays(new Date(), 30), 'yyyy-MM-dd 12:00:00') : ''

      if (barber && finalServicePrice > 0) {
        let commAmount = 0
        const rule = rules.find(
          (r) =>
            r.barber_id === barber.id && r.item_id === apt.service_id && r.item_type === 'service',
        )
        if (rule) {
          commAmount =
            rule.type === 'percentage' ? finalServicePrice * (rule.value / 100) : rule.value
        } else {
          commAmount =
            barber.commission_type === 'percentage'
              ? finalServicePrice * ((barber.commission_value || 0) / 100)
              : barber.commission_value || 0
        }

        if (commAmount > 0) {
          await createCommission({
            barber_id: barber.id,
            amount: commAmount,
            type: 'service',
            date: now,
            is_advance: false,
            payment_method: svcForm.payment_method,
            status,
            due_date: due_date || undefined,
          })
        }
      }

      for (const sp of selectedProducts) {
        const prod = sp.product

        if ((prod.stock_quantity || 0) - sp.quantity < 0) {
          toast({ title: `Aviso: Estoque de ${prod.name} ficou negativo.`, variant: 'destructive' })
        }

        await updateProduct(prod.id, { stock_quantity: (prod.stock_quantity || 0) - sp.quantity })

        await createProductPurchase({
          client_id: apt.client_id,
          product_id: prod.id,
          barber_id: apt.barber_id,
          price_at_sale: prod.price,
          date: now,
        })

        if (barber) {
          let prodComm = 0
          const pRule = rules.find(
            (r) => r.barber_id === barber.id && r.item_id === prod.id && r.item_type === 'product',
          )
          if (pRule) {
            prodComm =
              pRule.type === 'percentage'
                ? prod.price * sp.quantity * (pRule.value / 100)
                : pRule.value * sp.quantity
          } else {
            prodComm =
              barber.commission_type === 'percentage'
                ? prod.price * sp.quantity * ((barber.commission_value || 0) / 100)
                : (barber.commission_value || 0) * sp.quantity
          }

          if (prodComm > 0) {
            await createCommission({
              barber_id: barber.id,
              amount: prodComm,
              type: 'product',
              date: now,
              is_advance: false,
              payment_method: svcForm.payment_method,
              status,
              due_date: due_date || undefined,
            })
          }
        }
      }

      toast({ title: 'Serviço e produtos finalizados com sucesso!' })
      setSvcForm({ appointment_id: '', service_price: '', payment_method: '' })
      setSelectedProducts([])
      loadData()
      setSuccessState({ type: 'service', message: 'Serviço e produtos finalizados com sucesso!' })
    } catch (err: any) {
      toast({ title: err.message || 'Erro ao finalizar serviço', variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAppointmentChange = (val: string) => {
    const apt = appointments.find((a) => a.id === val)
    let price = apt?.price?.toString() || apt?.expand?.service_id?.price?.toString() || '0'

    if (apt?.expand?.client_package_id?.expand?.package_id) {
      const pkg = apt.expand.client_package_id.expand.package_id
      if (pkg.quantity > 0) {
        price = (pkg.price / pkg.quantity).toFixed(2)
      }
    }

    setSvcForm({
      ...svcForm,
      appointment_id: val,
      service_price: price,
    })
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

  const updateProductQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      setSelectedProducts(selectedProducts.filter((sp) => sp.product_id !== id))
    } else {
      setSelectedProducts(
        selectedProducts.map((sp) => (sp.product_id === id ? { ...sp, quantity: qty } : sp)),
      )
    }
  }

  const removeProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter((sp) => sp.product_id !== id))
  }

  const productsTotal = selectedProducts.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0,
  )
  const serviceTotal = parseFloat(svcForm.service_price.replace(',', '.') || '0')
  const grandTotal = (isNaN(serviceTotal) ? 0 : serviceTotal) + productsTotal

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Checkout Expresso</h2>
        <p className="text-muted-foreground">Finalize serviços ou venda novos pacotes.</p>
      </div>

      {successState ? (
        <Card className="animate-fade-in mt-6">
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-16">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold">{successState.message}</h2>
            <p className="text-muted-foreground text-center">
              A transação foi registrada no financeiro.
              <br />
              O estado do checkout foi reiniciado.
            </p>
            <Button onClick={() => setSuccessState(null)} size="lg" className="mt-4">
              Novo Atendimento
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs
          defaultValue="service"
          className="w-full"
          onValueChange={() => {
            setPkgForm({ barber_id: '', client_id: '', package_id: '', payment_method: '' })
            setSvcForm({ appointment_id: '', service_price: '', payment_method: '' })
            setSelectedProducts([])
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="service">Fechar Serviço</TabsTrigger>
            <TabsTrigger value="package">Vender Pacote</TabsTrigger>
          </TabsList>

          <TabsContent value="service">
            <Card>
              <CardHeader>
                <CardTitle>Finalizar Serviço & Produtos</CardTitle>
                <CardDescription>
                  Selecione o agendamento concluído e adicione produtos se houver.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCloseService} className="space-y-6">
                  <div className="space-y-2">
                    <Label>Agendamento Pendente</Label>
                    <Select
                      required
                      value={svcForm.appointment_id}
                      onValueChange={handleAppointmentChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o agendamento..." />
                      </SelectTrigger>
                      <SelectContent>
                        {appointments.length === 0 && (
                          <SelectItem value="empty" disabled>
                            Nenhum agendamento pendente
                          </SelectItem>
                        )}
                        {appointments.map((a) => (
                          <SelectItem key={a.id} value={a.id}>
                            {a.date ? a.date.substring(0, 10).split('-').reverse().join('/') : ''}{' '}
                            às {a.time} - {a.expand?.client_id?.name} ({a.expand?.service_id?.name})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Valor do Serviço (R$)</Label>
                    <Input
                      required
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={svcForm.service_price}
                      onChange={(e) => setSvcForm({ ...svcForm, service_price: e.target.value })}
                    />
                  </div>

                  <div className="space-y-4 border rounded-md p-4 bg-muted/20">
                    <div>
                      <Label className="text-base font-semibold">Produtos Adicionais</Label>
                      <p className="text-xs text-muted-foreground mb-3">
                        Vendeu algum produto durante o serviço? Adicione aqui.
                      </p>
                      <div className="flex gap-2">
                        <Select value={productToAdd} onValueChange={setProductToAdd}>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Buscar produto..." />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.name} - R$ {p.price.toFixed(2)} (Estoque: {p.stock_quantity || 0}
                                )
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button type="button" variant="secondary" onClick={handleAddProduct}>
                          <Plus className="size-4" />
                        </Button>
                      </div>
                    </div>

                    {selectedProducts.length > 0 && (
                      <div className="space-y-2">
                        {selectedProducts.map((sp) => (
                          <div
                            key={sp.product_id}
                            className="flex items-center justify-between gap-4 text-sm bg-background p-2 rounded border"
                          >
                            <div className="flex-1 font-medium truncate">{sp.product.name}</div>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                className="w-16 h-8 text-center"
                                min={1}
                                value={sp.quantity}
                                onChange={(e) =>
                                  updateProductQuantity(sp.product_id, parseInt(e.target.value))
                                }
                              />
                              <div className="w-20 text-right text-muted-foreground">
                                R$ {(sp.product.price * sp.quantity).toFixed(2)}
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => removeProduct(sp.product_id)}
                              >
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <div className="text-right text-sm font-medium pt-2 border-t">
                          Total Produtos: R$ {productsTotal.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Método de Pagamento</Label>
                    <Select
                      required
                      value={svcForm.payment_method}
                      onValueChange={(v) => setSvcForm({ ...svcForm, payment_method: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o pagamento..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Dinheiro</SelectItem>
                        <SelectItem value="pix">Pix</SelectItem>
                        <SelectItem value="debito">Débito</SelectItem>
                        <SelectItem value="credito">Crédito</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4 border-t flex justify-between items-center font-bold text-lg">
                    <span>Total Geral:</span>
                    <span className="text-primary">R$ {grandTotal.toFixed(2)}</span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || !svcForm.appointment_id}
                  >
                    {isSubmitting ? 'Processando...' : 'Concluir Venda'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="package">
            <Card>
              <CardHeader>
                <CardTitle>Vender Pacote</CardTitle>
                <CardDescription>
                  Selecione o profissional vendedor, o cliente e o pacote desejado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSellPackage} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profissional (Vendedor)</Label>
                    <Select
                      required
                      value={pkgForm.barber_id}
                      onValueChange={(v) => setPkgForm({ ...pkgForm, barber_id: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione quem está vendendo..." />
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
                      <SelectTrigger>
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

                  <div className="space-y-2">
                    <Label>Pacote</Label>
                    <Select
                      required
                      value={pkgForm.package_id}
                      onValueChange={(v) => setPkgForm({ ...pkgForm, package_id: v })}
                    >
                      <SelectTrigger>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o pagamento..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Dinheiro</SelectItem>
                        <SelectItem value="pix">Pix</SelectItem>
                        <SelectItem value="debito">Débito</SelectItem>
                        <SelectItem value="credito">Crédito</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Processando...' : 'Confirmar Venda'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
