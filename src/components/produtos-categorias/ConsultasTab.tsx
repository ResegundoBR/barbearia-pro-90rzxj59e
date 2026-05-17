import { useState, useEffect } from 'react'
import pb from '@/lib/pocketbase/client'
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
import { format } from 'date-fns'
import { Search, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { usePermissions } from '@/hooks/use-permissions'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'

export function ConsultasTab() {
  const { isAdmin } = usePermissions()
  const { user } = useAuth()
  const isSocio = user?.access_level === 'Socio'
  const canConfirm = isAdmin || isSocio
  const { toast } = useToast()

  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [purchases, setPurchases] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [confirmingId, setConfirmingId] = useState<string | null>(null)

  useEffect(() => {
    pb.collection('categories')
      .getFullList({ filter: "type='product'", sort: 'name' })
      .then(setCategories)
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      let purchFilter = ''
      if (selectedCategory && selectedCategory !== 'all') {
        purchFilter = `product_id.category_id="${selectedCategory}"`
      }
      const purchs = await pb.collection('inventory_purchases').getFullList({
        filter: purchFilter,
        sort: '-purchase_date',
        expand: 'product_id,product_id.category_id,supplier_id',
      })
      setPurchases(purchs)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedCategory])

  useRealtime('inventory_purchases', () => {
    fetchData()
  })

  const handleConfirmArrival = async (id: string) => {
    try {
      await pb.collection('inventory_purchases').update(id, {
        status: 'received',
        received_at: new Date().toISOString(),
      })
      toast({
        title: 'Recebimento confirmado',
        description: 'O estoque do produto foi atualizado com sucesso.',
      })
      setConfirmingId(null)
    } catch (err: any) {
      console.error('Failed to confirm arrival', err)
      toast({
        title: 'Erro ao confirmar',
        description: err.message,
        variant: 'destructive',
      })
    }
  }

  const filteredPurchases = purchases.filter((p) =>
    p.expand?.product_id?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Todas as Categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Categorias</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="relative w-full sm:w-2/3">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produto..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Fornecedor</TableHead>
              <TableHead className="text-right">Qtd</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : filteredPurchases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  Nenhuma compra encontrada.
                </TableCell>
              </TableRow>
            ) : (
              filteredPurchases.map((purch) => {
                const isPending = !purch.status || purch.status === 'pending'
                return (
                  <TableRow key={purch.id}>
                    <TableCell>
                      {purch.purchase_date
                        ? format(new Date(purch.purchase_date), 'dd/MM/yyyy')
                        : '-'}
                    </TableCell>
                    <TableCell className="font-medium">
                      {purch.expand?.product_id?.name || '-'}
                    </TableCell>
                    <TableCell>
                      {purch.expand?.product_id?.expand?.category_id?.name || '-'}
                    </TableCell>
                    <TableCell>{purch.expand?.supplier_id?.name || '-'}</TableCell>
                    <TableCell className="text-right">{purch.quantity}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={isPending ? 'outline' : 'default'}
                        className={
                          isPending
                            ? 'text-amber-600 bg-amber-500/10 border-amber-500/20'
                            : 'bg-emerald-500 hover:bg-emerald-600'
                        }
                      >
                        {isPending ? 'Pendente' : 'Recebido'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {isPending && canConfirm && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                          onClick={() => setConfirmingId(purch.id)}
                        >
                          <CheckCircle className="size-4 mr-1" />
                          O Produto Chegou?
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!confirmingId} onOpenChange={(v) => !v && setConfirmingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Recebimento</DialogTitle>
            <DialogDescription>
              Você confirma que este produto chegou ao estoque? O estoque será atualizado
              automaticamente.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setConfirmingId(null)}>
              Cancelar
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => confirmingId && handleConfirmArrival(confirmingId)}
            >
              Sim, o produto chegou
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
