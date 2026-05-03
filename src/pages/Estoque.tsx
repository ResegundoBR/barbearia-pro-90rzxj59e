import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getServices } from '@/services/services'
import { getProducts } from '@/services/products'
import { getPackages, getAppointments } from '@/services/api'

export default function Estoque() {
  const [services, setServices] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])

  const loadData = async () => {
    setServices(await getServices())
    setProducts(await getProducts())
    setPackages(await getPackages())
    setAppointments(await getAppointments("status='Concluído'"))
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Serviços e Estoque</h2>
        <p className="text-muted-foreground">Gerencie seus serviços, pacotes e produtos.</p>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="packages">Pacotes</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Serviços</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead className="hidden sm:table-cell">Duração (min)</TableHead>
                    <TableHead className="text-right">Quantidade (Vendas)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((s) => {
                    const qtd = appointments.filter((a) => a.service_id === s.id).length
                    return (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell>R$ {(s.price || 0).toFixed(2)}</TableCell>
                        <TableCell className="hidden sm:table-cell">{s.duration_minutes}</TableCell>
                        <TableCell className="text-right font-bold text-primary">{qtd}</TableCell>
                      </TableRow>
                    )
                  })}
                  {services.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        Nenhum serviço cadastrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Estoque de Produtos</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden sm:table-cell">Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead className="text-right">Estoque Atual</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell className="hidden sm:table-cell">{p.category || '-'}</TableCell>
                      <TableCell>R$ {(p.price || 0).toFixed(2)}</TableCell>
                      <TableCell className="text-right font-bold">
                        {p.stock_quantity || 0}
                      </TableCell>
                    </TableRow>
                  ))}
                  {products.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        Nenhum produto cadastrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="packages" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pacotes Disponíveis</CardTitle>
            </CardHeader>
            <CardContent className="p-0 sm:p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden sm:table-cell">Serviço Base</TableHead>
                    <TableHead>Sessões</TableHead>
                    <TableHead className="text-right">Preço Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {p.expand?.service_id?.name || '-'}
                      </TableCell>
                      <TableCell>{p.quantity}</TableCell>
                      <TableCell className="text-right">R$ {(p.price || 0).toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  {packages.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        Nenhum pacote cadastrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
