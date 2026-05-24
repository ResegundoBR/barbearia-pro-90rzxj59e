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

export default function FinancialRulesTab() {
  const [rules, setRules] = useState<any[]>([])
  const [barbers, setBarbers] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const [formData, setFormData] = useState({
    barber_id: '',
    item_type: 'service',
    value: 0,
    type: 'percentage',
  })

  const load = async () => {
    try {
      const data = await getCollection('commission_rules', 'barber_id')
      setRules(data)
      const bData = await getCollection('barbers')
      setBarbers(bData)
    } catch (error) {
      toast.error('Erro ao carregar regras')
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createRecord('commission_rules', formData)
      toast.success('Regra criada com sucesso')
      setIsOpen(false)
      load()
    } catch (error) {
      toast.error('Erro ao salvar regra')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir esta regra?')) return
    try {
      await deleteRecord('commission_rules', id)
      toast.success('Regra excluída')
      load()
    } catch (error) {
      toast.error('Erro ao excluir regra')
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Regras Financeiras (Comissões)</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() =>
                setFormData({ barber_id: '', item_type: 'service', value: 0, type: 'percentage' })
              }
            >
              Nova Regra
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Regra de Comissão</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Profissional</Label>
                <Select
                  value={formData.barber_id}
                  onValueChange={(v) => setFormData({ ...formData, barber_id: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Geral (Todos)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Geral (Todos os profissionais)</SelectItem>
                    {barbers.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Aplicável A</Label>
                <Select
                  value={formData.item_type}
                  onValueChange={(v) => setFormData({ ...formData, item_type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Serviços</SelectItem>
                    <SelectItem value="product">Produtos</SelectItem>
                    <SelectItem value="category">Categorias</SelectItem>
                    <SelectItem value="package">Pacotes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tipo de Comissão</Label>
                <Select
                  value={formData.type}
                  onValueChange={(v) => setFormData({ ...formData, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                    <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Valor da Comissão</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Adicionar Regra
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Profissional</TableHead>
              <TableHead>Aplicado A</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell>{rule.expand?.barber_id?.name || 'Geral'}</TableCell>
                <TableCell className="capitalize">{rule.item_type}</TableCell>
                <TableCell>{rule.type === 'percentage' ? '%' : 'R$'}</TableCell>
                <TableCell>{rule.value}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(rule.id)}>
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
