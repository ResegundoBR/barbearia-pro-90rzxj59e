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
import { FeatureGuard } from '@/components/FeatureGuard'
import { getBarbers, getAppointments } from '@/services/api'

export default function Staff() {
  const [barbers, setBarbers] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    getBarbers().then(setBarbers)
    getAppointments().then(setAppointments)
  }, [])

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Equipe & Comissões</h2>
        <p className="text-muted-foreground">Gestão de profissionais e relatórios de pagamento.</p>
      </div>

      <Tabs defaultValue="staff" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="staff">Profissionais</TabsTrigger>
          <TabsTrigger value="commissions">Comissões</TabsTrigger>
        </TabsList>
        <TabsContent value="staff" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Membros da Equipe</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo de Comissão</TableHead>
                    <TableHead>Valor/Taxa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {barbers.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">{b.name}</TableCell>
                      <TableCell className="capitalize">
                        {b.commission_type === 'percentage' ? 'Porcentagem' : 'Fixo'}
                      </TableCell>
                      <TableCell>
                        {b.commission_type === 'percentage'
                          ? `${b.commission_value}%`
                          : `R$ ${b.commission_value}`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="commissions" className="mt-4">
          <FeatureGuard feature="Pro">
            <Card>
              <CardHeader>
                <CardTitle>Relatório de Comissões</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Profissional</TableHead>
                      <TableHead>Serviços Realizados</TableHead>
                      <TableHead>Bruto (Serviços)</TableHead>
                      <TableHead>Adiantamentos</TableHead>
                      <TableHead className="text-primary font-bold">Líquido a Receber</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {barbers.map((b) => {
                      const bApts = appointments.filter(
                        (a) => a.barber_id === b.id && a.status === 'Concluído',
                      )
                      let totalBruto = 0
                      bApts.forEach((a) => {
                        const price = a.price || a.expand?.service_id?.price || 0
                        if (b.commission_type === 'percentage') {
                          totalBruto += price * (b.commission_value / 100)
                        } else {
                          totalBruto += b.commission_value
                        }
                      })
                      const net = totalBruto // Ignoring advances for simple demo
                      return (
                        <TableRow key={b.id}>
                          <TableCell className="font-medium">{b.name}</TableCell>
                          <TableCell>{bApts.length}</TableCell>
                          <TableCell>R$ {totalBruto.toFixed(2)}</TableCell>
                          <TableCell>R$ 0.00</TableCell>
                          <TableCell className="font-bold text-primary">
                            R$ {net.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </FeatureGuard>
        </TabsContent>
      </Tabs>
    </div>
  )
}
