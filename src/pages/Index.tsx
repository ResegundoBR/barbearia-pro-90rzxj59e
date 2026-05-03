import { KpiCards } from '@/components/dashboard/KpiCards'
import { PerformanceChart } from '@/components/dashboard/PerformanceChart'
import { AgendaPreview } from '@/components/dashboard/AgendaPreview'
import { Button } from '@/components/ui/button'
import { ShoppingCart, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FeatureGuard } from '@/components/FeatureGuard'

export default function Index() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Resumo da sua barbearia hoje.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="secondary" className="flex-1 sm:flex-none gap-2 min-h-[44px]" asChild>
            <Link to="/clientes">
              <UserPlus className="size-4" /> Cliente
            </Link>
          </Button>
          <Button className="flex-1 sm:flex-none gap-2 min-h-[44px]" asChild>
            <Link to="/checkout">
              <ShoppingCart className="size-4" /> Venda Rápida
            </Link>
          </Button>
        </div>
      </div>

      <FeatureGuard
        requiredTier="Pro"
        overlay
        fallbackMessage="Resumo de KPI disponível no plano Pro."
      >
        <KpiCards />
      </FeatureGuard>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <FeatureGuard
          requiredTier="Platinum"
          overlay
          fallbackMessage="Desempenho detalhado exclusivo no plano Platinum."
        >
          <PerformanceChart />
        </FeatureGuard>

        <FeatureGuard
          requiredTier="Pro"
          overlay
          fallbackMessage="Visão da agenda disponível no plano Pro."
        >
          <AgendaPreview />
        </FeatureGuard>
      </div>
    </div>
  )
}
