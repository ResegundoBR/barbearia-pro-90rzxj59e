import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import GeneralTab from './settings/GeneralTab'
import BusinessHoursTab from './settings/BusinessHoursTab'
import PermissionsTab from './settings/PermissionsTab'
import CategoriesTab from './settings/CategoriesTab'
import FinancialRulesTab from './settings/FinancialRulesTab'
import NotificationsTab from './settings/NotificationsTab'
import TemplatesTab from './settings/TemplatesTab'

export default function Settings() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
      </div>

      <Tabs defaultValue="geral" className="space-y-6 w-full">
        {/* Horizontal scrollable wrapper for tabs on mobile */}
        <div className="w-full overflow-x-auto pb-2 -mb-2 scrollbar-hide">
          <TabsList className="flex w-max min-w-full justify-start h-12">
            <TabsTrigger className="px-4" value="geral">
              Geral
            </TabsTrigger>
            <TabsTrigger className="px-4" value="horario">
              Horário
            </TabsTrigger>
            <TabsTrigger className="px-4" value="permissoes">
              Permissões
            </TabsTrigger>
            <TabsTrigger className="px-4" value="categorias">
              Categorias
            </TabsTrigger>
            <TabsTrigger className="px-4" value="regras">
              Regras Financeiras
            </TabsTrigger>
            <TabsTrigger className="px-4" value="notificacoes">
              Notificações
            </TabsTrigger>
            <TabsTrigger className="px-4" value="modelos">
              Modelos
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="geral" className="mt-4">
          <GeneralTab />
        </TabsContent>
        <TabsContent value="horario" className="mt-4">
          <BusinessHoursTab />
        </TabsContent>
        <TabsContent value="permissoes" className="mt-4">
          <PermissionsTab />
        </TabsContent>
        <TabsContent value="categorias" className="mt-4">
          <CategoriesTab />
        </TabsContent>
        <TabsContent value="regras" className="mt-4">
          <FinancialRulesTab />
        </TabsContent>
        <TabsContent value="notificacoes" className="mt-4">
          <NotificationsTab />
        </TabsContent>
        <TabsContent value="modelos" className="mt-4">
          <TemplatesTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
