import { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, DollarSign, Scissors, TrendingUp, Users } from 'lucide-react'
import pb from '@/lib/pocketbase/client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { useAuth } from '@/hooks/use-auth'

export default function Index() {
  const { user } = useAuth()
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  })
  const [barberId, setBarberId] = useState<string>('all')
  const [status, setStatus] = useState<string>('all')

  const [barbers, setBarbers] = useState<any[]>([])
  const [stats, setStats] = useState({ revenue: 0, appointments: 0, clients: 0, avgTicket: 0 })
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    pb.collection('barbers')
      .getFullList({ sort: 'name' })
      .then((res) => setBarbers(res))
      .catch(console.error)
  }, [])

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true)
      try {
        const fromStr = dateRange.from.toISOString().split('T')[0] + ' 00:00:00.000Z'
        const toStr = dateRange.to.toISOString().split('T')[0] + ' 23:59:59.999Z'

        let filter = `created >= "${fromStr}" && created <= "${toStr}"`
        if (barberId !== 'all') filter += ` && barber_id = "${barberId}"`

        const checkouts = await pb.collection('checkouts').getFullList({ filter })
        const totalRevenue = checkouts.reduce((sum, c) => sum + c.total_amount, 0)

        let appFilter = `date >= "${fromStr}" && date <= "${toStr}"`
        if (barberId !== 'all') appFilter += ` && barber_id = "${barberId}"`
        if (status !== 'all') appFilter += ` && status = "${status}"`

        const appointmentsList = await pb
          .collection('appointments')
          .getFullList({ filter: appFilter })
        const uniqueClients = new Set(checkouts.map((c) => c.client_id)).size

        setStats({
          revenue: totalRevenue,
          appointments: appointmentsList.length,
          clients: uniqueClients,
          avgTicket: appointmentsList.length > 0 ? totalRevenue / appointmentsList.length : 0,
        })

        const dailyData: Record<string, number> = {}
        checkouts.forEach((c) => {
          const day = c.created.split(' ')[0]
          dailyData[day] = (dailyData[day] || 0) + c.total_amount
        })

        const cData = Object.keys(dailyData)
          .sort()
          .map((date) => ({
            date: format(new Date(date), 'dd/MM'),
            receita: dailyData[date],
          }))
        setChartData(cData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [dateRange, barberId, status])

  const chartConfig = {
    receita: {
      label: 'Receita',
      color: 'hsl(var(--primary))',
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do seu negócio e indicadores.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal bg-card border-border shadow-sm"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "dd 'de' MMM", { locale: ptBR })} -{' '}
                      {format(dateRange.to, "dd 'de' MMM", { locale: ptBR })}
                    </>
                  ) : (
                    format(dateRange.from, "dd 'de' MMM", { locale: ptBR })
                  )
                ) : (
                  <span>Selecione um período</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-border bg-card shadow-lg" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => {
                  if (range?.from) {
                    setDateRange({ from: range.from, to: range.to || range.from })
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Select value={barberId} onValueChange={setBarberId}>
            <SelectTrigger className="w-[180px] bg-card border-border shadow-sm">
              <SelectValue placeholder="Profissional" />
            </SelectTrigger>
            <SelectContent className="border-border bg-card">
              <SelectItem value="all">Todos os profissionais</SelectItem>
              {barbers.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[150px] bg-card border-border shadow-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="border-border bg-card">
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="agendado">Agendado</SelectItem>
              <SelectItem value="concluido">Concluído</SelectItem>
              <SelectItem value="cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Receita Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {loading
                ? '-'
                : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    stats.revenue,
                  )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Agendamentos
            </CardTitle>
            <Scissors className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {loading ? '-' : stats.appointments}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clientes Únicos
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {loading ? '-' : stats.clients}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ticket Médio
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {loading
                ? '-'
                : new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    stats.avgTicket,
                  )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border shadow-sm">
        <CardHeader>
          <CardTitle>Receita Diária</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground animate-pulse">
                Carregando gráfico...
              </div>
            ) : chartData.length > 0 ? (
              <ChartContainer config={chartConfig} className="w-full h-full min-h-[300px]">
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `R$ ${value}`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="receita" fill="var(--color-receita)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Nenhum dado financeiro no período.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
