import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import pb from '@/lib/pocketbase/client'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

export function CategoriasTab() {
  const [categories, setCategories] = useState<any[]>([])
  const [name, setName] = useState('')
  const [type, setType] = useState('service')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    pb.collection('categories')
      .getFullList({ sort: '-created' })
      .then(setCategories)
      .finally(() => setLoading(false))
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return toast.error('Nome é obrigatório')

    setSubmitting(true)
    try {
      const r = await pb.collection('categories').create({ name, type })
      setCategories([r, ...categories])
      setName('')
      toast.success('Categoria adicionada!')
    } catch {
      toast.error('Erro ao adicionar categoria.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente remover esta categoria?')) return
    try {
      await pb.collection('categories').delete(id)
      setCategories((c) => c.filter((x) => x.id !== id))
      toast.success('Categoria removida')
    } catch {
      toast.error('Erro ao remover categoria.')
    }
  }

  if (loading)
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Carregando...</div>

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nova Categoria</CardTitle>
          <CardDescription>Cadastre categorias de serviços ou produtos.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="w-full sm:w-1/2 space-y-2">
              <label className="text-sm font-medium">Nome da Categoria</label>
              <Input
                placeholder="Ex: Cabelo, Barba, Pomadas..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-1/4 space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Serviço</SelectItem>
                  <SelectItem value="product">Produto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
              Adicionar
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categorias Cadastradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="w-[100px] text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                      Nenhuma categoria encontrada.
                    </TableCell>
                  </TableRow>
                )}
                {categories.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>{c.type === 'service' ? 'Serviço' : 'Produto'}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
