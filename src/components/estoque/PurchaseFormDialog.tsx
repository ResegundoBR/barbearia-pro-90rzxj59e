import { useState, useEffect } from 'react'
import { format } from 'date-fns'
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
import { createInventoryPurchase, updateInventoryPurchase } from '@/services/inventory_purchases'
import { useToast } from '@/hooks/use-toast'

export function PurchaseFormDialog({
  open,
  onOpenChange,
  purchaseToEdit,
  products,
  suppliers,
  onSuccess,
}: any) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const [productId, setProductId] = useState('')
  const [supplierId, setSupplierId] = useState('')
  const [quantity, setQuantity] = useState<number | ''>('')
  const [unitPrice, setUnitPrice] = useState<number | ''>('')
  const [totalCompra, setTotalCompra] = useState<number | ''>('')
  const [purchaseDate, setPurchaseDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [status, setStatus] = useState('pending')

  useEffect(() => {
    if (open) {
      if (purchaseToEdit) {
        setProductId(purchaseToEdit.product_id)
        setSupplierId(purchaseToEdit.supplier_id)
        setQuantity(purchaseToEdit.quantity)
        setUnitPrice(purchaseToEdit.unit_price)
        setTotalCompra(purchaseToEdit.price_paid)
        setPurchaseDate(
          purchaseToEdit.purchase_date
            ? purchaseToEdit.purchase_date.split('T')[0]
            : format(new Date(), 'yyyy-MM-dd'),
        )
        setStatus(purchaseToEdit.status || 'pending')
      } else {
        setProductId('')
        setSupplierId('')
        setQuantity('')
        setUnitPrice('')
        setTotalCompra('')
        setPurchaseDate(format(new Date(), 'yyyy-MM-dd'))
        setStatus('pending')
      }
    }
  }, [open, purchaseToEdit])

  const handleProductChange = (val: string) => {
    setProductId(val)
    if (!purchaseToEdit) {
      const product = products.find((p: any) => p.id === val)
      if (product && product.cost_price != null) {
        setUnitPrice(product.cost_price)
        if (quantity !== '') {
          setTotalCompra(Number(quantity) * Number(product.cost_price))
        }
      }
    }
  }

  const handleQuantityChange = (val: string) => {
    const qty = val ? Number(val) : ''
    setQuantity(qty)
    if (qty !== '' && unitPrice !== '') {
      setTotalCompra(Number(qty) * Number(unitPrice))
    } else {
      setTotalCompra('')
    }
  }

  const handleUnitPriceChange = (val: string) => {
    const price = val ? Number(val) : ''
    setUnitPrice(price)
    if (price !== '' && quantity !== '') {
      setTotalCompra(Number(quantity) * Number(price))
    } else {
      setTotalCompra('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const data: any = {
      product_id: productId,
      supplier_id: supplierId,
      quantity: Number(quantity),
      unit_price: Number(unitPrice),
      price_paid: Number(totalCompra),
      purchase_date: new Date(purchaseDate).toISOString(),
      status,
    }

    if (status === 'received' && (!purchaseToEdit || purchaseToEdit.status !== 'received')) {
      data.received_at = new Date().toISOString()
    }

    try {
      if (purchaseToEdit) {
        await updateInventoryPurchase(purchaseToEdit.id, data)
        toast({ title: 'Compra atualizada com sucesso!' })
      } else {
        await createInventoryPurchase(data)
        toast({ title: 'Compra registrada com sucesso!' })
      }
      onSuccess()
      onOpenChange(false)
    } catch (err: any) {
      toast({ title: 'Erro ao salvar', description: err.message, variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{purchaseToEdit ? 'Editar Compra' : 'Nova Compra'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label>Produto</Label>
              <Select value={productId} onValueChange={handleProductChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {products.map((p: any) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Fornecedor</Label>
              <Select value={supplierId} onValueChange={setSupplierId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((s: any) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quantidade</Label>
              <Input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Preço Unitário (R$)</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={unitPrice}
                onChange={(e) => handleUnitPriceChange(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Total Compra (R$)</Label>
              <Input
                type="number"
                min="0"
                step="0.01"
                value={totalCompra}
                onChange={(e) => setTotalCompra(e.target.value ? Number(e.target.value) : '')}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Data da Compra</Label>
              <Input
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus} required>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="received">Recebido</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
