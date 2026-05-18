import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn, getContrastColor } from '@/lib/utils'

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

    const datePart = appointment.date ? appointment.date.split(' ')[0] : ''
    const [y, m, d] = datePart.split('-').map(Number)
    const [sH, sM] = (appointment.time || '00:00').split(':').map(Number)
    const aptDateTime = new Date(y, m - 1, d, sH, sM)
    const isFuture = aptDateTime > new Date()
    const isPast = aptDateTime < new Date()
    const isMissed = isPast && !isCompleted && !isCanceled

    const barberColor = appointment.expand?.barber_id?.color || 'hsl(var(--primary))'
    const bgColor = isMissed ? '#000000' : isCompleted ? 'transparent' : barberColor
    const textColor = isCompleted ? 'inherit' : getContrastColor(bgColor)

    return (
      <div
        className={cn(
          'h-14 rounded-md p-2 flex justify-between items-center border cursor-pointer transition-all shadow-sm hover:scale-[1.02]',
          isCompleted ? 'bg-muted/50 border-border opacity-50' : 'border-black/5',
          !isCompleted && isCanceled && 'opacity-50 grayscale bg-muted/50',
        )}
        style={{
          backgroundColor: isCompleted || isCanceled ? undefined : bgColor,
          color: isCompleted || isCanceled ? undefined : textColor,
        }}
      >
        <div className="flex flex-col overflow-hidden">
          <div className="font-semibold text-sm truncate leading-tight" title={customerName}>
            {customerName}
          </div>
          <div className="text-xs truncate opacity-90 leading-tight mt-0.5">
            {appointment.expand?.service_id?.name || 'Serviço'}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 ml-2 shrink-0">
          <span className="text-xs font-medium opacity-90">{time}</span>
          <Badge
            variant={isCompleted ? 'outline' : isPending ? 'secondary' : 'default'}
            className={cn(
              'text-[9px] px-1.5 py-0 h-4 font-bold uppercase tracking-wider',
              isPending &&
                !isMissed &&
                !isCompleted &&
                !isCanceled &&
                'bg-amber-500 text-white hover:bg-amber-600 border-none',
              isMissed && 'bg-white text-black hover:bg-white/90 border-none',
              isCompleted && 'bg-emerald-100 text-emerald-800 border-emerald-200',
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
