import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import pb from '@/lib/pocketbase/client'
import { Download, Upload, Clock, ShieldCheck, Database, Building2 } from 'lucide-react'

// Custom CSV Parser to safely handle commas inside quoted strings
function parseCSV(text: string) {
  const lines = text.split(/\r?\n/)
  if (lines.length === 0) return []

  const parseLine = (line: string) => {
    const result = []
    let current = ''
    let inQuotes = false
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        result.push(current)
        current = ''
      } else {
        current += char
      }
    }
    result.push(current)
    return result
  }

  const headers = parseLine(lines[0]).map((h) => h.trim())
  const data = []

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue
    const values = parseLine(lines[i]).map((v) => v.trim())
    const obj: Record<string, string> = {}
    headers.forEach((h, idx) => {
      obj[h] = values[idx] || ''
    })
    data.push(obj)
  }

  return data
}

// Emulated Google Sheets templates using generated CSV data URIs
const CLIENT_TEMPLATE_URL =
  'data:text/csv;charset=utf-8,' +
  encodeURIComponent('Nome,Sobrenome,Celular,Fone Secundário,Nascimento,Profissional,Localização\n')
const PRODUCT_TEMPLATE_URL =
  'data:text/csv;charset=utf-8,' +
  encodeURIComponent('Produto,Categoria,Preço de Venda,Preço de Custo,Estoque Atual\n')
const SUPPLIER_TEMPLATE_URL =
  'data:text/csv;charset=utf-8,' +
  encodeURIComponent('Nome,CPF/CNPJ,Endereço,Pessoa de Contato,WhatsApp/Fone,Categoria\n')

export default function Settings() {
  const [loading, setLoading] = useState(false)

  const handleImport = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'clientes' | 'produtos' | 'fornecedores',
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      const text = event.target?.result as string
      const data = parseCSV(text)

      setLoading(true)
      let successCount = 0
      let errorCount = 0

      try {
        if (type === 'clientes') {
          for (const row of data) {
            try {
              let birthDate = ''
              // Safely treat "Nascimento" as string to avoid Sheets/Excel date conversion issues
              if (row['Nascimento']) {
                const parts = row['Nascimento'].split('/')
                if (parts.length === 3) {
                  // Map DD/MM/AAAA to YYYY-MM-DD for DB
                  birthDate = `${parts[2]}-${parts[1]}-${parts[0]} 12:00:00.000Z`
                }
              }

              await pb.collection('clients').create({
                name: row['Nome'],
                surname: row['Sobrenome'],
                phone: row['Celular'],
                phone_secondary: row['Fone Secundário'],
                birthday: birthDate || undefined,
                location_type:
                  row['Localização']?.toLowerCase() === 'passagem' ? 'passage' : 'nearby',
                is_active: true,
              })
              successCount++
            } catch (err) {
              console.error(err)
              errorCount++
            }
          }
        } else if (type === 'produtos') {
          for (const row of data) {
            try {
              await pb.collection('products').create({
                name: row['Produto'],
                category: row['Categoria'],
                price: parseFloat(row['Preço de Venda']?.replace(',', '.') || '0'),
                cost_price: parseFloat(row['Preço de Custo']?.replace(',', '.') || '0'),
                stock_quantity: parseInt(row['Estoque Atual'] || '0', 10),
                is_active: true,
              })
              successCount++
            } catch (err) {
              console.error(err)
              errorCount++
            }
          }
        } else if (type === 'fornecedores') {
          for (const row of data) {
            try {
              await pb.collection('suppliers').create({
                name: row['Nome'],
                document: row['CPF/CNPJ'],
                address: row['Endereço'],
                contact_person: row['Pessoa de Contato'] || row['Pesso de Contato'],
                whatsapp: row['WhatsApp/Fone'],
              })
              successCount++
            } catch (err) {
              console.error(err)
              errorCount++
            }
          }
        }
        toast.success(`Importação concluída. Sucesso: ${successCount}. Erros: ${errorCount}.`)
      } catch (error) {
        toast.error('Erro ao processar arquivo.')
      } finally {
        setLoading(false)
        e.target.value = ''
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="container mx-auto py-8 max-w-5xl space-y-6 px-4 md:px-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie as preferências da sua barbearia e importe dados.
        </p>
      </div>

      <Tabs defaultValue="geral" className="w-full">
        {/* Responsive Mobile Navigation */}
        <ScrollArea className="w-full border-b mb-6">
          <TabsList className="inline-flex h-12 items-center justify-start rounded-none bg-transparent p-0 w-max min-w-full">
            <TabsTrigger
              value="geral"
              className="inline-flex items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground hover:text-foreground rounded-none shadow-none data-[state=active]:bg-transparent"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Geral
            </TabsTrigger>
            <TabsTrigger
              value="horario"
              className="inline-flex items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground hover:text-foreground rounded-none shadow-none data-[state=active]:bg-transparent"
            >
              <Clock className="w-4 h-4 mr-2" />
              Horário
            </TabsTrigger>
            <TabsTrigger
              value="permissoes"
              className="inline-flex items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground hover:text-foreground rounded-none shadow-none data-[state=active]:bg-transparent"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Permissões
            </TabsTrigger>
            <TabsTrigger
              value="importacao"
              className="inline-flex items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=inactive]:text-muted-foreground hover:text-foreground rounded-none shadow-none data-[state=active]:bg-transparent"
            >
              <Database className="w-4 h-4 mr-2" />
              Central de Importação
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" className="invisible sm:visible" />
        </ScrollArea>

        <TabsContent value="geral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Barbearia</CardTitle>
              <CardDescription>Informações básicas do seu negócio.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome da Barbearia</Label>
                <Input id="name" defaultValue="La Barberiá" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" defaultValue="Rua Principal, 123" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="horario" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Horário de Funcionamento</CardTitle>
              <CardDescription>Defina os horários em que a barbearia está aberta.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Em breve: gerenciamento detalhado de horários por dia da semana.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Controle de Acesso</CardTitle>
              <CardDescription>Gerencie o que cada perfil pode acessar no sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Configuração de permissões para administradores, sócios e autônomos.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="importacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Central de Importação</CardTitle>
              <CardDescription>
                Importe seus dados em massa a partir de planilhas CSV para popular o sistema
                rapidamente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Fixed Grid Layout ensuring buttons don't overflow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Block Clientes */}
                <div className="flex flex-col border rounded-xl p-5 bg-card text-card-foreground shadow-sm h-full">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg">Clientes</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Importe sua base de clientes com contato e data de nascimento.
                    </p>
                  </div>
                  <div className="mt-auto flex flex-col gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <a href={CLIENT_TEMPLATE_URL} download="template_clientes.csv">
                        <Download className="w-4 h-4" />
                        Baixar Template
                      </a>
                    </Button>
                    <div className="relative w-full">
                      <Input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleImport(e, 'clientes')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        disabled={loading}
                      />
                      <Button
                        className="w-full flex items-center justify-center gap-2"
                        disabled={loading}
                      >
                        <Upload className="w-4 h-4" />
                        Importar Planilha
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Block Produtos */}
                <div className="flex flex-col border rounded-xl p-5 bg-card text-card-foreground shadow-sm h-full">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg">Produtos</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Atualize seu estoque com produtos, categorias e preços.
                    </p>
                  </div>
                  <div className="mt-auto flex flex-col gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <a href={PRODUCT_TEMPLATE_URL} download="template_produtos.csv">
                        <Download className="w-4 h-4" />
                        Baixar Template
                      </a>
                    </Button>
                    <div className="relative w-full">
                      <Input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleImport(e, 'produtos')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        disabled={loading}
                      />
                      <Button
                        className="w-full flex items-center justify-center gap-2"
                        disabled={loading}
                      >
                        <Upload className="w-4 h-4" />
                        Importar Planilha
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Block Fornecedores */}
                <div className="flex flex-col border rounded-xl p-5 bg-card text-card-foreground shadow-sm h-full">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg">Fornecedores</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Adicione a lista de fornecedores com seus respectivos contatos.
                    </p>
                  </div>
                  <div className="mt-auto flex flex-col gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <a href={SUPPLIER_TEMPLATE_URL} download="template_fornecedores.csv">
                        <Download className="w-4 h-4" />
                        Baixar Template
                      </a>
                    </Button>
                    <div className="relative w-full">
                      <Input
                        type="file"
                        accept=".csv"
                        onChange={(e) => handleImport(e, 'fornecedores')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        disabled={loading}
                      />
                      <Button
                        className="w-full flex items-center justify-center gap-2"
                        disabled={loading}
                      >
                        <Upload className="w-4 h-4" />
                        Importar Planilha
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">
                  Dicas para importação (Google Sheets/Excel):
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Baixe o template acima e abra no Google Sheets ou Excel.</li>
                  <li>Preencha os dados seguindo o cabeçalho (não altere os nomes das colunas).</li>
                  <li>
                    A coluna <strong>Nascimento</strong> deve ser inserida no formato{' '}
                    <code className="bg-muted px-1 py-0.5 rounded text-foreground">DD/MM/AAAA</code>{' '}
                    (ex: 15/04/1990).
                  </li>
                  <li>
                    Após preencher, exporte o arquivo como <strong>.csv</strong> (Valores Separados
                    por Vírgula) e importe usando o botão correspondente.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
