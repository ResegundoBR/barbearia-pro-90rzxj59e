import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Upload, FileSpreadsheet } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function parseCSV(str: string) {
  const cleanStr = str.replace(/^\uFEFF/, '')
  const firstLine = cleanStr.split('\n')[0] || ''
  const separator = firstLine.split(';').length > firstLine.split(',').length ? ';' : ','

  const result = []
  let row: string[] = []
  let inQuotes = false
  let val = ''
  for (let i = 0; i < cleanStr.length; i++) {
    const char = cleanStr[i]
    if (inQuotes) {
      if (char === '"') {
        if (str[i + 1] === '"') {
          val += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        val += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === separator) {
        row.push(val)
        val = ''
      } else if (char === '\n') {
        row.push(val)
        result.push(row)
        row = []
        val = ''
      } else if (char === '\r') {
        // ignore
      } else {
        val += char
      }
    }
  }
  row.push(val)
  result.push(row)

  if (result.length < 2) return []
  const headers = result[0].map((h) => h.trim().replace(/^"|"$/g, ''))
  const data = []
  for (let i = 1; i < result.length; i++) {
    if (result[i].length === 1 && result[i][0] === '') continue
    const obj: Record<string, string> = {}
    let hasValues = false
    headers.forEach((h, idx) => {
      const v = result[i][idx]?.trim() || ''
      obj[h] = v
      if (v) hasValues = true
    })
    if (hasValues) data.push(obj)
  }
  return data
}

interface ImportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  onImport: (data: any[]) => Promise<{ success: number; errors: number; errorsList: string[] }>
}

export function ImportDialog({ open, onOpenChange, title, onImport }: ImportDialogProps) {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<{
    success: number
    errors: number
    errorsList: string[]
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      toast({
        title: 'Formato inválido',
        description: 'Por favor, envie um arquivo .csv (recomendado)',
        variant: 'destructive',
      })
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }

    setLoading(true)
    setProgress(10)
    setResults(null)

    try {
      const text = await file.text()
      const parsed = parseCSV(text)
      if (parsed.length === 0) {
        throw new Error('Arquivo vazio ou formato inválido')
      }
      setProgress(30)
      const res = await onImport(parsed)
      setResults(res)
      setProgress(100)
    } catch (err: any) {
      toast({ title: 'Erro ao processar', description: err.message, variant: 'destructive' })
    } finally {
      setLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!loading) {
          onOpenChange(val)
          if (!val) setResults(null)
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Faça upload de um arquivo contendo os dados a serem importados. Para melhor
            compatibilidade, salve sua planilha como .CSV.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted/40 p-4 rounded-lg mt-2 text-sm border">
          <p className="font-semibold mb-2 text-foreground">Modelo Padrão (Google Sheets):</p>
          <p className="text-muted-foreground mb-4">
            Para garantir que a importação funcione perfeitamente, utilize o nosso modelo oficial
            com os cabeçalhos corretos.
          </p>
          <Button variant="secondary" size="sm" className="w-full sm:w-auto" asChild>
            <a
              href="https://docs.google.com/spreadsheets/d/1Xy9oZ02tVbOqXgT0WbVb_A_mXQ-d8lWn2l4_5aXfA/copy"
              target="_blank"
              rel="noreferrer"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Fazer cópia do modelo
            </a>
          </Button>
        </div>

        <div className="py-4 space-y-4">
          {!loading && !results && (
            <div className="flex justify-center flex-col items-center border-2 border-dashed border-border rounded-xl p-8 bg-muted/20">
              <FileSpreadsheet className="w-10 h-10 text-muted-foreground mb-4" />
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                Selecionar Arquivo CSV
              </Button>
              <input
                type="file"
                accept=".csv,.xlsx"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          )}

          {loading && (
            <div className="space-y-2">
              <p className="text-sm text-center font-medium">Processando linhas...</p>
              <Progress value={progress} />
            </div>
          )}

          {results && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md text-center">
                <p className="font-semibold text-emerald-600">
                  {results.success} registros importados com sucesso!
                </p>
                {results.errors > 0 && (
                  <p className="font-semibold text-destructive mt-1">
                    {results.errors} erros encontrados
                  </p>
                )}
              </div>
              {results.errorsList.length > 0 && (
                <div className="max-h-40 overflow-y-auto text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  <ul className="list-disc pl-4 space-y-1">
                    {results.errorsList.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            {results ? 'Fechar' : 'Cancelar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
