import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function NotificacoesTab() {
  const [rules, setRules] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    pb.collection('notification_rules')
      .getFullList()
      .then((res) => {
        setRules(res)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleUpdate = async (id: string, field: string, val: any) => {
    try {
      await pb.collection('notification_rules').update(id, { [field]: val })
      setRules((r) => r.map((x) => (x.id === id ? { ...x, [field]: val } : x)))
      toast.success('Regra de notificação atualizada.')
    } catch {
      toast.error('Erro ao atualizar notificação.')
    }
  }

  if (loading)
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Carregando...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regras de Notificação</CardTitle>
        <CardDescription>
          Configure como e quando os clientes e barbeiros são notificados.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evento</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Antecedência</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead className="text-right">Ativo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhuma regra.
                  </TableCell>
                </TableRow>
              )}
              {rules.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium capitalize whitespace-nowrap">
                    {r.event_type.replace(/_/g, ' ')}
                  </TableCell>
                  <TableCell className="uppercase">{r.channel}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      className="w-24"
                      value={r.timing_offset ?? 0}
                      onBlur={(e) => handleUpdate(r.id, 'timing_offset', Number(e.target.value))}
                      onChange={(e) =>
                        setRules((prev) =>
                          prev.map((x) =>
                            x.id === r.id ? { ...x, timing_offset: e.target.value } : x,
                          ),
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={r.timing_unit}
                      onValueChange={(v) => handleUpdate(r.id, 'timing_unit', v)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours_minutes">Horas/Minutos</SelectItem>
                        <SelectItem value="days">Dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch
                      checked={r.is_active}
                      onCheckedChange={(c) => handleUpdate(r.id, 'is_active', c)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
