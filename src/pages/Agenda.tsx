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
import { TimeSlot } from '@/components/agenda/TimeSlot'
import { Plus } from 'lucide-react'
import {
  getBarbers,
  getAppointments,
  getClients,
  getServices,
  createAppointment,
  getClientPackages,
  consumePackage,
} from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'
import { format } from 'date-fns'

const generateTimeSlots = () => {
  const slots = []
  for (let h = 8; h <= 20; h++) {
    const hr = h.toString().padStart(2, '0')
    slots.push(`${hr}:00`)
    if (h !== 20) {
      slots.push(`${hr}:15`)
      slots.push(`${hr}:30`)
      slots.push(`${hr}:45`)
    }
  }
  return slots
}
const timeSlots = generateTimeSlots()

export default function Agenda() {
  const [barbers, setBarbers] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const [form, setForm] = useState({ barber_id: '', client_id: '', service_id: '', time: '09:00' })

  const loadData = async () => {
    const today = format(new Date(), 'yyyy-MM-dd')
    const apts = await getAppointments(`date >= "${today} 00:00:00" && date <= "${today} 23:59:59"`)
    setAppointments(apts)
    setBarbers(await getBarbers())
    setClients(await getClients())
    setServices(await getServices())
    setPackages(await getClientPackages())
  }

  useEffect(() => {
    loadData()
  }, [])

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
      const newApt = {
        barber_id: form.barber_id,
        client_id: form.client_id,
        service_id: form.service_id,
        time: form.time,
        date: format(new Date(), 'yyyy-MM-dd 12:00:00'),
        status: 'Confirmado',
        price: activePackage ? 0 : svc?.price || 0,
      }

      await createAppointment(newApt)
      if (activePackage) {
        await consumePackage(activePackage.id, { remaining_uses: activePackage.remaining_uses - 1 })
        toast({ title: 'Agendamento salvo. Usado 1 crédito do pacote.' })
      } else {
        toast({ title: 'Agendamento salvo!' })
      }
      setIsOpen(false)
      loadData()
    } catch (e) {
      toast({ title: 'Erro ao agendar', variant: 'destructive' })
    }
  }

  return (
    <div className="h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Agenda Diária</h2>
          <p className="text-muted-foreground text-sm">Hoje</p>
        </div>
        <Button onClick={() => setIsOpen(true)} className="gap-2">
          <Plus className="size-4" /> Agendamento
        </Button>
      </div>

      <ScrollArea className="flex-1 rounded-xl border bg-card/30 shadow-inner">
        <div className="flex gap-2 sm:gap-4 p-2 sm:p-4 min-w-max">
          <div className="w-12 shrink-0 flex flex-col gap-1 mt-[56px]">
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-14 flex items-start justify-end pr-2 pt-1 text-[10px] text-muted-foreground font-medium"
              >
                {time.endsWith(':00') ? time : time.split(':')[1]}
              </div>
            ))}
          </div>

          {barbers.map((barber) => (
            <div key={barber.id} className="w-[200px] sm:w-[240px] shrink-0 flex flex-col gap-1">
              <div className="sticky top-0 z-10 flex items-center justify-center gap-2 py-2 px-3 bg-card/95 backdrop-blur rounded-md border shadow-sm mb-1">
                <Avatar className="size-6">
                  <AvatarFallback>{barber.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="font-semibold text-xs truncate">{barber.name}</div>
              </div>
              {timeSlots.map((time) => {
                const apt = appointments.find((a) => a.barber_id === barber.id && a.time === time)
                return (
                  <TimeSlot
                    key={time}
                    time={time}
                    barberId={barber.id}
                    appointment={apt}
                    customerName={apt?.expand?.client_id?.name}
                    onSlotClick={handleSlotClick}
                  />
                )
              })}
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
                  {barbers.map((b) => (
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
                      {c.name}
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
                      {s.name}
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
