import React from 'react'
import { Settings, Building2, User, Shield, Bell, Moon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuthStore, useThemeStore } from '@/stores'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const { user } = useAuthStore()
  const { isDark, toggle } = useThemeStore()

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account & Society Settings</h1>
        <p className="text-sm text-muted-foreground">Manage profile, preferences, and society branding</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Name</label>
              <Input defaultValue={user?.name} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <Input defaultValue={user?.email} disabled />
            </div>
          </div>
          <Button variant="glow" size="sm" onClick={() => toast.success('Profile updated!')}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Appearance & Theme</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-sm">Dark Mode</p>
            <p className="text-xs text-muted-foreground">Toggle application color scheme</p>
          </div>
          <Button variant="outline" size="sm" onClick={toggle}>
            {isDark ? 'Switch to Light' : 'Switch to Dark'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
