import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CategoriasTab } from './produtos-categorias/CategoriasTab'
import { ProdutosTab } from './produtos-categorias/ProdutosTab'

export default function ProdutosCategorias() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Produtos e Categorias</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie o catálogo de produtos e suas classificações.
        </p>
      </div>

      <Tabs defaultValue="produtos" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="produtos">Produtos</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
        </TabsList>
        <TabsContent value="produtos" className="mt-6">
          <div className="bg-card p-4 md:p-6 rounded-xl border shadow-sm">
            <ProdutosTab />
          </div>
        </TabsContent>
        <TabsContent value="categorias" className="mt-6">
          <div className="bg-card p-4 md:p-6 rounded-xl border shadow-sm">
            <CategoriasTab />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
