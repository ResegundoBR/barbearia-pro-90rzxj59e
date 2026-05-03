import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  getBarbers,
  getClients,
  getPackages,
  getCommissionRules,
  createClientPackage,
  createCommission,
} from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { addDays, format } from 'date-fns'

export default function Checkout() {
  const [barbers, setBarbers] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [rules, setRules] = useState<any[]>([])

  const [form, setForm] = useState({ barber_id: '', client_id: '', package_id: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    Promise.all([getBarbers(), getClients(), getPackages(), getCommissionRules()]).then(
      ([b, c, p, r]) => {
        setBarbers(b)
        setClients(c)
        setPackages(p)
        setRules(r)
      },
    )
  }, [])

  const handleSellPackage = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const pkg = packages.find((p) => p.id === form.package_id)
      const barber = barbers.find((b) => b.id === form.barber_id)
      if (!pkg || !barber) throw new Error('Dados inválidos')

      const expiresAt = addDays(new Date(), 90)
      await createClientPackage({
        client_id: form.client_id,
        package_id: pkg.id,
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

      await createCommission({
        barber_id: barber.id,
        amount: commAmount,
        type: 'package_sale',
        date: format(new Date(), 'yyyy-MM-dd 12:00:00'),
        is_advance: false,
      })

      toast({ title: 'Pacote vendido com sucesso!' })
      setForm({ barber_id: '', client_id: '', package_id: '' })
    } catch (err: any) {
      toast({ title: 'Erro ao vender pacote', variant: 'destructive' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Checkout Expresso</h2>
        <p className="text-muted-foreground">Venda rápida de pacotes e geração de comissões.</p>
      </div>

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
                value={form.barber_id}
                onValueChange={(v) => setForm({ ...form, barber_id: v })}
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
                value={form.client_id}
                onValueChange={(v) => setForm({ ...form, client_id: v })}
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
                value={form.package_id}
                onValueChange={(v) => setForm({ ...form, package_id: v })}
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Processando...' : 'Confirmar Venda'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
