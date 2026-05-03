import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Edit, Plus } from 'lucide-react'
import { FeatureGuard } from '@/components/FeatureGuard'
import { getBarbers, getAppointments, createBarber, updateBarber } from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'

export default function Staff() {
  const [barbers, setBarbers] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [bDialog, setBDialog] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<any>({
    name: '',
    commission_type: 'percentage',
    commission_value: 0,
  })
  const { toast } = useToast()

  const loadData = async () => {
    setBarbers(await getBarbers())
    setAppointments(await getAppointments())
  }

  useEffect(() => {
    loadData()
  }, [])
  useRealtime('barbers', loadData)
  useRealtime('appointments', loadData)

  const openBarber = (b?: any) => {
    setForm(b ? { ...b } : { name: '', commission_type: 'percentage', commission_value: 0 })
    setEditingId(b ? b.id : null)
    setBDialog(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) await updateBarber(editingId, form)
      else await createBarber(form)
      toast({ title: 'Profissional salvo!' })
      setBDialog(false)
    } catch {
      toast({ title: 'Erro', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Equipe & Comissões</h2>
        <p className="text-muted-foreground">Gestão de profissionais e relatórios de pagamento.</p>
      </div>

      <Tabs defaultValue="staff" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="staff">Profissionais</TabsTrigger>
          <TabsTrigger value="commissions">Comissões</TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => openBarber()}>
              <Plus className="size-4 mr-2" /> Adicionar
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo Comissão</TableHead>
                    <TableHead>Valor/Taxa</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barbers.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">{b.name}</TableCell>
                      <TableCell className="capitalize">
                        {b.commission_type === 'percentage' ? 'Porcentagem' : 'Fixo'}
                      </TableCell>
                      <TableCell>
                        {b.commission_type === 'percentage'
                          ? `${b.commission_value}%`
                          : `R$ ${b.commission_value?.toFixed(2)}`}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openBarber(b)}>
                          <Edit className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commissions" className="mt-4">
          <FeatureGuard feature="Pro">
            <Card>
              <CardHeader>
                <CardTitle>Relatório de Comissões</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Profissional</TableHead>
                      <TableHead>Serviços Realizados</TableHead>
                      <TableHead>Bruto (Serviços)</TableHead>
                      <TableHead className="text-primary font-bold text-right">
                        Líquido a Receber
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {barbers.map((b) => {
                      const bApts = appointments.filter(
                        (a) => a.barber_id === b.id && a.status === 'Concluído',
                      )
                      let net = 0,
                        bruto = 0
                      bApts.forEach((a) => {
                        const price = a.price || a.expand?.service_id?.price || 0
                        bruto += price
                        net +=
                          b.commission_type === 'percentage'
                            ? price * (b.commission_value / 100)
                            : b.commission_value
                      })
                      return (
                        <TableRow key={b.id}>
                          <TableCell className="font-medium">{b.name}</TableCell>
                          <TableCell>{bApts.length}</TableCell>
                          <TableCell>R$ {bruto.toFixed(2)}</TableCell>
                          <TableCell className="font-bold text-primary text-right">
                            R$ {net.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </FeatureGuard>
        </TabsContent>
      </Tabs>

      <Dialog open={bDialog} onOpenChange={setBDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Profissional' : 'Novo Profissional'}</DialogTitle>
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
              <Label>Tipo de Comissão</Label>
              <RadioGroup
                value={form.commission_type}
                onValueChange={(v) => setForm({ ...form, commission_type: v })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="percentage" id="c1" />
                  <Label htmlFor="c1">Porcentagem (%)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fixed" id="c2" />
                  <Label htmlFor="c2">Valor Fixo (R$)</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label>Valor da Comissão</Label>
              <Input
                type="number"
                step={form.commission_type === 'percentage' ? '1' : '0.01'}
                required
                value={form.commission_value}
                onChange={(e) => setForm({ ...form, commission_value: Number(e.target.value) })}
              />
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
