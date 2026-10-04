import React from 'react'
import { Building2, Plus, TrendingUp, Users, DollarSign, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { demoSocieties } from '@/data/demo'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function SuperAdminPage() {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-2xl font-bold">SocioHub SaaS Master Panel</h1>
          <p className="text-sm text-white/80">Multi-tenant management & platform revenue analytics</p>
        </div>
        <Button variant="glow" onClick={() => toast.success('New Society Onboarding Modal Opened')} className="gap-2">
          <Plus className="w-4 h-4" /> Onboard New Society
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="bg-purple-500/10 border-purple-500/20">
          <CardContent className="p-4">
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">MONTHLY RECURRING REVENUE (MRR)</p>
            <p className="text-2xl font-bold mt-1 text-purple-700 dark:text-purple-300">₹4,85,000</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">TOTAL SOCIETIES</p>
            <p className="text-2xl font-bold mt-1 text-blue-700 dark:text-blue-300">47 Active</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/10 border-emerald-500/20">
          <CardContent className="p-4">
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">TOTAL RESIDENTS</p>
            <p className="text-2xl font-bold mt-1 text-emerald-700 dark:text-emerald-300">14,280</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardContent className="p-4">
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">UPTIME SLA</p>
            <p className="text-2xl font-bold mt-1 text-amber-700 dark:text-amber-300">99.98%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Registered SaaS Societies</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-xs text-muted-foreground uppercase border-b">
              <tr>
                <th className="p-4">Society Name</th>
                <th className="p-4">City</th>
                <th className="p-4">Flats / Towers</th>
                <th className="p-4">Plan Tier</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {demoSocieties.map(s => (
                <tr key={s.id} className="hover:bg-muted/30">
                  <td className="p-4 font-bold">{s.name}</td>
                  <td className="p-4">{s.city}, {s.state}</td>
                  <td className="p-4">{s.totalFlats} flats ({s.totalTowers} towers)</td>
                  <td className="p-4 uppercase text-xs font-semibold text-purple-500">{s.subscriptionPlan}</td>
                  <td className="p-4">
                    <Badge variant="success" className="capitalize text-[10px]">{s.subscriptionStatus}</Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button size="sm" variant="outline" onClick={() => toast.success(`Accessing tenant ${s.name}...`)}>
                      Manage Tenant
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
