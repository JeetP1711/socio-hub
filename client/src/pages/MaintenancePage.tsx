import React, { useState } from 'react'
import { CreditCard, Download, Send, CheckCircle2, Clock, AlertTriangle, Plus, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { demoMaintenanceBills } from '@/data/demo'
import { formatCurrency } from '@/lib/utils'
import type { MaintenanceBill } from '@/types'
import toast from 'react-hot-toast'

export default function MaintenancePage() {
  const [bills, setBills] = useState<MaintenanceBill[]>(demoMaintenanceBills)
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all')

  const filteredBills = bills.filter(b => statusFilter === 'all' || b.status === statusFilter)

  const handleRecordOfflinePayment = (billId: string) => {
    setBills(bills.map(b => b.id === billId ? { ...b, status: 'paid', paidAmount: b.totalAmount, paidDate: new Date().toISOString().split('T')[0], paymentMethod: 'cash' } : b))
    toast.success('Recorded offline cash payment!')
  }

  const handleSendReminder = (flatNumber: string) => {
    toast.success(`WhatsApp & Email reminder sent to flat ${flatNumber}`)
  }

  const totalCollected = bills.filter(b => b.status === 'paid').reduce((a, b) => a + b.totalAmount, 0)
  const totalPending = bills.filter(b => b.status !== 'paid').reduce((a, b) => a + b.totalAmount, 0)

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Maintenance & Billing</h1>
          <p className="text-sm text-muted-foreground">Manage monthly dues, late fees, automated reminders, and invoices</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success('Generated bills for all flats for next month')}>
            Generate Next Month Bills
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-emerald-500/10 border-emerald-500/20">
          <CardContent className="p-4">
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">TOTAL COLLECTED</p>
            <p className="text-2xl font-bold mt-1 text-emerald-700 dark:text-emerald-300">{formatCurrency(totalCollected)}</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardContent className="p-4">
            <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">PENDING DUES</p>
            <p className="text-2xl font-bold mt-1 text-amber-700 dark:text-amber-300">{formatCurrency(totalPending)}</p>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-destructive/20">
          <CardContent className="p-4">
            <p className="text-xs text-destructive font-medium">OVERDUE FLATS</p>
            <p className="text-2xl font-bold mt-1 text-destructive">{bills.filter(b => b.status === 'overdue').length} Flats</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'paid', 'pending', 'overdue'] as const).map(st => (
          <Button
            key={st}
            variant={statusFilter === st ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(st)}
            className="capitalize"
          >
            {st} ({st === 'all' ? bills.length : bills.filter(b => b.status === st).length})
          </Button>
        ))}
      </div>

      {/* Bills Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-xs text-muted-foreground uppercase border-b">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Flat / Resident</th>
                <th className="p-4">Month</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Late Fee</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredBills.slice(0, 15).map((bill) => (
                <tr key={bill.id} className="hover:bg-muted/30">
                  <td className="p-4 font-mono font-medium text-xs">{bill.invoiceNumber}</td>
                  <td className="p-4">
                    <p className="font-semibold">{bill.flatNumber} ({bill.towerName})</p>
                    <p className="text-xs text-muted-foreground">{bill.residentName}</p>
                  </td>
                  <td className="p-4">{bill.month} {bill.year}</td>
                  <td className="p-4">{formatCurrency(bill.amount)}</td>
                  <td className="p-4 text-amber-500">{bill.lateFee ? formatCurrency(bill.lateFee) : '-'}</td>
                  <td className="p-4 font-bold">{formatCurrency(bill.totalAmount)}</td>
                  <td className="p-4">
                    <Badge variant={bill.status === 'paid' ? 'success' : bill.status === 'overdue' ? 'destructive' : 'warning'} className="capitalize text-[10px]">
                      {bill.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {bill.status !== 'paid' && (
                      <>
                        <Button size="sm" variant="outline" onClick={() => handleSendReminder(bill.flatNumber)} title="Send Reminder">
                          <Send className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="sm" variant="secondary" onClick={() => handleRecordOfflinePayment(bill.id)}>
                          Record Cash
                        </Button>
                      </>
                    )}
                    {bill.status === 'paid' && (
                      <Button size="sm" variant="ghost" onClick={() => toast.success('Invoice downloaded')}>
                        <Download className="w-3.5 h-3.5" /> Receipt
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
