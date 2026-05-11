import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  CalendarDays,
  ShoppingBag,
  Package,
  FileText,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
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
  const [logs, setLogs] = useState<any[]>([])

  const [logDialogOpen, setLogDialogOpen] = useState(false)
  const [barbers, setBarbers] = useState<any[]>([])
  const [logForm, setLogForm] = useState({
    details: '',
    sentiment: 'neutral',
    barber_id: '',
  })

  const loadData = async () => {
    if (!id) return
    try {
      const c = await pb.collection('clients').getOne(id)
      setClient(c)
      setAppointments(await getAppointmentsByClient(id))
      setPurchases(await getProductPurchasesByClient(id))
      const allPacks = await getClientPackages()
      setPackages(allPacks.filter((p) => p.client_id === id))
      try {
        const clientLogs = await pb
          .collection('client_logs')
          .getFullList({ filter: `client_id="${id}"`, sort: '-created', expand: 'barber_id' })
        setLogs(clientLogs)
        const bList = await pb.collection('barbers').getFullList()
        setBarbers(bList)
      } catch {
        /* intentionally ignored */
      }
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
  useRealtime('client_logs', loadData)

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
    const mostUsedEntry = Object.entries(sCounts).sort((a, b) => b[1] - a[1])[0]
    const mostUsed = mostUsedEntry ? `${mostUsedEntry[0]} (${mostUsedEntry[1]})` : 'Nenhum'

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

  const handleSaveLog = async () => {
    if (!id || !logForm.details) return
    try {
      await pb.collection('client_logs').create({
        client_id: id,
        event_type: 'manual_entry',
        details: logForm.details,
        sentiment: logForm.sentiment === 'neutral' ? '' : logForm.sentiment,
        barber_id: logForm.barber_id || null,
      })
      setLogDialogOpen(false)
      setLogForm({ details: '', sentiment: 'neutral', barber_id: '' })
      loadData()
    } catch (e) {
      console.error(e)
    }
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Atividades</CardTitle>
          </CardHeader>
          <CardContent>
            {activity.length === 0 ? (
              <p className="text-muted-foreground">Nenhuma atividade registrada.</p>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Observações e Ocorrências</CardTitle>
            <Button size="sm" onClick={() => setLogDialogOpen(true)}>
              Nova Ocorrência
            </Button>
          </CardHeader>
          <CardContent>
            {logs.length === 0 ? (
              <p className="text-muted-foreground">Nenhuma ocorrência registrada.</p>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 pt-2">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-3 border rounded-lg ${log.sentiment === 'positive' ? 'bg-green-500/5 border-green-200' : log.sentiment === 'negative' ? 'bg-red-500/5 border-red-200' : 'bg-muted/20'}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {log.sentiment === 'positive' ? (
                        <ThumbsUp className="size-4 text-green-500" />
                      ) : log.sentiment === 'negative' ? (
                        <ThumbsDown className="size-4 text-red-500" />
                      ) : (
                        <FileText className="size-4 text-muted-foreground" />
                      )}
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${log.sentiment === 'positive' ? 'bg-green-500/10 text-green-700' : log.sentiment === 'negative' ? 'bg-red-500/10 text-red-700' : 'bg-primary/10 text-primary'}`}
                      >
                        {log.event_type === 'no_show'
                          ? 'Falta (No-Show)'
                          : log.event_type === 'reschedule'
                            ? 'Remarcação'
                            : log.event_type === 'manual_entry'
                              ? 'Registro Manual'
                              : log.event_type}
                      </span>
                      {log.expand?.barber_id && (
                        <span className="text-xs text-muted-foreground ml-2">
                          por {log.expand.barber_id.name}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground ml-auto">
                        {format(new Date(log.created), 'dd/MM/yyyy HH:mm')}
                      </span>
                    </div>
                    <p className="text-sm mt-2">{log.details}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={logDialogOpen} onOpenChange={setLogDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Ocorrência / Observação</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                placeholder="Detalhes da ocorrência..."
                value={logForm.details}
                onChange={(e) => setLogForm({ ...logForm, details: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Sentimento</Label>
                <Select
                  value={logForm.sentiment}
                  onValueChange={(v) => setLogForm({ ...logForm, sentiment: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="neutral">Neutro</SelectItem>
                    <SelectItem value="positive">Positivo</SelectItem>
                    <SelectItem value="negative">Negativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Profissional</Label>
                <Select
                  value={logForm.barber_id}
                  onValueChange={(v) => setLogForm({ ...logForm, barber_id: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o profissional..." />
                  </SelectTrigger>
                  <SelectContent>
                    {barbers.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveLog} disabled={!logForm.details}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
