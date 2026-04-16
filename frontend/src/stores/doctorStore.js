// src/stores/doctorStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { subscribeToDoctorAvailability, updateDoctorStatus } from '@/services/firebaseService'

export const useDoctorStore = defineStore('doctor', () => {
  // State
  const doctors = ref([])
  const selectedDoctor = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const filter = ref('ALL') // ALL, AVAILABLE, BUSY, OFFLINE
  const searchQuery = ref('')
  const specialtyFilter = ref('')
  
  let unsubscribe = null
  
  // Computed
  const filteredDoctors = computed(() => {
    let result = [...doctors.value]
    
    // Apply status filter
    if (filter.value !== 'ALL') {
      result = result.filter(doc => doc.status === filter.value)
    }
    
    // Apply search
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(doc =>
        doc.name?.toLowerCase().includes(query) ||
        doc.specialization?.toLowerCase().includes(query)
      )
    }
    
    // Apply specialty filter
    if (specialtyFilter.value) {
      result = result.filter(doc => doc.specialization === specialtyFilter.value)
    }
    
    return result
  })
  
  const availableDoctors = computed(() => 
    doctors.value.filter(doc => doc.status === 'AVAILABLE')
  )
  
  const specialties = computed(() => 
    [...new Set(doctors.value.map(doc => doc.specialization).filter(Boolean))]
  )
  
  // Actions
  const fetchDoctorsRealtime = () => {
    loading.value = true
    error.value = null
    
    try {
      unsubscribe = subscribeToDoctorAvailability((updatedDoctors) => {
        doctors.value = updatedDoctors
        loading.value = false
      })
    } catch (err) {
      error.value = err.message
      loading.value = false
    }
  }
  
  const setFilter = (newFilter) => {
    filter.value = newFilter
  }
  
  const setSearchQuery = (query) => {
    searchQuery.value = query
  }
  
  const setSpecialtyFilter = (specialty) => {
    specialtyFilter.value = specialty
  }
  
  const selectDoctor = (doctor) => {
    selectedDoctor.value = doctor
  }
  
  const updateDoctorAvailability = async (docId, status) => {
    try {
      await updateDoctorStatus(docId, status)
      // Firebase will trigger real-time update
    } catch (err) {
      error.value = err.message
      throw err
    }
  }
  
  const addNotification = (docId, type = 'doctor_available') => {
    const doctor = doctors.value.find(d => d.id === docId)
    if (doctor) {
      // Store notification preference (in user store later)
      console.log(`Notification added for doctor: ${doctor.name}`)
    }
  }
  
  const cleanup = () => {
    if (unsubscribe) {
      unsubscribe()
    }
  }
  
  return {
    // State
    doctors,
    selectedDoctor,
    loading,
    error,
    filter,
    searchQuery,
    specialtyFilter,
    
    // Computed
    filteredDoctors,
    availableDoctors,
    specialties,
    
    // Actions
    fetchDoctorsRealtime,
    setFilter,
    setSearchQuery,
    setSpecialtyFilter,
    selectDoctor,
    updateDoctorAvailability,
    addNotification,
    cleanup,
  }
})
