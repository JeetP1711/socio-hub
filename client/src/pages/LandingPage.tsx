import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Building2, Shield, Users, CreditCard, Bell, MessageSquare,
  BarChart3, Car, CalendarCheck, FileText, Zap, Bot,
  ChevronRight, Star, ArrowRight, Check, Menu, X,
  Sun, Moon, Sparkles, Lock, Eye, TrendingUp,
  Home, Phone, Mail, MapPin, Github, Twitter, Linkedin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/stores'
import { cn } from '@/lib/utils'

// ============================================================
// Landing Page
// ============================================================

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isDark, toggle } = useThemeStore()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-xl border-b shadow-sm' : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1e3a5f] to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Socio<span className="text-emerald-500">Hub</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {['Features', 'Pricing', 'Security', 'About'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {item}
                </a>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <button onClick={toggle}
                className="p-2 rounded-lg hover:bg-muted transition-colors">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link to="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/login">
                <Button variant="glow" size="sm">
                  Start Free <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background/95 backdrop-blur-xl border-b"
            >
              <div className="px-4 py-4 space-y-3">
                {['Features', 'Pricing', 'Security', 'About'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                    {item}
                  </a>
                ))}
                <div className="flex gap-2 pt-2">
                  <Link to="/login" className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/login" className="flex-1">
                    <Button variant="glow" className="w-full" size="sm">Start Free</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-t from-emerald-500/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              Now with AI-Powered Society Assistant
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Your Society.{' '}
              <span className="gradient-text">One Intelligent</span>{' '}
              Platform.
            </motion.h1>

            <motion.p variants={fadeUp} custom={2}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Manage residents, maintenance, visitors, complaints, finances and
              community operations from one powerful platform.
            </motion.p>

            <motion.div variants={fadeUp} custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button variant="glow" size="xl" className="min-w-[200px]">
                  Start Free <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="min-w-[200px]">
                Book a Demo
              </Button>
            </motion.div>

            <motion.p variants={fadeUp} custom={4}
              className="mt-6 text-sm text-muted-foreground">
              No credit card required · 14-day free trial · Cancel anytime
            </motion.p>
          </motion.div>

          {/* Hero Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-16 lg:mt-24 max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl border bg-card shadow-2xl shadow-black/10 dark:shadow-black/40 overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-background rounded-md px-4 py-1 text-xs text-muted-foreground border">
                    app.sociohub.in/dashboard
                  </div>
                </div>
              </div>

              {/* Mini Dashboard */}
              <div className="p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Good morning,</p>
                    <h3 className="text-xl font-bold">Rajesh Sharma</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">Green Valley Residency</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
                  {[
                    { label: 'Total Residents', value: '234', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Maintenance Collected', value: '₹18.5L', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { label: 'Open Complaints', value: '12', icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                    { label: 'Visitors Today', value: '43', icon: Eye, color: 'text-violet-500', bg: 'bg-violet-500/10' },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border bg-background/50 p-3 lg:p-4">
                      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mb-2', stat.bg)}>
                        <stat.icon className={cn('w-4 h-4', stat.color)} />
                      </div>
                      <p className="text-lg lg:text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="rounded-xl border bg-background/50 p-4 h-36">
                    <p className="text-sm font-medium mb-3">Maintenance Collection</p>
                    <div className="flex items-end gap-1 h-20">
                      {[65, 72, 68, 75, 78, 70, 73, 76, 71, 74].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
                          className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500 to-emerald-400/50"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border bg-background/50 p-4 h-36">
                    <p className="text-sm font-medium mb-3">Complaint Resolution</p>
                    <div className="space-y-2">
                      {[
                        { label: 'Resolved', pct: 78, color: 'bg-emerald-500' },
                        { label: 'In Progress', pct: 15, color: 'bg-amber-500' },
                        { label: 'Open', pct: 7, color: 'bg-red-400' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-20">{item.label}</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.pct}%` }}
                              transition={{ duration: 0.8, delay: 1 }}
                              className={cn('h-full rounded-full', item.color)}
                            />
                          </div>
                          <span className="text-xs font-medium w-8 text-right">{item.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow effect below dashboard */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-gradient-to-t from-emerald-500/10 to-transparent blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-16 border-y bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground mb-8"
          >
            TRUSTED BY MODERN COMMUNITIES ACROSS INDIA
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-8 lg:gap-16"
          >
            {['Green Valley', 'Sunrise Heights', 'Palm Meadows', 'Royal Gardens', 'Lake View', 'City Centre'].map((name) => (
              <div key={name} className="flex items-center gap-2 text-muted-foreground/50">
                <Building2 className="w-5 h-5" />
                <span className="font-semibold text-sm">{name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.p variants={fadeUp} custom={0}
              className="text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-4">
              The Problem
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1}
              className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
              Traditional society management is <span className="text-destructive">broken</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2}
              className="text-lg text-muted-foreground">
              Most Indian housing societies still rely on WhatsApp groups, paper registers,
              and Excel sheets. It's chaotic, inefficient, and error-prone.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: MessageSquare, title: 'WhatsApp Chaos', desc: 'Important notices lost in endless group chats. No tracking, no accountability.' },
              { icon: FileText, title: 'Paper Registers', desc: 'Visitor logs, maintenance records, and complaints managed on paper. Easy to lose, hard to search.' },
              { icon: CreditCard, title: 'Payment Confusion', desc: 'Manual payment tracking leads to disputes. No transparency on who paid and who didn\'t.' },
              { icon: Shield, title: 'Security Gaps', desc: 'No digital visitor management. Guards rely on memory. Safety compromised.' },
              { icon: BarChart3, title: 'Zero Analytics', desc: 'No visibility into society finances, complaints trends, or operational efficiency.' },
              { icon: Users, title: 'Poor Communication', desc: 'Residents feel disconnected. Committee decisions lack transparency. Trust erodes.' },
            ].map((problem, i) => (
              <motion.div key={problem.title} variants={fadeUp} custom={i}
                className="group p-6 rounded-2xl border bg-card hover:shadow-lg hover:border-destructive/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                  <problem.icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{problem.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={stagger}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.p variants={fadeUp} custom={0}
              className="text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-4">
              Features
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1}
              className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
              Everything your society needs
            </motion.h2>
            <motion.p variants={fadeUp} custom={2}
              className="text-lg text-muted-foreground">
              One platform to manage residents, finances, visitors, complaints,
              and every aspect of society operations.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Users, title: 'Resident Management', desc: 'Complete resident directory with family details, vehicles, documents, and move-in tracking.', color: 'from-blue-500 to-blue-600' },
              { icon: CreditCard, title: 'Maintenance & Payments', desc: 'Automated billing, payment tracking, late fees, invoices, and payment gateway integration.', color: 'from-emerald-500 to-emerald-600' },
              { icon: Eye, title: 'Visitor Management', desc: 'Digital passes, QR codes, real-time tracking, delivery management, and cab notifications.', color: 'from-violet-500 to-violet-600' },
              { icon: MessageSquare, title: 'Complaint System', desc: 'Submit, track and resolve complaints with automated workflow, staff assignment, and ratings.', color: 'from-amber-500 to-amber-600' },
              { icon: Bell, title: 'Notices & Alerts', desc: 'Publish notices, send push notifications, and create urgency-based alert system.', color: 'from-rose-500 to-rose-600' },
              { icon: BarChart3, title: 'Financial Reports', desc: 'Income/expense tracking, monthly reports, vendor payments, and exportable statements.', color: 'from-cyan-500 to-cyan-600' },
              { icon: Car, title: 'Parking Management', desc: 'Slot assignment, vehicle registry, visual parking map, and violation tracking.', color: 'from-orange-500 to-orange-600' },
              { icon: CalendarCheck, title: 'Amenity Booking', desc: 'Reserve clubhouse, gym, pool, courts with time-slot management and billing.', color: 'from-pink-500 to-pink-600' },
              { icon: Bot, title: 'AI Assistant', desc: 'Ask SocioAI questions about your society data — maintenance, complaints, visitors and more.', color: 'from-indigo-500 to-indigo-600' },
              { icon: Shield, title: 'Security Guard App', desc: 'Simplified touch-friendly interface for guards with visitor entry, exit, and emergency buttons.', color: 'from-teal-500 to-teal-600' },
              { icon: FileText, title: 'Document Vault', desc: 'Secure storage for society documents with categories, permissions, and search.', color: 'from-slate-500 to-slate-600' },
              { icon: Zap, title: 'Emergency System', desc: 'One-tap emergency alerts for fire, medical, security with instant notifications to guards and admin.', color: 'from-red-500 to-red-600' },
            ].map((feat, i) => (
              <motion.div key={feat.title} variants={fadeUp} custom={i}
                className="group relative p-6 rounded-2xl border bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-muted/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg', feat.color)}>
                  <feat.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.p variants={fadeUp} custom={0}
              className="text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-4">
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1}
              className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
              Get started in minutes
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { step: '01', title: 'Register Your Society', desc: 'Sign up and configure your society details — towers, flats, and basic information.' },
              { step: '02', title: 'Invite Residents', desc: 'Add residents to the platform. They can self-register and link to their flats.' },
              { step: '03', title: 'Start Managing', desc: 'Generate maintenance bills, manage visitors, resolve complaints — everything from one dashboard.' },
            ].map((item, i) => (
              <motion.div key={item.step} variants={fadeUp} custom={i}
                className="relative text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
                {i < 2 && (
                  <ChevronRight className="hidden md:block absolute top-20 -right-4 w-8 h-8 text-muted-foreground/30" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} custom={0}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
                <Bot className="w-4 h-4" />
                AI-Powered
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1}
                className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
                Meet <span className="gradient-text">SocioAI</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2}
                className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Your intelligent society assistant. Ask questions in plain language —
                get instant answers from your society data.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="space-y-4">
                {[
                  '"How much maintenance is pending?"',
                  '"Show me unresolved complaints"',
                  '"How many visitors entered today?"',
                  '"Draft a notice about water supply"',
                ].map((prompt) => (
                  <div key={prompt}
                    className="flex items-center gap-3 p-3 rounded-xl bg-card border hover:border-indigo-500/30 transition-colors">
                    <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="text-sm">{prompt}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl border bg-card shadow-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold">SocioAI</span>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2 text-sm max-w-[80%]">
                      How much maintenance is pending this month?
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-[85%] space-y-2">
                      <p>Here's the maintenance summary for October 2024:</p>
                      <div className="bg-background rounded-lg p-3 space-y-1 text-xs">
                        <div className="flex justify-between"><span>Total Bills:</span><span className="font-semibold">120</span></div>
                        <div className="flex justify-between"><span>Collected:</span><span className="font-semibold text-emerald-500">₹18,56,000</span></div>
                        <div className="flex justify-between"><span>Pending:</span><span className="font-semibold text-amber-500">₹4,25,000</span></div>
                        <div className="flex justify-between"><span>Overdue:</span><span className="font-semibold text-red-500">₹1,85,000</span></div>
                      </div>
                      <p className="text-muted-foreground">18 flats have overdue payments. Would you like me to generate a reminder?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.p variants={fadeUp} custom={0}
              className="text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-4">
              Security
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1}
              className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
              Enterprise-grade security
            </motion.h2>
            <motion.p variants={fadeUp} custom={2}
              className="text-lg text-muted-foreground">
              Your society data is protected with bank-level encryption and strict access controls.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Lock, title: 'Data Encryption', desc: 'AES-256 encryption for all data at rest and in transit.' },
              { icon: Shield, title: 'Tenant Isolation', desc: 'Complete data isolation between societies. Zero cross-contamination.' },
              { icon: Users, title: 'Role-Based Access', desc: '8 distinct roles with granular permissions for every action.' },
              { icon: Eye, title: 'Audit Logs', desc: 'Complete audit trail for all administrative actions and changes.' },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} custom={i}
                className="text-center p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.p variants={fadeUp} custom={0}
              className="text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-4">
              Pricing
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1}
              className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
              Simple, transparent pricing
            </motion.h2>
            <motion.p variants={fadeUp} custom={2}
              className="text-lg text-muted-foreground">
              Choose the plan that fits your society. Upgrade or downgrade anytime.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                name: 'Starter', price: '1,999', period: '/month',
                desc: 'Perfect for small societies up to 50 flats',
                features: ['Up to 50 flats', 'Resident management', 'Notice board', 'Complaint system', 'Visitor management', 'Email support'],
                cta: 'Start Free Trial', popular: false,
              },
              {
                name: 'Growth', price: '4,999', period: '/month',
                desc: 'Ideal for growing societies up to 150 flats',
                features: ['Up to 150 flats', 'Everything in Starter', 'Maintenance & payments', 'Expense tracking', 'Parking management', 'Amenity booking', 'Financial reports', 'Priority support'],
                cta: 'Start Free Trial', popular: true,
              },
              {
                name: 'Premium', price: '9,999', period: '/month',
                desc: 'For large societies and townships',
                features: ['Unlimited flats', 'Everything in Growth', 'AI assistant (SocioAI)', 'Advanced analytics', 'Automation rules', 'Multiple buildings', 'API access', 'Dedicated support'],
                cta: 'Contact Sales', popular: false,
              },
            ].map((plan, i) => (
              <motion.div key={plan.name} variants={fadeUp} custom={i}
                className={cn(
                  'relative rounded-2xl border p-8 bg-card transition-all duration-300',
                  plan.popular
                    ? 'border-emerald-500/50 shadow-xl shadow-emerald-500/10 scale-105'
                    : 'hover:shadow-lg hover:-translate-y-1'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-emerald-500 text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">₹{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <Button
                  variant={plan.popular ? 'glow' : 'outline'}
                  className="w-full mb-6"
                >
                  {plan.cta}
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.p variants={fadeUp} custom={0}
              className="text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-4">
              Testimonials
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1}
              className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
              Loved by society committees
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                name: 'Ramesh Patel', role: 'Secretary, Palm Meadows', city: 'Pune',
                text: 'SocioHub transformed how we manage our 200-flat society. Maintenance collection went from 60% to 95% in just 3 months. The AI assistant saves us hours every week.',
              },
              {
                name: 'Anita Krishnan', role: 'Treasurer, Lake View Apartments', city: 'Chennai',
                text: 'The financial reporting is incredible. We finally have complete transparency. Every expense is tracked, every payment is accounted for. Our committee meetings are now data-driven.',
              },
              {
                name: 'Vikrant Sharma', role: 'President, Royal Gardens', city: 'Delhi',
                text: 'The visitor management system alone is worth it. Digital passes, QR codes, real-time tracking — our security has improved dramatically. Residents love the convenience.',
              },
            ].map((t, i) => (
              <motion.div key={t.name} variants={fadeUp} custom={i}
                className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6 text-muted-foreground">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-emerald-500/20 flex items-center justify-center text-sm font-semibold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role} · {t.city}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} custom={0}
              className="text-sm font-semibold text-emerald-500 tracking-wider uppercase mb-4">
              FAQ
            </motion.p>
            <motion.h2 variants={fadeUp} custom={1}
              className="text-3xl lg:text-4xl font-bold tracking-tight">
              Frequently asked questions
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-4"
          >
            {[
              { q: 'How long does setup take?', a: 'Most societies are up and running within a day. Our team helps with initial data migration and configuration.' },
              { q: 'Can residents pay maintenance online?', a: 'Yes! We support Razorpay and Stripe integration. Residents can pay via UPI, cards, or net banking.' },
              { q: 'Is our data secure?', a: 'Absolutely. We use AES-256 encryption, complete tenant isolation, and regular security audits. Your data never crosses society boundaries.' },
              { q: 'Does it work on mobile?', a: 'Yes, SocioHub is fully responsive and works beautifully on phones, tablets, and desktops.' },
              { q: 'Can we import our existing data?', a: 'Yes, we provide CSV import tools and our team can help migrate data from Excel, paper records, or other systems.' },
              { q: 'What if we need help?', a: 'We offer email support on Starter, priority support on Growth, and dedicated support on Premium plans. Our avg response time is under 2 hours.' },
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} custom={0}
              className="text-3xl lg:text-5xl font-bold tracking-tight mb-6">
              Ready to modernize your society?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1}
              className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join hundreds of Indian societies that trust SocioHub to manage their day-to-day operations efficiently.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login">
                <Button variant="glow" size="xl" className="min-w-[200px]">
                  Start Free <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="min-w-[200px]">
                Schedule Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1e3a5f] to-emerald-500 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold">Socio<span className="text-emerald-500">Hub</span></span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Intelligent apartment & society management for modern Indian communities.
              </p>
              <div className="flex gap-3">
                {[Twitter, Linkedin, Github].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Roadmap', 'Changelog'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact', 'Partners'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Data Processing', 'Cookie Policy'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold mb-4 text-sm">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 SocioHub. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" /> Made in India 🇮🇳
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// FAQ Item Component
function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <motion.div variants={fadeUp} custom={index}
      className="rounded-xl border bg-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium text-sm">{question}</span>
        <ChevronRight className={cn('w-4 h-4 text-muted-foreground transition-transform duration-200', isOpen && 'rotate-90')} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
