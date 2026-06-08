import { useState, useEffect } from 'react'

export type AppointmentStatus = 'Pendente' | 'Confirmado' | 'Concluído' | 'Cancelado'
export type LoyaltyLevel = 'Frequente' | 'Regular' | 'Risco'

export interface Barber {
  id: string
  name: string
  avatar: string
}
export interface Customer {
  id: string
  name: string
  phone: string
  loyalty: LoyaltyLevel
  totalSpent: number
  lastVisit: string
}
export interface Product {
  id: string
  name: string
  category: string
  stock: number
  minStock: number
  price: number
}
export interface Appointment {
  id: string
  barberId: string
  customerId: string
  service: string
  time: string
  status: AppointmentStatus
  date: string
  price: number
}
import { SubscriptionTier } from '@/lib/tiers'

export interface ChartData {
  name: string
  receita: number
}

interface State {
  tier: SubscriptionTier
  barbers: Barber[]
  customers: Customer[]
  products: Product[]
  appointments: Appointment[]
  performance: ChartData[]
}

const mockState: State = {
  tier: 'Free',
  barbers: [
    {
      id: 'b1',
      name: 'Marcos Silva',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1',
    },
    {
      id: 'b2',
      name: 'Beto Rocha',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=2',
    },
    {
      id: 'b3',
      name: 'Leo Almeida',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3',
    },
    {
      id: 'b4',
      name: 'Tiago Santos',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=4',
    },
  ],
  customers: [
    {
      id: 'c1',
      name: 'João Batista',
      phone: '(11) 98765-4321',
      loyalty: 'Frequente',
      totalSpent: 1450.0,
      lastVisit: '2026-04-28',
    },
    {
      id: 'c2',
      name: 'Carlos Mendes',
      phone: '(11) 97654-3210',
      loyalty: 'Regular',
      totalSpent: 350.0,
      lastVisit: '2026-04-15',
    },
    {
      id: 'c3',
      name: 'Lucas Pereira',
      phone: '(11) 96543-2109',
      loyalty: 'Risco',
      totalSpent: 120.0,
      lastVisit: '2025-12-10',
    },
    {
      id: 'c4',
      name: 'André Farias',
      phone: '(11) 95432-1098',
      loyalty: 'Frequente',
      totalSpent: 890.0,
      lastVisit: '2026-05-01',
    },
  ],
  products: [
    {
      id: 'p1',
      name: 'Pomada Efeito Matte Vito',
      category: 'Cabelo',
      stock: 4,
      minStock: 10,
      price: 45.0,
    },
    {
      id: 'p2',
      name: 'Óleo para Barba Lenhador',
      category: 'Barba',
      stock: 15,
      minStock: 5,
      price: 35.0,
    },
    { id: 'p3', name: 'Balm Hidratante', category: 'Barba', stock: 8, minStock: 10, price: 30.0 },
    {
      id: 'p4',
      name: 'Cerveja IPA Artesanal',
      category: 'Bebidas',
      stock: 2,
      minStock: 24,
      price: 15.0,
    },
  ],
  appointments: [
    {
      id: 'a1',
      barberId: 'b1',
      customerId: 'c1',
      service: 'Corte + Barba',
      time: '09:00',
      status: 'Concluído',
      date: '2026-05-03',
      price: 75.0,
    },
    {
      id: 'a2',
      barberId: 'b2',
      customerId: 'c2',
      service: 'Somente Corte',
      time: '10:00',
      status: 'Confirmado',
      date: '2026-05-03',
      price: 45.0,
    },
    {
      id: 'a3',
      barberId: 'b1',
      customerId: 'c4',
      service: 'Barba Terapia',
      time: '11:30',
      status: 'Pendente',
      date: '2026-05-03',
      price: 40.0,
    },
    {
      id: 'a4',
      barberId: 'b3',
      customerId: 'c3',
      service: 'Corte Degradê',
      time: '14:00',
      status: 'Confirmado',
      date: '2026-05-03',
      price: 50.0,
    },
    {
      id: 'a5',
      barberId: 'b4',
      customerId: 'c1',
      service: 'Limpeza Facial',
      time: '16:30',
      status: 'Confirmado',
      date: '2026-05-03',
      price: 60.0,
    },
  ],
  performance: [
    { name: 'Seg', receita: 450 },
    { name: 'Ter', receita: 320 },
    { name: 'Qua', receita: 580 },
    { name: 'Qui', receita: 710 },
    { name: 'Sex', receita: 950 },
    { name: 'Sáb', receita: 1200 },
    { name: 'Dom', receita: 200 },
  ],
}

let globalState = mockState
const listeners = new Set<React.Dispatch<React.SetStateAction<State>>>()

export default function useMainStore() {
  const [state, setState] = useState<State>(globalState)

  useEffect(() => {
    listeners.add(setState)
    return () => {
      listeners.delete(setState)
    }
  }, [])

  const updateTier = (tier: SubscriptionTier) => {
    updateStore({ tier })
  }

  const updateStore = (updates: Partial<State> | ((prev: State) => Partial<State>)) => {
    const newValues = typeof updates === 'function' ? updates(globalState) : updates
    globalState = { ...globalState, ...newValues }
    listeners.forEach((listener) => listener(globalState))
  }

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    updateStore((prev) => ({
      appointments: prev.appointments.map((a) => (a.id === id ? { ...a, status } : a)),
    }))
  }

  const updateProductStock = (id: string, quantityToSubtract: number) => {
    updateStore((prev) => ({
      products: prev.products.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, p.stock - quantityToSubtract) } : p,
      ),
    }))
  }

  const resetStore = () => {
    globalState = mockState
    listeners.forEach((listener) => listener(globalState))
  }

  return { state, updateStore, updateTier, updateAppointmentStatus, updateProductStock, resetStore }
}
