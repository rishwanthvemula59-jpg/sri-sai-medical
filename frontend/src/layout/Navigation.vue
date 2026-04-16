<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chatStore'

const router = useRouter()
const chatStore = useChatStore()
const mobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/', icon: 'home' },
  { name: 'Doctors', path: '/doctors', icon: 'person_search' },
  { name: 'Medicines', path: '/medicines', icon: 'medication' },
  { name: 'Scan', path: '/scan', icon: 'qr_code_scanner' },
  { name: 'Notifications', path: '/notifications', icon: 'notifications' },
  { name: 'Contact', path: '/contact', icon: 'location_on' },
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const goToPage = (path) => {
  router.push(path)
  mobileMenuOpen.value = false
}
</script>

<template>
  <nav class="sticky top-0 z-50 surf-container shadow-soft-md">
    <div class="max-w-7xl mx-auto px-lg md:px-2xl">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-md">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-950 to-primary-700 flex items-center justify-center">
            <span class="text-white font-bold text-lg">🏥</span>
          </div>
          <span class="hidden md:block font-manrope font-bold text-lg text-primary">
            Sri Sai Medical
          </span>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center gap-lg">
          <router-link
            v-for="link in navLinks.slice(0, 3)"
            :key="link.path"
            :to="link.path"
            class="text-body-sm text-secondary hover:text-primary-950 transition-colors font-500"
            :class="{ 'text-primary-950': $route.path === link.path }"
          >
            {{ link.name }}
          </router-link>
        </div>

        <!-- Right Section -->
        <div class="flex items-center gap-md">
          <!-- Language Selector (desktop) -->
          <select
            v-model="chatStore.userLanguage"
            @change="(e) => chatStore.setUserLanguage(e.target.value)"
            class="hidden md:block px-md py-sm rounded-lg surf-default border border-neutral-200 text-secondary text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-950"
          >
            <option value="en-IN">🇮🇳 English</option>
            <option value="hi-IN">हिंदी</option>
            <option value="ta-IN">தமிழ்</option>
            <option value="te-IN">తెలుగు</option>
            <option value="mr-IN">मराठी</option>
          </select>

          <!-- Admin Button -->
          <router-link
            to="/admin"
            class="hidden md:block px-md py-sm rounded-lg surf-default hover:bg-neutral-100 transition-colors text-secondary text-sm"
          >
            Admin
          </router-link>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-md hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <span v-if="!mobileMenuOpen" class="material-symbols-outlined">menu</span>
            <span v-else class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden pb-lg border-t border-neutral-100"
      >
        <div class="flex flex-col gap-sm mt-lg">
          <button
            v-for="link in navLinks"
            :key="link.path"
            @click="goToPage(link.path)"
            class="w-full text-left px-lg py-md rounded-lg text-body-sm text-secondary hover:bg-neutral-100 transition-colors"
            :class="{ 'bg-primary-50 text-primary-950': $route.path === link.path }"
          >
            {{ link.name }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
}
</style>
