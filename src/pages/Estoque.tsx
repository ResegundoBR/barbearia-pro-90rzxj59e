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
import { Switch } from '@/components/ui/switch'
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
import { Edit, Plus } from 'lucide-react'
import {
  getServices,
  getPackages,
  getAppointments,
  getClientPackages,
  createService,
  updateService,
  createPackage,
  updatePackage,
} from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'

export default function Estoque() {
  const [services, setServices] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [clientPacks, setClientPacks] = useState<any[]>([])

  const [sDialog, setSDialog] = useState(false)
  const [pDialog, setPDialog] = useState(false)
  const [editingSId, setEditingSId] = useState<string | null>(null)
  const [editingPId, setEditingPId] = useState<string | null>(null)
  const [sForm, setSForm] = useState<any>({ name: '', price: 0, is_active: true })
  const [pForm, setPForm] = useState<any>({
    name: '',
    service_id: '',
    quantity: 1,
    price: 0,
    is_active: true,
  })
  const [prodForm, setProdForm] = useState<any>({
    name: '',
    price: 0,
    category: '',
    is_active: true,
  })
  const [products, setProducts] = useState<any[]>([])
  const [prodDialog, setProdDialog] = useState(false)
  const [editingProdId, setEditingProdId] = useState<string | null>(null)

  const { toast } = useToast()

  const loadData = async () => {
    setServices(await getServices())
    setPackages(await getPackages())
    setAppointments(await getAppointments())
    setClientPacks(await getClientPackages())
    setProducts(await pb.collection('products').getFullList({ sort: '-created' }))
  }

  useEffect(() => {
    loadData()
  }, [])
  useRealtime('services', loadData)
  useRealtime('packages', loadData)
  useRealtime('appointments', loadData)
  useRealtime('client_packages', loadData)
  useRealtime('products', loadData)

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingSId) await updateService(editingSId, sForm)
      else await createService(sForm)
      toast({ title: 'Serviço salvo!' })
      setSDialog(false)
    } catch {
      toast({ title: 'Erro', variant: 'destructive' })
    }
  }

  const handlePackageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingPId) await updatePackage(editingPId, pForm)
      else await createPackage(pForm)
      toast({ title: 'Pacote salvo!' })
      setPDialog(false)
    } catch {
      toast({ title: 'Erro', variant: 'destructive' })
    }
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingProdId) await pb.collection('products').update(editingProdId, prodForm)
      else await pb.collection('products').create(prodForm)
      toast({ title: 'Produto salvo!' })
      setProdDialog(false)
      loadData()
    } catch {
      toast({ title: 'Erro', variant: 'destructive' })
    }
  }

  const openService = (s?: any) => {
    setSForm(s ? { ...s } : { name: '', price: 0, duration_minutes: 30, is_active: true })
    setEditingSId(s ? s.id : null)
    setSDialog(true)
  }

  const openProduct = (p?: any) => {
    setProdForm(p ? { ...p } : { name: '', price: 0, category: '', is_active: true })
    setEditingProdId(p ? p.id : null)
    setProdDialog(true)
  }

  const openPackage = (p?: any) => {
    setPForm(p ? { ...p } : { name: '', service_id: '', quantity: 1, price: 0, is_active: true })
    setEditingPId(p ? p.id : null)
    setPDialog(true)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Serviços & Pacotes</h2>
        <p className="text-muted-foreground">
          Gerencie catálogo e acompanhe o faturamento de cada item.
        </p>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="packages">Pacotes</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => openService()}>
              <Plus className="size-4 mr-2" /> Novo Serviço
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Duração</TableHead>
                    <TableHead>Preço Base</TableHead>
                    <TableHead>Total Rendido</TableHead>
                    <TableHead>Ativo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((s) => {
                    const revenue = appointments
                      .filter((a) => a.service_id === s.id && a.status === 'Concluído')
                      .reduce((acc, a) => acc + (a.price || s.price), 0)
                    return (
                      <TableRow key={s.id} className={s.is_active === false ? 'opacity-50' : ''}>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell>{s.duration_minutes || 30} min</TableCell>
                        <TableCell>R$ {s.price.toFixed(2)}</TableCell>
                        <TableCell className="font-bold text-green-600">
                          R$ {revenue.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={s.is_active !== false}
                            onCheckedChange={(v) => updateService(s.id, { is_active: v })}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openService(s)}>
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

        <TabsContent value="products" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => openProduct()}>
              <Plus className="size-4 mr-2" /> Novo Produto
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Ativo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.id} className={p.is_active === false ? 'opacity-50' : ''}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell className="capitalize">{p.category || '-'}</TableCell>
                      <TableCell>R$ {p.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Switch
                          checked={p.is_active !== false}
                          onCheckedChange={(v) =>
                            pb.collection('products').update(p.id, { is_active: v })
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => openProduct(p)}>
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

        <TabsContent value="packages" className="mt-4 space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => openPackage()}>
              <Plus className="size-4 mr-2" /> Novo Pacote
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Serviço Vinculado</TableHead>
                    <TableHead>Preço Total</TableHead>
                    <TableHead>Total Rendido</TableHead>
                    <TableHead>Ativo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((p) => {
                    const revenue =
                      clientPacks.filter((cp) => cp.package_id === p.id).length * p.price
                    return (
                      <TableRow key={p.id} className={p.is_active === false ? 'opacity-50' : ''}>
                        <TableCell className="font-medium">
                          {p.name} ({p.quantity}x)
                        </TableCell>
                        <TableCell>{p.expand?.service_id?.name}</TableCell>
                        <TableCell>R$ {p.price.toFixed(2)}</TableCell>
                        <TableCell className="font-bold text-purple-600">
                          R$ {revenue.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Switch
                            checked={p.is_active !== false}
                            onCheckedChange={(v) => updatePackage(p.id, { is_active: v })}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openPackage(p)}>
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
      </Tabs>

      <Dialog open={sDialog} onOpenChange={setSDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSId ? 'Editar Serviço' : 'Novo Serviço'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleServiceSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                required
                value={sForm.name}
                onChange={(e) => setSForm({ ...sForm, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preço Base (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  required
                  value={sForm.price}
                  onChange={(e) => setSForm({ ...sForm, price: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Duração (min)</Label>
                <Input
                  type="number"
                  required
                  value={sForm.duration_minutes || 30}
                  onChange={(e) => setSForm({ ...sForm, duration_minutes: Number(e.target.value) })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={pDialog} onOpenChange={setPDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPId ? 'Editar Pacote' : 'Novo Pacote'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePackageSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                required
                value={pForm.name}
                onChange={(e) => setPForm({ ...pForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Serviço Vinculado</Label>
              <Select
                value={pForm.service_id}
                onValueChange={(v) => setPForm({ ...pForm, service_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Quantidade</Label>
                <Input
                  type="number"
                  required
                  value={pForm.quantity}
                  onChange={(e) => setPForm({ ...pForm, quantity: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Preço (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  required
                  value={pForm.price}
                  onChange={(e) => setPForm({ ...pForm, price: Number(e.target.value) })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={prodDialog} onOpenChange={setProdDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProdId ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProductSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                required
                value={prodForm.name}
                onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                value={prodForm.category}
                onValueChange={(v) => setProdForm({ ...prodForm, category: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione ou deixe em branco..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beleza">Beleza</SelectItem>
                  <SelectItem value="bebidas">Bebidas</SelectItem>
                  <SelectItem value="acessorios">Acessórios</SelectItem>
                  <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Preço (R$)</Label>
              <Input
                type="number"
                step="0.01"
                required
                value={prodForm.price}
                onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
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
