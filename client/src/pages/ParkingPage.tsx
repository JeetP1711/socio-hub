import React, { useState } from 'react'
import { Car, Zap, CheckCircle2, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ParkingPage() {
  const parkingSlots = Array.from({ length: 24 }).map((_, i) => ({
    id: `P-${101 + i}`,
    type: i % 4 === 0 ? 'ev' : i % 2 === 0 ? 'car' : 'bike',
    status: i % 3 === 0 ? 'vacant' : 'occupied',
    assignedFlat: i % 3 === 0 ? undefined : `A-${101 + i}`,
    vehicleNo: i % 3 === 0 ? undefined : `MH-12-AB-${1000 + i}`,
  }))

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Parking Slot Layout & EV Charging</h1>
        <p className="text-sm text-muted-foreground">Basement 1 & Basement 2 vehicle allocation matrix</p>
      </div>

      <div className="flex gap-4 text-xs">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500 inline-block" /> Vacant (8)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-muted-foreground inline-block" /> Occupied (16)</span>
        <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-500" /> EV Station Enabled</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {parkingSlots.map(s => (
          <Card key={s.id} className={`text-center transition-all ${s.status === 'vacant' ? 'border-emerald-500/50 bg-emerald-500/5' : ''}`}>
            <CardContent className="p-3 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold">{s.id}</span>
                {s.type === 'ev' && <Zap className="w-3.5 h-3.5 text-amber-500" />}
              </div>
              <Car className={`w-8 h-8 mx-auto ${s.status === 'vacant' ? 'text-emerald-500' : 'text-muted-foreground'}`} />
              <Badge variant={s.status === 'vacant' ? 'success' : 'secondary'} className="text-[10px]">
                {s.status}
              </Badge>
              {s.assignedFlat && <p className="text-[10px] text-muted-foreground">{s.assignedFlat}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
