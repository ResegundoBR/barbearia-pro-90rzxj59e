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
import { Search, UserPlus, FileText, AlertCircle } from 'lucide-react'
import useMainStore from '@/stores/main'
import { useState } from 'react'
import { TIER_LIMITS } from '@/lib/tiers'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Clientes() {
  const { state } = useMainStore()
  const [search, setSearch] = useState('')

  const maxClients = TIER_LIMITS[state.tier].clients
  const displayedCustomers = state.customers.slice(0, maxClients)
  const isLimitReached = state.customers.length >= maxClients
  const hasMore = state.customers.length > maxClients

  const filteredCustomers = displayedCustomers.filter(
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
        <Button className="gap-2 w-full sm:w-auto min-h-[44px]" disabled={isLimitReached}>
          <UserPlus className="size-4" /> {isLimitReached ? 'Limite Atingido' : 'Novo Cliente'}
        </Button>
      </div>

      {hasMore && (
        <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
          <AlertCircle className="size-4" />
          <AlertDescription>
            Você atingiu o limite de {maxClients} clientes do plano {state.tier}. Atualize para ver todos os {state.customers.length} clientes.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="pb-3 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div>
            <CardTitle>Base de Clientes</CardTitle>
            <CardDescription>
              Mostrando {displayedCustomers.length} de {state.customers.length} clientes.
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-3 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou celular..."
              className="pl-9 bg-background min-h-[44px]"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-3 p-4 sm:hidden">
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum cliente encontrado.
              </div>
            ) : (
              filteredCustomers.map((customer) => (
                <div key={customer.id} className="bg-muted/10 border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.phone}</div>
                    </div>
                    <Badge variant={getLoyaltyVariant(customer.loyalty)} className="text-[10px]">
                      {customer.loyalty}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t text-sm">
                    <div className="text-muted-foreground">
                      Visita: {new Date(customer.lastVisit).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="font-mono font-medium text-primary">
                      R$ {customer.totalSpent.toFixed(2)}
                    </div>
                  </div>
                  <Button variant="secondary" className="w-full h-11 mt-2 gap-2">
                    <FileText className="size-4" /> Ver Perfil
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block">
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
