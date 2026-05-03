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
import { Edit, Plus, Trash2 } from 'lucide-react'
import { getBarbers, createBarber, updateBarber } from '@/services/barbers'
import {
  getCommissionRules,
  createCommissionRule,
  deleteCommissionRule,
} from '@/services/commission_rules'
import { getServices } from '@/services/services'
import { getProducts } from '@/services/products'
import { getPackages } from '@/services/packages'
import { getCommissions } from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { DollarSign } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function Staff() {
  const [barbers, setBarbers] = useState<any[]>([])
  const [commissions, setCommissions] = useState<any[]>([])
  const [selectedBarberCommissions, setSelectedBarberCommissions] = useState<any>(null)
  const [rules, setRules] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])

  const [bDialog, setBDialog] = useState(false)
  const [rDialog, setRDialog] = useState(false)

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

  const [colorForm, setColorForm] = useState<any>({ color: '#3b82f6' })

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

  const getItemName = (type: string, id: string) => {
    if (type === 'service') return services.find((s) => s.id === id)?.name || 'Desconhecido'
    if (type === 'product') return products.find((p) => p.id === id)?.name || 'Desconhecido'
    if (type === 'package') return packages.find((p) => p.id === id)?.name || 'Desconhecido'
    if (type === 'category') return id
    return id
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
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
                    <TableHead>Comissões Pagas</TableHead>
                    <TableHead>Comissões a Pagar</TableHead>
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
                        <TableCell>
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(paid)}
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(pending)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedBarberCommissions(b)}
                            title="Ver Comissões"
                          >
                            <DollarSign className="size-4 text-green-600" />
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
                      <TableCell>{getItemName(r.item_type, r.item_id)}</TableCell>
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
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        Nenhuma regra específica cadastrada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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
            <div className="space-y-2">
              <Label>Cor de Exibição na Agenda</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  className="w-12 h-10 p-1"
                  value={form.color || '#3b82f6'}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                />
                <Input
                  value={form.color || '#3b82f6'}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                />
              </div>
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
                  <SelectItem value="category">Categoria (Produtos)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Item</Label>
              {rForm.item_type === 'category' ? (
                <Select
                  required
                  value={rForm.item_id}
                  onValueChange={(v) => setRForm({ ...rForm, item_id: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beleza">Beleza</SelectItem>
                    <SelectItem value="bebidas">Bebidas</SelectItem>
                    <SelectItem value="acessorios">Acessórios</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Select
                  required
                  value={rForm.item_id}
                  onValueChange={(v) => setRForm({ ...rForm, item_id: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o item..." />
                  </SelectTrigger>
                  <SelectContent>
                    {(rForm.item_type === 'service'
                      ? services
                      : rForm.item_type === 'product'
                        ? products
                        : packages
                    ).map((i) => (
                      <SelectItem key={i.id} value={i.id}>
                        {i.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
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
      <Dialog
        open={!!selectedBarberCommissions}
        onOpenChange={(v) => !v && setSelectedBarberCommissions(null)}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Comissões a Pagar - {selectedBarberCommissions?.name}</DialogTitle>
          </DialogHeader>

          <div className="overflow-auto flex-1 pr-2">
            {(() => {
              if (!selectedBarberCommissions) return null

              const pending = commissions.filter(
                (c) =>
                  c.barber_id === selectedBarberCommissions.id &&
                  (c.status === 'pending' || c.status === 'available'),
              )

              if (pending.length === 0) {
                return (
                  <div className="py-8 text-center text-muted-foreground">
                    Nenhuma comissão pendente.
                  </div>
                )
              }

              const grouped = {
                Serviços: pending.filter((c) => c.type === 'service' || c.type === 'Serviço'),
                Pacotes: pending.filter((c) => c.type === 'package' || c.type === 'Pacote'),
                Produtos: pending.filter((c) => c.type === 'product' || c.type === 'Produto'),
                Outros: pending.filter(
                  (c) =>
                    !['service', 'Serviço', 'package', 'Pacote', 'product', 'Produto'].includes(
                      c.type,
                    ),
                ),
              }

              const formatCurrency = (val: number) =>
                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

              return (
                <div className="space-y-6">
                  {Object.entries(grouped).map(([groupName, items]) => {
                    if (items.length === 0) return null
                    const total = items.reduce((acc, item) => acc + (item.amount || 0), 0)
                    return (
                      <div key={groupName} className="space-y-2">
                        <div className="flex justify-between items-center border-b pb-1">
                          <h4 className="font-semibold text-sm">{groupName}</h4>
                          <span className="font-bold text-sm">{formatCurrency(total)}</span>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[100px]">Data</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Valor</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {items.map((item) => (
                              <TableRow key={item.id}>
                                <TableCell className="text-xs">
                                  {item.date
                                    ? new Date(item.date).toLocaleDateString('pt-BR')
                                    : '-'}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="secondary" className="text-[10px]">
                                    {item.status === 'pending' ? 'Pendente' : 'Disponível'}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right text-xs font-medium">
                                  {formatCurrency(item.amount || 0)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )
                  })}
                </div>
              )
            })()}
          </div>
          <DialogFooter className="mt-4 border-t pt-4">
            <Button variant="outline" onClick={() => setSelectedBarberCommissions(null)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
