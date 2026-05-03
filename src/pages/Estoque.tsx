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
import { AlertTriangle, Lock, PackagePlus, Tags } from 'lucide-react'
import useMainStore from '@/stores/main'
import { FeatureGuard } from '@/components/FeatureGuard'
import { hasFeature } from '@/lib/tiers'

export default function Estoque() {
  const { state } = useMainStore()
  const hasAdvancedAlerts = hasFeature(state.tier, 'Pro')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Estoque & Serviços</h2>
          <p className="text-muted-foreground">Controle de produtos físicos e pacotes.</p>
        </div>
      </div>

      <Tabs defaultValue="produtos" className="w-full">
        <TabsList className="mb-4 w-full sm:w-auto flex min-h-[44px]">
          <TabsTrigger value="produtos" className="gap-2 flex-1 sm:flex-none py-2 min-h-[40px]">
            <PackagePlus className="size-4" /> Produtos
          </TabsTrigger>
          <TabsTrigger value="pacotes" className="gap-2 flex-1 sm:flex-none py-2 min-h-[40px]">
            <Tags className="size-4" /> Combos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="produtos" className="space-y-4 animate-fade-in">
          <FeatureGuard
            requiredTier="Basic"
            fallbackMessage="O controle de estoque inicia no plano Basic."
          >
            <Card>
              <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4">
                <div>
                  <CardTitle>Inventário Atual</CardTitle>
                  <CardDescription>
                    Acompanhe o nível de estoque para repor a tempo.
                  </CardDescription>
                </div>
                <Button className="min-h-[44px]">Novo Produto</Button>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                {/* Mobile View */}
                <div className="grid grid-cols-1 gap-3 p-4 sm:hidden">
                  {state.products.map((p) => {
                    const isLow = p.stock <= p.minStock
                    return (
                      <div key={p.id} className="bg-muted/10 border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold">{p.name}</div>
                            <div className="text-xs text-muted-foreground">{p.category}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-bold text-lg">{p.stock} un</div>
                            <div className="text-[10px] text-muted-foreground">
                              Min: {p.minStock}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t text-sm">
                          <div className="font-mono text-primary">R$ {p.price.toFixed(2)}</div>
                          {!hasAdvancedAlerts ? (
                            <Badge variant="outline" className="text-muted-foreground gap-1">
                              <Lock className="size-3" /> Alerta Pro
                            </Badge>
                          ) : isLow ? (
                            <Badge
                              variant="destructive"
                              className="bg-red-900/40 text-red-400 gap-1"
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
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Desktop View */}
                <div className="hidden sm:block">
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
                              {!hasAdvancedAlerts ? (
                                <Badge variant="outline" className="text-muted-foreground gap-1">
                                  <Lock className="size-3" /> Pro
                                </Badge>
                              ) : isLow ? (
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
                </div>
              </CardContent>
            </Card>
          </FeatureGuard>
        </TabsContent>

        <TabsContent value="pacotes" className="animate-fade-in">
          <FeatureGuard
            requiredTier="Pro"
            fallbackMessage="Venda de pacotes e combos é exclusiva do plano Pro."
          >
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
                    <Button variant="outline" className="w-full mt-4 min-h-[44px]">
                      Editar
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </FeatureGuard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
