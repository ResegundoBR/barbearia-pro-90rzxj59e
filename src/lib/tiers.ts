export type SubscriptionTier = 'Free' | 'Basic' | 'Pro' | 'Platinum'

export const TIER_LIMITS: Record<SubscriptionTier, { barbers: number; clients: number }> = {
  Free: { barbers: 1, clients: 10 },
  Basic: { barbers: 3, clients: Infinity },
  Pro: { barbers: 7, clients: Infinity },
  Platinum: { barbers: Infinity, clients: Infinity },
}

export function hasFeature(currentTier: SubscriptionTier, requiredTier: SubscriptionTier) {
  const tiers: SubscriptionTier[] = ['Free', 'Basic', 'Pro', 'Platinum']
  return tiers.indexOf(currentTier) >= tiers.indexOf(requiredTier)
}
