import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GeralTab } from './settings/GeralTab'
import { HorarioTab } from './settings/HorarioTab'
import { PermissoesTab } from './settings/PermissoesTab'
import { CategoriasTab } from './settings/CategoriasTab'
import { RegrasFinanceirasTab } from './settings/RegrasFinanceirasTab'
import { NotificacoesTab } from './settings/NotificacoesTab'
import { ModelosTab } from './settings/ModelosTab'

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as preferências e regras do seu sistema.</p>
      </div>

      <Tabs defaultValue="geral" className="w-full">
        {/* Mobile responsive horizontal scrolling tab list without visible scrollbar */}
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto py-2 px-1 mb-4 bg-transparent border-b rounded-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <TabsTrigger
            value="geral"
            className="whitespace-nowrap rounded-none bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent"
          >
            Geral
          </TabsTrigger>
          <TabsTrigger
            value="horario"
            className="whitespace-nowrap rounded-none bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent"
          >
            Horário
          </TabsTrigger>
          <TabsTrigger
            value="permissoes"
            className="whitespace-nowrap rounded-none bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent"
          >
            Permissões
          </TabsTrigger>
          <TabsTrigger
            value="categorias"
            className="whitespace-nowrap rounded-none bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent"
          >
            Categorias
          </TabsTrigger>
          <TabsTrigger
            value="financeiro"
            className="whitespace-nowrap rounded-none bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent"
          >
            Regras Financeiras
          </TabsTrigger>
          <TabsTrigger
            value="notificacoes"
            className="whitespace-nowrap rounded-none bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent"
          >
            Notificações
          </TabsTrigger>
          <TabsTrigger
            value="modelos"
            className="whitespace-nowrap rounded-none bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent"
          >
            Modelos
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="geral" className="mt-0 focus-visible:outline-none">
            <GeralTab />
          </TabsContent>
          <TabsContent value="horario" className="mt-0 focus-visible:outline-none">
            <HorarioTab />
          </TabsContent>
          <TabsContent value="permissoes" className="mt-0 focus-visible:outline-none">
            <PermissoesTab />
          </TabsContent>
          <TabsContent value="categorias" className="mt-0 focus-visible:outline-none">
            <CategoriasTab />
          </TabsContent>
          <TabsContent value="financeiro" className="mt-0 focus-visible:outline-none">
            <RegrasFinanceirasTab />
          </TabsContent>
          <TabsContent value="notificacoes" className="mt-0 focus-visible:outline-none">
            <NotificacoesTab />
          </TabsContent>
          <TabsContent value="modelos" className="mt-0 focus-visible:outline-none">
            <ModelosTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
