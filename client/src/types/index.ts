// ============================================================
// SocioHub - Core Types
// ============================================================

export type Role =
  | 'super_admin'
  | 'society_admin'
  | 'committee_member'
  | 'accountant'
  | 'security_guard'
  | 'resident'
  | 'staff'
  | 'vendor'

export interface User {
  id: string
  email: string
  name: string
  phone: string
  avatar?: string
  role: Role
  societyId?: string
  flatId?: string
  isActive: boolean
  createdAt: string
}

export interface Society {
  id: string
  name: string
  address: string
  city: string
  state: string
  pincode: string
  logo?: string
  contactEmail: string
  contactPhone: string
  totalTowers: number
  totalFlats: number
  subscriptionPlan: 'starter' | 'growth' | 'premium'
  isActive: boolean
  createdAt: string
}

export interface Tower {
  id: string
  societyId: string
  name: string
  totalFloors: number
  flatsPerFloor: number
}

export interface Flat {
  id: string
  towerId: string
  towerName: string
  floor: number
  flatNumber: string
  area: number
  type: string // '1BHK' | '2BHK' | '3BHK' | '4BHK'
  ownerId?: string
  ownerName?: string
  tenantId?: string
  tenantName?: string
  isOccupied: boolean
  maintenanceStatus: 'paid' | 'pending' | 'overdue'
}

export interface Resident {
  id: string
  userId: string
  name: string
  email: string
  phone: string
  avatar?: string
  flatId: string
  flatNumber: string
  towerName: string
  type: 'owner' | 'tenant'
  emergencyContact: string
  emergencyPhone: string
  moveInDate: string
  isActive: boolean
  vehicles: Vehicle[]
  familyMembers: FamilyMember[]
}

export interface FamilyMember {
  id: string
  name: string
  relation: string
  phone?: string
  age: number
}

export interface Vehicle {
  id: string
  number: string
  type: 'car' | 'bike' | 'ev'
  brand: string
  model: string
  color: string
  parkingSlotId?: string
}

export interface ParkingSlot {
  id: string
  slotNumber: string
  type: 'car' | 'bike' | 'ev'
  flatId?: string
  vehicleId?: string
  isOccupied: boolean
}

export interface MaintenanceBill {
  id: string
  flatId: string
  flatNumber: string
  towerName: string
  residentName: string
  amount: number
  lateFee: number
  totalAmount: number
  month: string
  year: number
  dueDate: string
  status: 'paid' | 'pending' | 'overdue' | 'partially_paid'
  paidAmount: number
  paidDate?: string
  paymentMethod?: string
  invoiceNumber: string
  createdAt: string
}

export interface Payment {
  id: string
  billId: string
  flatId: string
  amount: number
  method: 'online' | 'cash' | 'cheque' | 'bank_transfer'
  transactionId?: string
  status: 'success' | 'pending' | 'failed'
  date: string
  receiptUrl?: string
}

export interface Complaint {
  id: string
  residentId: string
  residentName: string
  flatNumber: string
  towerName: string
  category: 'plumbing' | 'electricity' | 'security' | 'cleaning' | 'lift' | 'parking' | 'water' | 'other'
  title: string
  description: string
  images: string[]
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'submitted' | 'assigned' | 'in_progress' | 'resolved' | 'confirmed' | 'rejected'
  assignedTo?: string
  assignedStaffName?: string
  rating?: number
  location: string
  createdAt: string
  updatedAt: string
  comments: ComplaintComment[]
}

export interface ComplaintComment {
  id: string
  userId: string
  userName: string
  userRole: Role
  content: string
  createdAt: string
}

export interface Visitor {
  id: string
  name: string
  phone: string
  purpose: string
  flatId?: string
  flatNumber: string
  towerName?: string
  residentName?: string
  societyId?: string
  vehicleNumber?: string
  expectedDate?: string
  expectedTime?: string
  entryTime?: string
  exitTime?: string
  status: 'expected' | 'checked_in' | 'checked_out' | 'cancelled' | 'approved'
  type?: 'guest' | 'delivery' | 'cab' | 'service'
  passCode: string
  photo?: string
  approvedBy?: string
  createdAt?: string
}

export interface Notice {
  id: string
  societyId?: string
  title: string
  content?: string
  description?: string
  category: 'general' | 'maintenance' | 'event' | 'emergency' | 'meeting' | 'urgent' | 'billing' | 'rules' | 'other'
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'normal'
  attachments?: string[]
  publishDate?: string
  expiryDate?: string
  isPinned: boolean
  createdBy?: string
  createdByName: string
  createdAt: string
  readByCount?: number
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'maintenance' | 'payment' | 'complaint' | 'visitor' | 'notice' | 'poll' | 'amenity' | 'emergency' | 'community'
  isRead: boolean
  actionUrl?: string
  timestamp?: string
  createdAt?: string
}

export interface Poll {
  id: string
  title?: string
  question?: string
  description?: string
  options: PollOption[]
  isAnonymous?: boolean
  deadline?: string
  endDate?: string
  totalVotes: number
  totalEligible?: number
  userVotedIndex?: number
  status?: 'active' | 'closed' | 'draft'
  createdBy?: string
  createdByName?: string
  createdAt?: string
  userVote?: string
}

export interface PollOption {
  id?: string
  text: string
  votes: number
  percentage?: number
}

export interface Amenity {
  id: string
  name: string
  description: string
  type?: 'clubhouse' | 'gym' | 'swimming_pool' | 'party_hall' | 'sports_court' | 'meeting_room'
  image?: string
  pricePerHour?: number
  maxDurationHours?: number
  isAvailable?: boolean
  isBookingAllowed?: boolean
  capacity?: number
  bookingFee?: number
  openingTime?: string
  closingTime?: string
  rules?: string | string[]
  timeSlots?: string[]
}

export interface AmenityBooking {
  id: string
  amenityId: string
  amenityName: string
  residentId: string
  residentName: string
  flatNumber: string
  date: string
  startTime: string
  endTime: string
  totalPrice: number
  status: 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
}

export interface Expense {
  id: string
  category: 'electricity' | 'water' | 'security' | 'cleaning' | 'repairs' | 'staff_salary' | 'lift_maintenance' | 'gardening' | 'other'
  title: string
  description?: string
  amount: number
  vendorId?: string
  vendorName?: string
  date: string
  invoiceUrl?: string
  approvedBy?: string
  approvedByName?: string
  status?: 'approved' | 'pending' | 'rejected'
  createdAt?: string
}

export interface Vendor {
  id: string
  name: string
  company: string
  category: string
  phone: string
  email: string
  address: string
  gstNumber?: string
  contractStart?: string
  contractEnd?: string
  totalPayments: number
  isActive: boolean
  createdAt: string
}

export interface Staff {
  id: string
  name: string
  phone: string
  role: 'security' | 'cleaner' | 'gardener' | 'maintenance' | 'technician'
  salary: number
  joiningDate: string
  isActive: boolean
  attendance: AttendanceRecord[]
}

export interface AttendanceRecord {
  id: string
  staffId: string
  date: string
  checkIn?: string
  checkOut?: string
  status: 'present' | 'absent' | 'half_day' | 'leave'
}

export interface Document {
  id: string
  name: string
  category: 'registration' | 'meeting_minutes' | 'bills' | 'contracts' | 'legal' | 'maintenance_records' | 'vendor_agreements'
  fileUrl: string
  fileSize: number
  fileType: string
  uploadedBy: string
  uploadedByName: string
  permissions: Role[]
  createdAt: string
}

export interface EmergencyAlert {
  id: string
  type: 'fire' | 'medical' | 'security' | 'gas_leak' | 'other'
  reportedBy: string
  reportedByName: string
  flatNumber: string
  towerName: string
  description: string
  status: 'active' | 'responding' | 'resolved'
  createdAt: string
}

export interface CommunityPost {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  flatNumber: string
  content: string
  images: string[]
  likes: number
  comments: PostComment[]
  isLiked: boolean
  createdAt: string
}

export interface PostComment {
  id: string
  userId: string
  userName: string
  content: string
  createdAt: string
}

export interface Subscription {
  id: string
  societyId: string
  plan: 'starter' | 'growth' | 'premium'
  amount: number
  startDate: string
  endDate: string
  status: 'active' | 'expired' | 'cancelled'
}

// Dashboard Stats
export interface DashboardStats {
  totalResidents: number
  occupiedFlats: number
  vacantFlats: number
  maintenanceCollected: number
  pendingMaintenance: number
  openComplaints: number
  visitorsToday: number
  parkingOccupancy: number
}

export interface ChartData {
  name: string
  value: number
  [key: string]: string | number
}

// AI
export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  isStreaming?: boolean
}

// Super Admin
export interface SuperAdminStats {
  totalSocieties: number
  activeSubscriptions: number
  monthlyRevenue: number
  newSocieties: number
  churnRate: number
  activeUsers: number
  supportTickets: number
}
