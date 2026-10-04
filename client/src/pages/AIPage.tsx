import React, { useState } from 'react'
import { Bot, Sparkles, Send, RefreshCw, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/lib/utils'

export default function AIPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    { role: 'assistant', text: "Hello! I am SocioAI, your society's intelligent operational assistant. How can I help you manage Green Valley Residency today?" }
  ])
  const [input, setInput] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const userText = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userText }])

    setTimeout(() => {
      let reply = `Analyzing Green Valley Residency records for: "${userText}"...\n\nEverything looks in order. Maintenance collection is at 81.5% and all 3 high-priority complaint tickets have active technicians assigned.`
      if (userText.toLowerCase().includes('pending')) {
        reply = `Maintenance Status:\n- Total Pending: ${formatCurrency(425000)}\n- Overdue Flats: 5\n- Recommended Action: Broadcast WhatsApp billing reminders.`
      }
      setMessages(prev => [...prev, { role: 'assistant', text: reply }])
    }, 800)
  }

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 bg-gradient-to-r from-indigo-900 to-[#1e3a5f] text-white p-6 rounded-2xl shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
          <Bot className="w-6 h-6 text-amber-300" />
        </div>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            SocioAI Intelligence Hub <Sparkles className="w-5 h-5 text-amber-300" />
          </h1>
          <p className="text-sm text-white/80">Query financial data, generate notices, audit complaints, and automate resident workflows</p>
        </div>
      </div>

      <Card className="h-[520px] flex flex-col">
        <CardContent className="p-4 flex-1 overflow-y-auto space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-indigo-500" />
                </div>
              )}
              <div className={`p-4 rounded-2xl max-w-[80%] text-sm whitespace-pre-wrap ${
                m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </CardContent>

        <div className="p-4 border-t bg-background">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask SocioAI anything about your society..."
              className="h-11 text-sm"
            />
            <Button type="submit" variant="glow" size="lg" className="shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
