import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import './overrides.css'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import Layout from './components/Layout'
import { AuthProvider, useAuth } from '@/hooks/use-auth'
import { usePermissions } from '@/hooks/use-permissions'

const isDynamicImportError = (error: unknown) => {
  if (!(error instanceof Error)) return false
  const msg = error.message.toLowerCase()
  return (
    msg.includes('failed to fetch dynamically imported module') ||
    msg.includes('error loading dynamically imported module') ||
    msg.includes('failed to load module script') ||
    msg.includes('dynamically imported module') ||
    msg.includes('importing a module script failed') ||
    error.name === 'ChunkLoadError'
  )
}

const lazyWithRetry = (componentImport: () => Promise<any>, name: string) =>
  lazy(async () => {
    const storageKey = `retry-${name}-refreshed`
    const hasRefreshed = window.sessionStorage.getItem(storageKey) === 'true'
    try {
      const component = await componentImport()
      window.sessionStorage.removeItem(storageKey)
      return component
    } catch (error) {
      if (!hasRefreshed && isDynamicImportError(error)) {
        window.sessionStorage.setItem(storageKey, 'true')
        const url = new URL(window.location.href)
        url.searchParams.set('v', Date.now().toString())
        window.location.replace(url.toString())
        // Return a promise that never resolves to prevent React from trying to render during reload
        return new Promise(() => {}) as any
      }
      window.sessionStorage.removeItem(storageKey)
      throw error
    }
  })

const Login = lazyWithRetry(() => import('./pages/Login'), 'Login')
const RecuperarSenha = lazyWithRetry(() => import('./pages/RecuperarSenha'), 'RecuperarSenha')
const Index = lazyWithRetry(() => import('./pages/Index'), 'Index')
const Agenda = lazyWithRetry(() => import('./pages/Agenda'), 'Agenda')
const Clientes = lazyWithRetry(() => import('./pages/Clientes'), 'Clientes')
const ClienteDetail = lazyWithRetry(() => import('./pages/ClienteDetail'), 'ClienteDetail')
const Estoque = lazyWithRetry(() => import('./pages/Estoque'), 'Estoque')
const Checkout = lazyWithRetry(() => import('./pages/Checkout'), 'Checkout')
const Staff = lazyWithRetry(() => import('./pages/Staff'), 'Staff')
const Settings = lazyWithRetry(() => import('./pages/Settings'), 'Settings')
const UsersPage = lazyWithRetry(() => import('./pages/Users'), 'Users')
const Financeiro = lazyWithRetry(() => import('./pages/Financeiro'), 'Financeiro')
const ProdutosCategorias = lazyWithRetry(
  () => import('./pages/ProdutosCategorias'),
  'ProdutosCategorias',
)
const Fornecedores = lazyWithRetry(() => import('./pages/Fornecedores'), 'Fornecedores')
const FornecedorDetail = lazyWithRetry(() => import('./pages/FornecedorDetail'), 'FornecedorDetail')
const NotFound = lazyWithRetry(() => import('./pages/NotFound'), 'NotFound')

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      const isChunkError = isDynamicImportError(this.state.error)
      return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">
              {isChunkError ? 'Nova versão disponível' : 'Oops! Algo deu errado.'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isChunkError
                ? 'Uma nova versão do sistema foi publicada. Por favor, recarregue a página para acessar as novidades.'
                : 'Ocorreu um erro inesperado na aplicação. Tente recarregar a página.'}
            </p>
            <button
              onClick={() => {
                const url = new URL(window.location.href)
                url.searchParams.set('v', Date.now().toString())
                window.location.replace(url.toString())
              }}
              className="px-4 py-2 bg-primary text-white font-medium rounded hover:bg-primary/90 transition-colors w-full"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

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
        <ErrorBoundary>
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
        </ErrorBoundary>
      </TooltipProvider>
    </BrowserRouter>
  </AuthProvider>
)

export default App
