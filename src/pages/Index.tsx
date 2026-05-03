import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BadgeDollarSign, Users, TrendingUp, Clock, CalendarDays } from 'lucide-react'
import { getAppointments, getClients } from '@/services/api'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { format, startOfWeek, startOfMonth } from 'date-fns'

export default function Index() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [period, setPeriod] = useState('week')

  useEffect(() => {
    const fetchData = async () => {
      let aptFilter = ''
      let cltFilter = ''
      const now = new Date()

      if (period === 'week') {
        const start = startOfWeek(now, { weekStartsOn: 1 })
        const dateStr = format(start, 'yyyy-MM-dd 00:00:00')
        aptFilter = `date >= "${dateStr}"`
        cltFilter = `created >= "${dateStr}"`
      } else if (period === 'month') {
        const start = startOfMonth(now)
        const dateStr = format(start, 'yyyy-MM-dd 00:00:00')
        aptFilter = `date >= "${dateStr}"`
        cltFilter = `created >= "${dateStr}"`
      }

      try {
        const apts = await getAppointments(aptFilter)
        setAppointments(apts)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }

      try {
        const clts = await getClients(cltFilter)
        setClients(clts)
      } catch (error) {
        console.error('Error fetching clients:', error)
      }
    }

    fetchData()
  }, [period])

  // KPI Calculations
  const completedApts = appointments.filter((a) => a.status === 'Concluído')
  const totalRevenue = completedApts.reduce(
    (acc, curr) => acc + (curr.price || curr.expand?.service_id?.price || 0),
    0,
  )
  const newClients = clients.length

  return (
    <div className="space-y-6 pb-20 md:pb-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight text-gradient">Seu Dashboard</h2>
          <p className="text-sm text-muted-foreground">Monitoramento diário e desempenho.</p>
        </div>
        <Tabs value={period} onValueChange={setPeriod} className="w-full sm:w-auto">
          <TabsList className="bg-card border border-white/5">
            <TabsTrigger value="week">Semana</TabsTrigger>
            <TabsTrigger value="month">Mês</TabsTrigger>
            <TabsTrigger value="all">Sempre</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="bg-glass glow-card border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Faturamento Total
            </CardTitle>
            <BadgeDollarSign className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl md:text-3xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-emerald-500 mt-1">+12% vs anterior</p>
          </CardContent>
        </Card>

        <Card className="bg-glass border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Novos Clientes
            </CardTitle>
            <Users className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl md:text-3xl font-bold">{newClients}</div>
            <p className="text-xs text-muted-foreground mt-1">Taxa de retorno: 85%</p>
          </CardContent>
        </Card>

        <Card className="bg-glass border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Serviço Top 1
            </CardTitle>
            <TrendingUp className="size-4 text-amber-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-lg md:text-xl font-bold truncate">Corte + Barba</div>
            <p className="text-xs text-muted-foreground mt-1">32 realizados</p>
          </CardContent>
        </Card>

        <Card className="bg-glass border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4 space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Pico de Movimento
            </CardTitle>
            <Clock className="size-4 text-primary" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-lg md:text-xl font-bold">14h - 17h</div>
            <p className="text-xs text-muted-foreground mt-1">Sextas e Sábados</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Card className="bg-glass border-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
              Profissional Destaque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                🥇
              </div>
              <div>
                <p className="font-bold text-lg">Carlos</p>
                <p className="text-sm text-muted-foreground">15 agendamentos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-glass border-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
              Agenda de Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-3">
              <CalendarDays className="size-5 text-blue-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">8 agendamentos pendentes</p>
                <p className="text-xs text-muted-foreground">Próximo: 14:00 com João Silva</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
