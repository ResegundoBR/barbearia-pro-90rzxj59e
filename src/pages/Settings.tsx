import { useState } from 'react'
import { Download, Upload, Users, Package, Truck, Settings as SettingsIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import importacaoClientes from '@/assets/importacao-de-clientes-d0194.xlsx'
import importacaoProdutos from '@/assets/importacao-de-produtos-5da39.xlsx'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('importacao')

  return (
    <div className="container mx-auto py-8 px-4 text-slate-100 max-w-6xl animate-fade-in">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 rounded-lg bg-[#1e293b] border border-slate-700 shadow-sm">
          <SettingsIcon className="w-7 h-7 text-[#f59e0b]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Configurações do Sistema</h1>
          <p className="text-slate-400 text-sm">
            Gerencie a identidade visual e as categorias de serviços e produtos.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full shadow-2xl rounded-xl">
        <div className="bg-[#1e293b] p-2 rounded-t-xl border border-b-0 border-slate-700 overflow-x-auto custom-scrollbar">
          <TabsList className="bg-transparent flex w-max gap-1 h-auto p-0">
            {[
              'geral',
              'horario',
              'permissoes',
              'categorias',
              'financeiras',
              'notificacoes',
              'importacao',
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="data-[state=active]:bg-[#0f172a] data-[state=active]:text-white data-[state=active]:border-slate-700 data-[state=active]:shadow-sm border border-transparent text-slate-400 px-4 py-2.5 rounded-lg transition-all whitespace-nowrap font-medium text-sm"
              >
                {tab === 'geral' && 'Geral (Marca)'}
                {tab === 'horario' && 'Horário de Funcionamento'}
                {tab === 'permissoes' && 'Permissões de Acesso'}
                {tab === 'categorias' && 'Configurações de Categorias'}
                {tab === 'financeiras' && 'Regras Financeiras'}
                {tab === 'notificacoes' && 'Gerenciamento de Notificações'}
                {tab === 'importacao' && 'Modelos de Importação'}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Target Tab: Modelos de Importação */}
        <TabsContent value="importacao" className="mt-0">
          <div className="bg-[#1e293b] p-8 rounded-b-xl border border-t-0 border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
              Central de Importação
            </h2>
            <p className="text-slate-400 mb-8 text-sm">
              Baixe os modelos e importe seus dados em massa para o sistema.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card Clientes */}
              <div className="bg-[#0f172a] rounded-xl border border-slate-700 p-6 flex flex-col items-center text-center transition-all hover:border-slate-500 hover:shadow-lg">
                <div className="h-16 w-16 rounded-full bg-[#1e293b] flex items-center justify-center mb-5 border border-slate-800 shadow-inner">
                  <Users className="h-7 w-7 text-[#f59e0b]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Clientes</h3>
                <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                  Importe sua base de clientes com datas de nascimento e preferências.
                </p>
                {/* Repositioned layout using flex-col gap-3 to contain buttons strictly inside card */}
                <div className="w-full flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:text-white hover:bg-[#1e293b] bg-transparent h-11"
                    asChild
                  >
                    <a href={importacaoClientes} download="importacao-de-clientes.xlsx">
                      <Download className="mr-2 h-4 w-4" />
                      Modelo (Sheets)
                    </a>
                  </Button>
                  <Button className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-slate-900 font-bold h-11 transition-colors">
                    <Upload className="mr-2 h-4 w-4" />
                    Importar CSV
                  </Button>
                </div>
              </div>

              {/* Card Produtos */}
              <div className="bg-[#0f172a] rounded-xl border border-slate-700 p-6 flex flex-col items-center text-center transition-all hover:border-slate-500 hover:shadow-lg">
                <div className="h-16 w-16 rounded-full bg-[#1e293b] flex items-center justify-center mb-5 border border-slate-800 shadow-inner">
                  <Package className="h-7 w-7 text-[#f59e0b]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Produtos</h3>
                <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                  Importe o inventário com preços e crie categorias automaticamente.
                </p>
                <div className="w-full flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:text-white hover:bg-[#1e293b] bg-transparent h-11"
                    asChild
                  >
                    <a href={importacaoProdutos} download="importacao-de-produtos.xlsx">
                      <Download className="mr-2 h-4 w-4" />
                      Modelo (Sheets)
                    </a>
                  </Button>
                  <Button className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-slate-900 font-bold h-11 transition-colors">
                    <Upload className="mr-2 h-4 w-4" />
                    Importar CSV
                  </Button>
                </div>
              </div>

              {/* Card Fornecedores */}
              <div className="bg-[#0f172a] rounded-xl border border-slate-700 p-6 flex flex-col items-center text-center transition-all hover:border-slate-500 hover:shadow-lg">
                <div className="h-16 w-16 rounded-full bg-[#1e293b] flex items-center justify-center mb-5 border border-slate-800 shadow-inner">
                  <Truck className="h-7 w-7 text-[#f59e0b]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Fornecedores</h3>
                <p className="text-slate-400 text-sm mb-8 flex-grow leading-relaxed">
                  Importe dados de contato e documentos dos fornecedores.
                </p>
                <div className="w-full flex flex-col gap-3">
                  <Button
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:text-white hover:bg-[#1e293b] bg-transparent h-11"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Modelo (Sheets)
                  </Button>
                  <Button className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-slate-900 font-bold h-11 transition-colors">
                    <Upload className="mr-2 h-4 w-4" />
                    Importar CSV
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Dummy Contexts for Unrequested Tabs to maintain functional Layout */}
        {['geral', 'horario', 'permissoes', 'categorias', 'financeiras', 'notificacoes'].map(
          (tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <div className="bg-[#1e293b] p-12 rounded-b-xl border border-t-0 border-slate-700 flex flex-col items-center justify-center text-center min-h-[400px]">
                <SettingsIcon className="w-12 h-12 text-slate-600 mb-4 opacity-30" />
                <h3 className="text-xl font-medium text-slate-300 mb-2">Seção em Manutenção</h3>
                <p className="text-slate-500 max-w-md text-sm">
                  As opções deste módulo estão sendo refinadas para a nova versão. No momento,
                  concentre-se nas abas disponíveis.
                </p>
              </div>
            </TabsContent>
          ),
        )}
      </Tabs>
    </div>
  )
}
