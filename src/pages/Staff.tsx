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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Edit, Plus, Trash2, DollarSign, Printer } from 'lucide-react'
import { format } from 'date-fns'
import { getBarbers, createBarber, updateBarber } from '@/services/barbers'
import {
  getCommissionRules,
  createCommissionRule,
  deleteCommissionRule,
} from '@/services/commission_rules'
import { getServices } from '@/services/services'
import { getProducts } from '@/services/products'
import {
  getPackages,
  getCommissions,
  getAppointments,
  getProductPurchases,
  getClientPackages,
} from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'

export default function Staff() {
  const [barbers, setBarbers] = useState<any[]>([])
  const [commissions, setCommissions] = useState<any[]>([])
  const [rules, setRules] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])

  const [bDialog, setBDialog] = useState(false)
  const [rDialog, setRDialog] = useState(false)

  const [selectedBarberDetailed, setSelectedBarberDetailed] = useState<any>(null)
  const [reportItems, setReportItems] = useState<any[]>([])

  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<any>({
    name: '',
    commission_type: 'percentage',
    commission_value: 0,
    color: '#3b82f6',
  })
  const [rForm, setRForm] = useState<any>({
    barber_id: '',
    item_id: '',
    item_type: 'service',
    value: 0,
    type: 'percentage',
  })

  const { toast } = useToast()

  const loadData = async () => {
    setBarbers(await getBarbers())
    setRules(await getCommissionRules())
    setServices(await getServices())
    setProducts(await getProducts())
    setPackages(await getPackages())
    setCommissions(await getCommissions())
  }

  useEffect(() => {
    loadData()
  }, [])

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
            date: new Date(a.updated),
            time: a.time || format(new Date(a.updated), 'HH:mm'),
            packageUsed: !!a.client_package_id,
            price: a.price || a.expand?.service_id?.price || 0,
            commission: c?.amount || 0,
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
            date: new Date(p.created),
            time: format(new Date(p.created), 'HH:mm'),
            packageUsed: false,
            price: p.price_at_sale || 0,
            commission: c?.amount || 0,
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
          }
        }),
      ].sort((a, b) => b.date.getTime() - a.date.getTime())

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

  const openBarber = (b?: any) => {
    setForm(
      b
        ? { ...b }
        : { name: '', commission_type: 'percentage', commission_value: 0, color: '#3b82f6' },
    )
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
      loadData()
    } catch {
      toast({ title: 'Erro', variant: 'destructive' })
    }
  }

  const handleRuleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!rForm.item_id) {
        toast({ title: 'Selecione um item/categoria', variant: 'destructive' })
        return
      }
      await createCommissionRule(rForm)
      toast({ title: 'Regra criada!' })
      setRDialog(false)
      loadData()
    } catch {
      toast({ title: 'Erro ao criar regra', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Equipe & Comissões</h2>
        <p className="text-muted-foreground">Gestão de profissionais e regras específicas.</p>
      </div>

      <Tabs defaultValue="staff" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="staff">Profissionais</TabsTrigger>
          <TabsTrigger value="rules">Regras Granulares</TabsTrigger>
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
                    <TableHead>Comissão Padrão</TableHead>
                    <TableHead>Pagos (Total)</TableHead>
                    <TableHead>A Receber</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barbers.map((b) => {
                    const bComms = commissions.filter((c) => c.barber_id === b.id)
                    const paid = bComms
                      .filter((c) => c.status === 'paid')
                      .reduce((acc, c) => acc + (c.amount || 0), 0)
                    const pending = bComms
                      .filter((c) => c.status === 'pending' || c.status === 'available')
                      .reduce((acc, c) => acc + (c.amount || 0), 0)
                    return (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium">{b.name}</TableCell>
                        <TableCell>
                          {b.commission_type === 'percentage'
                            ? `${b.commission_value}%`
                            : `R$ ${b.commission_value}`}
                        </TableCell>
                        <TableCell>R$ {paid.toFixed(2)}</TableCell>
                        <TableCell>R$ {pending.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDetailedReport(b)}
                            title="Relatório Detalhado"
                          >
                            <DollarSign className="size-4 text-emerald-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openBarber(b)}
                            title="Editar Profissional"
                          >
                            <Edit className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => setRDialog(true)}>
              <Plus className="size-4 mr-2" /> Nova Regra
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Profissional</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Tipo Item</TableHead>
                    <TableHead>Comissão Específica</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{barbers.find((b) => b.id === r.barber_id)?.name}</TableCell>
                      <TableCell>{r.item_id}</TableCell>
                      <TableCell className="capitalize">{r.item_type}</TableCell>
                      <TableCell>
                        {r.type === 'percentage' ? `${r.value}%` : `R$ ${r.value}`}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={async () => {
                            await deleteCommissionRule(r.id)
                            loadData()
                          }}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {rules.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                        Nenhuma regra cadastrada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
                    <TableHead>Pacote?</TableHead>
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
                        <Badge variant="outline">{item.type}</Badge>
                      </TableCell>
                      <TableCell>{item.item}</TableCell>
                      <TableCell>{item.client}</TableCell>
                      <TableCell>{item.packageUsed ? 'Sim' : '-'}</TableCell>
                      <TableCell className="text-right">R$ {item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-semibold text-emerald-600">
                        R$ {item.commission.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {reportItems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Nenhum registro de atividade encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {reportItems.length > 0 && (
                <div className="summary">
                  <span>Total de Comissões no Período:</span>
                  <span className="text-emerald-600">
                    R$ {reportItems.reduce((acc, curr) => acc + curr.commission, 0).toFixed(2)}
                  </span>
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
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={rDialog} onOpenChange={setRDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Regra de Comissão</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRuleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Profissional</Label>
              <Select
                required
                value={rForm.barber_id}
                onValueChange={(v) => setRForm({ ...rForm, barber_id: v })}
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
            <div className="space-y-2">
              <Label>Tipo de Item</Label>
              <Select
                value={rForm.item_type}
                onValueChange={(v) => setRForm({ ...rForm, item_type: v, item_id: '' })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Serviço</SelectItem>
                  <SelectItem value="product">Produto</SelectItem>
                  <SelectItem value="package">Pacote</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Item ID (Copie o ID do item ou digite o nome se suportado)</Label>
              <Input
                required
                value={rForm.item_id}
                onChange={(e) => setRForm({ ...rForm, item_id: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={rForm.type} onValueChange={(v) => setRForm({ ...rForm, type: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">%</SelectItem>
                    <SelectItem value="fixed">R$</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Valor</Label>
                <Input
                  type="number"
                  required
                  value={rForm.value}
                  onChange={(e) => setRForm({ ...rForm, value: Number(e.target.value) })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Salvar Regra</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
