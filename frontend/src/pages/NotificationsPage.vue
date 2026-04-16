<template>
  <div class="min-h-screen surf-default py-3xl md:py-4xl">
    <div class="max-w-4xl mx-auto px-lg md:px-2xl">
      <!-- Header -->
      <div class="mb-3xl flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-manrope font-bold text-primary mb-md">Notifications</h1>
          <p class="text-secondary">{{ unreadCount }} unread notification{{ unreadCount !== 1 ? 's' : '' }}</p>
        </div>
        <button
          v-if="unreadCount > 0"
          @click="markAllAsRead"
          class="px-lg py-md rounded-lg bg-primary-100 text-primary-950 font-600 hover:bg-primary-200 transition-colors"
        >
          Mark all as read
        </button>
      </div>

      <!-- Notification Filters -->
      <div class="flex gap-md mb-2xl overflow-x-auto pb-md">
        <button
          v-for="type in ['All', 'Appointment', 'Prescription', 'Alert']"
          :key="type"
          @click="selectedType = type"
          :class="[
            'px-lg py-md rounded-lg font-600 whitespace-nowrap transition-colors',
            selectedType === type
              ? 'bg-primary-950 text-white'
              : 'bg-neutral-100 text-secondary hover:bg-neutral-200'
          ]"
        >
          {{ type }}
        </button>
      </div>

      <!-- Notifications List -->
      <div v-if="filteredNotifications.length > 0" class="space-y-md">
        <div
          v-for="notif in filteredNotifications"
          :key="notif.id"
          :class="[
            'card p-lg cursor-pointer transition-all',
            !notif.read ? 'border-l-4 border-primary-950 bg-primary-50' : ''
          ]"
          @click="markAsRead(notif.id)"
        >
          <div class="flex justify-between items-start mb-md">
            <div>
              <h4 class="text-lg font-bold text-primary mb-sm">{{ notif.title }}</h4>
              <p class="text-secondary">{{ notif.message }}</p>
            </div>
            <span
              :class="[
                'px-md py-sm rounded-full text-xs font-bold whitespace-nowrap',
                notif.type === 'Appointment' ? 'bg-blue-100 text-blue-900' :
                notif.type === 'Prescription' ? 'bg-green-100 text-green-900' :
                'bg-yellow-100 text-yellow-900'
              ]"
            >
              {{ notif.type }}
            </span>
          </div>
          <p class="text-tertiary text-sm">{{ formatTime(notif.timestamp) }}</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-4xl">
        <div class="text-6xl mb-lg">🔔</div>
        <h3 class="text-2xl font-bold text-primary mb-md">All caught up!</h3>
        <p class="text-secondary">You have no notifications at the moment</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedType = ref('All')

const notifications = ref([
  { id: 1, title: 'Appointment Confirmed', message: 'Your appointment with Dr. Smith is confirmed for tomorrow at 2 PM', type: 'Appointment', timestamp: Date.now() - 600000, read: false },
  { id: 2, title: 'Prescription Ready', message: 'Your prescription from Dr. Johnson is ready for pickup', type: 'Prescription', timestamp: Date.now() - 3600000, read: false },
  { id: 3, title: 'Health Alert', message: 'Time to take your medication', type: 'Alert', timestamp: Date.now() - 7200000, read: true },
  { id: 4, title: 'Appointment Reminder', message: 'You have an appointment in 30 minutes', type: 'Appointment', timestamp: Date.now() - 86400000, read: true },
  { id: 5, title: 'Lab Results Available', message: 'Your lab test results are now available', type: 'Prescription', timestamp: Date.now() - 172800000, read: true },
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

const filteredNotifications = computed(() => {
  return notifications.value.filter(notif => {
    if (selectedType.value === 'All') return true
    return notif.type === selectedType.value
  })
})

const markAsRead = (id) => {
  const notif = notifications.value.find(n => n.id === id)
  if (notif) notif.read = true
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}

const formatTime = (timestamp) => {
  const diff = Date.now() - timestamp
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}
</script>
