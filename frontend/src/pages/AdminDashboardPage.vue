<template>
  <div class="min-h-screen surf-default py-3xl md:py-4xl">
    <div class="max-w-7xl mx-auto px-lg md:px-2xl">
      <!-- Header -->
      <div class="mb-3xl flex justify-between items-center">
        <div>
          <h1 class="text-4xl font-manrope font-bold text-primary mb-md">Admin Dashboard</h1>
          <p class="text-secondary">Welcome back, Administrator</p>
        </div>
        <button class="px-lg py-md rounded-lg bg-primary-100 text-primary-950 font-bold hover:bg-primary-200 transition-colors">
          📊 Generate Report
        </button>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg mb-3xl">
        <div class="card p-lg">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-tertiary text-sm mb-sm">Total Appointments</p>
              <p class="text-3xl font-bold text-primary">248</p>
            </div>
            <span class="text-3xl">📅</span>
          </div>
          <p class="text-green-600 text-sm mt-md">↑ 12% from last month</p>
        </div>

        <div class="card p-lg">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-tertiary text-sm mb-sm">Active Doctors</p>
              <p class="text-3xl font-bold text-primary">18</p>
            </div>
            <span class="text-3xl">👨‍⚕️</span>
          </div>
          <p class="text-tertiary text-sm mt-md">All departments covered</p>
        </div>

        <div class="card p-lg">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-tertiary text-sm mb-sm">Patients Served</p>
              <p class="text-3xl font-bold text-primary">1,234</p>
            </div>
            <span class="text-3xl">👥</span>
          </div>
          <p class="text-green-600 text-sm mt-md">↑ 8% from last month</p>
        </div>

        <div class="card p-lg">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-tertiary text-sm mb-sm">Revenue</p>
              <p class="text-3xl font-bold text-primary">₹4.2L</p>
            </div>
            <span class="text-3xl">💰</span>
          </div>
          <p class="text-green-600 text-sm mt-md">↑ 15% from last month</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-2xl">
        <!-- Recent Appointments -->
        <div class="lg:col-span-2 card p-2xl">
          <h3 class="text-xl font-bold text-primary mb-lg">Recent Appointments</h3>
          <div class="space-y-md">
            <div v-for="apt in recentAppointments" :key="apt.id" class="flex justify-between items-center p-md bg-neutral-50 rounded-lg">
              <div>
                <p class="font-bold text-primary">{{ apt.patient }}</p>
                <p class="text-sm text-tertiary">Dr. {{ apt.doctor }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-600 text-secondary">{{ apt.time }}</p>
                <span
                  :class="[
                    'inline-block px-md py-sm rounded-lg text-xs font-bold mt-sm',
                    apt.status === 'Completed' ? 'bg-green-100 text-green-900' :
                    apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-900' :
                    'bg-blue-100 text-blue-900'
                  ]"
                >
                  {{ apt.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Doctor Performance -->
        <div class="card p-2xl">
          <h3 class="text-xl font-bold text-primary mb-lg">Top Doctors</h3>
          <div class="space-y-md">
            <div v-for="doc in topDoctors" :key="doc.id" class="p-md bg-neutral-50 rounded-lg">
              <div class="flex justify-between items-start mb-sm">
                <p class="font-bold text-primary">Dr. {{ doc.name }}</p>
                <span class="text-yellow-500">⭐ {{ doc.rating }}</span>
              </div>
              <div class="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                <div class="h-full bg-primary-950" :style="{ width: doc.rating * 20 + '%' }"></div>
              </div>
              <p class="text-xs text-tertiary mt-md">{{ doc.appointments }} appointments</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-2xl grid grid-cols-2 md:grid-cols-4 gap-lg">
        <button class="card p-lg text-center hover:shadow-lg transition-all">
          <div class="text-3xl mb-md">➕</div>
          <p class="font-bold text-primary">Add Doctor</p>
        </button>
        <button class="card p-lg text-center hover:shadow-lg transition-all">
          <div class="text-3xl mb-md">📋</div>
          <p class="font-bold text-primary">View Reports</p>
        </button>
        <button class="card p-lg text-center hover:shadow-lg transition-all">
          <div class="text-3xl mb-md">💊</div>
          <p class="font-bold text-primary">Manage Medicines</p>
        </button>
        <button class="card p-lg text-center hover:shadow-lg transition-all">
          <div class="text-3xl mb-md">⚙️</div>
          <p class="font-bold text-primary">Settings</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const recentAppointments = ref([
  { id: 1, patient: 'Rajesh Kumar', doctor: 'Smith', time: 'Today 2:30 PM', status: 'Pending' },
  { id: 2, patient: 'Priya Singh', doctor: 'Johnson', time: 'Today 1:00 PM', status: 'Completed' },
  { id: 3, patient: 'Amit Patel', doctor: 'Williams', time: 'Yesterday 4:00 PM', status: 'Completed' },
  { id: 4, patient: 'Neha Verma', doctor: 'Brown', time: 'Tomorrow 10:00 AM', status: 'Scheduled' },
])

const topDoctors = ref([
  { id: 1, name: 'Smith', rating: 4.8, appointments: 145 },
  { id: 2, name: 'Johnson', rating: 4.7, appointments: 132 },
  { id: 3, name: 'Williams', rating: 4.6, appointments: 128 },
])
</script>
