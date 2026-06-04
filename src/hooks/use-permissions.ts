import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/hooks/use-auth'

const defaultPerms = {
  Admin: ['*'],
  Socio: [
    'agenda',
    'clientes',
    'checkout',
    'staff',
    'dash_tab_overview',
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
    'dash_block_revenue',
    'dash_block_history',
    'dash_block_peak',
    'dash_block_forecast',
  ],
}

let cachedPerms: any = null
let permsPromise: Promise<any> | null = null

export function usePermissions() {
  const { user } = useAuth()

  const isAdmin =
    user?.access_level === 'Admin' ||
    user?.email === 'reginaldo.segundo@planagroup.com.br' ||
    user?.email === 'alissonmayer7@gmail.com'

  const [rolePerms, setRolePerms] = useState<any>(cachedPerms || defaultPerms)
  const [loadingPerms, setLoadingPerms] = useState(!cachedPerms)

  useEffect(() => {
    if (cachedPerms) {
      setLoadingPerms(false)
      return
    }
    if (!permsPromise) {
      permsPromise = pb
        .collection('settings')
        .getFirstListItem('key="role_permissions"', { requestKey: null })
        .then((r) => {
          cachedPerms = r.value || defaultPerms
          return cachedPerms
        })
        .catch(() => {
          cachedPerms = defaultPerms
          return cachedPerms
        })
    }
    permsPromise.then((perms) => {
      setRolePerms(perms)
      setLoadingPerms(false)
    })
  }, [])

  const allowedModules =
    rolePerms[user?.access_level || 'Autonomo'] ||
    defaultPerms[user?.access_level as keyof typeof defaultPerms] ||
    []

  const hasAccess = (module: string) => {
    if (isAdmin) return true
    if (allowedModules.includes('*')) return true

    if ((module === 'settings' || module === 'users') && user?.access_level === 'Socio') return true

    if (module.startsWith('staff_') && allowedModules.includes('staff')) return true
    if (module.startsWith('dash_') && allowedModules.includes('dashboard')) return true

    return allowedModules.includes(module)
  }

  return { hasAccess, rolePerms, isAdmin, loadingPerms }
}
