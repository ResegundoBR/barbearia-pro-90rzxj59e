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
import { Plus, Edit } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function ServicesTab() {
  const [items, setItems] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [form, setForm] = useState<any>({
    name: '',
    price: '',
    category_id: '',
    duration_minutes: 30,
    is_active: true,
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const { toast } = useToast()

  const loadData = async () => {
    const records = await pb
      .collection('services')
      .getFullList({ sort: '-created', expand: 'category_id' })
    setItems(records)
    const cats = await pb
      .collection('categories')
      .getFullList({ filter: "type='service'", sort: 'name' })
    setCategories(cats)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleOpen = (item?: any) => {
    if (item) {
      setForm({ ...item, category_id: item.category_id || 'none' })
      setEditingId(item.id)
    } else {
      setForm({ name: '', price: '', category_id: 'none', duration_minutes: 30, is_active: true })
      setEditingId(null)
    }
    setIsOpen(true)
  }

  const handleSave = async () => {
    try {
      const data = {
        ...form,
        category_id: form.category_id === 'none' ? '' : form.category_id,
        price: Number(form.price),
        duration_minutes: Number(form.duration_minutes),
      }
      if (editingId) {
        await pb.collection('services').update(editingId, data)
        toast({ title: 'Serviço atualizado com sucesso!' })
      } else {
        await pb.collection('services').create(data)
        toast({ title: 'Serviço criado com sucesso!' })
      }
      setIsOpen(false)
      loadData()
    } catch (err) {
      toast({ title: 'Erro ao salvar', variant: 'destructive' })
    }
  }

  const toggleActive = async (id: string, current: boolean) => {
    try {
      await pb.collection('services').update(id, { is_active: !current })
      loadData()
    } catch (err) {
      toast({ title: 'Erro ao atualizar status', variant: 'destructive' })
    }
  }

  const filteredItems = items.filter(
    (item) => filterCategory === 'all' || item.category_id === filterCategory,
  )

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-lg font-semibold">Catálogo de Serviços</h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Todas Categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Categorias</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => handleOpen()} className="w-full sm:w-auto">
            <Plus className="size-4 mr-2" /> Novo Serviço
          </Button>
        </div>
      </div>
      <Card className="border-none shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Categoria / Comissão (%)</TableHead>
                <TableHead>Duração (min)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id} className={!item.is_active ? 'opacity-60' : ''}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>R$ {item.price?.toFixed(2)}</TableCell>
                  <TableCell>
                    {item.expand?.category_id ? (
                      <div className="flex items-center gap-2">
                        <span>{item.expand.category_id.name}</span>
                        <Badge variant="outline" className="text-[10px]">
                          {item.expand.category_id.commission_percentage}%
                        </Badge>
                      </div>
                    ) : (
                      <span>{item.commission_rate || 0}% (Legado)</span>
                    )}
                  </TableCell>
                  <TableCell>{item.duration_minutes} min</TableCell>
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
              {filteredItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    Nenhum serviço encontrado.
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
            <DialogTitle>{editingId ? 'Editar Serviço' : 'Novo Serviço'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ex: Corte Degradê"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preço (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="35.00"
                />
              </div>
              <div className="space-y-2">
                <Label>Categoria de Comissão</Label>
                <Select
                  value={form.category_id}
                  onValueChange={(v) => setForm({ ...form, category_id: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhuma</SelectItem>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name} ({c.commission_percentage}%)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duração (minutos)</Label>
                <Input
                  type="number"
                  value={form.duration_minutes}
                  onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })}
                  placeholder="30"
                />
              </div>
              <div className="flex items-center space-x-2 mt-8">
                <Switch
                  checked={form.is_active}
                  onCheckedChange={(c) => setForm({ ...form, is_active: c })}
                />
                <Label>Serviço Ativo</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSave} className="w-full sm:w-auto">
              Salvar Serviço
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
