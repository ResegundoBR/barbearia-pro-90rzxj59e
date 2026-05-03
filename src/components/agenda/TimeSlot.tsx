import { Appointment } from '@/stores/main'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Clock } from 'lucide-react'

interface TimeSlotProps {
  time: string
  barberId: string
  appointment?: Appointment
  customerName?: string
}

export function TimeSlot({ time, barberId, appointment, customerName }: TimeSlotProps) {
  if (appointment) {
    const isCompleted = appointment.status === 'Concluído'
    const isPending = appointment.status === 'Pendente'

    return (
      <div
        className={cn(
          'h-24 rounded-md p-2 flex flex-col justify-between border cursor-pointer transition-colors shadow-sm',
          isCompleted
            ? 'bg-muted/50 border-border'
            : 'bg-card border-l-4 hover:bg-muted/30 border-l-primary',
        )}
      >
        <div className="flex justify-between items-start">
          <div className="font-medium text-sm truncate pr-2" title={customerName}>
            {customerName}
          </div>
          <span className="text-xs text-muted-foreground flex-shrink-0 flex items-center gap-1">
            <Clock className="size-3" /> {time}
          </span>
        </div>
        <div className="text-xs text-muted-foreground truncate">{appointment.service}</div>
        <div className="mt-1">
          <Badge
            variant={isCompleted ? 'outline' : isPending ? 'secondary' : 'default'}
            className={cn(
              'text-[10px] px-1.5 py-0',
              isPending && 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30',
            )}
          >
            {appointment.status}
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <div className="h-24 border border-dashed rounded-md p-2 relative group hover:border-primary/50 hover:bg-muted/10 transition-colors flex flex-col justify-center items-center">
      <span className="text-xs text-muted-foreground absolute top-2 right-2">{time}</span>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs border border-primary/20 text-primary"
        >
          Agendar
        </Button>
      </div>
    </div>
  )
}
