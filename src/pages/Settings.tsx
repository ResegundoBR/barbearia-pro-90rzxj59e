import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { Badge } from '@/components/ui/badge'

export default function Settings() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [logoConfigId, setLogoConfigId] = useState<string>('')
  const [logoPreview, setLogoPreview] = useState<string>('')
  const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null)

  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [editingNotifId, setEditingNotifId] = useState<string | null>(null)
  const [notifForm, setNotifForm] = useState({
    event_type: 'new_appointment',
    recipients: [] as string[],
    channel: 'internal',
    timing_unit: 'hours_minutes',
    timing_hours: 0,
    timing_minutes: 0,
    timing_days: 0,
    is_active: true,
  })

  const loadData = async () => {
    try {
      const sett = await pb.collection('settings').getFullList({ filter: 'key="logo"' })
      if (sett.length > 0) {
        setLogoConfigId(sett[0].id)
        if (sett[0].logo) {
          setLogoPreview(pb.files.getURL(sett[0], sett[0].logo))
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  const isAdmin =
    user?.access_level === 'Admin' || user?.email === 'reginaldo.segundo@planagroup.com.br'

  useEffect(() => {
    if (isAdmin) {
      loadData()
      loadNotificationRules()
    }
  }, [user, isAdmin])

  const [notifRules, setNotifRules] = useState<any[]>([])

  const loadNotificationRules = async () => {
    try {
      const rules = await pb.collection('notification_rules').getFullList()
      setNotifRules(rules)
    } catch {
      /* intentionally ignored */
    }
  }

  const toggleNotifRule = async (id: string, current: boolean) => {
    try {
      await pb.collection('notification_rules').update(id, { is_active: !current })
      loadNotificationRules()
    } catch {
      /* intentionally ignored */
    }
  }

  const toggleRecipient = async (rule: any, role: string) => {
    try {
      let recipients = rule.recipients || []
      if (recipients.includes(role)) {
        recipients = recipients.filter((r: string) => r !== role)
      } else {
        recipients = [...recipients, role]
      }
      await pb.collection('notification_rules').update(rule.id, { recipients })
      loadNotificationRules()
    } catch {
      /* intentionally ignored */
    }
  }

  if (!isAdmin) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Acesso Restrito. Apenas administradores podem acessar esta página.
      </div>
    )
  }

  const handleLogoFile = (e: any) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleSaveLogo = async () => {
    if (!selectedLogoFile) return
    const formData = new FormData()
    formData.append('logo', selectedLogoFile)
    formData.append('key', 'logo')
    formData.append('value', JSON.stringify({}))

    try {
      if (logoConfigId) {
        await pb.collection('settings').update(logoConfigId, formData)
      } else {
        const r = await pb.collection('settings').create(formData)
        setLogoConfigId(r.id)
      }
      toast({ title: 'Logo atualizado com sucesso!' })
      setSelectedLogoFile(null)
      window.dispatchEvent(new Event('logo-updated'))
    } catch (err) {
      toast({ title: 'Erro ao salvar logo', variant: 'destructive' })
    }
  }

  const handleOpenNotif = (r?: any) => {
    if (r) {
      const unit = r.timing_unit || 'hours_minutes'
      let h = 0,
        m = 0,
        d = 0
      if (unit === 'days') {
        d = r.timing_offset || 0
      } else {
        const totalMin = r.timing_offset || 0
        h = Math.floor(totalMin / 60)
        m = totalMin % 60
      }
      setNotifForm({
        event_type: r.event_type,
        recipients: r.recipients || [],
        channel: r.channel || 'internal',
        timing_unit: unit,
        timing_hours: h,
        timing_minutes: m,
        timing_days: d,
        is_active: r.is_active,
      })
      setEditingNotifId(r.id)
    } else {
      setNotifForm({
        event_type: 'new_appointment',
        recipients: [],
        channel: 'internal',
        timing_unit: 'hours_minutes',
        timing_hours: 0,
        timing_minutes: 0,
        timing_days: 0,
        is_active: true,
      })
      setEditingNotifId(null)
    }
    setIsNotifOpen(true)
  }

  const handleSaveNotif = async () => {
    try {
      let offset = 0
      if (notifForm.timing_unit === 'days') {
        offset = Number(notifForm.timing_days) || 0
      } else {
        offset =
          (Number(notifForm.timing_hours) || 0) * 60 + (Number(notifForm.timing_minutes) || 0)
      }

      const payload = {
        event_type: notifForm.event_type,
        recipients: notifForm.recipients,
        channel: notifForm.channel,
        timing_unit: notifForm.timing_unit,
        timing_offset: offset,
        is_active: notifForm.is_active,
      }

      if (editingNotifId) {
        await pb.collection('notification_rules').update(editingNotifId, payload)
        toast({ title: 'Regra atualizada!' })
      } else {
        await pb.collection('notification_rules').create(payload)
        toast({ title: 'Regra criada!' })
      }
      setIsNotifOpen(false)
      loadNotificationRules()
    } catch (err) {
      toast({ title: 'Erro ao salvar regra', variant: 'destructive' })
    }
  }

  const handleDeleteNotif = async (id: string) => {
    if (confirm('Tem certeza que deseja remover esta regra?')) {
      try {
        await pb.collection('notification_rules').delete(id)
        toast({ title: 'Regra removida' })
        loadNotificationRules()
      } catch (err) {
        toast({ title: 'Erro ao remover regra', variant: 'destructive' })
      }
    }
  }

  const toggleFormRecipient = (role: string) => {
    setNotifForm((prev) => ({
      ...prev,
      recipients: prev.recipients.includes(role)
        ? prev.recipients.filter((r) => r !== role)
        : [...prev.recipients, role],
    }))
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h2>
        <p className="text-muted-foreground">
          Gerencie a identidade visual e as categorias de serviços e produtos.
        </p>
      </div>

      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="mb-6 flex-wrap h-auto">
          <TabsTrigger value="geral">Geral (Marca)</TabsTrigger>
          <TabsTrigger value="notifications">Gerenciamento de Notificações</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-4">
          <Card className="max-w-2xl border-border shadow-sm">
            <CardHeader>
              <CardTitle>Identidade Visual</CardTitle>
              <CardDescription>
                Faça upload do logotipo da barbearia (PNG recomendado).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-card overflow-hidden shrink-0">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground text-center px-4">Sem Logo</span>
                  )}
                </div>
                <div className="space-y-2 flex-1">
                  <Label>Arquivo de Logo</Label>
                  <Input
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml"
                    onChange={handleLogoFile}
                  />
                  <Button
                    onClick={handleSaveLogo}
                    disabled={!selectedLogoFile}
                    className="mt-2 w-full sm:w-auto"
                  >
                    Atualizar Logo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Regras de Notificação</h3>
            <Button onClick={() => handleOpenNotif()}>
              <Plus className="size-4 mr-2" /> Nova Regra
            </Button>
          </div>

          <Card className="border-border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Evento</TableHead>
                  <TableHead>Destinatários</TableHead>
                  <TableHead>Canal</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifRules.map((r) => (
                  <TableRow key={r.id} className={!r.is_active ? 'opacity-50' : ''}>
                    <TableCell className="font-medium">
                      {r.event_type === 'new_appointment' && 'Novo Agendamento'}
                      {r.event_type === 'cancellation' && 'Cancelamento'}
                      {r.event_type === 'no_show' && 'Não Comparecimento'}
                      {r.event_type === 'retention' && 'Retenção de Cliente'}
                      {r.event_type === 'recorrencia_barba' && 'Recorrência Barba'}
                      {r.event_type === 'recorrencia_cabelo' && 'Recorrência Cabelo'}
                      {r.event_type === 'no_show_3dias' && 'No-show 3 dias'}
                      {r.event_type === 'other' && 'Outros'}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {r.recipients?.map((role: string) => (
                          <Badge key={role} variant="outline">
                            {role}
                          </Badge>
                        ))}
                        {(!r.recipients || r.recipients.length === 0) && (
                          <span className="text-muted-foreground text-xs">Nenhum</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize text-muted-foreground">
                      {r.channel === 'internal' ? 'Sistema Interno' : r.channel}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenNotif(r)}>
                        <Edit className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteNotif(r.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {notifRules.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      Nenhuma regra encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isNotifOpen} onOpenChange={setIsNotifOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingNotifId ? 'Editar Regra de Notificação' : 'Nova Regra de Notificação'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tipo de Evento</Label>
              <Select
                value={notifForm.event_type}
                onValueChange={(v) => setNotifForm({ ...notifForm, event_type: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new_appointment">Novo Agendamento</SelectItem>
                  <SelectItem value="cancellation">Cancelamento</SelectItem>
                  <SelectItem value="no_show">Não Comparecimento</SelectItem>
                  <SelectItem value="retention">Retenção de Cliente</SelectItem>
                  <SelectItem value="recorrencia_barba">Recorrência Barba</SelectItem>
                  <SelectItem value="recorrencia_cabelo">Recorrência Cabelo</SelectItem>
                  <SelectItem value="no_show_3dias">No-show 3 dias</SelectItem>
                  <SelectItem value="other">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Destinatários (Perfis)</Label>
              <div className="flex gap-2 border p-3 rounded-md">
                {['Admin', 'Socio', 'Autonomo'].map((role) => (
                  <Badge
                    key={role}
                    variant={notifForm.recipients.includes(role) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleFormRecipient(role)}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Canal de Envio</Label>
                <Select
                  value={notifForm.channel}
                  onValueChange={(v) => setNotifForm({ ...notifForm, channel: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">Sistema Interno</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label>Tempo de Disparo (Offset)</Label>
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="timing_unit"
                      checked={notifForm.timing_unit === 'hours_minutes'}
                      onChange={() => setNotifForm({ ...notifForm, timing_unit: 'hours_minutes' })}
                    />
                    <span className="text-sm">Horas/Minutos</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="timing_unit"
                      checked={notifForm.timing_unit === 'days'}
                      onChange={() => setNotifForm({ ...notifForm, timing_unit: 'days' })}
                    />
                    <span className="text-sm">Dias</span>
                  </label>
                </div>

                {notifForm.timing_unit === 'hours_minutes' ? (
                  <div className="flex gap-2">
                    <div className="flex-1 space-y-1">
                      <Label className="text-xs">Horas</Label>
                      <Input
                        type="number"
                        min="0"
                        value={notifForm.timing_hours}
                        onChange={(e) =>
                          setNotifForm({ ...notifForm, timing_hours: Number(e.target.value) })
                        }
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label className="text-xs">Minutos</Label>
                      <Input
                        type="number"
                        min="0"
                        max="59"
                        value={notifForm.timing_minutes}
                        onChange={(e) =>
                          setNotifForm({ ...notifForm, timing_minutes: Number(e.target.value) })
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Label className="text-xs">Dias</Label>
                    <Input
                      type="number"
                      min="0"
                      value={notifForm.timing_days}
                      onChange={(e) =>
                        setNotifForm({ ...notifForm, timing_days: Number(e.target.value) })
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="is_active"
                checked={notifForm.is_active}
                onChange={(e) => setNotifForm({ ...notifForm, is_active: e.target.checked })}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="is_active" className="cursor-pointer">
                Regra Ativa
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveNotif} className="w-full sm:w-auto">
              Salvar Regra
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
