import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getCollection, createRecord, updateRecord, deleteRecord } from '@/services/settings'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'

export default function NotificationsTab() {
  const [rules, setRules] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    event_type: '',
    is_active: true,
    timing_offset: 0,
    timing_unit: 'hours_minutes',
  })

  const load = async () => {
    try {
      const data = await getCollection('notification_rules')
      setRules(data)
    } catch (error) {
      toast.error('Erro ao carregar notificações')
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateRecord('notification_rules', editingId, formData)
      } else {
        await createRecord('notification_rules', formData)
      }
      toast.success('Notificação salva')
      setIsOpen(false)
      load()
    } catch (error) {
      toast.error('Erro ao salvar notificação')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir esta notificação?')) return
    try {
      await deleteRecord('notification_rules', id)
      toast.success('Notificação excluída')
      load()
    } catch (error) {
      toast.error('Erro ao excluir')
    }
  }

  const openEdit = (rule: any) => {
    setFormData({
      event_type: rule.event_type,
      is_active: rule.is_active,
      timing_offset: rule.timing_offset || 0,
      timing_unit: rule.timing_unit || 'hours_minutes',
    })
    setEditingId(rule.id)
    setIsOpen(true)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Regras de Notificação</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setFormData({
                  event_type: '',
                  is_active: true,
                  timing_offset: 0,
                  timing_unit: 'hours_minutes',
                })
                setEditingId(null)
              }}
            >
              Nova Regra
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Editar Regra' : 'Nova Regra'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Evento (ex: Lembrete de Agendamento)</Label>
                <Input
                  value={formData.event_type}
                  onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                  required
                />
              </div>
              <div className="flex items-center space-x-2 my-4">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(c) => setFormData({ ...formData, is_active: c })}
                />
                <Label>Notificação Ativa</Label>
              </div>
              <div className="space-y-2">
                <Label>Tempo Antes do Evento</Label>
                <Input
                  type="number"
                  value={formData.timing_offset}
                  onChange={(e) =>
                    setFormData({ ...formData, timing_offset: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Unidade de Tempo</Label>
                <Select
                  value={formData.timing_unit}
                  onValueChange={(v) => setFormData({ ...formData, timing_unit: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hours_minutes">Horas/Minutos</SelectItem>
                    <SelectItem value="days">Dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Salvar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Evento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Antecedência</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell>{rule.event_type}</TableCell>
                <TableCell>{rule.is_active ? 'Ativo' : 'Inativo'}</TableCell>
                <TableCell>
                  {rule.timing_offset} {rule.timing_unit === 'days' ? 'dias' : 'h/m'}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(rule)}>
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(rule.id)}>
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
