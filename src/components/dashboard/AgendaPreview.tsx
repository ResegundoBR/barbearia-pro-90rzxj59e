import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import useMainStore from '@/stores/main'
import { useMemo } from 'react'

export function AgendaPreview() {
  const { state } = useMainStore()

  const upcomingApts = useMemo(() => {
    return state.appointments
      .filter((a) => a.date === '2026-05-03' && a.status !== 'Concluído')
      .sort((a, b) => a.time.localeCompare(b.time))
      .slice(0, 5)
  }, [state.appointments])

  return (
    <Card className="col-span-1 animate-slide-up" style={{ animationDelay: '200ms' }}>
      <CardHeader>
        <CardTitle>Próximos Cortes</CardTitle>
        <CardDescription>Agendamentos restantes de hoje.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {upcomingApts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Nenhum agendamento futuro para hoje.
            </div>
          ) : (
            upcomingApts.map((apt) => {
              const customer = state.customers.find((c) => c.id === apt.customerId)
              const barber = state.barbers.find((b) => b.id === apt.barberId)

              return (
                <div key={apt.id} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${customer?.id}`}
                      alt="Avatar"
                    />
                    <AvatarFallback>{customer?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1 flex-1 overflow-hidden">
                    <p className="text-sm font-medium leading-none truncate">{customer?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {apt.service} • com {barber?.name.split(' ')[0]}
                    </p>
                  </div>
                  <div className="ml-auto text-right flex flex-col items-end gap-1">
                    <div className="font-medium text-sm">{apt.time}</div>
                    <Badge
                      variant={apt.status === 'Confirmado' ? 'default' : 'secondary'}
                      className="text-[10px] px-1.5 py-0"
                    >
                      {apt.status}
                    </Badge>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
