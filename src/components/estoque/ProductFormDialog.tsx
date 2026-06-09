import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createProduct, updateProduct } from '@/services/products'
import { getCategories } from '@/services/categories'
import { useToast } from '@/hooks/use-toast'
import pb from '@/lib/pocketbase/client'
import { getErrorMessage } from '@/lib/pocketbase/errors'

export function ProductFormDialog({ open, onOpenChange, productToEdit, onSuccess }: any) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [costPrice, setCostPrice] = useState<number | ''>('')
  const [stockQuantity, setStockQuantity] = useState<number | ''>('')
  const [categoryId, setCategoryId] = useState<string>('')
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(data.filter((c) => c.type === 'product')))
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (open) {
      if (productToEdit) {
        setName(productToEdit.name)
        setPrice(productToEdit.price)
        setCostPrice(productToEdit.cost_price)
        setStockQuantity(productToEdit.stock_quantity)
        setCategoryId(productToEdit.category_id || '')
      } else {
        setName('')
        setPrice('')
        setCostPrice('')
        setStockQuantity(0)
        setCategoryId('')
      }
    }
  }, [open, productToEdit])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      name,
      price: Number(price),
      cost_price: Number(costPrice),
      stock_quantity: Number(stockQuantity),
      category_id: categoryId || null,
      is_active: true,
      organization_id: pb.authStore.record?.organization_id,
    }
    try {
      if (productToEdit) {
        await updateProduct(productToEdit.id, data)
        toast({ title: 'Produto atualizado' })
      } else {
        await createProduct(data)
        toast({ title: 'Produto criado' })
      }
      onSuccess()
      onOpenChange(false)
    } catch (err: any) {
      toast({ title: 'Erro', description: getErrorMessage(err), variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{productToEdit ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria..." />
              </SelectTrigger>
              <SelectContent>
                {categories.length === 0 ? (
                  <div className="p-2 text-sm text-muted-foreground">
                    Nenhuma categoria de produto encontrada
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Preço de Venda (R$)</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Preço de Custo (R$)</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={costPrice}
                onChange={(e) => setCostPrice(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Estoque Inicial</Label>
            <Input
              type="number"
              min="0"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
