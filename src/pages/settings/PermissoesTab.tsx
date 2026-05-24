import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import pb from '@/lib/pocketbase/client'
import { toast } from 'sonner'

export function PermissoesTab() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    pb.collection('users')
      .getFullList({ sort: '-created' })
      .then(setUsers)
      .finally(() => setLoading(false))
  }, [])

  const handleChange = async (id: string, val: string) => {
    try {
      await pb.collection('users').update(id, { access_level: val })
      setUsers((u) => u.map((x) => (x.id === id ? { ...x, access_level: val } : x)))
      toast.success('Nível de acesso atualizado com sucesso.')
    } catch {
      toast.error('Erro ao atualizar permissão.')
    }
  }

  if (loading)
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Carregando...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permissões de Usuários</CardTitle>
        <CardDescription>Gerencie o nível de acesso de cada usuário do sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Nível de Acesso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      <Avatar className="h-8 w-8">
                        {u.avatar && <AvatarImage src={pb.files.getUrl(u, u.avatar)} />}
                        <AvatarFallback>
                          {u.name?.charAt(0) || u.email?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{u.name || 'Sem nome'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{u.email}</TableCell>
                  <TableCell>
                    <Select
                      value={u.access_level || 'Autonomo'}
                      onValueChange={(v) => handleChange(u.id, v)}
                    >
                      <SelectTrigger className="w-[160px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Administrador</SelectItem>
                        <SelectItem value="Socio">Sócio</SelectItem>
                        <SelectItem value="Autonomo">Autônomo</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
