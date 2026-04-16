<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

onMounted(() => {
  try {
    userStore.loadPreferences()
  } catch (e) {
    console.error('Error loading preferences:', e)
  }
})
</script>

<template>
  <div id="app" class="min-h-screen surf-default" style="background-color: #f5f3f1;">
    <router-view />
  </div>
</template>

<style scoped>
#app {
  font-family: 'Inter', 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
</style>
