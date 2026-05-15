import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { extractFieldErrors } from '@/lib/pocketbase/errors'
import pb from '@/lib/pocketbase/client'
import { toast } from 'sonner'
import { Loader2, Plus, Edit2, Trash2, Mail } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    oldPassword: '',
    password: '',
    passwordConfirm: '',
    access_level: 'Autonomo',
    plan: 'Free',
  })
  const [originalEmail, setOriginalEmail] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const { user: currentUser } = useAuth()

  const loadUsers = async () => {
    try {
      setLoading(true)
      const res = await pb.collection('users').getFullList({ sort: '-created' })
      setUsers(res)
    } catch (err) {
      toast.error('Erro ao carregar usuários')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleSave = async () => {
    setFieldErrors({})

    if (formData.password && formData.password !== formData.passwordConfirm) {
      setFieldErrors({ passwordConfirm: 'As senhas não coincidem.' })
      return
    }

    try {
      setSaving(true)
      if (formData.id) {
        const data: any = {
          name: formData.name,
          access_level: formData.access_level,
          plan: formData.plan,
        }

        let needsOldPassword = false

        if (formData.email !== originalEmail) {
          data.email = formData.email
          needsOldPassword = true
        }

        if (formData.password) {
          data.password = formData.password
          data.passwordConfirm = formData.passwordConfirm
          needsOldPassword = true
        }

        if (needsOldPassword) {
          if (!formData.oldPassword) {
            setFieldErrors({
              oldPassword: 'Senha atual é obrigatória para alterar email ou senha.',
            })
            setSaving(false)
            return
          }
          data.oldPassword = formData.oldPassword
        }

        await pb.collection('users').update(formData.id, data)
        toast.success('Usuário atualizado com sucesso')
      } else {
        const createData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          passwordConfirm: formData.passwordConfirm,
          access_level: formData.access_level,
          plan: formData.plan,
        }
        await pb.collection('users').create(createData)
        toast.success('Usuário criado com sucesso')
      }
      setModalOpen(false)
      loadUsers()
    } catch (err: any) {
      const errs = extractFieldErrors(err)
      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs)
        toast.error('Verifique os erros nos campos do formulário.')
      } else {
        toast.error(
          'Erro ao salvar usuário. Verifique se as senhas coincidem e se o email já está em uso.',
        )
      }
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir este usuário? Esta ação é irreversível.')) return
    try {
      await pb.collection('users').delete(id)
      toast.success('Excluído com sucesso')
      loadUsers()
    } catch (err) {
      toast.error('Erro ao excluir')
    }
  }

  const openNew = () => {
    setOriginalEmail('')
    setFieldErrors({})
    setFormData({
      id: '',
      name: '',
      email: '',
      oldPassword: '',
      password: '',
      passwordConfirm: '',
      access_level: 'Autonomo',
      plan: 'Free',
    })
    setModalOpen(true)
  }

  const openEdit = (u: any) => {
    setOriginalEmail(u.email || '')
    setFieldErrors({})
    setFormData({
      id: u.id,
      name: u.name || '',
      email: u.email || '',
      oldPassword: '',
      password: '',
      passwordConfirm: '',
      access_level: u.access_level || 'Autonomo',
      plan: u.plan || 'Free',
    })
    setModalOpen(true)
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Usuários e Acessos</h2>
          <p className="text-muted-foreground text-sm">Gerencie quem tem acesso ao sistema</p>
        </div>
        <Button onClick={openNew} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Novo Usuário
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto w-full">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name || 'Sem nome'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="truncate max-w-[150px] sm:max-w-xs">
                            {u.email || (
                              <span className="text-muted-foreground italic">Oculto</span>
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{u.access_level || 'Autonomo'}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{u.plan || 'Free'}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(u)}
                            title="Editar"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(u.id)}
                            disabled={u.id === currentUser?.id}
                            title="Excluir"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                {!loading && users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="w-[95vw] max-w-lg">
          <DialogHeader>
            <DialogTitle>{formData.id ? 'Editar' : 'Novo'} Usuário</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nome completo"
              />
              {fieldErrors.name && <p className="text-sm text-destructive">{fieldErrors.name}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="exemplo@email.com"
              />
              {fieldErrors.email && <p className="text-sm text-destructive">{fieldErrors.email}</p>}
            </div>

            {formData.id && (formData.email !== originalEmail || formData.password) && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Senha Atual (obrigatória para alterar email ou senha)
                </label>
                <Input
                  type="password"
                  value={formData.oldPassword}
                  onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                  placeholder="Digite a senha atual"
                />
                {fieldErrors.oldPassword && (
                  <p className="text-sm text-destructive">{fieldErrors.oldPassword}</p>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Senha {formData.id && '(Opcional)'}</label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Mínimo 8 caracteres"
                />
                {fieldErrors.password && (
                  <p className="text-sm text-destructive">{fieldErrors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirmar Senha</label>
                <Input
                  type="password"
                  value={formData.passwordConfirm}
                  onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                  placeholder="Repita a senha"
                />
                {fieldErrors.passwordConfirm && (
                  <p className="text-sm text-destructive">{fieldErrors.passwordConfirm}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nível de Acesso</label>
                <Select
                  value={formData.access_level}
                  onValueChange={(v) => setFormData({ ...formData, access_level: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Socio">Socio</SelectItem>
                    <SelectItem value="Autonomo">Autonomo</SelectItem>
                  </SelectContent>
                </Select>
                {fieldErrors.access_level && (
                  <p className="text-sm text-destructive">{fieldErrors.access_level}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Plano</label>
                <Select
                  value={formData.plan}
                  onValueChange={(v) => setFormData({ ...formData, plan: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Free">Free</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Pro">Pro</SelectItem>
                    <SelectItem value="Platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
                {fieldErrors.plan && <p className="text-sm text-destructive">{fieldErrors.plan}</p>}
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0 mt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null} Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
