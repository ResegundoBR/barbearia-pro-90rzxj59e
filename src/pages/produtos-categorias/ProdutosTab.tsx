import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getProducts, createProduct, updateProduct, deleteProduct } from '@/services/products'
import { getCategories } from '@/services/categories'
import { useRealtime } from '@/hooks/use-realtime'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
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
import pb from '@/lib/pocketbase/client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export function ProdutosTab() {
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showInactive, setShowInactive] = useState(false)

  const [suppliers, setSuppliers] = useState<any[]>([])
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [inventoryPurchases, setInventoryPurchases] = useState<any[]>([])

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    cost_price: '',
    desired_margin: '',
    category_id: '',
    supplier_ids: [] as string[],
    stock_quantity: '',
    min_stock: '',
    reorder_point: '',
    is_active: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [disablePromptId, setDisablePromptId] = useState<string | null>(null)
  const [deletePromptId, setDeletePromptId] = useState<string | null>(null)

  const { toast } = useToast()

  const loadData = async () => {
    try {
      const [prodData, catData, supData, invData] = await Promise.all([
        getProducts(),
        getCategories(),
        pb.collection('suppliers').getFullList({ sort: 'name' }),
        pb
          .collection('inventory_purchases')
          .getFullList({ sort: '-purchase_date', expand: 'supplier_id' }),
      ])
      setProducts(prodData)
      setCategories(catData.filter((c) => c.type === 'product'))
      setSuppliers(supData)
      setInventoryPurchases(invData)
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
        cost_price: prod.cost_price?.toString() || '',
        desired_margin: '',
        category_id: prod.category_id || '',
        supplier_ids: prod.supplier_ids || [],
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
        cost_price: '',
        desired_margin: '',
        category_id: '',
        supplier_ids: [],
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
        cost_price: formData.cost_price ? Number(formData.cost_price) : 0,
        category_id: formData.category_id || null,
        supplier_ids: formData.supplier_ids,
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

  const handleDeleteClick = async (id: string) => {
    try {
      const purchases = await pb
        .collection('product_purchases')
        .getList(1, 1, { filter: `product_id="${id}"` })
      const rules = await pb
        .collection('commission_rules')
        .getList(1, 1, { filter: `item_id="${id}" && item_type="product"` })

      if (purchases.totalItems > 0 || rules.totalItems > 0) {
        setDisablePromptId(id)
        return
      }

      setDeletePromptId(id)
    } catch (err: any) {
      toast({ title: 'Erro', description: err.message, variant: 'destructive' })
    }
  }

  const confirmDelete = async () => {
    if (!deletePromptId) return
    try {
      await deleteProduct(deletePromptId)
      toast({ title: 'Produto excluído' })
      setDeletePromptId(null)
    } catch (err: any) {
      toast({ title: 'Erro ao excluir', description: err.message, variant: 'destructive' })
    }
  }

  const handleDisableProduct = async () => {
    if (!disablePromptId) return
    try {
      await updateProduct(disablePromptId, { is_active: false })
      toast({ title: 'Produto desativado com sucesso' })
      setDisablePromptId(null)
      loadData()
    } catch (err: any) {
      toast({ title: 'Erro ao desativar', description: err.message, variant: 'destructive' })
    }
  }

  const displayedProducts = products
    .filter((p) => showInactive || p.is_active !== false)
    .filter((p) => categoryFilter === 'all' || p.category_id === categoryFilter)

  const totalInvestment = products
    .filter((p) => p.is_active !== false)
    .reduce((acc, p) => acc + (Number(p.stock_quantity) || 0) * (Number(p.cost_price) || 0), 0)

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Capital Imobilizado</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
              <path d="m3.3 7 8.7 5 8.7-5" />
              <path d="M12 22V12" />
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">
              {totalInvestment.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
            <p className="text-xs text-muted-foreground">Valor total em estoque ativo</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-lg font-semibold">Listagem de Produtos</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Switch checked={showInactive} onCheckedChange={setShowInactive} id="show-inactive" />
            <Label htmlFor="show-inactive" className="cursor-pointer text-sm text-muted-foreground">
              Mostrar inativos
            </Label>
          </div>
          <Button onClick={() => openDialog()}>
            <Plus className="size-4 mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>

      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Custo</TableHead>
              <TableHead>Preço Venda</TableHead>
              <TableHead>Margem</TableHead>
              <TableHead>Última Compra</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : displayedProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-6 text-muted-foreground">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            ) : (
              displayedProducts.map((prod) => {
                const price = Number(prod.price) || 0
                const costPrice = Number(prod.cost_price) || 0
                const marginCurrency = price - costPrice
                const marginPercent =
                  costPrice > 0 ? (marginCurrency / costPrice) * 100 : price > 0 ? 100 : 0
                const lastPurchase = inventoryPurchases.find((p) => p.product_id === prod.id)

                return (
                  <TableRow
                    key={prod.id}
                    className={prod.is_active === false ? 'opacity-60 bg-muted/30' : ''}
                  >
                    <TableCell className="font-medium whitespace-nowrap">{prod.name}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {prod.expand?.category_id?.name || '-'}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {costPrice.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className={marginCurrency > 0 ? 'text-green-600' : 'text-red-600'}>
                        R$ {marginCurrency.toFixed(2)} ({marginPercent.toFixed(1)}%)
                      </span>
                    </TableCell>
                    <TableCell>
                      {lastPurchase ? (
                        <div className="text-xs whitespace-nowrap">
                          {lastPurchase.price_paid?.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                          <br />
                          <span className="text-muted-foreground">
                            {lastPurchase.expand?.supplier_id?.name}
                          </span>
                        </div>
                      ) : (
                        '-'
                      )}
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
                    <TableCell className="text-right space-x-2 whitespace-nowrap">
                      <Button variant="ghost" size="icon" onClick={() => openDialog(prod)}>
                        <Pencil className="size-4 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(prod.id)}
                      >
                        <Trash2 className="size-4 text-destructive/80 hover:text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preço Custo</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.cost_price}
                  onChange={(e) => setFormData({ ...formData, cost_price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Margem Desejada (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.desired_margin}
                  onChange={(e) => setFormData({ ...formData, desired_margin: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preço Venda *</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
                {Number(formData.cost_price) > 0 && Number(formData.desired_margin) > 0 && (
                  <div className="flex items-center justify-between text-sm text-muted-foreground mt-1">
                    <span>
                      Sugerido:{' '}
                      {(
                        (Number(formData.cost_price) || 0) *
                        (1 + (Number(formData.desired_margin) || 0) / 100)
                      ).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-primary"
                      onClick={() => {
                        const suggested =
                          (Number(formData.cost_price) || 0) *
                          (1 + (Number(formData.desired_margin) || 0) / 100)
                        setFormData({ ...formData, price: suggested.toFixed(2) })
                      }}
                    >
                      Aplicar
                    </Button>
                  </div>
                )}
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

            <div className="space-y-2">
              <Label>Fornecedores</Label>
              <div className="flex flex-wrap gap-4 border p-3 rounded-md">
                {suppliers.length === 0 && (
                  <span className="text-sm text-muted-foreground">
                    Nenhum fornecedor cadastrado.
                  </span>
                )}
                {suppliers.map((sup) => (
                  <label key={sup.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.supplier_ids.includes(sup.id)}
                      onCheckedChange={(checked) => {
                        if (checked)
                          setFormData({
                            ...formData,
                            supplier_ids: [...formData.supplier_ids, sup.id],
                          })
                        else
                          setFormData({
                            ...formData,
                            supplier_ids: formData.supplier_ids.filter((id) => id !== sup.id),
                          })
                      }}
                    />
                    <span className="text-sm">{sup.name}</span>
                  </label>
                ))}
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

      <AlertDialog open={!!disablePromptId} onOpenChange={(v) => !v && setDisablePromptId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Produto possui histórico</AlertDialogTitle>
            <AlertDialogDescription>
              Este produto está vinculado a vendas ou regras de comissão e não pode ser excluído
              permanentemente para manter a integridade dos dados. Deseja apenas desativá-lo em vez
              de excluir?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDisableProduct}>Sim, desativar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!deletePromptId} onOpenChange={(v) => !v && setDeletePromptId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir produto</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja realmente excluir este produto? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDelete}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
