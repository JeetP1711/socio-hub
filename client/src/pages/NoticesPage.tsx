import React, { useState } from 'react'
import { Bell, Plus, Pin, AlertTriangle, FileText, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { demoNotices } from '@/data/demo'
import type { Notice } from '@/types'
import toast from 'react-hot-toast'

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(demoNotices)
  const [isAddOpen, setIsAddOpen] = useState(false)

  const [form, setForm] = useState({
    title: '', content: '', category: 'general' as Notice['category'], priority: 'normal' as Notice['priority'], isPinned: false
  })

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault()
    const newNotice: Notice = {
      id: `n-${Date.now()}`,
      societyId: 's1',
      title: form.title,
      content: form.content,
      category: form.category,
      priority: form.priority,
      isPinned: form.isPinned,
      createdByName: 'Society Secretary',
      createdAt: new Date().toISOString().split('T')[0],
      readByCount: 1,
    }
    setNotices([newNotice, ...notices])
    setIsAddOpen(false)
    toast.success('Notice published to all residents!')
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Society Notice Board</h1>
          <p className="text-sm text-muted-foreground">Official announcements, maintenance schedules, and meeting updates</p>
        </div>
        <Button variant="glow" onClick={() => setIsAddOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Create Notice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notices.map(n => (
          <Card key={n.id} className={`hover:shadow-md transition-shadow relative ${n.isPinned ? 'border-primary/50 bg-primary/5' : ''}`}>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {n.isPinned && <Pin className="w-4 h-4 text-primary fill-primary" />}
                  <h3 className="font-bold text-base">{n.title}</h3>
                </div>
                <Badge variant={n.priority === 'urgent' ? 'destructive' : n.priority === 'high' ? 'warning' : 'outline'} className="capitalize text-[10px]">
                  {n.priority}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">{n.content}</p>

              <div className="flex justify-between items-center text-[11px] text-muted-foreground border-t pt-3">
                <span>By {n.createdByName} · {n.createdAt}</span>
                <span className="flex items-center gap-1"><Bell className="w-3 h-3" /> {n.readByCount} residents notified</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish New Notice</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddNotice} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                required
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Annual General Body Meeting (AGM) 2024"
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
                  {['general', 'maintenance', 'event', 'urgent', 'billing', 'rules'].map(c => (
                    <option key={c} value={c}>{c}</option>
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
                  {['normal', 'high', 'urgent'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <textarea
                required
                rows={4}
                className="w-full border rounded-lg p-3 bg-background text-sm"
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                placeholder="Write full notice details here..."
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="pinned"
                checked={form.isPinned}
                onChange={e => setForm({ ...form, isPinned: e.target.checked })}
              />
              <label htmlFor="pinned" className="text-xs font-medium">Pin to top of resident app</label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button type="submit" variant="glow">Publish Notice</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
