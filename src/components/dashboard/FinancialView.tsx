import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface FinancialViewProps {
  commissions: any[]
  isAdmin: boolean
  onOpenAdvanceModal: () => void
}

export function FinancialView({ commissions, isAdmin, onOpenAdvanceModal }: FinancialViewProps) {
  const totalAvailable = commissions
    .filter((c) => !c.is_advance && c.status === 'available')
    .reduce((acc, c) => acc + c.amount, 0)

  const totalAdvances = commissions
    .filter((c) => c.is_advance)
    .reduce((acc, c) => acc + c.amount, 0)

  const totalReceivables = commissions
    .filter((c) => !c.is_advance && c.status === 'pending')
    .reduce((acc, c) => acc + c.amount, 0)

  const netAvailable = totalAvailable - totalAdvances

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-glass border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Disponível para Saque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">R$ {netAvailable.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Adiantamentos já descontados</p>
          </CardContent>
        </Card>
        <Card className="bg-glass border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">A Receber</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              R$ {totalReceivables.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Cartões pendentes</p>
          </CardContent>
        </Card>
        <Card className="bg-glass border-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Adiantamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">R$ {totalAdvances.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Vales registrados</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mt-6">
        <h3 className="text-lg font-semibold">Histórico de Transações</h3>
        {isAdmin && (
          <Button onClick={onOpenAdvanceModal} variant="outline">
            Registrar Vale
          </Button>
        )}
      </div>

      <Card className="bg-glass border-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Profissional</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commissions.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{format(new Date(c.date || c.created), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{c.expand?.barber_id?.name || '-'}</TableCell>
                  <TableCell>
                    {c.is_advance ? 'Adiantamento' : c.type === 'service' ? 'Serviço' : 'Pacote'}
                  </TableCell>
                  <TableCell className="capitalize">{c.payment_method || '-'}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        c.status === 'paid' || c.status === 'available' ? 'default' : 'secondary'
                      }
                    >
                      {c.status === 'available'
                        ? 'Disponível'
                        : c.status === 'pending'
                          ? 'Pendente'
                          : 'Pago'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    <span className={c.is_advance ? 'text-red-500' : 'text-emerald-500'}>
                      {c.is_advance ? '-' : '+'} R$ {c.amount.toFixed(2)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              {commissions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    Nenhuma transação encontrada no período.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
