// backend/routes/doctors.js
const express = require('express')
const router = express.Router()

/**
 * GET /api/doctors
 * Get all doctors
 */
router.get('/', (req, res) => {
  // Mock data - will be replaced with Firebase calls
  const doctors = [
    {
      id: 'doc-001',
      name: 'Dr. Rajesh Kumar',
      specialization: 'Cardiology',
      status: 'AVAILABLE',
      rating: 4.9,
      reviews: 150,
      experience: '12 years',
      qualifications: 'MD, DM (Cardiology)',
      nextAvailable: new Date().toISOString(),
    },
    {
      id: 'doc-002',
      name: 'Dr. Priya Sharma',
      specialization: 'Orthopedics',
      status: 'AVAILABLE',
      rating: 4.8,
      reviews: 120,
      experience: '8 years',
      qualifications: 'MS (Orthopedics)',
      nextAvailable: new Date().toISOString(),
    },
    {
      id: 'doc-003',
      name: 'Dr. Amit Patel',
      specialization: 'General Medicine',
      status: 'BUSY',
      rating: 4.7,
      reviews: 95,
      experience: '10 years',
      qualifications: 'MD (General Medicine)',
      nextAvailable: new Date(Date.now() + 3600000).toISOString(),
    },
  ]
  
  res.json({
    success: true,
    data: doctors,
    count: doctors.length,
  })
})

/**
 * GET /api/doctors/:id
 * Get single doctor
 */
router.get('/:id', (req, res) => {
  const doctor = {
    id: req.params.id,
    name: 'Dr. Sample Doctor',
    specialization: 'General Medicine',
    status: 'AVAILABLE',
    rating: 4.8,
    reviews: 100,
  }
  
  res.json({ success: true, data: doctor })
})

/**
 * POST /api/doctors/:id/status
 * Update doctor status (admin only)
 */
router.post('/:id/status', (req, res) => {
  const { status } = req.body
  
  if (!['AVAILABLE', 'BUSY', 'OFFLINE'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }
  
  // Update in Firebase
  res.json({ success: true, message: 'Status updated' })
})

module.exports = router
