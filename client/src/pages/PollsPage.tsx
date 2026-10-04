import React, { useState } from 'react'
import { Vote, CheckCircle2, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'

interface Poll {
  id: string
  question: string
  options: { text: string; votes: number }[]
  totalVotes: number
  userVotedIndex?: number
  endDate: string
}

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: '1',
      question: 'Should we install EV charging stations in Basement 1?',
      options: [
        { text: 'Yes, urgently needed (75%)', votes: 42 },
        { text: 'No, not required yet (25%)', votes: 14 }
      ],
      totalVotes: 56,
      endDate: 'Oct 10, 2024'
    },
    {
      id: '2',
      question: 'Choice of Swimming Pool Maintenance Vendor',
      options: [
        { text: 'AquaClean Services (₹25k/mo)', votes: 28 },
        { text: 'BlueWave Experts (₹22k/mo)', votes: 19 }
      ],
      totalVotes: 47,
      endDate: 'Oct 15, 2024'
    }
  ])

  const handleVote = (pollId: string, optionIndex: number) => {
    setPolls(polls.map(p => {
      if (p.id !== pollId || p.userVotedIndex !== undefined) return p
      const updatedOpts = [...p.options]
      updatedOpts[optionIndex].votes += 1
      return {
        ...p,
        options: updatedOpts,
        totalVotes: p.totalVotes + 1,
        userVotedIndex: optionIndex
      }
    }))
    toast.success('Your vote has been recorded securely!')
  }

  return (
    <div className="space-y-6 pb-12 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Society Polls & Decision Voting</h1>
        <p className="text-sm text-muted-foreground">Democratized voting for committee decisions and major capital spends</p>
      </div>

      <div className="space-y-4">
        {polls.map(p => (
          <Card key={p.id}>
            <CardHeader className="flex flex-row justify-between items-start pb-2">
              <CardTitle className="text-base font-bold">{p.question}</CardTitle>
              <Badge variant="outline" className="text-[10px]">Ends {p.endDate}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {p.options.map((opt, idx) => {
                const percentage = p.totalVotes > 0 ? Math.round((opt.votes / p.totalVotes) * 100) : 0
                const isSelected = p.userVotedIndex === idx
                return (
                  <button
                    key={idx}
                    disabled={p.userVotedIndex !== undefined}
                    onClick={() => handleVote(p.id, idx)}
                    className={`w-full p-3 rounded-xl border text-left text-sm relative overflow-hidden transition-all ${
                      isSelected ? 'border-primary bg-primary/10 font-bold' : 'hover:bg-muted'
                    }`}
                  >
                    {/* Progress Fill */}
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-primary/10 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="relative flex justify-between items-center">
                      <span>{opt.text}</span>
                      <span className="text-xs font-mono font-bold">{percentage}% ({opt.votes})</span>
                    </div>
                  </button>
                )
              })}
              <p className="text-xs text-muted-foreground text-right">{p.totalVotes} residents voted</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
