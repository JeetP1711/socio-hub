import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import DashboardLayout from '@/layouts/DashboardLayout'
import AdminDashboard from '@/pages/AdminDashboard'
import ResidentsPage from '@/pages/ResidentsPage'
import FlatsPage from '@/pages/FlatsPage'
import MaintenancePage from '@/pages/MaintenancePage'
import PaymentsPage from '@/pages/PaymentsPage'
import ComplaintsPage from '@/pages/ComplaintsPage'
import VisitorsPage from '@/pages/VisitorsPage'
import SecurityPage from '@/pages/SecurityPage'
import NoticesPage from '@/pages/NoticesPage'
import CommunityPage from '@/pages/CommunityPage'
import PollsPage from '@/pages/PollsPage'
import AmenitiesPage from '@/pages/AmenitiesPage'
import ParkingPage from '@/pages/ParkingPage'
import ExpensesPage from '@/pages/ExpensesPage'
import VendorsPage from '@/pages/VendorsPage'
import StaffPage from '@/pages/StaffPage'
import DocumentsPage from '@/pages/DocumentsPage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import EmergencyPage from '@/pages/EmergencyPage'
import NotificationsPage from '@/pages/NotificationsPage'
import SettingsPage from '@/pages/SettingsPage'
import SuperAdminPage from '@/pages/SuperAdminPage'
import AIPage from '@/pages/AIPage'
import CommandPalette from '@/components/CommandPalette'
import SocioAIChat from '@/components/SocioAIChat'
import { useAuthStore } from '@/stores'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <CommandPalette />
      <SocioAIChat />

      <Routes>
        {/* Public Landing & Auth */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Modules */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="residents" element={<ResidentsPage />} />
          <Route path="flats" element={<FlatsPage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="complaints" element={<ComplaintsPage />} />
          <Route path="visitors" element={<VisitorsPage />} />
          <Route path="notices" element={<NoticesPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="polls" element={<PollsPage />} />
          <Route path="amenities" element={<AmenitiesPage />} />
          <Route path="parking" element={<ParkingPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="vendors" element={<VendorsPage />} />
          <Route path="staff" element={<StaffPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="emergency" element={<EmergencyPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="super-admin" element={<SuperAdminPage />} />
          <Route path="ai" element={<AIPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
