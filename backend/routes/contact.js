// backend/routes/contact.js
const express = require('express')
const router = express.Router()

/**
 * POST /api/contact
 * Submit contact form
 */
router.post('/', (req, res) => {
  const { name, email, phone, message } = req.body
  
  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  
  // Save to database
  console.log(`Contact form submission: ${name} (${email})`)
  
  // Send email notification (implement later)
  // await sendEmailToAdmin({ name, email, phone, message })
  
  res.status(201).json({
    success: true,
    message: 'Thank you for contacting us. We will get back to you soon.',
    ticketId: `ticket_${Date.now()}`,
  })
})

/**
 * GET /api/contact/clinic-info
 * Get clinic information
 */
router.get('/clinic-info', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Sri Sai Medical Centre',
      address: '123 Medical Street, Delhi, India',
      phone: '+91-555-123-4567',
      email: 'info@srisaimedical.com',
      hours: 'Mon-Sun: 9:00 AM - 6:00 PM',
      latitude: 28.7041,
      longitude: 77.1025,
    },
  })
})

module.exports = router
