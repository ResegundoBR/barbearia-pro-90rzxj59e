import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import pb from '@/lib/pocketbase/client'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function GeralTab() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [name, setName] = useState('')
  const [id, setId] = useState('')

  useEffect(() => {
    pb.collection('settings')
      .getFirstListItem('key="general"')
      .then((record) => {
        setId(record.id)
        setName(record.value?.name || '')
      })
      .catch(() => {
        // Ignored if not found
      })
      .finally(() => setFetching(false))
  }, [])

  const handleSave = async () => {
    setLoading(true)
    try {
      const data = { key: 'general', value: { name } }
      if (id) {
        await pb.collection('settings').update(id, data)
      } else {
        const record = await pb.collection('settings').create(data)
        setId(record.id)
      }
      toast.success('Configurações gerais salvas com sucesso!')
    } catch {
      toast.error('Erro ao salvar as configurações.')
    } finally {
      setLoading(false)
    }
  }

  if (fetching)
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Carregando...</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações Gerais</CardTitle>
        <CardDescription>Gerencie as informações principais do seu negócio.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="business-name">Nome do Negócio</Label>
          <Input
            id="business-name"
            placeholder="Minha Barbearia"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={loading}>
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Salvar Alterações
        </Button>
      </CardFooter>
    </Card>
  )
}
