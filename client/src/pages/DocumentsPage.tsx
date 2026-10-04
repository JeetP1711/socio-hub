import React, { useState } from 'react'
import { Folder, FileText, Download, Upload, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'

export default function DocumentsPage() {
  const documents = [
    { id: '1', name: 'Society Bye-Laws & Code of Conduct 2024.pdf', category: 'Legal', size: '2.4 MB', date: 'Jan 15, 2024' },
    { id: '2', name: 'Annual Financial Audit Report FY23-24.pdf', category: 'Finance', size: '4.8 MB', date: 'Apr 10, 2024' },
    { id: '3', name: 'Fire Safety Clearance Certificate.pdf', category: 'Safety', size: '1.1 MB', date: 'Jun 05, 2024' },
    { id: '4', name: 'Building Structural Stability Report.pdf', category: 'Engineering', size: '8.5 MB', date: 'Aug 20, 2024' },
  ]

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Society Document Vault</h1>
          <p className="text-sm text-muted-foreground">Encrypted storage for society bye-laws, financial audits, and safety certificates</p>
        </div>
        <Button variant="glow" onClick={() => toast.success('Upload dialog opened')} className="gap-2">
          <Upload className="w-4 h-4" /> Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map(d => (
          <Card key={d.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm line-clamp-1">{d.name}</h3>
                  <p className="text-xs text-muted-foreground">{d.category} · {d.size} · Uploaded {d.date}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => toast.success(`Downloading ${d.name}`)}>
                <Download className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
