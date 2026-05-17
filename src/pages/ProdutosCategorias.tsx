import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductsTab } from '@/components/estoque/ProductsTab'
import { StockMovementsTab } from '@/components/estoque/StockMovementsTab'

export default function ProdutosCategorias() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold tracking-tight">Produtos e Estoque</h1>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="history">Histórico de Estoque</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>

        <TabsContent value="history">
          <StockMovementsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
