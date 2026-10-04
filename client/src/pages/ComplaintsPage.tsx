import React, { useState } from 'react'
import { MessageSquare, Plus, CheckCircle, Clock, AlertTriangle, UserCheck, Star, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { demoComplaints } from '@/data/demo'
import type { Complaint } from '@/types'
import toast from 'react-hot-toast'

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>(demoComplaints)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isSubmitOpen, setIsSubmitOpen] = useState(false)

  const [form, setForm] = useState({
    title: '', category: 'plumbing' as Complaint['category'], description: '', priority: 'medium' as Complaint['priority'], location: 'Flat A-101'
  })

  const filtered = complaints.filter(c => selectedCategory === 'all' || c.category === selectedCategory)

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault()
    const newComp: Complaint = {
      id: `c-${Date.now()}`,
      residentId: 'r1',
      residentName: 'Priya Mehta',
      flatNumber: 'A-101',
      towerName: 'Tower A - Jasmine',
      category: form.category,
      title: form.title,
      description: form.description,
      images: [],
      priority: form.priority,
      status: 'submitted',
      location: form.location,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      comments: [],
    }
    setComplaints([newComp, ...complaints])
    setIsSubmitOpen(false)
    toast.success('Complaint submitted successfully!')
  }

  const handleUpdateStatus = (id: string, newStatus: Complaint['status']) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c))
    toast.success(`Complaint status updated to ${newStatus}`)
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Complaint Management</h1>
          <p className="text-sm text-muted-foreground">Track resident tickets, staff assignment, and resolution timelines</p>
        </div>
        <Button variant="glow" onClick={() => setIsSubmitOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Raise Complaint
        </Button>
      </div>

      {/* Category filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'plumbing', 'electricity', 'security', 'cleaning', 'lift', 'water'].map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
            className="capitalize shrink-0"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Complaints list */}
      <div className="space-y-4">
        {filtered.map(c => (
          <Card key={c.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base">{c.title}</span>
                    <Badge variant={c.priority === 'high' || c.priority === 'critical' ? 'destructive' : 'warning'} className="text-[10px]">
                      {c.priority}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] capitalize">{c.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.description}</p>
                  <p className="text-xs text-muted-foreground font-medium pt-1">
                    Raised by {c.residentName} · Flat {c.flatNumber} ({c.towerName}) on {c.createdAt}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  <Badge variant={c.status === 'resolved' || c.status === 'confirmed' ? 'success' : 'secondary'} className="capitalize text-xs">
                    {c.status.replace('_', ' ')}
                  </Badge>

                  <div className="flex gap-1">
                    {c.status === 'submitted' && (
                      <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(c.id, 'assigned')}>
                        Assign Staff
                      </Button>
                    )}
                    {c.status === 'assigned' && (
                      <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(c.id, 'in_progress')}>
                        Start Work
                      </Button>
                    )}
                    {c.status === 'in_progress' && (
                      <Button size="sm" variant="success" onClick={() => handleUpdateStatus(c.id, 'resolved')}>
                        Mark Resolved
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Raise Complaint Modal */}
      <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Raise a New Complaint</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmitComplaint} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Issue Title</label>
              <Input
                required
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Water leaking from kitchen faucet"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  className="w-full h-10 border rounded-lg px-3 bg-background text-sm capitalize"
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value as any })}
                >
                  {['plumbing', 'electricity', 'security', 'cleaning', 'lift', 'water', 'other'].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <select
                  className="w-full h-10 border rounded-lg px-3 bg-background text-sm capitalize"
                  value={form.priority}
                  onChange={e => setForm({ ...form, priority: e.target.value as any })}
                >
                  {['low', 'medium', 'high', 'critical'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                required
                rows={3}
                className="w-full border rounded-lg p-3 bg-background text-sm"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the issue in detail..."
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsSubmitOpen(false)}>Cancel</Button>
              <Button type="submit" variant="glow">Submit Complaint</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
