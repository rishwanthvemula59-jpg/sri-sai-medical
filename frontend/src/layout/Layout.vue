<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useDoctorStore } from '@/stores/doctorStore'
import Navigation from './Navigation.vue'
import Footer from './Footer.vue'
import ChatBot from '@/components/ChatBot.vue'
import VoiceAssistant from '@/components/VoiceAssistant.vue'

const doctorStore = useDoctorStore()

onMounted(() => {
  // Fetch real-time doctor availability
  doctorStore.fetchDoctorsRealtime()
})

onUnmounted(() => {
  // Clean up Firebase listeners
  doctorStore.cleanup()
})
</script>

<template>
  <div class="min-h-screen flex flex-col" style="background-color: #f5f3f1;">
    <!-- Navigation -->
    <Navigation />

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Floating AI Components -->
    <ChatBot />
    <VoiceAssistant />
  </div>
</template>
