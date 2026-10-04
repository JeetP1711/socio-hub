import React, { useState } from 'react'
import { Heart, MessageCircle, Share2, Plus, Image as ImageIcon, Send } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'
import toast from 'react-hot-toast'

interface Post {
  id: string
  author: string
  flat: string
  content: string
  likes: number
  comments: number
  time: string
  isLiked?: boolean
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([
    { id: '1', author: 'Anish Kapoor', flat: 'A-302', content: 'Diwali Decoration Committee meeting tomorrow 7 PM at clubhouse. All residents invited!', likes: 14, comments: 3, time: '2 hours ago' },
    { id: '2', author: 'Neha Gupta', flat: 'B-104', content: 'Found a set of car keys near Tower B lift lobby. Please reach out to me if they are yours.', likes: 8, comments: 2, time: '5 hours ago' },
  ])
  const [newPost, setNewPost] = useState('')

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.trim()) return
    const post: Post = {
      id: Date.now().toString(),
      author: 'Rajesh Sharma',
      flat: 'A-101',
      content: newPost,
      likes: 0,
      comments: 0,
      time: 'Just now'
    }
    setPosts([post, ...posts])
    setNewPost('')
    toast.success('Posted to Society Community!')
  }

  const toggleLike = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked } : p))
  }

  return (
    <div className="space-y-6 pb-12 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resident Social Feed</h1>
        <p className="text-sm text-muted-foreground">Private, verified neighborhood updates and discussions</p>
      </div>

      {/* Post Box */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <textarea
            value={newPost}
            onChange={e => setNewPost(e.target.value)}
            placeholder="Share something with your society neighbors..."
            className="w-full bg-transparent text-sm resize-none focus:outline-none"
            rows={3}
          />
          <div className="flex justify-between items-center border-t pt-3">
            <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground">
              <ImageIcon className="w-4 h-4 text-emerald-500" /> Add Photo
            </Button>
            <Button variant="glow" size="sm" onClick={handleCreatePost} disabled={!newPost.trim()}>
              <Send className="w-3.5 h-3.5 mr-1.5" /> Post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Feed List */}
      <div className="space-y-4">
        {posts.map(p => (
          <Card key={p.id}>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="text-xs">{getInitials(p.author)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-sm leading-none">{p.author}</h4>
                  <p className="text-xs text-muted-foreground mt-1">Flat {p.flat} · {p.time}</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed">{p.content}</p>

              <div className="flex items-center gap-6 border-t pt-3 text-xs text-muted-foreground">
                <button onClick={() => toggleLike(p.id)} className={`flex items-center gap-1.5 hover:text-rose-500 transition-colors ${p.isLiked ? 'text-rose-500 font-bold' : ''}`}>
                  <Heart className={`w-4 h-4 ${p.isLiked ? 'fill-rose-500' : ''}`} /> {p.likes}
                </button>
                <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <MessageCircle className="w-4 h-4" /> {p.comments} Comments
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
