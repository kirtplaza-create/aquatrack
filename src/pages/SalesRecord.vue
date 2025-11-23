<template>
  <div class="flex-1 min-h-screen bg-[#f7faff] py-10 px-8">
    <div class="max-w-6xl mx-auto w-full">
      <div class="rounded-2xl bg-white shadow-lg p-10">
        <h2 class="text-3xl font-semibold text-[#183153] mb-8">Sales Records</h2>
        <div class="flex items-center gap-3 mb-6">
          <div class="flex items-center gap-1">
            <span class="text-gray-600">Sort by</span>
            <select class="rounded-lg border px-3 py-1 focus:ring-2 focus:ring-blue-400 outline-none">
              <option selected>Recently</option>
              <option>Oldest</option>
            </select>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-gray-600">Filter by</span>
            <div class="relative" ref="dropdownRef">
              <button
                @click="dropdownOpen = !dropdownOpen"
                class="rounded-lg border px-3 py-1 bg-white flex items-center gap-2 min-w-[94px] focus:ring-2 focus:ring-blue-400 outline-none transition hover:bg-blue-50"
              >
                <span>{{ filterStatus }}</span>
                <svg :class="{ 'rotate-180': dropdownOpen }" class="h-4 w-4 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <transition name="fade">
                <div v-if="dropdownOpen"
                  class="absolute z-20 left-0 mt-2 w-40 rounded-xl bg-white border shadow-lg py-2 text-gray-700"
                >
                  <div
                    v-for="status in statuses"
                    :key="status"
                    @click="selectStatus(status)"
                    class="px-5 py-2 cursor-pointer hover:bg-blue-100 transition-colors"
                    :class="{'font-semibold text-blue-600 bg-blue-50': filterStatus===status}"
                  >
                    {{ status }}
                  </div>
                </div>
              </transition>
            </div>
          </div>
          <div class="flex-1"></div>
          <div>
            <div class="relative">
              <input
                type="text"
                placeholder="Customer Name / Date..."
                class="rounded-xl border px-4 py-2 bg-[#f7faff] w-80 focus:border-blue-400 pl-10 focus:ring-2 focus:ring-blue-200 outline-none transition"
                v-model="searchVal"
              />
              <span class="absolute left-3 top-2.5 text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="11" cy="11" r="8" stroke-width="2"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div class="rounded-xl overflow-hidden shadow mt-2">
          <table class="min-w-full text-left text-[#183153]">
            <thead>
              <tr class="bg-blue-600 text-white">
                <th class="py-4 px-6 font-bold">Customer</th>
                <th class="py-4 px-6 font-bold">Date</th>
                <th class="py-4 px-6 font-bold">Purpose</th>
                <th class="py-4 px-6 font-bold">Gallons</th>
                <th class="py-4 px-6 font-bold">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="record in filteredRecords"
                :key="record.id"
                class="transition duration-150 hover:bg-blue-50 hover:scale-[1.01] cursor-pointer"
              >
                <td class="py-5 px-6">
                  <div class="font-semibold text-base">{{ record.customer }}</div>
                  <div class="text-xs text-gray-400 mt-1">
                    {{ record.purpose === 'Delivery' ? 'To deliver' : 'Refill schedule for' }}
                  </div>
                </td>
                <td class="py-5 px-6">
                  {{ record.date }} <br />
                  <span class="text-gray-400 text-xs">{{ record.time }}</span>
                </td>
                <td class="py-5 px-6">{{ record.purpose }}</td>
                <td class="py-5 px-6">{{ record.gallons }}</td>
                <td class="py-5 px-6 font-semibold">₱{{ record.amount }}</td>
              </tr>
              <tr v-if="filteredRecords.length === 0">
                <td colspan="5" class="px-6 py-8 text-center text-gray-400">
                  No records found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const searchVal = ref('')
const filterStatus = ref('All')
const dropdownOpen = ref(false)
const dropdownRef = ref(null)
const statuses = ['All', 'Pending', 'Completed']

function selectStatus(status) {
  filterStatus.value = status
  dropdownOpen.value = false
}

// Click outside logic for Figma-style dropdown
function handleDropdownClick(event) {
  // Only close if click outside menu and button
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false
  }
}
onMounted(() => window.addEventListener('click', handleDropdownClick))
onBeforeUnmount(() => window.removeEventListener('click', handleDropdownClick))

const records = ref([
  { id: 1, customer: 'Alec Tenorio', date: '2025-10-20', time: '2m ago', purpose: 'Walk-in', gallons: 5, amount: 100, status: 'Pending' },
  { id: 2, customer: 'Kirt Plaza', date: '2025-10-20', time: '10m ago', purpose: 'Walk-in', gallons: 5, amount: 100, status: 'Pending' },
  { id: 3, customer: 'Rammel Haga', date: '2025-10-20', time: '1h ago', purpose: 'Delivery', gallons: 10, amount: 200, status: 'Completed' },
  { id: 4, customer: 'Princess Estialbo', date: '2025-10-20', time: '2h ago', purpose: 'Delivery', gallons: 6, amount: 120, status: 'Completed' },
  { id: 5, customer: 'Leizl Juntilla', date: '2025-10-20', time: '08:00 AM', purpose: 'Delivery', gallons: 7, amount: 140, status: 'Completed' }
])

const filteredRecords = computed(() => {
  let data = records.value
  if (filterStatus.value !== 'All') {
    data = data.filter(r => r.status === filterStatus.value)
  }
  if (searchVal.value.trim()) {
    const lower = searchVal.value.toLowerCase()
    data = data.filter(r =>
      r.customer.toLowerCase().includes(lower) ||
      r.date.includes(lower) ||
      r.purpose.toLowerCase().includes(lower)
    )
  }
  return data
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
