<template>
  <div class="min-h-screen surf-default py-3xl md:py-4xl">
    <div class="max-w-4xl mx-auto px-lg md:px-2xl">
      <!-- Header -->
      <div class="mb-3xl">
        <h1 class="text-4xl font-manrope font-bold text-primary mb-md">Scan Medicine</h1>
        <p class="text-secondary">Scan barcode to get medicine details instantly</p>
      </div>

      <!-- Camera Section -->
      <div class="card p-2xl mb-2xl">
        <div class="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg aspect-video flex flex-col items-center justify-center mb-2xl">
          <div class="text-6xl mb-lg">📷</div>
          <p class="text-neutral-400 text-lg font-600">Camera Preview</p>
          <p class="text-neutral-500 text-sm mt-md">Point at barcode to scan</p>
        </div>

        <!-- Scan Status -->
        <div class="grid grid-cols-3 gap-md mb-2xl">
          <div class="text-center p-lg bg-neutral-50 rounded-lg">
            <div class="text-2xl font-bold text-primary">{{ scans }}</div>
            <p class="text-sm text-tertiary mt-sm">Scans Today</p>
          </div>
          <div class="text-center p-lg bg-green-50 rounded-lg">
            <div class="text-2xl font-bold text-green-600">{{ successfulScans }}</div>
            <p class="text-sm text-tertiary mt-sm">Successful</p>
          </div>
          <div class="text-center p-lg bg-yellow-50 rounded-lg">
            <div class="text-2xl font-bold text-yellow-600">{{ failedScans }}</div>
            <p class="text-sm text-tertiary mt-sm">Failed</p>
          </div>
        </div>

        <!-- Control Buttons -->
        <div class="flex gap-md">
          <button
            @click="startScan"
            class="flex-1 py-md rounded-lg bg-primary-950 text-white font-600 hover:bg-primary-900 transition-colors"
          >
            ▶ Start Scanning
          </button>
          <button
            @click="stopScan"
            class="flex-1 py-md rounded-lg bg-neutral-200 text-neutral-900 font-600 hover:bg-neutral-300 transition-colors"
          >
            ⏹ Stop Scanning
          </button>
        </div>
      </div>

      <!-- Recent Scans -->
      <div class="card p-2xl">
        <h3 class="text-2xl font-bold text-primary mb-lg">Recent Scans</h3>
        <div v-if="recentScans.length > 0" class="space-y-md">
          <div
            v-for="scan in recentScans"
            :key="scan.id"
            class="flex justify-between items-center p-lg bg-neutral-50 rounded-lg"
          >
            <div>
              <p class="font-bold text-primary">{{ scan.name }}</p>
              <p class="text-sm text-tertiary">Barcode: {{ scan.barcode }}</p>
            </div>
            <span class="px-md py-sm bg-green-100 text-green-900 rounded-lg text-xs font-bold">{{ scan.dosage }}</span>
          </div>
        </div>
        <div v-else class="text-center py-3xl">
          <p class="text-tertiary">No scans yet</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const scans = ref(5)
const successfulScans = ref(4)
const failedScans = ref(1)

const recentScans = ref([
  { id: 1, name: 'Aspirin', barcode: '8901234567890', dosage: '500mg' },
  { id: 2, name: 'Amoxicillin', barcode: '8901234567891', dosage: '250mg' },
  { id: 3, name: 'Cetirizine', barcode: '8901234567892', dosage: '10mg' },
])

const startScan = () => {
  alert('Scanner started - Point your camera at a barcode')
}

const stopScan = () => {
  alert('Scanner stopped')
}
</script>
