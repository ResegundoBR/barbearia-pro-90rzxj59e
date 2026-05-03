import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Plus, CalendarIcon, ChevronLeft, ChevronRight, Check, ChevronsUpDown } from 'lucide-react'
import {
  getBarbers,
  getAppointments,
  getClients,
  getServices,
  createAppointment,
  getClientPackages,
  consumePackage,
  createClient,
} from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'
import { format, addMinutes, addDays, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'

const SLOT_HEIGHT = 48

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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [form, setForm] = useState({ barber_id: '', client_id: '', item_id: '', time: '09:00' })
  const [clientSearchOpen, setClientSearchOpen] = useState(false)
  const [newClient, setNewClient] = useState({ name: '', phone: '' })
  const [isNewClient, setIsNewClient] = useState(false)

  const loadData = async () => {
    const dayStr = format(selectedDate, 'yyyy-MM-dd')
    const apts = await getAppointments(
      `date >= "${dayStr} 00:00:00" && date <= "${dayStr} 23:59:59"`,
    )
    setData({
      barbers: await getBarbers(),
      apts,
      clients: await getClients(),
      services: await getServices(),
      packages: await getClientPackages(),
    })
  }

  useEffect(() => {
    loadData()
  }, [selectedDate])
  useRealtime('appointments', loadData)

  const isAdmin = user?.access_level === 'Admin'
  const visibleBarbers = useMemo(
    () => (isAdmin ? data.barbers : data.barbers.filter((b) => b.name === user?.name)),
    [isAdmin, data.barbers, user],
  )

  const handleOpen = (time = '09:00', barberId = '') => {
    const defaultBarber = barberId || (isAdmin ? '' : visibleBarbers[0]?.id || '')
    setForm({ barber_id: defaultBarber, client_id: '', item_id: '', time })
    setIsOpen(true)
  }

  const handleClientCreate = async () => {
    try {
      const c = await createClient({ ...newClient, location_type: 'nearby', is_active: true })
      setData((prev) => ({ ...prev, clients: [c, ...prev.clients] }))
      setForm((f) => ({ ...f, client_id: c.id }))
      setIsNewClient(false)
      setClientSearchOpen(false)
      toast({ title: 'Cliente criado!' })
    } catch {
      toast({ title: 'Erro ao criar cliente', variant: 'destructive' })
    }
  }

  const handleBooking = async () => {
    if (!form.client_id) return toast({ title: 'Selecione um cliente', variant: 'destructive' })
    if (!form.item_id)
      return toast({ title: 'Selecione um serviço ou pacote', variant: 'destructive' })
    if (!form.barber_id)
      return toast({ title: 'Selecione um profissional', variant: 'destructive' })

    try {
      const isPkg = form.item_id.startsWith('pkg_')
      const id = form.item_id.replace('pkg_', '').replace('svc_', '')
      const activePackage = isPkg ? data.packages.find((p) => p.id === id) : null
      const svc = isPkg
        ? activePackage?.expand?.package_id?.expand?.service_id
        : data.services.find((s) => s.id === id)

      const duration =
        activePackage?.expand?.package_id?.duration_minutes || svc?.duration_minutes || 30
      const [h, m] = form.time.split(':').map(Number)
      const startDate = new Date()
      startDate.setHours(h, m, 0, 0)
      const end_time = format(addMinutes(startDate, duration), 'HH:mm')

      await createAppointment({
        barber_id: form.barber_id,
        client_id: form.client_id,
        service_id: svc?.id || form.item_id.replace('svc_', ''),
        time: form.time,
        end_time,
        date: format(selectedDate, 'yyyy-MM-dd 12:00:00'),
        status: 'Confirmado',
        price: isPkg ? 0 : svc?.price || 0,
      })

      if (isPkg && activePackage) {
        await consumePackage(activePackage.id, { remaining_uses: activePackage.remaining_uses - 1 })
        toast({ title: 'Agendamento salvo. Usado 1 crédito.' })
      } else {
        toast({ title: 'Agendamento salvo!' })
      }
      setIsOpen(false)
      loadData()
    } catch (err: any) {
      toast({ title: 'Erro ao agendar', variant: 'destructive' })
    }
  }

  const timeSlots = Array.from({ length: 13 * 4 }, (_, i) => {
    const h = Math.floor(i / 4) + 8
    const m = (i % 4) * 15
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
  })

  const clientPkgs = data.packages.filter(
    (p) => p.client_id === form.client_id && p.remaining_uses > 0,
  )

  return (
    <div className="h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Agenda Diária</h2>
          <div className="flex items-center gap-2 mt-1">
            <Button
              variant="outline"
              size="icon"
              className="size-7"
              onClick={() => setSelectedDate(subDays(selectedDate, 1))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-7 text-xs min-w-[140px]">
                  <CalendarIcon className="mr-2 size-3" />
                  {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => d && setSelectedDate(d)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button
              variant="outline"
              size="icon"
              className="size-7"
              onClick={() => setSelectedDate(addDays(selectedDate, 1))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
        <Button onClick={() => handleOpen()} className="gap-2">
          <Plus className="size-4" /> Agendamento
        </Button>
      </div>

      <ScrollArea className="flex-1 rounded-xl border bg-card/30 shadow-inner">
        <div className="flex gap-2 sm:gap-4 p-2 sm:p-4 min-w-max">
          <div className="w-12 shrink-0 flex flex-col gap-1 mt-[56px] relative">
            {timeSlots
              .filter((t) => t.endsWith(':00'))
              .map((t) => (
                <div key={t} className="h-[192px] text-[10px] text-muted-foreground pt-1">
                  {t}
                </div>
              ))}
          </div>

          {visibleBarbers.map((barber) => (
            <div key={barber.id} className="w-[200px] sm:w-[240px] shrink-0 flex flex-col relative">
              <div
                className="sticky top-0 z-20 flex items-center justify-center gap-2 py-2 px-3 bg-card/95 backdrop-blur rounded-md border shadow-sm mb-1 h-[48px]"
                style={{
                  borderBottomColor: barber.color || 'hsl(var(--primary))',
                  borderBottomWidth: 3,
                }}
              >
                <Avatar className="size-6">
                  <AvatarFallback>{barber.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="font-semibold text-xs truncate">{barber.name}</div>
              </div>
              <div className="relative mt-1" style={{ height: timeSlots.length * SLOT_HEIGHT }}>
                {timeSlots.map((t, idx) => (
                  <div
                    key={`bg-${t}`}
                    onClick={() => handleOpen(t, barber.id)}
                    className="absolute w-full border-b border-dashed border-border/50 hover:bg-muted/20 cursor-pointer"
                    style={{ top: idx * SLOT_HEIGHT, height: SLOT_HEIGHT }}
                  />
                ))}

                {data.apts
                  .filter((a) => a.barber_id === barber.id && a.status !== 'Cancelado')
                  .map((apt) => {
                    const sIdx = timeSlots.indexOf(apt.time || '00:00')
                    if (sIdx === -1) return null
                    const [sH, sM] = (apt.time || '00:00').split(':').map(Number)
                    const [eH, eM] = (apt.end_time || apt.time || '00:00').split(':').map(Number)
                    const slots = Math.max(1, Math.ceil((eH * 60 + eM - (sH * 60 + sM)) / 15))
                    const top = sIdx * SLOT_HEIGHT
                    const height = slots * SLOT_HEIGHT
                    return (
                      <div
                        key={apt.id}
                        className="absolute w-full rounded-md p-2 flex flex-col justify-between shadow-sm z-10 overflow-hidden text-white"
                        style={{
                          top,
                          height,
                          backgroundColor: barber.color || 'hsl(var(--primary))',
                        }}
                      >
                        <div className="font-semibold text-xs truncate drop-shadow-md">
                          {apt.expand?.client_id?.name}
                        </div>
                        <span className="text-[10px] opacity-90 drop-shadow-md">
                          {apt.time} - {apt.end_time}
                        </span>
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Cliente</Label>
              <Popover open={clientSearchOpen} onOpenChange={setClientSearchOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" className="w-full justify-between">
                    {form.client_id
                      ? data.clients.find((c) => c.id === form.client_id)?.name
                      : 'Buscar cliente...'}
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" style={{ zIndex: 9999 }}>
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
                    <div className="p-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        onClick={() => setIsNewClient(true)}
                      >
                        <Plus className="size-4 mr-2" /> Novo Cliente
                      </Button>
                    </div>
                  </Command>
                </PopoverContent>
              </Popover>
              {isNewClient && (
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Nome"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  />
                  <Input
                    placeholder="Celular"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  />
                  <Button onClick={handleClientCreate}>Salvar</Button>
                </div>
              )}
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
                    {visibleBarbers.map((b) => (
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
            <Button onClick={handleBooking} className="w-full">
              Confirmar Agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
