// backend/routes/appointments.js
const express = require('express')
const router = express.Router()

/**
 * POST /api/appointments
 * Create new appointment
 */
router.post('/', (req, res) => {
  const { doctorId, patientName, patientEmail, patientPhone, appointmentDate, reason } = req.body
  
  // Validation
  if (!doctorId || !patientName || !patientEmail || !appointmentDate) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  
  // Create appointment
  const appointmentId = `appt_${Date.now()}`
  
  res.status(201).json({
    success: true,
    appointmentId,
    message: 'Appointment scheduled successfully',
    data: {
      appointmentId,
      doctorId,
      patientName,
      patientEmail,
      appointmentDate,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    },
  })
})

/**
 * GET /api/appointments/:id
 * Get appointment details
 */
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    data: {
      appointmentId: req.params.id,
      status: 'CONFIRMED',
    },
  })
})

/**
 * GET /api/appointments
 * Get all appointments (with filters)
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: [],
  })
})

module.exports = router
