import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getCollection, updateRecord } from '@/services/settings'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

export default function PermissionsTab() {
  const [users, setUsers] = useState<any[]>([])

  const load = async () => {
    try {
      const data = await getCollection('users')
      setUsers(data)
    } catch (error) {
      toast.error('Erro ao carregar usuários')
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateRecord('users', userId, { access_level: newRole })
      toast.success('Nível de acesso atualizado com sucesso')
      load()
    } catch (error) {
      toast.error('Erro ao atualizar permissão')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permissões de Usuário</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Nível de Acesso</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name || user.email}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.access_level || 'Autonomo'}
                    onValueChange={(v) => handleRoleChange(user.id, v)}
                  >
                    <SelectTrigger className="w-40">
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
      </CardContent>
    </Card>
  )
}
