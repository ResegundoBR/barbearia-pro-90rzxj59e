import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { UserPlus, Edit, Eye } from 'lucide-react'
import { getClients, createClient, updateClient } from '@/services/api'
import { useToast } from '@/hooks/use-toast'
import { phoneMask } from '@/lib/utils'
import { useRealtime } from '@/hooks/use-realtime'

const defForm = {
  name: '',
  surname: '',
  phone: '',
  email: '',
  birthday: '',
  location_type: 'nearby',
  is_active: true,
}

export default function Clientes() {
  const [clients, setClients] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<any>(defForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const { toast } = useToast()

  const loadData = async () => setClients(await getClients())
  useEffect(() => {
    loadData()
  }, [])
  useRealtime('clients', loadData)

  const openEdit = (c: any) => {
    setFormData({ ...c, is_active: c.is_active ?? true })
    setEditingId(c.id)
    setIsOpen(true)
  }

  const openNew = () => {
    setFormData(defForm)
    setEditingId(null)
    setIsOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) await updateClient(editingId, formData)
      else await createClient(formData)
      toast({ title: editingId ? 'Cliente atualizado!' : 'Cliente cadastrado com sucesso!' })
      setIsOpen(false)
    } catch (err) {
      toast({ title: 'Erro ao salvar', variant: 'destructive' })
    }
  }

  const toggleActive = async (id: string, current: boolean) => {
    await updateClient(id, { is_active: !current })
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Clientes (CRM)</h2>
          <p className="text-muted-foreground">Gerencie seus clientes e acompanhe histórico.</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <UserPlus className="size-4" /> Novo Cliente
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Editar Cliente' : 'Cadastrar Cliente'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Sobrenome</Label>
                <Input
                  value={formData.surname}
                  onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Celular</Label>
                <Input
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: phoneMask(e.target.value) })}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label>Nascimento</Label>
                <Input
                  type="date"
                  value={formData.birthday?.split('T')[0] || ''}
                  onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Localização</Label>
              <RadioGroup
                value={formData.location_type}
                onValueChange={(v) => setFormData({ ...formData, location_type: v })}
                className="grid grid-cols-2 gap-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="passage" id="r1" />
                  <Label htmlFor="r1">De Passagem</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nearby" id="r2" />
                  <Label htmlFor="r2">Mora Perto</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mora_cidade" id="r4" />
                  <Label htmlFor="r4">Mora Cidade</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other_city" id="r3" />
                  <Label htmlFor="r3">Outra Cidade</Label>
                </div>
              </RadioGroup>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full mt-4">
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Celular</TableHead>
                <TableHead className="text-center">Ativo</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((c) => (
                <TableRow key={c.id} className={c.is_active === false ? 'opacity-50' : ''}>
                  <TableCell className="font-medium">
                    {c.name} {c.surname}
                  </TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={c.is_active !== false}
                      onCheckedChange={() => toggleActive(c.id, c.is_active !== false)}
                    />
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(c)}>
                      <Edit className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/clientes/${c.id}`}>
                        <Eye className="size-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
