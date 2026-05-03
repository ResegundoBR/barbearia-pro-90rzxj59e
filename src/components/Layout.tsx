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

const navItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Agenda', url: '/agenda', icon: CalendarDays },
  { title: 'Clientes', url: '/clientes', icon: Users },
  { title: 'Estoque & Pacotes', url: '/estoque', icon: Package },
  { title: 'Checkout (POS)', url: '/checkout', icon: BadgeDollarSign },
]

export default function Layout() {
  const location = useLocation()

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
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

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card/50 backdrop-blur px-6 shadow-sm z-10">
          <SidebarTrigger className="-ml-2" />
          <div className="flex-1 flex items-center max-w-md relative">
            <Search className="absolute left-3 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente, agendamento..."
              className="pl-9 bg-background border-border"
            />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              + Novo Agendamento
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5" />
              <span className="absolute top-2 right-2 size-2 bg-destructive rounded-full animate-pulse"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <UserCircle className="size-6" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden p-4 md:p-6 animate-fade-in">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
