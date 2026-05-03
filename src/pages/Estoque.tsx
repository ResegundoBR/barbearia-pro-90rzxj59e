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
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import pb from '@/lib/pocketbase/client'
import { getServices, getPackages } from '@/services/api'
import { useToast } from '@/hooks/use-toast'

export default function Estoque() {
  const [services, setServices] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setServices(await getServices())
    setPackages(await getPackages())
  }

  const toggleService = async (id: string, current: boolean) => {
    await pb.collection('services').update(id, { is_active: !current })
    toast({ title: 'Serviço atualizado' })
    loadData()
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Serviços & Pacotes</h2>
          <p className="text-muted-foreground">
            Gerencie seus serviços, preços e pacotes promocionais.
          </p>
        </div>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="services">Serviços</TabsTrigger>
          <TabsTrigger value="packages">Pacotes</TabsTrigger>
        </TabsList>
        <TabsContent value="services" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Catálogo de Serviços</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Ativo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell>R$ {s.price}</TableCell>
                      <TableCell>
                        <Switch
                          checked={s.is_active}
                          onCheckedChange={() => toggleService(s.id, s.is_active)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="packages" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pacotes Promocionais</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pacote</TableHead>
                    <TableHead>Serviço Vinculado</TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead>Preço Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>{p.expand?.service_id?.name}</TableCell>
                      <TableCell>{p.quantity} usos</TableCell>
                      <TableCell>R$ {p.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
