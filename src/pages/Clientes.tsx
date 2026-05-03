import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, UserPlus, FileText } from 'lucide-react'
import useMainStore from '@/stores/main'
import { useState } from 'react'

export default function Clientes() {
  const { state } = useMainStore()
  const [search, setSearch] = useState('')

  const filteredCustomers = state.customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search),
  )

  const getLoyaltyVariant = (loyalty: string) => {
    switch (loyalty) {
      case 'Frequente':
        return 'default'
      case 'Regular':
        return 'secondary'
      case 'Risco':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Clientes (CRM)</h2>
          <p className="text-muted-foreground">Gerencie seus clientes e retenção.</p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <UserPlus className="size-4" /> Novo Cliente
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Base de Clientes</CardTitle>
              <CardDescription>
                Total de {state.customers.length} clientes cadastrados.
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou celular..."
                className="pl-9 bg-background"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Nome</TableHead>
                <TableHead>Celular</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Gasto</TableHead>
                <TableHead className="text-right">Última Visita</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                    Nenhum cliente encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell className="text-muted-foreground">{customer.phone}</TableCell>
                    <TableCell>
                      <Badge variant={getLoyaltyVariant(customer.loyalty)}>
                        {customer.loyalty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      R$ {customer.totalSpent.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {new Date(customer.lastVisit).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" title="Ver Perfil">
                        <FileText className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
