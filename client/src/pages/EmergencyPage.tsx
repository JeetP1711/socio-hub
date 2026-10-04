import React from 'react'
import { Zap, AlertOctagon, Phone, ShieldAlert, HeartPulse, Flame, Siren } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

export default function EmergencyPage() {
  const triggerAlarm = (type: string) => {
    toast.error(`SOS ${type.toUpperCase()} ALARM BROADCASTED TO ALL RESIDENTS & GUARD ROOM!`)
  }

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      <div className="p-6 rounded-2xl bg-destructive text-destructive-foreground shadow-2xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-white animate-bounce" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">SOS Emergency Command System</h1>
            <p className="text-xs opacity-90">Instant alert broadcast to all residents, security desk, and emergency services</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Button variant="destructive" className="h-28 flex-col gap-2 font-bold text-base" onClick={() => triggerAlarm('Medical Emergency')}>
          <HeartPulse className="w-8 h-8" />
          <span>Medical Emergency</span>
        </Button>
        <Button variant="destructive" className="h-28 flex-col gap-2 font-bold text-base bg-amber-600 hover:bg-amber-700" onClick={() => triggerAlarm('Fire Panic')}>
          <Flame className="w-8 h-8" />
          <span>Fire Alarm</span>
        </Button>
        <Button variant="destructive" className="h-28 flex-col gap-2 font-bold text-base bg-purple-700 hover:bg-purple-800" onClick={() => triggerAlarm('Security Intrusion')}>
          <Siren className="w-8 h-8" />
          <span>Intruder Alert</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Direct Hotline Contacts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { title: 'Gate 1 Main Security Desk', phone: '+91 98101 00001' },
            { title: 'Society Ambulance / First Aid Room', phone: '+91 98101 00002' },
            { title: 'Local Police Station (Vasant Kunj)', phone: '100 / 011-26890000' },
            { title: 'Fire Control Room', phone: '101' },
          ].map(c => (
            <div key={c.title} className="flex justify-between items-center p-3 rounded-lg border">
              <span className="font-semibold text-sm">{c.title}</span>
              <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 hover:underline">
                <Phone className="w-3.5 h-3.5" /> {c.phone}
              </a>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
