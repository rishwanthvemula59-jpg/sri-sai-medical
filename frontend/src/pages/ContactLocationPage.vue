<template>
  <div class="min-h-screen surf-default py-3xl md:py-4xl">
    <div class="max-w-7xl mx-auto px-lg md:px-2xl">
      <!-- Header -->
      <div class="mb-3xl">
        <h1 class="text-4xl font-manrope font-bold text-primary mb-md">Contact & Location</h1>
        <p class="text-secondary text-lg">Get in touch with us or visit our clinic</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3xl">
        <!-- Contact Information -->
        <div class="space-y-2xl">
          <!-- Main Contact Card -->
          <div class="card p-2xl">
            <h2 class="text-2xl font-bold text-primary mb-lg">Sri Sai Medical Centre</h2>
            
            <div class="space-y-lg">
              <!-- Address -->
              <div class="flex gap-lg">
                <div class="text-3xl">📍</div>
                <div>
                  <p class="font-bold text-primary mb-sm">Address</p>
                  <p class="text-secondary">123 Medical Plaza, Healthcare Lane<br/>New Delhi, Delhi 110001</p>
                </div>
              </div>

              <!-- Phone -->
              <div class="flex gap-lg">
                <div class="text-3xl">📞</div>
                <div>
                  <p class="font-bold text-primary mb-sm">Phone</p>
                  <p class="text-secondary"><a href="tel:+911234567890" class="text-primary hover:underline">+91 123 456 7890</a></p>
                  <p class="text-secondary"><a href="tel:+911234567891" class="text-primary hover:underline">+91 123 456 7891</a></p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex gap-lg">
                <div class="text-3xl">✉️</div>
                <div>
                  <p class="font-bold text-primary mb-sm">Email</p>
                  <p class="text-secondary"><a href="mailto:contact@srisaimedical.com" class="text-primary hover:underline">contact@srisaimedical.com</a></p>
                </div>
              </div>

              <!-- Hours -->
              <div class="flex gap-lg">
                <div class="text-3xl">⏰</div>
                <div>
                  <p class="font-bold text-primary mb-sm">Hours</p>
                  <p class="text-secondary">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p class="text-secondary">Sat: 10:00 AM - 4:00 PM</p>
                  <p class="text-secondary">Sun: Emergency Only</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Services -->
          <div class="card p-2xl">
            <h3 class="text-xl font-bold text-primary mb-lg">Our Services</h3>
            <ul class="space-y-md">
              <li class="flex items-center gap-md">
                <span class="text-primary-950 text-lg">✓</span>
                <span class="text-secondary">General Consultation</span>
              </li>
              <li class="flex items-center gap-md">
                <span class="text-primary-950 text-lg">✓</span>
                <span class="text-secondary">Emergency Care</span>
              </li>
              <li class="flex items-center gap-md">
                <span class="text-primary-950 text-lg">✓</span>
                <span class="text-secondary">Lab Tests & Diagnostics</span>
              </li>
              <li class="flex items-center gap-md">
                <span class="text-primary-950 text-lg">✓</span>
                <span class="text-secondary">Specialist Consultation</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="card p-2xl h-fit">
          <h3 class="text-2xl font-bold text-primary mb-lg">Send us a Message</h3>
          
          <form @submit.prevent="submitForm" class="space-y-md">
            <div>
              <label class="block text-sm font-bold text-primary mb-sm">Full Name</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Your name"
                class="w-full px-lg py-md rounded-lg border-2 border-neutral-200 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label class="block text-sm font-bold text-primary mb-sm">Email</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                class="w-full px-lg py-md rounded-lg border-2 border-neutral-200 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label class="block text-sm font-bold text-primary mb-sm">Phone</label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="+91 123 456 7890"
                class="w-full px-lg py-md rounded-lg border-2 border-neutral-200 focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label class="block text-sm font-bold text-primary mb-sm">Message</label>
              <textarea
                v-model="form.message"
                placeholder="Your message here..."
                rows="5"
                class="w-full px-lg py-md rounded-lg border-2 border-neutral-200 focus:outline-none focus:border-primary transition-colors"
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full py-md rounded-lg bg-primary-950 text-white font-bold hover:bg-primary-900 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <!-- Map Placeholder -->
      <div class="mt-3xl card p-0 overflow-hidden">
        <div class="w-full h-[400px] bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
          <div class="text-center">
            <div class="text-6xl mb-lg">🗺️</div>
            <p class="text-neutral-600 font-600">Google Maps Integration Coming Soon</p>
            <p class="text-neutral-500 text-sm mt-md">Location: 123 Medical Plaza, New Delhi</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  message: '',
})

const submitForm = () => {
  if (form.value.name && form.value.email && form.value.message) {
    alert('Message sent successfully! We will get back to you soon.')
    form.value = { name: '', email: '', phone: '', message: '' }
  } else {
    alert('Please fill all required fields')
  }
}
</script>
