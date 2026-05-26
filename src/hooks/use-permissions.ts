import { useState, useEffect, useCallback } from 'react'
import pb from '@/lib/pocketbase/client'
import { useAuth } from './use-auth'

export function usePermissions() {
  const { user } = useAuth()
  const [permissions, setPermissions] = useState<Record<string, boolean>>({})
  const [loadingPerms, setLoadingPerms] = useState(true)

  const fetchPermissions = useCallback(async () => {
    if (!user || user.access_level === 'Admin') {
      setLoadingPerms(false)
      return
    }

    try {
      const records = await pb.collection('role_permissions').getFullList({
        filter: `role = "${user.access_level}"`,
      })
      const permsMap: Record<string, boolean> = {}
      records.forEach((r) => {
        permsMap[r.module_name] = r.is_enabled
      })
      setPermissions(permsMap)
    } catch (error) {
      console.error('Error fetching permissions', error)
    } finally {
      setLoadingPerms(false)
    }
  }, [user])

  useEffect(() => {
    fetchPermissions()
  }, [fetchPermissions])

  const hasAccess = useCallback(
    (module: string) => {
      if (!user) return false
      if (user.access_level === 'Admin') return true

      const isSocio = user.access_level === 'Socio'
      const defaults: Record<string, boolean> = {
        dashboard: true,
        agenda: true,
        clientes: true,
        checkout: true,
        estoque: isSocio,
        produtos: isSocio,
        fornecedores: isSocio,
        staff: isSocio,
        financeiro: isSocio,
        settings: isSocio,
        users: isSocio,
      }

      return permissions[module] ?? defaults[module] ?? false
    },
    [user, permissions],
  )

  return {
    hasAccess,
    isAdmin: user?.access_level === 'Admin',
    isSocio: user?.access_level === 'Socio',
    isAutonomo: user?.access_level === 'Autonomo',
    loadingPerms,
    refetchPerms: fetchPermissions,
  }
}
