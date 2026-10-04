import React, { useState } from 'react'
import { Home, Layers, CheckCircle2, AlertCircle, Clock, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { demoFlats, demoTowers } from '@/data/demo'
import type { Flat } from '@/types'

export default function FlatsPage() {
  const [selectedTowerId, setSelectedTowerId] = useState<string>(demoTowers[0].id)
  const [query, setQuery] = useState('')

  const towerFlats = demoFlats.filter(f => f.towerId === selectedTowerId && f.flatNumber.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Flats & Towers Directory</h1>
          <p className="text-sm text-muted-foreground">Interactive visual mapping of society floors and flats</p>
        </div>
      </div>

      {/* Tower selector */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {demoTowers.map(tower => (
          <button
            key={tower.id}
            onClick={() => setSelectedTowerId(tower.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all shrink-0 ${
              selectedTowerId === tower.id
                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                : 'bg-card text-muted-foreground hover:bg-muted'
            }`}
          >
            <Layers className="w-4 h-4" />
            {tower.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder="Search flat number (e.g. A-101)..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* Visual Flat Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {towerFlats.map((flat) => (
          <Card key={flat.id} className={`hover:shadow-md transition-all ${!flat.isOccupied ? 'opacity-70 bg-muted/30' : ''}`}>
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{flat.flatNumber}</span>
                <Badge variant={flat.isOccupied ? 'default' : 'outline'} className="text-[10px]">
                  {flat.isOccupied ? 'Occupied' : 'Vacant'}
                </Badge>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>Floor {flat.floor} · {flat.type} ({flat.area} sqft)</p>
                {flat.isOccupied && (
                  <p className="font-medium text-foreground truncate">
                    Owner: {flat.ownerName || 'Resident'}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between border-t pt-2 text-[11px]">
                <span className="text-muted-foreground">Maintenance:</span>
                <Badge variant={flat.maintenanceStatus === 'paid' ? 'success' : flat.maintenanceStatus === 'overdue' ? 'destructive' : 'warning'} className="text-[10px] capitalize">
                  {flat.maintenanceStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
