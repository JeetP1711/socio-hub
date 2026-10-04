import React, { useState } from 'react'
import { Shield, Eye, CheckCircle2, UserCheck, AlertOctagon, Phone, ArrowRight, Search, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { demoVisitors } from '@/data/demo'
import toast from 'react-hot-toast'

export default function SecurityPage() {
  const [passCodeInput, setPassCodeInput] = useState('')
  const [verifiedVisitor, setVerifiedVisitor] = useState<any | null>(null)
  const [visitorList, setVisitorList] = useState(demoVisitors)

  const handleVerifyPass = (e: React.FormEvent) => {
    e.preventDefault()
    const match = visitorList.find(v => v.passCode === passCodeInput.trim())
    if (match) {
      setVerifiedVisitor(match)
      toast.success('Valid Pass Code!')
    } else {
      toast.error('Invalid Pass Code!')
      setVerifiedVisitor(null)
    }
  }

  const handleGateEntry = (id: string) => {
    setVisitorList(visitorList.map(v => v.id === id ? { ...v, status: 'checked_in', entryTime: new Date().toLocaleTimeString() } : v))
    toast.success('Visitor Checked IN at Gate 1')
    setVerifiedVisitor(null)
    setPassCodeInput('')
  }

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-600 via-[#1e3a5f] to-slate-900 text-white flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <Shield className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Gate 1 Security Portal</h1>
            <p className="text-xs text-white/80">Guard on duty: Ramesh Kumar · Green Valley Residency</p>
          </div>
        </div>
        <Badge variant="success" className="animate-pulse">Gate Online</Badge>
      </div>

      {/* Touch Passcode Verification Box */}
      <Card className="border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" /> Verify Pre-approved Pass Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleVerifyPass} className="flex gap-3">
            <Input
              value={passCodeInput}
              onChange={e => setPassCodeInput(e.target.value)}
              placeholder="Enter 6-digit Pass Code..."
              className="text-lg font-mono text-center tracking-widest h-12"
              maxLength={6}
            />
            <Button type="submit" size="lg" variant="glow" className="shrink-0">
              Verify Pass
            </Button>
          </form>

          {verifiedVisitor && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">{verifiedVisitor.name}</span>
                <Badge variant="success">Verified Guest</Badge>
              </div>
              <p className="text-xs">Visiting: Flat {verifiedVisitor.flatNumber} ({verifiedVisitor.towerName})</p>
              <Button onClick={() => handleGateEntry(verifiedVisitor.id)} variant="glow" className="w-full">
                Allow Gate Entry
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button variant="outline" className="h-20 flex-col gap-1 text-xs font-semibold" onClick={() => toast.success('Amazon / Swiggy delivery logged')}>
          <span className="text-xl">📦</span>
          <span>Delivery Entry</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-1 text-xs font-semibold" onClick={() => toast.success('Cab entry logged')}>
          <span className="text-xl">🚕</span>
          <span>Cab Entry</span>
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-1 text-xs font-semibold" onClick={() => toast.success('Service staff entry logged')}>
          <span className="text-xl">🛠️</span>
          <span>Staff / Maid</span>
        </Button>
        <Button variant="destructive" className="h-20 flex-col gap-1 text-xs font-semibold" onClick={() => toast.error('EMERGENCY ALERT BROADCAST TO SOCIETY')}>
          <AlertOctagon className="w-6 h-6" />
          <span>GATE PANIC ALARM</span>
        </Button>
      </div>

      {/* Currently Inside Gate Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Currently Inside Society ({visitorList.filter(v => v.status === 'checked_in').length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {visitorList.filter(v => v.status === 'checked_in').map(v => (
            <div key={v.id} className="flex justify-between items-center p-3 rounded-lg border">
              <div>
                <p className="font-semibold text-sm">{v.name}</p>
                <p className="text-xs text-muted-foreground">{v.purpose} → Flat {v.flatNumber} ({v.entryTime})</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => {
                setVisitorList(visitorList.map(x => x.id === v.id ? { ...x, status: 'checked_out' } : x))
                toast.success('Marked Checked Out')
              }}>
                Check Out
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
