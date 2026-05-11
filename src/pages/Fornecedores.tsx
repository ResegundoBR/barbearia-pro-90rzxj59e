import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Plus, Building2, ExternalLink } from 'lucide-react'
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
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'
import { extractFieldErrors } from '@/lib/pocketbase/errors'
import { createCategory } from '@/services/categories'

const applyCpfCnpjMask = (value: string) => {
  const digits = value.replace(/\D/g, '')
  if (digits.length <= 11) {
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

export default function Fornecedores() {
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newCatName, setNewCatName] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    document: '',
    address: '',
    phone: '',
    whatsapp: '',
    contact_person: '',
    category_id: [] as string[],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const loadData = async () => {
    try {
      const [supData, catData] = await Promise.all([
        pb.collection('suppliers').getFullList({ sort: 'name', expand: 'category_id' }),
        pb.collection('categories').getFullList({ filter: 'type="product"' }),
      ])
      setSuppliers(supData)
      setCategories(catData)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useRealtime('suppliers', loadData)
  useRealtime('categories', loadData)

  const handleSave = async () => {
    setErrors({})
    try {
      const cleanDocument = formData.document.replace(/\D/g, '')
      await pb.collection('suppliers').create({
        ...formData,
        document: cleanDocument,
      })
      toast({ title: 'Fornecedor cadastrado' })
      setDialogOpen(false)
    } catch (err: any) {
      const fieldErrs = extractFieldErrors(err)
      if (Object.keys(fieldErrs).length > 0) {
        setErrors(fieldErrs)
      } else {
        toast({ title: 'Erro', description: err.message, variant: 'destructive' })
      }
    }
  }

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return
    try {
      const cat = await createCategory({ name: newCatName.trim(), type: 'product' })
      setCategories([...categories, cat])
      setFormData({ ...formData, category_id: [...formData.category_id, cat.id] })
      setNewCatName('')
    } catch (err) {
      toast({ title: 'Erro ao criar categoria', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Fornecedores</h2>
        <Button
          onClick={() => {
            setFormData({
              name: '',
              document: '',
              address: '',
              phone: '',
              whatsapp: '',
              contact_person: '',
              category_id: [],
            })
            setErrors({})
            setDialogOpen(true)
          }}
        >
          <Plus className="size-4 mr-2" />
          Novo Fornecedor
        </Button>
      </div>

      <div className="border rounded-md bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome / Razão Social</TableHead>
              <TableHead>CNPJ/CPF</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Categorias</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : suppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  Nenhum fornecedor cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              suppliers.map((sup) => (
                <TableRow key={sup.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Building2 className="size-4 text-muted-foreground" />
                      {sup.name}
                    </div>
                  </TableCell>
                  <TableCell>{applyCpfCnpjMask(sup.document)}</TableCell>
                  <TableCell>
                    {sup.contact_person}
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {sup.whatsapp || sup.phone}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {sup.expand?.category_id?.map((c: any) => (
                        <span
                          key={c.id}
                          className="text-[10px] bg-secondary px-1.5 py-0.5 rounded-full"
                        >
                          {c.name}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/fornecedores/${sup.id}`}>
                        <ExternalLink className="size-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Fornecedor</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Nome / Razão Social *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label>CPF / CNPJ *</Label>
              <Input
                value={applyCpfCnpjMask(formData.document)}
                onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                maxLength={18}
              />
              {errors.document && <p className="text-sm text-destructive">{errors.document}</p>}
            </div>
            <div className="space-y-2">
              <Label>Endereço</Label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Pessoa de Contato</Label>
                <Input
                  value={formData.contact_person}
                  onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp / Fone</Label>
                <Input
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <Label>Tipos de Produtos Fornecidos</Label>
              <div className="flex flex-wrap gap-3 border p-3 rounded-md mb-2 max-h-[150px] overflow-y-auto">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.category_id.includes(cat.id)}
                      onCheckedChange={(c) => {
                        if (c)
                          setFormData({
                            ...formData,
                            category_id: [...formData.category_id, cat.id],
                          })
                        else
                          setFormData({
                            ...formData,
                            category_id: formData.category_id.filter((id) => id !== cat.id),
                          })
                      }}
                    />
                    <span className="text-sm">{cat.name}</span>
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Nova categoria..."
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="h-8 text-sm"
                />
                <Button type="button" size="sm" variant="secondary" onClick={handleAddCategory}>
                  Adicionar
                </Button>
              </div>
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
