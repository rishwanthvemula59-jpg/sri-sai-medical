// src/services/firebaseService.js
import { initializeApp } from 'firebase/app'
import { getDatabase, onValue, ref, set, update, get } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: `https://${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseio.com`,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const auth = getAuth(app)
export const firestore = getFirestore(app)

/**
 * Listen to doctor availability changes in real-time
 * @param {Function} callback - Called with doctors array when data changes
 * @returns {Function} Unsubscribe function
 */
export const subscribeToDoctorAvailability = (callback) => {
  const doctorsRef = ref(db, '/doctors')
  
  const unsubscribe = onValue(doctorsRef, (snapshot) => {
    if (snapshot.exists()) {
      const doctors = snapshot.val()
      const doctorArray = Object.entries(doctors).map(([id, data]) => ({
        id,
        ...data,
      }))
      callback(doctorArray)
    } else {
      callback([])
    }
  })
  
  return unsubscribe
}

/**
 * Fetch single doctor details
 * @param {string} docId - Doctor ID
 * @returns {Promise} Doctor object
 */
export const fetchDoctor = async (docId) => {
  try {
    const doctorRef = ref(db, `/doctors/${docId}`)
    const snapshot = await get(doctorRef)
    
    if (snapshot.exists()) {
      return { id: docId, ...snapshot.val() }
    }
    return null
  } catch (error) {
    console.error('Error fetching doctor:', error)
    throw error
  }
}

/**
 * Update doctor status (admin only)
 * @param {string} docId - Doctor ID
 * @param {string} status - New status: AVAILABLE, BUSY, OFFLINE
 */
export const updateDoctorStatus = async (docId, status) => {
  try {
    await update(ref(db, `/doctors/${docId}`), {
      status,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error updating doctor status:', error)
    throw error
  }
}

/**
 * Save appointment to database
 * @param {Object} appointmentData - Appointment details
 * @returns {Promise} Firebase response
 */
export const saveAppointment = async (appointmentData) => {
  try {
    const appointmentId = `appt_${Date.now()}`
    await set(ref(db, `/appointments/${appointmentId}`), {
      ...appointmentData,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
    })
    return appointmentId
  } catch (error) {
    console.error('Error saving appointment:', error)
    throw error
  }
}

/**
 * Save chat message to database
 * @param {Object} messageData - Message details
 * @returns {Promise} Firebase response
 */
export const saveChatMessage = async (messageData) => {
  try {
    const messageId = `msg_${Date.now()}`
    await set(ref(db, `/messages/${messageId}`), {
      ...messageData,
      timestamp: new Date().toISOString(),
    })
    return messageId
  } catch (error) {
    console.error('Error saving message:', error)
    throw error
  }
}

/**
 * Subscribe to notifications
 * @param {Function} callback - Called with notifications array
 * @returns {Function} Unsubscribe function
 */
export const subscribeToNotifications = (callback) => {
  const notificationsRef = ref(db, '/notifications')
  
  const unsubscribe = onValue(notificationsRef, (snapshot) => {
    if (snapshot.exists()) {
      const notifications = snapshot.val()
      const notificationArray = Object.entries(notifications)
        .map(([id, data]) => ({ id, ...data }))
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      
      callback(notificationArray)
    } else {
      callback([])
    }
  })
  
  return unsubscribe
}

/**
 * Get clinic info
 * @returns {Promise} Clinic information
 */
export const getClinicInfo = async () => {
  try {
    const clinicRef = ref(db, '/clinic')
    const snapshot = await get(clinicRef)
    
    if (snapshot.exists()) {
      return snapshot.val()
    }
    return null
  } catch (error) {
    console.error('Error fetching clinic info:', error)
    throw error
  }
}

export default {
  subscribeToDoctorAvailability,
  fetchDoctor,
  updateDoctorStatus,
  saveAppointment,
  saveChatMessage,
  subscribeToNotifications,
  getClinicInfo,
}
