import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Edit } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'

export function PackagesTab() {
  const [items, setItems] = useState<any[]>([])
  const [services, setServices] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState<any>({
    name: '',
    quantity: 1,
    price: '',
    duration_minutes: 30,
    is_active: true,
    periodicity: 'semanal',
    service_id: '',
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const { toast } = useToast()

  const loadData = async () => {
    const pkgs = await pb
      .collection('packages')
      .getFullList({ sort: '-created', expand: 'service_id' })
    setItems(pkgs)
    const svcs = await pb.collection('services').getFullList({ sort: 'name' })
    setServices(svcs)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleOpen = (item?: any) => {
    if (item) {
      setForm({
        ...item,
        periodicity: item.periodicity || 'semanal',
        service_id: item.service_id || 'none',
      })
      setEditingId(item.id)
    } else {
      setForm({
        name: '',
        quantity: 1,
        price: '',
        duration_minutes: 30,
        is_active: true,
        periodicity: 'semanal',
        service_id: 'none',
      })
      setEditingId(null)
    }
    setIsOpen(true)
  }

  const handleSave = async () => {
    try {
      const data = {
        ...form,
        service_id: form.service_id === 'none' ? '' : form.service_id,
        price: Number(form.price),
        quantity: Number(form.quantity),
        duration_minutes: Number(form.duration_minutes),
      }
      if (editingId) {
        await pb.collection('packages').update(editingId, data)
        toast({ title: 'Pacote atualizado com sucesso!' })
      } else {
        await pb.collection('packages').create(data)
        toast({ title: 'Pacote criado com sucesso!' })
      }
      setIsOpen(false)
      loadData()
    } catch (err) {
      toast({ title: 'Erro ao salvar', variant: 'destructive' })
    }
  }

  const toggleActive = async (id: string, current: boolean) => {
    try {
      await pb.collection('packages').update(id, { is_active: !current })
      loadData()
    } catch (err) {
      toast({ title: 'Erro ao atualizar status', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Gestão de Pacotes</h3>
        <Button onClick={() => handleOpen()}>
          <Plus className="size-4 mr-2" /> Novo Pacote
        </Button>
      </div>
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Serviço Vinculado</TableHead>
                <TableHead>Qtd. Usos</TableHead>
                <TableHead>Period.</TableHead>
                <TableHead>Preço Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className={!item.is_active ? 'opacity-60' : ''}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.expand?.service_id?.name || '-'}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="capitalize">{item.periodicity || '-'}</TableCell>
                  <TableCell>R$ {item.price?.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={item.is_active}
                        onCheckedChange={() => toggleActive(item.id, item.is_active)}
                      />
                      <Badge
                        variant={item.is_active ? 'default' : 'secondary'}
                        className="text-[10px]"
                      >
                        {item.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpen(item)}>
                      <Edit className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    Nenhum pacote encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Pacote' : 'Novo Pacote'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome do Pacote</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Pacote 5 Cortes"
              />
            </div>
            <div className="space-y-2">
              <Label>Serviço Vinculado</Label>
              <Select
                value={form.service_id}
                onValueChange={(v) => setForm({ ...form, service_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nenhum</SelectItem>
                  {services.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Qtd. de Usos</Label>
                <Input
                  type="number"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  placeholder="5"
                />
              </div>
              <div className="space-y-2">
                <Label>Periodicidade</Label>
                <Select
                  value={form.periodicity}
                  onValueChange={(v) => setForm({ ...form, periodicity: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semanal">Semanal</SelectItem>
                    <SelectItem value="quinzenal">Quinzenal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preço Total (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="150.00"
                />
              </div>
              <div className="space-y-2">
                <Label>Duração Padrão (min)</Label>
                <Input
                  type="number"
                  value={form.duration_minutes}
                  onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })}
                  placeholder="30"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Switch
                checked={form.is_active}
                onCheckedChange={(c) => setForm({ ...form, is_active: c })}
              />
              <Label>Pacote Ativo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave} className="w-full sm:w-auto">
              Salvar Pacote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
