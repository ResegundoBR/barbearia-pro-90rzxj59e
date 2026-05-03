import { useState, useEffect } from 'react'
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Plus, CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  getBarbers,
  getAppointments,
  getClients,
  getServices,
  createAppointment,
  getClientPackages,
  consumePackage,
  getBusinessHours,
} from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'
import { format, addMinutes, addDays, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'

const SLOT_HEIGHT = 56
const GAP = 4

const generateTimeSlots = (start = 8, end = 20) => {
  const slots = []
  for (let h = start; h <= end; h++) {
    const hr = h.toString().padStart(2, '0')
    slots.push(`${hr}:00`)
    if (h !== end) {
      slots.push(`${hr}:15`)
      slots.push(`${hr}:30`)
      slots.push(`${hr}:45`)
    }
  }
  return slots
}

export default function Agenda() {
  const { user } = useAuth()
  const [barbers, setBarbers] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [businessHours, setBusinessHours] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const { toast } = useToast()

  const [form, setForm] = useState({ barber_id: '', client_id: '', service_id: '', time: '09:00' })

  const loadData = async () => {
    const dayStr = format(selectedDate, 'yyyy-MM-dd')
    const apts = await getAppointments(
      `date >= "${dayStr} 00:00:00" && date <= "${dayStr} 23:59:59"`,
    )
    setAppointments(apts)
    setBarbers(await getBarbers())
    setClients(await getClients())
    setServices(await getServices())
    setPackages(await getClientPackages())
    setBusinessHours(await getBusinessHours())
  }

  useEffect(() => {
    loadData()
  }, [selectedDate])

  useRealtime('appointments', loadData)

  const handleSlotClick = (time: string, barberId: string) => {
    setForm({ ...form, time, barber_id: barberId })
    setIsOpen(true)
  }

  const handleBooking = async () => {
    try {
      const activePackage = packages.find(
        (p) =>
          p.client_id === form.client_id &&
          p.expand?.package_id?.service_id === form.service_id &&
          p.remaining_uses > 0,
      )

      const svc = services.find((s) => s.id === form.service_id)
      const duration = svc?.duration_minutes || 30

      const startParts = form.time.split(':')
      const startDate = new Date()
      startDate.setHours(parseInt(startParts[0]), parseInt(startParts[1]), 0, 0)
      const endDate = addMinutes(startDate, duration)
      const end_time = format(endDate, 'HH:mm')

      const newApt = {
        barber_id: form.barber_id,
        client_id: form.client_id,
        service_id: form.service_id,
        time: form.time,
        end_time: end_time,
        date: format(selectedDate, 'yyyy-MM-dd 12:00:00'),
        status: 'Confirmado',
        price: activePackage ? 0 : svc?.price || 0,
      }

      await createAppointment(newApt)
      if (activePackage) {
        await consumePackage(activePackage.id, { remaining_uses: activePackage.remaining_uses - 1 })
        toast({ title: 'Agendamento salvo. Usado 1 crédito.' })
      } else {
        toast({ title: 'Agendamento salvo!' })
      }
      setIsOpen(false)
      loadData()
    } catch (e) {
      toast({ title: 'Erro ao agendar', variant: 'destructive' })
    }
  }

  const isAdmin = user?.access_level === 'Admin'
  const visibleBarbers = isAdmin ? barbers : barbers.filter((b) => b.name === user?.name)

  const todayDayOfWeek = selectedDate.getDay().toString()
  const todayBH = businessHours.find((bh) => bh.day_of_week === todayDayOfWeek && bh.is_active)

  const startHour = todayBH ? parseInt(todayBH.open_time.split(':')[0]) : 8
  const endHour = todayBH ? parseInt(todayBH.close_time.split(':')[0]) : 20

  const timeSlots = generateTimeSlots(startHour, endHour)

  const isSlotFree = (barberId: string, time: string) => {
    return !appointments.some((a) => {
      if (a.barber_id !== barberId || a.status === 'Cancelado') return false
      const s = a.time || '00:00'
      const e = a.end_time || a.time || '00:00'
      return time >= s && time < e
    })
  }

  return (
    <div className="h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center shrink-0 gap-4">
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
                <Button
                  variant="outline"
                  className="h-7 text-xs font-medium min-w-[140px] justify-center"
                >
                  <CalendarIcon className="mr-2 size-3" />
                  {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
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
        <Button
          onClick={() => {
            setForm({ ...form, time: `${startHour.toString().padStart(2, '0')}:00` })
            setIsOpen(true)
          }}
          className="gap-2"
        >
          <Plus className="size-4" /> Agendamento
        </Button>
      </div>

      <ScrollArea className="flex-1 rounded-xl border bg-card/30 shadow-inner">
        <div className="flex gap-2 sm:gap-4 p-2 sm:p-4 min-w-max">
          <div className="w-12 shrink-0 flex flex-col gap-1 mt-[56px] relative">
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-14 flex items-start justify-end pr-2 pt-1 text-[10px] text-muted-foreground font-medium"
              >
                {time.endsWith(':00') ? time : time.split(':')[1]}
              </div>
            ))}
          </div>

          {visibleBarbers.map((barber) => (
            <div key={barber.id} className="w-[200px] sm:w-[240px] shrink-0 flex flex-col relative">
              <div className="sticky top-0 z-20 flex items-center justify-center gap-2 py-2 px-3 bg-card/95 backdrop-blur rounded-md border shadow-sm mb-1 h-[48px]">
                <Avatar className="size-6">
                  <AvatarFallback>{barber.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="font-semibold text-xs truncate">{barber.name}</div>
              </div>

              <div
                className="relative mt-1"
                style={{ height: timeSlots.length * (SLOT_HEIGHT + GAP) }}
              >
                {timeSlots.map((time, idx) => (
                  <div
                    key={`bg-${time}`}
                    onClick={() => isSlotFree(barber.id, time) && handleSlotClick(time, barber.id)}
                    className={cn(
                      'absolute w-full border border-dashed rounded-md flex items-center justify-center group cursor-pointer transition-colors',
                      isSlotFree(barber.id, time)
                        ? 'hover:border-primary/50 hover:bg-muted/10'
                        : 'opacity-0 pointer-events-none',
                    )}
                    style={{ top: idx * (SLOT_HEIGHT + GAP), height: SLOT_HEIGHT }}
                  >
                    <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 absolute top-1 right-1">
                      {time}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-[10px] border border-primary/20 text-primary opacity-0 group-hover:opacity-100 pointer-events-none"
                    >
                      Agendar
                    </Button>
                  </div>
                ))}

                {appointments
                  .filter((a) => a.barber_id === barber.id && a.status !== 'Cancelado')
                  .map((apt) => {
                    const startIdx = timeSlots.indexOf(apt.time || '00:00')
                    if (startIdx === -1) return null

                    const duration = apt.expand?.service_id?.duration_minutes || 30
                    const slotsSpanned = Math.max(1, Math.ceil(duration / 15))

                    const top = startIdx * (SLOT_HEIGHT + GAP)
                    const height = slotsSpanned * SLOT_HEIGHT + (slotsSpanned - 1) * GAP
                    const isCompleted = apt.status === 'Concluído'
                    const isPending = apt.status === 'Pendente' || apt.status === 'Confirmado'

                    return (
                      <div
                        key={apt.id}
                        className={cn(
                          'absolute w-full rounded-md p-2 flex flex-col justify-between border shadow-sm z-10 overflow-hidden',
                          isCompleted
                            ? 'bg-muted/90 border-border text-muted-foreground'
                            : 'bg-card border-l-4 border-l-primary hover:bg-muted/50',
                        )}
                        style={{ top, height }}
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <div
                              className="font-semibold text-xs truncate"
                              title={apt.expand?.client_id?.name}
                            >
                              {apt.expand?.client_id?.name || 'Cliente Oculto'}
                            </div>
                            <span className="text-[10px] opacity-70 shrink-0 font-medium">
                              {apt.time} - {apt.end_time || ''}
                            </span>
                          </div>
                          <div className="text-[10px] opacity-80 truncate mt-0.5">
                            {apt.expand?.service_id?.name || 'Serviço'}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <span
                            className={cn(
                              'text-[9px] px-1.5 py-0.5 rounded-full',
                              isCompleted
                                ? 'bg-secondary text-secondary-foreground'
                                : isPending
                                  ? 'bg-amber-500/20 text-amber-500'
                                  : 'bg-primary/20 text-primary',
                            )}
                          >
                            {apt.status}
                          </span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}

          {visibleBarbers.length === 0 && (
            <div className="flex items-center justify-center w-full text-muted-foreground text-sm">
              Nenhum profissional disponível para visualização.
            </div>
          )}
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
              <Label>Horário Inicial</Label>
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
            <div className="space-y-2">
              <Label>Cliente</Label>
              <Select
                value={form.client_id}
                onValueChange={(v) => setForm({ ...form, client_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} {c.surname || ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Serviço</Label>
              <Select
                value={form.service_id}
                onValueChange={(v) => setForm({ ...form, service_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name} ({s.duration_minutes || 30} min)
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
    </div>
  )
}
