import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Scissors, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getProducts, deleteProduct, updateProduct } from '@/services/products'
import { useRealtime } from '@/hooks/use-realtime'
import { ProductFormDialog } from './ProductFormDialog'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import pb from '@/lib/pocketbase/client'

export function ProductsTab() {
  const { toast } = useToast()
  const [products, setProducts] = useState<any[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState<any>(null)

  const [consumeOpen, setConsumeOpen] = useState(false)
  const [consumeProduct, setConsumeProduct] = useState<any>(null)
  const [consumeForm, setConsumeForm] = useState({ quantity: 1, barber_id: '', description: '' })
  const [barbers, setBarbers] = useState<any[]>([])

  const loadData = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
      const barbersData = await pb.collection('barbers').getFullList()
      setBarbers(barbersData)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadData()
  }, [])
  useRealtime('products', () => loadData())

  const handleEdit = (product: any) => {
    setProductToEdit(product)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Excluir produto?')) {
      try {
        await deleteProduct(id)
        toast({ title: 'Produto excluído' })
        loadData()
      } catch (err: any) {
        toast({ title: 'Erro', description: err.message, variant: 'destructive' })
      }
    }
  }

  const handleToggleActive = async (p: any) => {
    try {
      await updateProduct(p.id, { is_active: !p.is_active })
      toast({ title: `Produto ${!p.is_active ? 'ativado' : 'desativado'}` })
      loadData()
    } catch (err: any) {
      toast({ title: 'Erro ao alterar status', description: err.message, variant: 'destructive' })
    }
  }

  const handleConsumeSubmit = async () => {
    if (!consumeForm.barber_id) {
      toast({ title: 'Selecione um profissional', variant: 'destructive' })
      return
    }
    if (consumeForm.quantity <= 0) {
      toast({ title: 'Quantidade inválida', variant: 'destructive' })
      return
    }

    try {
      await pb.send('/backend/v1/products/consume', {
        method: 'POST',
        body: JSON.stringify({
          product_id: consumeProduct.id,
          barber_id: consumeForm.barber_id,
          quantity: consumeForm.quantity,
          description: consumeForm.description,
        }),
      })
      toast({ title: 'Consumo registrado com sucesso' })
      setConsumeOpen(false)
      loadData()
    } catch (err: any) {
      toast({
        title: 'Erro ao registrar consumo',
        description: err.message,
        variant: 'destructive',
      })
    }
  }

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0)

  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Lista de Produtos</h3>
        <Button
          onClick={() => {
            setProductToEdit(null)
            setIsFormOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Preço Venda</TableHead>
              <TableHead className="text-right">Preço Custo</TableHead>
              <TableHead className="text-right">Estoque</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Nenhum produto
                </TableCell>
              </TableRow>
            ) : (
              products.map((p) => {
                const isZeroStock = p.stock_quantity <= 0
                const isLowStock =
                  !isZeroStock &&
                  p.stock_quantity <= Math.max(p.min_stock || 0, p.reorder_point || 0)

                return (
                  <TableRow
                    key={p.id}
                    className={cn(
                      !p.is_active ? 'opacity-50 grayscale-[50%]' : '',
                      isZeroStock
                        ? 'bg-red-50/50 hover:bg-red-50/80 dark:bg-red-950/20 dark:hover:bg-red-950/30'
                        : '',
                      isLowStock
                        ? 'bg-amber-50/50 hover:bg-amber-50/80 dark:bg-amber-950/20 dark:hover:bg-amber-950/30'
                        : '',
                    )}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {p.name}
                        {!p.is_active && (
                          <Badge variant="secondary" className="text-[10px]">
                            Inativo
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{p.expand?.category_id?.name || p.category || '-'}</TableCell>
                    <TableCell className="text-right">{formatCurrency(p.price)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(p.cost_price)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span
                          className={cn(
                            'font-medium',
                            isZeroStock
                              ? 'text-red-600 font-bold'
                              : isLowStock
                                ? 'text-amber-600 font-bold'
                                : '',
                          )}
                        >
                          {p.stock_quantity || 0}
                        </span>
                        {isZeroStock ? (
                          <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">
                            Zerado
                          </Badge>
                        ) : isLowStock ? (
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1 py-0 h-4 text-amber-600 border-amber-600 bg-amber-50"
                          >
                            Baixo
                          </Badge>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <div className="flex justify-end items-center gap-3">
                        <div
                          className="flex items-center justify-center mr-2"
                          title={p.is_active ? 'Desativar Produto' : 'Ativar Produto'}
                        >
                          <Switch
                            checked={p.is_active}
                            onCheckedChange={() => handleToggleActive(p)}
                            className="data-[state=checked]:bg-emerald-500"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8"
                          onClick={() => {
                            setConsumeProduct(p)
                            setConsumeForm({ quantity: 1, barber_id: '', description: '' })
                            setConsumeOpen(true)
                          }}
                          title="Registrar Consumo Profissional"
                        >
                          <Scissors className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEdit(p)}
                          title="Editar Produto"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleDelete(p.id)}
                          title="Excluir Produto"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <ProductFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        productToEdit={productToEdit}
        onSuccess={loadData}
      />

      <Dialog open={consumeOpen} onOpenChange={setConsumeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Consumo Profissional</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Produto</Label>
              <Input value={consumeProduct?.name || ''} disabled />
            </div>
            <div className="space-y-2">
              <Label>Profissional</Label>
              <Select
                value={consumeForm.barber_id}
                onValueChange={(v) => setConsumeForm({ ...consumeForm, barber_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o profissional" />
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
              <Label>Quantidade</Label>
              <Input
                type="number"
                min={1}
                value={consumeForm.quantity}
                onChange={(e) =>
                  setConsumeForm({ ...consumeForm, quantity: Number(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Observação (Opcional)</Label>
              <Input
                value={consumeForm.description}
                onChange={(e) => setConsumeForm({ ...consumeForm, description: e.target.value })}
                placeholder="Ex: Uso em cliente especial"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConsumeOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConsumeSubmit} variant="destructive">
              Registrar Consumo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
