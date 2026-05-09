import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/hooks/use-auth'

const defaultPerms = {
  Admin: ['*'],
  Socio: ['agenda', 'clientes', 'checkout'],
  Autonomo: ['agenda'],
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
    user?.access_level === 'Admin' || user?.email === 'reginaldo.segundo@planagroup.com.br'

  const hasAccess = (module: string) =>
    isAdmin || allowedModules.includes('*') || allowedModules.includes(module)

  return { hasAccess, rolePerms, isAdmin }
}
