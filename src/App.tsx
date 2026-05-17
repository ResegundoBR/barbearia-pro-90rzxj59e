import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import Login from './pages/Login'
import RecuperarSenha from './pages/RecuperarSenha'
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

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600 font-medium">Carregando...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600 font-medium">Carregando...</p>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

const App = () => (
  <AuthProvider>
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/recuperar-senha"
            element={
              <PublicRoute>
                <RecuperarSenha />
              </PublicRoute>
            }
          />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Index />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/:id" element={<ClienteDetail />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/financeiro" element={<Financeiro />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/produtos" element={<ProdutosCategorias />} />
            <Route path="/fornecedores" element={<Fornecedores />} />
            <Route path="/fornecedores/:id" element={<FornecedorDetail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </AuthProvider>
)

export default App
