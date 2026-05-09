import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Trash2, Edit } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'
import { Badge } from '@/components/ui/badge'

export default function Settings() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [categories, setCategories] = useState<any[]>([])
  const [paymentMethods, setPaymentMethods] = useState<string[]>([
    'cash',
    'pix',
    'debito',
    'credito',
  ])
  const [settingsId, setSettingsId] = useState<string>('')

  const [isCatOpen, setIsCatOpen] = useState(false)
  const [editingCatId, setEditingCatId] = useState<string | null>(null)
  const [catForm, setCatForm] = useState({ name: '', type: 'service', commission_percentage: 0 })

  const loadData = async () => {
    try {
      const cats = await pb.collection('categories').getFullList({ sort: 'type,name' })
      setCategories(cats)

      const sett = await pb.collection('settings').getFirstListItem('key="payment_methods"')
      setSettingsId(sett.id)
      setPaymentMethods(sett.value || [])
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (user?.access_level === 'Admin') {
      loadData()
    }
  }, [user])

  if (user?.access_level !== 'Admin') {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Acesso Restrito. Apenas administradores podem acessar esta página.
      </div>
    )
  }

  const handleOpenCat = (cat?: any) => {
    if (cat) {
      setCatForm({
        name: cat.name,
        type: cat.type,
        commission_percentage: cat.commission_percentage,
      })
      setEditingCatId(cat.id)
    } else {
      setCatForm({ name: '', type: 'service', commission_percentage: 0 })
      setEditingCatId(null)
    }
    setIsCatOpen(true)
  }

  const handleSaveCat = async () => {
    try {
      const payload = {
        name: catForm.name,
        type: catForm.type,
        commission_percentage: Number(catForm.commission_percentage),
      }

      if (editingCatId) {
        await pb.collection('categories').update(editingCatId, payload)
        toast({ title: 'Categoria atualizada!' })
      } else {
        await pb.collection('categories').create(payload)
        toast({ title: 'Categoria criada!' })
      }
      setIsCatOpen(false)
      loadData()
    } catch (err) {
      toast({ title: 'Erro ao salvar categoria', variant: 'destructive' })
    }
  }

  const handleDeleteCat = async (id: string) => {
    if (confirm('Tem certeza que deseja remover esta categoria?')) {
      try {
        await pb.collection('categories').delete(id)
        toast({ title: 'Categoria removida' })
        loadData()
      } catch (err) {
        toast({ title: 'Erro: Categoria pode estar em uso.', variant: 'destructive' })
      }
    }
  }

  const togglePaymentMethod = async (method: string, enabled: boolean) => {
    try {
      let newMethods = [...paymentMethods]
      if (enabled && !newMethods.includes(method)) newMethods.push(method)
      if (!enabled && newMethods.includes(method))
        newMethods = newMethods.filter((m) => m !== method)

      setPaymentMethods(newMethods)

      if (settingsId) {
        await pb.collection('settings').update(settingsId, { value: newMethods })
      } else {
        const r = await pb
          .collection('settings')
          .create({ key: 'payment_methods', value: newMethods })
        setSettingsId(r.id)
      }
      toast({ title: 'Configurações de pagamento atualizadas' })
    } catch (err) {
      toast({ title: 'Erro ao atualizar pagamento', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h2>
        <p className="text-muted-foreground">
          Gerencie categorias, comissões globais e regras de negócio.
        </p>
      </div>

      <Tabs defaultValue="categories" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="categories">Categorias & Comissões</TabsTrigger>
          <TabsTrigger value="payments">Métodos de Pagamento</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Gerenciar Categorias</h3>
            <Button onClick={() => handleOpenCat()}>
              <Plus className="size-4 mr-2" /> Nova Categoria
            </Button>
          </div>

          <Card className="border-border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo de Item</TableHead>
                  <TableHead>Comissão Padrão (%)</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>
                      <Badge variant={c.type === 'service' ? 'default' : 'secondary'}>
                        {c.type === 'service' ? 'Serviço' : 'Produto'}
                      </Badge>
                    </TableCell>
                    <TableCell>{c.commission_percentage}%</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenCat(c)}>
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteCat(c.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {categories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      Nenhuma categoria cadastrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card className="border-border shadow-sm max-w-2xl">
            <CardHeader>
              <CardTitle>Opções de Recebimento no Checkout</CardTitle>
              <CardDescription>
                Habilite ou desabilite os métodos que a barbearia aceita.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { id: 'cash', label: 'Dinheiro', desc: 'Pagamentos em espécie.' },
                { id: 'pix', label: 'Pix', desc: 'Transferências instantâneas.' },
                { id: 'debito', label: 'Cartão de Débito', desc: 'Máquina de cartão (Débito).' },
                {
                  id: 'credito',
                  label: 'Cartão de Crédito',
                  desc: 'Máquina de cartão (Crédito) com repasse a vencer.',
                },
              ].map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between space-x-4 border border-border/50 p-4 rounded-lg bg-card/50"
                >
                  <div className="space-y-1">
                    <Label className="text-base">{method.label}</Label>
                    <p className="text-sm text-muted-foreground">{method.desc}</p>
                  </div>
                  <Switch
                    checked={paymentMethods.includes(method.id)}
                    onCheckedChange={(c) => togglePaymentMethod(method.id, c)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isCatOpen} onOpenChange={setIsCatOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCatId ? 'Editar Categoria' : 'Nova Categoria'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome da Categoria</Label>
              <Input
                value={catForm.name}
                onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                placeholder="Ex: Cabelo, Barba, Produtos Premium..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select
                  value={catForm.type}
                  onValueChange={(v) => setCatForm({ ...catForm, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Serviços</SelectItem>
                    <SelectItem value="product">Produtos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Comissão Padrão (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={catForm.commission_percentage}
                  onChange={(e) =>
                    setCatForm({ ...catForm, commission_percentage: Number(e.target.value) })
                  }
                  placeholder="0"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Esta comissão será aplicada automaticamente no checkout para todos os itens associados
              a esta categoria.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveCat} className="w-full sm:w-auto">
              Salvar Categoria
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
