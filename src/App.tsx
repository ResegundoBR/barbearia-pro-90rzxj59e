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
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user && !authenticating && !error) {
      setAuthenticating(true)
      signIn('reginaldo.segundo@planagroup.com.br', 'Skip@Pass').then((res) => {
        if (res.error) {
          setError(res.error.message || 'Falha na autenticação automática')
        }
        setAuthenticating(false)
      })
    }
  }, [loading, user, authenticating, signIn, error])

  if (loading || authenticating) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600 font-medium">Autenticando...</p>
      </div>
    )
  }

  if (error && !user) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center border border-red-100">
          <div className="bg-red-100 text-red-600 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Acesso Negado</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => setError(null)}
            className="w-full py-2.5 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    )
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
