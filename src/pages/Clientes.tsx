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
import { UserPlus, Edit, Eye, Upload } from 'lucide-react'
import { getClients, createClient, updateClient, getBarbers } from '@/services/api'
import pb from '@/lib/pocketbase/client'
import { ImportDialog } from '@/components/ImportDialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RankingDashboard } from '@/components/RankingDashboard'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'
import { useAuth } from '@/hooks/use-auth'
import { usePermissions } from '@/hooks/use-permissions'
import { getContrastColor, phoneMask, getRowVal, parseImportDate } from '@/lib/utils'

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
  const [isImportOpen, setIsImportOpen] = useState(false)
  const { toast } = useToast()

  const handleImport = async (data: any[]) => {
    let success = 0
    let errors = 0
    const errorsList: string[] = []

    const barbersMap = new Map(barbers.map((b) => [b.name.toLowerCase().trim(), b.id]))

    for (let i = 0; i < data.length; i++) {
      const row = data[i]
      try {
        const name = getRowVal(row, ['nome'])
        const surname = getRowVal(row, ['sobrenome'])
        const phoneRaw = getRowVal(row, ['celular', 'telefone'])
        const phoneSecRaw = getRowVal(row, ['fone secundario', 'celular 2', 'telefone 2'])
        const birthRaw = getRowVal(row, ['nascimento', 'data de nascimento', 'aniversario'])
        const profRaw = getRowVal(row, ['profissional', 'barbeiro', 'atendente'])
        const locRaw = getRowVal(row, ['localizacao', 'local', 'localização'])

        if (!name) throw new Error('Nome é obrigatório')

        const cleanPhone = (p: string) => {
          const d = p.replace(/\D/g, '')
          return d.slice(0, 11)
        }

        let birthday = parseImportDate(birthRaw)

        let preferred_barber_id = ''
        if (profRaw) {
          const bId = barbersMap.get(profRaw.toLowerCase().trim())
          if (bId) {
            preferred_barber_id = bId
          } else {
            throw new Error(`Profissional "${profRaw}" não encontrado`)
          }
        }

        let location_type = 'nearby'
        const loc = locRaw.toLowerCase().trim()
        if (loc === 'de passagem') location_type = 'passage'
        else if (loc === 'mora perto') location_type = 'nearby'
        else if (loc === 'mora cidade') location_type = 'mora_cidade'
        else if (loc === 'outra cidade') location_type = 'other_city'

        const payload: any = {
          name,
          surname,
          phone: cleanPhone(phoneRaw),
          phone_secondary: cleanPhone(phoneSecRaw),
          location_type,
          is_active: true,
          organization_id: user?.organization_id || user?.expand?.organization_id?.id,
        }
        if (birthday) payload.birthday = birthday
        if (preferred_barber_id) payload.preferred_barber_id = preferred_barber_id
        if (loggedInBarber) payload.created_by_id = loggedInBarber.id

        await pb.collection('clients').create(payload)

        success++
      } catch (err: any) {
        errors++
        errorsList.push(`Linha ${i + 2}: ${err.message}`)
      }
    }

    if (success > 0) loadData()

    return { success, errors, errorsList }
  }

  const loadData = async () => {
    setClients(await getClients())
    setBarbers(await getBarbers())
  }

  useEffect(() => {
    loadData()
  }, [])
  useRealtime('clients', loadData)

  const loggedInBarber = barbers.find((b) => b.user_id === user?.id || b.name === user?.name)

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

  const [searchQuery, setSearchQuery] = useState('')
  const [barberFilter, setBarberFilter] = useState('all')

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      !searchQuery ||
      `${c.name} ${c.surname || ''}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.phone && c.phone.includes(searchQuery))
    const matchesBarber = barberFilter === 'all' || c.preferred_barber_id === barberFilter
    return matchesSearch && matchesBarber
  })

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 md:pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Clientes (CRM)</h2>
          <p className="text-muted-foreground">Gerencie seus clientes e acompanhe histórico.</p>
        </div>
        {hasAccess('action_delete') && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsImportOpen(true)} className="gap-2">
              <Upload className="size-4" /> Importar
            </Button>
            <Button onClick={openNew} className="gap-2">
              <UserPlus className="size-4" /> Novo Cliente
            </Button>
          </div>
        )}
      </div>

      <ImportDialog
        open={isImportOpen}
        onOpenChange={setIsImportOpen}
        title="Importar Clientes"
        onImport={handleImport}
      />

      <Tabs defaultValue="lista">
        <TabsList className="mb-4">
          <TabsTrigger value="lista">Lista de Clientes</TabsTrigger>
          {(user?.access_level === 'Admin' || user?.access_level === 'Socio') && (
            <TabsTrigger value="ranking">Fidelidade e Rankings</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="lista" className="space-y-4 mt-0">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
            <Input
              placeholder="Buscar por nome ou telefone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:max-w-sm"
            />
            <Select value={barberFilter} onValueChange={setBarberFilter}>
              <SelectTrigger className="w-full sm:max-w-[250px]">
                <SelectValue placeholder="Todos os profissionais" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os profissionais</SelectItem>
                {barbers.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

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
                        setFormData({ ...formData, phone: phoneMask(e.target.value) })
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
                          phone_secondary: phoneMask(e.target.value),
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
                  {filteredClients.map((c) => (
                    <TableRow key={c.id} className={c.is_active === false ? 'opacity-50' : ''}>
                      <TableCell>
                        <div className="font-medium text-base">
                          {c.name || 'Cliente sem nome'} {c.surname || ''}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                          {c.expand?.created_by_id && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-xs text-muted-foreground">Cadastrado por:</span>
                              <span className="font-medium text-xs text-muted-foreground">
                                {c.expand.created_by_id.name}
                              </span>
                            </div>
                          )}
                          {c.expand?.preferred_barber_id && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-xs text-muted-foreground">Atendido por:</span>
                              <span
                                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                style={{
                                  backgroundColor:
                                    c.expand.preferred_barber_id.color || 'hsl(var(--primary))',
                                  color: getContrastColor(
                                    c.expand.preferred_barber_id.color || 'hsl(var(--primary))',
                                  ),
                                }}
                              >
                                {c.expand.preferred_barber_id.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>{phoneMask(c.phone)}</div>
                          {c.phone_secondary && (
                            <div className="text-sm text-muted-foreground">
                              {phoneMask(c.phone_secondary)} (Sec)
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
                  {filteredClients.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                        Nenhum cliente encontrado.
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
