import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Trash2, Edit, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/hooks/use-auth'
import { useRealtime } from '@/hooks/use-realtime'
import pb from '@/lib/pocketbase/client'

export default function UsersPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const isAdmin =
    user?.access_level === 'Admin' || user?.email === 'reginaldo.segundo@planagroup.com.br'

  const [users, setUsers] = useState<any[]>([])
  const [rolePerms, setRolePerms] = useState<any>({
    Admin: ['*'],
    Socio: ['agenda', 'clientes', 'checkout'],
    Autonomo: ['agenda'],
  })
  const [rolePermsId, setRolePermsId] = useState<string | null>(null)

  const [isUserOpen, setIsUserOpen] = useState(false)
  const [editingUserId, setEditingUserId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    whatsapp: '',
    phone: '',
    address: '',
    password: '',
    access_level: 'Autonomo',
  })

  const [specialties, setSpecialties] = useState<string[]>([])
  const [newSpec, setNewSpec] = useState('')

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

  const loadData = async () => {
    try {
      const list = await pb.collection('users').getFullList({ sort: '-created' })
      setUsers(list)

      const perms = await pb
        .collection('settings')
        .getFullList({ filter: 'key="role_permissions"' })
      if (perms.length > 0) {
        setRolePermsId(perms[0].id)
        setRolePerms(perms[0].value)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (isAdmin) {
      loadData()
    }
  }, [isAdmin])

  useRealtime('users', () => {
    if (isAdmin) loadData()
  })

  if (!isAdmin) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Acesso Restrito a Administradores.
      </div>
    )
  }

  const handleOpenUser = (u?: any) => {
    if (u) {
      setFormData({
        name: u.name || '',
        surname: u.surname || '',
        email: u.email || '',
        whatsapp: u.whatsapp || '',
        phone: u.phone || '',
        address: u.address || '',
        password: '',
        access_level: u.access_level || 'Autonomo',
      })
      setSpecialties(
        u.specialties
          ? u.specialties.includes('[')
            ? JSON.parse(u.specialties)
            : u.specialties.split('\n').filter(Boolean)
          : [],
      )
      setEditingUserId(u.id)
    } else {
      setFormData({
        name: '',
        surname: '',
        email: '',
        whatsapp: '',
        phone: '',
        address: '',
        password: '',
        access_level: 'Autonomo',
      })
      setSpecialties([])
      setEditingUserId(null)
    }
    setIsUserOpen(true)
  }

  const handleSaveUser = async () => {
    if (!editingUserId && !passwordRegex.test(formData.password)) {
      toast({
        title: 'Senha inválida',
        description: 'Mínimo 8 caracteres, letras, números e um caractere especial.',
        variant: 'destructive',
      })
      return
    }
    if (editingUserId && formData.password && !passwordRegex.test(formData.password)) {
      toast({
        title: 'Senha inválida',
        description: 'Mínimo 8 caracteres, letras, números e um caractere especial.',
        variant: 'destructive',
      })
      return
    }

    try {
      const payload: any = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        whatsapp: formData.whatsapp,
        phone: formData.phone,
        address: formData.address,
        access_level: formData.access_level,
        specialties: JSON.stringify(specialties),
      }

      if (formData.password) {
        payload.password = formData.password
        payload.passwordConfirm = formData.password
      }

      if (editingUserId) {
        await pb.collection('users').update(editingUserId, payload)
        toast({ title: 'Usuário atualizado!' })
      } else {
        await pb.collection('users').create(payload)
        toast({ title: 'Usuário criado!' })
      }
      setIsUserOpen(false)
      loadData()
    } catch (err: any) {
      toast({ title: 'Erro ao salvar', description: err.message, variant: 'destructive' })
    }
  }

  const handleDeleteUser = async (id: string) => {
    if (confirm('Tem certeza que deseja remover este usuário?')) {
      try {
        await pb.collection('users').delete(id)
        toast({ title: 'Usuário removido' })
        loadData()
      } catch (err) {
        toast({ title: 'Erro ao remover', variant: 'destructive' })
      }
    }
  }

  const addSpecialty = () => {
    if (newSpec.trim() && !specialties.includes(newSpec.trim())) {
      setSpecialties([...specialties, newSpec.trim()])
      setNewSpec('')
    }
  }

  const permissionGroups = [
    {
      title: 'Módulos Principais',
      items: [
        { id: 'dashboard', label: 'Dashboard (Acesso Geral)' },
        { id: 'agenda', label: 'Agenda' },
        { id: 'clientes', label: 'Clientes' },
        { id: 'estoque', label: 'Serviços & Pacotes' },
        { id: 'produtos', label: 'Produtos e Categorias' },
        { id: 'staff_view', label: 'Equipes e Comissões (Visualização)' },
        { id: 'staff_edit', label: 'Equipes e Comissões (Edição)' },
        { id: 'checkout', label: 'Checkout (POS)' },
        { id: 'financeiro', label: 'Financeiro' },
        { id: 'action_delete', label: 'Ação: Excluir Registros' },
        { id: 'action_reports', label: 'Ação: Visualizar Relatórios' },
      ],
    },
    {
      title: 'Dashboard - Abas',
      items: [
        { id: 'dash_tab_overview', label: 'Aba: Visão Geral' },
        { id: 'dash_tab_financial', label: 'Aba: Financeiro' },
        { id: 'dash_tab_packages', label: 'Aba: Pacotes Ativos' },
      ],
    },
    {
      title: 'Dashboard - Blocos (Visão Geral)',
      items: [
        { id: 'dash_block_revenue', label: 'Bloco: Faturamento' },
        { id: 'dash_block_clients', label: 'Bloco: Clientes Atendidos' },
        { id: 'dash_block_new_clients', label: 'Bloco: Novos Clientes' },
        { id: 'dash_block_ticket_serv', label: 'Bloco: Ticket Médio - Serviços' },
        { id: 'dash_block_ticket_prod', label: 'Bloco: Ticket Médio - Produtos' },
        { id: 'dash_block_peak', label: 'Gráfico: Horários de Pico' },
        { id: 'dash_block_history', label: 'Gráfico: Histórico de Vendas' },
        { id: 'dash_block_top_sellers', label: 'Tabela: Itens Mais Vendidos' },
        { id: 'dash_block_forecast', label: 'Bloco: Previsão de Recebimento' },
        { id: 'dash_block_alerts', label: 'Bloco: Alertas' },
      ],
    },
  ]

  const toggleModule = async (role: string, modId: string, checked: boolean) => {
    const current = rolePerms[role] || []
    let updated = []
    if (checked) {
      updated = [...current, modId]
    } else {
      updated = current.filter((m: string) => m !== modId)
    }

    const newPerms = { ...rolePerms, [role]: updated }
    setRolePerms(newPerms)

    try {
      if (rolePermsId) {
        await pb.collection('settings').update(rolePermsId, { value: newPerms })
      } else {
        const r = await pb
          .collection('settings')
          .create({ key: 'role_permissions', value: newPerms })
        setRolePermsId(r.id)
      }
      toast({ title: 'Permissões atualizadas' })
    } catch {
      /* intentionally ignored */
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Usuários e Acessos</h2>
        <p className="text-muted-foreground">Gerencie a equipe, perfis de acesso e permissões.</p>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="permissions">Acessos por Perfil</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => handleOpenUser()}>
              <Plus className="size-4 mr-2" /> Novo Usuário
            </Button>
          </div>
          <Card className="border-border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Perfil</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">
                      {u.name} {u.surname}
                    </TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          u.access_level === 'Admin'
                            ? 'destructive'
                            : u.access_level === 'Socio'
                              ? 'default'
                              : 'secondary'
                        }
                      >
                        {u.access_level}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenUser(u)}>
                        <Edit className="size-4" />
                      </Button>
                      {u.id !== user?.id && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteUser(u.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle>Controle de Acesso</CardTitle>
              <CardDescription>
                Defina quais módulos cada perfil pode acessar. (Admin tem acesso total sempre)
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              {permissionGroups.map((group) => (
                <div key={group.title} className="mb-6 px-6">
                  <h4 className="font-semibold text-sm bg-muted p-2 rounded-md mb-2">
                    {group.title}
                  </h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Permissão</TableHead>
                        <TableHead className="text-center w-24">Sócio</TableHead>
                        <TableHead className="text-center w-24">Autônomo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.items.map((mod) => (
                        <TableRow key={mod.id}>
                          <TableCell className="text-sm">{mod.label}</TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={
                                rolePerms['Socio']?.includes(mod.id) ||
                                rolePerms['Socio']?.includes('*')
                              }
                              onCheckedChange={(c) => toggleModule('Socio', mod.id, !!c)}
                            />
                          </TableCell>
                          <TableCell className="text-center">
                            <Checkbox
                              checked={
                                rolePerms['Autonomo']?.includes(mod.id) ||
                                rolePerms['Autonomo']?.includes('*')
                              }
                              onCheckedChange={(c) => toggleModule('Autonomo', mod.id, !!c)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isUserOpen} onOpenChange={setIsUserOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingUserId ? 'Editar Usuário' : 'Novo Usuário'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Sobrenome *</Label>
              <Input
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Perfil de Acesso *</Label>
              <Select
                value={formData.access_level}
                onValueChange={(v) => setFormData({ ...formData, access_level: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Socio">Sócio</SelectItem>
                  <SelectItem value="Autonomo">Autônomo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>WhatsApp</Label>
              <Input
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="(00) 00000-0000"
              />
            </div>
            <div className="space-y-2">
              <Label>Telefone Secundário</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Endereço</Label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>
                {editingUserId ? 'Nova Senha (deixe em branco para não alterar)' : 'Senha *'}
              </Label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Mínimo 8 caracteres, com letras, números e símbolos (@$!%*#?&)"
              />
              <p className="text-xs text-muted-foreground">
                A senha deve conter pelo menos 8 caracteres, misturando letras, números e um
                caractere especial.
              </p>
            </div>

            <div className="space-y-2 md:col-span-2 border-t pt-4 mt-2">
              <Label>Especialidades</Label>
              <div className="flex gap-2">
                <Input
                  value={newSpec}
                  onChange={(e) => setNewSpec(e.target.value)}
                  placeholder="Ex: Corte Degradê"
                  onKeyDown={(e) => e.key === 'Enter' && addSpecialty()}
                />
                <Button type="button" onClick={addSpecialty} variant="secondary">
                  Adicionar
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {specialties.map((spec, i) => (
                  <Badge key={i} variant="secondary" className="flex items-center gap-1">
                    {spec}
                    <X
                      className="size-3 cursor-pointer hover:text-destructive"
                      onClick={() => setSpecialties(specialties.filter((_, idx) => idx !== i))}
                    />
                  </Badge>
                ))}
                {specialties.length === 0 && (
                  <span className="text-xs text-muted-foreground">
                    Nenhuma especialidade cadastrada.
                  </span>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveUser} className="w-full sm:w-auto">
              Salvar Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
