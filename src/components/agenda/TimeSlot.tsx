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

    return (
      <div
        className={cn(
          'h-14 rounded-md p-1.5 flex justify-between items-center border cursor-pointer transition-colors shadow-sm',
          isCompleted
            ? 'bg-muted/50 border-border'
            : 'bg-card border-l-4 hover:bg-muted/30 border-l-primary',
        )}
      >
        <div className="flex flex-col overflow-hidden">
          <div className="font-medium text-xs truncate" title={customerName}>
            {customerName}
          </div>
          <div className="text-[10px] text-muted-foreground truncate">
            {appointment.expand?.service_id?.name || 'Serviço'}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 ml-1 shrink-0">
          <span className="text-[10px] text-muted-foreground font-medium">{time}</span>
          <Badge
            variant={isCompleted ? 'outline' : isPending ? 'secondary' : 'default'}
            className={cn(
              'text-[8px] px-1 py-0 h-4',
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
