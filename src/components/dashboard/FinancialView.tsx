import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CommissionReceipt, ReceiptItem } from '@/components/CommissionReceipt'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { format } from 'date-fns'
import pb from '@/lib/pocketbase/client'
import { useToast } from '@/hooks/use-toast'

export function FinancialView({
  commissions,
  isAdmin,
  onOpenAdvanceModal,
  effectiveBarberFilter,
}: any) {
  const { toast } = useToast()
  const [appointments, setAppointments] = useState<any[]>([])
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])
  const [barbers, setBarbers] = useState<any[]>([])
  const [receiptModal, setReceiptModal] = useState<{
    open: boolean
    barberId?: string
    items?: ReceiptItem[]
    total?: number
  }>({ open: false })

  useEffect(() => {
    async function load() {
      try {
        const [apts, pms, barbs] = await Promise.all([
          pb.collection('appointments').getFullList({ expand: 'client_id,service_id,barber_id' }),
          pb.collection('payment_methods').getFullList(),
          pb.collection('barbers').getFullList(),
        ])
        setAppointments(apts)
        setPaymentMethods(pms)
        setBarbers(barbs)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  const pendingCommissions = useMemo(() => {
    return commissions.filter((c: any) => c.status === 'pending' || c.status === 'available')
  }, [commissions])

  const groupedCommissions = useMemo(() => {
    const groups: Record<string, { barberName: string; commissions: any[]; total: number }> = {}

    pendingCommissions.forEach((c: any) => {
      if (effectiveBarberFilter !== 'all' && c.barber_id !== effectiveBarberFilter) return

      const barber = barbers.find((b) => b.id === c.barber_id)
      if (!barber) return

      if (!groups[c.barber_id]) {
        groups[c.barber_id] = { barberName: barber.name, commissions: [], total: 0 }
      }
      groups[c.barber_id].commissions.push(c)
      groups[c.barber_id].total += c.amount
    })

    return Object.entries(groups).map(([id, data]) => ({ barberId: id, ...data }))
  }, [pendingCommissions, effectiveBarberFilter, barbers])

  const handlePay = async (barberId: string, comms: any[]) => {
    if (!confirm('Confirmar o pagamento das comissões selecionadas?')) return

    try {
      await Promise.all(
        comms.map((c) => pb.collection('commissions').update(c.id, { status: 'paid' })),
      )
      toast({ title: 'Comissões pagas com sucesso!' })
      generateReceipt(barberId, comms)
    } catch (e) {
      toast({ title: 'Erro ao pagar comissões', variant: 'destructive' })
    }
  }

  const generateReceipt = (barberId: string, comms: any[]) => {
    const items: ReceiptItem[] = []
    let total = 0

    comms.forEach((c) => {
      const apt = appointments.find(
        (a) =>
          a.barber_id === c.barber_id &&
          a.status === 'Concluído' &&
          Math.abs(new Date(a.updated).getTime() - new Date(c.created).getTime()) < 60000,
      )

      const pm = paymentMethods.find((m) => m.type === c.payment_method)
      const feePercent = pm?.fee_percentage || 0

      let serviceValue = apt ? apt.price || apt.expand?.service_id?.price || 0 : 0
      let clientName = apt ? apt.expand?.client_id?.name || 'Avulso' : 'Desconhecido'
      let serviceName = apt
        ? apt.expand?.service_id?.name || 'Serviço'
        : c.type === 'product'
          ? 'Produto'
          : 'Avulso'

      const barber = barbers.find((b) => b.id === c.barber_id)
      const commissionRate = barber?.commission_value || 50

      const grossCommission = serviceValue > 0 ? serviceValue * (commissionRate / 100) : c.amount
      const financialFee = serviceValue > 0 ? serviceValue * (feePercent / 100) : 0
      const netCommission = serviceValue > 0 ? grossCommission - financialFee : c.amount

      total += netCommission

      items.push({
        clientName,
        serviceName,
        serviceValue: serviceValue || c.amount,
        commissionValue: netCommission,
        grossCommission: serviceValue > 0 ? grossCommission : undefined,
        financialFee: serviceValue > 0 && financialFee > 0 ? financialFee : undefined,
        commissionRate: serviceValue > 0 ? commissionRate : undefined,
      })
    })

    setReceiptModal({ open: true, barberId, items, total })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Comissões Pendentes</h3>
        {isAdmin && (
          <Button variant="outline" onClick={onOpenAdvanceModal}>
            Registrar Vale/Adiantamento
          </Button>
        )}
      </div>

      {groupedCommissions.length === 0 ? (
        <Card className="border-dashed bg-transparent">
          <CardContent className="flex flex-col items-center justify-center py-10 text-muted-foreground">
            <p>Nenhuma comissão pendente no momento.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {groupedCommissions.map((group) => (
            <Card key={group.barberId}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between">
                  <span>{group.barberName}</span>
                  <span className="text-primary font-bold">R$ {group.total.toFixed(2)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="max-h-40 overflow-y-auto border rounded-md p-2 space-y-2">
                    {group.commissions.map((c: any) => {
                      const apt = appointments.find(
                        (a) =>
                          a.barber_id === c.barber_id &&
                          a.status === 'Concluído' &&
                          Math.abs(new Date(a.updated).getTime() - new Date(c.created).getTime()) <
                            60000,
                      )
                      const timeStr = apt
                        ? format(new Date(apt.updated), 'dd/MM/yyyy HH:mm')
                        : format(new Date(c.created), 'dd/MM/yyyy HH:mm')
                      const clientName = apt
                        ? apt.expand?.client_id?.name || 'Avulso'
                        : c.type === 'product'
                          ? 'Venda de Produto'
                          : 'Avulso'
                      return (
                        <div
                          key={c.id}
                          className="flex justify-between text-sm items-center border-b pb-1 last:border-0 last:pb-0"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{clientName}</span>
                            <span className="text-xs text-muted-foreground">{timeStr}</span>
                          </div>
                          <span className="font-semibold text-primary">
                            R$ {c.amount.toFixed(2)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  {isAdmin ? (
                    <Button
                      className="w-full"
                      onClick={() => handlePay(group.barberId, group.commissions)}
                    >
                      Pagar e Gerar Recibo
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant="secondary"
                      onClick={() => generateReceipt(group.barberId, group.commissions)}
                    >
                      Visualizar Recibo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={receiptModal.open} onOpenChange={(v) => !v && setReceiptModal({ open: false })}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-transparent border-none shadow-none">
          {receiptModal.items && (
            <CommissionReceipt
              date={new Date()}
              barberName={barbers.find((b) => b.id === receiptModal.barberId)?.name || ''}
              items={receiptModal.items}
              totalPaid={receiptModal.total || 0}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
