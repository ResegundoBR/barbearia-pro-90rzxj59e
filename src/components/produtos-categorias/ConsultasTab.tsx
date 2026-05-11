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
import { Search } from 'lucide-react'

export function ConsultasTab() {
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [purchasesMap, setPurchasesMap] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    pb.collection('categories')
      .getFullList({ filter: "type='product'", sort: 'name' })
      .then(setCategories)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        let prodFilter = ''
        if (selectedCategory && selectedCategory !== 'all') {
          prodFilter = `category_id="${selectedCategory}"`
        }
        const prods = await pb
          .collection('products')
          .getFullList({ filter: prodFilter, sort: 'name', expand: 'category_id' })

        let purchFilter = ''
        if (selectedCategory && selectedCategory !== 'all') {
          purchFilter = `product_id.category_id="${selectedCategory}"`
        }
        const purchs = await pb.collection('inventory_purchases').getFullList({
          filter: purchFilter,
          sort: '-purchase_date',
          expand: 'product_id,supplier_id',
        })

        const map: Record<string, any> = {}
        for (const p of purchs) {
          if (!map[p.product_id]) {
            map[p.product_id] = p
          }
        }

        setProducts(prods)
        setPurchasesMap(map)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [selectedCategory])

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
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
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Último Fornecedor</TableHead>
              <TableHead>Data da Compra</TableHead>
              <TableHead className="text-right">Preço Unit. Pago</TableHead>
              <TableHead className="text-right">Total da Compra</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((p) => {
                const lastPurch = purchasesMap[p.id]
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.expand?.category_id?.name || '-'}</TableCell>
                    <TableCell>{lastPurch?.expand?.supplier_id?.name || '-'}</TableCell>
                    <TableCell>
                      {lastPurch ? format(new Date(lastPurch.purchase_date), 'dd/MM/yyyy') : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {lastPurch
                        ? lastPurch.unit_price
                          ? `R$ ${lastPurch.unit_price.toFixed(2)}`
                          : `R$ ${(lastPurch.price_paid / lastPurch.quantity).toFixed(2)}`
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {lastPurch
                        ? lastPurch.price_paid
                          ? `R$ ${lastPurch.price_paid.toFixed(2)}`
                          : `R$ ${(lastPurch.unit_price * lastPurch.quantity).toFixed(2)}`
                        : '-'}
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
