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
  const [form, setForm] = useState<any>({
    name: '',
    price: '',
    stock_quantity: '',
    min_stock: '',
    category: 'Beleza',
    is_active: true,
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const { toast } = useToast()

  const loadData = async () => {
    const records = await pb.collection('products').getFullList({ sort: '-created' })
    setItems(records)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleOpen = (item?: any) => {
    if (item) {
      setForm({ ...item, category: item.category || 'Beleza' })
      setEditingId(item.id)
    } else {
      setForm({
        name: '',
        price: '',
        stock_quantity: 0,
        min_stock: 0,
        category: 'Beleza',
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

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Controle de Estoque</h3>
        <Button onClick={() => handleOpen()}>
          <Plus className="size-4 mr-2" /> Novo Produto
        </Button>
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
            {items.map((item) => (
              <TableRow key={item.id} className={!item.is_active ? 'opacity-60' : ''}>
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
                <TableCell>{item.category || '-'}</TableCell>
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
            {items.length === 0 && (
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
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beleza">Beleza</SelectItem>
                  <SelectItem value="Bebidas">Bebidas</SelectItem>
                  <SelectItem value="Acessórios">Acessórios</SelectItem>
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
