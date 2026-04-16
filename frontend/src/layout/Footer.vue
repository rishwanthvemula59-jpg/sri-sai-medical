<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <footer class="surf-container border-t border-neutral-100 mt-3xl">
    <div class="max-w-7xl mx-auto px-lg md:px-2xl py-2xl md:py-3xl">
      <!-- Footer Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-2xl md:gap-3xl mb-2xl">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-md mb-md">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-950 to-primary-700 flex items-center justify-center">
              <span class="text-white font-bold">🏥</span>
            </div>
            <span class="font-manrope font-bold text-primary">Sri Sai Medical</span>
          </div>
          <p class="text-body-sm text-tertiary">
            Premium healthcare technology for modern clinics.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-manrope font-600 text-primary mb-md">Quick Links</h4>
          <ul class="space-y-sm">
            <li>
              <router-link
                to="/"
                class="text-body-sm text-text-secondary hover:text-primary-950 transition-colors"
              >
                Home
              </router-link>
            </li>
            <li>
              <router-link
                to="/doctors"
                class="text-body-sm text-text-secondary hover:text-primary-950 transition-colors"
              >
                Find Doctor
              </router-link>
            </li>
            <li>
              <router-link
                to="/medicines"
                class="text-body-sm text-text-secondary hover:text-primary-950 transition-colors"
              >
                Medicines
              </router-link>
            </li>
            <li>
              <router-link
                to="/contact"
                class="text-body-sm text-text-secondary hover:text-primary-950 transition-colors"
              >
                Contact
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h4 class="font-manrope font-600 text-primary mb-md">Support</h4>
          <ul class="space-y-sm">
            <li>
              <a
                href="#"
                class="text-body-sm text-text-secondary hover:text-primary-950 transition-colors"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-body-sm text-text-secondary hover:text-primary-950 transition-colors"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-body-sm text-text-secondary hover:text-primary-950 transition-colors"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-body-sm text-text-secondary hover:text-primary-950 transition-colors"
              >
                Help Center
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-manrope font-600 text-primary mb-md">Contact</h4>
          <p class="text-body-sm text-text-secondary mb-md">
            📞 +91 (555) 123-4567
          </p>
          <p class="text-body-sm text-text-secondary mb-md">
            📧 support@srisaimedical.com
          </p>
          <p class="text-body-sm text-text-secondary">
            🕐 24/7 Customer Support
          </p>
        </div>
      </div>

      <!-- Divider -->
      <div class="h-px bg-neutral-100 mb-lg"></div>

      <!-- Bottom -->
      <div class="flex items-center justify-between">
        <p class="text-body-sm text-text-tertiary">
          © {{ currentYear }} Sri Sai Medical Centre. All rights reserved.
        </p>
        <div class="flex items-center gap-md">
          <a href="#" class="text-text-tertiary hover:text-primary-950 transition-colors">
            <span class="text-lg">f</span>
          </a>
          <a href="#" class="text-text-tertiary hover:text-primary-950 transition-colors">
            <span class="text-lg">𝕏</span>
          </a>
          <a href="#" class="text-text-tertiary hover:text-primary-950 transition-colors">
            <span class="text-lg">in</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
