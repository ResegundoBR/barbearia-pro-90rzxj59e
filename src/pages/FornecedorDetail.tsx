import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ShoppingCart, Calendar } from 'lucide-react'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'
import { format } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

export default function FornecedorDetail() {
  const { id } = useParams()
  const [supplier, setSupplier] = useState<any>(null)
  const [purchases, setPurchases] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
  const [purchaseForm, setPurchaseForm] = useState({
    product_id: '',
    quantity: '1',
    unit_price: '',
    price_paid: '',
    purchase_date: new Date().toISOString().split('T')[0],
  })
  const [lastPurchase, setLastPurchase] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (purchaseForm.product_id) {
      pb.collection('inventory_purchases')
        .getFirstListItem(`product_id="${purchaseForm.product_id}"`, {
          sort: '-purchase_date',
          expand: 'supplier_id',
        })
        .then((res) => setLastPurchase(res))
        .catch(() => setLastPurchase(null))
    } else {
      setLastPurchase(null)
    }
  }, [purchaseForm.product_id])

  const handleQuantityChange = (val: string) => {
    setPurchaseForm({
      ...purchaseForm,
      quantity: val,
    })
  }

  const handleUnitPriceChange = (val: string) => {
    setPurchaseForm({
      ...purchaseForm,
      unit_price: val,
    })
  }

  const loadData = async () => {
    if (!id) return
    try {
      const sup = await pb.collection('suppliers').getOne(id, { expand: 'category_id' })
      setSupplier(sup)
      const purch = await pb.collection('inventory_purchases').getFullList({
        filter: `supplier_id="${id}"`,
        sort: '-purchase_date',
        expand: 'product_id',
      })
      setPurchases(purch)
      const prods = await pb.collection('products').getFullList()
      setProducts(prods)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadData()
  }, [id])

  useRealtime('suppliers', loadData)
  useRealtime('inventory_purchases', loadData)

  const handleSavePurchase = async () => {
    if (!purchaseForm.product_id || !purchaseForm.price_paid || !purchaseForm.purchase_date) {
      toast({ title: 'Preencha todos os campos obrigatórios', variant: 'destructive' })
      return
    }
    try {
      await pb.collection('inventory_purchases').create({
        supplier_id: id,
        product_id: purchaseForm.product_id,
        quantity: Number(purchaseForm.quantity) || 1,
        unit_price: Number(purchaseForm.unit_price) || 0,
        price_paid: Number(purchaseForm.price_paid) || 0,
        purchase_date: new Date(purchaseForm.purchase_date).toISOString(),
      })
      toast({ title: 'Compra registrada' })
      setPurchaseDialogOpen(false)
      setPurchaseForm({
        ...purchaseForm,
        price_paid: '',
        unit_price: '',
        product_id: '',
        quantity: '1',
      })
    } catch (e: any) {
      toast({ title: 'Erro ao registrar', description: e.message, variant: 'destructive' })
    }
  }

  if (!supplier) return <div className="p-8">Carregando...</div>

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link to="/fornecedores">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{supplier.name}</h2>
          <p className="text-muted-foreground text-sm">
            {supplier.document && `Documento: ${supplier.document} | `}
            Contato: {supplier.contact_person || 'N/A'}{' '}
            {supplier.whatsapp && `(${supplier.whatsapp})`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 h-min">
          <CardHeader>
            <CardTitle>Detalhes do Fornecedor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-semibold">Endereço</p>
              <p className="text-sm text-muted-foreground">{supplier.address || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Telefone</p>
              <p className="text-sm text-muted-foreground">{supplier.phone || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Categorias Fornecidas</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {supplier.expand?.category_id?.map((c: any) => (
                  <span key={c.id} className="text-xs bg-secondary px-2 py-1 rounded-full">
                    {c.name}
                  </span>
                ))}
                {!supplier.expand?.category_id && (
                  <span className="text-sm text-muted-foreground">Nenhuma categoria</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Histórico de Compras</CardTitle>
            <Button size="sm" onClick={() => setPurchaseDialogOpen(true)}>
              <ShoppingCart className="size-4 mr-2" /> Registrar Compra
            </Button>
          </CardHeader>
          <CardContent>
            {purchases.length === 0 ? (
              <p className="text-muted-foreground py-4 text-center">
                Nenhuma compra registrada com este fornecedor.
              </p>
            ) : (
              <div className="space-y-3 mt-4 max-h-[500px] overflow-y-auto pr-2">
                {purchases.map((purch) => (
                  <div
                    key={purch.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Calendar className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">
                          {purch.expand?.product_id?.name || 'Produto Excluído'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Data: {format(new Date(purch.purchase_date), 'dd/MM/yyyy')} | Qtd:{' '}
                          {purch.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">R$ {purch.price_paid?.toFixed(2)}</p>
                      {purch.unit_price && (
                        <p className="text-xs text-muted-foreground">
                          Unit: R$ {purch.unit_price.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={purchaseDialogOpen} onOpenChange={setPurchaseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Nova Compra</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Produto *</Label>
              <Select
                value={purchaseForm.product_id}
                onValueChange={(v) => setPurchaseForm({ ...purchaseForm, product_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o produto..." />
                </SelectTrigger>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {lastPurchase && (
              <div className="bg-muted/50 p-3 rounded-md text-sm">
                <p className="font-semibold text-muted-foreground mb-1">
                  Última Compra do Produto:
                </p>
                <p>Fornecedor: {lastPurchase.expand?.supplier_id?.name || 'Desconhecido'}</p>
                <p>
                  Preço Unitário: R${' '}
                  {lastPurchase.unit_price
                    ? lastPurchase.unit_price.toFixed(2)
                    : (lastPurchase.price_paid / lastPurchase.quantity).toFixed(2)}
                </p>
                <p>Data: {format(new Date(lastPurchase.purchase_date), 'dd/MM/yyyy')}</p>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Qtd</Label>
                <Input
                  type="number"
                  value={purchaseForm.quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Preço Unit.</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={purchaseForm.unit_price}
                  onChange={(e) => handleUnitPriceChange(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Preço Total *</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={purchaseForm.price_paid}
                  onChange={(e) => setPurchaseForm({ ...purchaseForm, price_paid: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Data *</Label>
                <Input
                  type="date"
                  value={purchaseForm.purchase_date}
                  onChange={(e) =>
                    setPurchaseForm({ ...purchaseForm, purchase_date: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPurchaseDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSavePurchase}>Salvar Compra</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
