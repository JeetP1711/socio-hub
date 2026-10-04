import React, { useState } from 'react'
import { Plus, Search, Filter, Phone, Mail, Car, Shield, User, Edit2, Trash2, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { demoResidents } from '@/data/demo'
import type { Resident } from '@/types'
import toast from 'react-hot-toast'

export default function ResidentsPage() {
  const [residents, setResidents] = useState<Resident[]>(demoResidents)
  const [query, setQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'owner' | 'tenant'>('all')
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null)
  const [isAddOpen, setIsAddOpen] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', flatNumber: 'A-101', towerName: 'Tower A - Jasmine',
    type: 'owner' as 'owner' | 'tenant', emergencyContact: '', emergencyPhone: '',
  })

  const filtered = residents.filter((r) => {
    const matchesQuery = r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.flatNumber.toLowerCase().includes(query.toLowerCase()) ||
      r.email.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filterType === 'all' || r.type === filterType
    return matchesQuery && matchesFilter
  })

  const handleAddResident = (e: React.FormEvent) => {
    e.preventDefault()
    const newRes: Resident = {
      id: `r-${Date.now()}`,
      userId: `u-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      flatId: 'f1',
      flatNumber: formData.flatNumber,
      towerName: formData.towerName,
      type: formData.type,
      emergencyContact: formData.emergencyContact || 'Emergency Contact',
      emergencyPhone: formData.emergencyPhone || '+91 99999 99999',
      moveInDate: new Date().toISOString().split('T')[0],
      isActive: true,
      vehicles: [],
      familyMembers: [],
    }
    setResidents([newRes, ...residents])
    setIsAddOpen(false)
    toast.success(`Added resident ${newRes.name}`)
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Resident Management</h1>
          <p className="text-sm text-muted-foreground">Directory of flat owners, tenants, and family members</p>
        </div>
        <Button variant="glow" onClick={() => setIsAddOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Add Resident
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, flat number, or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('all')}
          >
            All ({residents.length})
          </Button>
          <Button
            variant={filterType === 'owner' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('owner')}
          >
            Owners
          </Button>
          <Button
            variant={filterType === 'tenant' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('tenant')}
          >
            Tenants
          </Button>
        </div>
      </div>

      {/* Residents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r) => (
          <Card key={r.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center font-bold text-sm text-primary">
                    {r.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{r.name}</h3>
                    <p className="text-xs text-muted-foreground">{r.towerName} · Flat <span className="font-bold text-foreground">{r.flatNumber}</span></p>
                  </div>
                </div>
                <Badge variant={r.type === 'owner' ? 'default' : 'secondary'} className="capitalize text-[10px]">
                  {r.type}
                </Badge>
              </div>

              <div className="mt-4 space-y-2 text-xs text-muted-foreground border-t pt-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-primary" /> <span>{r.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-primary" /> <span className="truncate">{r.email}</span>
                </div>
                {r.vehicles.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Car className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{r.vehicles.map(v => `${v.number} (${v.brand})`).join(', ')}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-end gap-2 border-t pt-3">
                <Button variant="outline" size="sm" onClick={() => setSelectedResident(r)}>
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resident Detail Modal */}
      {selectedResident && (
        <Dialog open={!!selectedResident} onOpenChange={() => setSelectedResident(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedResident.name}
                <Badge variant={selectedResident.type === 'owner' ? 'default' : 'secondary'}>
                  {selectedResident.type}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <div className="bg-muted/30 p-3 rounded-xl space-y-1">
                <p className="font-medium text-xs text-muted-foreground">FLAT INFORMATION</p>
                <p className="font-bold text-base">{selectedResident.flatNumber} ({selectedResident.towerName})</p>
                <p className="text-xs text-muted-foreground">Move-in date: {selectedResident.moveInDate}</p>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-xs text-muted-foreground">CONTACT DETAILS</p>
                <p>Phone: <span className="font-semibold">{selectedResident.phone}</span></p>
                <p>Email: <span className="font-semibold">{selectedResident.email}</span></p>
                <p>Emergency Contact: <span className="font-semibold">{selectedResident.emergencyContact} ({selectedResident.emergencyPhone})</span></p>
              </div>

              {selectedResident.vehicles.length > 0 && (
                <div className="space-y-2">
                  <p className="font-medium text-xs text-muted-foreground">REGISTERED VEHICLES</p>
                  {selectedResident.vehicles.map(v => (
                    <div key={v.id} className="p-2 border rounded-lg flex justify-between items-center text-xs">
                      <span>{v.brand} {v.model} ({v.color})</span>
                      <Badge variant="outline">{v.number}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedResident(null)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Resident Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Resident</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddResident} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ramesh Kumar"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98101 00000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ramesh@gmail.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tower</label>
                <Input
                  value={formData.towerName}
                  onChange={e => setFormData({ ...formData, towerName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Flat Number</label>
                <Input
                  value={formData.flatNumber}
                  onChange={e => setFormData({ ...formData, flatNumber: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Resident Type</label>
              <select
                className="w-full h-10 border rounded-lg px-3 bg-background text-sm"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as 'owner' | 'tenant' })}
              >
                <option value="owner">Owner</option>
                <option value="tenant">Tenant</option>
              </select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button type="submit" variant="glow">Save Resident</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
