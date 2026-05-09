import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/services/products'
import { getCategories } from '@/services/categories'
import { useRealtime } from '@/hooks/use-realtime'
import { Plus, Pencil, Trash2 } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { extractFieldErrors } from '@/lib/pocketbase/errors'
import { Badge } from '@/components/ui/badge'

export function ProdutosTab() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category_id: '',
    stock_quantity: '',
    min_stock: '',
    reorder_point: '',
    is_active: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { toast } = useToast()

  const loadData = async () => {
    try {
      const [prodData, catData] = await Promise.all([getProducts(), getCategories()])
      setProducts(prodData)
      setCategories(catData.filter((c) => c.type === 'product'))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('products', () => {
    loadData()
  })
  useRealtime('categories', () => {
    loadData()
  })

  const openDialog = (prod?: any) => {
    setErrors({})
    if (prod) {
      setEditingId(prod.id)
      setFormData({
        name: prod.name || '',
        price: prod.price?.toString() || '',
        category_id: prod.category_id || '',
        stock_quantity: prod.stock_quantity?.toString() || '',
        min_stock: prod.min_stock?.toString() || '',
        reorder_point: prod.reorder_point?.toString() || '',
        is_active: prod.is_active !== false,
      })
    } else {
      setEditingId(null)
      setFormData({
        name: '',
        price: '',
        category_id: '',
        stock_quantity: '',
        min_stock: '',
        reorder_point: '',
        is_active: true,
      })
    }
    setDialogOpen(true)
  }

  const handleSave = async () => {
    setErrors({})
    try {
      const payload = {
        name: formData.name,
        price: formData.price ? Number(formData.price) : 0,
        category_id: formData.category_id || null,
        stock_quantity: formData.stock_quantity ? Number(formData.stock_quantity) : 0,
        min_stock: formData.min_stock ? Number(formData.min_stock) : 0,
        reorder_point: formData.reorder_point ? Number(formData.reorder_point) : 0,
        is_active: formData.is_active,
      }

      if (editingId) {
        await updateProduct(editingId, payload)
        toast({ title: 'Produto atualizado' })
      } else {
        await createProduct(payload)
        toast({ title: 'Produto criado' })
      }
      setDialogOpen(false)
    } catch (err: any) {
      const fieldErrs = extractFieldErrors(err)
      if (Object.keys(fieldErrs).length > 0) {
        setErrors(fieldErrs)
      } else {
        toast({ title: 'Erro ao salvar', description: err.message, variant: 'destructive' })
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir este produto?')) return
    try {
      await deleteProduct(id)
      toast({ title: 'Produto excluído' })
    } catch (err: any) {
      toast({ title: 'Erro ao excluir', description: err.message, variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Listagem de Produtos</h2>
        <Button onClick={() => openDialog()}>
          <Plus className="size-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            ) : (
              products.map((prod) => (
                <TableRow key={prod.id}>
                  <TableCell className="font-medium">{prod.name}</TableCell>
                  <TableCell>{prod.expand?.category_id?.name || '-'}</TableCell>
                  <TableCell>
                    {prod.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell>{prod.stock_quantity ?? 0}</TableCell>
                  <TableCell>
                    {prod.is_active ? (
                      <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20 shadow-none border-green-200">
                        Ativo
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Inativo</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => openDialog(prod)}>
                      <Pencil className="size-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(prod.id)}>
                      <Trash2 className="size-4 text-destructive/80 hover:text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Pomada Modeladora"
              />
              {errors.name && <p className="text-sm text-destructive font-medium">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preço *</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                {errors.price && (
                  <p className="text-sm text-destructive font-medium">{errors.price}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(v) => setFormData({ ...formData, category_id: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.length === 0 ? (
                      <div className="p-2 text-sm text-muted-foreground">
                        Nenhuma categoria encontrada.
                      </div>
                    ) : (
                      categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {errors.category_id && (
                  <p className="text-sm text-destructive font-medium">{errors.category_id}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Estoque Atual</Label>
                <Input
                  type="number"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                />
                {errors.stock_quantity && (
                  <p className="text-sm text-destructive font-medium">{errors.stock_quantity}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Estoque Mín.</Label>
                <Input
                  type="number"
                  value={formData.min_stock}
                  onChange={(e) => setFormData({ ...formData, min_stock: e.target.value })}
                />
                {errors.min_stock && (
                  <p className="text-sm text-destructive font-medium">{errors.min_stock}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Pto. de Pedido</Label>
                <Input
                  type="number"
                  value={formData.reorder_point}
                  onChange={(e) => setFormData({ ...formData, reorder_point: e.target.value })}
                />
                {errors.reorder_point && (
                  <p className="text-sm text-destructive font-medium">{errors.reorder_point}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <Label className="text-base">Ativo</Label>
                <p className="text-[13px] text-muted-foreground">
                  O produto será listado para venda.
                </p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(v) => setFormData({ ...formData, is_active: v })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
