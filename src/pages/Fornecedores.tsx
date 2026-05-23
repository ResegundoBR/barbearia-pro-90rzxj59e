import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Plus, Building2, ExternalLink, Clock, Upload } from 'lucide-react'
import { ImportDialog } from '@/components/ImportDialog'
import { Badge } from '@/components/ui/badge'
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
import { getInventoryPurchases } from '@/services/inventory_purchases'
import { phoneMask, cpfCnpjMask, getRowVal } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'

export default function Fornecedores() {
  const { user } = useAuth()
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [purchases, setPurchases] = useState<any[]>([])
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
  const [isImportOpen, setIsImportOpen] = useState(false)
  const { toast } = useToast()

  const handleImport = async (data: any[]) => {
    let success = 0
    let errorsCount = 0
    const errorsList: string[] = []

    const categoriesMap = new Map(categories.map((c) => [c.name.toLowerCase().trim(), c.id]))

    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      try {
        const name = getRowVal(row, ['nome', 'razao social'])
        const docRaw = getRowVal(row, ['documento', 'cpf/cnpj', 'cnpj', 'cpf'])
        const address = getRowVal(row, ['endereco', 'endereço'])
        const contact = getRowVal(row, ['contato', 'pessoa de contato'])
        const phoneRaw = getRowVal(row, ['telefone', 'fone', 'whatsapp', 'wpp', 'whatsapp/fone'])
        const catRaw = getRowVal(row, ['categoria'])

        if (!name) throw new Error('Nome é obrigatório')

        const document = docRaw.toString().replace(/\D/g, '')
        if (!document) throw new Error('CPF/CNPJ é obrigatório')

        let category_ids: string[] = []
        if (catRaw) {
          const catName = catRaw.trim()
          const lowerCat = catName.toLowerCase()
          if (categoriesMap.has(lowerCat)) {
            category_ids.push(categoriesMap.get(lowerCat)!)
          } else {
            const newCat = await pb.collection('categories').create({
              name: catName,
              type: 'product',
              organization_id: user?.organization_id || user?.expand?.organization_id?.id,
            })
            categoriesMap.set(lowerCat, newCat.id)
            category_ids.push(newCat.id)
          }
        }

        await pb.collection('suppliers').create({
          name,
          document,
          address,
          contact_person: contact,
          whatsapp: phoneRaw.toString().replace(/\D/g, ''),
          phone: phoneRaw.toString().replace(/\D/g, ''),
          category_id: category_ids,
          organization_id: user?.organization_id || user?.expand?.organization_id?.id,
        })

        success++
      } catch (err: any) {
        errorsCount++
        errorsList.push(`Linha ${i + 2}: ${err.message}`)
      }
    }

    if (success > 0) loadData()

    return { success, errors: errorsCount, errorsList }
  }

  const loadData = async () => {
    try {
      const [supData, catData, purData] = await Promise.all([
        pb.collection('suppliers').getFullList({ sort: 'name', expand: 'category_id' }),
        pb.collection('categories').getFullList({ filter: 'type="product"' }),
        getInventoryPurchases(),
      ])
      setSuppliers(supData)
      setCategories(catData)
      setPurchases(purData)
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
  useRealtime('inventory_purchases', loadData)

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
        <h2 className="text-2xl font-bold tracking-tight">Compras/Fornec.</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsImportOpen(true)}>
            <Upload className="size-4 mr-2" />
            Importar
          </Button>
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
      </div>

      <ImportDialog
        open={isImportOpen}
        onOpenChange={setIsImportOpen}
        title="Importar Fornecedores"
        onImport={handleImport}
      />

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
                      {purchases.some(
                        (p) => p.supplier_id === sup.id && p.status === 'pending',
                      ) && (
                        <Badge
                          variant="secondary"
                          className="bg-amber-500 text-white hover:bg-amber-600 border-0 ml-2 shadow-sm font-semibold tracking-wide"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          Compra Pendente
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{cpfCnpjMask(sup.document)}</TableCell>
                  <TableCell>
                    {sup.contact_person}
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {phoneMask(sup.whatsapp || sup.phone)}
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
                value={cpfCnpjMask(formData.document)}
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
                  value={phoneMask(formData.whatsapp)}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: phoneMask(e.target.value) })
                  }
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
