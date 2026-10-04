import React, { useState } from 'react'
import { Eye, Plus, CheckCircle2, QrCode, Phone, UserCheck, ShieldAlert } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { demoVisitors } from '@/data/demo'
import type { Visitor } from '@/types'
import toast from 'react-hot-toast'

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>(demoVisitors)
  const [isPassOpen, setIsPassOpen] = useState(false)
  const [passCode, setPassCode] = useState<string | null>(null)

  const [guestForm, setGuestForm] = useState({
    name: '', phone: '', flatNumber: 'A-101', purpose: 'Guest Visit', vehicleNumber: ''
  })

  const handleCreatePass = (e: React.FormEvent) => {
    e.preventDefault()
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    const newVis: Visitor = {
      id: `v-${Date.now()}`,
      societyId: 's1',
      name: guestForm.name,
      phone: guestForm.phone,
      purpose: guestForm.purpose as any,
      flatId: 'f1',
      flatNumber: guestForm.flatNumber,
      towerName: 'Tower A',
      status: 'approved',
      passCode: code,
      expectedTime: 'Today 6:00 PM',
      vehicleNumber: guestForm.vehicleNumber,
    }
    setVisitors([newVis, ...visitors])
    setPassCode(code)
    toast.success(`Pre-approved visitor! Gate Pass Code: ${code}`)
  }

  const handleCheckout = (id: string) => {
    setVisitors(visitors.map(v => v.id === id ? { ...v, status: 'checked_out', exitTime: new Date().toLocaleTimeString() } : v))
    toast.success('Visitor marked as checked out.')
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Visitor Gate Pass & Register</h1>
          <p className="text-sm text-muted-foreground">Pre-approve guests, track real-time delivery entries & security verification</p>
        </div>
        <Button variant="glow" onClick={() => setIsPassOpen(true)} className="gap-2">
          <QrCode className="w-4 h-4" /> Pre-approve Guest Pass
        </Button>
      </div>

      {/* Visitors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visitors.map(v => (
          <Card key={v.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-sm">{v.name}</h3>
                  <p className="text-xs text-muted-foreground">{v.phone}</p>
                </div>
                <Badge variant={v.status === 'checked_in' ? 'success' : v.status === 'approved' ? 'default' : 'outline'} className="capitalize text-[10px]">
                  {v.status.replace('_', ' ')}
                </Badge>
              </div>

              <div className="text-xs space-y-1 bg-muted/40 p-2.5 rounded-lg">
                <p><span className="text-muted-foreground">Visiting:</span> Flat {v.flatNumber} ({v.towerName})</p>
                <p><span className="text-muted-foreground">Purpose:</span> {v.purpose}</p>
                {v.vehicleNumber && <p><span className="text-muted-foreground">Vehicle:</span> {v.vehicleNumber}</p>}
                {v.passCode && <p className="font-mono font-bold text-primary">Pass Code: {v.passCode}</p>}
              </div>

              <div className="flex justify-between items-center text-[11px] text-muted-foreground pt-1">
                <span>Entry: {v.entryTime || v.expectedTime || 'Pending'}</span>
                {v.status === 'checked_in' && (
                  <Button size="sm" variant="outline" className="h-7 text-[11px]" onClick={() => handleCheckout(v.id)}>
                    Check Out
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pre approve modal */}
      <Dialog open={isPassOpen} onOpenChange={setIsPassOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pre-approve Guest Entry Pass</DialogTitle>
          </DialogHeader>

          {passCode ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <QrCode className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Entry Pass Generated!</h3>
              <p className="text-3xl font-mono font-bold text-primary tracking-widest">{passCode}</p>
              <p className="text-xs text-muted-foreground">Share this 6-digit code with your visitor to show at the security gate.</p>
              <Button variant="glow" onClick={() => { setPassCode(null); setIsPassOpen(false); }}>
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleCreatePass} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Guest Full Name</label>
                <Input
                  required
                  value={guestForm.name}
                  onChange={e => setGuestForm({ ...guestForm, name: e.target.value })}
                  placeholder="e.g. Vikram Sharma"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    required
                    value={guestForm.phone}
                    onChange={e => setGuestForm({ ...guestForm, phone: e.target.value })}
                    placeholder="+91 98000 00000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Purpose</label>
                  <Input
                    value={guestForm.purpose}
                    onChange={e => setGuestForm({ ...guestForm, purpose: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsPassOpen(false)}>Cancel</Button>
                <Button type="submit" variant="glow">Generate Pass Code</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
