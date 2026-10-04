import React, { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2, LayoutDashboard, Users, Home, CreditCard, MessageSquare,
  Eye, Car, CalendarCheck, Bell, FileText, BarChart3, Settings,
  Bot, Shield, DollarSign, UserCog, Package, Folder, Zap,
  Vote, Newspaper, Search, Menu, X, Sun, Moon, LogOut,
  ChevronDown, Command, UserCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAuthStore, useThemeStore, useNotificationStore, useCommandPaletteStore } from '@/stores'
import { cn, getInitials, getGreeting } from '@/lib/utils'
import type { Role } from '@/types'

// ============================================================
// Navigation Config
// ============================================================
interface NavItem {
  label: string
  icon: React.ElementType
  path: string
  roles: Role[]
  badge?: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', roles: ['society_admin', 'committee_member', 'accountant', 'resident'] },
  { label: 'Residents', icon: Users, path: '/residents', roles: ['society_admin', 'committee_member'] },
  { label: 'Flats', icon: Home, path: '/flats', roles: ['society_admin', 'committee_member'] },
  { label: 'Maintenance', icon: CreditCard, path: '/maintenance', roles: ['society_admin', 'accountant', 'resident'] },
  { label: 'Payments', icon: DollarSign, path: '/payments', roles: ['society_admin', 'accountant', 'resident'] },
  { label: 'Complaints', icon: MessageSquare, path: '/complaints', roles: ['society_admin', 'committee_member', 'resident'] },
  { label: 'Visitors', icon: Eye, path: '/visitors', roles: ['society_admin', 'resident', 'security_guard'] },
  { label: 'Notices', icon: Bell, path: '/notices', roles: ['society_admin', 'committee_member', 'resident'] },
  { label: 'Community', icon: Newspaper, path: '/community', roles: ['society_admin', 'committee_member', 'resident'] },
  { label: 'Polls', icon: Vote, path: '/polls', roles: ['society_admin', 'committee_member', 'resident'] },
  { label: 'Amenities', icon: CalendarCheck, path: '/amenities', roles: ['society_admin', 'resident'] },
  { label: 'Parking', icon: Car, path: '/parking', roles: ['society_admin', 'resident'] },
  { label: 'Expenses', icon: DollarSign, path: '/expenses', roles: ['society_admin', 'accountant'] },
  { label: 'Vendors', icon: Package, path: '/vendors', roles: ['society_admin'] },
  { label: 'Staff', icon: UserCog, path: '/staff', roles: ['society_admin'] },
  { label: 'Documents', icon: Folder, path: '/documents', roles: ['society_admin', 'committee_member', 'accountant', 'resident'] },
  { label: 'Analytics', icon: BarChart3, path: '/analytics', roles: ['society_admin', 'accountant', 'committee_member'] },
  { label: 'Emergency', icon: Zap, path: '/emergency', roles: ['society_admin', 'resident', 'security_guard'] },
  { label: 'Settings', icon: Settings, path: '/settings', roles: ['society_admin', 'resident'] },
]

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { isDark, toggle } = useThemeStore()
  const { unreadCount } = useNotificationStore()
  const { toggle: toggleCommandPalette } = useCommandPaletteStore()

  // Filter nav items by role
  const filteredNav = navItems.filter((item) =>
    user ? item.roles.includes(user.role) : false
  )

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        toggleCommandPalette()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggleCommandPalette])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Desktop */}
      <aside className={cn(
        'hidden lg:flex flex-col border-r bg-card/50 backdrop-blur-sm transition-all duration-300 sticky top-0 h-screen',
        sidebarCollapsed ? 'w-[72px]' : 'w-64'
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b">
          <Link to="/dashboard" className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e3a5f] to-emerald-500 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-lg font-bold tracking-tight truncate">
                Socio<span className="text-emerald-500">Hub</span>
              </span>
            )}
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {filteredNav.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative',
                  isActive
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
                title={sidebarCollapsed ? item.label : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <item.icon className={cn('w-5 h-5 shrink-0', isActive && 'text-primary')} />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                {item.badge && !sidebarCollapsed && (
                  <Badge variant="destructive" className="ml-auto text-[10px] px-1.5">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* AI Button */}
        {!sidebarCollapsed && (
          <div className="px-3 pb-3">
            <Link to="/ai">
              <Button variant="outline" className="w-full justify-start gap-2 border-dashed border-indigo-500/30 text-indigo-500 hover:bg-indigo-500/10">
                <Bot className="w-4 h-4" />
                Ask SocioAI
              </Button>
            </Link>
          </div>
        )}

        {/* User */}
        <div className="border-t p-3">
          <div className={cn(
            'flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer',
            sidebarCollapsed && 'justify-center'
          )}>
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate capitalize">
                  {user.role.replace('_', ' ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r z-50 lg:hidden flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-4 border-b">
                <Link to="/dashboard" className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e3a5f] to-emerald-500 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">Socio<span className="text-emerald-500">Hub</span></span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-muted">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {filteredNav.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                        isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center px-4 lg:px-6 gap-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-muted">
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <button
            onClick={toggleCommandPalette}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border bg-background hover:bg-muted text-sm text-muted-foreground transition-colors max-w-xs flex-1"
          >
            <Search className="w-4 h-4" />
            <span className="truncate">Search anything...</span>
            <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono text-muted-foreground border ml-auto">
              <Command className="w-3 h-3" />K
            </kbd>
          </button>

          <div className="flex-1" />

          {/* Theme toggle */}
          <button onClick={toggle}
            className="p-2 rounded-lg hover:bg-muted transition-colors">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <Link to="/notifications" className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          <div className="flex items-center gap-2 pl-2 border-l">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role.replace('_', ' ')}</p>
            </div>
            <button onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t z-40">
          <div className="flex items-center justify-around py-2">
            {[
              { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
              { icon: Eye, label: 'Visitors', path: '/visitors' },
              { icon: MessageSquare, label: 'Complaints', path: '/complaints' },
              { icon: CreditCard, label: 'Payments', path: '/payments' },
              { icon: UserCircle, label: 'Profile', path: '/settings' },
            ].map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link key={item.path} to={item.path}
                  className={cn(
                    'flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-colors min-w-[56px]',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}>
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
