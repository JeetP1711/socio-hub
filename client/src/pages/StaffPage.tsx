import React from 'react'
import { UserCog, Phone, Shield, CheckCircle2, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function StaffPage() {
  const staffMembers = [
    { id: '1', name: 'Ramesh Kumar', role: 'Head Security Guard', shift: 'Day (08:00 - 20:00)', phone: '+91 98111 22233', status: 'on_duty' },
    { id: '2', name: 'Suresh Patil', role: 'Security Guard', shift: 'Night (20:00 - 08:00)', phone: '+91 98111 22234', status: 'off_duty' },
    { id: '3', name: 'Sunita Devi', role: 'Head Housekeeper', shift: 'Day (09:00 - 17:00)', phone: '+91 98111 22235', status: 'on_duty' },
  ]

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Staff & Security Guard Management</h1>
          <p className="text-sm text-muted-foreground">Shift rotas, attendance logs, and staff contacts</p>
        </div>
        <Button variant="glow" className="gap-2">
          <Plus className="w-4 h-4" /> Add Staff Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {staffMembers.map(s => (
          <Card key={s.id}>
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base">{s.name}</h3>
                  <p className="text-xs text-muted-foreground">{s.role}</p>
                </div>
                <Badge variant={s.status === 'on_duty' ? 'success' : 'secondary'} className="capitalize text-[10px]">
                  {s.status.replace('_', ' ')}
                </Badge>
              </div>
              <div className="text-xs space-y-1 border-t pt-2 text-muted-foreground">
                <p>Shift: <span className="font-semibold text-foreground">{s.shift}</span></p>
                <p>Contact: <span className="font-semibold text-foreground">{s.phone}</span></p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
