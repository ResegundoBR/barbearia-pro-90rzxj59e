import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileSpreadsheet } from 'lucide-react'

export function ModelosTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Modelos de Importação</CardTitle>
        <CardDescription>
          Baixe ou acesse os modelos em Google Sheets para facilitar a importação de dados no
          sistema. Faça uma cópia da planilha, preencha os dados e exporte como CSV para importar.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
          <div className="flex-1">
            <h3 className="font-medium text-lg">Modelo de Clientes</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Colunas necessárias: Nome, Sobrenome, Telefone, Email, Aniversário, Tipo de Local.
            </p>
          </div>
          <Button asChild variant="outline" className="w-full sm:w-auto flex-shrink-0">
            <a
              href="https://docs.google.com/spreadsheets/d/1yN_placeholder_clientes/copy"
              target="_blank"
              rel="noreferrer"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" /> Google Sheets
            </a>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
          <div className="flex-1">
            <h3 className="font-medium text-lg">Modelo de Produtos</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Colunas necessárias: Name, Price, Category, Initial Stock, Min Stock, Cost Price.
            </p>
          </div>
          <Button asChild variant="outline" className="w-full sm:w-auto flex-shrink-0">
            <a
              href="https://docs.google.com/spreadsheets/d/1yN_placeholder_produtos/copy"
              target="_blank"
              rel="noreferrer"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" /> Google Sheets
            </a>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
          <div className="flex-1">
            <h3 className="font-medium text-lg">Modelo de Fornecedores</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Colunas necessárias: Name, Document, Phone, Whatsapp, Contact Person.
            </p>
          </div>
          <Button asChild variant="outline" className="w-full sm:w-auto flex-shrink-0">
            <a
              href="https://docs.google.com/spreadsheets/d/1yN_placeholder_fornecedores/copy"
              target="_blank"
              rel="noreferrer"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" /> Google Sheets
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
