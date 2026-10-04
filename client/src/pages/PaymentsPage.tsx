import React, { useState } from 'react'
import { DollarSign, ShieldCheck, CheckCircle2, Download, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'
import toast from 'react-hot-toast'

export default function PaymentsPage() {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayNow = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      toast.success('Payment Successful! Receipt generated & sent to email.')
    }, 1500)
  }

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Online Payment Gateway</h1>
        <p className="text-sm text-muted-foreground">Secure Razorpay / Stripe powered society maintenance payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bill Summary */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Current Due Bill</CardTitle>
            <CardDescription>Flat A-101 · October 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm border-b pb-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Maintenance Fee</span>
                <span>₹2,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Late Fee Dues</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t pt-2">
                <span>Total Payable</span>
                <span className="text-emerald-500">₹2,500</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>256-bit SSL Encrypted Payment</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Select Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'upi', label: 'UPI (GPay/PhonePe)', icon: '📱' },
                { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id as any)}
                  className={`p-3 rounded-xl border text-center text-xs font-semibold space-y-1 transition-all ${
                    selectedMethod === m.id ? 'border-primary bg-primary/10 text-primary' : 'bg-card hover:bg-muted'
                  }`}
                >
                  <div className="text-xl">{m.icon}</div>
                  <div>{m.label}</div>
                </button>
              ))}
            </div>

            <Button variant="glow" size="lg" className="w-full" onClick={handlePayNow} disabled={isProcessing}>
              {isProcessing ? 'Processing Secure Payment...' : 'Pay ₹2,500 Now'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
