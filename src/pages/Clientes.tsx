import { useState, useEffect } from 'react'
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
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AlertCircle, UserPlus, Package } from 'lucide-react'
import { getClients, createClient, getClientPackages } from '@/services/api'
import { useToast } from '@/hooks/use-toast'

export default function Clientes() {
  const [clients, setClients] = useState<any[]>([])
  const [packages, setPackages] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    birthday: '',
    location_type: 'nearby',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setClients(await getClients())
    setPackages(await getClientPackages())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createClient(formData)
      toast({ title: 'Cliente cadastrado com sucesso!' })
      setIsOpen(false)
      loadData()
    } catch (err) {
      toast({ title: 'Erro ao cadastrar', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Clientes (CRM)</h2>
          <p className="text-muted-foreground">Gerencie seus clientes e pacotes ativos.</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="size-4" /> Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Cliente</DialogTitle>
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
                    required
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
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nascimento</Label>
                  <Input
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Localização</Label>
                <RadioGroup
                  value={formData.location_type}
                  onValueChange={(v) => setFormData({ ...formData, location_type: v })}
                  className="flex gap-4"
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
                    <RadioGroupItem value="other_city" id="r3" />
                    <Label htmlFor="r3">Outra Cidade</Label>
                  </div>
                </RadioGroup>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full mt-4">
                  Salvar Cliente
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Base de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Celular</TableHead>
                <TableHead>Pacotes Ativos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((c) => {
                const clientPacks = packages.filter(
                  (p) => p.client_id === c.id && p.remaining_uses > 0,
                )
                return (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">
                      {c.name} {c.surname}
                    </TableCell>
                    <TableCell>{c.phone}</TableCell>
                    <TableCell>
                      {clientPacks.length === 0 ? (
                        <span className="text-muted-foreground text-sm">Nenhum</span>
                      ) : (
                        <div className="space-y-2">
                          {clientPacks.map((cp) => {
                            const total = cp.expand?.package_id?.quantity || 1
                            const progress = ((total - cp.remaining_uses) / total) * 100
                            const isLow = cp.remaining_uses <= 2
                            return (
                              <div key={cp.id} className="w-48 space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="flex items-center gap-1">
                                    <Package className="size-3" /> {cp.expand?.package_id?.name}
                                  </span>
                                  <span className={isLow ? 'text-amber-500 font-bold' : ''}>
                                    {cp.remaining_uses}/{total}
                                  </span>
                                </div>
                                <Progress value={progress} className="h-1.5" />
                                {isLow && (
                                  <span className="text-[10px] text-amber-500 flex items-center gap-1">
                                    <AlertCircle className="size-3" /> Acabando
                                  </span>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
