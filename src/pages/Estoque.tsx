import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ServicesTab } from '@/components/estoque/ServicesTab'
import { PackagesTab } from '@/components/estoque/PackagesTab'
import { ProductsTab } from '@/components/estoque/ProductsTab'

export default function Estoque() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gradient">Serviços & Pacotes</h2>
        <p className="text-muted-foreground">Gerencie seus serviços, pacotes e produtos.</p>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="bg-card w-full justify-start h-auto p-1 overflow-x-auto">
          <TabsTrigger value="services" className="px-6 py-2">
            Serviços
          </TabsTrigger>
          <TabsTrigger value="packages" className="px-6 py-2">
            Pacotes
          </TabsTrigger>
          <TabsTrigger value="products" className="px-6 py-2">
            Produtos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="services" className="mt-4">
          <ServicesTab />
        </TabsContent>
        <TabsContent value="packages" className="mt-4">
          <PackagesTab />
        </TabsContent>
        <TabsContent value="products" className="mt-4">
          <ProductsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
