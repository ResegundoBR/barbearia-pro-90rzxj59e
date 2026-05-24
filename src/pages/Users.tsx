import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PermissionsModal } from '@/components/PermissionsModal'
import { ResetPasswordModal } from '@/components/ResetPasswordModal'

export default function UsersPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    pb.collection('users')
      .getFullList({ sort: '-created' })
      .then(setUsers)
      .catch(() => toast.error('Erro ao carregar usuários'))
  }, [])

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Gerenciar Acessos</h1>
        {(user?.access_level === 'Admin' || user?.access_level === 'Socio') && <PermissionsModal />}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuários do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead className="w-[100px] text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.name || u.email.split('@')[0]}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <span className="inline-flex px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                        {u.access_level || 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {(user?.access_level === 'Admin' || user?.access_level === 'Socio') && (
                        <ResetPasswordModal targetUser={u} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      Nenhum usuário encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
