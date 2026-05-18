import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import pb from '@/lib/pocketbase/client'

export interface ReceiptItem {
  clientName: string
  serviceName: string
  serviceValue: number
  commissionValue: number
  paymentMethodType?: string
  commissionRate?: number
  commissionInfo?: { type: string; value: number }
}

interface CommissionReceiptProps {
  date: Date | string
  barberName: string
  items: ReceiptItem[]
  totalPaid: number
}

export function CommissionReceipt({ date, barberName, items, totalPaid }: CommissionReceiptProps) {
  const [copied, setCopied] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState<any[]>([])

  useEffect(() => {
    pb.collection('payment_methods').getFullList().then(setPaymentMethods).catch(console.error)
  }, [])

  const handleCopy = () => {
    let text = `================================\n`
    text += `       RECIBO DE COMISSÃO\n`
    text += `================================\n\n`
    text += `Data: ${format(new Date(date), 'dd/MM/yyyy HH:mm')}\n`
    text += `Profissional: ${barberName}\n\n`
    text += `DETALHES DOS SERVIÇOS:\n`
    text += `--------------------------------\n`

    items.forEach((item) => {
      const info = item.commissionInfo
      let rateLabel = ''
      if (info?.type === 'percentage') {
        rateLabel = `(${info.value}%)`
      } else if (info?.type === 'fixed') {
        rateLabel = `(Fixo R$ ${info.value.toFixed(2)})`
      } else if (item.commissionRate) {
        rateLabel = `(${item.commissionRate}%)`
      }

      const netCommission = item.commissionValue

      text += `Nome do Cliente  : ${item.clientName}\n`
      text += `Serviço          : ${item.serviceName}\n`
      text += `Valor do Serviço : R$ ${item.serviceValue.toFixed(2)}\n`
      text += `Comissão ${rateLabel} : R$ ${netCommission.toFixed(2)}\n`
      text += `--------------------------------\n`
    })

    text += `\nValor Total Pago: R$ ${totalPaid.toFixed(2)}\n`
    text += `================================\n`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-sm mx-auto shadow-md border border-border bg-white text-black font-mono p-6 rounded-md">
      <div className="text-center mb-6 border-b border-dashed border-gray-400 pb-4">
        <h3 className="font-bold text-lg uppercase tracking-widest">Recibo de Comissão</h3>
        <p className="text-sm mt-1 text-gray-600">
          Profissional: <span className="font-bold text-black">{barberName}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Data: {format(new Date(date), 'dd/MM/yyyy HH:mm')}
        </p>
      </div>

      <div className="space-y-4 mb-6 border-b border-dashed border-gray-400 pb-6">
        {items.map((item, i) => {
          const rawItem = item as any
          const info = item.commissionInfo
          let rateLabel = ''
          if (info?.type === 'percentage') {
            rateLabel = `(${info.value}%)`
          } else if (info?.type === 'fixed') {
            rateLabel = `(Fixo R$ ${info.value.toFixed(2)})`
          } else if (item.commissionRate) {
            rateLabel = `(${item.commissionRate}%)`
          }

          const netCommission = item.commissionValue

          return (
            <div
              key={i}
              className="text-sm space-y-2 border border-gray-200 p-3 rounded bg-gray-50"
            >
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="text-gray-500 text-xs uppercase">Nome do Cliente</span>
                <span className="font-bold truncate max-w-[150px]">{item.clientName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="text-gray-500 text-xs uppercase">Serviço</span>
                <span className="font-semibold truncate max-w-[150px]">{item.serviceName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1">
                <span className="text-gray-500 text-xs uppercase">Valor do Serviço</span>
                <span>R$ {item.serviceValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-500 text-xs uppercase font-bold text-primary">
                  Comissão {rateLabel}
                </span>
                <span className="font-bold text-primary">R$ {netCommission.toFixed(2)}</span>
              </div>
            </div>
          )
        })}
        {items.length === 0 && (
          <div className="text-center text-xs text-gray-500 italic">Nenhum serviço listado</div>
        )}
      </div>

      <div className="flex justify-between items-center font-bold text-base mb-6 bg-gray-100 p-3 rounded">
        <span>VALOR TOTAL PAGO</span>
        <span className="text-lg">R$ {totalPaid.toFixed(2)}</span>
      </div>

      <Button
        variant="outline"
        className="w-full font-sans font-medium hover:bg-gray-100 border-gray-300"
        onClick={handleCopy}
      >
        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
        {copied ? 'Copiado para a área de transferência!' : 'Copiar Recibo'}
      </Button>
    </div>
  )
}
