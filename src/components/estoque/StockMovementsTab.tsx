import { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'
import { format } from 'date-fns'

export function StockMovementsTab() {
  const [movements, setMovements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadMovements = async () => {
    try {
      const data = await pb.collection('stock_movements').getFullList({
        sort: '-created',
        expand: 'product_id,barber_id,client_id',
      })
      setMovements(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMovements()
  }, [])

  useRealtime('stock_movements', () => loadMovements())

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'purchase':
        return {
          label: 'Entrada (Compra)',
          color: 'bg-emerald-500/10 text-emerald-500 border-emerald-200',
        }
      case 'sale':
        return { label: 'Saída (Venda)', color: 'bg-blue-500/10 text-blue-500 border-blue-200' }
      case 'consumption':
        return { label: 'Consumo Profissional', color: 'bg-red-500/10 text-red-500 border-red-200' }
      case 'adjustment':
        return { label: 'Ajuste', color: 'bg-orange-500/10 text-orange-500 border-orange-200' }
      default:
        return { label: type, color: 'bg-gray-500/10 text-gray-500 border-gray-200' }
    }
  }

  return (
    <div className="space-y-4 mt-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Histórico de Estoque</h3>
      </div>

      <div className="border rounded-md overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead>Responsável / Cliente</TableHead>
                <TableHead>Observação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : movements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Nenhum movimento registrado.
                  </TableCell>
                </TableRow>
              ) : (
                movements.map((m) => {
                  const typeInfo = getTypeInfo(m.type)
                  const isPositive = m.quantity > 0

                  return (
                    <TableRow key={m.id}>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(m.created), 'dd/MM/yyyy HH:mm')}
                      </TableCell>
                      <TableCell className="font-medium">
                        {m.expand?.product_id?.name || 'Produto Removido'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={typeInfo.color}>
                          {typeInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`text-right font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}
                      >
                        {isPositive ? '+' : ''}
                        {m.quantity}
                      </TableCell>
                      <TableCell>
                        {m.expand?.barber_id?.name || m.expand?.client_id?.name || '-'}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-muted-foreground">
                        {m.description || '-'}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
