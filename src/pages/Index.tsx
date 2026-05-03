import { KpiCards } from '@/components/dashboard/KpiCards'
import { PerformanceChart } from '@/components/dashboard/PerformanceChart'
import { AgendaPreview } from '@/components/dashboard/AgendaPreview'
import { Button } from '@/components/ui/button'
import { PlusCircle, ShoppingCart, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Resumo da sua barbearia hoje.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="secondary" className="flex-1 sm:flex-none gap-2" asChild>
            <Link to="/clientes">
              <UserPlus className="size-4" /> Cliente
            </Link>
          </Button>
          <Button className="flex-1 sm:flex-none gap-2" asChild>
            <Link to="/checkout">
              <ShoppingCart className="size-4" /> Venda Rápida
            </Link>
          </Button>
        </div>
      </div>

      <KpiCards />

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <PerformanceChart />
        <AgendaPreview />
      </div>
    </div>
  )
}
