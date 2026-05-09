import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Plus, Edit } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ProductsTab() {
  const [items, setItems] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [showInactive, setShowInactive] = useState(false)
  const [form, setForm] = useState<any>({
    name: '',
    price: '',
    stock_quantity: '',
    min_stock: '',
    category_id: '',
    is_active: true,
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const { toast } = useToast()

  const loadData = async () => {
    const records = await pb
      .collection('products')
      .getFullList({ sort: '-created', expand: 'category_id' })
    setItems(records)
    const cats = await pb
      .collection('categories')
      .getFullList({ filter: "type='product'", sort: 'name' })
    setCategories(cats)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleOpen = (item?: any) => {
    if (item) {
      setForm({ ...item, category_id: item.category_id || '' })
      setEditingId(item.id)
    } else {
      setForm({
        name: '',
        price: '',
        stock_quantity: 0,
        min_stock: 0,
        category_id: '',
        is_active: true,
      })
      setEditingId(null)
    }
    setIsOpen(true)
  }

  const handleSave = async () => {
    try {
      const data = {
        ...form,
        price: Number(form.price),
        stock_quantity: Number(form.stock_quantity),
        min_stock: Number(form.min_stock),
      }
      if (editingId) {
        await pb.collection('products').update(editingId, data)
        toast({ title: 'Produto atualizado com sucesso!' })
      } else {
        await pb.collection('products').create(data)
        toast({ title: 'Produto criado com sucesso!' })
      }
      setIsOpen(false)
      loadData()
    } catch (err) {
      toast({ title: 'Erro ao salvar', variant: 'destructive' })
    }
  }

  const toggleActive = async (id: string, current: boolean) => {
    try {
      await pb.collection('products').update(id, { is_active: !current })
      loadData()
    } catch (err) {
      toast({ title: 'Erro ao atualizar status', variant: 'destructive' })
    }
  }

  const displayedItems = items.filter((item) => showInactive || item.is_active !== false)

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 className="text-lg font-semibold">Controle de Estoque</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={showInactive}
              onCheckedChange={setShowInactive}
              id="show-inactive-stock"
            />
            <Label
              htmlFor="show-inactive-stock"
              className="cursor-pointer text-sm text-muted-foreground"
            >
              Mostrar inativos
            </Label>
          </div>
          <Button onClick={() => handleOpen()}>
            <Plus className="size-4 mr-2" /> Novo Produto
          </Button>
        </div>
      </div>
      <Card className="border-none shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque Atual</TableHead>
              <TableHead>Estoque Mínimo</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedItems.map((item) => (
              <TableRow key={item.id} className={!item.is_active ? 'opacity-60 bg-muted/30' : ''}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>R$ {item.price?.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge
                    variant={item.stock_quantity <= item.min_stock ? 'destructive' : 'secondary'}
                  >
                    {item.stock_quantity}
                  </Badge>
                </TableCell>
                <TableCell>{item.min_stock}</TableCell>
                <TableCell>
                  {item.expand?.category_id?.name || item.category || '-'}
                  {item.expand?.category_id && (
                    <Badge variant="outline" className="ml-2 text-[10px]">
                      {item.expand.category_id.commission_percentage}% Com.
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.is_active}
                      onCheckedChange={() => toggleActive(item.id, item.is_active)}
                    />
                    <Badge
                      variant={item.is_active ? 'default' : 'secondary'}
                      className="text-[10px]"
                    >
                      {item.is_active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleOpen(item)}>
                    <Edit className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {displayedItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome do Produto</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Pomada Modeladora"
              />
            </div>
            <div className="space-y-2">
              <Label>Preço de Venda (R$)</Label>
              <Input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="45.00"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Estoque Atual</Label>
                <Input
                  type="number"
                  value={form.stock_quantity}
                  onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })}
                  placeholder="10"
                />
              </div>
              <div className="space-y-2">
                <Label>Estoque Mínimo (Alerta)</Label>
                <Input
                  type="number"
                  value={form.min_stock}
                  onChange={(e) => setForm({ ...form, min_stock: e.target.value })}
                  placeholder="3"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select
                value={form.category_id}
                onValueChange={(v) => setForm({ ...form, category_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} ({c.commission_percentage}%)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Switch
                checked={form.is_active}
                onCheckedChange={(c) => setForm({ ...form, is_active: c })}
              />
              <Label>Produto Ativo (Disponível p/ Venda)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave} className="w-full sm:w-auto">
              Salvar Produto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
