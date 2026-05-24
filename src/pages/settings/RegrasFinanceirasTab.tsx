import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

export function RegrasFinanceirasTab() {
  const [rules, setRules] = useState<any[]>([])
  const [barbers, setBarbers] = useState<any[]>([])

  const [barberId, setBarberId] = useState('all')
  const [itemType, setItemType] = useState('service')
  const [value, setValue] = useState('')
  const [type, setType] = useState('percentage')

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([
      pb.collection('commission_rules').getFullList({ expand: 'barber_id', sort: '-created' }),
      pb.collection('barbers').getFullList({ sort: 'name' }),
    ])
      .then(([r, b]) => {
        setRules(r)
        setBarbers(b)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!value) return toast.error('Valor é obrigatório')

    setSubmitting(true)
    try {
      const rec = await pb.collection('commission_rules').create({
        barber_id: barberId === 'all' ? null : barberId,
        item_type: itemType,
        value: Number(value),
        type,
      })
      const expandData = barbers.find((b) => b.id === rec.barber_id)
      if (expandData) rec.expand = { barber_id: expandData }
      setRules([rec, ...rules])
      setValue('')
      toast.success('Regra financeira adicionada!')
    } catch {
      toast.error('Erro ao adicionar regra.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Remover regra?')) return
    try {
      await pb.collection('commission_rules').delete(id)
      setRules((r) => r.filter((x) => x.id !== id))
      toast.success('Regra removida')
    } catch {
      toast.error('Erro ao remover')
    }
  }

  if (loading)
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Carregando...</div>

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nova Regra de Comissão</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleAdd}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Barbeiro</label>
              <Select value={barberId} onValueChange={setBarberId}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Barbeiros</SelectItem>
                  {barbers.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Item</label>
              <Select value={itemType} onValueChange={setItemType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Serviço</SelectItem>
                  <SelectItem value="product">Produto</SelectItem>
                  <SelectItem value="package">Pacote</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Select value={type} onValueChange={setType}>
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
              <label className="text-sm font-medium">Valor</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={submitting}>
              Adicionar
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Regras Ativas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Barbeiro</TableHead>
                  <TableHead>Tipo de Item</TableHead>
                  <TableHead>Regra</TableHead>
                  <TableHead className="w-[100px] text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rules.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Nenhuma regra.
                    </TableCell>
                  </TableRow>
                )}
                {rules.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.expand?.barber_id?.name || 'Todos'}</TableCell>
                    <TableCell className="capitalize">
                      {r.item_type === 'service'
                        ? 'Serviço'
                        : r.item_type === 'product'
                          ? 'Produto'
                          : 'Pacote'}
                    </TableCell>
                    <TableCell>
                      {r.type === 'percentage' ? `${r.value}%` : `R$ ${r.value.toFixed(2)}`}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}>
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
