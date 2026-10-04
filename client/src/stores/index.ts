import { create } from 'zustand'
import type { User, Notification } from '@/types'

// ============================================================
// Auth Store
// ============================================================
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('sociohub_token'),
  isAuthenticated: !!localStorage.getItem('sociohub_token'),
  isLoading: true,
  login: (user, token) => {
    localStorage.setItem('sociohub_token', token)
    localStorage.setItem('sociohub_user', JSON.stringify(user))
    set({ user, token, isAuthenticated: true, isLoading: false })
  },
  logout: () => {
    localStorage.removeItem('sociohub_token')
    localStorage.removeItem('sociohub_user')
    set({ user: null, token: null, isAuthenticated: false, isLoading: false })
  },
  setLoading: (isLoading) => set({ isLoading }),
  updateUser: (partial) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...partial } : null,
    })),
}))

// ============================================================
// Theme Store
// ============================================================
interface ThemeState {
  isDark: boolean
  toggle: () => void
  setDark: (dark: boolean) => void
}

export const useThemeStore = create<ThemeState>((set) => {
  const saved = localStorage.getItem('sociohub_theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = saved ? saved === 'dark' : prefersDark

  if (isDark) {
    document.documentElement.classList.add('dark')
  }

  return {
    isDark,
    toggle: () =>
      set((state) => {
        const newDark = !state.isDark
        localStorage.setItem('sociohub_theme', newDark ? 'dark' : 'light')
        document.documentElement.classList.toggle('dark', newDark)
        return { isDark: newDark }
      }),
    setDark: (dark) => {
      localStorage.setItem('sociohub_theme', dark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', dark)
      set({ isDark: dark })
    },
  }
})

// ============================================================
// Notification Store
// ============================================================
interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  setNotifications: (notifications: Notification[]) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
  addNotification: (notification: Notification) => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    }),
  markAsRead: (id) =>
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.isRead).length,
      }
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + (notification.isRead ? 0 : 1),
    })),
}))

// ============================================================
// Command Palette Store
// ============================================================
interface CommandPaletteState {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export const useCommandPaletteStore = create<CommandPaletteState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

// ============================================================
// AI Chat Store
// ============================================================
interface AIChatState {
  isOpen: boolean
  messages: Array<{ id: string; role: 'user' | 'assistant'; content: string; timestamp: string; isStreaming?: boolean }>
  open: () => void
  close: () => void
  toggle: () => void
  addMessage: (msg: { role: 'user' | 'assistant'; content: string }) => void
  updateLastAssistant: (content: string) => void
  clearMessages: () => void
}

export const useAIChatStore = create<AIChatState>((set) => ({
  isOpen: false,
  messages: [],
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  addMessage: (msg) =>
    set((s) => ({
      messages: [
        ...s.messages,
        {
          id: Date.now().toString(),
          ...msg,
          timestamp: new Date().toISOString(),
        },
      ],
    })),
  updateLastAssistant: (content) =>
    set((s) => {
      const msgs = [...s.messages]
      let lastIdx = -1
      for (let i = msgs.length - 1; i >= 0; i--) {
        if (msgs[i].role === 'assistant') {
          lastIdx = i
          break
        }
      }
      if (lastIdx >= 0) {
        msgs[lastIdx] = { ...msgs[lastIdx], content, isStreaming: false }
      }
      return { messages: msgs }
    }),
  clearMessages: () => set({ messages: [] }),
}))
