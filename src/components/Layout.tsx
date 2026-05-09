import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  Scissors,
  LayoutDashboard,
  CalendarDays,
  Users,
  Package,
  BadgeDollarSign,
  Search,
  Bell,
  UserCircle,
  Crown,
  Settings,
  LogOut,
  ShoppingBag,
  Wallet,
} from 'lucide-react'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useMainStore from '@/stores/main'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'
import { useState, useEffect } from 'react'
import { useRealtime } from '@/hooks/use-realtime'

const baseNavItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Agenda', url: '/agenda', icon: CalendarDays },
  { title: 'Clientes', url: '/clientes', icon: Users },
  { title: 'Serviços & Pacotes', url: '/estoque', icon: Package },
  { title: 'Produtos e Categorias', url: '/produtos-categorias', icon: ShoppingBag },
  { title: 'Equipe & Comissões', url: '/staff', icon: Users },
  { title: 'Checkout (POS)', url: '/checkout', icon: BadgeDollarSign },
]

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const [expiringPackages, setExpiringPackages] = useState<any[]>([])
  const [isPackagesModalOpen, setIsPackagesModalOpen] = useState(false)
  const [logoUrl, setLogoUrl] = useState('')

  const canAccessSettings = user?.access_level === 'Admin' || user?.access_level === 'Staff'

  const navItems = canAccessSettings
    ? [
        { title: 'Dashboard', url: '/', icon: LayoutDashboard },
        { title: 'Agenda', url: '/agenda', icon: CalendarDays },
        { title: 'Clientes', url: '/clientes', icon: Users },
        { title: 'Equipe & Comissões', url: '/staff', icon: Users },
        { title: 'Financeiro', url: '/financeiro', icon: Wallet },
        { title: 'Serviços & Pacotes', url: '/estoque', icon: Package },
        { title: 'Produtos e Categorias', url: '/produtos-categorias', icon: ShoppingBag },
        { title: 'Checkout (POS)', url: '/checkout', icon: BadgeDollarSign },
        { title: 'Configurações', url: '/settings', icon: Settings },
      ]
    : [
        { title: 'Dashboard', url: '/', icon: LayoutDashboard },
        { title: 'Agenda', url: '/agenda', icon: CalendarDays },
        { title: 'Clientes', url: '/clientes', icon: Users },
        { title: 'Equipe & Comissões', url: '/staff', icon: Users },
        { title: 'Checkout (POS)', url: '/checkout', icon: BadgeDollarSign },
      ]

  const currentPlan = user?.plan || 'Free'

  const updateTier = async (v: string) => {
    if (user) {
      await pb.collection('users').update(user.id, { plan: v })
    }
  }

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  const loadAlerts = async () => {
    try {
      const pkgs = await pb.collection('client_packages').getFullList({
        filter: 'remaining_uses = 1',
        expand: 'client_id,package_id',
      })
      setExpiringPackages(pkgs)
    } catch (e) {
      console.error('Failed to load alerts', e)
    }
  }

  const loadLogo = async () => {
    try {
      const records = await pb.collection('settings').getFullList({ filter: 'key="logo"' })
      if (records.length > 0 && records[0].logo) {
        setLogoUrl(pb.files.getURL(records[0], records[0].logo))
      }
    } catch {
      /* intentionally ignored */
    }
  }

  useEffect(() => {
    if (user) {
      loadAlerts()
    }
    loadLogo()
    window.addEventListener('logo-updated', loadLogo)
    return () => window.removeEventListener('logo-updated', loadLogo)
  }, [user])

  useRealtime('client_packages', () => {
    loadAlerts()
  })

  return (
    <SidebarProvider>
      <Sidebar variant="inset" className="hidden md:flex">
        <SidebarHeader className="p-4 flex flex-row items-center gap-3">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Barbearia Pro"
              className="h-10 max-w-[200px] object-contain drop-shadow-md"
            />
          ) : (
            <span className="text-xl font-bold tracking-tight text-primary">BARBEARIA PRO</span>
          )}
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => {
                  const isActive =
                    location.pathname === item.url ||
                    (item.url !== '/' && location.pathname.startsWith(item.url))
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={handleSignOut} tooltip="Sair">
                <LogOut />
                <span>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="pb-16 md:pb-0 h-[100dvh]">
        <header className="flex h-16 shrink-0 items-center gap-2 sm:gap-4 border-b border-border bg-card/50 backdrop-blur px-4 sm:px-6 shadow-sm z-10">
          <SidebarTrigger className="-ml-2 hidden md:flex min-h-[44px] min-w-[44px]" />

          <div className="md:hidden flex items-center gap-2 text-primary font-bold">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Barbearia Pro"
                className="h-8 max-w-[120px] object-contain drop-shadow-md"
              />
            ) : (
              <span className="text-lg tracking-tight">BARBEARIA PRO</span>
            )}
            <span className="text-xs border border-primary/20 px-1.5 py-0.5 rounded-md bg-primary/5">
              {currentPlan}
            </span>
          </div>

          <div className="flex-1 flex items-center max-w-md relative ml-2 md:ml-0">
            <Search className="absolute left-3 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              className="pl-9 bg-background border-border min-h-[44px]"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <Select value={currentPlan} onValueChange={updateTier}>
              <SelectTrigger className="w-[110px] sm:w-[130px] h-9 bg-secondary/50 text-xs border-dashed min-h-[44px]">
                <Crown className="size-3 mr-1 text-primary" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Free">Plano Free</SelectItem>
                <SelectItem value="Basic">Plano Basic</SelectItem>
                <SelectItem value="Pro">Plano Pro</SelectItem>
                <SelectItem value="Platinum">Plano Platinum</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hidden sm:flex min-h-[44px] min-w-[44px]"
                >
                  <Bell className="size-5" />
                  {expiringPackages.length > 0 && (
                    <span className="absolute top-2 right-2 size-2 bg-destructive rounded-full animate-pulse"></span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-4">
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm">Notificações do Sistema</h4>
                  {expiringPackages.length > 0 ? (
                    <div
                      className="p-3 bg-amber-500/10 text-amber-600 rounded-md cursor-pointer hover:bg-amber-500/20 transition-colors"
                      onClick={() => setIsPackagesModalOpen(true)}
                    >
                      <p className="text-sm font-bold flex items-center gap-2">
                        <Package className="size-4" /> Pacotes Vencendo ({expiringPackages.length})
                      </p>
                      <p className="text-xs mt-1">
                        Existem clientes com apenas 1 uso restante em seus pacotes. Clique para
                        visualizar.
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Nenhuma notificação no momento.</p>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:flex min-h-[44px] min-w-[44px]"
                >
                  <UserCircle className="size-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {canAccessSettings && (
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer w-full flex items-center">
                      <Settings className="mr-2 size-4" />
                      Configurações
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                  <LogOut className="mr-2 size-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <Dialog open={isPackagesModalOpen} onOpenChange={setIsPackagesModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Pacotes Quase no Fim</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto mt-2">
              {expiringPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex justify-between items-center p-3 border rounded-lg bg-card shadow-sm"
                >
                  <div>
                    <p className="font-bold text-sm text-primary">
                      {pkg.expand?.client_id?.name || 'Cliente não informado'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {pkg.expand?.package_id?.name || 'Pacote sem nome'}
                    </p>
                  </div>
                  <span className="text-xs font-semibold bg-amber-500/20 text-amber-600 px-2.5 py-1 rounded-full">
                    1 uso restante
                  </span>
                </div>
              ))}
              {expiringPackages.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum pacote vencendo.
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 animate-fade-in">
          <Outlet />
        </main>
      </SidebarInset>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-[72px] bg-card/95 backdrop-blur border-t border-border flex items-center px-1 pb-safe shadow-[0_-5px_15px_-10px_rgba(0,0,0,0.3)] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.url ||
            (item.url !== '/' && location.pathname.startsWith(item.url))

          return (
            <Link
              key={item.title}
              to={item.url}
              className={cn(
                'flex flex-col items-center justify-center min-w-[72px] flex-1 h-full gap-1 transition-colors min-h-[44px]',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <item.icon className={cn('size-5 shrink-0', isActive && 'fill-primary/20')} />
              <span className="text-[10px] font-medium leading-none whitespace-nowrap">
                {item.title.split(' ')[0]}
              </span>
            </Link>
          )
        })}
      </nav>
    </SidebarProvider>
  )
}
