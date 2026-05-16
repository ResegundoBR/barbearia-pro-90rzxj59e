import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PurchasesTab } from '@/components/estoque/PurchasesTab'
import { ProductsTab } from '@/components/estoque/ProductsTab'

export default function Estoque() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold tracking-tight">Estoque</h1>

      <Tabs defaultValue="purchases" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="purchases">Histórico de Compras</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
        </TabsList>

        <TabsContent value="purchases">
          <PurchasesTab />
        </TabsContent>

        <TabsContent value="products">
          <ProductsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
