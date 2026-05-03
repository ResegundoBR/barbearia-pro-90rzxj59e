import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import useMainStore from '@/stores/main'
import { TimeSlot } from '@/components/agenda/TimeSlot'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus } from 'lucide-react'
import { TIER_LIMITS } from '@/lib/tiers'

// Generate times from 09:00 to 19:00, every 30 mins
const generateTimeSlots = () => {
  const slots = []
  for (let h = 9; h <= 19; h++) {
    const hr = h.toString().padStart(2, '0')
    slots.push(`${hr}:00`)
    if (h !== 19) slots.push(`${hr}:30`)
  }
  return slots
}

const timeSlots = generateTimeSlots()

export default function Agenda() {
  const { state } = useMainStore()

  const allowedBarbers = state.barbers.slice(0, TIER_LIMITS[state.tier].barbers)

  return (
    <div className="h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Agenda Diária</h2>
          <p className="text-muted-foreground text-sm">Domingo, 03 de Maio de 2026</p>
        </div>
        <Button className="gap-2 min-h-[44px]">
          <Plus className="size-4" />
          <span className="hidden sm:inline">Agendamento</span>
        </Button>
      </div>

      <ScrollArea className="flex-1 rounded-xl border bg-card/30 shadow-inner">
        <div className="flex gap-2 sm:gap-4 p-2 sm:p-4 min-w-max">
          <div className="w-16 shrink-0 flex flex-col gap-2 mt-[68px]">
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-24 flex items-start justify-end pr-2 pt-1 text-xs text-muted-foreground font-medium"
              >
                {time}
              </div>
            ))}
          </div>

          {allowedBarbers.map((barber) => (
            <div key={barber.id} className="w-[240px] sm:w-[280px] shrink-0 flex flex-col gap-2">
              <div className="sticky top-0 z-10 flex items-center justify-center gap-3 py-2 sm:py-3 px-4 bg-card/95 backdrop-blur rounded-md border shadow-sm mb-2">
                <Avatar className="size-8">
                  <AvatarImage src={barber.avatar} />
                  <AvatarFallback>{barber.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="font-semibold text-sm">{barber.name}</div>
              </div>

              {timeSlots.map((time) => {
                const apt = state.appointments.find(
                  (a) => a.barberId === barber.id && a.time === time && a.date === '2026-05-03',
                )
                const customerName = apt
                  ? state.customers.find((c) => c.id === apt.customerId)?.name
                  : undefined
                return (
                  <TimeSlot
                    key={time}
                    time={time}
                    barberId={barber.id}
                    appointment={apt}
                    customerName={customerName}
                  />
                )
              })}
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
