import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Users, Package, Truck } from 'lucide-react'

export default function TemplatesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Modelos de Importação</CardTitle>
        <CardDescription>
          Baixe nossos modelos do Google Sheets para facilitar a importação de dados em massa na sua
          barbearia.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3">
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-2 flex-grow-0">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" /> Clientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col flex-grow justify-between">
            <p className="text-sm text-muted-foreground">
              Colunas obrigatórias: Nome, Sobrenome, Telefone, Email, Data de Nascimento.
            </p>
            <Button className="w-full mt-auto" asChild>
              <a
                href="https://docs.google.com/spreadsheets/d/1_CLIENTS_TEMPLATE/edit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" /> Importar Clientes
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader className="pb-2 flex-grow-0">
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5" /> Produtos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col flex-grow justify-between">
            <p className="text-sm text-muted-foreground">
              Colunas obrigatórias: Nome, Preço, Categoria, Quantidade em Estoque.
            </p>
            <Button className="w-full mt-auto" asChild>
              <a
                href="https://docs.google.com/spreadsheets/d/1_PRODUCTS_TEMPLATE/edit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" /> Importar Produtos
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader className="pb-2 flex-grow-0">
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="h-5 w-5" /> Fornecedores
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col flex-grow justify-between">
            <p className="text-sm text-muted-foreground">
              Colunas obrigatórias: Nome, Documento (CNPJ/CPF), Telefone, Pessoa de Contato.
            </p>
            <Button className="w-full mt-auto" asChild>
              <a
                href="https://docs.google.com/spreadsheets/d/1_SUPPLIERS_TEMPLATE/edit"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" /> Importar Fornecedores
              </a>
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
