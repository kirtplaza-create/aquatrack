<template>
  <div class="flex-1 min-h-screen bg-[#f7faff] py-10 px-8">
    <div class="max-w-6xl mx-auto w-full">
      <div class="rounded-2xl bg-white shadow-lg p-10">
        <h2 class="text-3xl font-semibold text-[#183153] mb-8">Sales Records</h2>

        <!-- Filters & search -->
        <div class="flex items-center gap-3 mb-6">
          <!-- Sort -->
          <div class="flex items-center gap-1">
            <span class="text-gray-600">Sort by</span>
            <select
              v-model="sortBy"
              class="rounded-lg border px-3 py-1 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="Recently">Recently</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>

          <!-- Filter by status (now matches Collectables/Done) -->
          <div class="flex items-center gap-1">
            <span class="text-gray-600">Filter by</span>
            <div class="relative" ref="dropdownRef">
              <button
                @click="dropdownOpen = !dropdownOpen"
                class="rounded-lg border px-3 py-1 bg-white flex items-center gap-2 min-w-[94px] focus:ring-2 focus:ring-blue-400 outline-none transition hover:bg-blue-50"
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

          <div class="flex-1"></div>

          <!-- Search -->
          <div>
            <div class="relative">
              <input
                type="text"
                placeholder="Customer Name / Date..."
                class="rounded-xl border px-4 py-2 bg-[#f7faff] w-80 focus:border-blue-400 pl-10 focus:ring-2 focus:ring-blue-200 outline-none transition"
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
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="record in sortedRecords"
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
                    {{ record.created_at ? record.created_at.slice(11, 19) : '' }}
                  </span>
                </td>

                <!-- Purpose (Walk-in / Delivery) -->
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
              </tr>

              <tr v-if="sortedRecords.length === 0">
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useSalesStore } from '../stores/useSalesStore';

const salesStore = useSalesStore();

const searchVal = ref('');
const filterStatus = ref('All');
const dropdownOpen = ref(false);
const dropdownRef = ref(null);

// sort state
const sortBy = ref('Recently');

// statuses now match backend statuses
const statuses = ['All', 'Collectables', 'Done'];

function selectStatus(status) {
  filterStatus.value = status;
  dropdownOpen.value = false;
}

function handleDropdownClick(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false;
  }
}

onMounted(() => {
  window.addEventListener('click', handleDropdownClick);
  // ensure we have data
  salesStore.fetchTransactions();
});

onBeforeUnmount(() => window.removeEventListener('click', handleDropdownClick));

// all sales from store
const records = computed(() => salesStore.transactions);

// filter + search
const filteredRecords = computed(() => {
  let data = records.value;

  // status filter: uses Collectables/Done
  if (filterStatus.value !== 'All') {
    data = data.filter(r => r.status === filterStatus.value);
  }

  // search: match name, date, purpose
  if (searchVal.value.trim()) {
    const lower = searchVal.value.toLowerCase();
    data = data.filter(r =>
      (r.name || '').toLowerCase().includes(lower) ||
      (r.created_at || '').toLowerCase().includes(lower) ||
      (r.purpose || '').toLowerCase().includes(lower)
    );
  }

  return data;
});

// sort by created_at
const sortedRecords = computed(() => {
  const data = [...filteredRecords.value];

  // guard if created_at missing/invalid
  const parseDate = r => (r.created_at ? new Date(r.created_at) : new Date(0));

  if (sortBy.value === 'Oldest') {
    return data.sort((a, b) => parseDate(a) - parseDate(b));
  }

  // default: Recently
  return data.sort((a, b) => parseDate(b) - parseDate(a));
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active{
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
