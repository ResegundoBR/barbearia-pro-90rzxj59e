import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import pb from '@/lib/pocketbase/client'
import { format } from 'date-fns'
import { Loader2, Package, Layers, Receipt } from 'lucide-react'
import { ProdutosTab } from './produtos-categorias/ProdutosTab'
import { CategoriasTab } from './produtos-categorias/CategoriasTab'

export default function ProdutosCategorias() {
  const [purchases, setPurchases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const p = await pb
          .collection('inventory_purchases')
          .getFullList({ expand: 'product_id,supplier_id', sort: '-purchase_date' })
        setPurchases(p)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Produtos & Categorias</h2>
        <p className="text-muted-foreground text-sm">
          Gerencie o estoque e visualize o histórico de compras
        </p>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-lg mb-4">
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="size-4 hidden sm:block" /> Produtos
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Layers className="size-4 hidden sm:block" /> Categorias
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Receipt className="size-4 hidden sm:block" /> Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Produtos em Estoque</CardTitle>
              <CardDescription>
                Gerencie todos os produtos do seu estoque, controle quantidades e preços.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ProdutosTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Categorias do Sistema</CardTitle>
              <CardDescription>Gerencie as classificações de serviços e produtos.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <CategoriasTab />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Compras de Estoque</CardTitle>
              <CardDescription>Relatório consolidado com a coluna Total da Compra.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto w-full">
                <Table className="min-w-[700px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Produto</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead className="text-right">Qtd</TableHead>
                      <TableHead className="text-right">Preço Unit.</TableHead>
                      <TableHead className="text-right">Total da Compra</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                        </TableCell>
                      </TableRow>
                    ) : (
                      purchases.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell>
                            {p.purchase_date
                              ? format(new Date(p.purchase_date), 'dd/MM/yyyy')
                              : '-'}
                          </TableCell>
                          <TableCell className="font-medium">
                            {p.expand?.product_id?.name || '-'}
                          </TableCell>
                          <TableCell>{p.expand?.supplier_id?.name || '-'}</TableCell>
                          <TableCell className="text-right">{p.quantity}</TableCell>
                          <TableCell className="text-right">
                            R$ {(p.price_paid || p.unit_price || 0).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-bold text-emerald-500">
                            R$ {((p.price_paid || p.unit_price || 0) * p.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                    {!loading && purchases.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                          Nenhuma compra de estoque registrada.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
