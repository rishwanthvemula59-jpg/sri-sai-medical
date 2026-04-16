// backend/routes/chat.js
const express = require('express')
const router = express.Router()
const axios = require('axios')

/**
 * POST /api/chat
 * Send message to AI health assistant
 */
router.post('/', async (req, res, next) => {
  try {
    const { message, userLanguage = 'en-IN', context = [] } = req.body
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' })
    }
    
    // Mock response for development
    // In production, connect to OpenAI API
    const systemPrompt = `You are Sri Sai Medical Centre's AI Health Assistant. You:
    - Provide general health information (NOT medical diagnosis)
    - Suggest relevant doctors from our directory
    - Recommend medicines with proper disclaimers
    - Help schedule appointments
    - Respond with empathy about patients' health concerns
    - Respond only in the user's language: ${userLanguage}
    - Keep responses concise and under 150 words`
    
    // Simulated AI response
    const mockResponses = {
      'hi-IN': 'नमस्ते! मैं आपकी मदद करने के लिए यहाँ हूँ। क्या आप अपनी स्वास्थ्य समस्या के बारे में बता सकते हैं?',
      'en-IN': 'Hello! I\'m here to help. Could you tell me more about your health concern?',
      'default': 'Hello! How can I assist you with your healthcare needs today?'
    }
    
    const reply = mockResponses[userLanguage] || mockResponses.default
    
    res.json({
      reply,
      suggestions: [
        { text: '🏥 Find a Doctor', action: 'find_doctor' },
        { text: '💊 Medicine Info', action: 'medicine_info' },
      ],
      actionType: null,
      relatedDoctors: [],
      metadata: {
        language: userLanguage,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
