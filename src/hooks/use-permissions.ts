import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/hooks/use-auth'

const defaultPerms = {
  Admin: ['*'],
  Socio: [
    'agenda',
    'clientes',
    'checkout',
    'staff_view',
    'dash_tab_overview',
    'dash_tab_financial',
    'dash_tab_packages',
    'dash_block_revenue',
    'dash_block_clients',
    'dash_block_new_clients',
    'dash_block_ticket_serv',
    'dash_block_ticket_prod',
    'dash_block_peak',
    'dash_block_history',
    'dash_block_top_sellers',
    'dash_block_forecast',
    'dash_block_alerts',
  ],
  Autonomo: [
    'agenda',
    'dash_tab_overview',
    'dash_tab_financial',
    'dash_tab_packages',
    'dash_block_revenue',
    'dash_block_history',
    'dash_block_peak',
    'dash_block_forecast',
  ],
}

export function usePermissions() {
  const { user } = useAuth()
  const [rolePerms, setRolePerms] = useState<any>(defaultPerms)

  useEffect(() => {
    pb.collection('settings')
      .getFirstListItem('key="role_permissions"')
      .then((r) => setRolePerms(r.value))
      .catch(() => setRolePerms(defaultPerms))
  }, [])

  const allowedModules =
    rolePerms[user?.access_level || 'Autonomo'] ||
    defaultPerms[user?.access_level as keyof typeof defaultPerms] ||
    []

  const isAdmin =
    user?.access_level === 'Admin' ||
    user?.access_level === 'Socio' ||
    user?.email === 'reginaldo.segundo@planagroup.com.br'

  const hasAccess = (module: string) => {
    if (isAdmin) return true
    if (allowedModules.includes('*')) return true

    // Fallback: If checking 'staff_view', and they have 'staff', allow.
    // If checking 'staff_edit', and they have 'staff', allow.
    if (module.startsWith('staff_') && allowedModules.includes('staff')) return true
    if (module.startsWith('dash_') && allowedModules.includes('dashboard')) return true

    return allowedModules.includes(module)
  }

  return { hasAccess, rolePerms, isAdmin }
}
