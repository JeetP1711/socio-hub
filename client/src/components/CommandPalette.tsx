import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Users, Home, CreditCard, MessageSquare, Eye, Bell,
  Newspaper, Vote, CalendarCheck, Car, DollarSign, Package,
  UserCog, Folder, BarChart3, Zap, Settings, Bot, Shield, X, ArrowRight
} from 'lucide-react'
import { useCommandPaletteStore } from '@/stores'
import { demoResidents, demoComplaints, demoVisitors, demoNotices } from '@/data/demo'
import { cn } from '@/lib/utils'

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  category: 'Pages' | 'Residents' | 'Complaints' | 'Visitors' | 'Notices'
  icon: React.ElementType
  action: () => void
}

export default function CommandPalette() {
  const { isOpen, close } = useCommandPaletteStore()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setQuery('')
  }, [isOpen])

  if (!isOpen) return null

  const pageCommands: CommandItem[] = [
    { id: 'p-dash', title: 'Dashboard', subtitle: 'Overview & key metrics', category: 'Pages', icon: Home, action: () => navigate('/dashboard') },
    { id: 'p-res', title: 'Residents', subtitle: 'Manage flat owners & tenants', category: 'Pages', icon: Users, action: () => navigate('/residents') },
    { id: 'p-flat', title: 'Flats & Towers', subtitle: 'Visual building layout', category: 'Pages', icon: Home, action: () => navigate('/flats') },
    { id: 'p-maint', title: 'Maintenance Bills', subtitle: 'Monthly dues & invoices', category: 'Pages', icon: CreditCard, action: () => navigate('/maintenance') },
    { id: 'p-comp', title: 'Complaints', subtitle: 'Tickets & resolution workflow', category: 'Pages', icon: MessageSquare, action: () => navigate('/complaints') },
    { id: 'p-vis', title: 'Visitors', subtitle: 'Gate pass & entry records', category: 'Pages', icon: Eye, action: () => navigate('/visitors') },
    { id: 'p-not', title: 'Notices', subtitle: 'Society announcements', category: 'Pages', icon: Bell, action: () => navigate('/notices') },
    { id: 'p-comm', title: 'Community Feed', subtitle: 'Private resident social network', category: 'Pages', icon: Newspaper, action: () => navigate('/community') },
    { id: 'p-poll', title: 'Polls & Voting', subtitle: 'Resident surveys', category: 'Pages', icon: Vote, action: () => navigate('/polls') },
    { id: 'p-amen', title: 'Amenities', subtitle: 'Book clubhouse, gym, pool', category: 'Pages', icon: CalendarCheck, action: () => navigate('/amenities') },
    { id: 'p-park', title: 'Parking Slots', subtitle: 'Vehicle registry & map', category: 'Pages', icon: Car, action: () => navigate('/parking') },
    { id: 'p-exp', title: 'Expenses', subtitle: 'Society expenditure log', category: 'Pages', icon: DollarSign, action: () => navigate('/expenses') },
    { id: 'p-vend', title: 'Vendors', subtitle: 'Contracts & contacts', category: 'Pages', icon: Package, action: () => navigate('/vendors') },
    { id: 'p-staff', title: 'Staff & Security', subtitle: 'Staff list & attendance', category: 'Pages', icon: UserCog, action: () => navigate('/staff') },
    { id: 'p-doc', title: 'Documents', subtitle: 'Society document vault', category: 'Pages', icon: Folder, action: () => navigate('/documents') },
    { id: 'p-ana', title: 'Analytics', subtitle: 'Charts & financial reports', category: 'Pages', icon: BarChart3, action: () => navigate('/analytics') },
    { id: 'p-ai', title: 'SocioAI Assistant', subtitle: 'Ask AI about society data', category: 'Pages', icon: Bot, action: () => navigate('/ai') },
  ]

  const residentCommands: CommandItem[] = demoResidents.slice(0, 5).map((r) => ({
    id: `res-${r.id}`,
    title: r.name,
    subtitle: `${r.towerName} · Flat ${r.flatNumber} (${r.type})`,
    category: 'Residents' as const,
    icon: Users,
    action: () => navigate('/residents'),
  }))

  const complaintCommands: CommandItem[] = demoComplaints.slice(0, 4).map((c) => ({
    id: `comp-${c.id}`,
    title: c.title,
    subtitle: `${c.flatNumber} · Priority: ${c.priority} · Status: ${c.status}`,
    category: 'Complaints' as const,
    icon: MessageSquare,
    action: () => navigate('/complaints'),
  }))

  const allCommands = [...pageCommands, ...residentCommands, ...complaintCommands]

  const filtered = query.trim() === ''
    ? pageCommands
    : allCommands.filter(c =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        (c.subtitle && c.subtitle.toLowerCase().includes(query.toLowerCase()))
      )

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-card border rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search Header */}
          <div className="flex items-center px-4 border-b">
            <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Type a command or search (residents, complaints, pages)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full h-14 bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
            />
            <button onClick={close} className="p-1 rounded-md hover:bg-muted text-muted-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No matching results found for "{query}".
              </div>
            ) : (
              filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action()
                    close()
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      {item.subtitle && <p className="text-xs text-muted-foreground">{item.subtitle}</p>}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                    Open <ArrowRight className="w-3 h-3" />
                  </span>
                </button>
              ))
            )}
          </div>

          <div className="px-4 py-2 bg-muted/40 border-t flex items-center justify-between text-xs text-muted-foreground">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-muted border font-mono">ESC</kbd> to close</span>
            <span>SocioHub Global Search</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
