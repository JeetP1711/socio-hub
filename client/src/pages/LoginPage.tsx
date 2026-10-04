import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore, useNotificationStore } from '@/stores'
import { authenticateDemo, demoNotifications } from '@/data/demo'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { setNotifications } = useNotificationStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API delay
    await new Promise((r) => setTimeout(r, 800))

    const result = authenticateDemo(email, password)
    if (result) {
      login(result.user, result.token)
      setNotifications(demoNotifications.filter(n => n.userId === result.user.id))
      toast.success(`Welcome back, ${result.user.name}!`)

      // Route based on role
      if (result.user.role === 'super_admin') {
        navigate('/super-admin')
      } else if (result.user.role === 'security_guard') {
        navigate('/security')
      } else {
        navigate('/dashboard')
      }
    } else {
      toast.error('Invalid credentials. Try a demo account below.')
    }
    setIsLoading(false)
  }

  const quickLogin = (email: string) => {
    setEmail(email)
    setPassword('demo123')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#1e3a5f] via-[#1a3050] to-[#0d2137] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }} />
        </div>

        <div className="relative flex flex-col justify-between p-12 text-white w-full">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Socio<span className="text-emerald-400">Hub</span>
            </span>
          </Link>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Manage your society<br />
              <span className="text-emerald-400">intelligently</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              One platform for residents, maintenance, visitors, complaints, and everything your society needs.
            </p>
            <div className="flex items-center gap-6">
              {[
                { value: '47+', label: 'Societies' },
                { value: '3.8K+', label: 'Residents' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-white/30">© 2024 SocioHub. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e3a5f] to-emerald-500 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              Socio<span className="text-emerald-500">Hub</span>
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
            <p className="text-muted-foreground">Sign in to access your society dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <a href="#" className="text-xs text-emerald-500 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="glow" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-3 text-xs text-muted-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Demo Accounts
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {[
                { email: 'admin@sociohub.demo', role: 'Society Admin', color: 'bg-blue-500' },
                { email: 'resident@sociohub.demo', role: 'Resident', color: 'bg-emerald-500' },
                { email: 'security@sociohub.demo', role: 'Security Guard', color: 'bg-amber-500' },
                { email: 'accountant@sociohub.demo', role: 'Accountant', color: 'bg-violet-500' },
                { email: 'super@sociohub.demo', role: 'Super Admin', color: 'bg-rose-500' },
              ].map((account) => (
                <button
                  key={account.email}
                  onClick={() => quickLogin(account.email)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl border hover:bg-muted/50 transition-all duration-200 text-left group"
                >
                  <div className={`w-2 h-2 rounded-full ${account.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{account.email}</p>
                    <p className="text-xs text-muted-foreground">{account.role}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground mt-3">
              Password for all demo accounts: <code className="bg-muted px-1.5 py-0.5 rounded">demo123</code>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
