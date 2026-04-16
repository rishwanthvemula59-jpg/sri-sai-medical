// src/stores/chatStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { sendMessage } from '@/services/chatService'

export const useChatStore = defineStore('chat', () => {
  // State
  const messages = ref([])
  const isOpen = ref(false)
  const loading = ref(false)
  const error = ref(null)
  const suggestions = ref([])
  const userLanguage = ref('en-IN')
  
  // Computed
  const lastMessage = computed(() => 
    messages.value[messages.value.length - 1] || null
  )
  
  const unreadCount = computed(() =>
    messages.value.filter(m => !m.read && m.sender === 'bot').length
  )
  
  // Actions
  const toggleChat = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value && messages.value.length === 0) {
      // Add welcome message
      messages.value.push({
        id: 'welcome',
        text: '👋 Welcome to Sri Sai Medical Centre Health Assistant! How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
        read: false,
      })
    }
  }
  
  const closeChat = () => {
    isOpen.value = false
  }
  
  const openChat = () => {
    isOpen.value = true
  }
  
  const setUserLanguage = (language) => {
    userLanguage.value = language
    localStorage.setItem('chatLanguage', language)
  }
  
  const addUserMessage = (text) => {
    const message = {
      id: `msg_${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date(),
      read: true,
    }
    messages.value.push(message)
  }
  
  const addBotMessage = (text, metadata = {}) => {
    const message = {
      id: `msg_${Date.now()}`,
      text,
      sender: 'bot',
      timestamp: new Date(),
      read: false,
      suggestions: metadata.suggestions || [],
      actionType: metadata.actionType || null,
      relatedDoctors: metadata.relatedDoctors || [],
    }
    messages.value.push(message)
  }
  
  const sendUserMessage = async (messageText) => {
    if (!messageText.trim()) return
    
    // Add user message
    addUserMessage(messageText)
    loading.value = true
    error.value = null
    
    try {
      // Get context from recent messages
      const context = messages.value
        .slice(-5)
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        }))
      
      // Send to AI
      const response = await sendMessage({
        message: messageText,
        userLanguage: userLanguage.value,
        context,
      })
      
      if (response.success) {
        addBotMessage(response.reply, {
          suggestions: response.suggestions,
          actionType: response.actionType,
          relatedDoctors: response.relatedDoctors,
        })
        suggestions.value = response.suggestions
      } else {
        addBotMessage(
          'Sorry, I encountered an error. Please try again in a moment.'
        )
      }
    } catch (err) {
      error.value = err.message
      addBotMessage(
        'Something went wrong. Please try again later.'
      )
    } finally {
      loading.value = false
    }
  }
  
  const clearHistory = () => {
    messages.value = []
    localStorage.removeItem('chatHistory')
  }
  
  const saveChatHistory = () => {
    localStorage.setItem('chatHistory', JSON.stringify(messages.value))
  }
  
  const loadChatHistory = () => {
    const saved = localStorage.getItem('chatHistory')
    if (saved) {
      try {
        messages.value = JSON.parse(saved)
      } catch (err) {
        console.error('Failed to load chat history:', err)
      }
    }
  }
  
  const markMessageAsRead = (messageId) => {
    const message = messages.value.find(m => m.id === messageId)
    if (message) {
      message.read = true
    }
  }
  
  const markAllAsRead = () => {
    messages.value.forEach(m => {
      m.read = true
    })
  }
  
  return {
    // State
    messages,
    isOpen,
    loading,
    error,
    suggestions,
    userLanguage,
    
    // Computed
    lastMessage,
    unreadCount,
    
    // Actions
    toggleChat,
    closeChat,
    openChat,
    setUserLanguage,
    addUserMessage,
    addBotMessage,
    sendUserMessage,
    clearHistory,
    saveChatHistory,
    loadChatHistory,
    markMessageAsRead,
    markAllAsRead,
  }
})
