import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getProducts, deleteProduct } from '@/services/products'
import { useRealtime } from '@/hooks/use-realtime'
import { ProductFormDialog } from './ProductFormDialog'
import { useToast } from '@/hooks/use-toast'

export function ProductsTab() {
  const { toast } = useToast()
  const [products, setProducts] = useState<any[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState<any>(null)

  const loadData = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
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
              products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.expand?.category_id?.name || p.category || '-'}</TableCell>
                  <TableCell className="text-right">{formatCurrency(p.price)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(p.cost_price)}</TableCell>
                  <TableCell className="text-right">{p.stock_quantity}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(p)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
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
    </div>
  )
}
