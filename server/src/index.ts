import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SocioHub SaaS Engine',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// Demo stats endpoint
app.get('/api/stats', (req, res) => {
  res.json({
    totalResidents: 342,
    occupiedFlats: 102,
    totalFlats: 120,
    maintenanceCollected: 1875000,
    openComplaints: 8,
    visitorsToday: 43,
    parkingOccupancy: 88,
  })
})

app.listen(PORT, () => {
  console.log(`🚀 SocioHub Backend Server running on http://localhost:${PORT}`)
})
