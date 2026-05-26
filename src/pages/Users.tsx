import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Pencil } from 'lucide-react'
import pb from '@/lib/pocketbase/client'
import { extractFieldErrors } from '@/lib/pocketbase/errors'

interface User {
  id: string
  name: string
  email: string
  access_level: string
  organization_id: string
  is_active?: boolean
}

export default function UsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const [editOpen, setEditOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [formData, setFormData] = useState<Partial<User>>({})

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const records = await pb.collection('users').getFullList<User>({
        sort: 'name',
      })
      setUsers(records)
    } catch (error) {
      console.error(error)
      toast({ title: 'Erro ao carregar usuários', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleToggleActive = async (user: User, checked: boolean) => {
    try {
      await pb.collection('users').update(user.id, { is_active: checked })
      setUsers(users.map((u) => (u.id === user.id ? { ...u, is_active: checked } : u)))
      toast({ title: `Usuário ${checked ? 'ativado' : 'desativado'} com sucesso` })
    } catch (error) {
      console.error(error)
      toast({ title: 'Erro ao alterar status', variant: 'destructive' })
    }
  }

  const openEdit = (user: User) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      access_level: user.access_level,
    })
    setEditOpen(true)
  }

  const handleSave = async () => {
    if (!selectedUser) return
    try {
      await pb.collection('users').update(selectedUser.id, formData)
      toast({ title: 'Usuário atualizado com sucesso' })
      setEditOpen(false)
      fetchUsers()
    } catch (error: any) {
      console.error(error)
      const errors = extractFieldErrors(error)
      toast({
        title: 'Erro ao salvar',
        description: Object.values(errors).join(', ') || 'Verifique os dados e tente novamente',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Usuários</h1>
          <p className="text-muted-foreground">Gerencie o acesso e permissões da sua equipe.</p>
        </div>
      </div>

      <Card className="bg-card border-border shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-border">
                <TableHead className="w-[300px]">Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Nível de Acesso</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    Carregando usuários...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    Nenhum usuário encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} className="border-border hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground">
                      {user.name || 'Sem nome'}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20 font-medium"
                      >
                        {user.access_level || 'Padrão'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={user.is_active ?? true}
                          onCheckedChange={(checked) => handleToggleActive(user, checked)}
                          className="data-[state=checked]:bg-primary"
                        />
                        <span className="text-sm font-medium text-muted-foreground">
                          {(user.is_active ?? true) ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(user)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-card border-border sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-primary">Editar Usuário</DialogTitle>
            <DialogDescription>
              Altere as informações cadastrais e permissões do usuário.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="access_level">Nível de Acesso</Label>
              <Select
                value={formData.access_level || ''}
                onValueChange={(val) => setFormData({ ...formData, access_level: val })}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="Admin">Administrador</SelectItem>
                  <SelectItem value="Socio">Sócio</SelectItem>
                  <SelectItem value="Autonomo">Autônomo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} className="border-border">
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
