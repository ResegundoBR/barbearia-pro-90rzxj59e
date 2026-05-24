import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { ShieldAlert } from 'lucide-react'

const MODULES = [
  { id: 'agenda', label: 'Agenda' },
  { id: 'financeiro', label: 'Financeiro' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'estoque', label: 'Estoque' },
  { id: 'produtos', label: 'Produtos e Serviços' },
  { id: 'fornecedores', label: 'Fornecedores' },
  { id: 'staff', label: 'Equipe / Staff' },
  { id: 'checkout', label: 'Checkout' },
  { id: 'settings', label: 'Configurações' },
  { id: 'users', label: 'Usuários' },
]

export function PermissionsModal() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState('Socio')
  const [permissions, setPermissions] = useState<Record<string, any>>({})

  const loadPerms = async () => {
    try {
      const records = await pb.collection('role_permissions').getFullList()
      const map: Record<string, any> = {}
      records.forEach((r) => {
        map[`${r.role}_${r.module_name}`] = r
      })
      setPermissions(map)
    } catch {
      /* intentionally ignored */
    }
  }

  useEffect(() => {
    if (open) loadPerms()
  }, [open])

  const togglePermission = async (module: string, currentVal: boolean) => {
    const key = `${role}_${module}`
    const existing = permissions[key]
    try {
      if (existing) {
        const updated = await pb
          .collection('role_permissions')
          .update(existing.id, { is_enabled: !currentVal })
        setPermissions((prev) => ({ ...prev, [key]: updated }))
      } else {
        const created = await pb.collection('role_permissions').create({
          role,
          module_name: module,
          is_enabled: true,
          organization_id: user?.organization_id,
        })
        setPermissions((prev) => ({ ...prev, [key]: created }))
      }
      toast.success('Permissão atualizada')
    } catch (err) {
      toast.error('Erro ao salvar permissão')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <ShieldAlert className="w-4 h-4 mr-2" />
          Configurar Permissões
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Acessos por Nível</DialogTitle>
        </DialogHeader>
        <Tabs value={role} onValueChange={setRole} className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Socio">Sócio</TabsTrigger>
            <TabsTrigger value="Autonomo">Autônomo</TabsTrigger>
          </TabsList>
          <div className="mt-6 grid gap-4">
            {MODULES.map((m) => {
              const isEnabled = permissions[`${role}_${m.id}`]?.is_enabled ?? false
              return (
                <div key={m.id} className="flex items-center justify-between border-b pb-3">
                  <span className="font-medium text-sm text-gray-700">{m.label}</span>
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={() => togglePermission(m.id, isEnabled)}
                  />
                </div>
              )
            })}
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
