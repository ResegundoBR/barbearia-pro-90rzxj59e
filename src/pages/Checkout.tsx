import { useState, useMemo } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import useMainStore from '@/stores/main'
import { PlusCircle, Trash2, CheckCircle2 } from 'lucide-react'
import { FeatureGuard } from '@/components/FeatureGuard'

export default function Checkout() {
  const { state, updateAppointmentStatus, updateProductStock } = useMainStore()
  const { toast } = useToast()

  const [selectedAptId, setSelectedAptId] = useState<string>('')
  const [upsellItems, setUpsellItems] = useState<{ id: string; qty: number }[]>([])
  const [paymentMethod, setPaymentMethod] = useState<'Pix' | 'Cartão' | 'Dinheiro'>('Pix')

  const pendingApts = useMemo(
    () => state.appointments.filter((a) => a.date === '2026-05-03' && a.status !== 'Concluído'),
    [state.appointments],
  )

  const selectedApt = state.appointments.find((a) => a.id === selectedAptId)
  const customer = selectedApt ? state.customers.find((c) => c.id === selectedApt.customerId) : null

  const addProduct = (productId: string) => {
    setUpsellItems((prev) => {
      const existing = prev.find((i) => i.id === productId)
      if (existing) return prev.map((i) => (i.id === productId ? { ...i, qty: i.qty + 1 } : i))
      return [...prev, { id: productId, qty: 1 }]
    })
  }

  const removeProduct = (productId: string) => {
    setUpsellItems((prev) => prev.filter((i) => i.id !== productId))
  }

  const totals = useMemo(() => {
    const serviceTotal = selectedApt?.price || 0
    const productsTotal = upsellItems.reduce((acc, item) => {
      const p = state.products.find((prod) => prod.id === item.id)
      return acc + (p?.price || 0) * item.qty
    }, 0)
    return { serviceTotal, productsTotal, grandTotal: serviceTotal + productsTotal }
  }, [selectedApt, upsellItems, state.products])

  const handleCheckout = () => {
    if (!selectedApt) return

    // Update state
    updateAppointmentStatus(selectedApt.id, 'Concluído')
    upsellItems.forEach((item) => updateProductStock(item.id, item.qty))

    toast({
      title: 'Venda Concluída com Sucesso',
      description: `Total: R$ ${totals.grandTotal.toFixed(2)} via ${paymentMethod}`,
      action: <CheckCircle2 className="text-emerald-500" />,
    })

    // Reset
    setSelectedAptId('')
    setUpsellItems([])
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Checkout / POS</h2>
        <p className="text-muted-foreground">
          Finalize atendimentos e adicione produtos adicionais.
        </p>
      </div>

      <FeatureGuard
        requiredTier="Platinum"
        fallbackMessage="O sistema completo de POS (Checkout) está disponível no plano Platinum."
      >
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Selecionar Atendimento</CardTitle>
                <CardDescription>Agendamentos pendentes de hoje.</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedAptId} onValueChange={setSelectedAptId}>
                  <SelectTrigger className="min-h-[48px] bg-background">
                    <SelectValue placeholder="Selecione um cliente ou agendamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {pendingApts.length === 0 && (
                      <SelectItem value="none" disabled>
                        Nenhum agendamento pendente
                      </SelectItem>
                    )}
                    {pendingApts.map((apt) => {
                      const c = state.customers.find((x) => x.id === apt.customerId)
                      return (
                        <SelectItem key={apt.id} value={apt.id}>
                          {apt.time} - {c?.name} ({apt.service})
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className={!selectedAptId ? 'opacity-50 pointer-events-none' : ''}>
              <CardHeader>
                <CardTitle>Adicionar Produtos (Upsell)</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {state.products.map((p) => (
                  <div
                    key={p.id}
                    className="border rounded-md p-3 text-center cursor-pointer hover:border-primary transition-colors bg-background"
                    onClick={() => addProduct(p.id)}
                  >
                    <div className="text-xs font-semibold mb-1 truncate" title={p.name}>
                      {p.name}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      R$ {p.price.toFixed(2)}
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full h-9 text-xs min-h-[44px]"
                    >
                      <PlusCircle className="size-3 mr-1" /> Add
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="sticky top-6 border-primary/50 shadow-lg shadow-primary/5">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <CardTitle>Resumo da Venda</CardTitle>
              {customer && <CardDescription>Cliente: {customer.name}</CardDescription>}
            </CardHeader>
            <CardContent className="pt-6 space-y-4 min-h-[200px]">
              {!selectedAptId ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Selecione um atendimento primeiro
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{selectedApt?.service}</div>
                    <div className="font-mono">R$ {totals.serviceTotal.toFixed(2)}</div>
                  </div>

                  {upsellItems.length > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-3">
                        <div className="text-sm font-semibold text-muted-foreground">
                          Produtos Adicionais
                        </div>
                        {upsellItems.map((item) => {
                          const p = state.products.find((x) => x.id === item.id)!
                          return (
                            <div
                              key={item.id}
                              className="flex justify-between items-center text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <Badge variant="secondary">{item.qty}x</Badge>
                                <span>{p.name}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="font-mono">
                                  R$ {(p.price * item.qty).toFixed(2)}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-destructive"
                                  onClick={() => removeProduct(item.id)}
                                >
                                  <Trash2 className="size-3" />
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </>
                  )}
                </>
              )}
            </CardContent>

            <div className="p-6 bg-muted/20 border-t space-y-4">
              <div className="flex justify-between items-end">
                <div className="text-lg font-semibold">Total a Pagar</div>
                <div className="text-3xl font-bold text-primary">
                  R$ {totals.grandTotal.toFixed(2)}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {['Pix', 'Cartão', 'Dinheiro'].map((method) => (
                  <Button
                    key={method}
                    variant={paymentMethod === method ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod(method as any)}
                    className={`min-h-[48px] ${paymentMethod === method ? 'shadow-md' : 'bg-background'}`}
                    disabled={!selectedAptId}
                  >
                    {method}
                  </Button>
                ))}
              </div>
            </div>

            <CardFooter className="pt-4 pb-6 px-6">
              <Button
                size="lg"
                className="w-full font-bold text-lg min-h-[56px]"
                disabled={!selectedAptId}
                onClick={handleCheckout}
              >
                Finalizar Venda
              </Button>
            </CardFooter>
          </Card>
        </div>
      </FeatureGuard>
    </div>
  )
}
