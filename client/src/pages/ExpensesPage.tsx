import React, { useState } from 'react'
import { DollarSign, Plus, Download, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { demoExpenses } from '@/data/demo'
import { formatCurrency } from '@/lib/utils'

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(demoExpenses)

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Society Expenditure Audit</h1>
          <p className="text-sm text-muted-foreground">Log electricity, security, gardening, lift AMC, and vendor payouts</p>
        </div>
        <Button variant="glow" className="gap-2">
          <Plus className="w-4 h-4" /> Log Expense
        </Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-xs text-muted-foreground uppercase border-b">
              <tr>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Vendor</th>
                <th className="p-4">Approved By</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {expenses.map(e => (
                <tr key={e.id} className="hover:bg-muted/30">
                  <td className="p-4 font-semibold">{e.title}</td>
                  <td className="p-4 uppercase text-xs font-mono">{e.category}</td>
                  <td className="p-4 font-bold text-emerald-500">{formatCurrency(e.amount)}</td>
                  <td className="p-4">{e.date}</td>
                  <td className="p-4">{e.vendorName || '-'}</td>
                  <td className="p-4 text-xs text-muted-foreground">{e.approvedByName}</td>
                  <td className="p-4">
                    <Badge variant={e.status === 'approved' ? 'success' : 'outline'} className="capitalize text-[10px]">
                      {e.status}
                    </Badge>
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
