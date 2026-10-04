// ============================================================
// SocioHub - Comprehensive Demo Data
// Realistic data for 2 societies with 100+ flats, 200+ residents
// ============================================================

import type {
  User, Society, Tower, Flat, Resident, Vehicle, ParkingSlot,
  MaintenanceBill, Payment, Complaint, ComplaintComment, Visitor,
  Notice, Notification, Poll, PollOption, Amenity, AmenityBooking,
  Expense, Vendor, Staff, AttendanceRecord, Document, EmergencyAlert,
  CommunityPost, DashboardStats, SuperAdminStats, FamilyMember
} from '@/types'

// ============================================================
// Demo Users
// ============================================================
export const demoUsers: User[] = [
  {
    id: 'u1', email: 'admin@sociohub.demo', name: 'Rajesh Sharma', phone: '+91 98101 23456',
    role: 'society_admin', societyId: 's1', isActive: true, createdAt: '2024-01-15',
    avatar: '',
  },
  {
    id: 'u2', email: 'resident@sociohub.demo', name: 'Priya Mehta', phone: '+91 98102 34567',
    role: 'resident', societyId: 's1', flatId: 'f1', isActive: true, createdAt: '2024-02-01',
  },
  {
    id: 'u3', email: 'security@sociohub.demo', name: 'Ramesh Kumar', phone: '+91 98103 45678',
    role: 'security_guard', societyId: 's1', isActive: true, createdAt: '2024-01-20',
  },
  {
    id: 'u4', email: 'accountant@sociohub.demo', name: 'Anita Desai', phone: '+91 98104 56789',
    role: 'accountant', societyId: 's1', isActive: true, createdAt: '2024-01-18',
  },
  {
    id: 'u5', email: 'super@sociohub.demo', name: 'Vikram Patel', phone: '+91 98100 00001',
    role: 'super_admin', isActive: true, createdAt: '2024-01-01',
  },
  {
    id: 'u6', email: 'committee@sociohub.demo', name: 'Suresh Nair', phone: '+91 98105 67890',
    role: 'committee_member', societyId: 's1', flatId: 'f5', isActive: true, createdAt: '2024-02-10',
  },
]

// ============================================================
// Demo Societies
// ============================================================
export const demoSocieties: Society[] = [
  {
    id: 's1', name: 'Green Valley Residency', address: '123, MG Road, Andheri West',
    city: 'Mumbai', state: 'Maharashtra', pincode: '400053',
    contactEmail: 'admin@greenvalley.com', contactPhone: '+91 22 2631 4567',
    totalTowers: 3, totalFlats: 120, subscriptionPlan: 'premium',
    isActive: true, createdAt: '2024-01-15',
  },
  {
    id: 's2', name: 'Sunrise Heights', address: '456, Whitefield Main Road',
    city: 'Bangalore', state: 'Karnataka', pincode: '560066',
    contactEmail: 'admin@sunriseheights.com', contactPhone: '+91 80 2845 6789',
    totalTowers: 2, totalFlats: 80, subscriptionPlan: 'growth',
    isActive: true, createdAt: '2024-03-01',
  },
]

// ============================================================
// Demo Towers
// ============================================================
export const demoTowers: Tower[] = [
  { id: 't1', societyId: 's1', name: 'Tower A - Jasmine', totalFloors: 10, flatsPerFloor: 4 },
  { id: 't2', societyId: 's1', name: 'Tower B - Orchid', totalFloors: 10, flatsPerFloor: 4 },
  { id: 't3', societyId: 's1', name: 'Tower C - Lily', totalFloors: 10, flatsPerFloor: 4 },
  { id: 't4', societyId: 's2', name: 'Tower A - Emerald', totalFloors: 10, flatsPerFloor: 4 },
  { id: 't5', societyId: 's2', name: 'Tower B - Sapphire', totalFloors: 10, flatsPerFloor: 4 },
]

// ============================================================
// Helper to generate flats
// ============================================================
const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
  'Priya', 'Ananya', 'Diya', 'Aisha', 'Kavya', 'Riya', 'Saanvi', 'Zara', 'Meera', 'Nisha',
  'Rahul', 'Amit', 'Deepak', 'Suresh', 'Mahesh', 'Ganesh', 'Kiran', 'Sanjay', 'Vinod', 'Prakash',
  'Sneha', 'Pooja', 'Neha', 'Swati', 'Rekha', 'Sunita', 'Geeta', 'Lata', 'Seema', 'Uma']
const lastNames = ['Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Verma', 'Joshi', 'Mehta', 'Shah', 'Reddy',
  'Nair', 'Iyer', 'Rao', 'Das', 'Bose', 'Banerjee', 'Chatterjee', 'Mukherjee', 'Sen', 'Kapoor',
  'Malhotra', 'Chopra', 'Arora', 'Sinha', 'Agarwal', 'Tiwari', 'Pandey', 'Mishra', 'Saxena', 'Bajaj']

function randomName(): string {
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`
}

function randomPhone(): string {
  return `+91 ${Math.floor(90000 + Math.random() * 9999)} ${Math.floor(10000 + Math.random() * 89999)}`
}

const flatTypes = ['1BHK', '2BHK', '2BHK', '3BHK', '3BHK', '4BHK']
const flatAreas: Record<string, number> = { '1BHK': 550, '2BHK': 850, '3BHK': 1200, '4BHK': 1600 }

function generateFlats(tower: Tower, towerId: string): Flat[] {
  const flats: Flat[] = []
  const prefix = tower.name.charAt(tower.name.length - 1) === 'e' ? tower.name.split(' ')[0].replace('Tower ', '') : tower.name.split(' - ')[0].replace('Tower ', '')
  for (let floor = 1; floor <= tower.totalFloors; floor++) {
    for (let unit = 1; unit <= tower.flatsPerFloor; unit++) {
      const flatNumber = `${prefix}-${floor}${String(unit).padStart(2, '0')}`
      const type = flatTypes[Math.floor(Math.random() * flatTypes.length)]
      const isOccupied = Math.random() > 0.15
      const ownerName = randomName()
      const hasTenant = isOccupied && Math.random() > 0.7
      const statuses: Flat['maintenanceStatus'][] = ['paid', 'paid', 'paid', 'pending', 'overdue']
      flats.push({
        id: `f-${towerId}-${floor}${unit}`,
        towerId,
        towerName: tower.name,
        floor,
        flatNumber,
        area: flatAreas[type],
        type,
        ownerId: isOccupied ? `owner-${towerId}-${floor}${unit}` : undefined,
        ownerName: isOccupied ? ownerName : undefined,
        tenantId: hasTenant ? `tenant-${towerId}-${floor}${unit}` : undefined,
        tenantName: hasTenant ? randomName() : undefined,
        isOccupied,
        maintenanceStatus: isOccupied ? statuses[Math.floor(Math.random() * statuses.length)] : 'pending',
      })
    }
  }
  return flats
}

export const demoFlats: Flat[] = demoTowers.flatMap((t) => generateFlats(t, t.id))

// Override first few for demo consistency
demoFlats[0] = {
  ...demoFlats[0], id: 'f1', flatNumber: 'A-101', ownerName: 'Priya Mehta',
  ownerId: 'u2', isOccupied: true, maintenanceStatus: 'paid', type: '3BHK', area: 1200,
}

// ============================================================
// Demo Residents (top 20 detailed, rest auto-generated)
// ============================================================
export const demoResidents: Resident[] = [
  {
    id: 'r1', userId: 'u2', name: 'Priya Mehta', email: 'priya.mehta@email.com',
    phone: '+91 98102 34567', flatId: 'f1', flatNumber: 'A-101', towerName: 'Tower A - Jasmine',
    type: 'owner', emergencyContact: 'Rohit Mehta', emergencyPhone: '+91 98111 22222',
    moveInDate: '2022-06-15', isActive: true,
    vehicles: [
      { id: 'v1', number: 'MH 02 AB 1234', type: 'car', brand: 'Maruti', model: 'Swift', color: 'White' },
      { id: 'v2', number: 'MH 02 CD 5678', type: 'bike', brand: 'Honda', model: 'Activa', color: 'Black' },
    ],
    familyMembers: [
      { id: 'fm1', name: 'Rohit Mehta', relation: 'Husband', phone: '+91 98111 22222', age: 38 },
      { id: 'fm2', name: 'Aarav Mehta', relation: 'Son', age: 8 },
    ],
  },
  {
    id: 'r2', userId: 'r2u', name: 'Amit Gupta', email: 'amit.gupta@email.com',
    phone: '+91 98201 12345', flatId: 'f-t1-12', flatNumber: 'A-102', towerName: 'Tower A - Jasmine',
    type: 'owner', emergencyContact: 'Sunita Gupta', emergencyPhone: '+91 98201 54321',
    moveInDate: '2021-03-10', isActive: true,
    vehicles: [
      { id: 'v3', number: 'MH 04 EF 9012', type: 'car', brand: 'Hyundai', model: 'Creta', color: 'Silver' },
    ],
    familyMembers: [
      { id: 'fm3', name: 'Sunita Gupta', relation: 'Wife', phone: '+91 98201 54321', age: 34 },
      { id: 'fm4', name: 'Riya Gupta', relation: 'Daughter', age: 5 },
    ],
  },
  {
    id: 'r3', userId: 'r3u', name: 'Deepak Singh', email: 'deepak.singh@email.com',
    phone: '+91 98301 11111', flatId: 'f-t1-13', flatNumber: 'A-103', towerName: 'Tower A - Jasmine',
    type: 'tenant', emergencyContact: 'Mohan Singh', emergencyPhone: '+91 98301 22222',
    moveInDate: '2023-01-01', isActive: true,
    vehicles: [
      { id: 'v4', number: 'MH 01 GH 3456', type: 'car', brand: 'Tata', model: 'Nexon EV', color: 'Blue' },
    ],
    familyMembers: [
      { id: 'fm5', name: 'Sneha Singh', relation: 'Wife', phone: '+91 98301 33333', age: 29 },
    ],
  },
  ...(Array.from({ length: 17 }, (_, i) => ({
    id: `r${i + 4}`,
    userId: `r${i + 4}u`,
    name: randomName(),
    email: `resident${i + 4}@email.com`,
    phone: randomPhone(),
    flatId: `f-t${Math.ceil((i + 4) / 10)}-${Math.floor((i + 4) / 4 + 1)}${((i + 4) % 4) + 1}`,
    flatNumber: `${['A', 'B', 'C'][Math.floor(i / 7)]}-${Math.floor(i / 4 + 2)}0${(i % 4) + 1}`,
    towerName: `Tower ${['A - Jasmine', 'B - Orchid', 'C - Lily'][Math.floor(i / 7)]}`,
    type: (Math.random() > 0.7 ? 'tenant' : 'owner') as 'owner' | 'tenant',
    emergencyContact: randomName(),
    emergencyPhone: randomPhone(),
    moveInDate: `202${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    isActive: true,
    vehicles: Math.random() > 0.3 ? [{
      id: `v${i + 10}`,
      number: `MH ${String(Math.floor(Math.random() * 50) + 1).padStart(2, '0')} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${Math.floor(1000 + Math.random() * 9000)}`,
      type: (['car', 'bike', 'ev'] as const)[Math.floor(Math.random() * 3)],
      brand: ['Maruti', 'Hyundai', 'Tata', 'Honda', 'Toyota', 'Kia'][Math.floor(Math.random() * 6)],
      model: ['Swift', 'i20', 'Nexon', 'City', 'Innova', 'Seltos'][Math.floor(Math.random() * 6)],
      color: ['White', 'Silver', 'Black', 'Red', 'Blue', 'Grey'][Math.floor(Math.random() * 6)],
    }] : [],
    familyMembers: [],
  }))),
]

// ============================================================
// Demo Maintenance Bills
// ============================================================
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October']

export const demoMaintenanceBills: MaintenanceBill[] = []
const billFlats = demoFlats.filter((f) => f.isOccupied).slice(0, 30)
let billId = 1
for (const month of months) {
  for (const flat of billFlats) {
    const baseAmount = flat.type === '1BHK' ? 1500 : flat.type === '2BHK' ? 2000 : flat.type === '3BHK' ? 2500 : 3500
    const isPaid = Math.random() > 0.3
    const isOverdue = !isPaid && Math.random() > 0.5
    const lateFee = isOverdue ? 250 : 0
    const status: MaintenanceBill['status'] = isPaid ? 'paid' : isOverdue ? 'overdue' : 'pending'
    demoMaintenanceBills.push({
      id: `bill-${billId++}`,
      flatId: flat.id,
      flatNumber: flat.flatNumber,
      towerName: flat.towerName,
      residentName: flat.ownerName || flat.tenantName || 'Unknown',
      amount: baseAmount,
      lateFee,
      totalAmount: baseAmount + lateFee,
      month,
      year: 2024,
      dueDate: `2024-${String(months.indexOf(month) + 1).padStart(2, '0')}-10`,
      status,
      paidAmount: isPaid ? baseAmount : 0,
      paidDate: isPaid ? `2024-${String(months.indexOf(month) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}` : undefined,
      paymentMethod: isPaid ? (['online', 'cash', 'bank_transfer'] as const)[Math.floor(Math.random() * 3)] : undefined,
      invoiceNumber: `INV-2024-${String(billId).padStart(5, '0')}`,
      createdAt: `2024-${String(months.indexOf(month) + 1).padStart(2, '0')}-01`,
    })
  }
}

// ============================================================
// Demo Complaints
// ============================================================
const complaintCategories: Complaint['category'][] = ['plumbing', 'electricity', 'security', 'cleaning', 'lift', 'parking', 'water', 'other']
const complaintTitles: Record<string, string[]> = {
  plumbing: ['Water leaking from bathroom pipe', 'Kitchen sink blocked', 'Low water pressure on 8th floor'],
  electricity: ['Corridor lights not working', 'Power fluctuation in Tower B', 'Lift lobby light broken'],
  security: ['Main gate CCTV not functional', 'Security guard not present at night', 'Unauthorized parking in visitor area'],
  cleaning: ['Common area not cleaned properly', 'Garbage not collected from 5th floor', 'Staircase needs mopping'],
  lift: ['Lift making noise in Tower A', 'Lift buttons not responding', 'Lift stopped between floors'],
  parking: ['Car scratched in parking area', 'Unauthorized vehicle in assigned slot', 'Parking light not working'],
  water: ['No water supply since morning', 'Water tank overflow', 'Bore well pump not working'],
  other: ['Wall crack in common area', 'Garden fence damaged', 'Children play area needs maintenance'],
}

export const demoComplaints: Complaint[] = Array.from({ length: 50 }, (_, i) => {
  const category = complaintCategories[Math.floor(Math.random() * complaintCategories.length)]
  const titles = complaintTitles[category]
  const title = titles[Math.floor(Math.random() * titles.length)]
  const priorities: Complaint['priority'][] = ['low', 'medium', 'medium', 'high', 'critical']
  const statuses: Complaint['status'][] = ['submitted', 'submitted', 'assigned', 'in_progress', 'resolved', 'confirmed']
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  const resident = demoResidents[Math.floor(Math.random() * Math.min(demoResidents.length, 15))]

  return {
    id: `c${i + 1}`,
    residentId: resident.id,
    residentName: resident.name,
    flatNumber: resident.flatNumber,
    towerName: resident.towerName,
    category,
    title,
    description: `${title}. This issue has been persistent and needs immediate attention. Please look into this matter at the earliest.`,
    images: [],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status,
    assignedTo: ['assigned', 'in_progress', 'resolved', 'confirmed'].includes(status) ? `staff-${Math.floor(Math.random() * 5) + 1}` : undefined,
    assignedStaffName: ['assigned', 'in_progress', 'resolved', 'confirmed'].includes(status) ? randomName() : undefined,
    rating: status === 'confirmed' ? Math.floor(Math.random() * 3) + 3 : undefined,
    location: `${resident.towerName}, Floor ${Math.floor(Math.random() * 10) + 1}`,
    createdAt: `2024-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    updatedAt: `2024-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    comments: status !== 'submitted' ? [
      {
        id: `cc${i}`, userId: 'u1', userName: 'Rajesh Sharma', userRole: 'society_admin' as const,
        content: 'We have noted your complaint and assigned a staff member.', createdAt: '2024-09-15',
      },
    ] : [],
  }
})

// ============================================================
// Demo Visitors
// ============================================================
const visitorPurposes = ['Family visit', 'Friend visit', 'Delivery - Amazon', 'Delivery - Flipkart',
  'Delivery - Swiggy', 'Delivery - Zomato', 'Plumber', 'Electrician', 'Maid', 'Driver',
  'Courier', 'House help interview', 'Property viewing', 'Insurance agent', 'Internet technician']

export const demoVisitors: Visitor[] = Array.from({ length: 100 }, (_, i) => {
  const flat = demoFlats.filter(f => f.isOccupied)[Math.floor(Math.random() * 80)]
  const purpose = visitorPurposes[Math.floor(Math.random() * visitorPurposes.length)]
  const isDelivery = purpose.includes('Delivery')
  const types: Visitor['type'][] = isDelivery ? ['delivery'] : ['guest', 'service', 'cab']
  const statuses: Visitor['status'][] = ['expected', 'checked_in', 'checked_out', 'checked_out', 'checked_out']
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')
  const month = String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')

  return {
    id: `vis-${i + 1}`,
    name: randomName(),
    phone: randomPhone(),
    purpose,
    flatId: flat.id,
    flatNumber: flat.flatNumber,
    towerName: flat.towerName,
    residentName: flat.ownerName || flat.tenantName || 'Resident',
    vehicleNumber: Math.random() > 0.5 ? `MH ${String(Math.floor(Math.random() * 50) + 1).padStart(2, '0')} ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))} ${Math.floor(1000 + Math.random() * 9000)}` : undefined,
    expectedDate: `2024-${month}-${day}`,
    expectedTime: `${String(Math.floor(Math.random() * 12) + 8).padStart(2, '0')}:${Math.random() > 0.5 ? '00' : '30'}`,
    entryTime: ['checked_in', 'checked_out'].includes(status) ? `${String(Math.floor(Math.random() * 12) + 8).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}` : undefined,
    exitTime: status === 'checked_out' ? `${String(Math.floor(Math.random() * 6) + 14).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}` : undefined,
    status,
    type: types[Math.floor(Math.random() * types.length)],
    passCode: String(Math.floor(100000 + Math.random() * 899999)),
    createdAt: `2024-${month}-${day}`,
  }
})

// ============================================================
// Demo Notices
// ============================================================
export const demoNotices: Notice[] = [
  {
    id: 'n1', title: 'Annual General Meeting - October 2024',
    description: 'All residents are requested to attend the Annual General Meeting on 15th October 2024 at 6:00 PM in the Community Hall. Important agenda items include maintenance fee revision, security upgrade proposal, and new amenities discussion.',
    category: 'meeting', priority: 'high', attachments: [], publishDate: '2024-10-01',
    expiryDate: '2024-10-15', isPinned: true, createdBy: 'u1', createdByName: 'Rajesh Sharma',
    createdAt: '2024-10-01',
  },
  {
    id: 'n2', title: 'Water Supply Interruption - 5th October',
    description: 'Due to maintenance work on the main water pipeline, water supply will be interrupted from 10:00 AM to 2:00 PM on 5th October 2024. Residents are advised to store sufficient water. We apologize for the inconvenience.',
    category: 'maintenance', priority: 'urgent', attachments: [], publishDate: '2024-10-03',
    expiryDate: '2024-10-05', isPinned: true, createdBy: 'u1', createdByName: 'Rajesh Sharma',
    createdAt: '2024-10-03',
  },
  {
    id: 'n3', title: 'Diwali Celebration 2024',
    description: 'Join us for the grand Diwali celebration at the society clubhouse! Date: 1st November 2024. Activities include rangoli competition, cultural performances, dinner, and fireworks. Registration is open - contact the office for details.',
    category: 'event', priority: 'medium', attachments: [], publishDate: '2024-10-10',
    expiryDate: '2024-11-01', isPinned: false, createdBy: 'u6', createdByName: 'Suresh Nair',
    createdAt: '2024-10-10',
  },
  {
    id: 'n4', title: 'New Parking Rules Effective November 1st',
    description: 'Please note the following updated parking rules: 1. All vehicles must display society stickers. 2. Visitor parking limited to 2 hours. 3. No parking in fire lane zones. 4. EV charging slots are reserved. Violators will be fined ₹500.',
    category: 'general', priority: 'medium', attachments: [], publishDate: '2024-10-15',
    isPinned: false, createdBy: 'u1', createdByName: 'Rajesh Sharma', createdAt: '2024-10-15',
  },
  {
    id: 'n5', title: 'Lift Maintenance Schedule',
    description: 'Lifts in Tower A and Tower B will undergo scheduled maintenance on alternate Saturdays. During maintenance (9 AM - 12 PM), one lift per tower will remain operational. Thank you for your cooperation.',
    category: 'maintenance', priority: 'low', attachments: [], publishDate: '2024-09-25',
    isPinned: false, createdBy: 'u1', createdByName: 'Rajesh Sharma', createdAt: '2024-09-25',
  },
  {
    id: 'n6', title: 'Security Alert - Suspicious Activity',
    description: 'There have been reports of suspicious individuals near the back gate area during late night hours. Security has been strengthened. Residents are requested to report any unusual activity to the security desk immediately.',
    category: 'emergency', priority: 'urgent', attachments: [], publishDate: '2024-10-02',
    expiryDate: '2024-10-15', isPinned: true, createdBy: 'u1', createdByName: 'Rajesh Sharma',
    createdAt: '2024-10-02',
  },
]

// ============================================================
// Demo Notifications
// ============================================================
export const demoNotifications: Notification[] = [
  { id: 'notif1', userId: 'u2', title: 'Maintenance Bill Generated', message: 'Your October 2024 maintenance bill of ₹2,500 has been generated.', type: 'maintenance', isRead: false, actionUrl: '/maintenance', createdAt: '2024-10-01T09:00:00' },
  { id: 'notif2', userId: 'u2', title: 'Visitor Arrived', message: 'Your visitor Rohit Mehta has checked in at the main gate.', type: 'visitor', isRead: false, actionUrl: '/visitors', createdAt: '2024-10-04T10:30:00' },
  { id: 'notif3', userId: 'u2', title: 'Complaint Updated', message: 'Your complaint "Water leaking from bathroom pipe" has been assigned to a staff member.', type: 'complaint', isRead: true, actionUrl: '/complaints', createdAt: '2024-10-03T14:20:00' },
  { id: 'notif4', userId: 'u2', title: 'New Notice', message: 'Annual General Meeting - October 2024. Please attend.', type: 'notice', isRead: true, actionUrl: '/notices', createdAt: '2024-10-01T08:00:00' },
  { id: 'notif5', userId: 'u2', title: 'New Poll', message: 'Vote: Should the society install CCTV cameras in the parking area?', type: 'poll', isRead: false, actionUrl: '/polls', createdAt: '2024-10-02T11:00:00' },
  { id: 'notif6', userId: 'u2', title: 'Amenity Booking Confirmed', message: 'Your booking for Clubhouse on October 12, 2024 has been confirmed.', type: 'amenity', isRead: true, actionUrl: '/amenities', createdAt: '2024-10-04T09:15:00' },
  { id: 'notif7', userId: 'u2', title: 'Payment Received', message: 'Payment of ₹2,500 for September maintenance has been received successfully.', type: 'payment', isRead: true, actionUrl: '/payments', createdAt: '2024-09-08T16:45:00' },
  { id: 'notif8', userId: 'u1', title: '5 Overdue Payments', message: '5 flats have overdue maintenance payments for September 2024.', type: 'maintenance', isRead: false, actionUrl: '/maintenance', createdAt: '2024-10-04T08:00:00' },
]

// ============================================================
// Demo Polls
// ============================================================
export const demoPolls: Poll[] = [
  {
    id: 'p1', title: 'Should the society install CCTV cameras in the parking area?',
    description: 'We are considering installing 16 HD CCTV cameras across all parking zones. The one-time cost would be ₹3,50,000 from the maintenance fund.',
    options: [
      { id: 'po1', text: 'Yes, install CCTV cameras', votes: 67, percentage: 74 },
      { id: 'po2', text: 'No, it\'s not needed', votes: 15, percentage: 17 },
      { id: 'po3', text: 'Need more information', votes: 8, percentage: 9 },
    ],
    isAnonymous: false, deadline: '2024-10-20', totalVotes: 90, totalEligible: 120,
    status: 'active', createdBy: 'u6', createdByName: 'Suresh Nair', createdAt: '2024-10-01',
  },
  {
    id: 'p2', title: 'Preferred timing for Diwali celebration',
    description: 'Please vote for your preferred timing for the society Diwali celebration event.',
    options: [
      { id: 'po4', text: 'Evening 5 PM - 9 PM', votes: 45, percentage: 56 },
      { id: 'po5', text: 'Evening 6 PM - 10 PM', votes: 28, percentage: 35 },
      { id: 'po6', text: 'Afternoon 2 PM - 6 PM', votes: 7, percentage: 9 },
    ],
    isAnonymous: true, deadline: '2024-10-15', totalVotes: 80, totalEligible: 120,
    status: 'active', createdBy: 'u6', createdByName: 'Suresh Nair', createdAt: '2024-10-05',
  },
  {
    id: 'p3', title: 'Should we increase the monthly maintenance fee?',
    description: 'Due to rising costs, the committee proposes a 10% increase in monthly maintenance fees effective January 2025.',
    options: [
      { id: 'po7', text: 'Yes, 10% increase is acceptable', votes: 52, percentage: 48 },
      { id: 'po8', text: 'No, maintain current rates', votes: 42, percentage: 39 },
      { id: 'po9', text: 'Increase by 5% only', votes: 14, percentage: 13 },
    ],
    isAnonymous: true, deadline: '2024-09-30', totalVotes: 108, totalEligible: 120,
    status: 'closed', createdBy: 'u1', createdByName: 'Rajesh Sharma', createdAt: '2024-09-15',
  },
]

// ============================================================
// Demo Amenities
// ============================================================
export const demoAmenities: Amenity[] = [
  {
    id: 'am1', name: 'Clubhouse', description: 'Spacious air-conditioned clubhouse with a capacity of 100 people. Perfect for parties and gatherings.',
    type: 'clubhouse', pricePerHour: 1500, maxDurationHours: 6, isAvailable: true,
    rules: ['No smoking', 'Music must stop by 10 PM', 'Clean up after use', 'Maximum 100 people'],
    timeSlots: ['09:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-21:00'],
  },
  {
    id: 'am2', name: 'Gymnasium', description: 'State-of-the-art gym with modern equipment including treadmills, ellipticals, and free weights.',
    type: 'gym', pricePerHour: 0, maxDurationHours: 2, isAvailable: true,
    rules: ['Carry your own towel', 'Use equipment properly', 'No food inside', 'Wear appropriate footwear'],
    timeSlots: ['06:00-08:00', '08:00-10:00', '16:00-18:00', '18:00-20:00', '20:00-22:00'],
  },
  {
    id: 'am3', name: 'Swimming Pool', description: 'Olympic-size swimming pool with changing rooms and lounging area.',
    type: 'swimming_pool', pricePerHour: 200, maxDurationHours: 2, isAvailable: true,
    rules: ['Swimwear mandatory', 'Shower before entering', 'No diving in shallow end', 'Children must be accompanied'],
    timeSlots: ['06:00-08:00', '08:00-10:00', '16:00-18:00', '18:00-20:00'],
  },
  {
    id: 'am4', name: 'Party Hall', description: 'Elegant party hall with stage, sound system, and kitchen access.',
    type: 'party_hall', pricePerHour: 2500, maxDurationHours: 8, isAvailable: true,
    rules: ['Advance booking required', 'Clean up by 11 PM', 'No use of firecrackers', 'Security deposit ₹5000'],
    timeSlots: ['10:00-14:00', '14:00-18:00', '18:00-22:00'],
  },
  {
    id: 'am5', name: 'Badminton Court', description: 'Indoor badminton court with proper lighting and flooring.',
    type: 'sports_court', pricePerHour: 300, maxDurationHours: 2, isAvailable: true,
    rules: ['Non-marking shoes only', 'Book in advance', 'Maximum 4 players', 'Bring your own rackets'],
    timeSlots: ['06:00-08:00', '08:00-10:00', '16:00-18:00', '18:00-20:00', '20:00-22:00'],
  },
  {
    id: 'am6', name: 'Meeting Room', description: 'Air-conditioned meeting room with projector and whiteboard for 20 people.',
    type: 'meeting_room', pricePerHour: 500, maxDurationHours: 4, isAvailable: true,
    rules: ['Clean up after use', 'Turn off AC when leaving', 'No food', 'Maximum 20 people'],
    timeSlots: ['09:00-11:00', '11:00-13:00', '14:00-16:00', '16:00-18:00'],
  },
]

// ============================================================
// Demo Expenses
// ============================================================
const expenseCategories: Expense['category'][] = ['electricity', 'water', 'security', 'cleaning', 'repairs', 'staff_salary', 'lift_maintenance', 'gardening', 'other']
const expenseTitles: Record<string, string[]> = {
  electricity: ['Monthly electricity bill', 'Common area lighting', 'Lift power consumption'],
  water: ['Municipal water charges', 'Bore well maintenance', 'Water tank cleaning'],
  security: ['Security agency monthly bill', 'CCTV maintenance', 'Access control system'],
  cleaning: ['Housekeeping agency bill', 'Deep cleaning quarterly', 'Pest control service'],
  repairs: ['Plumbing repair - Tower A', 'Painting common areas', 'Gate motor repair'],
  staff_salary: ['Watchman salary', 'Gardener salary', 'Office staff salary'],
  lift_maintenance: ['Monthly lift AMC', 'Lift emergency repair', 'Lift inspection fee'],
  gardening: ['Monthly gardening', 'Plant purchase', 'Irrigation system repair'],
  other: ['Society insurance premium', 'Legal consultation', 'Audit fees'],
}

export const demoExpenses: Expense[] = Array.from({ length: 30 }, (_, i) => {
  const category = expenseCategories[Math.floor(Math.random() * expenseCategories.length)]
  const titles = expenseTitles[category]
  const title = titles[Math.floor(Math.random() * titles.length)]
  const amounts: Record<string, number[]> = {
    electricity: [45000, 52000, 48000], water: [15000, 18000, 12000],
    security: [85000, 90000, 85000], cleaning: [35000, 40000, 45000],
    repairs: [8000, 15000, 25000], staff_salary: [55000, 60000, 65000],
    lift_maintenance: [12000, 15000, 20000], gardening: [8000, 10000, 12000],
    other: [5000, 10000, 20000],
  }

  return {
    id: `exp-${i + 1}`, category, title, description: `${title} for the month`,
    amount: amounts[category][Math.floor(Math.random() * 3)],
    vendorName: ['ABC Services', 'XYZ Corp', 'PQR Solutions', 'LMN Agency', 'Quick Fix Services'][Math.floor(Math.random() * 5)],
    date: `2024-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    createdAt: `2024-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}-01`,
  }
})

// ============================================================
// Demo Vendors
// ============================================================
export const demoVendors: Vendor[] = [
  { id: 'vd1', name: 'Rajesh Electricals', company: 'Rajesh Electricals Pvt Ltd', category: 'Electrical', phone: '+91 98765 43210', email: 'rajesh@electricals.com', address: 'Andheri West, Mumbai', gstNumber: '27AABCT1234A1Z5', contractStart: '2024-01-01', contractEnd: '2024-12-31', totalPayments: 150000, isActive: true, createdAt: '2024-01-01' },
  { id: 'vd2', name: 'Safe Guard Security', company: 'Safe Guard Security Services', category: 'Security', phone: '+91 98765 11111', email: 'info@safeguard.com', address: 'Bandra, Mumbai', gstNumber: '27AABCT5678B1Z5', contractStart: '2024-01-01', contractEnd: '2025-12-31', totalPayments: 1020000, isActive: true, createdAt: '2024-01-01' },
  { id: 'vd3', name: 'Green Clean Services', company: 'Green Clean Housekeeping', category: 'Cleaning', phone: '+91 98765 22222', email: 'hello@greenclean.com', address: 'Goregaon, Mumbai', gstNumber: '27AABCT9012C1Z5', contractStart: '2024-04-01', contractEnd: '2025-03-31', totalPayments: 420000, isActive: true, createdAt: '2024-04-01' },
  { id: 'vd4', name: 'KONE Elevators', company: 'KONE Elevator India', category: 'Lift Maintenance', phone: '+91 98765 33333', email: 'service@kone.com', address: 'Lower Parel, Mumbai', gstNumber: '27AABCT3456D1Z5', contractStart: '2024-01-01', contractEnd: '2026-12-31', totalPayments: 360000, isActive: true, createdAt: '2024-01-01' },
  { id: 'vd5', name: 'AquaPure Water', company: 'AquaPure Water Solutions', category: 'Water Treatment', phone: '+91 98765 44444', email: 'info@aquapure.com', address: 'Thane, Mumbai', totalPayments: 80000, isActive: true, createdAt: '2024-03-01' },
  { id: 'vd6', name: 'TechConnect IT', company: 'TechConnect Solutions', category: 'Internet/IT', phone: '+91 98765 55555', email: 'support@techconnect.com', address: 'Powai, Mumbai', totalPayments: 120000, isActive: true, createdAt: '2024-02-01' },
]

// ============================================================
// Demo Staff
// ============================================================
export const demoStaff: Staff[] = [
  { id: 'st1', name: 'Ramesh Kumar', phone: '+91 98103 45678', role: 'security', salary: 18000, joiningDate: '2023-06-01', isActive: true, attendance: [] },
  { id: 'st2', name: 'Sunil Yadav', phone: '+91 98201 11111', role: 'security', salary: 18000, joiningDate: '2023-08-15', isActive: true, attendance: [] },
  { id: 'st3', name: 'Lakshmi Devi', phone: '+91 98301 22222', role: 'cleaner', salary: 14000, joiningDate: '2023-01-10', isActive: true, attendance: [] },
  { id: 'st4', name: 'Manoj Tiwari', phone: '+91 98401 33333', role: 'gardener', salary: 12000, joiningDate: '2023-03-20', isActive: true, attendance: [] },
  { id: 'st5', name: 'Santosh Kumar', phone: '+91 98501 44444', role: 'maintenance', salary: 20000, joiningDate: '2022-11-01', isActive: true, attendance: [] },
  { id: 'st6', name: 'Babu Lal', phone: '+91 98601 55555', role: 'security', salary: 16000, joiningDate: '2024-02-01', isActive: true, attendance: [] },
  { id: 'st7', name: 'Kamla Bai', phone: '+91 98701 66666', role: 'cleaner', salary: 14000, joiningDate: '2023-05-15', isActive: true, attendance: [] },
  { id: 'st8', name: 'Raju Prasad', phone: '+91 98801 77777', role: 'technician', salary: 22000, joiningDate: '2023-09-01', isActive: true, attendance: [] },
]

// ============================================================
// Demo Community Posts
// ============================================================
export const demoCommunityPosts: CommunityPost[] = [
  {
    id: 'cp1', userId: 'u2', userName: 'Priya Mehta', flatNumber: 'A-101',
    content: 'Found a set of keys near the Tower A lobby. If these belong to you, please contact me or the security desk. 🔑',
    images: [], likes: 12, isLiked: false, createdAt: '2024-10-04T10:30:00',
    comments: [
      { id: 'cpc1', userId: 'r3u', userName: 'Deepak Singh', content: 'Not mine, but thanks for posting!', createdAt: '2024-10-04T11:00:00' },
    ],
  },
  {
    id: 'cp2', userId: 'r2u', userName: 'Amit Gupta', flatNumber: 'A-102',
    content: 'Anyone interested in forming a morning jogging group? I usually run around the society track at 6 AM. Would love some company! 🏃‍♂️',
    images: [], likes: 24, isLiked: true, createdAt: '2024-10-03T07:15:00',
    comments: [
      { id: 'cpc2', userId: 'u2', userName: 'Priya Mehta', content: 'Count me in! Will join from Monday.', createdAt: '2024-10-03T08:00:00' },
      { id: 'cpc3', userId: 'r3u', userName: 'Deepak Singh', content: 'Great idea! I\'m in too.', createdAt: '2024-10-03T09:00:00' },
    ],
  },
  {
    id: 'cp3', userId: 'u6', userName: 'Suresh Nair', flatNumber: 'B-201',
    content: 'Reminder: Please ensure your balcony plants are secure, especially during the monsoon season. Last week, a pot fell from the 7th floor. Let\'s keep everyone safe! ⚠️🌿',
    images: [], likes: 45, isLiked: false, createdAt: '2024-10-02T14:00:00',
    comments: [],
  },
  {
    id: 'cp4', userId: 'r5u', userName: 'Kavya Reddy', flatNumber: 'B-301',
    content: 'Our society garden is looking absolutely beautiful this October! Kudos to the gardening team. The marigolds are gorgeous 🌼',
    images: [], likes: 38, isLiked: true, createdAt: '2024-10-01T16:30:00',
    comments: [
      { id: 'cpc4', userId: 'u1', userName: 'Rajesh Sharma', content: 'Will pass on the appreciation to the gardening team!', createdAt: '2024-10-01T17:00:00' },
    ],
  },
]

// ============================================================
// Demo Dashboard Stats
// ============================================================
export const demoDashboardStats: DashboardStats = {
  totalResidents: 234,
  occupiedFlats: 102,
  vacantFlats: 18,
  maintenanceCollected: 1856000,
  pendingMaintenance: 425000,
  openComplaints: 12,
  visitorsToday: 43,
  parkingOccupancy: 85,
}

// ============================================================
// Demo Super Admin Stats
// ============================================================
export const demoSuperAdminStats: SuperAdminStats = {
  totalSocieties: 47,
  activeSubscriptions: 42,
  monthlyRevenue: 198500,
  newSocieties: 5,
  churnRate: 2.1,
  activeUsers: 3842,
  supportTickets: 8,
}

// ============================================================
// Chart Data
// ============================================================
export const maintenanceChartData = [
  { name: 'Jan', collected: 185000, pending: 45000 },
  { name: 'Feb', collected: 192000, pending: 38000 },
  { name: 'Mar', collected: 188000, pending: 42000 },
  { name: 'Apr', collected: 195000, pending: 35000 },
  { name: 'May', collected: 198000, pending: 32000 },
  { name: 'Jun', collected: 190000, pending: 40000 },
  { name: 'Jul', collected: 193000, pending: 37000 },
  { name: 'Aug', collected: 196000, pending: 34000 },
  { name: 'Sep', collected: 191000, pending: 39000 },
  { name: 'Oct', collected: 185600, pending: 42500 },
]

export const expenseChartData = [
  { name: 'Security', value: 85000, fill: '#1e3a5f' },
  { name: 'Staff Salary', value: 65000, fill: '#2563eb' },
  { name: 'Electricity', value: 48000, fill: '#10b981' },
  { name: 'Cleaning', value: 40000, fill: '#f59e0b' },
  { name: 'Lift Maint.', value: 15000, fill: '#8b5cf6' },
  { name: 'Water', value: 15000, fill: '#06b6d4' },
  { name: 'Gardening', value: 10000, fill: '#ec4899' },
  { name: 'Repairs', value: 12000, fill: '#f97316' },
]

export const complaintChartData = [
  { name: 'Jan', open: 8, resolved: 12 },
  { name: 'Feb', open: 5, resolved: 10 },
  { name: 'Mar', open: 10, resolved: 8 },
  { name: 'Apr', open: 7, resolved: 11 },
  { name: 'May', open: 6, resolved: 9 },
  { name: 'Jun', open: 9, resolved: 13 },
  { name: 'Jul', open: 4, resolved: 7 },
  { name: 'Aug', open: 8, resolved: 10 },
  { name: 'Sep', open: 11, resolved: 9 },
  { name: 'Oct', open: 12, resolved: 6 },
]

export const visitorChartData = [
  { name: 'Mon', visitors: 38 },
  { name: 'Tue', visitors: 42 },
  { name: 'Wed', visitors: 35 },
  { name: 'Thu', visitors: 48 },
  { name: 'Fri', visitors: 52 },
  { name: 'Sat', visitors: 65 },
  { name: 'Sun', visitors: 28 },
]

export const mrrChartData = [
  { name: 'Jan', revenue: 125000 },
  { name: 'Feb', revenue: 135000 },
  { name: 'Mar', revenue: 142000 },
  { name: 'Apr', revenue: 155000 },
  { name: 'May', revenue: 162000 },
  { name: 'Jun', revenue: 168000 },
  { name: 'Jul', revenue: 175000 },
  { name: 'Aug', revenue: 182000 },
  { name: 'Sep', revenue: 190000 },
  { name: 'Oct', revenue: 198500 },
]

export const societyGrowthData = [
  { name: 'Jan', societies: 28 },
  { name: 'Feb', societies: 30 },
  { name: 'Mar', societies: 32 },
  { name: 'Apr', societies: 35 },
  { name: 'May', societies: 37 },
  { name: 'Jun', societies: 39 },
  { name: 'Jul', societies: 41 },
  { name: 'Aug', societies: 43 },
  { name: 'Sep', societies: 45 },
  { name: 'Oct', societies: 47 },
]

// ============================================================
// Auth helper
// ============================================================
export function authenticateDemo(email: string, password: string): { user: User; token: string } | null {
  if (password !== 'demo123') return null
  const user = demoUsers.find((u) => u.email === email)
  if (!user) return null
  return { user, token: `demo_token_${user.id}_${Date.now()}` }
}
