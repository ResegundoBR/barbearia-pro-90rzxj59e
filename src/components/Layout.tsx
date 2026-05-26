import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarDays,
  Users as UsersIcon,
  DollarSign,
  Package,
  Settings,
  LogOut,
  UserCog,
  Menu,
  Scissors,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Agenda', href: '/agenda', icon: CalendarDays },
  { name: 'Clientes', href: '/clientes', icon: UsersIcon },
  { name: 'Financeiro/Comissões', href: '/financeiro', icon: DollarSign },
  { name: 'Produtos/Serviços', href: '/produtos', icon: Package },
  { name: 'Usuários', href: '/users', icon: UserCog },
  { name: 'Configurações', href: '/settings', icon: Settings },
]

export default function Layout() {
  const { pathname } = useLocation()
  const { signOut, user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const NavLinks = () => (
    <>
      {navigation.map((item) => {
        const isActive = pathname.startsWith(item.href)
        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setIsOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium',
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        )
      })}
    </>
  )

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card">
        <div className="p-6">
          <div className="flex items-center gap-3 font-bold text-xl text-primary">
            <Scissors className="h-7 w-7" />
            Barbearia Pro
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto styled-scrollbar">
          <NavLinks />
        </nav>

        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-3 px-3 py-2 mb-3 bg-background rounded-lg border border-border">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.access_level || 'Usuário'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-border hover:bg-muted"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" />
            Sair do Sistema
          </Button>
        </div>
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-2 font-bold text-lg text-primary">
            <Scissors className="h-5 w-5" />
            Barbearia Pro
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[280px] p-0 bg-card border-r-border flex flex-col"
            >
              <VisuallyHidden>
                <SheetTitle>Menu de Navegação</SheetTitle>
                <SheetDescription>Acesse as funcionalidades do sistema</SheetDescription>
              </VisuallyHidden>
              <div className="p-6">
                <div className="flex items-center gap-2 font-bold text-xl text-primary">
                  <Scissors className="h-6 w-6" />
                  Barbearia Pro
                </div>
              </div>
              <nav className="flex-1 px-4 space-y-1 overflow-y-auto styled-scrollbar">
                <NavLinks />
              </nav>
              <div className="p-4 border-t border-border">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 border-border"
                  onClick={signOut}
                >
                  <LogOut className="h-4 w-4" />
                  Sair do Sistema
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-8 styled-scrollbar">
          <div className="mx-auto max-w-7xl animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
