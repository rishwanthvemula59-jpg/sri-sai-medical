<template>
  <div class="min-h-screen surf-default py-3xl md:py-4xl">
    <div class="max-w-7xl mx-auto px-lg md:px-2xl">
      <!-- Header -->
      <div class="mb-3xl">
        <h1 class="text-4xl font-manrope font-bold text-primary mb-md">Our Doctors</h1>
        <p class="text-secondary text-lg max-w-2xl">Find and connect with our team of experienced healthcare professionals</p>
      </div>

      <!-- Search & Filters -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-lg mb-3xl">
        <div class="md:col-span-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search doctors by name..."
            class="w-full px-lg py-md rounded-lg border-2 border-neutral-200 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <select
          v-model="selectedSpecialty"
          class="px-lg py-md rounded-lg border-2 border-neutral-200 focus:outline-none focus:border-primary transition-colors"
        >
          <option value="">All Specialties</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="General">General Practice</option>
        </select>
        <select
          v-model="selectedStatus"
          class="px-lg py-md rounded-lg border-2 border-neutral-200 focus:outline-none focus:border-primary transition-colors"
        >
          <option value="">All Status</option>
          <option value="available">Available Now</option>
          <option value="busy">Busy</option>
        </select>
      </div>

      <!-- Results Count -->
      <div class="mb-lg">
        <p class="text-secondary text-sm">
          Showing <span class="font-bold text-primary">{{ filteredDoctors.length }}</span> of <span class="font-bold">{{ allDoctors.length }}</span> doctors
        </p>
      </div>

      <!-- Doctor Grid -->
      <div v-if="filteredDoctors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2xl">
        <div
          v-for="doctor in filteredDoctors"
          :key="doctor.id"
          class="card p-lg hover:shadow-lg transition-all duration-300 cursor-pointer group"
          @click="selectDoctor(doctor)"
        >
          <!-- Doctor Image Placeholder -->
          <div class="mb-lg w-full h-48 bg-gradient-to-br from-primary-100 to-primary-50 rounded-lg flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
            <div class="text-5xl">👨‍⚕️</div>
          </div>

          <!-- Doctor Info -->
          <h3 class="text-xl font-manrope font-bold text-primary mb-sm">Dr. {{ doctor.name }}</h3>
          <p class="text-secondary mb-md">{{ doctor.specialty }}</p>

          <!-- Rating -->
          <div class="flex items-center gap-sm mb-md">
            <span class="text-yellow-500">★★★★★</span>
            <span class="text-tertiary text-sm">({{ doctor.reviews }} reviews)</span>
          </div>

          <!-- Status Badge -->
          <div class="flex items-center gap-sm mb-lg">
            <span
              :class="[
                'w-3 h-3 rounded-full animate-pulse',
                doctor.status === 'available' ? 'bg-green-500' : 'bg-primary-950'
              ]"
            ></span>
            <span
              :class="[
                'text-sm font-600',
                doctor.status === 'available' ? 'text-green-600' : 'text-primary-950'
              ]"
            >
              {{ doctor.status === 'available' ? 'Available Now' : 'Busy' }}
            </span>
          </div>

          <!-- Experience -->
          <p class="text-tertiary text-sm mb-lg">{{ doctor.experience }} years experience</p>

          <!-- CTA Button -->
          <button
            class="w-full py-md rounded-lg bg-primary-950 text-white font-600 hover:bg-primary-900 transition-colors"
            @click.stop="bookAppointment(doctor)"
          >
            Book Appointment
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-4xl">
        <div class="text-6xl mb-lg">🔍</div>
        <h3 class="text-2xl font-bold text-primary mb-md">No doctors found</h3>
        <p class="text-secondary mb-lg max-w-md mx-auto">Try adjusting your search or filters</p>
        <button
          class="px-2xl py-md rounded-lg bg-primary-950 text-white font-600 hover:bg-primary-900 transition-colors"
          @click="resetFilters"
        >
          Reset Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDoctorStore } from '../stores/doctorStore'

const doctorStore = useDoctorStore()
const searchQuery = ref('')
const selectedSpecialty = ref('')
const selectedStatus = ref('')

const allDoctors = computed(() => doctorStore.doctors)

const filteredDoctors = computed(() => {
  return allDoctors.value.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesSpecialty = !selectedSpecialty.value || doc.specialty === selectedSpecialty.value
    const matchesStatus = !selectedStatus.value || doc.status === selectedStatus.value
    return matchesSearch && matchesSpecialty && matchesStatus
  })
})

const selectDoctor = (doctor) => {
  doctorStore.selectDoctor(doctor.id)
}

const bookAppointment = (doctor) => {
  alert(`Appointment booking for Dr. ${doctor.name} - Coming soon!`)
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedSpecialty.value = ''
  selectedStatus.value = ''
}
</script>
