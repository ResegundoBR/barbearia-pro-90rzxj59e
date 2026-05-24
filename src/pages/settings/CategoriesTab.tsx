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
import { toast } from 'sonner'

export default function CategoriesTab() {
  const [categories, setCategories] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({ name: '', type: 'service', commission_percentage: 0 })

  const load = async () => {
    try {
      const data = await getCollection('categories')
      setCategories(data)
    } catch (error) {
      toast.error('Erro ao carregar categorias')
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        await updateRecord('categories', editingId, formData)
        toast.success('Categoria atualizada com sucesso')
      } else {
        await createRecord('categories', formData)
        toast.success('Categoria criada com sucesso')
      }
      setIsOpen(false)
      load()
    } catch (error) {
      toast.error('Erro ao salvar categoria')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir esta categoria?')) return
    try {
      await deleteRecord('categories', id)
      toast.success('Categoria excluída')
      load()
    } catch (error) {
      toast.error('Erro ao excluir categoria')
    }
  }

  const openEdit = (cat: any) => {
    setFormData({
      name: cat.name,
      type: cat.type,
      commission_percentage: cat.commission_percentage || 0,
    })
    setEditingId(cat.id)
    setIsOpen(true)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Categorias</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setFormData({ name: '', type: 'service', commission_percentage: 0 })
                setEditingId(null)
              }}
            >
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Editar Categoria' : 'Nova Categoria'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Nome da Categoria</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select
                  value={formData.type}
                  onValueChange={(v) => setFormData({ ...formData, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Serviço</SelectItem>
                    <SelectItem value="product">Produto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Comissão Padrão (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.commission_percentage}
                  onChange={(e) =>
                    setFormData({ ...formData, commission_percentage: Number(e.target.value) })
                  }
                />
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
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Comissão</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{cat.type === 'service' ? 'Serviço' : 'Produto'}</TableCell>
                <TableCell>{cat.commission_percentage}%</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(cat)}>
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(cat.id)}>
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
