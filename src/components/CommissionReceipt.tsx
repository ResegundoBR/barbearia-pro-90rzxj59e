import { useState } from 'react'
import { format } from 'date-fns'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

export interface ReceiptItem {
  clientName: string
  serviceName: string
  serviceValue: number
  commissionValue: number
}

interface CommissionReceiptProps {
  date: Date | string
  barberName: string
  items: ReceiptItem[]
  totalPaid: number
}

export function CommissionReceipt({ date, barberName, items, totalPaid }: CommissionReceiptProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    let text = `================================\n`
    text += `       RECIBO DE COMISSÃO\n`
    text += `================================\n\n`
    text += `Barbeiro: ${barberName}\n`
    text += `Data: ${format(new Date(date), 'dd/MM/yyyy HH:mm')}\n\n`
    text += `DETALHES DOS SERVIÇOS:\n`
    text += `--------------------------------\n`
    items.forEach((item) => {
      text += `Cliente : ${item.clientName}\n`
      text += `Serviço : ${item.serviceName}\n`
      text += `Valor   : R$ ${item.serviceValue.toFixed(2)}\n`
      text += `Comissão: R$ ${item.commissionValue.toFixed(2)}\n`
      text += `--------------------------------\n`
    })
    text += `\nTOTAL PAGO: R$ ${totalPaid.toFixed(2)}\n`
    text += `================================\n`

    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-sm mx-auto shadow-md border border-border bg-white text-black font-mono p-6 rounded-md">
      <div className="text-center mb-6 border-b border-dashed border-gray-400 pb-4">
        <h3 className="font-bold text-lg uppercase tracking-widest">Recibo de Comissão</h3>
        <p className="text-sm mt-1">{barberName}</p>
        <p className="text-xs text-gray-500 mt-1">{format(new Date(date), 'dd/MM/yyyy HH:mm')}</p>
      </div>

      <div className="space-y-4 mb-6 border-b border-dashed border-gray-400 pb-6">
        {items.map((item, i) => (
          <div key={i} className="text-sm space-y-1">
            <div className="flex justify-between font-bold">
              <span className="truncate mr-2">{item.serviceName}</span>
              <span className="shrink-0">R$ {item.commissionValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span className="truncate mr-2">Cli: {item.clientName}</span>
              <span className="shrink-0">Valor: R$ {item.serviceValue.toFixed(2)}</span>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center text-xs text-gray-500 italic">Nenhum serviço listado</div>
        )}
      </div>

      <div className="flex justify-between items-center font-bold text-base mb-6">
        <span>TOTAL PAGO</span>
        <span>R$ {totalPaid.toFixed(2)}</span>
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
