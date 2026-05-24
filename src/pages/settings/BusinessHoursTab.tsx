import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getCollection, updateRecord, createRecord } from '@/services/settings'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export default function BusinessHoursTab() {
  const [hours, setHours] = useState<any[]>([])

  const load = async () => {
    try {
      const data = await getCollection('business_hours')
      setHours(data)
    } catch (error) {
      toast.error('Erro ao carregar horários')
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleUpdate = async (id: string, data: any) => {
    try {
      if (id) {
        await updateRecord('business_hours', id, data)
      } else {
        await createRecord('business_hours', data)
      }
      toast.success('Horário atualizado')
      load()
    } catch (error) {
      toast.error('Erro ao atualizar horário')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horário de Funcionamento</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dia</TableHead>
              <TableHead>Abertura</TableHead>
              <TableHead>Fechamento</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DAYS.map((dayName, index) => {
              const h = hours.find((h) => String(h.day_of_week) === String(index)) || {
                day_of_week: String(index),
                open_time: '09:00',
                close_time: '18:00',
                is_active: false,
              }
              return (
                <TableRow key={index}>
                  <TableCell>{dayName}</TableCell>
                  <TableCell>
                    <Input
                      type="time"
                      defaultValue={h.open_time}
                      onBlur={(e) => {
                        h.open_time = e.target.value
                      }}
                      className="w-32"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="time"
                      defaultValue={h.close_time}
                      onBlur={(e) => {
                        h.close_time = e.target.value
                      }}
                      className="w-32"
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={h.is_active}
                      onCheckedChange={(c) => {
                        h.is_active = c
                        handleUpdate(h.id, h)
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => handleUpdate(h.id, h)}>
                      Salvar
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
