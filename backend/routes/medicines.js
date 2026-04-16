// backend/routes/medicines.js
const express = require('express')
const router = express.Router()

/**
 * GET /api/medicines
 * Get all medicines
 */
router.get('/', (req, res) => {
  const medicines = [
    {
      id: 'med-001',
      name: 'Aspirin',
      genericName: 'Acetylsalicylic Acid',
      strength: '500mg',
      form: 'Tablet',
      uses: ['Headache', 'Fever', 'Pain relief'],
      dosage: { morning: 1, afternoon: 1, night: 1 },
      sideEffects: ['Stomach upset', 'Mild heartburn'],
      manufacturer: 'Generic',
      price: 50,
      inStock: true,
    },
    {
      id: 'med-002',
      name: 'Metformin',
      genericName: 'Metformin HCl',
      strength: '500mg',
      form: 'Tablet',
      uses: ['Type 2 Diabetes'],
      dosage: { morning: 1, afternoon: 0, night: 1 },
      sideEffects: ['Metallic taste', 'Diarrhea'],
      manufacturer: 'Generic',
      price: 150,
      inStock: true,
    },
  ]
  
  res.json({ success: true, data: medicines, count: medicines.length })
})

/**
 * POST /api/medicines/barcode-lookup
 * Lookup medicine by barcode
 */
router.post('/barcode-lookup', (req, res) => {
  const { barcode } = req.body
  
  if (!barcode) {
    return res.status(400).json({ error: 'Barcode is required' })
  }
  
  // Mock response
  const medicine = {
    id: 'med-' + barcode,
    name: 'Medicine Name',
    strength: '500mg',
    uses: ['General use'],
  }
  
  res.json({ success: true, data: medicine })
})

/**
 * GET /api/medicines/:id
 * Get single medicine
 */
router.get('/:id', (req, res) => {
  const medicine = {
    id: req.params.id,
    name: 'Medicine Details',
    strength: '500mg',
  }
  
  res.json({ success: true, data: medicine })
})

module.exports = router
