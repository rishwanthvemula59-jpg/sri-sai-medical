// src/stores/userStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const preferredLanguage = ref(localStorage.getItem('language') || 'en-IN')
  const voiceEnabled = ref(localStorage.getItem('voiceEnabled') !== 'false')
  const textSize = ref(localStorage.getItem('textSize') || 'md')
  const theme = ref(localStorage.getItem('theme') || 'light')
  const isAuthenticated = ref(false)
  const user = ref(null)
  const notifications = ref({
    doctorAvailable: true,
    appointmentReminder: true,
    medicineRefill: true,
  })
  
  // Actions
  const setLanguage = (language) => {
    preferredLanguage.value = language
    localStorage.setItem('language', language)
  }
  
  const setVoiceEnabled = (enabled) => {
    voiceEnabled.value = enabled
    localStorage.setItem('voiceEnabled', enabled ? 'true' : 'false')
  }
  
  const setTextSize = (size) => {
    textSize.value = size
    localStorage.setItem('textSize', size)
  }
  
  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }
  
  const setNotificationPreference = (type, enabled) => {
    notifications.value[type] = enabled
    localStorage.setItem(
      `notification_${type}`,
      enabled ? 'true' : 'false'
    )
  }
  
  const setUser = (userData) => {
    user.value = userData
    isAuthenticated.value = !!userData
  }
  
  const logout = () => {
    user.value = null
    isAuthenticated.value = false
  }
  
  const loadPreferences = () => {
    // Load from localStorage if available
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage) preferredLanguage.value = savedLanguage
    
    const savedVoice = localStorage.getItem('voiceEnabled')
    if (savedVoice !== null) voiceEnabled.value = savedVoice !== 'false'
    
    const savedTextSize = localStorage.getItem('textSize')
    if (savedTextSize) textSize.value = savedTextSize
    
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) theme.value = savedTheme
  }
  
  return {
    // State
    preferredLanguage,
    voiceEnabled,
    textSize,
    theme,
    isAuthenticated,
    user,
    notifications,
    
    // Actions
    setLanguage,
    setVoiceEnabled,
    setTextSize,
    setTheme,
    setNotificationPreference,
    setUser,
    logout,
    loadPreferences,
  }
})
