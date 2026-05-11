import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Index from './pages/Index'
import Agenda from './pages/Agenda'
import Clientes from './pages/Clientes'
import ClienteDetail from './pages/ClienteDetail'
import Estoque from './pages/Estoque'
import Checkout from './pages/Checkout'
import Staff from './pages/Staff'
import Settings from './pages/Settings'
import UsersPage from './pages/Users'
import Financeiro from './pages/Financeiro'
import ProdutosCategorias from './pages/ProdutosCategorias'
import Fornecedores from './pages/Fornecedores'
import FornecedorDetail from './pages/FornecedorDetail'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import { AuthProvider, useAuth } from '@/hooks/use-auth'
import { useEffect, useState } from 'react'

function DemoLoginGuard({ children }: { children: React.ReactNode }) {
  const { user, signIn, loading } = useAuth()
  const [authenticating, setAuthenticating] = useState(false)

  useEffect(() => {
    if (!loading && !user && !authenticating) {
      setAuthenticating(true)
      signIn('reginaldo.segundo@planagroup.com.br', 'Skip@Pass').finally(() => {
        setAuthenticating(false)
      })
    }
  }, [loading, user, authenticating, signIn])

  if (loading || authenticating) {
    return <div className="h-screen w-screen flex items-center justify-center">Carregando...</div>
  }

  return <>{children}</>
}

const App = () => (
  <AuthProvider>
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <DemoLoginGuard>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/clientes/:id" element={<ClienteDetail />} />
              <Route path="/estoque" element={<Estoque />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/financeiro" element={<Financeiro />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/produtos-categorias" element={<ProdutosCategorias />} />
              <Route path="/fornecedores" element={<Fornecedores />} />
              <Route path="/fornecedores/:id" element={<FornecedorDetail />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<UsersPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DemoLoginGuard>
      </TooltipProvider>
    </BrowserRouter>
  </AuthProvider>
)

export default App
