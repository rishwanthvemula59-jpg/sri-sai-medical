// src/services/chatService.js
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

/**
 * Send message to AI chatbot
 * @param {Object} params - Chat parameters
 * @param {string} params.message - User message
 * @param {string} params.userLanguage - User's preferred language
 * @param {Array} params.context - Previous messages for context
 * @returns {Promise} Chatbot response
 */
export const sendMessage = async ({ message, userLanguage = 'en', context = [] }) => {
  try {
    const response = await axios.post(`${API_BASE}/chat`, {
      message,
      userLanguage,
      context,
    })
    
    return {
      success: true,
      reply: response.data.reply,
      suggestions: response.data.suggestions || [],
      actionType: response.data.actionType || null,
      relatedDoctors: response.data.relatedDoctors || [],
      metadata: response.data.metadata || {},
    }
  } catch (error) {
    console.error('Chat API error:', error)
    
    return {
      success: false,
      reply: 'Sorry, I encountered an error. Please try again in a moment.',
      error: error.response?.data?.message || error.message,
    }
  }
}

/**
 * Get quick suggestions
 * @returns {Promise} Array of quick action suggestions
 */
export const getQuickSuggestions = async () => {
  return [
    { text: '🏥 Find a Doctor', action: 'find_doctor' },
    { text: '💊 Medicine Info', action: 'medicine_info' },
    { text: '📅 Book Appointment', action: 'book_appointment' },
    { text: '❓ Health Questions', action: 'health_faq' },
    { text: '📞 Contact Us', action: 'contact' },
  ]
}

/**
 * Analyze user message to extract intent
 * @param {string} message - User message
 * @returns {Object} Extracted intent and entities
 */
export const analyzeMessage = (message) => {
  const lowerMessage = message.toLowerCase()
  
  // Simple intent detection
  const intents = {
    doctor: /\b(doctor|physician|specialist|consultation)\b/.test(lowerMessage),
    medicine: /\b(medicine|drug|prescription|medication)\b/.test(lowerMessage),
    appointment: /\b(appointment|booking|schedule|reserve)\b/.test(lowerMessage),
    symptom: /\b(pain|hurt|sick|dizzy|fever|cough)\b/.test(lowerMessage),
    emergency: /\b(emergency|urgent|critical|help|911)\b/.test(lowerMessage),
  }
  
  return {
    message,
    intent: Object.entries(intents).find(([, v]) => v)?.[0] || 'general',
    intents,
  }
}

export default {
  sendMessage,
  getQuickSuggestions,
  analyzeMessage,
}
