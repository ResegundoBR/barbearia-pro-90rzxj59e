import { Link, Outlet, useLocation } from 'react-router-dom'
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
} from '@/components/ui/sidebar'
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
import { SubscriptionTier } from '@/lib/tiers'
import { Link as RouterLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import pb from '@/lib/pocketbase/client'

const navItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Agenda', url: '/agenda', icon: CalendarDays },
  { title: 'Clientes', url: '/clientes', icon: Users },
  { title: 'Serviços & Pacotes', url: '/estoque', icon: Package },
  { title: 'Equipe & Comissões', url: '/staff', icon: Users },
  { title: 'Checkout (POS)', url: '/checkout', icon: BadgeDollarSign },
]

export default function Layout() {
  const location = useLocation()
  const { state } = useMainStore()
  const { user } = useAuth()

  const currentPlan = user?.plan || 'Free'

  const updateTier = async (v: string) => {
    if (user) {
      await pb.collection('users').update(user.id, { plan: v })
    }
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" className="hidden md:flex">
        <SidebarHeader className="p-4 flex flex-row items-center gap-3">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
            <Scissors className="size-5" />
          </div>
          <span className="font-bold text-lg tracking-tight">Barbearia Pro</span>
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
      </Sidebar>

      <SidebarInset className="pb-16 md:pb-0 h-[100dvh]">
        <header className="flex h-16 shrink-0 items-center gap-2 sm:gap-4 border-b border-border bg-card/50 backdrop-blur px-4 sm:px-6 shadow-sm z-10">
          <SidebarTrigger className="-ml-2 hidden md:flex min-h-[44px] min-w-[44px]" />

          <div className="md:hidden flex items-center gap-2 text-primary font-bold">
            <div className="bg-primary text-primary-foreground p-1 rounded-md">
              <Scissors className="size-4" />
            </div>
            {currentPlan}
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

            <Button
              variant="ghost"
              size="icon"
              className="relative hidden sm:flex min-h-[44px] min-w-[44px]"
            >
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 bg-destructive rounded-full animate-pulse"></span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex min-h-[44px] min-w-[44px]"
            >
              <UserCircle className="size-6" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 animate-fade-in">
          <Outlet />
        </main>
      </SidebarInset>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-[72px] bg-card/95 backdrop-blur border-t border-border flex items-center justify-around px-1 pb-safe shadow-[0_-5px_15px_-10px_rgba(0,0,0,0.3)]">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.url ||
            (item.url !== '/' && location.pathname.startsWith(item.url))

          return (
            <Link
              key={item.title}
              to={item.url}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full gap-1 transition-colors min-h-[44px]',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <item.icon className={cn('size-5', isActive && 'fill-primary/20')} />
              <span className="text-[10px] font-medium leading-none">
                {item.title.split(' ')[0]}
              </span>
            </Link>
          )
        })}
      </nav>
    </SidebarProvider>
  )
}
