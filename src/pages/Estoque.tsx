import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ServicesTab } from '@/components/estoque/ServicesTab'
import { PackagesTab } from '@/components/estoque/PackagesTab'

export default function Estoque() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold tracking-tight">Catálogo de Serviços e Pacotes</h1>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="packages">Pacotes</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <ServicesTab />
        </TabsContent>

        <TabsContent value="packages">
          <PackagesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
