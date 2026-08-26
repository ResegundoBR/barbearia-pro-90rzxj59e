import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import {
  Plus,
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Check,
  ChevronsUpDown,
  Edit2,
  Clock,
  User,
  Scissors,
  CalendarDays,
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  getBarbers,
  getAppointments,
  getClients,
  getServices,
  createAppointment,
  getClientPackages,
  createClient,
  updateAppointment,
} from '@/services/api'
import {
  getBarberBlocks,
  createBarberBlock,
  deleteBarberBlock,
  updateBarberBlock,
} from '@/services/barber_blocks'
import { useToast } from '@/hooks/use-toast'
import { useRealtime } from '@/hooks/use-realtime'
import { getErrorMessage } from '@/lib/pocketbase/errors'
import {
  format,
  addMinutes,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isSameMonth,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  isValid,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn, getContrastColor } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { useIsMobile } from '@/hooks/use-mobile'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/components/ui/drawer'
import pb from '@/lib/pocketbase/client'

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8) // 08:00 to 20:00

export default function Agenda() {
  const isMobile = useIsMobile()
  const { user } = useAuth()
  const { toast } = useToast()
  const [data, setData] = useState({
    barbers: [] as any[],
    apts: [] as any[],
    clients: [] as any[],
    services: [] as any[],
    packages: [] as any[],
  })
  const [blocks, setBlocks] = useState<any[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<'day' | 'week' | 'month'>('week')
  const [agendaFormat, setAgendaFormat] = useState<'grid' | 'list'>('grid')
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [barberFilter, setBarberFilter] = useState<string>('all')

  // Drag and Drop state
  const [draggedItem, setDraggedItem] = useState<any | null>(null)
  const [dragOverTarget, setDragOverTarget] = useState<{
    dayKey: string
    barberId: string
    startMins: number
    durationMinutes: number
  } | null>(null)

  // Touch drag state
  const touchStateRef = useRef<{
    item: any | null
    startX: number
    startY: number
    isDragging: boolean
    hasMoved: boolean
    touchTimer: any
  }>({
    item: null,
    startX: 0,
    startY: 0,
    isDragging: false,
    hasMoved: false,
    touchTimer: null,
  })

  // Conflict dialog state
  const [conflictDialogOpen, setConflictDialogOpen] = useState(false)
  const [conflictData, setConflictData] = useState<{
    item: any
    targetBarberId: string
    targetDate: Date
    targetStartMins: number
    targetEndMins: number
    suggestedStartMins: number | null
    suggestedEndMins: number | null
    conflictingEvents: any[]
  } | null>(null)

  const [blockDialogOpen, setBlockDialogOpen] = useState(false)
  const [blockForm, setBlockForm] = useState({
    barber_id: '',
    start_date: new Date(),
    start_time: '09:00',
    end_date: new Date(),
    end_time: '18:00',
    reason: '',
  })

  const [form, setForm] = useState({
    barber_id: '',
    client_id: '',
    item_id: '',
    time: '09:00',
    date: new Date(),
  })
  const [clientSearchOpen, setClientSearchOpen] = useState(false)
  const [newClient, setNewClient] = useState({ name: '', phone: '' })
  const [newClientDialogOpen, setNewClientDialogOpen] = useState(false)

  // Edit/View Dialog State
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedApt, setSelectedApt] = useState<any>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editForm, setEditForm] = useState({
    barber_id: '',
    service_id: '',
    date: new Date(),
    time: '',
    end_time: '',
    status: '',
  })
  const [editBlockForm, setEditBlockForm] = useState({
    barber_id: '',
    start_date: new Date(),
    start_time: '09:00',
    end_date: new Date(),
    end_time: '18:00',
    reason: '',
  })

  const loadData = async () => {
    let start, end
    if (isMobile || view === 'day') {
      start = selectedDate
      end = selectedDate
    } else if (view === 'week') {
      start = startOfWeek(selectedDate, { weekStartsOn: 0 })
      end = endOfWeek(selectedDate, { weekStartsOn: 0 })
    } else {
      start = startOfWeek(startOfMonth(selectedDate), { weekStartsOn: 0 })
      end = endOfWeek(endOfMonth(selectedDate), { weekStartsOn: 0 })
    }

    if (!isValid(start) || !isValid(end)) return

    const startStr = format(start, 'yyyy-MM-dd 00:00:00')
    const endStr = format(end, 'yyyy-MM-dd 23:59:59')

    const fetchedBarbers = await getBarbers()

    setData({
      barbers: fetchedBarbers,
      apts: await getAppointments(`date >= "${startStr}" && date <= "${endStr}"`),
      clients: await getClients(),
      services: await getServices(),
      packages: await getClientPackages(),
    })

    const orgId = pb.authStore.record?.organization_id
    let blockFilter = `start_time <= "${endStr}" && end_time >= "${startStr}"`
    if (orgId) blockFilter += ` && organization_id='${orgId}'`
    const bBlocks = await getBarberBlocks(blockFilter)
    setBlocks(bBlocks)
  }

  useEffect(() => {
    loadData()
  }, [selectedDate, view])
  useRealtime('appointments', loadData)
  useRealtime('product_purchases', loadData)
  useRealtime('payment_methods', loadData)
  useRealtime('barber_blocks', loadData)

  const canSeeAll = user?.access_level === 'Admin' || user?.access_level === 'Socio'
  const visibleBarbers = useMemo(
    () =>
      canSeeAll
        ? data.barbers
        : data.barbers.filter((b) => b.user_id === user?.id || b.name === user?.name),
    [canSeeAll, data.barbers, user],
  )

  useEffect(() => {
    if (!canSeeAll && visibleBarbers.length > 0 && barberFilter === 'all') {
      setBarberFilter(visibleBarbers[0].id)
    }
  }, [canSeeAll, visibleBarbers, barberFilter])

  const handleOpen = (timeStr = '09:00', day: Date = new Date()) => {
    const defaultBarber = canSeeAll ? '' : visibleBarbers[0]?.id || ''
    setForm({ barber_id: defaultBarber, client_id: '', item_id: '', time: timeStr, date: day })
    setNewClient({ name: '', phone: '' })
    setNewClientDialogOpen(false)
    setClientSearchOpen(false)
    setIsOpen(true)
  }

  const navigatePrev = () => {
    if (isMobile || view === 'day') setSelectedDate(subDays(selectedDate, 1))
    else if (view === 'week') setSelectedDate(subWeeks(selectedDate, 1))
    else if (view === 'month') setSelectedDate(subMonths(selectedDate, 1))
  }
  const navigateNext = () => {
    if (isMobile || view === 'day') setSelectedDate(addDays(selectedDate, 1))
    else if (view === 'week') setSelectedDate(addWeeks(selectedDate, 1))
    else if (view === 'month') setSelectedDate(addMonths(selectedDate, 1))
  }

  const handleCreateBlock = async () => {
    if (!blockForm.barber_id)
      return toast({ title: 'Selecione um profissional', variant: 'destructive' })
    if (!blockForm.start_date || !blockForm.end_date)
      return toast({ title: 'Selecione as datas', variant: 'destructive' })
    if (!isValid(blockForm.start_date) || !isValid(blockForm.end_date))
      return toast({ title: 'Datas inválidas', variant: 'destructive' })

    const [sh, sm] = blockForm.start_time.split(':').map(Number)
    const start = new Date(blockForm.start_date)
    start.setHours(sh, sm, 0, 0)

    const [eh, em] = blockForm.end_time.split(':').map(Number)
    const end = new Date(blockForm.end_date)
    end.setHours(eh, em, 0, 0)

    if (end <= start) {
      return toast({
        title: 'Data/Hora final deve ser maior que a inicial',
        variant: 'destructive',
      })
    }

    try {
      await createBarberBlock({
        barber_id: blockForm.barber_id,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        reason: blockForm.reason,
        organization_id: user?.organization_id,
      })
      toast({ title: 'Horário bloqueado com sucesso!' })
      setBlockDialogOpen(false)
      loadData()
    } catch (err) {
      toast({ title: getErrorMessage(err) || 'Erro ao bloquear horário', variant: 'destructive' })
    }
  }

  const handleUpdateBlock = async () => {
    if (!editBlockForm.barber_id)
      return toast({ title: 'Selecione um profissional', variant: 'destructive' })
    if (!editBlockForm.start_date || !editBlockForm.end_date)
      return toast({ title: 'Selecione as datas', variant: 'destructive' })
    if (!isValid(editBlockForm.start_date) || !isValid(editBlockForm.end_date))
      return toast({ title: 'Datas inválidas', variant: 'destructive' })

    const [sh, sm] = editBlockForm.start_time.split(':').map(Number)
    const start = new Date(editBlockForm.start_date)
    start.setHours(sh, sm, 0, 0)

    const [eh, em] = editBlockForm.end_time.split(':').map(Number)
    const end = new Date(editBlockForm.end_date)
    end.setHours(eh, em, 0, 0)

    if (end <= start) {
      return toast({
        title: 'Data/Hora final deve ser maior que a inicial',
        variant: 'destructive',
      })
    }

    try {
      await updateBarberBlock(selectedApt.id, {
        barber_id: editBlockForm.barber_id,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        reason: editBlockForm.reason,
      })
      toast({ title: 'Bloqueio atualizado com sucesso!' })
      setDetailOpen(false)
      loadData()
    } catch (err) {
      toast({ title: getErrorMessage(err) || 'Erro ao atualizar bloqueio', variant: 'destructive' })
    }
  }

  const handleDeleteBlock = async (id: string) => {
    try {
      await deleteBarberBlock(id)
      toast({ title: 'Bloqueio removido!' })
      setDetailOpen(false)
      loadData()
    } catch (err) {
      toast({ title: getErrorMessage(err) || 'Erro ao remover bloqueio', variant: 'destructive' })
    }
  }

  const handleClientCreate = async () => {
    if (!newClient.name || !newClient.phone) {
      return toast({ title: 'Preencha nome e celular', variant: 'destructive' })
    }
    try {
      const c = await createClient({
        ...newClient,
        location_type: 'nearby',
        is_active: true,
        organization_id: user?.organization_id,
      })
      setData((prev) => ({ ...prev, clients: [c, ...prev.clients] }))
      setForm((f) => ({ ...f, client_id: c.id }))
      setNewClientDialogOpen(false)
      toast({ title: 'Cliente criado!' })
    } catch (err) {
      toast({ title: getErrorMessage(err) || 'Erro ao criar cliente', variant: 'destructive' })
    }
  }

  const handleBooking = async () => {
    if (!form.client_id) return toast({ title: 'Selecione um cliente', variant: 'destructive' })
    if (!form.item_id)
      return toast({ title: 'Selecione um serviço ou pacote', variant: 'destructive' })
    if (!form.barber_id)
      return toast({ title: 'Selecione um profissional', variant: 'destructive' })
    if (!form.date) return toast({ title: 'Selecione a data', variant: 'destructive' })
    if (!form.time) return toast({ title: 'Selecione um horário', variant: 'destructive' })
    if (!isValid(form.date)) return toast({ title: 'Data inválida', variant: 'destructive' })

    try {
      const isPkg = form.item_id.startsWith('pkg_')
      const id = form.item_id.replace('pkg_', '').replace('svc_', '')
      const activePackage = isPkg ? data.packages.find((p) => p.id === id) : null
      const svc = isPkg
        ? activePackage?.expand?.package_id?.expand?.service_id
        : data.services.find((s) => s.id === id)

      const svcId = isPkg
        ? activePackage?.expand?.package_id?.service_id || svc?.id
        : form.item_id.replace('svc_', '')

      const duration =
        activePackage?.expand?.package_id?.duration_minutes || svc?.duration_minutes || 30
      const [h, m] = form.time.split(':').map(Number)
      const startDate = new Date()
      startDate.setHours(h, m, 0, 0)
      const end_time = format(addMinutes(startDate, duration), 'HH:mm')

      const payload: any = {
        barber_id: form.barber_id,
        client_id: form.client_id,
        service_id: svcId,
        time: form.time,
        end_time,
        date: format(form.date, 'yyyy-MM-dd 12:00:00'),
        status: 'Confirmado',
        price: isPkg ? 0 : svc?.price || 0,
        organization_id: user?.organization_id,
      }

      if (isPkg && activePackage) {
        payload.client_package_id = activePackage.id
      }

      await createAppointment(payload)

      if (isPkg && activePackage) {
        toast({ title: 'Agendamento salvo. 1 crédito será deduzido no checkout.' })
      } else {
        toast({ title: 'Agendamento salvo!' })
      }
      setIsOpen(false)
      loadData()
    } catch (err: any) {
      toast({ title: getErrorMessage(err) || 'Erro ao agendar', variant: 'destructive' })
    }
  }

  const handleOpenDetail = (apt: any) => {
    setSelectedApt(apt)
    if (apt.isBlock) {
      const startDate = new Date(apt.original_start_time || apt.start_time)
      const endDate = new Date(apt.original_end_time || apt.end_time)
      setEditBlockForm({
        barber_id: apt.barber_id || '',
        start_date: isValid(startDate) ? startDate : new Date(),
        start_time: isValid(startDate) ? format(startDate, 'HH:mm') : '09:00',
        end_date: isValid(endDate) ? endDate : new Date(),
        end_time: isValid(endDate) ? format(endDate, 'HH:mm') : '18:00',
        reason: apt.reason || '',
      })
    } else {
      let parsedDate = new Date()
      if (apt.date) {
        const d = new Date(apt.date)
        if (isValid(d)) {
          parsedDate = d
        }
      }
      setEditForm({
        barber_id: apt.barber_id || '',
        service_id: apt.service_id || '',
        date: parsedDate,
        time: apt.time || '',
        end_time: apt.end_time || '',
        status: apt.status || 'Confirmado',
      })
    }
    setIsEditMode(false)
    setDetailOpen(true)
  }

  const handleUpdateBooking = async () => {
    if (!editForm.barber_id || !editForm.service_id || !editForm.date || !editForm.time) {
      return toast({ title: 'Preencha os campos obrigatórios.', variant: 'destructive' })
    }
    if (!isValid(editForm.date)) {
      return toast({ title: 'Data inválida.', variant: 'destructive' })
    }
    try {
      const payload = {
        barber_id: editForm.barber_id,
        service_id: editForm.service_id,
        time: editForm.time,
        end_time: editForm.end_time,
        date: format(editForm.date, 'yyyy-MM-dd 12:00:00'),
        status: editForm.status,
      }
      await updateAppointment(selectedApt.id, payload)
      toast({ title: 'Agendamento atualizado com sucesso!' })
      setDetailOpen(false)
      loadData()
    } catch (err) {
      toast({ title: getErrorMessage(err) || 'Erro ao atualizar', variant: 'destructive' })
    }
  }

  const timeSlots = Array.from({ length: 13 * 4 }, (_, i) => {
    const h = Math.floor(i / 4) + 8
    const m = (i % 4) * 15
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
  })

  const clientPkgs = data.packages.filter(
    (p) =>
      p.client_id === form.client_id &&
      p.remaining_uses > 0 &&
      (!p.expires_at || new Date(p.expires_at) >= new Date()),
  )

  const filteredApts = useMemo(() => {
    if (barberFilter === 'all') return data.apts
    return data.apts.filter((a) => a.barber_id === barberFilter)
  }, [data.apts, barberFilter])

  const filteredBlocks = useMemo(() => {
    if (barberFilter === 'all') return blocks
    return blocks.filter((b) => b.barber_id === barberFilter)
  }, [blocks, barberFilter])

  const getEventsForDay = useCallback(
    (day: Date, targetBarberId?: string) => {
      if (!isValid(day)) return []

      const dayStr = format(day, 'yyyy-MM-dd')
      const targetApts = targetBarberId
        ? data.apts.filter((a) => a.barber_id === targetBarberId)
        : filteredApts
      const dayApts = targetApts.filter((a) => a.date && a.date.startsWith(dayStr))

      const dStart = new Date(day)
      dStart.setHours(0, 0, 0, 0)
      const dEnd = new Date(day)
      dEnd.setHours(23, 59, 59, 999)

      const targetBlocks = targetBarberId
        ? blocks.filter((b) => b.barber_id === targetBarberId)
        : filteredBlocks
      const dayBlocks = targetBlocks
        .filter((b) => {
          if (!b.start_time || !b.end_time) return false
          const bStart = new Date(b.start_time)
          const bEnd = new Date(b.end_time)
          if (!isValid(bStart) || !isValid(bEnd)) return false
          return bStart <= dEnd && bEnd >= dStart
        })
        .map((b) => {
          const bStart = new Date(b.start_time)
          const bEnd = new Date(b.end_time)
          const isSameStartDay = isValid(bStart) && format(bStart, 'yyyy-MM-dd') === dayStr
          const isSameEndDay = isValid(bEnd) && format(bEnd, 'yyyy-MM-dd') === dayStr

          return {
            ...b,
            isBlock: true,
            date: format(day, 'yyyy-MM-dd 12:00:00'),
            time: isSameStartDay ? format(bStart, 'HH:mm') : '08:00',
            end_time: isSameEndDay ? format(bEnd, 'HH:mm') : '20:00',
            original_start_time: b.start_time,
            original_end_time: b.end_time,
            status: 'Bloqueado',
            expand: {
              barber_id: data.barbers.find((barb) => barb.id === b.barber_id),
            },
          }
        })

      return [...dayApts, ...dayBlocks]
    },
    [data.apts, filteredApts, blocks, filteredBlocks, data.barbers],
  )

  // Execute move / update appointment or block
  const executeMove = async (
    item: any,
    targetBarberId: string,
    targetDate: Date,
    targetStartMins: number,
    targetEndMins: number,
  ) => {
    const startHour = Math.floor(targetStartMins / 60)
      .toString()
      .padStart(2, '0')
    const startMin = (targetStartMins % 60).toString().padStart(2, '0')
    const startTimeStr = `${startHour}:${startMin}`

    const endHour = Math.floor(targetEndMins / 60)
      .toString()
      .padStart(2, '0')
    const endMin = (targetEndMins % 60).toString().padStart(2, '0')
    const endTimeStr = `${endHour}:${endMin}`

    const dateStr = format(targetDate, 'yyyy-MM-dd 12:00:00')

    try {
      if (item.isBlock) {
        const start = new Date(targetDate)
        start.setHours(Math.floor(targetStartMins / 60), targetStartMins % 60, 0, 0)

        const end = new Date(targetDate)
        end.setHours(Math.floor(targetEndMins / 60), targetEndMins % 60, 0, 0)

        await updateBarberBlock(item.id, {
          barber_id: targetBarberId,
          start_time: start.toISOString(),
          end_time: end.toISOString(),
        })
        toast({ title: 'Bloqueio remanejado com sucesso!' })
      } else {
        const payload: any = {
          barber_id: targetBarberId,
          date: dateStr,
          time: startTimeStr,
          end_time: endTimeStr,
        }
        await updateAppointment(item.id, payload)
        toast({
          title: 'Agendamento atualizado com sucesso!',
          description: `${format(targetDate, 'dd/MM')} às ${startTimeStr}`,
        })
      }
      loadData()
    } catch (err) {
      toast({
        title: getErrorMessage(err) || 'Erro ao mover item',
        variant: 'destructive',
      })
    } finally {
      setConflictDialogOpen(false)
      setConflictData(null)
      setDraggedItem(null)
      setDragOverTarget(null)
    }
  }

  // Handle Drop and Conflict Detection
  const handleDropOnSlot = (targetDay: Date, targetBarberId: string, targetStartMins: number) => {
    if (!draggedItem) return

    const item = draggedItem
    const itemStartMins = item.startMins ?? 9 * 60
    const itemEndMins = item.endMins ?? itemStartMins + 30
    const durationMinutes = Math.max(15, itemEndMins - itemStartMins)
    const targetEndMins = targetStartMins + durationMinutes

    // Check if anything actually changed (same barber, same day, same start time)
    const originalDate = item.date ? new Date(item.date) : new Date()
    const isSameDate = isValid(originalDate) && isSameDay(originalDate, targetDay)
    const isSameBarber = item.barber_id === targetBarberId
    const isSameTime = item.startMins === targetStartMins

    if (isSameDate && isSameBarber && isSameTime) {
      setDraggedItem(null)
      setDragOverTarget(null)
      return
    }

    // Check conflicts on destination barber and date
    const dayEvents = getEventsForDay(targetDay, targetBarberId)
    const conflicts = dayEvents.filter((evt) => {
      if (evt.id === item.id) return false // ignore self
      if (evt.status === 'Cancelado') return false // ignore cancelled

      const [sH, sM] = (evt.time || '00:00').split(':').map(Number)
      const [eH, eM] = (evt.end_time || evt.time || '00:00').split(':').map(Number)
      const eStart = sH * 60 + sM
      const eDuration = (eH - sH) * 60 + (eM - sM)
      const eEnd = eStart + Math.max(15, eDuration > 0 ? eDuration : 30)

      // Overlap condition: start < otherEnd && end > otherStart
      return targetStartMins < eEnd && targetEndMins > eStart
    })

    if (conflicts.length > 0) {
      // Find next free slot on that day for target barber
      // Working hours 08:00 (480) to 20:00 (1200)
      const activeEvents = dayEvents
        .filter((evt) => evt.id !== item.id && evt.status !== 'Cancelado')
        .map((evt) => {
          const [sH, sM] = (evt.time || '00:00').split(':').map(Number)
          const [eH, eM] = (evt.end_time || evt.time || '00:00').split(':').map(Number)
          const eStart = sH * 60 + sM
          const eDuration = (eH - sH) * 60 + (eM - sM)
          const eEnd = eStart + Math.max(15, eDuration > 0 ? eDuration : 30)
          return { startMins: eStart, endMins: eEnd }
        })
        .sort((a, b) => a.startMins - b.startMins)

      let suggestedStartMins: number | null = null
      let suggestedEndMins: number | null = null

      // Search starting from targetStartMins in 15-min increments
      for (
        let testStart = targetStartMins + 15;
        testStart <= 20 * 60 - durationMinutes;
        testStart += 15
      ) {
        const testEnd = testStart + durationMinutes
        const hasCollision = activeEvents.some(
          (e) => testStart < e.endMins && testEnd > e.startMins,
        )
        if (!hasCollision) {
          suggestedStartMins = testStart
          suggestedEndMins = testEnd
          break
        }
      }

      // If not found after targetStartMins, search from beginning of day 08:00
      if (suggestedStartMins === null) {
        for (let testStart = 8 * 60; testStart < targetStartMins; testStart += 15) {
          const testEnd = testStart + durationMinutes
          const hasCollision = activeEvents.some(
            (e) => testStart < e.endMins && testEnd > e.startMins,
          )
          if (!hasCollision) {
            suggestedStartMins = testStart
            suggestedEndMins = testEnd
            break
          }
        }
      }

      setConflictData({
        item,
        targetBarberId,
        targetDate: targetDay,
        targetStartMins,
        targetEndMins,
        suggestedStartMins,
        suggestedEndMins,
        conflictingEvents: conflicts,
      })
      setConflictDialogOpen(true)
      setDraggedItem(null)
      setDragOverTarget(null)
      return
    }

    // No conflict: execute move directly
    executeMove(item, targetBarberId, targetDay, targetStartMins, targetEndMins)
  }

  // Handle Touch drag start, move, end
  const handleTouchStart = (e: React.TouchEvent, apt: any) => {
    const touch = e.touches[0]
    touchStateRef.current = {
      item: apt,
      startX: touch.clientX,
      startY: touch.clientY,
      isDragging: false,
      hasMoved: false,
      touchTimer: setTimeout(() => {
        touchStateRef.current.isDragging = true
        setDraggedItem(apt)
        if (navigator.vibrate) navigator.vibrate(50)
      }, 300),
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    const state = touchStateRef.current
    const dx = Math.abs(touch.clientX - state.startX)
    const dy = Math.abs(touch.clientY - state.startY)

    if (dx > 10 || dy > 10) {
      state.hasMoved = true
      if (!state.isDragging) {
        clearTimeout(state.touchTimer)
      }
    }

    if (state.isDragging && state.item) {
      e.preventDefault()
      const elem = document.elementFromPoint(touch.clientX, touch.clientY)
      const slotElem = elem?.closest('[data-slot-time]') as HTMLElement | null
      if (slotElem) {
        const slotDay = slotElem.getAttribute('data-slot-day')
        const slotTime = slotElem.getAttribute('data-slot-time')
        const slotBarber = slotElem.getAttribute('data-slot-barber')
        if (slotDay && slotTime && slotBarber) {
          const [sh, sm] = slotTime.split(':').map(Number)
          const startMins = sh * 60 + sm
          const duration = Math.max(
            15,
            (state.item.endMins || startMins + 30) - (state.item.startMins || startMins),
          )
          setDragOverTarget({
            dayKey: slotDay,
            barberId: slotBarber,
            startMins,
            durationMinutes: duration,
          })
        }
      }
    }
  }

  const handleTouchEnd = () => {
    const state = touchStateRef.current
    clearTimeout(state.touchTimer)

    if (state.isDragging && state.item && dragOverTarget) {
      const targetDate = new Date(dragOverTarget.dayKey)
      handleDropOnSlot(targetDate, dragOverTarget.barberId, dragOverTarget.startMins)
    }

    touchStateRef.current = {
      item: null,
      startX: 0,
      startY: 0,
      isDragging: false,
      hasMoved: false,
      touchTimer: null,
    }
    setDragOverTarget(null)
  }

  const renderDayColumn = (day: Date, specificBarberId?: string) => {
    const targetBarber = specificBarberId || (barberFilter !== 'all' ? barberFilter : '')
    const rawEvents = getEventsForDay(day, specificBarberId)
    const dayKey = isValid(day) ? format(day, 'yyyy-MM-dd') : ''

    const eventsWithMins = rawEvents
      .map((apt) => {
        let status = apt.status
        if (status === 'Concluído' && apt.date) {
          const aptDateTime = new Date(`${apt.date.split(' ')[0]}T${apt.time || '00:00'}`)
          if (isValid(aptDateTime) && aptDateTime > new Date()) {
            status = 'Confirmado'
          }
        }

        const [sH, sM] = (apt.time || '00:00').split(':').map(Number)
        const [eH, eM] = (apt.end_time || apt.time || '00:00').split(':').map(Number)
        const startMins = sH * 60 + sM
        const durationMinutes = (eH - sH) * 60 + (eM - sM)
        const minDuration = apt.isBlock ? 15 : 30
        const endMins =
          startMins + Math.max(15, durationMinutes > 0 ? durationMinutes : minDuration)
        return { ...apt, status, startMins, endMins }
      })
      .sort((a, b) => a.startMins - b.startMins)

    const groups: (typeof eventsWithMins)[] = []
    let currentGroup: typeof eventsWithMins = []
    let groupEnd = 0

    eventsWithMins.forEach((evt) => {
      if (currentGroup.length === 0) {
        currentGroup.push(evt)
        groupEnd = evt.endMins
      } else if (evt.startMins < groupEnd) {
        currentGroup.push(evt)
        groupEnd = Math.max(groupEnd, evt.endMins)
      } else {
        groups.push(currentGroup)
        currentGroup = [evt]
        groupEnd = evt.endMins
      }
    })
    if (currentGroup.length > 0) groups.push(currentGroup)

    const positionedEvents: any[] = []
    groups.forEach((group) => {
      const cols: (typeof eventsWithMins)[] = []
      group.forEach((evt) => {
        let placed = false
        for (let col of cols) {
          const lastEvent = col[col.length - 1]
          if (lastEvent.endMins <= evt.startMins) {
            col.push(evt)
            placed = true
            break
          }
        }
        if (!placed) cols.push([evt])
      })

      const numCols = cols.length
      cols.forEach((col, colIndex) => {
        col.forEach((evt) => {
          positionedEvents.push({
            ...evt,
            overlapIndex: colIndex,
            overlapCount: numCols,
          })
        })
      })
    })

    const barberObj = specificBarberId ? data.barbers.find((b) => b.id === specificBarberId) : null

    const isDropOverThisCol =
      dragOverTarget &&
      dragOverTarget.dayKey === dayKey &&
      (!specificBarberId || dragOverTarget.barberId === specificBarberId)

    return (
      <div
        key={`${dayKey}_${specificBarberId || 'all'}`}
        className="flex-1 border-r min-w-[140px] relative select-none"
      >
        {view === 'week' && isValid(day) && (
          <div className="h-12 border-b flex flex-col items-center justify-center bg-muted/20 sticky top-0 z-20">
            <span className="text-xs uppercase font-medium">
              {format(day, 'EEE', { locale: ptBR })}
            </span>
            <span
              className={cn(
                'text-sm font-semibold rounded-full w-6 h-6 flex items-center justify-center',
                isSameDay(day, new Date()) ? 'bg-primary text-primary-foreground' : '',
              )}
            >
              {format(day, 'dd')}
            </span>
            {barberObj && (
              <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                {barberObj.name}
              </span>
            )}
          </div>
        )}
        {view === 'day' && barberObj && (
          <div className="h-10 border-b flex items-center justify-center bg-muted/20 sticky top-0 z-20 px-2">
            <div
              className="w-2.5 h-2.5 rounded-full mr-2 shrink-0"
              style={{ backgroundColor: barberObj.color || 'hsl(var(--primary))' }}
            />
            <span className="text-xs font-semibold truncate">{barberObj.name}</span>
          </div>
        )}
        <div className="relative" style={{ height: HOURS.length * 60 }}>
          {HOURS.map((h) => {
            const hStr = h.toString().padStart(2, '0')
            return (
              <div key={h} className="h-[60px] border-b border-border/50 relative">
                {/* 4 quarter-hour sub-slots (15 mins each) */}
                {[0, 15, 30, 45].map((m) => {
                  const mStr = m.toString().padStart(2, '0')
                  const slotTimeStr = `${hStr}:${mStr}`
                  const slotStartMins = h * 60 + m
                  const defaultBarberForSlot =
                    targetBarber ||
                    (draggedItem?.barber_id ? draggedItem.barber_id : visibleBarbers[0]?.id || '')

                  return (
                    <div
                      key={m}
                      data-slot-day={dayKey}
                      data-slot-time={slotTimeStr}
                      data-slot-barber={defaultBarberForSlot}
                      className={cn(
                        'h-[15px] border-t border-border/10 first:border-t-0 hover:bg-muted/15 cursor-pointer transition-colors',
                        m === 0 && 'cursor-pointer',
                      )}
                      onClick={() => handleOpen(slotTimeStr, day)}
                      onDragOver={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        e.dataTransfer.dropEffect = 'move'
                        const duration = draggedItem
                          ? Math.max(15, (draggedItem.endMins || 30) - (draggedItem.startMins || 0))
                          : 30
                        if (
                          !dragOverTarget ||
                          dragOverTarget.dayKey !== dayKey ||
                          dragOverTarget.startMins !== slotStartMins ||
                          dragOverTarget.barberId !== defaultBarberForSlot
                        ) {
                          setDragOverTarget({
                            dayKey,
                            barberId: defaultBarberForSlot,
                            startMins: slotStartMins,
                            durationMinutes: duration,
                          })
                        }
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault()
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        const rawData = e.dataTransfer.getData('application/json')
                        let item = draggedItem
                        if (!item && rawData) {
                          try {
                            item = JSON.parse(rawData)
                          } catch {
                            /* intentionally ignored */
                          }
                        }
                        if (item) {
                          const barberToUse =
                            defaultBarberForSlot || item.barber_id || visibleBarbers[0]?.id || ''
                          handleDropOnSlot(day, barberToUse, slotStartMins)
                        }
                      }}
                    />
                  )
                })}
              </div>
            )
          })}

          {/* Visual Drop Shadow / Highlight Preview Indicator */}
          {isDropOverThisCol && dragOverTarget && (
            <div
              className="absolute left-1 right-1 rounded-md border-2 border-dashed border-primary bg-primary/20 pointer-events-none z-30 transition-all duration-75 flex flex-col justify-between p-1 shadow-md animate-pulse"
              style={{
                top: dragOverTarget.startMins - 8 * 60,
                height: Math.max(20, dragOverTarget.durationMinutes),
              }}
            >
              <div className="flex items-center justify-between text-[9px] font-bold text-primary truncate">
                <span>Soltar aqui</span>
                <span>
                  {Math.floor(dragOverTarget.startMins / 60)
                    .toString()
                    .padStart(2, '0')}
                  :{(dragOverTarget.startMins % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          )}

          {positionedEvents.map((apt) => {
            const top = apt.startMins - 8 * 60
            const height = apt.endMins - apt.startMins
            const widthPct = 100 / apt.overlapCount
            const leftPct = apt.overlapIndex * widthPct

            const barberColor = apt.expand?.barber_id?.color || 'hsl(var(--primary))'
            const isCanceled = apt.status === 'Cancelado'
            const isCompleted = apt.status === 'Concluído'
            const isFaltou = apt.status === 'FALTOU'
            const isBlock = apt.isBlock
            const isMissed = isFaltou
            const isCurrentlyDragging = draggedItem?.id === apt.id

            const bgColor = isMissed ? '#000000' : isBlock ? '#e5e7eb' : barberColor
            const textColor = isBlock ? '#374151' : getContrastColor(bgColor)

            return (
              <div
                key={apt.id}
                draggable={!isCompleted && !isCanceled}
                onDragStart={(e) => {
                  setDraggedItem(apt)
                  e.dataTransfer.setData('application/json', JSON.stringify(apt))
                  e.dataTransfer.effectAllowed = 'move'
                }}
                onDragEnd={() => {
                  setDraggedItem(null)
                  setDragOverTarget(null)
                }}
                onTouchStart={(e) => handleTouchStart(e, apt)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                className={cn(
                  'absolute rounded-sm p-1 overflow-hidden shadow-sm transition-all hover:scale-[1.02] cursor-grab active:cursor-grabbing border border-black/5 flex flex-col gap-0.5 select-none z-10',
                  isCompleted ? 'opacity-50 cursor-pointer' : 'opacity-100',
                  !isCompleted && isCanceled && 'opacity-50 grayscale cursor-pointer',
                  isCurrentlyDragging && 'opacity-40 scale-95 ring-2 ring-primary ring-offset-1',
                  isBlock &&
                    'bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.03)_10px,rgba(0,0,0,0.03)_20px)] border-gray-300',
                )}
                style={{
                  top,
                  height,
                  left: `calc(${leftPct}% + 2px)`,
                  width: `calc(${widthPct}% - 4px)`,
                  backgroundColor: bgColor,
                  color: textColor,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  if (!touchStateRef.current.hasMoved) {
                    handleOpenDetail(apt)
                  }
                }}
              >
                <div className="text-[10px] font-bold leading-none truncate flex items-center justify-between">
                  <span className="truncate">
                    {isBlock
                      ? apt.reason || 'Bloqueio'
                      : `${apt.expand?.client_id?.name || ''} ${apt.expand?.client_id?.surname || ''}`}
                  </span>
                </div>
                {!isBlock && height >= 42 && (
                  <div className="text-[9px] font-medium opacity-95 leading-none truncate">
                    {apt.expand?.service_id?.name || 'Serviço'}
                  </div>
                )}
                {height >= 55 && (
                  <div className="text-[9px] opacity-80 leading-none font-medium truncate">
                    {apt.time} - {apt.end_time || '--:--'}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderMonthView = () => {
    const days = eachDayOfInterval({
      start: startOfWeek(startOfMonth(selectedDate), { weekStartsOn: 0 }),
      end: endOfWeek(endOfMonth(selectedDate), { weekStartsOn: 0 }),
    })

    return (
      <div className="flex-1 flex flex-col min-h-0 bg-card rounded-md border overflow-hidden">
        <div className="grid grid-cols-7 border-b bg-muted/20 shrink-0">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
            <div key={d} className="p-2 text-center text-xs font-semibold uppercase">
              {d}
            </div>
          ))}
        </div>
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-7 min-h-full auto-rows-[minmax(120px,1fr)]">
            {days.map((day) => {
              const events = getEventsForDay(day)
              const isToday = isValid(day) ? isSameDay(day, new Date()) : false
              return (
                <div
                  key={isValid(day) ? day.toISOString() : Math.random()}
                  className={cn(
                    'border-b border-r p-1 overflow-hidden hover:bg-muted/10 cursor-pointer flex flex-col',
                    (!isValid(day) || !isSameMonth(day, selectedDate)) && 'opacity-40',
                  )}
                  onClick={() => {
                    if (isValid(day)) {
                      setSelectedDate(day)
                      setView('day')
                    }
                  }}
                >
                  <div className="text-right mb-1">
                    <span
                      className={cn(
                        'inline-flex items-center justify-center text-xs w-6 h-6 rounded-full',
                        isToday
                          ? 'bg-primary text-primary-foreground font-bold'
                          : 'text-muted-foreground',
                      )}
                    >
                      {isValid(day) ? format(day, 'd') : ''}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 flex-1 overflow-hidden">
                    {events.slice(0, 4).map((apt) => {
                      let status = apt.status
                      if (status === 'Concluído' && apt.date) {
                        const aptDateTime = new Date(
                          `${apt.date.split(' ')[0]}T${apt.time || '00:00'}`,
                        )
                        if (isValid(aptDateTime) && aptDateTime > new Date()) {
                          status = 'Confirmado'
                        }
                      }

                      const isCompleted = status === 'Concluído'
                      const isCanceled = status === 'Cancelado'
                      const isFaltou = status === 'FALTOU'
                      const isMissed = isFaltou
                      const isBlock = apt.isBlock

                      const bgColor = isMissed
                        ? '#000000'
                        : isBlock
                          ? '#e5e7eb'
                          : apt.expand?.barber_id?.color || 'hsl(var(--primary))'
                      const textColor = isBlock ? '#374151' : getContrastColor(bgColor)

                      return (
                        <div
                          key={apt.id}
                          className={cn(
                            'text-[8px] truncate px-1 py-0.5 mb-0.5 rounded-sm shadow-sm font-bold border border-black/5 leading-none flex flex-col gap-0.5',
                            isCompleted ? 'opacity-50' : 'opacity-100',
                            !isCompleted && isCanceled && 'opacity-50 grayscale',
                            isBlock && 'border-gray-300',
                          )}
                          style={{
                            backgroundColor: bgColor,
                            color: textColor,
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenDetail(apt)
                          }}
                        >
                          <span className="truncate">
                            {isBlock ? apt.reason || 'Bloqueio' : apt.expand?.client_id?.name}
                          </span>
                          <span className="truncate text-[7px] font-medium opacity-90">
                            {apt.time}
                          </span>
                        </div>
                      )
                    })}
                    {events.length > 4 && (
                      <div className="text-[10px] text-muted-foreground font-medium pl-1">
                        +{events.length - 4} mais
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    )
  }

  const renderGrid = () => {
    let daysToRender: Date[] = []
    if (view === 'day') daysToRender = [selectedDate]
    if (view === 'week') {
      daysToRender = eachDayOfInterval({
        start: startOfWeek(selectedDate, { weekStartsOn: 0 }),
        end: endOfWeek(selectedDate, { weekStartsOn: 0 }),
      })
    }

    const showBarberColumnsInDayView =
      view === 'day' && barberFilter === 'all' && visibleBarbers.length > 0

    return (
      <ScrollArea className="flex-1 rounded-xl border bg-card/50 shadow-inner">
        <div className="flex min-w-[600px] h-full">
          <div className="w-16 border-r flex flex-col bg-background/95 backdrop-blur sticky left-0 z-30 shadow-[1px_0_5px_rgba(0,0,0,0.05)]">
            {view === 'week' && <div className="h-12 border-b bg-muted/20 sticky top-0" />}
            {view === 'day' && showBarberColumnsInDayView && (
              <div className="h-10 border-b bg-muted/20 sticky top-0" />
            )}
            <div className="relative" style={{ height: HOURS.length * 60 }}>
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="absolute w-full text-xs font-medium text-right pr-2 text-muted-foreground bg-background/80"
                  style={{ top: (h - 8) * 60 - 8 }}
                >
                  {h.toString().padStart(2, '0')}:00
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 flex">
            {showBarberColumnsInDayView
              ? visibleBarbers.map((barber) => renderDayColumn(selectedDate, barber.id))
              : daysToRender.map((day) => renderDayColumn(day))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    )
  }

  const renderListView = () => {
    let daysToRender: Date[] = []
    if (view === 'day') daysToRender = [selectedDate]
    if (view === 'week') {
      daysToRender = eachDayOfInterval({
        start: startOfWeek(selectedDate, { weekStartsOn: 0 }),
        end: endOfWeek(selectedDate, { weekStartsOn: 0 }),
      })
    }
    if (view === 'month') {
      daysToRender = eachDayOfInterval({
        start: startOfWeek(startOfMonth(selectedDate), { weekStartsOn: 0 }),
        end: endOfWeek(endOfMonth(selectedDate), { weekStartsOn: 0 }),
      })
    }

    const allEvents = daysToRender
      .flatMap((day) => {
        return getEventsForDay(day).map((e) => ({ ...e, displayDate: day }))
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date?.split(' ')[0] || ''}T${a.time || '00:00'}:00`)
        const dateB = new Date(`${b.date?.split(' ')[0] || ''}T${b.time || '00:00'}:00`)
        const validA = isValid(dateA) ? dateA.getTime() : 0
        const validB = isValid(dateB) ? dateB.getTime() : 0
        return validA - validB
      })

    return (
      <div className="flex-1 bg-card rounded-xl border shadow-inner overflow-hidden flex flex-col">
        <ScrollArea className="flex-1">
          <div className="p-0 sm:p-4 space-y-1">
            {allEvents.length === 0 ? (
              <div className="text-center text-muted-foreground py-10">
                Nenhum agendamento encontrado no período.
              </div>
            ) : (
              allEvents.map((apt) => {
                let status = apt.status
                if (status === 'Concluído' && apt.date) {
                  const aptDateTime = new Date(`${apt.date.split(' ')[0]}T${apt.time || '00:00'}`)
                  if (isValid(aptDateTime) && aptDateTime > new Date()) {
                    status = 'Confirmado'
                  }
                }

                const isCompleted = status === 'Concluído'
                const isCanceled = status === 'Cancelado'
                const isFaltou = status === 'FALTOU'
                const isBlock = apt.isBlock
                const barberColor = apt.expand?.barber_id?.color || 'hsl(var(--primary))'

                return (
                  <div
                    key={apt.id}
                    className={cn(
                      'group relative flex items-center justify-between p-3 sm:p-4 border-b sm:border sm:rounded-xl hover:bg-muted/50 transition-colors cursor-pointer bg-card',
                      isCompleted && 'opacity-60',
                      isCanceled && 'opacity-50 grayscale',
                      isFaltou && 'border-red-900/20 bg-red-50/50 dark:bg-red-900/10',
                      isBlock && 'bg-muted/30 border-dashed',
                    )}
                    onClick={() => handleOpenDetail(apt)}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 w-2 sm:rounded-l-xl"
                      style={{ backgroundColor: isBlock ? '#9ca3af' : barberColor }}
                    />

                    <div className="flex items-center gap-4 pl-3 py-1">
                      <div className="flex flex-col items-center justify-center w-16 h-14 bg-muted/30 rounded-md border shadow-sm">
                        <span className="text-sm font-extrabold text-foreground">
                          {apt.displayDate && isValid(apt.displayDate)
                            ? format(apt.displayDate, 'dd/MM')
                            : ''}
                        </span>
                        <span className="text-xs font-bold text-foreground">{apt.time}</span>
                      </div>
                      <div className="flex flex-col justify-center gap-0.5">
                        <div className="font-semibold text-sm text-foreground leading-none">
                          {isBlock
                            ? apt.reason || 'Período Bloqueado'
                            : `${apt.expand?.client_id?.name || ''} ${apt.expand?.client_id?.surname || ''}`}
                        </div>
                        <div className="text-[11px] font-medium text-muted-foreground flex items-center gap-2 mt-0.5">
                          <span>
                            {isBlock
                              ? apt.end_time
                                ? `Até ${apt.end_time}`
                                : 'Bloqueio'
                              : apt.expand?.service_id?.name || 'Serviço'}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2 h-2 rounded-full shadow-sm"
                              style={{ backgroundColor: barberColor }}
                            />
                            {apt.expand?.barber_id?.name || 'Profissional'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pr-2">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold shadow-sm',
                          status === 'Concluído'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : status === 'Cancelado'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : status === 'FALTOU'
                                ? 'bg-red-600 text-white border border-red-700'
                                : status === 'Bloqueado'
                                  ? 'bg-gray-100 text-gray-800 border border-gray-200'
                                  : 'bg-amber-100 text-amber-800 border border-amber-200',
                        )}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>
      </div>
    )
  }

  const headerLabel = isValid(selectedDate)
    ? view === 'day'
      ? format(selectedDate, "dd 'de' MMMM, yyyy", { locale: ptBR })
      : view === 'week'
        ? `${format(startOfWeek(selectedDate, { weekStartsOn: 0 }), 'dd MMM', { locale: ptBR })} - ${format(endOfWeek(selectedDate, { weekStartsOn: 0 }), 'dd MMM, yyyy', { locale: ptBR })}`
        : format(selectedDate, "MMMM 'de' yyyy", { locale: ptBR })
    : 'Data Inválida'

  if (isMobile) {
    const dayEvents = getEventsForDay(selectedDate).sort((a, b) => {
      const timeA = a.time || '00:00'
      const timeB = b.time || '00:00'
      return timeA.localeCompare(timeB)
    })

    const headerLabelMobile = isValid(selectedDate)
      ? format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })
      : 'Data Inválida'

    return (
      <div className="space-y-4 pb-20 max-w-lg mx-auto">
        {/* Mobile Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-primary">Agenda Mobile</h2>
              <p className="text-xs text-muted-foreground">
                {dayEvents.length} agendamento{dayEvents.length === 1 ? '' : 's'} hoje
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs"
                onClick={() => setBlockDialogOpen(true)}
              >
                <CalendarDays className="size-3.5 mr-1" /> Bloqueio
              </Button>
              <Button
                size="sm"
                className="h-8 text-xs font-bold gap-1"
                onClick={() => handleOpen('09:00', selectedDate)}
              >
                <Plus className="size-3.5" /> Agendar
              </Button>
            </div>
          </div>

          {/* Date Navigator Bar */}
          <div className="flex items-center justify-between bg-card p-2 rounded-xl border shadow-sm">
            <Button variant="ghost" size="icon" className="size-8 shrink-0" onClick={navigatePrev}>
              <ChevronLeft className="size-4" />
            </Button>
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="sm"
                className="h-auto py-0.5 px-2 text-xs font-bold capitalize hover:bg-transparent"
                onClick={() => setSelectedDate(new Date())}
              >
                {isSameDay(selectedDate, new Date()) ? 'Hoje • ' : ''}
                {headerLabelMobile}
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="size-8 shrink-0" onClick={navigateNext}>
              <ChevronRight className="size-4" />
            </Button>
          </div>

          {/* Barber Filter for Mobile */}
          <div className="flex items-center gap-2">
            <Select value={barberFilter} onValueChange={setBarberFilter}>
              <SelectTrigger className="w-full h-9 text-xs">
                <SelectValue placeholder="Profissional" />
              </SelectTrigger>
              <SelectContent>
                {canSeeAll && <SelectItem value="all">Todos os Profissionais</SelectItem>}
                {visibleBarbers.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mobile Events Cards List */}
        <div className="space-y-3">
          {dayEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center border rounded-xl bg-card/60 shadow-xs">
              <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Clock className="size-6 text-muted-foreground" />
              </div>
              <h3 className="text-base font-bold text-foreground">Nenhum agendamento</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-[220px]">
                Não há compromissos para este dia e profissional.
              </p>
              <Button
                size="sm"
                className="mt-4 gap-1.5"
                onClick={() => handleOpen('09:00', selectedDate)}
              >
                <Plus className="size-4" /> Novo Agendamento
              </Button>
            </div>
          ) : (
            dayEvents.map((apt) => {
              let status = apt.status
              if (status === 'Concluído' && apt.date) {
                const aptDateTime = new Date(`${apt.date.split(' ')[0]}T${apt.time || '00:00'}`)
                if (isValid(aptDateTime) && aptDateTime > new Date()) {
                  status = 'Confirmado'
                }
              }

              const isCompleted = status === 'Concluído'
              const isCanceled = status === 'Cancelado'
              const isFaltou = status === 'FALTOU'
              const isBlock = apt.isBlock
              const barberColor = apt.expand?.barber_id?.color || 'hsl(var(--primary))'

              return (
                <Card
                  key={apt.id}
                  onClick={() => handleOpenDetail(apt)}
                  className={cn(
                    'shadow-sm border transition-all cursor-pointer relative overflow-hidden active:scale-[0.99]',
                    isCompleted && 'opacity-60 bg-muted/20',
                    isCanceled && 'opacity-50 grayscale',
                    isFaltou && 'border-red-900/30 bg-red-50/40 dark:bg-red-950/20',
                    isBlock && 'bg-muted/30 border-dashed',
                  )}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-2.5"
                    style={{ backgroundColor: isBlock ? '#9ca3af' : barberColor }}
                  />

                  <CardContent className="p-3.5 pl-5 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col items-center justify-center px-2 py-1 bg-muted/60 rounded-md text-xs font-bold leading-tight">
                          <span>{apt.time || '--:--'}</span>
                          <span className="text-[10px] text-muted-foreground font-normal">
                            {apt.end_time || '--:--'}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-base leading-tight">
                            {isBlock
                              ? apt.reason || 'Período Bloqueado'
                              : `${apt.expand?.client_id?.name || ''} ${apt.expand?.client_id?.surname || ''}`}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                            {isBlock
                              ? apt.end_time
                                ? `Bloqueio até ${apt.end_time}`
                                : 'Bloqueio de Agenda'
                              : apt.expand?.service_id?.name || 'Serviço'}
                          </p>
                        </div>
                      </div>

                      <span
                        className={cn(
                          'px-2 py-0.5 text-[10px] font-bold rounded-full border shrink-0',
                          status === 'Concluído'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                            : status === 'Cancelado'
                              ? 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-300'
                              : status === 'FALTOU'
                                ? 'bg-red-600 border-red-700 text-white'
                                : status === 'Bloqueado'
                                  ? 'bg-gray-100 border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200'
                                  : 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300',
                        )}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5 font-medium">
                        <span
                          className="size-2 rounded-full shadow-xs"
                          style={{ backgroundColor: barberColor }}
                        />
                        <span className="text-foreground">
                          {apt.expand?.barber_id?.name || 'Profissional'}
                        </span>
                      </div>
                      {!isBlock && apt.price !== undefined && (
                        <span className="font-bold text-foreground">
                          {apt.price === 0 ? 'Pacote' : `R$ ${Number(apt.price).toFixed(2)}`}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* CREATE APPOINTMENT DIALOG (MOBILE SHEET/DIALOG) */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-[calc(100vw-1.5rem)] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Novo Agendamento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-3">
              <div className="space-y-2">
                <Label>Cliente</Label>
                <div className="flex gap-2">
                  <Popover open={clientSearchOpen} onOpenChange={setClientSearchOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="flex-1 justify-between min-h-[44px]"
                      >
                        <span className="truncate">
                          {form.client_id
                            ? data.clients.find((c) => c.id === form.client_id)?.name
                            : 'Buscar cliente...'}
                        </span>
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[calc(100vw-2rem)] p-0" style={{ zIndex: 9999 }}>
                      <Command>
                        <CommandInput placeholder="Buscar nome ou telefone..." />
                        <CommandList>
                          <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                          <CommandGroup>
                            {data.clients.map((c) => (
                              <CommandItem
                                key={c.id}
                                value={`${c.name} ${c.phone}`}
                                onSelect={() => {
                                  const updates: any = { client_id: c.id }
                                  if (c.preferred_barber_id) {
                                    updates.barber_id = c.preferred_barber_id
                                  }
                                  setForm({ ...form, ...updates })
                                  setClientSearchOpen(false)
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 size-4',
                                    form.client_id === c.id ? 'opacity-100' : 'opacity-0',
                                  )}
                                />
                                {c.name} {c.surname || ''} ({c.phone})
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 min-h-[44px] min-w-[44px]"
                    onClick={() => {
                      setNewClient({ name: '', phone: '' })
                      setNewClientDialogOpen(true)
                    }}
                    title="Novo Cliente"
                    type="button"
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              </div>

              {clientPkgs.length > 0 && (
                <div className="text-xs bg-amber-500/10 text-amber-600 p-2 rounded flex items-center font-medium">
                  <Check className="size-3 mr-1" /> Pacote Ativo Encontrado!
                </div>
              )}

              <div className="space-y-2">
                <Label>Serviço ou Pacote</Label>
                <Select
                  value={form.item_id}
                  onValueChange={(v) => setForm({ ...form, item_id: v })}
                >
                  <SelectTrigger
                    className={cn('min-h-[44px]', clientPkgs.length > 0 ? 'border-amber-400' : '')}
                  >
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {clientPkgs.length > 0 && (
                      <SelectGroup>
                        <SelectLabel className="text-amber-500 font-bold">
                          Pacotes do Cliente
                        </SelectLabel>
                        {clientPkgs.map((p) => (
                          <SelectItem key={`pkg_${p.id}`} value={`pkg_${p.id}`}>
                            {p.expand?.package_id?.name} (Restam: {p.remaining_uses})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    )}
                    <SelectGroup>
                      <SelectLabel>Serviços Avulsos</SelectLabel>
                      {data.services.map((s) => (
                        <SelectItem key={`svc_${s.id}`} value={`svc_${s.id}`}>
                          {s.name} - R${s.price}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-2 flex flex-col">
                  <Label>Data</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal min-h-[44px]',
                          !form.date && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {form.date && isValid(form.date) ? (
                          format(form.date, 'dd/MM/yyyy', { locale: ptBR })
                        ) : (
                          <span>Selecione</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" style={{ zIndex: 9999 }}>
                      <Calendar
                        mode="single"
                        selected={form.date}
                        onSelect={(d: Date | undefined) => d && setForm({ ...form, date: d })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Horário</Label>
                  <Select value={form.time} onValueChange={(v) => setForm({ ...form, time: v })}>
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {timeSlots.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Profissional</Label>
                <Select
                  value={form.barber_id}
                  onValueChange={(v) => setForm({ ...form, barber_id: v })}
                >
                  <SelectTrigger className="min-h-[44px]">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {data.barbers.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleBooking} className="w-full min-h-[44px] font-bold">
                Confirmar Agendamento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* MOBILE DRAWER / SHEET PARA DETALHES E EDIÇÃO */}
        <Drawer open={detailOpen} onOpenChange={setDetailOpen}>
          <DrawerContent className="max-h-[90vh]">
            <DrawerHeader className="text-left pb-2">
              <div className="flex items-center justify-between">
                <DrawerTitle>
                  {selectedApt?.isBlock
                    ? isEditMode
                      ? 'Editar Bloqueio'
                      : 'Detalhes do Bloqueio'
                    : isEditMode
                      ? 'Editar Agendamento'
                      : 'Detalhes do Agendamento'}
                </DrawerTitle>
                {!isEditMode && (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditMode(true)}>
                    <Edit2 className="size-4 mr-1" /> Editar
                  </Button>
                )}
              </div>
              {!isEditMode && selectedApt && !selectedApt.isBlock && (
                <DrawerDescription className="text-xs">
                  Informações completas do atendimento.
                </DrawerDescription>
              )}
            </DrawerHeader>

            <div className="px-4 py-2 overflow-y-auto">
              {selectedApt && (
                <div>
                  {selectedApt.isBlock ? (
                    !isEditMode ? (
                      <div className="space-y-3 py-2">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Scissors className="size-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Profissional</p>
                            <p className="font-semibold text-sm">
                              {selectedApt.expand?.barber_id?.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <CalendarDays className="size-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Início</p>
                            <p className="font-semibold text-sm">
                              {(selectedApt.original_start_time || selectedApt.start_time) &&
                              isValid(
                                new Date(selectedApt.original_start_time || selectedApt.start_time),
                              )
                                ? format(
                                    new Date(
                                      selectedApt.original_start_time || selectedApt.start_time,
                                    ),
                                    'dd/MM/yyyy HH:mm',
                                  )
                                : 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Clock className="size-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Fim</p>
                            <p className="font-semibold text-sm">
                              {(selectedApt.original_end_time || selectedApt.end_time) &&
                              isValid(
                                new Date(selectedApt.original_end_time || selectedApt.end_time),
                              )
                                ? format(
                                    new Date(selectedApt.original_end_time || selectedApt.end_time),
                                    'dd/MM/yyyy HH:mm',
                                  )
                                : 'N/A'}
                            </p>
                          </div>
                        </div>
                        {selectedApt.reason && (
                          <div className="bg-muted p-3 rounded-md text-xs">
                            <strong>Motivo:</strong> {selectedApt.reason}
                          </div>
                        )}
                        <div className="pt-3 flex justify-between">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full"
                            onClick={() => handleDeleteBlock(selectedApt.id)}
                          >
                            Remover Bloqueio
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 py-2">
                        <div className="space-y-1">
                          <Label className="text-xs">Profissional</Label>
                          <Select
                            value={editBlockForm.barber_id}
                            onValueChange={(v) =>
                              setEditBlockForm({ ...editBlockForm, barber_id: v })
                            }
                          >
                            <SelectTrigger className="min-h-[44px]">
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                              {visibleBarbers.map((b) => (
                                <SelectItem key={b.id} value={b.id}>
                                  {b.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label className="text-xs">Hora Inicial</Label>
                            <Select
                              value={editBlockForm.start_time}
                              onValueChange={(v) =>
                                setEditBlockForm({ ...editBlockForm, start_time: v })
                              }
                            >
                              <SelectTrigger className="min-h-[44px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="max-h-[200px]">
                                {timeSlots.map((t) => (
                                  <SelectItem key={t} value={t}>
                                    {t}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs">Hora Final</Label>
                            <Select
                              value={editBlockForm.end_time}
                              onValueChange={(v) =>
                                setEditBlockForm({ ...editBlockForm, end_time: v })
                              }
                            >
                              <SelectTrigger className="min-h-[44px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="max-h-[200px]">
                                {timeSlots.map((t) => (
                                  <SelectItem key={t} value={t}>
                                    {t}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Motivo</Label>
                          <Input
                            placeholder="Ex: Almoço, Médico"
                            className="min-h-[44px]"
                            value={editBlockForm.reason}
                            onChange={(e) =>
                              setEditBlockForm({ ...editBlockForm, reason: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    )
                  ) : !isEditMode ? (
                    <div className="space-y-3 py-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-full">
                          <User className="size-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Cliente</p>
                          <p className="font-bold text-base">
                            {selectedApt.expand?.client_id?.name}{' '}
                            {selectedApt.expand?.client_id?.surname || ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-full">
                          <Scissors className="size-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Serviço / Profissional</p>
                          <p className="font-semibold text-sm">
                            {selectedApt.expand?.service_id?.name} com{' '}
                            {selectedApt.expand?.barber_id?.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-full">
                          <CalendarDays className="size-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Data e Hora</p>
                          <p className="font-semibold text-sm">
                            {selectedApt.date && isValid(new Date(selectedApt.date))
                              ? format(new Date(selectedApt.date), 'dd/MM/yyyy')
                              : 'N/A'}{' '}
                            • {selectedApt.time || '--:--'} às {selectedApt.end_time || '--:--'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2.5 rounded-full">
                          <Clock className="size-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Status</p>
                          <span
                            className={cn(
                              'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold mt-0.5',
                              selectedApt.status === 'Concluído'
                                ? 'bg-green-100 text-green-800'
                                : selectedApt.status === 'Cancelado'
                                  ? 'bg-red-100 text-red-800'
                                  : selectedApt.status === 'FALTOU'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-yellow-100 text-yellow-800',
                            )}
                          >
                            {selectedApt.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 py-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Profissional</Label>
                        <Select
                          value={editForm.barber_id}
                          onValueChange={(v) => setEditForm({ ...editForm, barber_id: v })}
                        >
                          <SelectTrigger className="min-h-[44px]">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {data.barbers.map((b) => (
                              <SelectItem key={b.id} value={b.id}>
                                {b.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Serviço</Label>
                        <Select
                          value={editForm.service_id}
                          onValueChange={(v) => setEditForm({ ...editForm, service_id: v })}
                        >
                          <SelectTrigger className="min-h-[44px]">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {data.services.map((s) => (
                              <SelectItem key={s.id} value={s.id}>
                                {s.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label className="text-xs">Início</Label>
                          <Select
                            value={editForm.time}
                            onValueChange={(v) => setEditForm({ ...editForm, time: v })}
                          >
                            <SelectTrigger className="min-h-[44px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]">
                              {timeSlots.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Fim</Label>
                          <Select
                            value={editForm.end_time}
                            onValueChange={(v) => setEditForm({ ...editForm, end_time: v })}
                          >
                            <SelectTrigger className="min-h-[44px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]">
                              {timeSlots.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Status</Label>
                        <Select
                          value={editForm.status}
                          onValueChange={(v) => setEditForm({ ...editForm, status: v })}
                        >
                          <SelectTrigger className="min-h-[44px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pendente">Pendente</SelectItem>
                            <SelectItem value="Confirmado">Confirmado</SelectItem>
                            <SelectItem value="Concluído">Concluído</SelectItem>
                            <SelectItem value="Cancelado">Cancelado</SelectItem>
                            <SelectItem value="FALTOU">FALTOU</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <DrawerFooter className="pt-2">
              {isEditMode ? (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 min-h-[44px]"
                    onClick={() => setIsEditMode(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="flex-1 min-h-[44px] font-bold"
                    onClick={selectedApt?.isBlock ? handleUpdateBlock : handleUpdateBooking}
                  >
                    Salvar
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full min-h-[44px]"
                  onClick={() => setDetailOpen(false)}
                >
                  Fechar
                </Button>
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        {/* BLOCK TIME DIALOG */}
        <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
          <DialogContent className="max-w-[calc(100vw-1.5rem)] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Bloquear Horário</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <Label>Profissional</Label>
                <Select
                  value={blockForm.barber_id}
                  onValueChange={(v) => setBlockForm({ ...blockForm, barber_id: v })}
                >
                  <SelectTrigger className="min-h-[44px]">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {visibleBarbers.map((b) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label>Hora Inicial</Label>
                  <Select
                    value={blockForm.start_time}
                    onValueChange={(v) => setBlockForm({ ...blockForm, start_time: v })}
                  >
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {timeSlots.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Hora Final</Label>
                  <Select
                    value={blockForm.end_time}
                    onValueChange={(v) => setBlockForm({ ...blockForm, end_time: v })}
                  >
                    <SelectTrigger className="min-h-[44px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-[200px]">
                      {timeSlots.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1">
                <Label>Motivo (opcional)</Label>
                <Input
                  placeholder="Ex: Almoço, Folga..."
                  className="min-h-[44px]"
                  value={blockForm.reason}
                  onChange={(e) => setBlockForm({ ...blockForm, reason: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateBlock} className="w-full min-h-[44px] font-bold">
                Confirmar Bloqueio
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* NEW CLIENT DIALOG */}
        <Dialog open={newClientDialogOpen} onOpenChange={setNewClientDialogOpen}>
          <DialogContent className="max-w-[calc(100vw-1.5rem)]" style={{ zIndex: 10000 }}>
            <DialogHeader>
              <DialogTitle>Novo Cliente</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <Label>Nome</Label>
                <Input
                  placeholder="Nome do cliente"
                  className="min-h-[44px]"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label>Celular</Label>
                <Input
                  placeholder="(00) 00000-0000"
                  className="min-h-[44px]"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleClientCreate} className="w-full min-h-[44px] font-bold">
                Salvar Cliente
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] flex flex-col space-y-4 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold tracking-tight hidden md:block">Agenda</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
              Hoje
            </Button>
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="size-8" onClick={navigatePrev}>
                <ChevronLeft className="size-4" />
              </Button>
              <Button variant="ghost" size="icon" className="size-8" onClick={navigateNext}>
                <ChevronRight className="size-4" />
              </Button>
            </div>
            <span className="text-base font-medium capitalize ml-2">{headerLabel}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0">
          <Select value={barberFilter} onValueChange={setBarberFilter}>
            <SelectTrigger className="w-[160px] h-9 shrink-0">
              <SelectValue placeholder="Profissional" />
            </SelectTrigger>
            <SelectContent>
              {canSeeAll && <SelectItem value="all">Todos</SelectItem>}
              {visibleBarbers.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Tabs
            value={view}
            onValueChange={(v) => setView(v as any)}
            className="w-[160px] md:w-[200px] shrink-0"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="day">Dia</TabsTrigger>
              <TabsTrigger value="week">Sem</TabsTrigger>
              <TabsTrigger value="month">Mês</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs
            value={agendaFormat}
            onValueChange={(v) => setAgendaFormat(v as any)}
            className="w-[120px] md:w-[140px] shrink-0"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">Lista</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            variant="outline"
            onClick={() => setBlockDialogOpen(true)}
            className="gap-2 shrink-0 hidden md:flex"
          >
            <CalendarDays className="size-4" /> <span>Bloquear</span>
          </Button>

          <Button onClick={() => handleOpen()} className="gap-2 shrink-0">
            <Plus className="size-4" /> <span className="hidden sm:inline">Agendar</span>
          </Button>
        </div>
      </div>

      {agendaFormat === 'list'
        ? renderListView()
        : view === 'month'
          ? renderMonthView()
          : renderGrid()}

      {/* CREATE APPOINTMENT DIALOG */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Cliente</Label>
              <div className="flex gap-2">
                <Popover open={clientSearchOpen} onOpenChange={setClientSearchOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" className="flex-1 justify-between">
                      {form.client_id
                        ? data.clients.find((c) => c.id === form.client_id)?.name
                        : 'Buscar cliente...'}
                      <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[380px] p-0" style={{ zIndex: 9999 }}>
                    <Command>
                      <CommandInput placeholder="Buscar nome ou telefone..." />
                      <CommandList>
                        <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                        <CommandGroup>
                          {data.clients.map((c) => (
                            <CommandItem
                              key={c.id}
                              value={`${c.name} ${c.phone}`}
                              onSelect={() => {
                                const updates: any = { client_id: c.id }
                                if (c.preferred_barber_id) {
                                  updates.barber_id = c.preferred_barber_id
                                }
                                setForm({ ...form, ...updates })
                                setClientSearchOpen(false)
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 size-4',
                                  form.client_id === c.id ? 'opacity-100' : 'opacity-0',
                                )}
                              />
                              {c.name} {c.surname || ''} ({c.phone})
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  onClick={() => {
                    setNewClient({ name: '', phone: '' })
                    setNewClientDialogOpen(true)
                  }}
                  title="Novo Cliente"
                  type="button"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>

            {clientPkgs.length > 0 && (
              <div className="text-xs bg-amber-500/10 text-amber-600 p-2 rounded flex items-center font-medium">
                <Check className="size-3 mr-1" /> Pacote Ativo Encontrado! Use-o abaixo.
              </div>
            )}

            <div className="space-y-2">
              <Label>Serviço ou Pacote</Label>
              <Select value={form.item_id} onValueChange={(v) => setForm({ ...form, item_id: v })}>
                <SelectTrigger className={clientPkgs.length > 0 ? 'border-amber-400' : ''}>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {clientPkgs.length > 0 && (
                    <SelectGroup>
                      <SelectLabel className="text-amber-500 font-bold">
                        Pacotes do Cliente
                      </SelectLabel>
                      {clientPkgs.map((p) => (
                        <SelectItem key={`pkg_${p.id}`} value={`pkg_${p.id}`}>
                          {p.expand?.package_id?.name} (Restam: {p.remaining_uses})
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  )}
                  <SelectGroup>
                    <SelectLabel>Serviços Avulsos</SelectLabel>
                    {data.services.map((s) => (
                      <SelectItem key={`svc_${s.id}`} value={`svc_${s.id}`}>
                        {s.name} - R${s.price}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 flex flex-col">
                <Label>Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !form.date && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {form.date && isValid(form.date) ? (
                        format(form.date, 'dd/MM/yyyy', { locale: ptBR })
                      ) : (
                        <span>Selecione</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" style={{ zIndex: 9999 }}>
                    <Calendar
                      mode="single"
                      selected={form.date}
                      onSelect={(d: Date | undefined) => d && setForm({ ...form, date: d })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Horário</Label>
                <Select value={form.time} onValueChange={(v) => setForm({ ...form, time: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {timeSlots.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Profissional</Label>
              <Select
                value={form.barber_id}
                onValueChange={(v) => setForm({ ...form, barber_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {data.barbers.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleBooking} className="w-full">
              Confirmar Agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* NEW CLIENT DIALOG */}
      <Dialog open={newClientDialogOpen} onOpenChange={setNewClientDialogOpen}>
        <DialogContent className="max-w-sm" style={{ zIndex: 10000 }}>
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                placeholder="Nome do cliente"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Celular</Label>
              <Input
                placeholder="(00) 00000-0000"
                value={newClient.phone}
                onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleClientCreate} className="w-full">
              Salvar Cliente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* BLOCK TIME DIALOG (Create) */}
      <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Bloquear Horário</DialogTitle>
            <DialogDescription>Selecione o período para bloquear a agenda.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Profissional</Label>
              <Select
                value={blockForm.barber_id}
                onValueChange={(v) => setBlockForm({ ...blockForm, barber_id: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {visibleBarbers.map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 flex flex-col">
                <Label>Data Inicial</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !blockForm.start_date && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {blockForm.start_date && isValid(blockForm.start_date) ? (
                        format(blockForm.start_date, 'dd/MM/yyyy', { locale: ptBR })
                      ) : (
                        <span>Selecione</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" style={{ zIndex: 9999 }}>
                    <Calendar
                      mode="single"
                      selected={blockForm.start_date}
                      onSelect={(d) => d && setBlockForm({ ...blockForm, start_date: d })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Hora Inicial</Label>
                <Select
                  value={blockForm.start_time}
                  onValueChange={(v) => setBlockForm({ ...blockForm, start_time: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {timeSlots.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 flex flex-col">
                <Label>Data Final</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !blockForm.end_date && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {blockForm.end_date && isValid(blockForm.end_date) ? (
                        format(blockForm.end_date, 'dd/MM/yyyy', { locale: ptBR })
                      ) : (
                        <span>Selecione</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" style={{ zIndex: 9999 }}>
                    <Calendar
                      mode="single"
                      selected={blockForm.end_date}
                      onSelect={(d) => d && setBlockForm({ ...blockForm, end_date: d })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Hora Final</Label>
                <Select
                  value={blockForm.end_time}
                  onValueChange={(v) => setBlockForm({ ...blockForm, end_time: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {timeSlots.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Motivo (opcional)</Label>
              <Input
                placeholder="Ex: Almoço, Médico, Folga..."
                value={blockForm.reason}
                onChange={(e) => setBlockForm({ ...blockForm, reason: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCreateBlock} className="w-full">
              Confirmar Bloqueio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* VIEW/EDIT APPOINTMENT/BLOCK DIALOG */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>
                {selectedApt?.isBlock
                  ? isEditMode
                    ? 'Editar Bloqueio'
                    : 'Detalhes do Bloqueio'
                  : isEditMode
                    ? 'Editar Agendamento'
                    : 'Detalhes do Agendamento'}
              </span>
              {!isEditMode && (
                <Button variant="ghost" size="icon" onClick={() => setIsEditMode(true)}>
                  <Edit2 className="size-4" />
                </Button>
              )}
            </DialogTitle>
            {!isEditMode && selectedApt && !selectedApt.isBlock && (
              <DialogDescription>Informações do atendimento agendado.</DialogDescription>
            )}
          </DialogHeader>

          {selectedApt && (
            <div className="py-4">
              {selectedApt.isBlock ? (
                !isEditMode ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Scissors className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Profissional</p>
                        <p className="font-medium">{selectedApt.expand?.barber_id?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <CalendarDays className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Início</p>
                        <p className="font-medium text-foreground">
                          {(selectedApt.original_start_time || selectedApt.start_time) &&
                          isValid(
                            new Date(selectedApt.original_start_time || selectedApt.start_time),
                          )
                            ? format(
                                new Date(selectedApt.original_start_time || selectedApt.start_time),
                                'dd/MM/yyyy HH:mm',
                              )
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Clock className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Fim</p>
                        <p className="font-medium text-foreground">
                          {(selectedApt.original_end_time || selectedApt.end_time) &&
                          isValid(new Date(selectedApt.original_end_time || selectedApt.end_time))
                            ? format(
                                new Date(selectedApt.original_end_time || selectedApt.end_time),
                                'dd/MM/yyyy HH:mm',
                              )
                            : 'N/A'}
                        </p>
                      </div>
                    </div>
                    {selectedApt.reason && (
                      <div className="bg-muted p-3 rounded-md mt-4 text-sm">
                        <strong>Motivo:</strong> {selectedApt.reason}
                      </div>
                    )}
                    <div className="pt-4 border-t mt-4 flex justify-between">
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteBlock(selectedApt.id)}
                      >
                        Remover Bloqueio
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Profissional</Label>
                      <Select
                        value={editBlockForm.barber_id}
                        onValueChange={(v) => setEditBlockForm({ ...editBlockForm, barber_id: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          {visibleBarbers.map((b) => (
                            <SelectItem key={b.id} value={b.id}>
                              {b.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 flex flex-col">
                        <Label>Data Inicial</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !editBlockForm.start_date && 'text-muted-foreground',
                              )}
                            >
                              <CalendarIcon className="mr-2 size-4" />
                              {editBlockForm.start_date && isValid(editBlockForm.start_date) ? (
                                format(editBlockForm.start_date, 'dd/MM/yyyy', { locale: ptBR })
                              ) : (
                                <span>Selecione</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" style={{ zIndex: 9999 }}>
                            <Calendar
                              mode="single"
                              selected={editBlockForm.start_date}
                              onSelect={(d) =>
                                d && setEditBlockForm({ ...editBlockForm, start_date: d })
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>Hora Inicial</Label>
                        <Select
                          value={editBlockForm.start_time}
                          onValueChange={(v) =>
                            setEditBlockForm({ ...editBlockForm, start_time: v })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {timeSlots.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 flex flex-col">
                        <Label>Data Final</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !editBlockForm.end_date && 'text-muted-foreground',
                              )}
                            >
                              <CalendarIcon className="mr-2 size-4" />
                              {editBlockForm.end_date && isValid(editBlockForm.end_date) ? (
                                format(editBlockForm.end_date, 'dd/MM/yyyy', { locale: ptBR })
                              ) : (
                                <span>Selecione</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" style={{ zIndex: 9999 }}>
                            <Calendar
                              mode="single"
                              selected={editBlockForm.end_date}
                              onSelect={(d) =>
                                d && setEditBlockForm({ ...editBlockForm, end_date: d })
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>Hora Final</Label>
                        <Select
                          value={editBlockForm.end_time}
                          onValueChange={(v) => setEditBlockForm({ ...editBlockForm, end_time: v })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="max-h-[200px]">
                            {timeSlots.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Motivo (opcional)</Label>
                      <Input
                        placeholder="Ex: Almoço, Médico, Folga..."
                        value={editBlockForm.reason}
                        onChange={(e) =>
                          setEditBlockForm({ ...editBlockForm, reason: e.target.value })
                        }
                      />
                    </div>
                  </div>
                )
              ) : !isEditMode ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <User className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cliente</p>
                      <p className="font-medium text-lg">{selectedApt.expand?.client_id?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Scissors className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Serviço / Profissional</p>
                      <p className="font-medium">
                        {selectedApt.expand?.service_id?.name} com{' '}
                        {selectedApt.expand?.barber_id?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <CalendarDays className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data e Hora</p>
                      <p className="font-medium">
                        {selectedApt.date && isValid(new Date(selectedApt.date))
                          ? format(new Date(selectedApt.date), 'dd/MM/yyyy')
                          : 'N/A'}{' '}
                        • {selectedApt.time || '--:--'} às {selectedApt.end_time || '--:--'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Clock className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
                          selectedApt.status === 'Concluído'
                            ? 'bg-green-100 text-green-800'
                            : selectedApt.status === 'Cancelado'
                              ? 'bg-red-100 text-red-800'
                              : selectedApt.status === 'FALTOU'
                                ? 'bg-red-600 text-white'
                                : 'bg-yellow-100 text-yellow-800',
                        )}
                      >
                        {selectedApt.status}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Profissional</Label>
                    <Select
                      value={editForm.barber_id}
                      onValueChange={(v) => setEditForm({ ...editForm, barber_id: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o profissional" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.barbers.map((b) => (
                          <SelectItem key={b.id} value={b.id}>
                            {b.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Serviço</Label>
                    <Select
                      value={editForm.service_id}
                      onValueChange={(v) => setEditForm({ ...editForm, service_id: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.services.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 flex flex-col">
                      <Label>Data</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full justify-start text-left font-normal',
                              !editForm.date && 'text-muted-foreground',
                            )}
                          >
                            <CalendarIcon className="mr-2 size-4" />
                            {editForm.date && isValid(editForm.date) ? (
                              format(editForm.date, 'dd/MM/yyyy', { locale: ptBR })
                            ) : (
                              <span>Selecione</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" style={{ zIndex: 9999 }}>
                          <Calendar
                            mode="single"
                            selected={editForm.date}
                            onSelect={(d) => d && setEditForm({ ...editForm, date: d })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Início</Label>
                      <Select
                        value={editForm.time}
                        onValueChange={(v) => setEditForm({ ...editForm, time: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          {timeSlots.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Fim</Label>
                      <Select
                        value={editForm.end_time}
                        onValueChange={(v) => setEditForm({ ...editForm, end_time: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-[200px]">
                          {timeSlots.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={editForm.status}
                        onValueChange={(v) => setEditForm({ ...editForm, status: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Confirmado">Confirmado</SelectItem>
                          <SelectItem value="Concluído">Concluído</SelectItem>
                          <SelectItem value="Cancelado">Cancelado</SelectItem>
                          <SelectItem value="FALTOU">FALTOU</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="sm:justify-end gap-2">
            {isEditMode ? (
              <>
                <Button variant="outline" onClick={() => setIsEditMode(false)}>
                  Cancelar
                </Button>
                <Button onClick={selectedApt?.isBlock ? handleUpdateBlock : handleUpdateBooking}>
                  Salvar Alterações
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => setDetailOpen(false)}>
                Fechar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CONFLICT OVERLAP / RESCHEDULE DIALOG */}
      <AlertDialog open={conflictDialogOpen} onOpenChange={setConflictDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive flex items-center gap-2">
              <span>Horário Indisponível</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3 pt-2 text-foreground">
              <p className="text-sm text-muted-foreground">
                O profissional de destino já possui agendamento ou bloqueio neste intervalo de
                horário:
              </p>
              {conflictData && (
                <div className="bg-muted/50 p-3 rounded-lg border text-xs space-y-1.5">
                  <div className="font-semibold text-foreground">
                    Horário solicitado:{' '}
                    <span className="text-primary font-bold">
                      {Math.floor(conflictData.targetStartMins / 60)
                        .toString()
                        .padStart(2, '0')}
                      :{(conflictData.targetStartMins % 60).toString().padStart(2, '0')} às{' '}
                      {Math.floor(conflictData.targetEndMins / 60)
                        .toString()
                        .padStart(2, '0')}
                      :{(conflictData.targetEndMins % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="text-muted-foreground">
                    Conflito com:{' '}
                    {conflictData.conflictingEvents
                      .map((e) =>
                        e.isBlock
                          ? `Bloqueio (${e.time} - ${e.end_time})`
                          : `${e.expand?.client_id?.name || 'Cliente'} (${e.time} - ${e.end_time})`,
                      )
                      .join(', ')}
                  </div>
                  {conflictData.suggestedStartMins !== null &&
                    conflictData.suggestedEndMins !== null && (
                      <div className="mt-2 pt-2 border-t border-border/50 text-emerald-600 dark:text-emerald-400 font-medium">
                        Próximo horário livre disponível:{' '}
                        <strong>
                          {Math.floor(conflictData.suggestedStartMins / 60)
                            .toString()
                            .padStart(2, '0')}
                          :{(conflictData.suggestedStartMins % 60).toString().padStart(2, '0')} às{' '}
                          {Math.floor(conflictData.suggestedEndMins / 60)
                            .toString()
                            .padStart(2, '0')}
                          :{(conflictData.suggestedEndMins % 60).toString().padStart(2, '0')}
                        </strong>
                      </div>
                    )}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Como deseja prosseguir com a realocação?
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            <AlertDialogCancel
              onClick={() => {
                setConflictDialogOpen(false)
                setConflictData(null)
              }}
            >
              Cancelar
            </AlertDialogCancel>
            <Button
              variant="outline"
              onClick={() => {
                if (conflictData) {
                  executeMove(
                    conflictData.item,
                    conflictData.targetBarberId,
                    conflictData.targetDate,
                    conflictData.targetStartMins,
                    conflictData.targetEndMins,
                  )
                }
              }}
            >
              Sobrepor Horário
            </Button>
            {conflictData?.suggestedStartMins !== null &&
              conflictData?.suggestedEndMins !== null && (
                <AlertDialogAction
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => {
                    if (
                      conflictData &&
                      conflictData.suggestedStartMins !== null &&
                      conflictData.suggestedEndMins !== null
                    ) {
                      executeMove(
                        conflictData.item,
                        conflictData.targetBarberId,
                        conflictData.targetDate,
                        conflictData.suggestedStartMins,
                        conflictData.suggestedEndMins,
                      )
                    }
                  }}
                >
                  Ajustar Horário
                </AlertDialogAction>
              )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
