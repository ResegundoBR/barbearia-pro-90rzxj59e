import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Activity, Clock, DollarSign, Calendar as CalendarIcon } from 'lucide-react'
import pb from '@/lib/pocketbase/client'

interface DashboardData {
  period: string
  revenue: number
  appointmentsCount: number
  efficiency: {
    capacityHours: number
    occupiedHours: number
    idleHours: number
    percentage: number
  }
}

export default function Index() {
  const [period, setPeriod] = useState('semana')
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboard() {
      setLoading(true)
      try {
        const result = await pb.send(`/backend/v1/dashboard?period=${period}`, { method: 'GET' })
        setData(result as DashboardData)
      } catch (error) {
        console.error('Failed to fetch dashboard data', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDashboard()
  }, [period])

  return (
    <div className="container mx-auto py-8 px-4 text-slate-100 max-w-7xl animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-slate-400 text-sm">
            Visão geral do desempenho e eficiência da sua barbearia.
          </p>
        </div>
        <div className="w-full md:w-56">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100 h-11">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700 text-slate-100">
              <SelectItem value="hoje">Hoje</SelectItem>
              <SelectItem value="semana">Nesta Semana</SelectItem>
              <SelectItem value="mes">Neste Mês</SelectItem>
              <SelectItem value="ano">Neste Ano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500"></div>
        </div>
      ) : data ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-900 border-slate-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  Faturamento Total
                </CardTitle>
                <DollarSign className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                    data.revenue,
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">Bruto no período selecionado</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  Atendimentos Concluídos
                </CardTitle>
                <CalendarIcon className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100">{data.appointmentsCount}</div>
                <p className="text-xs text-slate-500 mt-1">Serviços prestados</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  Eficiência da Equipe
                </CardTitle>
                <Activity className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100">
                  {data.efficiency.percentage}%
                </div>
                <p className="text-xs text-slate-500 mt-1">Ocupação da capacidade total</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Ociosidade</CardTitle>
                <Clock className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-100">
                  {data.efficiency.idleHours}h
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  De {data.efficiency.capacityHours}h totais disponíveis
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Resumo Operacional</h2>
            <div className="text-slate-400 text-sm py-12 text-center border-2 border-dashed border-slate-800 rounded-lg bg-slate-900/50">
              O painel de detalhamento de gráficos está sendo processado em background. <br />
              Acompanhe as métricas globais acima para tomada de decisão em tempo real.
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-slate-400 py-12 bg-slate-900 border border-slate-800 rounded-xl">
          Nenhum dado disponível.
        </div>
      )}
    </div>
  )
}
