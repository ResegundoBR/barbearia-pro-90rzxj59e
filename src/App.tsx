import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { toast } from 'sonner'
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
import { usePermissions } from '@/hooks/use-permissions'

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

function RouteGuard({ module, children }: { module: string; children: React.ReactNode }) {
  const { hasAccess, isAdmin, loadingPerms } = usePermissions()

  if (loadingPerms) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
      </div>
    )
  }

  if (!isAdmin && !hasAccess(module)) {
    setTimeout(() => {
      toast.error('Acesso Negado', {
        description: 'Você não tem permissão para acessar esta página.',
      })
    }, 100)
    return <Navigate to="/dashboard" replace />
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
            <Route
              path="/agenda"
              element={
                <RouteGuard module="agenda">
                  <Agenda />
                </RouteGuard>
              }
            />
            <Route
              path="/clientes"
              element={
                <RouteGuard module="clientes">
                  <Clientes />
                </RouteGuard>
              }
            />
            <Route
              path="/clientes/:id"
              element={
                <RouteGuard module="clientes">
                  <ClienteDetail />
                </RouteGuard>
              }
            />
            <Route
              path="/estoque"
              element={
                <RouteGuard module="estoque">
                  <Estoque />
                </RouteGuard>
              }
            />
            <Route
              path="/staff"
              element={
                <RouteGuard module="staff">
                  <Staff />
                </RouteGuard>
              }
            />
            <Route
              path="/financeiro"
              element={
                <RouteGuard module="financeiro">
                  <Financeiro />
                </RouteGuard>
              }
            />
            <Route
              path="/checkout"
              element={
                <RouteGuard module="checkout">
                  <Checkout />
                </RouteGuard>
              }
            />
            <Route
              path="/produtos"
              element={
                <RouteGuard module="produtos">
                  <ProdutosCategorias />
                </RouteGuard>
              }
            />
            <Route
              path="/fornecedores"
              element={
                <RouteGuard module="fornecedores">
                  <Fornecedores />
                </RouteGuard>
              }
            />
            <Route
              path="/fornecedores/:id"
              element={
                <RouteGuard module="fornecedores">
                  <FornecedorDetail />
                </RouteGuard>
              }
            />
            <Route
              path="/settings"
              element={
                <RouteGuard module="settings">
                  <Settings />
                </RouteGuard>
              }
            />
            <Route
              path="/users"
              element={
                <RouteGuard module="users">
                  <UsersPage />
                </RouteGuard>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </AuthProvider>
)

export default App
