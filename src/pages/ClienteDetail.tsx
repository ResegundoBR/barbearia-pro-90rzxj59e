import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CalendarDays, ShoppingBag, Package } from 'lucide-react'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'
import {
  getAppointmentsByClient,
  getProductPurchasesByClient,
  getClientPackages,
} from '@/services/api'
import { format } from 'date-fns'

export default function ClienteDetail() {
  const { id } = useParams()
  const [client, setClient] = useState<any>(null)
  const [appointments, setAppointments] = useState<any[]>([])
  const [purchases, setPurchases] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])

  const loadData = async () => {
    if (!id) return
    try {
      const c = await pb.collection('clients').getOne(id)
      setClient(c)
      setAppointments(await getAppointmentsByClient(id))
      setPurchases(await getProductPurchasesByClient(id))
      const allPacks = await getClientPackages()
      setPackages(allPacks.filter((p) => p.client_id === id))
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadData()
  }, [id])
  useRealtime('clients', (e) => {
    if (e.record.id === id) loadData()
  })
  useRealtime('appointments', loadData)
  useRealtime('product_purchases', loadData)
  useRealtime('client_packages', loadData)

  const stats = useMemo(() => {
    const completedApts = appointments.filter((a) => a.status === 'Concluído')
    const totalServices = completedApts.reduce(
      (sum, a) => sum + (a.price || a.expand?.service_id?.price || 0),
      0,
    )
    const totalProducts = purchases.reduce((sum, p) => sum + (p.price_at_sale || 0), 0)

    const sCounts: Record<string, number> = {}
    completedApts.forEach((a) => {
      const sName = a.expand?.service_id?.name
      if (sName) sCounts[sName] = (sCounts[sName] || 0) + 1
    })
    const mostUsed = Object.entries(sCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Nenhum'

    return { visits: completedApts.length, totalServices, totalProducts, mostUsed }
  }, [appointments, purchases])

  const activity = useMemo(() => {
    const list: any[] = []
    appointments.forEach((a) =>
      list.push({
        id: a.id,
        type: 'service',
        date: new Date(a.date),
        title: `${a.expand?.service_id?.name || 'Serviço'} (${a.expand?.barber_id?.name || 'Sem profissional'})`,
        val: a.price || a.expand?.service_id?.price,
      }),
    )
    purchases.forEach((p) =>
      list.push({
        id: p.id,
        type: 'product',
        date: new Date(p.date),
        title: `${p.expand?.product_id?.name || 'Produto'} (${p.expand?.barber_id?.name || 'Sem profissional'})`,
        val: p.price_at_sale,
      }),
    )
    packages.forEach((p) =>
      list.push({
        id: p.id,
        type: 'package',
        date: new Date(p.created),
        title: p.expand?.package_id?.name || 'Pacote',
        val: p.expand?.package_id?.price,
      }),
    )
    return list.sort((a, b) => b.date.getTime() - a.date.getTime())
  }, [appointments, purchases, packages])

  if (!client) return <div className="p-8">Carregando...</div>

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/clientes">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {client.name} {client.surname}
          </h2>
          <p className="text-muted-foreground">
            Cadastrado em: {format(new Date(client.created), 'dd/MM/yyyy')} | Cliente desde:{' '}
            {activity.length > 0 ? format(activity[activity.length - 1].date, 'dd/MM/yyyy') : 'N/A'}
          </p>
        </div>
        {client.is_active === false && (
          <Badge variant="destructive" className="ml-auto">
            Inativo
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Visitas</p>
            <p className="text-2xl font-bold">{stats.visits}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Serviço Favorito</p>
            <p className="text-xl font-bold truncate">{stats.mostUsed}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Gasto Serviços</p>
            <p className="text-2xl font-bold">R$ {stats.totalServices.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Gasto Produtos</p>
            <p className="text-2xl font-bold">R$ {stats.totalProducts.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          {activity.length === 0 ? (
            <p className="text-muted-foreground">Nenhuma atividade registrada.</p>
          ) : (
            <div className="space-y-4">
              {activity.map((act) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {act.type === 'service' && <CalendarDays className="size-5 text-blue-500" />}
                    {act.type === 'product' && <ShoppingBag className="size-5 text-green-500" />}
                    {act.type === 'package' && <Package className="size-5 text-purple-500" />}
                    <div>
                      <p className="font-medium">{act.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(act.date, 'dd/MM/yyyy HH:mm')}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold">R$ {(act.val || 0).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
