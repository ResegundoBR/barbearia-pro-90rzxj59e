import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { PurchaseFormDialog } from './PurchaseFormDialog'
import { getInventoryPurchases, deleteInventoryPurchase } from '@/services/inventory_purchases'
import { getProducts } from '@/services/products'
import { getSuppliers } from '@/services/suppliers'
import { useRealtime } from '@/hooks/use-realtime'
import { useToast } from '@/hooks/use-toast'

export function PurchasesTab() {
  const { toast } = useToast()
  const [purchases, setPurchases] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [suppliers, setSuppliers] = useState<any[]>([])

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [purchaseToEdit, setPurchaseToEdit] = useState<any>(null)

  const loadData = async () => {
    try {
      const [purchasesData, productsData, suppliersData] = await Promise.all([
        getInventoryPurchases(),
        getProducts(),
        getSuppliers(),
      ])
      setPurchases(purchasesData)
      setProducts(productsData)
      setSuppliers(suppliersData)
    } catch (error) {
      console.error('Failed to load purchases data', error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('inventory_purchases', () => loadData())
  useRealtime('products', () => loadData())

  const handleEdit = (purchase: any) => {
    setPurchaseToEdit(purchase)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta compra?')) {
      try {
        await deleteInventoryPurchase(id)
        toast({ title: 'Compra excluída' })
        loadData()
      } catch (err: any) {
        toast({ title: 'Erro ao excluir', description: err.message, variant: 'destructive' })
      }
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0)
  }

  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Histórico de Compras</h3>
        <Button
          onClick={() => {
            setPurchaseToEdit(null)
            setIsFormOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Compra
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead className="text-right">Qtd</TableHead>
              <TableHead className="text-right">Vlr Unit</TableHead>
              <TableHead className="text-right">Vlr Compra</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  Nenhuma compra registrada.
                </TableCell>
              </TableRow>
            ) : (
              purchases.map((purchase) => {
                const total = purchase.price_paid || 0
                return (
                  <TableRow key={purchase.id}>
                    <TableCell>
                      {format(new Date(purchase.purchase_date), 'dd/MM/yyyy', { locale: ptBR })}
                    </TableCell>
                    <TableCell>{purchase.expand?.product_id?.name || '-'}</TableCell>
                    <TableCell>{purchase.expand?.supplier_id?.name || '-'}</TableCell>
                    <TableCell className="text-right">{purchase.quantity}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(purchase.unit_price)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(total)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={purchase.status === 'received' ? 'default' : 'secondary'}>
                        {purchase.status === 'received' ? 'Recebido' : 'Pendente'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(purchase)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(purchase.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <PurchaseFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        purchaseToEdit={purchaseToEdit}
        products={products}
        suppliers={suppliers}
        onSuccess={loadData}
      />
    </div>
  )
}
