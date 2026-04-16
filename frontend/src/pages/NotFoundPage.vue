<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="min-h-screen surf-default flex items-center justify-center py-3xl px-lg">
    <div class="card p-3xl text-center max-w-md mx-auto">
      <div class="text-9xl font-bold text-primary mb-lg">404</div>
      <h1 class="text-3xl font-manrope font-bold text-primary mb-md">Page Not Found</h1>
      <p class="text-secondary mb-2xl">Sorry, the page you're looking for doesn't exist.</p>
      <router-link to="/" class="inline-block px-2xl py-md rounded-lg bg-primary-950 text-white font-bold hover:bg-primary-900 transition-colors">
        Back to Home
      </router-link>
    </div>
  </div>
</template>
