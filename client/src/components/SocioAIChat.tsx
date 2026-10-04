import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, X, Sparkles, User, RefreshCw, ChevronDown, Check, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAIChatStore } from '@/stores'
import { demoDashboardStats, demoMaintenanceBills, demoComplaints, demoVisitors, demoExpenses } from '@/data/demo'
import { formatCurrency } from '@/lib/utils'

export default function SocioAIChat() {
  const { isOpen, close, toggle, messages, addMessage, updateLastAssistant } = useAIChatStore()
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async (userPrompt?: string) => {
    const text = userPrompt || input
    if (!text.trim()) return

    addMessage({ role: 'user', content: text })
    if (!userPrompt) setInput('')
    setIsTyping(true)

    // Add empty assistant response to stream into
    addMessage({ role: 'assistant', content: '' })

    // Simulate AI logic based on prompt keywords
    const lower = text.toLowerCase()
    let responseText = ''

    if (lower.includes('pending') || lower.includes('due') || lower.includes('maintenance')) {
      const overdueCount = demoMaintenanceBills.filter(b => b.status === 'overdue').length
      const pendingTotal = demoMaintenanceBills.filter(b => b.status !== 'paid').reduce((a, b) => a + b.totalAmount, 0)
      responseText = `Based on Green Valley Residency records:\n\n- **Total Unpaid Maintenance**: ${formatCurrency(pendingTotal)}\n- **Overdue Bills**: ${overdueCount} flats\n- **Collection Rate**: 81.5% for October 2024.\n\nWould you like me to draft an automatic WhatsApp reminder for residents with overdue payments?`
    } else if (lower.includes('complaint') || lower.includes('unresolved')) {
      const openCount = demoComplaints.filter(c => c.status === 'submitted' || c.status === 'assigned' || c.status === 'in_progress').length
      responseText = `There are currently **${openCount} unresolved complaints** in Green Valley Residency:\n\n1. **A-103**: Water leaking from bathroom pipe (High Priority)\n2. **B-204**: Corridor lights not working (Medium Priority)\n3. **C-101**: Lift noise on 4th floor (Critical Priority)\n\nAll tickets have been assigned to technicians.`
    } else if (lower.includes('visitor') || lower.includes('entered') || lower.includes('gate')) {
      responseText = `Today's Visitor Summary:\n\n- **Total Visitors Logged**: 43\n- **Currently Inside Society**: 12\n- **Deliveries (Amazon/Swiggy/Zomato)**: 24\n- **Cab Entries**: 7\n- **Guest Passes**: 12`
    } else if (lower.includes('electricity') || lower.includes('spend') || lower.includes('expense')) {
      const elecExpense = demoExpenses.filter(e => e.category === 'electricity').reduce((a, b) => a + b.amount, 0)
      responseText = `Last month's electricity expenditure was **${formatCurrency(elecExpense || 48000)}** across common lights, lifts, and pump house.\n\nCompared to previous month, electricity spending went down by 4.2%.`
    } else if (lower.includes('draft') || lower.includes('notice') || lower.includes('water')) {
      responseText = `Here is a draft notice for water supply interruption:\n\n---\n**NOTICE: Scheduled Water Supply Interruption**\n\nDear Residents,\n\nPlease be informed that water supply will be temporarily shut off on **October 5th, 2024 from 10:00 AM to 2:00 PM** for main line maintenance.\n\nKindly store adequate water in advance. Thank you for your cooperation.\n\n*Management Committee, Green Valley Residency*\n---`
    } else {
      responseText = `I have analyzed your society database (Green Valley Residency):\n\n- **Flats Occupied**: 102 / 120 (85% occupancy)\n- **Active Security Guard**: Ramesh Kumar at Gate 1\n- **Monthly Maintenance Collected**: ${formatCurrency(demoDashboardStats.maintenanceCollected)}\n\nIs there a specific query or report you would like me to generate?`
    }

    // Stream text response
    let current = ''
    const words = responseText.split(' ')
    for (let i = 0; i < words.length; i++) {
      current += (i === 0 ? '' : ' ') + words[i]
      updateLastAssistant(current)
      await new Promise(r => setTimeout(r, 40))
    }
    setIsTyping(false)
  }

  const suggestedPrompts = [
    "How much maintenance is pending?",
    "Show me unresolved complaints",
    "How many visitors entered today?",
    "Draft a notice about water supply",
  ]

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={toggle}
          className="fixed bottom-20 lg:bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-primary via-[#1e3a5f] to-emerald-600 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-sm">Ask SocioAI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] bg-card border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b bg-gradient-to-r from-[#1e3a5f] to-emerald-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-none flex items-center gap-1.5">
                    SocioAI Assistant <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </h3>
                  <p className="text-[11px] text-white/80 mt-0.5">Green Valley Residency Context Active</p>
                </div>
              </div>
              <button onClick={close} className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-3">
                    <Sparkles className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h4 className="font-semibold text-base mb-1">How can SocioAI help you?</h4>
                  <p className="text-xs text-muted-foreground mb-6">
                    Ask questions about residents, maintenance, complaints, expenses, or draft notices.
                  </p>
                  <div className="w-full space-y-2 text-left">
                    {suggestedPrompts.map((p) => (
                      <button
                        key={p}
                        onClick={() => handleSend(p)}
                        className="w-full text-xs p-2.5 rounded-xl border bg-muted/30 hover:bg-muted transition-colors flex items-center justify-between group"
                      >
                        <span>{p}</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={cn('flex gap-2.5', m.role === 'user' ? 'justify-end' : 'justify-start')}>
                    {m.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-4 h-4 text-indigo-500" />
                      </div>
                    )}
                    <div className={cn(
                      'p-3 rounded-2xl max-w-[85%] text-xs sm:text-sm whitespace-pre-wrap leading-relaxed',
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-xs'
                        : 'bg-muted rounded-tl-xs'
                    )}>
                      {m.content}
                    </div>
                  </div>
                ))
              )}
              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Bot className="w-4 h-4 animate-bounce text-indigo-500" />
                  <span>SocioAI is calculating response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t bg-background">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask SocioAI about your society..."
                  className="text-xs sm:text-sm h-10"
                />
                <Button type="submit" variant="glow" size="icon" className="h-10 w-10 shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
