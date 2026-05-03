import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'

interface PlanGuardProps {
  requiredPlan: 'Free' | 'Basic' | 'Pro' | 'Platinum'
  children: React.ReactNode
}

export function PlanGuard({ requiredPlan, children }: PlanGuardProps) {
  const { user } = useAuth()
  const currentPlan = user?.plan || 'Free'

  const tiers = ['Free', 'Basic', 'Pro', 'Platinum']
  const isAllowed = tiers.indexOf(currentPlan) >= tiers.indexOf(requiredPlan)

  if (isAllowed) return <>{children}</>

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-6 text-center bg-muted/20 border border-dashed rounded-xl">
      <div className="p-3 bg-background rounded-full mb-3 shadow-sm border">
        <Lock className="size-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-bold mb-1">Acesso Restrito</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-xs">
        Este recurso requer o plano {requiredPlan} ou superior.
      </p>
      <Button variant="outline" size="sm" className="font-semibold">
        Fazer Upgrade
      </Button>
    </div>
  )
}
