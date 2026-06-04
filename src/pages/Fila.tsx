import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { useAuth } from '@/hooks/use-auth'
import { useRealtime } from '@/hooks/use-realtime'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format, addMinutes, differenceInMinutes, parseISO } from 'date-fns'
import { toast } from 'sonner'
import {
  Search,
  ListOrdered,
  User,
  Clock,
  Scissors,
  Play,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface QueueEntry {
  id: string
  client_id: string
  service_id: string
  barber_id: string
  status: 'waiting' | 'in_progress' | 'completed' | 'cancelled'
  joined_at: string
  estimated_start_time: string
  appointment_id?: string
  updated?: string
  expand?: {
    client_id: { name: string; surname?: string }
    service_id: { name: string; duration_minutes: number; price: number }
    barber_id?: { name: string; avatar?: string }
  }
}

export default function Fila() {
  const { user } = useAuth()
  const [now, setNow] = useState(new Date())

  const [clients, setClients] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [barbers, setBarbers] = useState<any[]>([])
  const [queueEntries, setQueueEntries] = useState<QueueEntry[]>([])
  const [todayAppointments, setTodayAppointments] = useState<any[]>([])
  const [todayCheckouts, setTodayCheckouts] = useState<any[]>([])

  const [openClient, setOpenClient] = useState(false)
  const [searchClient, setSearchClient] = useState('')
  const [selectedClient, setSelectedClient] = useState<any>(null)

  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedBarber, setSelectedBarber] = useState<string>('any')

  const [estimate, setEstimate] = useState<{
    wait_minutes: number
    barber_id: string
    duration_minutes: number
  } | null>(null)
  const [isEstimating, setIsEstimating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // New Client Quick Create State
  const [showNewClientDialog, setShowNewClientDialog] = useState(false)
  const [newClientName, setNewClientName] = useState('')
  const [newClientPhone, setNewClientPhone] = useState('')
  const [isCreatingClient, setIsCreatingClient] = useState(false)

  const loadBaseData = async () => {
    if (!user?.organization_id) return
    try {
      const [cRes, sRes, bRes] = await Promise.all([
        pb
          .collection('clients')
          .getFullList({ filter: `organization_id="${user.organization_id}"`, sort: '-created' }),
        pb.collection('services').getFullList({
          filter: `organization_id="${user.organization_id}" && is_active=true`,
          sort: 'name',
        }),
        pb
          .collection('barbers')
          .getFullList({ filter: `organization_id="${user.organization_id}"`, sort: 'name' }),
      ])
      setClients(cRes)
      setServices(sRes)
      setBarbers(bRes)
    } catch (e) {
      console.error(e)
    }
  }

  const loadQueue = async () => {
    if (!user?.organization_id) return
    try {
      const res = await pb.collection('queue_entries').getFullList<QueueEntry>({
        filter: `(status='waiting' || status='in_progress') && organization_id="${user.organization_id}"`,
        sort: 'joined_at',
        expand: 'client_id,service_id,barber_id',
      })
      setQueueEntries(res)
    } catch (e) {
      console.error(e)
    }
  }

  const loadTodayAppointments = async () => {
    if (!user?.organization_id) return
    const todayStr = format(new Date(), 'yyyy-MM-dd')
    try {
      const res = await pb.collection('appointments').getFullList({
        filter: `organization_id="${user.organization_id}" && date ~ "${todayStr}" && status != 'cancelado'`,
      })
      setTodayAppointments(res)
    } catch (e) {
      console.error(e)
    }
  }

  const loadTodayCheckouts = async () => {
    const todayStr = format(new Date(), 'yyyy-MM-dd')
    try {
      const res = await pb.collection('checkouts').getFullList({
        filter: `date ~ "${todayStr}"`,
      })
      setTodayCheckouts(res)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadBaseData()
    loadQueue()
    loadTodayAppointments()
    loadTodayCheckouts()
    const interval = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(interval)
  }, [user])

  useRealtime('queue_entries', () => {
    loadQueue()
    loadTodayAppointments()
  })

  useRealtime('appointments', () => {
    loadTodayAppointments()
  })

  useRealtime('checkouts', () => {
    loadTodayCheckouts()
  })

  useEffect(() => {
    if (!selectedService) {
      setEstimate(null)
      return
    }

    const calculateLocalEstimate = () => {
      setIsEstimating(true)
      try {
        const duration = selectedService.duration_minutes || 30
        let bestBarberId = selectedBarber
        let earliestStart = new Date(now.getTime() + 24 * 60 * 60 * 1000)

        const getNextAvailableTime = (barberId: string, serviceDuration: number) => {
          let blocks: { start: Date; end: Date }[] = []

          const activeAppts = todayAppointments.filter((a) => {
            if (a.barber_id !== barberId) return false
            if (['cancelado', 'concluido', 'finalizado'].includes(a.status?.toLowerCase()))
              return false
            if (isApptFinishedByCheckout(a)) return false
            if (!a.time || !a.end_time) return false
            return true
          })

          for (const a of activeAppts) {
            const [startH, startM] = a.time.split(':').map(Number)
            const [endH, endM] = a.end_time.split(':').map(Number)
            const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startH, startM)
            const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endH, endM)
            if (end > now) {
              blocks.push({ start, end })
            }
          }

          const inProgressQueue = queueEntries.filter(
            (q) => q.barber_id === barberId && q.status === 'in_progress',
          )

          for (const q of inProgressQueue) {
            const start = parseISO(q.updated || q.joined_at)
            const duration = q.expand?.service_id?.duration_minutes || 30
            const end = addMinutes(start, duration)
            if (end > now) {
              blocks.push({ start, end })
            }
          }

          blocks.sort((a, b) => a.start.getTime() - b.start.getTime())

          const mergedBlocks: { start: Date; end: Date }[] = []
          for (const b of blocks) {
            if (mergedBlocks.length === 0) {
              mergedBlocks.push(b)
            } else {
              const last = mergedBlocks[mergedBlocks.length - 1]
              if (b.start <= last.end) {
                if (b.end > last.end) {
                  last.end = b.end
                }
              } else {
                mergedBlocks.push(b)
              }
            }
          }

          let possibleStart = new Date(now.getTime())

          for (const b of mergedBlocks) {
            if (b.start >= addMinutes(possibleStart, serviceDuration)) {
              break
            }
            if (possibleStart < b.end) {
              possibleStart = b.end
            }
          }

          return possibleStart
        }

        if (selectedBarber === 'any') {
          const availableBarbers = barbers.filter((b) => b.is_active !== false)
          if (availableBarbers.length === 0) {
            setEstimate(null)
            setIsEstimating(false)
            return
          }

          for (const b of availableBarbers) {
            const bStart = getNextAvailableTime(b.id, duration)
            if (bStart < earliestStart) {
              earliestStart = bStart
              bestBarberId = b.id
            }
          }
        } else {
          earliestStart = getNextAvailableTime(selectedBarber, duration)
        }

        const wait_minutes = Math.max(0, differenceInMinutes(earliestStart, now))

        setEstimate({
          wait_minutes,
          barber_id: bestBarberId === 'any' ? barbers[0]?.id : bestBarberId,
          duration_minutes: duration,
        })
      } catch (e: any) {
        toast.error(e.message || 'Erro ao estimar tempo')
        setEstimate(null)
      } finally {
        setIsEstimating(false)
      }
    }

    const timer = setTimeout(calculateLocalEstimate, 100)
    return () => clearTimeout(timer)
  }, [selectedService, selectedBarber, todayAppointments, todayCheckouts, barbers, now])

  const filteredClients = clients.filter((c) =>
    (c.name + ' ' + (c.surname || '')).toLowerCase().includes(searchClient.toLowerCase()),
  )

  const handleCreateQuickClient = async () => {
    if (!newClientName.trim()) return toast.error('O nome do cliente é obrigatório')
    if (!user?.organization_id) return toast.error('Erro de organização')

    setIsCreatingClient(true)
    try {
      const client = await pb.collection('clients').create({
        name: newClientName,
        phone: newClientPhone,
        organization_id: user.organization_id,
        is_active: true,
      })
      setClients((prev) => [client, ...prev])
      setSelectedClient(client)
      setShowNewClientDialog(false)
      setNewClientName('')
      setNewClientPhone('')
      toast.success('Novo cliente cadastrado e selecionado!')
    } catch (e: any) {
      toast.error(e.message || 'Erro ao cadastrar novo cliente')
    } finally {
      setIsCreatingClient(false)
    }
  }

  const handleAddToQueue = async () => {
    if (!selectedClient || !selectedService || !estimate || !user?.organization_id) return
    setIsSubmitting(true)
    try {
      const estStart = addMinutes(new Date(), estimate.wait_minutes)
      const estEnd = addMinutes(estStart, estimate.duration_minutes)

      const qe = await pb.collection('queue_entries').create({
        client_id: selectedClient.id,
        service_id: selectedService.id,
        barber_id: estimate.barber_id,
        status: 'waiting',
        joined_at: new Date().toISOString(),
        estimated_start_time: estStart.toISOString(),
        organization_id: user.organization_id,
      })

      const appt = await pb.collection('appointments').create({
        client_id: selectedClient.id,
        service_id: selectedService.id,
        barber_id: estimate.barber_id,
        organization_id: user.organization_id,
        date: format(estStart, 'yyyy-MM-dd') + ' 12:00:00.000Z',
        time: format(estStart, 'HH:mm'),
        end_time: format(estEnd, 'HH:mm'),
        status: 'aguardando',
        price: selectedService.price,
      })

      await pb.collection('queue_entries').update(qe.id, { appointment_id: appt.id })

      toast.success('Cliente adicionado à fila!')
      setSelectedClient(null)
      setSelectedService(null)
      setSelectedBarber('any')
    } catch (e: any) {
      toast.error(e.message || 'Erro ao adicionar à fila')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStartService = async (entry: QueueEntry) => {
    try {
      await pb.collection('queue_entries').update(entry.id, { status: 'in_progress' })
      if (entry.appointment_id) {
        await pb.collection('appointments').update(entry.appointment_id, { status: 'confirmado' })
      }
      toast.success('Atendimento iniciado!')
    } catch (e) {
      toast.error('Erro ao iniciar atendimento')
    }
  }

  const handleFinishService = async (entry: QueueEntry) => {
    try {
      await pb.collection('queue_entries').update(entry.id, { status: 'completed' })
      if (entry.appointment_id) {
        await pb.collection('appointments').update(entry.appointment_id, { status: 'finalizado' })
      }
      toast.success('Atendimento finalizado!')
    } catch (e) {
      toast.error('Erro ao finalizar atendimento')
    }
  }

  const handleCancel = async (entry: QueueEntry) => {
    try {
      await pb.collection('queue_entries').update(entry.id, { status: 'cancelled' })
      if (entry.appointment_id) {
        await pb.collection('appointments').update(entry.appointment_id, { status: 'cancelado' })
      }
      toast.success('Removido da fila!')
    } catch (e) {
      toast.error('Erro ao cancelar')
    }
  }

  const isApptFinishedByCheckout = (appt: any) => {
    const today = new Date()
    let apptTime = new Date()
    if (appt.time) {
      const [h, m] = appt.time.split(':').map(Number)
      apptTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), h, m)
    }
    return todayCheckouts.some(
      (c) =>
        c.client_id === appt.client_id &&
        c.barber_id === appt.barber_id &&
        new Date(c.created) >= apptTime,
    )
  }

  const isServiceFinishedByCheckout = (clientId: string, barberId: string, afterDate: string) => {
    return todayCheckouts.some(
      (c) =>
        c.client_id === clientId &&
        c.barber_id === barberId &&
        new Date(c.created) >= new Date(afterDate),
    )
  }

  const displayQueue = queueEntries.filter((entry) => {
    if (entry.status !== 'waiting' && entry.status !== 'in_progress') return false
    if (entry.status === 'in_progress') {
      return !isServiceFinishedByCheckout(entry.client_id, entry.barber_id, entry.joined_at)
    }
    return true
  })

  const getBarberStatus = (barberId: string) => {
    let blocks: { start: Date; end: Date }[] = []

    const activeAppts = todayAppointments.filter((a) => {
      if (a.barber_id !== barberId) return false
      if (['cancelado', 'concluido', 'finalizado'].includes(a.status?.toLowerCase())) return false
      if (isApptFinishedByCheckout(a)) return false
      if (!a.time || !a.end_time) return false
      return true
    })

    for (const a of activeAppts) {
      const [startH, startM] = a.time.split(':').map(Number)
      const [endH, endM] = a.end_time.split(':').map(Number)
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startH, startM)
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endH, endM)
      if (end > now) {
        blocks.push({ start, end })
      }
    }

    const inProgressQueue = displayQueue.filter(
      (q) => q.barber_id === barberId && q.status === 'in_progress',
    )

    for (const q of inProgressQueue) {
      const start = parseISO(q.updated || q.joined_at)
      const duration = q.expand?.service_id?.duration_minutes || 30
      const end = addMinutes(start, duration)
      if (end > now) {
        blocks.push({ start, end })
      }
    }

    blocks.sort((a, b) => a.start.getTime() - b.start.getTime())

    const mergedBlocks: { start: Date; end: Date }[] = []
    for (const b of blocks) {
      if (mergedBlocks.length === 0) {
        mergedBlocks.push(b)
      } else {
        const last = mergedBlocks[mergedBlocks.length - 1]
        if (b.start <= last.end) {
          if (b.end > last.end) {
            last.end = b.end
          }
        } else {
          mergedBlocks.push(b)
        }
      }
    }

    const checkTime = addMinutes(now, 5)

    for (const b of mergedBlocks) {
      if (b.start <= checkTime && b.end > now) {
        return { occupied: true, remaining: differenceInMinutes(b.end, now) }
      }
    }

    return { occupied: false, remaining: 0 }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <ListOrdered className="size-8" /> Fila Inteligente
          </h2>
          <p className="text-muted-foreground mt-1">
            Gerencie clientes sem agendamento e otimize o tempo de espera.
          </p>
        </div>
      </div>

      {/* Professional Availability Dashboard */}
      <div className="mb-8">
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="text-xl font-bold text-foreground">Disponibilidade dos Profissionais</h3>
          <p className="text-sm text-muted-foreground">
            Status em tempo real baseado nos atendimentos atuais.
          </p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
          {barbers.map((barber) => {
            const status = getBarberStatus(barber.id)
            return (
              <Card
                key={barber.id}
                className={cn(
                  'min-w-[240px] flex-shrink-0 flex items-center p-4 gap-4 border-l-4 transition-colors',
                  status.occupied ? 'border-l-destructive' : 'border-l-blue-500',
                )}
              >
                <div className="relative">
                  <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg overflow-hidden">
                    {barber.avatar ? (
                      <img
                        src={pb.files.getUrl(barber, barber.avatar)}
                        alt={barber.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      barber.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div
                    className={cn(
                      'absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-background',
                      status.occupied ? 'bg-destructive' : 'bg-blue-500',
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm line-clamp-1">{barber.name}</span>
                  <span
                    className={cn(
                      'text-xs font-semibold mt-0.5 flex items-center gap-1',
                      status.occupied ? 'text-destructive' : 'text-blue-500',
                    )}
                  >
                    {status.occupied ? (
                      <>
                        <Clock className="size-3" /> Livre em: {status.remaining} min
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="size-3" /> Disponível
                      </>
                    )}
                  </span>
                </div>
              </Card>
            )
          })}
          {barbers.length === 0 && (
            <div className="text-sm text-muted-foreground py-2">
              Nenhum profissional encontrado.
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Formulário de Entrada */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-t-4 border-t-primary shadow-md sticky top-6">
            <CardHeader>
              <CardTitle>Nova Entrada</CardTitle>
              <CardDescription>Adicione um cliente à fila de espera.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="size-4 text-muted-foreground" /> Cliente
                  </label>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto py-1 px-2 text-xs"
                    onClick={() => setShowNewClientDialog(true)}
                  >
                    + Novo Cliente
                  </Button>
                </div>
                <Popover open={openClient} onOpenChange={setOpenClient}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between font-normal"
                    >
                      {selectedClient
                        ? `${selectedClient.name} ${selectedClient.surname || ''}`
                        : 'Selecione o cliente...'}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <div className="p-2 border-b">
                      <Input
                        placeholder="Buscar cliente..."
                        value={searchClient}
                        onChange={(e) => setSearchClient(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <ScrollArea className="h-56">
                      {filteredClients.length === 0 && (
                        <div className="p-4 text-sm text-center text-muted-foreground">
                          Nenhum cliente encontrado.
                        </div>
                      )}
                      {filteredClients.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => {
                            setSelectedClient(c)
                            setOpenClient(false)
                            setSearchClient('')
                          }}
                          className="p-3 border-b last:border-0 hover:bg-primary/5 cursor-pointer text-sm transition-colors"
                        >
                          <p className="font-medium">
                            {c.name} {c.surname}
                          </p>
                          {c.phone && <p className="text-xs text-muted-foreground">{c.phone}</p>}
                        </div>
                      ))}
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Scissors className="size-4 text-muted-foreground" /> Serviço
                </label>
                <Select
                  value={selectedService?.id || undefined}
                  onValueChange={(val) => setSelectedService(services.find((s) => s.id === val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o serviço..." />
                  </SelectTrigger>
                  <SelectContent>
                    {services
                      .filter((s) => s.id)
                      .map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name} ({s.duration_minutes} min)
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="size-4 text-muted-foreground" /> Profissional{' '}
                  <span className="text-xs font-normal text-muted-foreground">(Opcional)</span>
                </label>
                <Select value={selectedBarber} onValueChange={setSelectedBarber}>
                  <SelectTrigger>
                    <SelectValue placeholder="Qualquer Profissional Livre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Qualquer Profissional Livre</SelectItem>
                    {barbers
                      .filter((b) => b.id)
                      .map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedService && (
                <div
                  className={cn(
                    'p-4 rounded-lg border',
                    isEstimating
                      ? 'opacity-50 animate-pulse bg-muted'
                      : 'bg-primary/5 border-primary/20',
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Clock className="size-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Tempo Estimado</p>
                      {isEstimating ? (
                        <p className="text-xs text-muted-foreground">
                          Calculando melhor horário...
                        </p>
                      ) : estimate ? (
                        <>
                          <p className="text-xl font-bold text-primary">
                            {estimate.wait_minutes} min
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Início previsto:{' '}
                            <strong>
                              {format(addMinutes(new Date(), estimate.wait_minutes), 'HH:mm')}
                            </strong>
                            {estimate.barber_id &&
                              barbers.find((b) => b.id === estimate.barber_id) &&
                              ` com ${barbers.find((b) => b.id === estimate.barber_id)?.name}`}
                          </p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                disabled={
                  !selectedClient || !selectedService || !estimate || isSubmitting || isEstimating
                }
                onClick={handleAddToQueue}
              >
                {isSubmitting ? 'Adicionando...' : 'Adicionar à Fila'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Lista da Fila */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Painel da Fila</CardTitle>
              <CardDescription>
                Acompanhamento em tempo real dos clientes aguardando.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {displayQueue.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="size-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Clock className="size-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">A fila está vazia</h3>
                  <p className="text-sm text-muted-foreground">
                    Nenhum cliente aguardando no momento.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {displayQueue.map((entry) => {
                    const elapsed = differenceInMinutes(now, parseISO(entry.joined_at))
                    const isWaiting = entry.status === 'waiting'

                    let isOverdue = false
                    if (!isWaiting) {
                      const appt = todayAppointments.find((a) => a.id === entry.appointment_id)
                      if (appt && appt.end_time) {
                        const [endH, endM] = appt.end_time.split(':').map(Number)
                        const endTime = new Date(
                          now.getFullYear(),
                          now.getMonth(),
                          now.getDate(),
                          endH,
                          endM,
                        )
                        isOverdue = differenceInMinutes(now, endTime) > 10
                      } else if (entry.estimated_start_time) {
                        const estStart = parseISO(entry.estimated_start_time)
                        const endTimeFallback = addMinutes(
                          estStart,
                          entry.expand?.service_id?.duration_minutes || 30,
                        )
                        isOverdue = differenceInMinutes(now, endTimeFallback) > 10
                      }
                    }

                    return (
                      <div
                        key={entry.id}
                        className={cn(
                          'flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all',
                          isWaiting
                            ? 'bg-card hover:border-primary/50'
                            : 'bg-primary/5 border-primary/30',
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              'size-12 rounded-full flex items-center justify-center shrink-0 shadow-sm',
                              isWaiting
                                ? 'bg-amber-100 text-amber-600'
                                : 'bg-emerald-100 text-emerald-600',
                            )}
                          >
                            {isWaiting ? (
                              <Clock className="size-6" />
                            ) : (
                              <Play className="size-6 ml-1" />
                            )}
                          </div>

                          <div>
                            <h4 className="font-bold text-lg leading-tight">
                              {entry.expand?.client_id?.name} {entry.expand?.client_id?.surname}
                            </h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1 font-medium text-foreground">
                                <Scissors className="size-3" /> {entry.expand?.service_id?.name}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="size-3" />{' '}
                                {entry.expand?.barber_id?.name || 'A definir'}
                              </span>
                            </div>

                            <div className="mt-2 flex items-center gap-2">
                              <span
                                className={cn(
                                  'px-2.5 py-0.5 text-xs font-semibold rounded-full border',
                                  isWaiting
                                    ? 'bg-amber-50 border-amber-200 text-amber-700'
                                    : 'bg-emerald-50 border-emerald-200 text-emerald-700',
                                )}
                              >
                                {isWaiting ? 'Aguardando' : 'Em Atendimento'}
                              </span>

                              {isWaiting && (
                                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                  Espera: {elapsed} min (Prev:{' '}
                                  {format(parseISO(entry.estimated_start_time), 'HH:mm')})
                                </span>
                              )}
                              {isOverdue && (
                                <span className="text-xs text-destructive font-bold flex items-center gap-1 animate-pulse">
                                  <Clock className="size-3" /> Tempo excedido
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-2 shrink-0">
                          {isWaiting && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
                                onClick={() => handleCancel(entry)}
                              >
                                <XCircle className="size-4 mr-1.5" /> Desistir
                              </Button>
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                onClick={() => handleStartService(entry)}
                              >
                                <Play className="size-4 mr-1.5" /> Iniciar
                              </Button>
                            </>
                          )}

                          {!isWaiting && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
                                onClick={() => handleCancel(entry)}
                              >
                                <XCircle className="size-4 mr-1.5" /> Cancelar
                              </Button>
                              <Button
                                size="sm"
                                className={cn(
                                  'bg-primary hover:bg-primary/90',
                                  isOverdue &&
                                    'animate-pulse bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-md shadow-destructive/50 border-destructive',
                                )}
                                onClick={() => handleFinishService(entry)}
                              >
                                <CheckCircle2 className="size-4 mr-1.5" /> Finalizar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showNewClientDialog} onOpenChange={setShowNewClientDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Cliente Rápido</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Nome do Cliente <span className="text-destructive">*</span>
              </label>
              <Input
                placeholder="Ex: João Silva"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Telefone / WhatsApp</label>
              <Input
                placeholder="(00) 00000-0000"
                value={newClientPhone}
                onChange={(e) => setNewClientPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowNewClientDialog(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreateQuickClient}
              disabled={isCreatingClient || !newClientName.trim()}
            >
              {isCreatingClient ? 'Salvando...' : 'Salvar e Selecionar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
