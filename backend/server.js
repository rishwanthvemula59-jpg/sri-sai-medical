// backend/server.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')

// Import routes
const chatRoutes = require('./routes/chat')
const doctorRoutes = require('./routes/doctors')
const medicineRoutes = require('./routes/medicines')
const appointmentRoutes = require('./routes/appointments')
const contactRoutes = require('./routes/contact')

// Import middleware
const errorHandler = require('./middleware/errorHandler')
const requestLogger = require('./middleware/requestLogger')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}))

app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

// Request logging
app.use(requestLogger)

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})

const chatLimiter = rateLimit({
  windowMs: parseInt(process.env.CHAT_RATE_LIMIT_WINDOW_MS || '60000'),
  max: parseInt(process.env.CHAT_RATE_LIMIT_REQUESTS || '10'),
  message: 'Too many chat requests, please wait before sending another message.',
})

// API Routes
app.use('/api', generalLimiter)
app.use('/api/chat', chatLimiter, chatRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/medicines', medicineRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/contact', contactRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// Error handler
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Sri Sai Medical Backend running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})

module.exports = app
