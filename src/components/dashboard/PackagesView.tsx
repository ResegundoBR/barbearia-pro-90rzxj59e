import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface PackagesViewProps {
  packages: any[]
}

export function PackagesView({ packages }: PackagesViewProps) {
  const activePackages = packages.filter((p) => p.remaining_uses > 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {activePackages.map((p) => {
        const total = p.expand?.package_id?.quantity || 1
        const remaining = p.remaining_uses
        const used = total - remaining
        const progress = (used / total) * 100
        const isWarning = remaining <= 2
        const isExpired = p.expires_at && new Date(p.expires_at) < new Date()

        return (
          <Card key={p.id} className="bg-glass border-none">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-base truncate" title={p.expand?.client_id?.name}>
                  {p.expand?.client_id?.name}
                </CardTitle>
                {isExpired ? (
                  <Badge variant="destructive" className="shrink-0">
                    Expirado
                  </Badge>
                ) : isWarning ? (
                  <Badge
                    variant="secondary"
                    className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 shrink-0"
                  >
                    Quase no Fim
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-emerald-500 border-emerald-500 shrink-0">
                    Ativo
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">{p.expand?.package_id?.name}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Consumo</span>
                  <span className="font-medium">
                    {used} / {total}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between items-center text-xs text-muted-foreground mt-4 pt-2 border-t border-border/50">
                  <span>
                    Vence: {p.expires_at ? format(new Date(p.expires_at), 'dd/MM/yyyy') : '-'}
                  </span>
                  <span>Vendido por: {p.expand?.barber_id?.name || 'Não informado'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
      {activePackages.length === 0 && (
        <div className="col-span-full py-12 text-center text-muted-foreground">
          Nenhum pacote ativo encontrado.
        </div>
      )}
    </div>
  )
}
