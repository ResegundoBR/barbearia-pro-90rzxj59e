import { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import './overrides.css'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import Layout from './components/Layout'
import { AuthProvider, useAuth } from '@/hooks/use-auth'
import { usePermissions } from '@/hooks/use-permissions'

const Login = lazy(() => import('./pages/Login'))
const RecuperarSenha = lazy(() => import('./pages/RecuperarSenha'))
const Index = lazy(() => import('./pages/Index'))
const Agenda = lazy(() => import('./pages/Agenda'))
const Clientes = lazy(() => import('./pages/Clientes'))
const ClienteDetail = lazy(() => import('./pages/ClienteDetail'))
const Estoque = lazy(() => import('./pages/Estoque'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Staff = lazy(() => import('./pages/Staff'))
const Settings = lazy(() => import('./pages/Settings'))
const UsersPage = lazy(() => import('./pages/Users'))
const Financeiro = lazy(() => import('./pages/Financeiro'))
const ProdutosCategorias = lazy(() => import('./pages/ProdutosCategorias'))
const Fornecedores = lazy(() => import('./pages/Fornecedores'))
const FornecedorDetail = lazy(() => import('./pages/FornecedorDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))

function LoadingFallback() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
      <p className="text-gray-600 font-medium">Carregando...</p>
    </div>
  )
}

function PageLoadingFallback() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
    </div>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingFallback />
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

function RouteGuard({ module, children }: { module: string; children: React.ReactNode }) {
  const { hasAccess, isAdmin, loadingPerms } = usePermissions()

  useEffect(() => {
    document.body.classList.add(`page-${module}`)
    return () => {
      document.body.classList.remove(`page-${module}`)
    }
  }, [module])

  if (loadingPerms && !isAdmin) {
    return <PageLoadingFallback />
  }

  if (!isAdmin && !hasAccess(module)) {
    setTimeout(() => {
      toast.error('Acesso Negado', {
        description: 'Você não tem permissão para acessar esta página.',
      })
    }, 100)
    return <Navigate to="/dashboard" replace />
  }

  return <Suspense fallback={<PageLoadingFallback />}>{children}</Suspense>
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingFallback />
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
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
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<PageLoadingFallback />}>
                  <Index />
                </Suspense>
              }
            />
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

          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </AuthProvider>
)

export default App
