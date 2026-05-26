import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import pb from '@/lib/pocketbase/client'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export function HorarioTab() {
  const [hours, setHours] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    pb.collection('business_hours')
      .getFullList()
      .then((res) => {
        const map = new Map(res.map((r) => [r.day_of_week, r]))
        const full = DAYS.map(
          (_, i) =>
            map.get(i.toString()) || {
              day_of_week: i.toString(),
              open_time: '09:00',
              close_time: '18:00',
              is_active: false,
            },
        )
        setHours(full)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleUpdate = (index: number, field: string, val: any) => {
    const updated = [...hours]
    updated[index] = { ...updated[index], [field]: val }
    setHours(updated)
  }

  const handleSaveAll = async () => {
    setLoading(true)
    try {
      for (const item of hours) {
        if (item.id) {
          await pb.collection('business_hours').update(item.id, item)
        } else {
          await pb.collection('business_hours').create(item)
        }
      }
      toast.success('Horários de funcionamento salvos!')
    } catch {
      toast.error('Erro ao salvar horários.')
    } finally {
      setLoading(false)
    }
  }

  if (loading && hours.length === 0)
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Carregando...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horário de Funcionamento</CardTitle>
        <CardDescription>
          Defina os dias e horários em que o estabelecimento está aberto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dia da Semana</TableHead>
                <TableHead>Aberto</TableHead>
                <TableHead>Abertura</TableHead>
                <TableHead>Fechamento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hours.map((h, i) => (
                <TableRow key={h.day_of_week}>
                  <TableCell className="font-medium whitespace-nowrap">{DAYS[i]}</TableCell>
                  <TableCell>
                    <Switch
                      checked={h.is_active}
                      onCheckedChange={(c) => handleUpdate(i, 'is_active', c)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="time"
                      className="min-w-[120px]"
                      value={h.open_time}
                      disabled={!h.is_active}
                      onChange={(e) => handleUpdate(i, 'open_time', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="time"
                      className="min-w-[120px]"
                      value={h.close_time}
                      disabled={!h.is_active}
                      onChange={(e) => handleUpdate(i, 'close_time', e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveAll} disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Salvar Alterações
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
