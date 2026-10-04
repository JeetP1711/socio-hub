import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Users, Home, CreditCard, MessageSquare, Eye, Car,
  TrendingUp, TrendingDown, ArrowUpRight, Plus, AlertTriangle,
  CheckCircle2, Clock, Sparkles, Building2, ChevronRight, Bot
} from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, PieChart, Pie, Cell
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/stores'
import {
  demoDashboardStats, maintenanceChartData, expenseChartData,
  complaintChartData, visitorChartData, demoComplaints, demoVisitors, demoNotices
} from '@/data/demo'
import { formatCurrency, getGreeting } from '@/lib/utils'

export default function AdminDashboard() {
  const { user } = useAuthStore()

  const statsCards = [
    { title: 'Total Residents', value: demoDashboardStats.totalResidents, change: '+12 this month', isPositive: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Occupied Flats', value: `${demoDashboardStats.occupiedFlats} / 120`, change: '85% occupancy rate', isPositive: true, icon: Home, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'Maintenance Collected', value: formatCurrency(demoDashboardStats.maintenanceCollected), change: '₹4.25L pending', isPositive: true, icon: CreditCard, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { title: 'Open Complaints', value: demoDashboardStats.openComplaints, change: '3 urgent tickets', isPositive: false, icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { title: 'Visitors Today', value: demoDashboardStats.visitorsToday, change: '12 currently inside', isPositive: true, icon: Eye, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { title: 'Parking Occupancy', value: `${demoDashboardStats.parkingOccupancy}%`, change: '15 slots vacant', isPositive: true, icon: Car, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ]

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#1e3a5f] to-emerald-700 text-white p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
              Green Valley Residency
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-white/70">3 Towers · 120 Flats</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {getGreeting()}, {user?.name || 'Admin'} 👋
          </h1>
          <p className="text-sm text-white/80 mt-1">
            Here's what is happening in your society today.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/ai">
            <Button variant="secondary" size="sm" className="gap-1.5 shadow-sm">
              <Bot className="w-4 h-4 text-indigo-600" /> Ask SocioAI
            </Button>
          </Link>
          <Link to="/notices">
            <Button variant="glow" size="sm" className="gap-1.5">
              <Plus className="w-4 h-4" /> Create Notice
            </Button>
          </Link>
        </div>
      </div>

      {/* Urgent Alert Banner */}
      {demoNotices.find(n => n.priority === 'urgent') && (
        <div className="flex items-center justify-between p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div className="text-xs sm:text-sm font-medium">
              <span className="font-bold">Notice: </span>
              {demoNotices.find(n => n.priority === 'urgent')?.title}
            </div>
          </div>
          <Link to="/notices" className="text-xs font-semibold underline shrink-0">View Notice</Link>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{stat.title}</span>
                <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.isPositive ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance Collection Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Maintenance Collection Trend</CardTitle>
              <CardDescription>Monthly collected vs pending dues (2024)</CardDescription>
            </div>
            <Link to="/maintenance" className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
              Details <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={maintenanceChartData}>
                  <defs>
                    <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v/1000}k`} />
                  <Tooltip formatter={(val: number) => formatCurrency(val)} />
                  <Area type="monotone" dataKey="collected" stroke="#10b981" fillOpacity={1} fill="url(#colorCollected)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Society Expense Breakdown</CardTitle>
              <CardDescription>Monthly category breakdown</CardDescription>
            </div>
            <Link to="/expenses" className="text-xs text-primary font-medium flex items-center gap-1 hover:underline">
              Expenses <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={expenseChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={(e) => e.name}>
                    {expenseChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number) => formatCurrency(val)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complaints & Visitors Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Complaints */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Recent Complaints</CardTitle>
              <CardDescription>Requires staff attention</CardDescription>
            </div>
            <Link to="/complaints" className="text-xs text-primary font-medium hover:underline">View All</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoComplaints.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-xl border bg-muted/20">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs sm:text-sm">{c.title}</span>
                    <Badge variant={c.priority === 'high' || c.priority === 'critical' ? 'destructive' : 'warning'} className="text-[10px]">
                      {c.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.flatNumber} · {c.towerName}</p>
                </div>
                <Badge variant={c.status === 'resolved' ? 'success' : 'outline'} className="capitalize text-[10px]">
                  {c.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's Visitors Log */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Today's Visitors Activity</CardTitle>
              <CardDescription>Latest gate check-ins</CardDescription>
            </div>
            <Link to="/visitors" className="text-xs text-primary font-medium hover:underline">Gate Register</Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoVisitors.slice(0, 4).map((v) => (
              <div key={v.id} className="flex items-center justify-between p-3 rounded-xl border bg-muted/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs">
                    {v.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-xs sm:text-sm">{v.name}</p>
                    <p className="text-xs text-muted-foreground">{v.purpose} → Flat {v.flatNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={v.status === 'checked_in' ? 'success' : 'secondary'} className="text-[10px] capitalize">
                    {v.status.replace('_', ' ')}
                  </Badge>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{v.entryTime || v.expectedTime}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
