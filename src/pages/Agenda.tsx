import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import {
  Plus,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Check,
  ChevronsUpDown,
  Edit2,
  Clock,
  User,
  Scissors,
  CalendarDays,
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  getBarbers,
  getAppointments,
  getClients,
  getServices,
  createAppointment,
  getClientPackages,
  consumePackage,
  createClient,
  updateAppointment,
} from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import {
  format,
  addMinutes,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isSameMonth,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8) // 08:00 to 20:00

export default function Agenda() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [data, setData] = useState({
    barbers: [] as any[],
    apts: [] as any[],
    clients: [] as any[],
    services: [] as any[],
    packages: [] as any[],
  })
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<'day' | 'week' | 'month'>('week')
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const [form, setForm] = useState({
    barber_id: '',
    client_id: '',
    item_id: '',
    time: '09:00',
    date: new Date(),
  })
  const [clientSearchOpen, setClientSearchOpen] = useState(false)
  const [newClient, setNewClient] = useState({ name: '', phone: '' })
  const [newClientDialogOpen, setNewClientDialogOpen] = useState(false)

  // Edit/View Dialog State
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedApt, setSelectedApt] = useState<any>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editForm, setEditForm] = useState({
    barber_id: '',
    service_id: '',
    date: new Date(),
    time: '',
    end_time: '',
    status: '',
  })

  const loadData = async () => {
    let start, end
    if (view === 'day') {
      start = selectedDate
      end = selectedDate
    } else if (view === 'week') {
      start = startOfWeek(selectedDate, { weekStartsOn: 0 })
      end = endOfWeek(selectedDate, { weekStartsOn: 0 })
    } else {
      start = startOfWeek(startOfMonth(selectedDate), { weekStartsOn: 0 })
      end = endOfWeek(endOfMonth(selectedDate), { weekStartsOn: 0 })
    }

    const startStr = format(start, 'yyyy-MM-dd 00:00:00')
    const endStr = format(end, 'yyyy-MM-dd 23:59:59')

    setData({
      barbers: await getBarbers(),
      apts: await getAppointments(`date >= "${startStr}" && date <= "${endStr}"`),
      clients: await getClients(),
      services: await getServices(),
      packages: await getClientPackages(),
    })
  }

  useEffect(() => {
    loadData()
  }, [selectedDate, view])
  useRealtime('appointments', loadData)

  const isAdmin = user?.access_level === 'Admin'
  const visibleBarbers = useMemo(
    () => (isAdmin ? data.barbers : data.barbers.filter((b) => b.name === user?.name)),
    [isAdmin, data.barbers, user],
  )

  const handleOpen = (timeStr = '09:00', day: Date = new Date()) => {
    const defaultBarber = isAdmin ? '' : visibleBarbers[0]?.id || ''
    setForm({ barber_id: defaultBarber, client_id: '', item_id: '', time: timeStr, date: day })
    setNewClient({ name: '', phone: '' })
    setNewClientDialogOpen(false)
    setClientSearchOpen(false)
    setIsOpen(true)
  }

  const navigatePrev = () => {
    if (view === 'day') setSelectedDate(subDays(selectedDate, 1))
    if (view === 'week') setSelectedDate(subWeeks(selectedDate, 1))
    if (view === 'month') setSelectedDate(subMonths(selectedDate, 1))
  }
  const navigateNext = () => {
    if (view === 'day') setSelectedDate(addDays(selectedDate, 1))
    if (view === 'week') setSelectedDate(addWeeks(selectedDate, 1))
    if (view === 'month') setSelectedDate(addMonths(selectedDate, 1))
  }

  const handleClientCreate = async () => {
    if (!newClient.name || !newClient.phone) {
      return toast({ title: 'Preencha nome e celular', variant: 'destructive' })
    }
    try {
      const c = await createClient({ ...newClient, location_type: 'nearby', is_active: true })
      setData((prev) => ({ ...prev, clients: [c, ...prev.clients] }))
      setForm((f) => ({ ...f, client_id: c.id }))
      setNewClientDialogOpen(false)
      toast({ title: 'Cliente criado!' })
    } catch (err) {
      toast({ title: getErrorMessage(err) || 'Erro ao criar cliente', variant: 'destructive' })
    }
  }

  const handleBooking = async () => {
    if (!form.client_id) return toast({ title: 'Selecione um cliente', variant: 'destructive' })
    if (!form.item_id)
      return toast({ title: 'Selecione um serviço ou pacote', variant: 'destructive' })
    if (!form.barber_id)
      return toast({ title: 'Selecione um profissional', variant: 'destructive' })
    if (!form.date) return toast({ title: 'Selecione a data', variant: 'destructive' })

    try {
      const isPkg = form.item_id.startsWith('pkg_')
      const id = form.item_id.replace('pkg_', '').replace('svc_', '')
      const activePackage = isPkg ? data.packages.find((p) => p.id === id) : null
      const svc = isPkg
        ? activePackage?.expand?.package_id?.expand?.service_id
        : data.services.find((s) => s.id === id)

      const svcId = isPkg
        ? activePackage?.expand?.package_id?.service_id || svc?.id
        : form.item_id.replace('svc_', '')

      const duration =
        activePackage?.expand?.package_id?.duration_minutes || svc?.duration_minutes || 30
      const [h, m] = form.time.split(':').map(Number)
      const startDate = new Date()
      startDate.setHours(h, m, 0, 0)
      const end_time = format(addMinutes(startDate, duration), 'HH:mm')

      const payload: any = {
        barber_id: form.barber_id,
        client_id: form.client_id,
        service_id: svcId,
        time: form.time,
        end_time,
        date: format(form.date, 'yyyy-MM-dd 12:00:00'),
        status: 'Confirmado',
        price: isPkg ? 0 : svc?.price || 0,
      }

      if (isPkg && activePackage) {
        payload.client_package_id = activePackage.id
      }

      await createAppointment(payload)

      if (isPkg && activePackage) {
        toast({ title: 'Agendamento salvo. 1 crédito será deduzido no checkout.' })
      } else {
        toast({ title: 'Agendamento salvo!' })
      }
      setIsOpen(false)
      loadData()
    } catch (err: any) {
      toast({ title: getErrorMessage(err) || 'Erro ao agendar', variant: 'destructive' })
    }
  }

  const handleOpenDetail = (apt: any) => {
    setSelectedApt(apt)
    setEditForm({
      barber_id: apt.barber_id || '',
      service_id: apt.service_id || '',
      date: new Date(apt.date),
      time: apt.time || '',
      end_time: apt.end_time || '',
      status: apt.status || 'Confirmado',
    })
    setIsEditMode(false)
    setDetailOpen(true)
  }

  const handleUpdateBooking = async () => {
    if (!editForm.barber_id || !editForm.service_id || !editForm.date || !editForm.time) {
      return toast({ title: 'Preencha os campos obrigatórios.', variant: 'destructive' })
    }
    try {
      const payload = {
        barber_id: editForm.barber_id,
        service_id: editForm.service_id,
        time: editForm.time,
        end_time: editForm.end_time,
        date: format(editForm.date, 'yyyy-MM-dd 12:00:00'),
        status: editForm.status,
      }
      await updateAppointment(selectedApt.id, payload)
      toast({ title: 'Agendamento atualizado com sucesso!' })
      setDetailOpen(false)
      loadData()
    } catch (err) {
      toast({ title: getErrorMessage(err) || 'Erro ao atualizar', variant: 'destructive' })
    }
  }

  const timeSlots = Array.from({ length: 13 * 4 }, (_, i) => {
    const h = Math.floor(i / 4) + 8
    const m = (i % 4) * 15
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
  })

  const clientPkgs = data.packages.filter(
    (p) =>
      p.client_id === form.client_id &&
      p.remaining_uses > 0 &&
      (!p.expires_at || new Date(p.expires_at) >= new Date()),
  )

  const getEventsForDay = (day: Date) => {
    return data.apts.filter((a) => a.date && a.date.startsWith(format(day, 'yyyy-MM-dd')))
  }

  const renderDayColumn = (day: Date) => {
    const events = getEventsForDay(day)
    return (
      <div key={day.toISOString()} className="flex-1 border-r min-w-[120px] relative">
        {view === 'week' && (
          <div className="h-12 border-b flex flex-col items-center justify-center bg-muted/20 sticky top-0 z-20">
            <span className="text-xs uppercase font-medium">
              {format(day, 'EEE', { locale: ptBR })}
            </span>
            <span
              className={cn(
                'text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center',
                isSameDay(day, new Date()) ? 'bg-primary text-primary-foreground' : '',
              )}
            >
              {format(day, 'dd')}
            </span>
          </div>
        )}
        <div className="relative" style={{ height: HOURS.length * 60 }}>
          {HOURS.map((h) => (
            <div
              key={h}
              className="h-[60px] border-b border-border/50 hover:bg-muted/10 cursor-pointer"
              onClick={() => handleOpen(`${h.toString().padStart(2, '0')}:00`, day)}
            />
          ))}
          {events.map((apt) => {
            const [sH, sM] = (apt.time || '00:00').split(':').map(Number)
            const [eH, eM] = (apt.end_time || apt.time || '00:00').split(':').map(Number)
            const top = (sH - 8 + sM / 60) * 60
            const height = Math.max(15, (eH - sH + (eM - sM) / 60) * 60)
            const barberColor = apt.expand?.barber_id?.color || 'hsl(var(--primary))'
            const isCanceled = apt.status === 'Cancelado'

            return (
              <div
                key={apt.id}
                className={cn(
                  'absolute inset-x-1 rounded-md text-white p-1.5 overflow-hidden shadow-sm transition-all hover:opacity-90 hover:scale-[1.02] cursor-pointer',
                  isCanceled && 'opacity-50 grayscale',
                )}
                style={{ top, height, backgroundColor: barberColor }}
                onClick={(e) => {
                  e.stopPropagation()
                  handleOpenDetail(apt)
                }}
              >
                <div className="text-xs font-semibold leading-tight drop-shadow-sm">
                  {apt.expand?.client_id?.name}
                </div>
                <div className="text-[10px] opacity-90 drop-shadow-sm leading-tight mt-0.5">
                  {apt.time} - {apt.expand?.barber_id?.name?.split(' ')[0] || 'Profissional'} •{' '}
                  {apt.expand?.service_id?.name || 'Serviço'}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderMonthView = () => {
    const days = eachDayOfInterval({
      start: startOfWeek(startOfMonth(selectedDate), { weekStartsOn: 0 }),
      end: endOfWeek(endOfMonth(selectedDate), { weekStartsOn: 0 }),
    })

    return (
      <div className="flex-1 flex flex-col min-h-0 bg-card rounded-md border overflow-hidden">
        <div className="grid grid-cols-7 border-b bg-muted/20">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
            <div key={d} className="p-2 text-center text-xs font-semibold uppercase">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-1 auto-rows-fr">
          {days.map((day) => {
            const events = getEventsForDay(day)
            const isToday = isSameDay(day, new Date())
            return (
              <div
                key={day.toISOString()}
                className={cn(
                  'border-b border-r p-1 overflow-hidden hover:bg-muted/10 cursor-pointer flex flex-col',
                  !isSameMonth(day, selectedDate) && 'opacity-40',
                )}
                onClick={() => {
                  setSelectedDate(day)
                  setView('day')
                }}
              >
                <div className="text-right mb-1">
                  <span
                    className={cn(
                      'inline-flex items-center justify-center text-xs w-6 h-6 rounded-full',
                      isToday
                        ? 'bg-primary text-primary-foreground font-bold'
                        : 'text-muted-foreground',
                    )}
                  >
                    {format(day, 'd')}
                  </span>
                </div>
                <div className="flex flex-col gap-1 flex-1 overflow-hidden">
                  {events.slice(0, 4).map((apt) => (
                    <div
                      key={apt.id}
                      className={cn(
                        'text-[10px] truncate px-1 py-0.5 rounded text-white shadow-sm',
                        apt.status === 'Cancelado' && 'opacity-50 grayscale',
                      )}
                      style={{
                        backgroundColor: apt.expand?.barber_id?.color || 'hsl(var(--primary))',
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenDetail(apt)
                      }}
                    >
                      {apt.time} - {apt.expand?.barber_id?.name?.split(' ')[0]} -{' '}
                      {apt.expand?.service_id?.name} ({apt.expand?.client_id?.name})
                    </div>
                  ))}
                  {events.length > 4 && (
                    <div className="text-[10px] text-muted-foreground font-medium pl-1">
                      +{events.length - 4} mais
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderGrid = () => {
    let daysToRender: Date[] = []
    if (view === 'day') daysToRender = [selectedDate]
    if (view === 'week') {
      daysToRender = eachDayOfInterval({
        start: startOfWeek(selectedDate, { weekStartsOn: 0 }),
        end: endOfWeek(selectedDate, { weekStartsOn: 0 }),
      })
    }

    return (
      <ScrollArea className="flex-1 rounded-xl border bg-card/50 shadow-inner">
        <div className="flex min-w-[600px] h-full">
          <div className="w-16 border-r flex flex-col bg-background/50 sticky left-0 z-30">
            {view === 'week' && <div className="h-12 border-b bg-muted/20" />}
            <div className="relative" style={{ height: HOURS.length * 60 }}>
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="absolute w-full text-[10px] text-right pr-2 text-muted-foreground"
                  style={{ top: (h - 8) * 60 - 6 }}
                >
                  {h.toString().padStart(2, '0')}:00
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex">{daysToRender.map(renderDayColumn)}</div>
        </div>
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    )
  }

  const headerLabel =
    view === 'day'
      ? format(selectedDate, "dd 'de' MMMM, yyyy", { locale: ptBR })
      : view === 'week'
        ? `${format(startOfWeek(selectedDate, { weekStartsOn: 0 }), 'dd MMM', { locale: ptBR })} - ${format(endOfWeek(selectedDate, { weekStartsOn: 0 }), 'dd MMM, yyyy', { locale: ptBR })}`
        : format(selectedDate, "MMMM 'de' yyyy", { locale: ptBR })

  return (
    <div className="h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] flex flex-col space-y-4 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight hidden md:block">Agenda</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
              Hoje
            </Button>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="size-8" onClick={navigatePrev}>
                <ChevronLeft className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-8" onClick={navigateNext}>
                <ChevronRight className="size-4" />
              </Button>
            </div>
            <span className="text-base font-medium capitalize ml-2">{headerLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
          <Tabs
            value={view}
            onValueChange={(v) => setView(v as any)}
            className="w-[200px] shrink-0"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="day">Dia</TabsTrigger>
              <TabsTrigger value="week">Sem</TabsTrigger>
              <TabsTrigger value="month">Mês</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={() => handleOpen()} className="gap-2 shrink-0">
            <Plus className="size-4" /> <span className="hidden sm:inline">Agendar</span>
          </Button>
        </div>
      </div>

      {view === 'month' ? renderMonthView() : renderGrid()}

      {/* CREATE APPOINTMENT DIALOG */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Cliente</Label>
              <div className="flex gap-2">
                <Popover open={clientSearchOpen} onOpenChange={setClientSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="flex-1 justify-between">
                      {form.client_id
                        ? data.clients.find((c) => c.id === form.client_id)?.name
                        : 'Buscar cliente...'}
                      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[380px] p-0" style={{ zIndex: 9999 }}>
                    <Command>
                      <CommandInput placeholder="Buscar nome ou telefone..." />
                      <CommandList>
                        <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                        <CommandGroup>
                          {data.clients.map((c) => (
                            <CommandItem
                              key={c.id}
                              value={`${c.name} ${c.phone}`}
                              onSelect={() => {
                                setForm({ ...form, client_id: c.id })
                                setClientSearchOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 size-4',
                                  form.client_id === c.id ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              {c.name} {c.surname || ''} ({c.phone})
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  onClick={() => {
                    setNewClient({ name: '', phone: '' })
                    setNewClientDialogOpen(true)
                  }}
                  title="Novo Cliente"
                  type="button"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>

            {clientPkgs.length > 0 && (
              <div className="text-xs bg-amber-500/10 text-amber-600 p-2 rounded flex items-center font-medium">
                <Check className="size-3 mr-1" /> Pacote Ativo Encontrado! Use-o abaixo.
              </div>
            )}

            <div className="space-y-2">
              <Label>Serviço ou Pacote</Label>
              <Select value={form.item_id} onValueChange={(v) => setForm({ ...form, item_id: v })}>
                <SelectTrigger className={clientPkgs.length > 0 ? 'border-amber-400' : ''}>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {clientPkgs.length > 0 && (
                    <SelectGroup>
                      <SelectLabel className="text-amber-500 font-bold">
                        Pacotes do Cliente
                      </SelectLabel>
                      {clientPkgs.map((p) => (
                        <SelectItem key={`pkg_${p.id}`} value={`pkg_${p.id}`}>
                          {p.expand?.package_id?.name} (Restam: {p.remaining_uses})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                  <SelectGroup>
                    <SelectLabel>Serviços Avulsos</SelectLabel>
                    {data.services.map((s) => (
                      <SelectItem key={`svc_${s.id}`} value={`svc_${s.id}`}>
                        {s.name} - R${s.price}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 flex flex-col">
                <Label>Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !form.date && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {form.date ? (
                        format(form.date, 'dd/MM/yyyy', { locale: ptBR })
                      ) : (
                        <span>Selecione</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" style={{ zIndex: 9999 }}>
                    <Calendar
                      mode="single"
                      selected={form.date}
                      onSelect={(d: Date | undefined) => d && setForm({ ...form, date: d })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Horário</Label>
                <Select value={form.time} onValueChange={(v) => setForm({ ...form, time: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {timeSlots.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Profissional</Label>
              <Select
                value={form.barber_id}
                onValueChange={(v) => setForm({ ...form, barber_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {data.barbers.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleBooking} className="w-full">
              Confirmar Agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* NEW CLIENT DIALOG */}
      <Dialog open={newClientDialogOpen} onOpenChange={setNewClientDialogOpen}>
        <DialogContent className="max-w-sm" style={{ zIndex: 10000 }}>
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                placeholder="Nome do cliente"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Celular</Label>
              <Input
                placeholder="(00) 00000-0000"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleClientCreate} className="w-full">
              Salvar Cliente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* VIEW/EDIT APPOINTMENT DIALOG */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{isEditMode ? 'Editar Agendamento' : 'Detalhes do Agendamento'}</span>
              {!isEditMode && (
                <Button variant="ghost" size="icon" onClick={() => setIsEditMode(true)}>
                  <Edit2 className="size-4" />
                </Button>
              )}
            </DialogTitle>
            {!isEditMode && selectedApt && (
              <DialogDescription>Informações do atendimento agendado.</DialogDescription>
            )}
          </DialogHeader>

          {selectedApt && (
            <div className="py-4">
              {!isEditMode ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <User className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cliente</p>
                      <p className="font-medium text-lg">{selectedApt.expand?.client_id?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Scissors className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Serviço / Profissional</p>
                      <p className="font-medium">
                        {selectedApt.expand?.service_id?.name} com{' '}
                        {selectedApt.expand?.barber_id?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <CalendarDays className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data e Hora</p>
                      <p className="font-medium">
                        {selectedApt.date ? format(new Date(selectedApt.date), 'dd/MM/yyyy') : ''} •{' '}
                        {selectedApt.time} às {selectedApt.end_time || '--:--'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Clock className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
                          selectedApt.status === 'Concluído'
                            ? 'bg-green-100 text-green-800'
                            : selectedApt.status === 'Cancelado'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800',
                        )}
                      >
                        {selectedApt.status}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profissional</Label>
                    <Select
                      value={editForm.barber_id}
                      onValueChange={(v) => setEditForm({ ...editForm, barber_id: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o profissional" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.barbers.map((b) => (
                          <SelectItem key={b.id} value={b.id}>
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Serviço</Label>
                    <Select
                      value={editForm.service_id}
                      onValueChange={(v) => setEditForm({ ...editForm, service_id: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.services.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 flex flex-col">
                      <Label>Data</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !editForm.date && 'text-muted-foreground',
                            )}
                          >
                            <CalendarIcon className="mr-2 size-4" />
                            {editForm.date ? (
                              format(editForm.date, 'dd/MM/yyyy', { locale: ptBR })
                            ) : (
                              <span>Selecione</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" style={{ zIndex: 9999 }}>
                          <Calendar
                            mode="single"
                            selected={editForm.date}
                            onSelect={(d) => d && setEditForm({ ...editForm, date: d })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Início</Label>
                      <Select
                        value={editForm.time}
                        onValueChange={(v) => setEditForm({ ...editForm, time: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          {timeSlots.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Fim</Label>
                      <Select
                        value={editForm.end_time}
                        onValueChange={(v) => setEditForm({ ...editForm, end_time: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          {timeSlots.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={editForm.status}
                        onValueChange={(v) => setEditForm({ ...editForm, status: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Confirmado">Confirmado</SelectItem>
                          <SelectItem value="Concluído">Concluído</SelectItem>
                          <SelectItem value="Cancelado">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="sm:justify-end gap-2">
            {isEditMode ? (
              <>
                <Button variant="outline" onClick={() => setIsEditMode(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleUpdateBooking}>Salvar Alterações</Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setDetailOpen(false)}>
                Fechar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
