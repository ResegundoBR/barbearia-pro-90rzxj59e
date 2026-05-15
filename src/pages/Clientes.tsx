import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserPlus, Edit, Eye } from 'lucide-react'
import { getClients, createClient, updateClient, getBarbers } from '@/services/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RankingDashboard } from '@/components/RankingDashboard'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'
import { useAuth } from '@/hooks/use-auth'
import { usePermissions } from '@/hooks/use-permissions'

const applyPhoneMask = (v: string) => {
  if (!v) return ''
  let val = v.replace(/\D/g, '')
  if (val.length > 11) val = val.slice(0, 11)
  if (val.length > 10) return val.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3')
  if (val.length > 5) return val.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3')
  if (val.length > 2) return val.replace(/^(\d{2})(\d{0,5})/, '($1) $2')
  return val
}

const defForm = {
  name: '',
  surname: '',
  phone: '',
  phone_secondary: '',
  email: '',
  birthday: '',
  location_type: 'nearby',
  is_active: true,
  preferred_barber_id: '',
}

export default function Clientes() {
  const { user } = useAuth()
  const { hasAccess } = usePermissions()
  const [clients, setClients] = useState<any[]>([])
  const [barbers, setBarbers] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<any>(defForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const { toast } = useToast()

  const loadData = async () => {
    setClients(await getClients())
    setBarbers(await getBarbers())
  }

  useEffect(() => {
    loadData()
  }, [])
  useRealtime('clients', loadData)

  const loggedInBarber = barbers.find((b) => b.name === user?.name)

  const openEdit = (c: any) => {
    setFormData({
      ...c,
      is_active: c.is_active ?? true,
      phone_secondary: c.phone_secondary || '',
      preferred_barber_id: c.preferred_barber_id || '',
    })
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
      const payload = { ...formData }
      if (!editingId && loggedInBarber) {
        payload.created_by_id = loggedInBarber.id
      }

      if (!payload.preferred_barber_id || payload.preferred_barber_id === 'none') {
        payload.preferred_barber_id = ''
      }

      if (editingId) await updateClient(editingId, payload)
      else await createClient(payload)
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
        {hasAccess('action_delete') && (
          <Button onClick={openNew} className="gap-2">
            <UserPlus className="size-4" /> Novo Cliente
          </Button>
        )}
      </div>

      <Tabs defaultValue="lista">
        <TabsList className="mb-4">
          <TabsTrigger value="lista">Lista de Clientes</TabsTrigger>
          {(user?.access_level === 'Admin' || user?.access_level === 'Socio') && (
            <TabsTrigger value="ranking">Fidelidade e Rankings</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="lista" className="space-y-4 mt-0">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Editar Cliente' : 'Cadastrar Cliente'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome</Label>
                    <Input
                      required
                      className="min-h-[44px]"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sobrenome</Label>
                    <Input
                      className="min-h-[44px]"
                      value={formData.surname}
                      onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Celular Principal</Label>
                    <Input
                      required
                      className="min-h-[44px]"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: applyPhoneMask(e.target.value) })
                      }
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Celular Secundário</Label>
                    <Input
                      className="min-h-[44px]"
                      value={formData.phone_secondary}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone_secondary: applyPhoneMask(e.target.value),
                        })
                      }
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nascimento</Label>
                    <Input
                      type="date"
                      className="min-h-[44px]"
                      value={formData.birthday?.split('T')[0] || ''}
                      onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Profissional Preferido</Label>
                    <Select
                      value={formData.preferred_barber_id || 'none'}
                      onValueChange={(v) => setFormData({ ...formData, preferred_barber_id: v })}
                    >
                      <SelectTrigger className="min-h-[44px]">
                        <SelectValue placeholder="Nenhum" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Nenhum</SelectItem>
                        {barbers.map((b) => (
                          <SelectItem key={b.id} value={b.id}>
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Localização</Label>
                  <RadioGroup
                    value={formData.location_type}
                    onValueChange={(v) => setFormData({ ...formData, location_type: v })}
                    className="flex flex-wrap gap-4 mt-2"
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
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Contatos</TableHead>
                    <TableHead className="text-center">Ativo</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((c) => (
                    <TableRow key={c.id} className={c.is_active === false ? 'opacity-50' : ''}>
                      <TableCell>
                        <div className="font-medium text-base">
                          {c.name || 'Cliente sem nome'} {c.surname || ''}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                          {c.expand?.created_by_id && (
                            <div>
                              Cadastrado por:{' '}
                              <span className="font-medium">{c.expand.created_by_id.name}</span>
                            </div>
                          )}
                          {c.expand?.preferred_barber_id && (
                            <div>
                              Atendido por:{' '}
                              <span className="font-medium">
                                {c.expand.preferred_barber_id.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>{c.phone}</div>
                          {c.phone_secondary && (
                            <div className="text-sm text-muted-foreground">
                              {c.phone_secondary} (Sec)
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={c.is_active !== false}
                          onCheckedChange={() => toggleActive(c.id, c.is_active !== false)}
                          disabled={!hasAccess('action_delete')}
                        />
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {hasAccess('action_delete') && (
                          <Button variant="ghost" size="icon" onClick={() => openEdit(c)}>
                            <Edit className="size-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/clientes/${c.id}`}>
                            <Eye className="size-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {clients.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        Nenhum cliente cadastrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        {(user?.access_level === 'Admin' || user?.access_level === 'Socio') && (
          <TabsContent value="ranking" className="mt-0">
            <RankingDashboard />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
