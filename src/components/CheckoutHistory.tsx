import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { format } from 'date-fns'
import { Search, Eye, History, ReceiptText } from 'lucide-react'
import pb from '@/lib/pocketbase/client'
import { Separator } from '@/components/ui/separator'

export function CheckoutHistory() {
  const [checkouts, setCheckouts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTicket, setSelectedTicket] = useState<any>(null)

  const loadCheckouts = async () => {
    setLoading(true)
    try {
      let filter = ''
      if (searchTerm) {
        if (!isNaN(Number(searchTerm))) {
          filter = `checkout_number = ${searchTerm}`
        } else {
          filter = `client_id.name ~ "${searchTerm}" || barber_id.name ~ "${searchTerm}"`
        }
      }

      const records = await pb.collection('checkouts').getList(1, 50, {
        filter,
        sort: '-checkout_number',
        expand: 'client_id,barber_id',
      })
      setCheckouts(records.items)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCheckouts()
  }, [searchTerm])

  const openTicket = (checkout: any) => {
    setSelectedTicket(checkout)
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="bg-muted/30 pb-4 border-b">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <History className="size-5 text-primary" /> Histórico de Checkouts
            </CardTitle>
            <CardDescription>
              Visualize o registro de todas as transações finalizadas.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Nº Checkout, Cliente ou Profissional..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nº</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Profissional</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="text-right">Valor Total</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {checkouts.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-bold">#{c.checkout_number}</TableCell>
                <TableCell>{format(new Date(c.date), 'dd/MM/yyyy HH:mm')}</TableCell>
                <TableCell>{c.expand?.barber_id?.name || '-'}</TableCell>
                <TableCell>{c.expand?.client_id?.name || '-'}</TableCell>
                <TableCell className="text-right font-medium">
                  R$ {c.total_amount.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openTicket(c)}>
                    <Eye className="size-4 text-primary" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {checkouts.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  Nenhum checkout encontrado.
                </TableCell>
              </TableRow>
            )}
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  Carregando...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={!!selectedTicket} onOpenChange={(o) => !o && setSelectedTicket(null)}>
        <DialogContent className="sm:max-w-md bg-white text-black font-mono shadow-xl rounded-md border border-gray-300">
          <DialogHeader className="mb-2">
            <DialogTitle className="flex flex-col items-center justify-center space-y-2">
              <ReceiptText className="size-8 text-black" />
              <span className="text-xl font-bold uppercase tracking-widest text-black">
                Checkout #{selectedTicket?.checkout_number}
              </span>
            </DialogTitle>
          </DialogHeader>

          {selectedTicket && (
            <div className="space-y-4 text-sm mt-2 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-1 text-center border-b border-dashed border-gray-400 pb-4">
                <p className="text-gray-600">
                  Profissional: {selectedTicket.expand?.barber_id?.name}
                </p>
                <p className="text-gray-600">Cliente: {selectedTicket.expand?.client_id?.name}</p>
                <p className="text-gray-600">
                  {format(new Date(selectedTicket.date), 'dd/MM/yyyy HH:mm')}
                </p>
                <p className="text-gray-600">Pgto: {selectedTicket.payment_method || 'Não inf.'}</p>
              </div>

              {selectedTicket.items_snapshot?.service && (
                <>
                  <div className="font-semibold uppercase text-xs tracking-wider text-gray-500 mt-4 mb-2">
                    Serviços e Extras
                  </div>
                  <div className="flex justify-between">
                    <span>
                      {selectedTicket.items_snapshot.service}{' '}
                      <span className="text-xs text-gray-500">
                        ({selectedTicket.items_snapshot.packageUsed ? 'Pacote' : 'Base'})
                      </span>
                    </span>
                    <span>
                      R$ {Number(selectedTicket.items_snapshot.scheduledPrice || 0).toFixed(2)}
                    </span>
                  </div>
                  {selectedTicket.items_snapshot.additionalServices?.map((s: any, i: number) => (
                    <div key={i} className="flex justify-between">
                      <span>
                        {s.name} <span className="text-xs text-gray-500">(Adic.)</span>
                      </span>
                      <span>R$ {Number(s.price || 0).toFixed(2)}</span>
                    </div>
                  ))}
                  {selectedTicket.items_snapshot.manualExtras?.map((m: any, i: number) => (
                    <div key={i} className="flex justify-between">
                      <span>
                        {m.description} <span className="text-xs text-gray-500">(Extra)</span>
                      </span>
                      <span>R$ {Number(m.price || 0).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-dashed border-gray-300 my-2" />
                </>
              )}

              {selectedTicket.items_snapshot?.products &&
                selectedTicket.items_snapshot.products.length > 0 && (
                  <>
                    <div className="font-semibold uppercase text-xs tracking-wider text-gray-500 mt-4 mb-2">
                      Produtos
                    </div>
                    {selectedTicket.items_snapshot.products.map((p: any, i: number) => (
                      <div key={i} className="flex justify-between">
                        <span>
                          {p.quantity}x {p.name}
                        </span>
                        <span>R$ {(p.quantity * p.price).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t border-dashed border-gray-300 my-2" />
                  </>
                )}

              {selectedTicket.items_snapshot?.packages &&
                selectedTicket.items_snapshot.packages.length > 0 && (
                  <>
                    <div className="font-semibold uppercase text-xs tracking-wider text-gray-500 mt-4 mb-2">
                      Pacotes Vendidos
                    </div>
                    {selectedTicket.items_snapshot.packages.map((p: any, i: number) => (
                      <div key={i} className="flex justify-between">
                        <span>
                          {p.quantity}x {p.name}
                        </span>
                        <span>R$ {(p.quantity * p.price).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t border-dashed border-gray-300 my-2" />
                  </>
                )}

              {selectedTicket.items_snapshot?.discount > 0 && (
                <div className="flex justify-between text-red-600 font-medium">
                  <span>Desconto Aplicado</span>
                  <span>- R$ {Number(selectedTicket.items_snapshot.discount).toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between font-black text-lg uppercase tracking-wide pt-2">
                <span>Total:</span>
                <span>R$ {selectedTicket.total_amount.toFixed(2)}</span>
              </div>
            </div>
          )}

          <DialogFooter className="mt-4 border-t border-dashed border-gray-300 pt-4">
            <Button
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-100"
              onClick={() => setSelectedTicket(null)}
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
