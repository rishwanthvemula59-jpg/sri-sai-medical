<template>
  <div class="min-h-screen surf-default py-3xl md:py-4xl">
    <div class="max-w-7xl mx-auto px-lg md:px-2xl">
      <!-- Header -->
      <div class="mb-3xl">
        <h1 class="text-4xl font-manrope font-bold text-primary mb-md">Medicines</h1>
        <p class="text-secondary text-lg">Find detailed information about medicines and prescriptions</p>
      </div>

      <!-- Search -->
      <div class="mb-3xl">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search medicines..."
          class="w-full px-lg py-md rounded-lg border-2 border-neutral-200 focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <!-- Medicine Grid -->
      <div v-if="filteredMedicines.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2xl">
        <div
          v-for="med in filteredMedicines"
          :key="med.id"
          class="card p-lg cursor-pointer hover:shadow-lg transition-all"
          @click="selectMedicine(med)"
        >
          <div class="flex items-start justify-between mb-lg">
            <div>
              <h3 class="text-lg font-bold text-primary mb-sm">{{ med.name }}</h3>
              <p class="text-secondary text-sm">{{ med.type }}</p>
            </div>
            <span class="px-md py-sm bg-primary-100 text-primary-900 rounded-lg text-xs font-bold">{{ med.dosage }}</span>
          </div>

          <div class="space-y-md mb-lg">
            <div class="flex justify-between">
              <span class="text-tertiary">Manufacturer:</span>
              <span class="text-secondary font-500">{{ med.manufacturer }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-tertiary">Price:</span>
              <span class="text-primary font-bold">₹{{ med.price }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-tertiary">Stock:</span>
              <span class="text-green-600 font-500">{{ med.stock }} available</span>
            </div>
          </div>

          <button
            class="w-full py-md rounded-lg bg-primary-950 text-white font-600 hover:bg-primary-900 transition-colors"
            @click.stop="addToCart(med)"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-4xl">
        <div class="text-6xl mb-lg">💊</div>
        <p class="text-secondary">No medicines found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const medicines = ref([
  { id: 1, name: 'Aspirin', type: 'Tablet', dosage: '500mg', manufacturer: 'Bayer', price: 45, stock: 120 },
  { id: 2, name: 'Amoxicillin', type: 'Capsule', dosage: '250mg', manufacturer: 'Cipla', price: 78, stock: 85 },
  { id: 3, name: 'Cetirizine', type: 'Tablet', dosage: '10mg', manufacturer: 'Sun Pharma', price: 35, stock: 200 },
  { id: 4, name: 'Omeprazole', type: 'Capsule', dosage: '20mg', manufacturer: 'Ranbaxy', price: 95, stock: 60 },
  { id: 5, name: 'Paracetamol', type: 'Tablet', dosage: '650mg', manufacturer: 'GlaxoSmithKline', price: 25, stock: 350 },
  { id: 6, name: 'Ibuprofen', type: 'Tablet', dosage: '400mg', manufacturer: 'Dr. Reddy\'s', price: 55, stock: 140 },
])

const filteredMedicines = computed(() => {
  return medicines.value.filter(med =>
    med.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectMedicine = (med) => {
  console.log('Selected:', med)
}

const addToCart = (med) => {
  alert(`${med.name} added to cart`)
}
</script>
