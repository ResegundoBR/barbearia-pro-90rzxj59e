import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
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
import { ChevronDown, ChevronUp } from 'lucide-react'
import pb from '@/lib/pocketbase/client'

interface FinancialViewProps {
  commissions: any[]
  isAdmin: boolean
  onOpenAdvanceModal: () => void
}

interface TransactionGroup {
  id: string
  date: string
  created: string
  barber: any
  client: any
  type: string
  payment_method: string
  status: string
  grossAmount: number
  serviceAmount: number
  productAmount: number
  commissionAmount: number
  items: string[]
  commissions: any[]
}

export function FinancialView({ commissions, isAdmin, onOpenAdvanceModal }: FinancialViewProps) {
  const [transactions, setTransactions] = useState<TransactionGroup[]>([])
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

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

  const barberStats = commissions.reduce(
    (acc, c) => {
      const barberId = c.expand?.barber_id?.id || 'unknown'
      const barberName = c.expand?.barber_id?.name || 'Desconhecido'
      if (!acc[barberId]) {
        acc[barberId] = {
          name: barberName,
          servicesCount: 0,
          servicesTotal: 0,
          packagesCount: 0,
          packagesTotal: 0,
          productsCount: 0,
          productsTotal: 0,
          advances: 0,
          total: 0,
        }
      }
      if (c.is_advance) {
        acc[barberId].advances += c.amount
      } else {
        acc[barberId].total += c.amount
        if (c.type === 'service') {
          acc[barberId].servicesCount++
          acc[barberId].servicesTotal += c.amount
        } else if (c.type === 'product') {
          acc[barberId].productsCount++
          acc[barberId].productsTotal += c.amount
        } else {
          acc[barberId].packagesCount++
          acc[barberId].packagesTotal += c.amount
        }
      }
      return acc
    },
    {} as Record<string, any>,
  )

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        const filterStr = `updated >= "${thirtyDaysAgo.toISOString()}"`
        const filterStrCreated = `created >= "${thirtyDaysAgo.toISOString()}"`

        const [aptsRes, prodsRes, pkgsRes] = await Promise.all([
          pb.collection('appointments').getFullList({
            filter: `status = 'Concluído' && ${filterStr}`,
            expand: 'client_id,service_id,barber_id',
          }),
          pb.collection('product_purchases').getFullList({
            filter: filterStrCreated,
            expand: 'client_id,product_id,barber_id',
          }),
          pb.collection('client_packages').getFullList({
            filter: filterStrCreated,
            expand: 'client_id,package_id,barber_id',
          }),
        ])

        const groups: TransactionGroup[] = []
        const usedComms = new Set()

        for (const apt of aptsRes) {
          const aptTime = new Date(apt.updated).getTime()
          const prods = prodsRes.filter(
            (p) =>
              p.client_id === apt.client_id &&
              Math.abs(new Date(p.created).getTime() - aptTime) < 15000,
          )
          const comms = commissions.filter(
            (c) =>
              c.barber_id === apt.barber_id &&
              !c.is_advance &&
              Math.abs(new Date(c.created).getTime() - aptTime) < 15000,
          )

          comms.forEach((c) => usedComms.add(c.id))

          if (comms.length === 0 && aptTime < thirtyDaysAgo.getTime()) continue

          const serviceAmount = apt.price || 0
          const productAmount = prods.reduce((acc, p) => acc + (p.price_at_sale || 0), 0)
          const commissionAmount = comms.reduce((acc, c) => acc + (c.amount || 0), 0)
          const grossAmount = serviceAmount + productAmount

          const payment_method = comms[0]?.payment_method || '-'
          const status = comms[0]?.status || 'paid'

          const items = [apt.expand?.service_id?.name || 'Serviço']
          prods.forEach((p) => items.push(p.expand?.product_id?.name || 'Produto'))

          groups.push({
            id: apt.id,
            date: apt.updated,
            created: apt.updated,
            barber: apt.expand?.barber_id,
            client: apt.expand?.client_id,
            type: 'service_checkout',
            payment_method,
            status,
            grossAmount,
            serviceAmount,
            productAmount,
            commissionAmount,
            items,
            commissions: comms,
          })
        }

        for (const pkg of pkgsRes) {
          const pkgTime = new Date(pkg.created).getTime()
          const comms = commissions.filter(
            (c) =>
              c.barber_id === pkg.barber_id &&
              !c.is_advance &&
              Math.abs(new Date(c.created).getTime() - pkgTime) < 15000,
          )

          comms.forEach((c) => usedComms.add(c.id))

          if (comms.length === 0 && pkgTime < thirtyDaysAgo.getTime()) continue

          const serviceAmount = pkg.expand?.package_id?.price || 0
          const commissionAmount = comms.reduce((acc, c) => acc + (c.amount || 0), 0)

          const payment_method = comms[0]?.payment_method || '-'
          const status = comms[0]?.status || 'paid'

          groups.push({
            id: pkg.id,
            date: pkg.created,
            created: pkg.created,
            barber: pkg.expand?.barber_id,
            client: pkg.expand?.client_id,
            type: 'package_sale',
            payment_method,
            status,
            grossAmount: serviceAmount,
            serviceAmount,
            productAmount: 0,
            commissionAmount,
            items: [pkg.expand?.package_id?.name || 'Pacote'],
            commissions: comms,
          })
        }

        for (const comm of commissions) {
          if (usedComms.has(comm.id)) continue

          groups.push({
            id: comm.id,
            date: comm.date || comm.created,
            created: comm.created,
            barber: comm.expand?.barber_id,
            client: null,
            type: comm.is_advance ? 'advance' : 'commission_only',
            payment_method: comm.payment_method,
            status: comm.status,
            grossAmount: comm.is_advance ? -comm.amount : comm.amount,
            serviceAmount: 0,
            productAmount: 0,
            commissionAmount: comm.is_advance ? 0 : comm.amount,
            items: [
              comm.is_advance
                ? 'Adiantamento/Vale'
                : comm.type === 'service'
                  ? 'Serviço'
                  : comm.type === 'product'
                    ? 'Produto'
                    : 'Comissão',
            ],
            commissions: [comm],
          })
        }

        const sorted = groups.sort(
          (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
        )
        setTransactions(sorted.slice(0, 100))
      } catch (err) {
        console.error('Error loading transactions', err)
      }
    }

    loadTransactions()
  }, [commissions])

  const translatePayment = (method: string) => {
    if (method === 'cash') return 'Dinheiro'
    if (method === 'credito') return 'Crédito'
    if (method === 'debito') return 'Débito'
    if (method === 'pix') return 'Pix'
    if (method === 'card') return 'Cartão'
    return method
  }

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
                <TableHead className="w-10"></TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Cliente / Profissional</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valores</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <React.Fragment key={t.id}>
                  <TableRow
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleRow(t.id)}
                  >
                    <TableCell className="w-10">
                      {t.type !== 'advance' && (
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          {expandedRows[t.id] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>{format(new Date(t.date), 'dd/MM/yyyy HH:mm')}</TableCell>
                    <TableCell>
                      <div className="font-medium">{t.client?.name || 'Avulso'}</div>
                      <div className="text-xs text-muted-foreground">{t.barber?.name || '-'}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm truncate max-w-[150px]">{t.items.join(', ')}</div>
                    </TableCell>
                    <TableCell className="capitalize">
                      {translatePayment(t.payment_method)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          t.status === 'paid' || t.status === 'available' ? 'default' : 'secondary'
                        }
                      >
                        {t.status === 'available'
                          ? 'Disponível'
                          : t.status === 'pending'
                            ? 'Pendente'
                            : 'Pago'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {t.type === 'advance' ? (
                        <span className="text-red-500 font-medium">
                          - R$ {Math.abs(t.grossAmount).toFixed(2)}
                        </span>
                      ) : (
                        <div className="flex flex-col items-end">
                          <span className="text-emerald-500 font-bold">
                            R$ {t.grossAmount.toFixed(2)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Comissão: R$ {t.commissionAmount.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                  {expandedRows[t.id] && t.type !== 'advance' && (
                    <TableRow className="bg-muted/30">
                      <TableCell colSpan={7} className="p-0 border-b">
                        <div className="flex flex-wrap items-center justify-between p-4 text-sm gap-4">
                          <div className="flex flex-col">
                            <span className="text-muted-foreground text-xs">Serviços/Pacotes</span>
                            <span className="font-medium">R$ {t.serviceAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-muted-foreground text-xs">Produtos</span>
                            <span className="font-medium">R$ {t.productAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-muted-foreground text-xs">
                              Comissão Profissional
                            </span>
                            <span className="font-medium">R$ {t.commissionAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-muted-foreground text-xs">Total da Venda</span>
                            <span className="font-bold text-emerald-500">
                              R$ {t.grossAmount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
              {transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    Nenhuma transação encontrada no período.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-8 space-y-4">
        <h3 className="text-lg font-semibold uppercase">
          Comissões - {format(new Date(), 'MMMM', { locale: ptBR })}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(barberStats).map((stats: any) => (
            <Card key={stats.name} className="bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold">{stats.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serviços ({stats.servicesCount})</span>
                  <span>R$ {stats.servicesTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pacotes ({stats.packagesCount})</span>
                  <span>R$ {stats.packagesTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b pb-2 border-border/50">
                  <span className="text-muted-foreground">Produtos ({stats.productsCount})</span>
                  <span>R$ {stats.productsTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-1">
                  <span>Total</span>
                  <span>R$ {stats.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Adiantamentos</span>
                  <span>- R$ {stats.advances.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-500 pt-2 border-t border-border/50">
                  <span>A Receber</span>
                  <span>R$ {(stats.total - stats.advances).toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          {Object.keys(barberStats).length === 0 && (
            <div className="text-muted-foreground text-sm col-span-full">
              Nenhuma comissão registrada.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
