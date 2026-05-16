import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createProduct, updateProduct } from '@/services/products'
import { useToast } from '@/hooks/use-toast'

export function ProductFormDialog({ open, onOpenChange, productToEdit, onSuccess }: any) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState<number | ''>('')
  const [costPrice, setCostPrice] = useState<number | ''>('')
  const [stockQuantity, setStockQuantity] = useState<number | ''>('')

  useEffect(() => {
    if (open) {
      if (productToEdit) {
        setName(productToEdit.name)
        setPrice(productToEdit.price)
        setCostPrice(productToEdit.cost_price)
        setStockQuantity(productToEdit.stock_quantity)
      } else {
        setName('')
        setPrice('')
        setCostPrice('')
        setStockQuantity(0)
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
      is_active: true,
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
      toast({ title: 'Erro', description: err.message, variant: 'destructive' })
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
