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
  Check,
  Truck,
  Menu,
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
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { usePermissions } from '@/hooks/use-permissions'
import pb from '@/lib/pocketbase/client'
import { useState, useEffect } from 'react'
import { useRealtime } from '@/hooks/use-realtime'
import { useToast } from '@/hooks/use-toast'
import { Label } from '@/components/ui/label'

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const [expiringPackages, setExpiringPackages] = useState<any[]>([])
  const [isPackagesModalOpen, setIsPackagesModalOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const [logoUrl, setLogoUrl] = useState('')

  const { hasAccess, isAdmin } = usePermissions()
  const canAccessSettings = isAdmin || hasAccess('settings')

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: '',
    surname: '',
    whatsapp: '',
    oldPassword: '',
    password: '',
    passwordConfirm: '',
  })
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        surname: user.surname || '',
        whatsapp: user.whatsapp || '',
        oldPassword: '',
        password: '',
        passwordConfirm: '',
      })
    }
  }, [user])

  const handleSaveProfile = async () => {
    if (profileForm.password && profileForm.password !== profileForm.passwordConfirm) {
      toast({ title: 'As senhas não coincidem', variant: 'destructive' })
      return
    }
    if ((profileForm.password || profileForm.oldPassword) && !profileForm.oldPassword) {
      toast({ title: 'Senha atual é obrigatória para alterar a senha', variant: 'destructive' })
      return
    }

    try {
      const data: any = {
        name: profileForm.name,
        surname: profileForm.surname,
        whatsapp: profileForm.whatsapp,
      }
      if (profileForm.password) {
        data.oldPassword = profileForm.oldPassword
        data.password = profileForm.password
        data.passwordConfirm = profileForm.passwordConfirm
      }

      await pb.collection('users').update(user.id, data)
      toast({ title: 'Perfil atualizado com sucesso!' })
      setIsProfileOpen(false)
    } catch (err: any) {
      toast({ title: 'Erro ao atualizar perfil', description: err.message, variant: 'destructive' })
    }
  }

  const allNavItems = [
    { id: 'dashboard', title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { id: 'agenda', title: 'Agenda', url: '/agenda', icon: CalendarDays },
    { id: 'clientes', title: 'Clientes', url: '/clientes', icon: Users },
    { id: 'estoque', title: 'Serviços & Pacotes', url: '/estoque', icon: Package },
    {
      id: 'produtos',
      title: 'Produtos',
      url: '/produtos',
      icon: ShoppingBag,
    },
    { id: 'fornecedores', title: 'Compras/Fornec.', url: '/fornecedores', icon: Truck },
    { id: 'staff', title: 'Equipe & Comissões', url: '/staff', icon: Users },
    { id: 'checkout', title: 'Checkout (POS)', url: '/checkout', icon: BadgeDollarSign },
    { id: 'financeiro', title: 'Financeiro', url: '/financeiro', icon: Wallet },
    { id: 'users', title: 'Usuários e Acessos', url: '/users', icon: UserCircle },
    { id: 'settings', title: 'Configurações', url: '/settings', icon: Settings },
  ]

  const navItems = allNavItems.filter((item) => hasAccess(item.id) || isAdmin)

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

      if (user) {
        const notifs = await pb.collection('notifications').getFullList({
          filter: `user_id="${user.id}" && is_read=false`,
          sort: '-created',
        })
        setNotifications(notifs)
      }
    } catch (e) {
      console.error('Failed to load alerts', e)
    }
  }

  const markNotificationAsRead = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    try {
      await pb.collection('notifications').update(id, { is_read: true })
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const handleNotificationClick = async (e: React.MouseEvent, id: string) => {
    await markNotificationAsRead(e, id)
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

  useRealtime('notifications', () => {
    loadAlerts()
  })

  useRealtime('appointments', () => {
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
            <span className="text-xl font-bold tracking-tight text-primary">La Barberiá</span>
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

      <SidebarInset className="h-[100dvh] flex flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 sm:gap-4 border-b border-border bg-card/50 backdrop-blur px-4 sm:px-6 shadow-sm z-10">
          <SidebarTrigger className="-ml-2 hidden md:flex min-h-[44px] min-w-[44px]" />

          <div className="md:hidden flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="-ml-2 min-h-[44px] min-w-[44px]">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0 flex flex-col">
                <div className="p-4 border-b flex items-center gap-3">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Barbearia Pro"
                      className="h-8 max-w-[150px] object-contain drop-shadow-md"
                    />
                  ) : (
                    <span className="font-bold tracking-tight text-primary">BARBEARIA PRO</span>
                  )}
                </div>
                <ScrollArea className="flex-1">
                  <div className="flex flex-col gap-1 p-2">
                    {navItems.map((item) => {
                      const isActive =
                        location.pathname === item.url ||
                        (item.url !== '/' && location.pathname.startsWith(item.url))
                      return (
                        <SheetClose asChild key={item.title}>
                          <Link
                            to={item.url}
                            className={cn(
                              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                              isActive
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-muted text-muted-foreground',
                            )}
                          >
                            <item.icon className="size-4" />
                            {item.title}
                          </Link>
                        </SheetClose>
                      )
                    })}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground"
                    onClick={handleSignOut}
                  >
                    <LogOut className="size-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <div className="text-primary font-bold flex items-center gap-2">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Barbearia Pro"
                  className="h-8 max-w-[120px] object-contain drop-shadow-md hidden sm:block"
                />
              ) : (
                <span className="text-lg tracking-tight hidden sm:block">BARBEARIA PRO</span>
              )}
              <span className="text-xs border border-primary/20 px-1.5 py-0.5 rounded-md bg-primary/5">
                {currentPlan}
              </span>
            </div>
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
                <Button variant="ghost" size="icon" className="relative min-h-[44px] min-w-[44px]">
                  <Bell className="size-5" />
                  {(expiringPackages.length > 0 || notifications.length > 0) && (
                    <span className="absolute top-2 right-2 size-2 bg-destructive rounded-full animate-pulse"></span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-4">
                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">Notificações</h4>
                    {notifications.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 text-xs text-muted-foreground"
                        onClick={async () => {
                          try {
                            await Promise.all(
                              notifications.map((n) =>
                                pb.collection('notifications').update(n.id, { is_read: true }),
                              ),
                            )
                            setNotifications([])
                          } catch (err) {
                            console.error(err)
                          }
                        }}
                      >
                        Marcar todas como lidas
                      </Button>
                    )}
                  </div>

                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 bg-muted/30 border rounded-md relative flex items-start justify-between group cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={(e) => handleNotificationClick(e, n.id)}
                    >
                      <div className="pr-6">
                        <p className="text-sm font-bold text-primary">{n.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => markNotificationAsRead(e, n.id)}
                        title="Marcar como lida"
                      >
                        <Check className="size-4 text-emerald-500" />
                      </Button>
                    </div>
                  ))}

                  {expiringPackages.length > 0 && (
                    <div
                      className="p-3 bg-amber-500/10 text-amber-600 rounded-md cursor-pointer hover:bg-amber-500/20 transition-colors"
                      onClick={() => setIsPackagesModalOpen(true)}
                    >
                      <p className="text-sm font-bold flex items-center gap-2">
                        <Package className="size-4" /> Pacotes Vencendo ({expiringPackages.length})
                      </p>
                      <p className="text-xs mt-1">Existem clientes com apenas 1 uso restante.</p>
                    </div>
                  )}

                  {notifications.length === 0 && expiringPackages.length === 0 && (
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
                <DropdownMenuItem onClick={() => setIsProfileOpen(true)} className="cursor-pointer">
                  <UserCircle className="mr-2 size-4" />
                  Meu Perfil
                </DropdownMenuItem>
                {canAccessSettings && (
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer w-full flex items-center">
                      <Settings className="mr-2 size-4" />
                      Configurações
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 size-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Meu Perfil</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sobrenome</Label>
                  <Input
                    value={profileForm.surname}
                    onChange={(e) => setProfileForm({ ...profileForm, surname: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input
                  value={profileForm.whatsapp}
                  onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className="pt-4 border-t space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground">Alterar Senha</h4>
                <div className="space-y-2">
                  <Label>Senha Atual</Label>
                  <Input
                    type="password"
                    value={profileForm.oldPassword}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, oldPassword: e.target.value })
                    }
                    placeholder="Obrigatório para alterar senha"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nova Senha</Label>
                    <Input
                      type="password"
                      value={profileForm.password}
                      onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirmar Nova Senha</Label>
                    <Input
                      type="password"
                      value={profileForm.passwordConfirm}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, passwordConfirm: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsProfileOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveProfile}>Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isPackagesModalOpen} onOpenChange={setIsPackagesModalOpen}>
          <DialogContent className="max-w-md w-[95vw]">
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
                  <span className="text-xs font-semibold bg-amber-500/20 text-amber-600 px-2.5 py-1 rounded-full whitespace-nowrap ml-2">
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

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 pb-safe animate-fade-in w-full max-w-full">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
