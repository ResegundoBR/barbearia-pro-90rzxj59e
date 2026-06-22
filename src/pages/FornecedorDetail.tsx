import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ShoppingCart, Calendar, Check } from 'lucide-react'
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
    status: 'pending',
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
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
    setPurchaseForm((prev) => {
      const unitPrice = Number(prev.unit_price) || 0
      const qty = Number(val) || 0
      return {
        ...prev,
        quantity: val,
        price_paid: qty > 0 && unitPrice > 0 ? (qty * unitPrice).toFixed(2) : prev.price_paid,
      }
    })
  }

  const handleUnitPriceChange = (val: string) => {
    setPurchaseForm((prev) => {
      const qty = Number(prev.quantity) || 0
      const unitPrice = Number(val) || 0
      return {
        ...prev,
        unit_price: val,
        price_paid: qty > 0 && unitPrice > 0 ? (qty * unitPrice).toFixed(2) : prev.price_paid,
      }
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
    const errors: Record<string, string> = {}
    if (!purchaseForm.product_id) errors.product_id = 'Selecione um produto'
    if (!purchaseForm.price_paid) errors.price_paid = 'Informe o total da compra'
    if (!purchaseForm.purchase_date) errors.purchase_date = 'Informe a data'

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      toast({ title: 'Verifique os campos obrigatórios', variant: 'destructive' })
      return
    }

    setFieldErrors({})

    try {
      let dateIso = new Date().toISOString()
      if (purchaseForm.purchase_date) {
        const d = new Date(purchaseForm.purchase_date)
        if (!isNaN(d.getTime())) {
          dateIso = new Date(purchaseForm.purchase_date + 'T12:00:00.000Z').toISOString()
        }
      }

      await pb.collection('inventory_purchases').create({
        supplier_id: id,
        product_id: purchaseForm.product_id,
        quantity: Number(purchaseForm.quantity) || 1,
        unit_price: Number(purchaseForm.unit_price) || 0,
        price_paid: Number(purchaseForm.price_paid) || 0,
        purchase_date: dateIso,
        status: purchaseForm.status,
        received_at: purchaseForm.status === 'received' ? new Date().toISOString() : null,
        organization_id: pb.authStore.record?.organization_id,
      })
      toast({ title: 'Compra registrada com sucesso' })
      setPurchaseDialogOpen(false)
      setPurchaseForm({
        ...purchaseForm,
        price_paid: '',
        unit_price: '',
        product_id: '',
        quantity: '1',
        status: 'pending',
      })
      loadData()
    } catch (e: any) {
      toast({ title: 'Erro ao registrar', description: e.message, variant: 'destructive' })
    }
  }

  const handleConfirmReceipt = async (purchaseId: string) => {
    try {
      await pb.collection('inventory_purchases').update(purchaseId, {
        status: 'received',
        received_at: new Date().toISOString(),
      })
      toast({ title: 'Recebimento confirmado com sucesso' })
      loadData()
    } catch (e: any) {
      toast({ title: 'Erro ao confirmar', description: e.message, variant: 'destructive' })
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
                {purchases.map((purch) => {
                  const status = purch.status || 'pending'
                  return (
                    <div
                      key={purch.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-muted/10 gap-3"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1 sm:mt-0 shrink-0">
                          <Calendar className="size-4 text-primary" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-semibold text-sm">
                              {purch.expand?.product_id?.name || 'Produto Excluído'}
                            </p>
                            {status === 'pending' ? (
                              <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 text-[10px] font-medium px-2 py-0.5 rounded-full">
                                Pendente
                              </span>
                            ) : (
                              <span className="bg-green-500/10 text-green-500 border border-green-500/20 text-[10px] font-medium px-2 py-0.5 rounded-full">
                                Recebido
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Data: {format(new Date(purch.purchase_date), 'dd/MM/yyyy')} | Qtd:{' '}
                            {purch.quantity}
                          </p>
                          {status === 'received' && purch.received_at && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Recebido em: {format(new Date(purch.received_at), 'dd/MM/yyyy HH:mm')}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0 border-t sm:border-t-0 pt-2 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <p className="font-bold text-sm">R$ {purch.price_paid?.toFixed(2)}</p>
                          {purch.unit_price && (
                            <p className="text-xs text-muted-foreground">
                              Unit: R$ {purch.unit_price.toFixed(2)}
                            </p>
                          )}
                        </div>
                        {status === 'pending' && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleConfirmReceipt(purch.id)}
                          >
                            <Check className="size-4 mr-1" />
                            Confirmar
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
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
                onValueChange={(v) => {
                  setPurchaseForm({ ...purchaseForm, product_id: v })
                  setFieldErrors((prev) => ({ ...prev, product_id: '' }))
                }}
              >
                <SelectTrigger className={fieldErrors.product_id ? 'border-red-500' : ''}>
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
              {fieldErrors.product_id && (
                <p className="text-xs text-red-500">{fieldErrors.product_id}</p>
              )}
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                <Label>Total Compra *</Label>
                <Input
                  type="number"
                  step="0.01"
                  className={fieldErrors.price_paid ? 'border-red-500' : ''}
                  value={purchaseForm.price_paid}
                  onChange={(e) => {
                    setPurchaseForm({ ...purchaseForm, price_paid: e.target.value })
                    setFieldErrors((prev) => ({ ...prev, price_paid: '' }))
                  }}
                />
                {fieldErrors.price_paid && (
                  <p className="text-xs text-red-500">{fieldErrors.price_paid}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Data *</Label>
                <Input
                  type="date"
                  className={fieldErrors.purchase_date ? 'border-red-500' : ''}
                  value={purchaseForm.purchase_date}
                  onChange={(e) => {
                    setPurchaseForm({ ...purchaseForm, purchase_date: e.target.value })
                    setFieldErrors((prev) => ({ ...prev, purchase_date: '' }))
                  }}
                />
                {fieldErrors.purchase_date && (
                  <p className="text-xs text-red-500">{fieldErrors.purchase_date}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Status *</Label>
                <Select
                  value={purchaseForm.status}
                  onValueChange={(v) => setPurchaseForm({ ...purchaseForm, status: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendente</SelectItem>
                    <SelectItem value="received">Recebido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setPurchaseDialogOpen(false)
                setFieldErrors({})
              }}
            >
              Cancelar
            </Button>
            <Button onClick={handleSavePurchase}>Salvar Compra</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
