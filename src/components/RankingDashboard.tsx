import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { format, startOfMonth, subDays } from 'date-fns'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { getClients, getAppointments, getProductPurchases, getClientLogs } from '@/services/api'
import { ArrowUpRight, AlertTriangle, Medal, Star } from 'lucide-react'
import { useRealtime } from '@/hooks/use-realtime'

export function RankingDashboard() {
  const [period, setPeriod] = useState('current_month')
  const [clientsData, setClientsData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [metric, setMetric] = useState('revenue')
  const [refreshKey, setRefreshKey] = useState(0)

  const reload = () => setRefreshKey((k) => k + 1)
  useRealtime('appointments', reload)
  useRealtime('product_purchases', reload)
  useRealtime('client_logs', reload)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const now = new Date()
        let startDate = startOfMonth(now)
        if (period === 'last_3_months') startDate = subDays(now, 90)
        if (period === 'last_6_months') startDate = subDays(now, 180)

        const dateStr = format(startDate, 'yyyy-MM-dd') + ' 00:00:00.000Z'
        const createdFilter = `created >= '${dateStr}'`

        const [clients, appointments, purchases, logs] = await Promise.all([
          getClients(),
          getAppointments(createdFilter),
          getProductPurchases(createdFilter),
          getClientLogs(`event_type = 'no_show' && ${createdFilter}`),
        ])

        const statsMap: Record<string, any> = {}
        clients.forEach((c: any) => {
          statsMap[c.id] = {
            client: c,
            totalSpent: 0,
            totalVisits: 0,
            noShows: 0,
          }
        })

        appointments.forEach((app: any) => {
          if (app.status === 'Concluído' && statsMap[app.client_id]) {
            statsMap[app.client_id].totalSpent += app.price || app.expand?.service_id?.price || 0
            statsMap[app.client_id].totalVisits += 1
          }
        })

        purchases.forEach((p: any) => {
          if (statsMap[p.client_id]) {
            statsMap[p.client_id].totalSpent += p.price_at_sale || 0
          }
        })

        logs.forEach((log: any) => {
          if (statsMap[log.client_id]) {
            statsMap[log.client_id].noShows += 1
          }
        })

        setClientsData(Object.values(statsMap))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [period, refreshKey])

  const topCustomers = useMemo(() => {
    const data = clientsData.filter((c) => c.totalVisits > 0 || c.totalSpent > 0)
    if (metric === 'revenue') {
      return data.sort((a, b) => b.totalSpent - a.totalSpent)
    }
    return data.sort((a, b) => b.totalVisits - a.totalVisits)
  }, [clientsData, metric])

  const noShowCustomers = useMemo(() => {
    return clientsData.filter((c) => c.noShows > 0).sort((a, b) => b.noShows - a.noShows)
  }, [clientsData])

  const maxSpent = Math.max(...clientsData.map((c) => c.totalSpent), 1)
  const maxVisits = Math.max(...clientsData.map((c) => c.totalVisits), 1)

  return (
    <div className="space-y-4">
      <Tabs defaultValue="top" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="top">Top Clientes</TabsTrigger>
            <TabsTrigger value="noshow">Análise de Faltas</TabsTrigger>
          </TabsList>

          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_month">Mês Atual</SelectItem>
              <SelectItem value="last_3_months">Últimos 3 Meses</SelectItem>
              <SelectItem value="last_6_months">Últimos 6 Meses</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="top" className="space-y-4 mt-0">
          <div className="flex justify-end">
            <ToggleGroup
              type="single"
              value={metric}
              onValueChange={(v) => {
                if (v) setMetric(v)
              }}
              className="bg-muted p-1 rounded-md border"
            >
              <ToggleGroupItem
                value="revenue"
                className="px-4 font-medium text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-background data-[state=on]:shadow-sm"
              >
                Faturamento
              </ToggleGroupItem>
              <ToggleGroupItem
                value="frequency"
                className="px-4 font-medium text-muted-foreground data-[state=on]:text-foreground data-[state=on]:bg-background data-[state=on]:shadow-sm"
              >
                Atendimento
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="text-right">Total Gasto</TableHead>
                    <TableHead className="text-center">Visitas</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        Carregando...
                      </TableCell>
                    </TableRow>
                  ) : topCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        Nenhum dado encontrado para o período.
                      </TableCell>
                    </TableRow>
                  ) : (
                    topCustomers.slice(0, 7).map((row) => (
                      <TableRow key={row.client.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <Link
                              to={`/clientes/${row.client.id}`}
                              className="font-medium hover:underline text-primary flex items-center gap-1"
                            >
                              {row.client.name || 'Cliente'} {row.client.surname || ''}{' '}
                              <ArrowUpRight className="size-3" />
                            </Link>
                            {row.client.expand?.preferred_barber_id?.name && (
                              <span className="text-xs text-muted-foreground mt-0.5">
                                Profissional: {row.client.expand.preferred_barber_id.name}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(row.totalSpent)}
                        </TableCell>
                        <TableCell className="text-center">{row.totalVisits}</TableCell>
                        <TableCell className="text-center">
                          <div className="flex justify-center gap-2">
                            {row.totalSpent >= maxSpent * 0.7 && row.totalSpent > 0 && (
                              <Badge className="bg-amber-500 hover:bg-amber-600 gap-1 text-white">
                                <Medal className="size-3" /> VIP
                              </Badge>
                            )}
                            {row.totalVisits >= maxVisits * 0.7 &&
                              row.totalVisits > 0 &&
                              row.totalSpent < maxSpent * 0.7 && (
                                <Badge variant="secondary" className="gap-1">
                                  <Star className="size-3" /> Frequente
                                </Badge>
                              )}
                            {row.noShows > 2 && <Badge variant="destructive">Risco de Fuga</Badge>}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="noshow" className="space-y-4 mt-0">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead className="text-center">Faltas</TableHead>
                    <TableHead className="text-center">Visitas Realizadas</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        Carregando...
                      </TableCell>
                    </TableRow>
                  ) : noShowCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        Nenhum no-show registrado no período.
                      </TableCell>
                    </TableRow>
                  ) : (
                    noShowCustomers.slice(0, 7).map((row) => (
                      <TableRow key={row.client.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <Link
                              to={`/clientes/${row.client.id}`}
                              className="font-medium hover:underline text-primary flex items-center gap-1"
                            >
                              {row.client.name || 'Cliente'} {row.client.surname || ''}{' '}
                              <ArrowUpRight className="size-3" />
                            </Link>
                            {row.client.expand?.preferred_barber_id?.name && (
                              <span className="text-xs text-muted-foreground mt-0.5">
                                Profissional: {row.client.expand.preferred_barber_id.name}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-bold text-destructive">
                          {row.noShows}
                        </TableCell>
                        <TableCell className="text-center">{row.totalVisits}</TableCell>
                        <TableCell className="text-center">
                          {row.noShows >= 2 ? (
                            <Badge variant="destructive" className="gap-1">
                              <AlertTriangle className="size-3" /> Atenção
                            </Badge>
                          ) : (
                            <Badge variant="outline">Monitorar</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
