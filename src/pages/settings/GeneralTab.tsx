import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getCollection, updateRecord, createRecord } from '@/services/settings'
import { toast } from 'sonner'

export default function GeneralTab() {
  const [settings, setSettings] = useState<any[]>([])
  const [appName, setAppName] = useState('')

  const load = async () => {
    try {
      const data = await getCollection('settings')
      setSettings(data)
      const nameSetting = data.find((s: any) => s.key === 'app_name')
      if (nameSetting) setAppName(nameSetting.value?.name || '')
    } catch (error) {
      toast.error('Erro ao carregar configurações')
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleSave = async () => {
    try {
      const nameSetting = settings.find((s: any) => s.key === 'app_name')
      if (nameSetting) {
        await updateRecord('settings', nameSetting.id, { value: { name: appName } })
      } else {
        await createRecord('settings', { key: 'app_name', value: { name: appName } })
      }
      toast.success('Configurações salvas com sucesso')
      load()
    } catch (error) {
      toast.error('Erro ao salvar configurações')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações Gerais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-w-md">
        <div className="space-y-2">
          <Label>Nome da Barbearia</Label>
          <Input
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            placeholder="Ex: La Barberiá"
          />
        </div>
        <Button onClick={handleSave}>Salvar Configurações</Button>
      </CardContent>
    </Card>
  )
}
