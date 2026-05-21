import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Trash2, Edit } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'
import { usePermissions } from '@/hooks/use-permissions'

export default function Financeiro() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [methods, setMethods] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', type: 'other', fee_percentage: 0, is_active: true })

  const loadMethods = async () => {
    try {
      const records = await pb.collection('payment_methods').getFullList({ sort: 'name' })
      setMethods(records)
    } catch (e) {
      console.error(e)
    }
  }

  const { hasAccess, isAdmin } = usePermissions()
  const canAccess = isAdmin || hasAccess('financeiro')

  useEffect(() => {
    if (canAccess) loadMethods()
  }, [user, canAccess])

  useRealtime(
    'payment_methods',
    () => {
      if (canAccess) loadMethods()
    },
    canAccess,
  )

  if (!canAccess) {
    return <div className="p-8 text-center text-muted-foreground">Acesso Restrito.</div>
  }

  const handleOpen = (m?: any) => {
    if (m) {
      setForm({
        name: m.name,
        type: m.type,
        fee_percentage: m.fee_percentage || 0,
        is_active: m.is_active,
      })
      setEditingId(m.id)
    } else {
      setForm({ name: '', type: 'other', fee_percentage: 0, is_active: true })
      setEditingId(null)
    }
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    try {
      const payload = {
        name: form.name,
        type: form.type,
        fee_percentage: Number(form.fee_percentage),
        is_active: form.is_active,
      }
      if (editingId) {
        await pb.collection('payment_methods').update(editingId, payload)
        toast({ title: 'Método atualizado!' })
      } else {
        await pb.collection('payment_methods').create(payload)
        toast({ title: 'Método criado!' })
      }
      setIsModalOpen(false)
      loadMethods()
    } catch (err) {
      toast({ title: 'Erro ao salvar', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Remover este método de pagamento?')) {
      try {
        await pb.collection('payment_methods').delete(id)
        toast({ title: 'Removido' })
        loadMethods()
      } catch (e) {
        toast({ title: 'Erro ao remover', variant: 'destructive' })
      }
    }
  }

  const handleToggleActive = async (id: string, active: boolean) => {
    try {
      await pb.collection('payment_methods').update(id, { is_active: active })
      loadMethods()
    } catch (e) {
      toast({ title: 'Erro ao atualizar', variant: 'destructive' })
    }
  }

  const typeLabels: Record<string, string> = {
    credit_card: 'Cartão de Crédito',
    debit_card: 'Cartão de Débito',
    pix: 'Pix',
    cash: 'Dinheiro',
    other: 'Outro',
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Financeiro</h2>
        <p className="text-muted-foreground">
          Gerencie métodos de pagamento, taxas de cartão e Pix.
        </p>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle>Métodos de Pagamento e Taxas</CardTitle>
            <CardDescription>
              Configure as taxas cobradas por cada método para dedução de comissões e repasses.
            </CardDescription>
          </div>
          <Button onClick={() => handleOpen()}>
            <Plus className="size-4 mr-2" /> Novo Método
          </Button>
        </CardHeader>
        <CardContent className="p-0 md:p-6 overflow-x-auto">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Taxa (%)</TableHead>
                <TableHead className="text-center">Ativo no Checkout</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {methods.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell>{typeLabels[m.type] || m.type}</TableCell>
                  <TableCell className="text-right">{m.fee_percentage}%</TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={m.is_active}
                      onCheckedChange={(c) => handleToggleActive(m.id, c)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpen(m)}>
                      <Edit className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(m.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {methods.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    Nenhum método cadastrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Método' : 'Novo Método'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome do Método</Label>
              <Input
                className="min-h-[44px]"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Cartão de Crédito - Visa"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                  <SelectTrigger className="min-h-[44px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
                    <SelectItem value="debit_card">Cartão de Débito</SelectItem>
                    <SelectItem value="pix">Pix</SelectItem>
                    <SelectItem value="cash">Dinheiro</SelectItem>
                    <SelectItem value="other">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Taxa / Fee (%)</Label>
                <Input
                  type="number"
                  className="min-h-[44px]"
                  min="0"
                  step="0.01"
                  value={form.fee_percentage}
                  onChange={(e) => setForm({ ...form, fee_percentage: Number(e.target.value) })}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                checked={form.is_active}
                onCheckedChange={(c) => setForm({ ...form, is_active: c })}
              />
              <Label>Ativo no Checkout</Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave} className="w-full sm:w-auto">
              Salvar Método
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
