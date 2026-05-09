import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface TimeSlotProps {
  time: string
  barberId: string
  appointment?: any
  customerName?: string
  onSlotClick?: (time: string, barberId: string) => void
}

export function TimeSlot({
  time,
  barberId,
  appointment,
  customerName,
  onSlotClick,
}: TimeSlotProps) {
  if (appointment) {
    const isCompleted = appointment.status === 'Concluído'
    const isPending = appointment.status === 'Pendente' || appointment.status === 'Confirmado'
    const isCanceled = appointment.status === 'Cancelado'

    const aptDate = appointment.date ? new Date(appointment.date) : new Date()
    const [sH, sM] = (appointment.time || '00:00').split(':').map(Number)
    const aptDateTime = new Date(
      aptDate.getFullYear(),
      aptDate.getMonth(),
      aptDate.getDate(),
      sH,
      sM,
    )
    const isFuture = aptDateTime > new Date()
    const isPast = aptDateTime < new Date()
    const isMissed = isPast && !isCompleted && !isCanceled

    return (
      <div
        className={cn(
          'h-14 rounded-md p-1.5 flex justify-between items-center border cursor-pointer transition-colors shadow-sm',
          isMissed
            ? 'bg-black text-white border-black'
            : isCompleted && !isFuture
              ? 'bg-muted/50 border-border opacity-25'
              : 'bg-card border-l-4 hover:bg-muted/30 border-l-primary',
          isCanceled && !isFuture && 'opacity-50 grayscale',
        )}
      >
        <div className="flex flex-col overflow-hidden">
          <div
            className={cn('font-medium text-xs truncate', isMissed && 'text-white')}
            title={customerName}
          >
            {customerName}
          </div>
          <div
            className={cn(
              'text-[10px] truncate',
              isMissed ? 'text-white/80' : 'text-muted-foreground',
            )}
          >
            {appointment.expand?.service_id?.name || 'Serviço'}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 ml-1 shrink-0">
          <span
            className={cn(
              'text-[10px] font-medium',
              isMissed ? 'text-white' : 'text-muted-foreground',
            )}
          >
            {time}
          </span>
          <Badge
            variant={isCompleted ? 'outline' : isPending ? 'secondary' : 'default'}
            className={cn(
              'text-[8px] px-1 py-0 h-4',
              isPending && !isMissed && 'bg-amber-500/20 text-amber-500 hover:bg-amber-500/30',
              isMissed && 'bg-white/20 text-white hover:bg-white/30',
            )}
          >
            {appointment.status}
          </Badge>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={() => onSlotClick && onSlotClick(time, barberId)}
      className="h-14 border border-dashed rounded-md p-1 relative group hover:border-primary/50 hover:bg-muted/10 transition-colors flex justify-center items-center cursor-pointer"
    >
      <span className="text-[10px] text-muted-foreground absolute top-1 right-1 opacity-50 group-hover:opacity-100 transition-opacity">
        {time}
      </span>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-[10px] border border-primary/20 text-primary pointer-events-none"
        >
          Agendar
        </Button>
      </div>
    </div>
  )
}
