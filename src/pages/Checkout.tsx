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
  getBarbers,
  getClients,
  getPackages,
  getCommissionRules,
  getAppointments,
  createClientPackage,
  createCommission,
  updateAppointment,
} from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { addDays, format } from 'date-fns'

export default function Checkout() {
  const [barbers, setBarbers] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [rules, setRules] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])

  const [pkgForm, setPkgForm] = useState({
    barber_id: '',
    client_id: '',
    package_id: '',
    payment_method: '',
  })
  const [svcForm, setSvcForm] = useState({ appointment_id: '', price: '', payment_method: '' })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const loadData = () => {
    Promise.all([
      getBarbers(),
      getClients(),
      getPackages(),
      getCommissionRules(),
      getAppointments(`status != 'Concluído' && status != 'Cancelado'`),
    ]).then(([b, c, p, r, a]) => {
      setBarbers(b)
      setClients(c)
      setPackages(p)
      setRules(r)
      setAppointments(a)
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

      const isCard = pkgForm.payment_method === 'card'
      const status = isCard ? 'pending' : 'available'
      const due_date = isCard ? format(addDays(new Date(), 30), 'yyyy-MM-dd 12:00:00') : ''

      await createCommission({
        barber_id: barber.id,
        amount: commAmount,
        type: 'package_sale',
        date: format(new Date(), 'yyyy-MM-dd 12:00:00'),
        is_advance: false,
        payment_method: pkgForm.payment_method,
        status,
        due_date: due_date || undefined,
      })

      toast({ title: 'Pacote vendido com sucesso!' })
      setPkgForm({ barber_id: '', client_id: '', package_id: '', payment_method: '' })
    } catch (err: any) {
      toast({ title: 'Erro ao vender pacote', variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseService = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!svcForm.appointment_id || !svcForm.price || !svcForm.payment_method) {
      return toast({ title: 'Preencha todos os campos obrigatórios', variant: 'destructive' })
    }

    setIsSubmitting(true)
    try {
      const apt = appointments.find((a) => a.id === svcForm.appointment_id)
      if (!apt) throw new Error('Agendamento não encontrado')

      const finalPrice = parseFloat(svcForm.price.toString().replace(',', '.'))
      if (isNaN(finalPrice)) throw new Error('Preço inválido')

      await updateAppointment(apt.id, { status: 'Concluído', price: finalPrice })

      const barber = barbers.find((b) => b.id === apt.barber_id)
      if (barber && finalPrice > 0) {
        let commAmount = 0
        const rule = rules.find(
          (r) =>
            r.barber_id === barber.id && r.item_id === apt.service_id && r.item_type === 'service',
        )
        if (rule) {
          commAmount = rule.type === 'percentage' ? finalPrice * (rule.value / 100) : rule.value
        } else {
          commAmount =
            barber.commission_type === 'percentage'
              ? finalPrice * ((barber.commission_value || 0) / 100)
              : barber.commission_value || 0
        }

        if (commAmount > 0) {
          const isCard = svcForm.payment_method === 'card'
          const status = isCard ? 'pending' : 'available'
          const due_date = isCard ? format(addDays(new Date(), 30), 'yyyy-MM-dd 12:00:00') : ''

          await createCommission({
            barber_id: barber.id,
            amount: commAmount,
            type: 'service',
            date: format(new Date(), 'yyyy-MM-dd 12:00:00'),
            is_advance: false,
            payment_method: svcForm.payment_method,
            status,
            due_date: due_date || undefined,
          })
        }
      }

      toast({ title: 'Serviço finalizado com sucesso!' })
      setSvcForm({ appointment_id: '', price: '', payment_method: '' })
      loadData()
    } catch (err: any) {
      toast({ title: 'Erro ao finalizar serviço', variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAppointmentChange = (val: string) => {
    const apt = appointments.find((a) => a.id === val)
    setSvcForm({ appointment_id: val, price: apt?.price?.toString() || '0' })
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Checkout Expresso</h2>
        <p className="text-muted-foreground">Finalize serviços ou venda novos pacotes.</p>
      </div>

      <Tabs
        defaultValue="service"
        className="w-full"
        onValueChange={() => {
          setPkgForm({ barber_id: '', client_id: '', package_id: '', payment_method: '' })
          setSvcForm({ appointment_id: '', price: '', payment_method: '' })
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="service">Fechar Serviço</TabsTrigger>
          <TabsTrigger value="package">Vender Pacote</TabsTrigger>
        </TabsList>

        <TabsContent value="service">
          <Card>
            <CardHeader>
              <CardTitle>Finalizar Serviço</CardTitle>
              <CardDescription>
                Selecione o agendamento concluído e confirme o valor pago.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCloseService} className="space-y-4">
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
                          {a.date ? a.date.substring(0, 10).split('-').reverse().join('/') : ''} às{' '}
                          {a.time} - {a.expand?.client_id?.name} ({a.expand?.service_id?.name})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Valor Final (R$)</Label>
                  <Input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={svcForm.price}
                    onChange={(e) => setSvcForm({ ...svcForm, price: e.target.value })}
                  />
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
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="card">Cartão</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !svcForm.appointment_id}
                >
                  {isSubmitting ? 'Processando...' : 'Concluir Serviço'}
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
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="card">Cartão</SelectItem>
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
    </div>
  )
}
