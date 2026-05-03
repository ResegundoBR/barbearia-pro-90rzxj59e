import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import useMainStore from '@/stores/main'
import { hasFeature, SubscriptionTier } from '@/lib/tiers'

interface FeatureGuardProps {
  requiredTier: SubscriptionTier
  children: React.ReactNode
  fallbackMessage?: string
  overlay?: boolean
}

export function FeatureGuard({
  requiredTier,
  children,
  fallbackMessage,
  overlay = false,
}: FeatureGuardProps) {
  const { state } = useMainStore()
  const isAllowed = hasFeature(state.tier, requiredTier)

  if (isAllowed) return <>{children}</>

  if (overlay) {
    return (
      <div className="relative group w-full h-full rounded-xl overflow-hidden">
        <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center border rounded-xl">
          <div className="bg-background/95 p-5 rounded-xl shadow-lg border flex flex-col items-center max-w-[280px]">
            <Lock className="size-8 mb-3 text-muted-foreground" />
            <h3 className="font-semibold text-base mb-1">Recurso {requiredTier}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {fallbackMessage || `Faça upgrade para acessar.`}
            </p>
            <Button className="w-full font-medium min-h-[44px]">Fazer Upgrade</Button>
          </div>
        </div>
        <div className="opacity-30 pointer-events-none select-none w-full h-full">{children}</div>
      </div>
    )
  }

  return (
    <Card className="w-full flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center bg-muted/10 border-dashed">
      <CardContent className="pt-6 flex flex-col items-center">
        <div className="p-4 bg-muted/30 rounded-full mb-4">
          <Lock className="size-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold mb-2">Acesso Restrito</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          {fallbackMessage || `Este recurso requer o plano ${requiredTier} ou superior.`}
        </p>
        <Button className="font-semibold min-h-[44px] w-full sm:w-auto">
          Conheça o plano {requiredTier}
        </Button>
      </CardContent>
    </Card>
  )
}
