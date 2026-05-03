import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { hasFeature } from '@/lib/tiers'

interface FeatureGuardProps {
  feature: string
  children: React.ReactNode
}

export function FeatureGuard({ feature, children }: FeatureGuardProps) {
  const { user } = useAuth()
  const currentPlan = user?.plan || 'Free'

  const isAllowed = hasFeature(currentPlan, feature)

  if (isAllowed) return <>{children}</>

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-6 text-center bg-muted/20 border border-dashed rounded-xl">
      <div className="p-3 bg-background rounded-full mb-3 shadow-sm border">
        <Lock className="size-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-bold mb-1">Recurso Premium</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-xs">
        Este recurso não está disponível no seu plano atual.
      </p>
      <Button variant="outline" size="sm" className="font-semibold">
        Fazer Upgrade
      </Button>
    </div>
  )
}
