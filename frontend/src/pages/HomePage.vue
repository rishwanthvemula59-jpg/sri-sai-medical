<script setup>
import { computed } from 'vue'
import { useDoctorStore } from '@/stores/doctorStore'

const doctorStore = useDoctorStore()

const availableCount = computed(() => 
  doctorStore.doctors.filter(d => d.status === 'AVAILABLE').length
)
</script>

<template>
  <div class="min-h-screen surf-default">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-950 via-primary-800 to-primary-700 text-white py-3xl md:py-4xl">
      <div class="max-w-7xl mx-auto px-lg md:px-2xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3xl items-center">
          <!-- Left Content -->
          <div class="animate-fade-in">
            <h1 class="text-h1 font-manrope font-bold mb-lg">
              Your Health, Our Priority
            </h1>
            <p class="text-body-lg text-primary-100 mb-2xl">
              Connect with Sri Sai Medical Centre for world-class healthcare, anytime, anywhere.
            </p>
            <div class="flex flex-col sm:flex-row gap-md">
              <router-link
                to="/doctors"
                class="btn btn-primary btn-lg inline-flex items-center justify-center"
              >
                Find Doctor
              </router-link>
              <button class="btn btn-lg bg-white text-primary-950 hover:bg-primary-50">
                Learn More
              </button>
            </div>
          </div>

          <!-- Right Stats -->
          <div class="grid grid-cols-2 gap-lg animate-scale-in">
            <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-2xl border border-white border-opacity-20">
              <div class="text-3xl font-bold mb-sm">{{ availableCount }}</div>
              <div class="text-primary-100 text-sm">Doctors Available</div>
            </div>
            <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-2xl border border-white border-opacity-20">
              <div class="text-3xl font-bold mb-sm">24/7</div>
              <div class="text-primary-100 text-sm">Available Support</div>
            </div>
            <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-2xl border border-white border-opacity-20">
              <div class="text-3xl font-bold mb-sm">4.9★</div>
              <div class="text-primary-100 text-sm">Trusted by 10K+ Patients</div>
            </div>
            <div class="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-2xl border border-white border-opacity-20">
              <div class="text-3xl font-bold mb-sm">500+</div>
              <div class="text-primary-100 text-sm">Medicines In Stock</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Available Doctors Section -->
    <section class="py-3xl md:py-4xl">
      <div class="max-w-7xl mx-auto px-lg md:px-2xl">
        <div class="mb-2xl">
          <h2 class="section-title">Available Doctors Now</h2>
          <p class="section-subtitle">Connect immediately with our experienced healthcare professionals</p>
        </div>

        <!-- Doctors Grid -->
        <div v-if="doctorStore.filteredDoctors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          <div
            v-for="doctor in doctorStore.availableDoctors.slice(0, 6)"
            :key="doctor.id"
            class="card hover:shadow-soft-xl transition-all duration-fast group cursor-pointer"
          >
            <!-- Doctor Avatar -->
            <div class="mb-lg">
              <div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary-200 to-primary-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-fast">
                👨‍⚕️
              </div>
            </div>

            <!-- Doctor Info -->
            <h3 class="font-manrope font-bold text-lg text-primary mb-sm group-hover:text-primary-950 transition-colors">
              {{ doctor.name }}
            </h3>
            
            <p class="text-body-sm text-secondary mb-md">
              {{ doctor.specialization }}
            </p>

            <!-- Status Badge -->
            <div class="flex items-center gap-sm mb-lg">
              <span class="inline-block w-2 h-2 bg-success-600 rounded-full animate-pulse"></span>
              <span class="text-body-sm text-success-600 font-600">Available Now</span>
            </div>

            <!-- Rating -->
            <div class="flex items-center gap-sm mb-2xl">
              <span class="text-sm font-600">⭐ {{ doctor.rating || 4.8 }}</span>
              <span class="text-xs text-tertiary">({{ doctor.reviews || 120 }} reviews)</span>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-md">
              <router-link
                :to="`/doctors?id=${doctor.id}`"
                class="flex-1 btn btn-primary btn-sm"
              >
                View Profile
              </router-link>
              <button class="btn btn-secondary btn-sm flex-1">
                Book Now
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="card text-center py-3xl">
          <p class="text-secondary mb-md">No doctors available right now</p>
          <p class="text-tertiary text-sm">Check back soon or browse all doctors</p>
        </div>

        <!-- View All -->
        <div class="text-center mt-2xl">
          <router-link
            to="/doctors"
            class="btn btn-secondary btn-lg"
          >
            View All Doctors
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-3xl md:py-4xl surf-container">
      <div class="max-w-7xl mx-auto px-lg md:px-2xl">
        <h2 class="section-title text-center mb-3xl">Why Choose Sri Sai Medical?</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-lg">
          <div class="card text-center">
            <div class="text-5xl mb-lg">🏥</div>
            <h3 class="font-manrope font-bold text-lg mb-md">Expert Doctors</h3>
            <p class="text-body-sm text-text-secondary">
              Access to top-rated medical professionals across all specializations.
            </p>
          </div>

          <div class="card text-center">
            <div class="text-5xl mb-lg">💬</div>
            <h3 class="font-manrope font-bold text-lg mb-md">AI Assistant</h3>
            <p class="text-body-sm text-text-secondary">
              24/7 health advice, medication info, and appointment scheduling in 22 languages.
            </p>
          </div>

          <div class="card text-center">
            <div class="text-5xl mb-lg">🔐</div>
            <h3 class="font-manrope font-bold text-lg mb-md">Secure & Private</h3>
            <p class="text-body-sm text-text-secondary">
              Your health data is encrypted and secure with enterprise-grade protection.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-3xl md:py-4xl">
      <div class="max-w-4xl mx-auto px-lg md:px-2xl text-center card bg-gradient-to-r from-primary-950 to-primary-800 text-white">
        <h2 class="text-h2 font-manrope font-bold mb-md">Ready to Get Better?</h2>
        <p class="text-primary-100 mb-2xl">
          Book your first appointment or chat with our AI assistant now.
        </p>
        <div class="flex flex-col sm:flex-row gap-md justify-center">
          <button class="btn btn-lg bg-white text-primary-950 hover:bg-primary-50">
            Chat Now
          </button>
          <router-link
            to="/doctors"
            class="btn btn-lg border-2 border-white text-white hover:bg-white hover:text-primary-950"
          >
            Browse Doctors
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
