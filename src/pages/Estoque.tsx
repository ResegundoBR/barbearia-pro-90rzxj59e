import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, PackagePlus, Tags } from 'lucide-react'
import useMainStore from '@/stores/main'

export default function Estoque() {
  const { state } = useMainStore()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Estoque & Serviços</h2>
          <p className="text-muted-foreground">Controle de produtos físicos e pacotes.</p>
        </div>
      </div>

      <Tabs defaultValue="produtos" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="produtos" className="gap-2">
            <PackagePlus className="size-4" /> Produtos Físicos
          </TabsTrigger>
          <TabsTrigger value="pacotes" className="gap-2">
            <Tags className="size-4" /> Combos & Pacotes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="produtos" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader className="flex flex-row justify-between items-start pb-2">
              <div>
                <CardTitle>Inventário Atual</CardTitle>
                <CardDescription>Acompanhe o nível de estoque para repor a tempo.</CardDescription>
              </div>
              <Button size="sm">Novo Produto</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead className="text-center">Qtd Atual</TableHead>
                    <TableHead className="text-center">Ponto de Pedido</TableHead>
                    <TableHead className="text-right">Preço (Venda)</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {state.products.map((p) => {
                    const isLow = p.stock <= p.minStock
                    return (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell className="text-muted-foreground">{p.category}</TableCell>
                        <TableCell className="text-center font-mono font-bold text-lg">
                          {p.stock}
                        </TableCell>
                        <TableCell className="text-center text-muted-foreground">
                          {p.minStock}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          R$ {p.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {isLow ? (
                            <Badge
                              variant="destructive"
                              className="gap-1 bg-red-900/40 text-red-400 border-red-900 hover:bg-red-900/60"
                            >
                              <AlertTriangle className="size-3" /> Baixo
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-emerald-500 border-emerald-900"
                            >
                              Normal
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pacotes" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Pacotes Cadastrados</CardTitle>
              <CardDescription>Combos promocionais que incentivam retorno.</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Mock Packages */}
              {[
                {
                  name: 'Plano Mensal Barba',
                  desc: '4 cortes de barba por mês',
                  price: 120,
                  saves: 40,
                },
                {
                  name: 'Combo Cabelo + Barba + Cerveja',
                  desc: 'Serviço completo VIP',
                  price: 90,
                  saves: 15,
                },
                { name: 'Pai & Filho', desc: '2 cortes simultâneos', price: 80, saves: 20 },
              ].map((pkg, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-4 bg-background flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-bold text-lg">{pkg.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{pkg.desc}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="font-mono font-bold text-primary">
                      R$ {pkg.price.toFixed(2)}
                    </span>
                    <Badge variant="secondary" className="text-[10px]">
                      Economia R$ {pkg.saves}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
