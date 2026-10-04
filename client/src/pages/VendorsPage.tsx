import React from 'react'
import { Package, Phone, Mail, FileText, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function VendorsPage() {
  const vendors = [
    { id: '1', name: 'SecureShield Guarding Pvt Ltd', service: '24/7 Security Service', phone: '+91 98220 11111', monthlyCost: 85000, contractEnd: 'Dec 2024' },
    { id: '2', name: 'Otis Elevator Maintenance', service: 'Lift AMC & Service', phone: '+91 98220 22222', monthlyCost: 28000, contractEnd: 'Mar 2025' },
    { id: '3', name: 'Greenery Gardeners Hub', service: 'Landscape & Plant Care', phone: '+91 98220 33333', monthlyCost: 15000, contractEnd: 'Jan 2025' },
  ]

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vendor & Contract Management</h1>
          <p className="text-sm text-muted-foreground">Directory of third-party AMC agencies, monthly retainers, and contracts</p>
        </div>
        <Button variant="glow" className="gap-2">
          <Plus className="w-4 h-4" /> Add Vendor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vendors.map(v => (
          <Card key={v.id}>
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-base">{v.name}</h3>
                <Badge variant="outline" className="text-[10px]">AMC Active</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{v.service}</p>
              <div className="text-xs space-y-1 border-t pt-2">
                <p>Phone: <span className="font-semibold">{v.phone}</span></p>
                <p>Monthly Retainer: <span className="font-bold text-emerald-500">₹{v.monthlyCost.toLocaleString('en-IN')}</span></p>
                <p>Contract Expiry: <span className="font-semibold">{v.contractEnd}</span></p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
