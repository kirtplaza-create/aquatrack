<template>
  <div class="flex-1 min-h-screen bg-[#f7faff] py-6 px-6">
    <div class="max-w-6xl mx-auto w-full">
      <div class="rounded-2xl bg-white shadow-lg px-8 py-6">
        <h2 class="text-2xl font-semibold text-[#183153] mb-4">Sales Records</h2>


        <!-- Filters & search -->
<div class="flex flex-col gap-3 mb-6 md:flex-row md:items-center">
  <!-- Left: Sort + Status -->
  <div class="flex items-center gap-4 flex-wrap">
    <!-- Sort -->
    <div class="flex items-center gap-2">
      <span class="text-gray-600 text-sm">Sort by</span>
      <select
        v-model="sortBy"
        class="rounded-lg border px-3 py-1 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
      >
        <option value="Recently">Recently</option>
        <option value="Oldest">Oldest</option>
      </select>
    </div>

    <!-- Filter by status -->
    <div class="flex items-center gap-2">
      <span class="text-gray-600 text-sm">Filter by</span>
      <div class="relative" ref="dropdownRef">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="rounded-lg border px-3 py-1 bg-white flex items-center gap-2 min-w-[90px] text-sm
                 focus:ring-2 focus:ring-blue-400 outline-none transition hover:bg-blue-50"
        >
          <span>{{ filterStatus }}</span>
          <svg
            :class="{ 'rotate-180': dropdownOpen }"
            class="h-4 w-4 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <transition name="fade">
          <div
            v-if="dropdownOpen"
            class="absolute z-20 left-0 mt-2 w-40 rounded-xl bg-white border shadow-lg py-2 text-gray-700"
          >
            <div
              v-for="status in statuses"
              :key="status"
              @click="selectStatus(status)"
              class="px-5 py-2 cursor-pointer hover:bg-blue-100 transition-colors"
              :class="{
                'font-semibold text-blue-600 bg-blue-50': filterStatus === status
              }"
            >
              {{ status }}
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>

  <!-- Middle: Date range -->
<div class="flex items-center gap-2">
  <span class="text-gray-600 text-sm">Date:</span>
  <button
    type="button"
    class="px-4 py-1.5 rounded-lg text-sm font-semibold border"
    :class="dateRange === 'All'
      ? 'bg-blue-600 text-white border-blue-600'
      : 'bg-white text-gray-700'"
    @click="setDateRange('All')"
  >
    All
  </button>
  <button
    type="button"
    class="px-4 py-1.5 rounded-lg text-sm font-semibold border"
    :class="dateRange === 'Today'
      ? 'bg-blue-600 text-white border-blue-600'
      : 'bg-white text-gray-700'"
    @click="setDateRange('Today')"
  >
    Today
  </button>
  <button
    type="button"
    class="px-4 py-1.5 rounded-lg text-sm font-semibold border"
    :class="dateRange === 'ThisMonth'
      ? 'bg-blue-600 text-white border-blue-600'
      : 'bg-white text-gray-700'"
    @click="setDateRange('ThisMonth')"
  >
    This Month
  </button>
</div>

  <!-- Right: Search -->
  <div class="ml-auto">
    <div class="relative">
      <input
        type="text"
        placeholder="Customer Name / Date..."
        class="rounded-xl border px-4 py-2 bg-[#f7faff] w-64 md:w-80 focus:border-blue-400 pl-10
               focus:ring-2 focus:ring-blue-200 outline-none transition text-sm"
        v-model="searchVal"
      />
      <span class="absolute left-3 top-2.5 text-blue-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8" stroke-width="2" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2" />
        </svg>
      </span>
    </div>
  </div>
</div>

        <!-- Table -->
        <div class="rounded-xl overflow-hidden shadow mt-2">
          <table class="min-w-full text-left text-[#183153]">
            <thead>
              <tr class="bg-blue-600 text-white">
                <th class="py-4 px-6 font-bold">Customer</th>
                <th class="py-4 px-6 font-bold">Date</th>
                <th class="py-4 px-6 font-bold">Purpose</th>
                <th class="py-4 px-6 font-bold">Gallons</th>
                <th class="py-4 px-6 font-bold">Amount</th>
                <th class="py-4 px-6 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="record in paginatedRecords"
                :key="record.id"
                class="transition duration-150 hover:bg-blue-50 hover:scale-[1.01] cursor-pointer"
              >
                <!-- Customer/name + helper text -->
                <td class="py-5 px-6">
                  <div class="font-semibold text-base">{{ record.name }}</div>
                  <div class="text-xs text-gray-400 mt-1">
                    {{ record.purpose === 'Delivery'
                      ? 'Delivery schedule'
                      : record.purpose === 'Walk-in'
                      ? 'Walk-in refill'
                      : 'Refill schedule' }}
                  </div>
                </td>

                <!-- Date/time from created_at -->
                <td class="py-5 px-6">
                  {{ record.created_at ? record.created_at.slice(0, 10) : '' }} <br />
                  <span class="text-gray-400 text-xs">
                    {{ formatTime(record.created_at) }}
                  </span>
                </td>


                <!-- Purpose -->
                <td class="py-5 px-6">
                  {{ record.purpose }}
                </td>

                <!-- Gallons -->
                <td class="py-5 px-6">
                  {{ record.gallons }}
                </td>

                <!-- Amount -->
                <td class="py-5 px-6 font-semibold">
                  ₱{{ record.total_amount }}
                </td>

                <!-- Status / Collectables -->
<td class="py-5 px-6">
  <button
    v-if="record.status === 'Collectables'"
    type="button"
    @click.stop="handleConfirmAndMarkDone(record)"
    class="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full
           hover:bg-orange-100 hover:text-orange-700 transition"
    title="Mark as Done"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path
        d="M12 8v4l3 3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    Collectables
  </button>

  <span
    v-else
    class="inline-flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="12" cy="12" r="10" />
      <path
        d="M16 12l-4 4-4-4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    Done
  </span>
</td>

              </tr>

              <tr v-if="paginatedRecords.length === 0">
                <td colspan="6" class="px-6 py-8 text-center text-gray-400">

                  No records found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="flex items-center justify-between mt-6"
        >
          <div class="text-sm text-gray-500">
            Page {{ currentPage }} of {{ totalPages }}
          </div>

          <div class="flex items-center gap-2">
            <button
              class="px-3 py-1 rounded-lg border text-sm disabled:opacity-40"
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
            >
              Prev
            </button>

            <button
              v-for="page in visiblePages"
              :key="page"
              class="w-8 h-8 rounded-lg text-sm flex items-center justify-center border"
              :class="page === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700'"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>

            <button
              class="px-3 py-1 rounded-lg border text-sm disabled:opacity-40"
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useSalesStore } from '../stores/useSalesStore'

const salesStore = useSalesStore()

const searchVal = ref('')
const filterStatus = ref('All')
const dropdownOpen = ref(false)
const dropdownRef = ref(null)

// sort state
const sortBy = ref('Recently')

// NEW: date range filter
const dateRange = ref('All') // 'All' | 'Today' | 'ThisMonth'

// statuses now match backend statuses
const statuses = ['All', 'Collectables', 'Done']

// pagination state
const currentPage = ref(1)
const perPage = 10

function selectStatus(status) {
  filterStatus.value = status
  dropdownOpen.value = false
  currentPage.value = 1
}

function handleConfirmAndMarkDone(tx) {
  salesStore.confirmAndMarkDone(tx)
}


function handleDropdownClick(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false
  }
}

// NEW: change date range
function setDateRange(range) {
  dateRange.value = range
  currentPage.value = 1
}

onMounted(() => {
  window.addEventListener('click', handleDropdownClick)
  salesStore.fetchTransactions()
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleDropdownClick)
})

// all sales from store
const records = computed(() => salesStore.transactions)

// filter + search + NEW date range
const filteredRecords = computed(() => {
  let data = records.value

  // status filter
  if (filterStatus.value !== 'All') {
    data = data.filter(r => r.status === filterStatus.value)
  }

  // NEW: date range filter
  if (dateRange.value !== 'All') {
    const now = new Date()
    const todayY = now.getFullYear()
    const todayM = now.getMonth()
    const todayD = now.getDate()

    data = data.filter(r => {
      if (!r.created_at) return false
      const d = new Date(r.created_at)
      const y = d.getFullYear()
      const m = d.getMonth()
      const day = d.getDate()

      if (dateRange.value === 'Today') {
        return y === todayY && m === todayM && day === todayD
      }

      if (dateRange.value === 'ThisMonth') {
        return y === todayY && m === todayM
      }

      return true
    })
  }

  // search: match name, date, purpose
  if (searchVal.value.trim()) {
    const lower = searchVal.value.toLowerCase()
    data = data.filter(r =>
      (r.name || '').toLowerCase().includes(lower) ||
      (r.created_at || '').toLowerCase().includes(lower) ||
      (r.purpose || '').toLowerCase().includes(lower)
    )
  }

  return data
})

// sort by created_at
const sortedRecords = computed(() => {
  const data = [...filteredRecords.value]

  const parseDate = r => (r.created_at ? new Date(r.created_at) : new Date(0))

  if (sortBy.value === 'Oldest') {
    return data.sort((a, b) => parseDate(a) - parseDate(b))
  }

  // default: Recently
  return data.sort((a, b) => parseDate(b) - parseDate(a))
})

// pagination derived values
const totalPages = computed(() => Math.max(1, Math.ceil(sortedRecords.value.length / perPage)))

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * perPage
  const end = start + perPage
  return sortedRecords.value.slice(start, end)
})

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

// show at most 5 page buttons around current page
const visiblePages = computed(() => {
  const pages = []
  const maxButtons = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxButtons / 2))
  let end = start + maxButtons - 1

  if (end > totalPages.value) {
    end = totalPages.value
    start = Math.max(1, end - maxButtons + 1)
  }

  for (let i = start; i <= end; i += 1) {
    pages.push(i)
  }
  return pages
})

function formatTime(datetime) {
  if (!datetime) return ''
  const d = new Date(datetime)
  let hours = d.getHours()
  const minutes = d.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  if (hours === 0) hours = 12
  return `${hours}:${minutes} ${ampm}`
}
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
