import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { usePermissions } from '@/hooks/use-permissions'
import { useAuth } from '@/hooks/use-auth'
import {
  Calendar,
  Users,
  LayoutDashboard,
  Box,
  Scissors,
  Settings,
  LogOut,
  Wallet,
  ShoppingCart,
  Truck,
} from 'lucide-react'

export default function Layout() {
  const { hasAccess } = usePermissions()
  const { signOut, user } = useAuth()
  const location = useLocation()

  const navItems = [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', module: 'dashboard' },
    { title: 'Agenda', icon: Calendar, path: '/agenda', module: 'agenda' },
    { title: 'Financeiro', icon: Wallet, path: '/financeiro', module: 'financeiro' },
    { title: 'Checkout', icon: ShoppingCart, path: '/checkout', module: 'checkout' },
    { title: 'Clientes', icon: Users, path: '/clientes', module: 'clientes' },
    { title: 'Estoque', icon: Box, path: '/estoque', module: 'estoque' },
    { title: 'Produtos e Serviços', icon: Scissors, path: '/produtos', module: 'produtos' },
    { title: 'Fornecedores', icon: Truck, path: '/fornecedores', module: 'fornecedores' },
    { title: 'Equipe', icon: Users, path: '/staff', module: 'staff' },
    { title: 'Acessos e Usuários', icon: Users, path: '/users', module: 'users' },
    { title: 'Configurações', icon: Settings, path: '/settings', module: 'settings' },
  ]

  const visibleNavItems = navItems.filter((item) => hasAccess(item.module))

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full bg-gray-50 text-foreground">
        <Sidebar className="border-r shadow-sm">
          <SidebarHeader className="h-16 flex items-center px-6 border-b">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-md">
                <Scissors className="w-5 h-5 text-primary-foreground" />
              </div>
              <h2 className="text-lg font-bold tracking-tight">Barbearia Pro</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Menu Principal
              </SidebarGroupLabel>
              <SidebarGroupContent className="px-2 mt-2">
                <SidebarMenu>
                  {visibleNavItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname.startsWith(item.path)}
                        className="mb-1 transition-colors"
                      >
                        <Link to={item.path}>
                          <item.icon className="w-5 h-5 mr-3 opacity-80" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex flex-col overflow-hidden mr-2">
                <span className="text-sm font-semibold truncate">{user?.name || 'Usuário'}</span>
                <span className="text-xs text-muted-foreground capitalize">
                  {user?.access_level}
                </span>
              </div>
              <button
                onClick={signOut}
                className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Sair"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-y-auto flex flex-col bg-gray-50">
          <header className="h-16 border-b bg-white flex items-center px-4 md:px-6 sticky top-0 z-10 shrink-0 shadow-sm">
            <SidebarTrigger className="text-gray-500 hover:text-gray-900" />
          </header>
          <div className="flex-1 p-4 md:p-6 lg:p-8 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
