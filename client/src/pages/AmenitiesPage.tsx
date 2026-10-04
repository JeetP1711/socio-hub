import React, { useState } from 'react'
import { CalendarCheck, Clock, CheckCircle2, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { demoAmenities } from '@/data/demo'
import type { Amenity } from '@/types'
import toast from 'react-hot-toast'

export default function AmenitiesPage() {
  const [amenities, setAmenities] = useState<Amenity[]>(demoAmenities)
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null)
  const [selectedSlot, setSelectedSlot] = useState('')

  const handleBook = () => {
    if (!selectedAmenity || !selectedSlot) return
    toast.success(`Booked ${selectedAmenity.name} for ${selectedSlot}`)
    setSelectedAmenity(null)
  }

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Amenity & Facility Booking</h1>
        <p className="text-sm text-muted-foreground">Reserve clubhouse hall, tennis court, party lawn, and gymnasium slots</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {amenities.map(a => (
          <Card key={a.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base font-bold">{a.name}</CardTitle>
                <Badge variant={a.isBookingAllowed ? 'success' : 'outline'} className="text-[10px]">
                  {a.isBookingAllowed ? 'Available' : 'Maintenance'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              <p className="text-xs text-muted-foreground">{a.description}</p>

              <div className="text-xs space-y-1">
                <p>Capacity: <span className="font-semibold">{a.capacity} people</span></p>
                <p>Fee: <span className="font-semibold text-emerald-500">{a.bookingFee > 0 ? `₹${a.bookingFee}/slot` : 'Free for Residents'}</span></p>
                <p>Hours: <span className="font-semibold">{a.openingTime} - {a.closingTime}</span></p>
              </div>

              <Button variant="glow" size="sm" className="w-full" onClick={() => setSelectedAmenity(a)}>
                Book Slot
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedAmenity && (
        <Dialog open={!!selectedAmenity} onOpenChange={() => setSelectedAmenity(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book {selectedAmenity.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">{selectedAmenity.rules}</p>
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Time Slot</label>
                <div className="grid grid-cols-2 gap-2">
                  {['06:00 AM - 08:00 AM', '08:00 AM - 10:00 AM', '04:00 PM - 06:00 PM', '06:00 PM - 08:00 PM'].map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-lg border text-xs text-center transition-all ${
                        selectedSlot === slot ? 'border-primary bg-primary/10 font-bold' : 'hover:bg-muted'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedAmenity(null)}>Cancel</Button>
              <Button variant="glow" onClick={handleBook} disabled={!selectedSlot}>Confirm Booking</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
