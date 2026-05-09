import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/services/categories'
import { useRealtime } from '@/hooks/use-realtime'
import { Plus, Pencil, Trash2 } from 'lucide-react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { extractFieldErrors } from '@/lib/pocketbase/errors'

export function CategoriasTab() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    type: 'product',
    commission_percentage: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const { toast } = useToast()

  const loadData = async () => {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('categories', () => {
    loadData()
  })

  const openDialog = (cat?: any) => {
    setErrors({})
    if (cat) {
      setEditingId(cat.id)
      setFormData({
        name: cat.name || '',
        type: cat.type || 'product',
        commission_percentage: cat.commission_percentage?.toString() || '',
      })
    } else {
      setEditingId(null)
      setFormData({
        name: '',
        type: 'product',
        commission_percentage: '',
      })
    }
    setDialogOpen(true)
  }

  const handleSave = async () => {
    setErrors({})
    try {
      const payload = {
        name: formData.name,
        type: formData.type,
        commission_percentage: formData.commission_percentage
          ? Number(formData.commission_percentage)
          : null,
      }
      if (editingId) {
        await updateCategory(editingId, payload)
        toast({ title: 'Categoria atualizada' })
      } else {
        await createCategory(payload)
        toast({ title: 'Categoria criada' })
      }
      setDialogOpen(false)
    } catch (err: any) {
      const fieldErrs = extractFieldErrors(err)
      if (Object.keys(fieldErrs).length > 0) {
        setErrors(fieldErrs)
      } else {
        toast({ title: 'Erro ao salvar', description: err.message, variant: 'destructive' })
      }
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir esta categoria?')) return
    try {
      await deleteCategory(id)
      toast({ title: 'Categoria excluída' })
    } catch (err: any) {
      toast({ title: 'Erro ao excluir', description: err.message, variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Listagem de Categorias</h2>
        <Button onClick={() => openDialog()}>
          <Plus className="size-4 mr-2" />
          Nova Categoria
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Comissão (%)</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                  Nenhuma categoria encontrada.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-medium">{cat.name}</TableCell>
                  <TableCell>{cat.type === 'service' ? 'Serviço' : 'Produto'}</TableCell>
                  <TableCell>{cat.commission_percentage ?? '-'}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => openDialog(cat)}>
                      <Pencil className="size-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(cat.id)}>
                      <Trash2 className="size-4 text-destructive/80 hover:text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Categoria' : 'Nova Categoria'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Cabelo, Barba, Pomadas..."
              />
              {errors.name && <p className="text-sm text-destructive font-medium">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label>Tipo *</Label>
              <Select
                value={formData.type}
                onValueChange={(v) => setFormData({ ...formData, type: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product">Produto</SelectItem>
                  <SelectItem value="service">Serviço</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-sm text-destructive font-medium">{errors.type}</p>}
            </div>
            <div className="space-y-2">
              <Label>Porcentagem de Comissão (%)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="Ex: 50"
                value={formData.commission_percentage}
                onChange={(e) =>
                  setFormData({ ...formData, commission_percentage: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                Comissão padrão aplicada aos itens desta categoria.
              </p>
              {errors.commission_percentage && (
                <p className="text-sm text-destructive font-medium">
                  {errors.commission_percentage}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
