<template>
  <div class="relative min-h-[calc(100vh-2rem)] bg-white py-6 px-8">
    <!-- Top Greeting Banner -->
    <div class="rounded-2xl bg-gradient-to-r from-[#246af3] via-[#357Cf5] to-[#3588ff] text-white py-7 px-14 flex justify-between items-center mb-8 shadow-lg">
      <div>
        <h1 class="text-4xl font-bold mb-1">Welcome back, Owner</h1>
        <p class="text-lg font-light">Here's what's happening with your business today</p>
      </div>
      <div class="flex items-center gap-4"></div>
    </div>

    <!-- Top Card Section -->
    <div class="grid grid-cols-3 gap-6 mb-8">
      <div class="rounded-2xl bg-white p-6 flex items-center shadow transition transform duration-200 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
        <div class="flex items-center gap-6 w-full justify-between">
          <div>
            <div class="rounded-xl bg-violet-100 p-3 inline-block mb-2">
              <span class="text-2xl text-violet-600">₱</span>
            </div>
            <div class="font-semibold text-slate-600">Total Revenue</div>
            <div class="text-2xl font-bold text-slate-900 mt-1">₱{{ totalRevenue }}</div>
          </div>
          <span class="bg-violet-600 text-white px-4 py-1 rounded-full font-medium transition hover:bg-violet-700">Today</span>
        </div>
      </div>

      <div class="rounded-2xl bg-white p-6 flex items-center shadow transition transform duration-200 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
        <div class="flex items-center gap-6 w-full justify-between">
          <div>
            <div class="rounded-xl bg-orange-100 p-3 inline-block mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3" />
              </svg>
            </div>
            <div class="font-semibold text-slate-600">Collectables</div>
            <div class="text-2xl font-bold text-slate-900 mt-1">{{ totalCollectables }}</div>
          </div>
          <span class="bg-orange-500 text-white px-4 py-1 rounded-full font-medium transition hover:bg-orange-600">Today</span>
        </div>
      </div>

      <div
        class="rounded-2xl bg-gradient-to-r from-[#246af3] to-[#3588ff] p-6 shadow flex flex-col justify-between cursor-pointer relative transition transform duration-200 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 hover:bg-[#246af3]/90"
        @click="openAddSale"
      >
        <div class="flex items-center gap-4">
          <span class="bg-white/20 rounded-xl p-3 transition hover:bg-white/40">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 20h12M10 6l4 4-4 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <div>
            <div class="text-white font-semibold">Add New Sale</div>
            <div class="text-xl font-bold text-white">Click to Add</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Sales Modal -->
    <!-- Add Sales Modal -->
<div v-if="showAddSale" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
  <div class="bg-gradient-to-r from-[#246af3] via-[#357Cf5] to-[#3588ff] rounded-2xl p-8 w-[500px] relative shadow-lg animate-fadeIn">
    <button
      class="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold transition hover:scale-125"
      @click="closeAddSale"
    >×</button>
    <h2 class="text-2xl font-bold text-white mb-6">Add Sales</h2>

    <form @submit.prevent="saveSale">
      <!-- Customer Name -->
      <div class="mb-4">
        <label class="block text-white mb-1">Customer Name:</label>
        <input
          v-model="sale.name"
          type="text"
          class="w-full px-3 py-2 rounded-xl border border-gray-200 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <!-- Purpose -->
      <div class="mb-4">
        <label class="block text-white mb-1">Purpose:</label>
        <select
          v-model="sale.purpose"
          class="w-full px-3 py-2 rounded-xl border border-gray-200 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="">Select</option>
          <option value="Walk-in">Walk-in</option>
          <option value="Delivery">Delivery</option>
        </select>
      </div>

      <!-- Gallons -->
      <div class="mb-4">
        <label class="block text-white mb-1">No. Gallons:</label>
        <input
          v-model.number="sale.gallons"
          type="number"
          min="1"
          class="w-full px-3 py-2 rounded-xl border border-gray-200 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <!-- Price + Total -->
      <div class="mb-4 flex gap-2">
        <div class="flex-1">
          <label class="block text-white mb-1">Price per Gallon:</label>
          <input
            v-model.number="sale.price_per_gallon"
            type="number"
            min="1"
            class="w-full px-3 py-2 rounded-xl border border-gray-200 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <span class="text-xs text-white">Auto Fills</span>
        </div>
        <div class="flex-1">
          <label class="block text-white mb-1">Total Amount:</label>
          <input
            :value="totalAmount"
            type="text"
            class="w-full px-3 py-2 rounded-xl border border-gray-200 transition"
            readonly
          />
          <span class="text-xs text-white">Auto Calculates</span>
        </div>
      </div>

      <!-- Status -->
      <div class="mb-6">
        <label class="block text-white mb-1">Payment Status:</label>
        <select
          v-model="sale.status"
          class="w-full px-3 py-2 rounded-xl border border-gray-200 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        >
          <option value="">Select</option>
          <option value="Collectables">Collectables</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <!-- Buttons -->
      <div class="flex gap-4">
        <button
          type="submit"
          class="flex-1 bg-black text-white py-3 rounded-xl font-semibold transition hover:bg-gray-800 hover:scale-105"
          :disabled="!isSaleFormValid"
          :class="{ 'opacity-50 cursor-not-allowed': !isSaleFormValid }"
        >Save Sale</button>

        <button
          type="button"
          class="flex-1 bg-white text-blue-600 py-3 rounded-xl font-semibold transition hover:bg-blue-100 hover:scale-105"
          @click="closeAddSale"
        >Cancel</button>
      </div>
    </form>
  </div>
</div>  

    <!-- Main Grids -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Total Sales Summary -->
      <div class="rounded-2xl bg-white p-6 shadow-lg mb-6 transition transform duration-200 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
        <div class="font-semibold text-2xl mb-1 text-slate-900">Total Sales Summary</div>
        <div class="text-base text-slate-500 mb-6">Overview of your sales performance</div>
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-xl bg-green-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-green-500 text-2xl">₱</span>
            </div>
            <span class="font-semibold text-slate-500">Gross Revenue</span>
            <span class="font-bold text-xl text-slate-900 mt-1">₱{{ totalEarnings }}</span>
          </div>
          <div class="rounded-xl bg-blue-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-blue-500 text-2xl">👜</span>
            </div>
            <span class="font-semibold text-slate-500">Total Gallons Sold</span>
            <span class="font-bold text-xl text-slate-900 mt-1">{{ totalGallonsSold }} <span class="text-xs">gallons</span></span>
          </div>
          <div class="rounded-xl bg-purple-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-purple-500 text-2xl">₱</span>
            </div>
            <span class="font-semibold text-slate-500">Avg Sales per Day</span>
            <span class="font-bold text-xl text-slate-900 mt-1">₱{{ avgSalesPerDay }}</span>
          </div>
          <div class="rounded-xl bg-orange-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-orange-500 text-2xl">🧾</span>
            </div>
            <span class="font-semibold text-slate-500">Total Transactions</span>
            <span class="font-bold text-xl text-slate-900 mt-1">{{ totalTransactions }} <span class="text-xs text-green-600">completed</span></span>
          </div>
        </div>
      </div>
      <!-- Total Refills Overview -->
      <div class="rounded-2xl bg-white p-6 shadow-lg mb-6 transition transform duration-200 hover:shadow-xl hover:scale-105 hover:-translate-y-1">
        <div class="font-semibold text-2xl mb-1 text-slate-900">Total Refills Overview</div>
        <div class="text-base text-slate-500 mb-6">Breakdown of refill types and volumes</div>
        <div class="grid grid-cols-2 gap-4">
          <div class="rounded-xl bg-sky-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sky-500 text-2xl">📦</span>
            </div>
            <span class="font-semibold text-slate-500">Total Refills Completed</span>
            <span class="font-bold text-xl text-slate-900 mt-1">{{ totalRefillsCompleted }}</span>
          </div>
          <div class="rounded-xl bg-green-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-green-500 text-2xl">🚶</span>
            </div>
            <span class="font-semibold text-slate-500">Walk-in Refills</span>
            <span class="font-bold text-xl text-slate-900 mt-1">{{ walkInRefills }}</span>
          </div>
          <div class="rounded-xl bg-purple-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-purple-500 text-2xl">🚚</span>
            </div>
            <span class="font-semibold text-slate-500">Delivery Refills</span>
            <span class="font-bold text-xl text-slate-900 mt-1">{{ deliveryRefills }}</span>
          </div>
          <div class="rounded-xl bg-blue-50 p-5 flex flex-col">
            <div class="flex justify-between items-center mb-2">
              <span class="text-blue-500 text-2xl">💧</span>
            </div>
            <span class="font-semibold text-slate-500">Total Gallons Dispensed</span>
            <span class="font-bold text-xl text-slate-900 mt-1">{{ totalGallonsDispensed }} <span class="text-xs">gallons</span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Overview Section Starts Here -->
    <div class="rounded-2xl bg-white p-8 shadow-lg mt-8">
      <div class="mb-2">
        <div class="text-2xl font-semibold text-gray-800">Transaction Overview</div>
        <div class="text-base text-gray-500">All transactions and orders</div>
      </div>
      <div class="flex gap-4 items-center mb-8">
        <div class="flex-1">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search customer name..."
              class="w-full py-3 pl-12 rounded-xl bg-[#f5faff] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400 transition"
            />
            <span class="absolute left-4 top-3.5 text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="11" cy="11" r="8" stroke-width="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"/>
              </svg>
            </span>
          </div>
        </div>
        <div class="flex gap-2">      
          <button
            :class="[
              'rounded-xl px-6 py-2 font-semibold shadow transition',
              activeFilter === 'All' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-200'
            ]"
            @click="setFilter('All')"
          >All</button>
          <button
            :class="[
              'rounded-xl px-6 py-2 font-semibold shadow transition',
              activeFilter === 'Done' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-200'
            ]"
            @click="setFilter('Done')"
          >Done</button>
          <button
            :class="[
              'rounded-xl px-6 py-2 font-semibold shadow transition',
              activeFilter === 'Collectables' ? 'bg-orange-500 text-white' : 'bg-white text-orange-600 hover:bg-orange-100'
            ]"
            @click="setFilter('Collectables')"
          >Collectables</button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-gray-700">
          <thead>
            <tr class="border-b">
              <th class="px-4 py-3 font-semibold text-left">Customer</th>
              <th class="px-4 py-3 font-semibold text-left">Type</th>
              <th class="px-4 py-3 font-semibold text-left">Date &amp; Time</th>
              <th class="px-4 py-3 font-semibold text-left">Gallons</th>
              <th class="px-4 py-3 font-semibold text-left">Amount</th>
              <th class="px-4 py-3 font-semibold text-left">Status</th>
            </tr>
          </thead>
         <tbody>
  <tr
    v-for="tx in filteredTransactions"
    :key="tx.id"
    class="border-b transition duration-200 hover:bg-blue-50 hover:scale-[1.01]"
  >
    <!-- Customer -->
    <td class="px-4 py-3 flex items-center gap-3">
      <span class="rounded-full bg-blue-500 text-white w-9 h-9 flex items-center justify-center font-semibold shadow">
        {{ (tx.name || '?').charAt(0) }}
      </span>
      {{ tx.name }}
    </td>

    <!-- Type (purpose) -->
    <td class="px-4 py-3">
      <span
        :class="[
          'px-3 py-1 rounded-lg font-semibold',
          tx.purpose === 'Walk-in' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
        ]"
      >
        {{ tx.purpose }}
      </span>
    </td>

    <!-- Date & Time from created_at -->
    <td class="px-4 py-3">
      {{ tx.created_at ? tx.created_at.slice(0, 10) : '' }}
      <span class="text-gray-400 text-xs block">
        {{ tx.created_at ? tx.created_at.slice(11, 19) : '' }}
      </span>
    </td>

    <!-- Gallons -->
    <td class="px-4 py-3 flex items-center gap-2">
      <span class="text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M8 20v-5m8 5v-5m3-9a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h9a2 2 0 002-2V6z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      {{ tx.gallons }} gal
    </td>

    <!-- Amount -->
    <td class="px-4 py-3 font-bold">₱{{ tx.total_amount }}</td>

    <!-- Status -->
    <td class="px-4 py-3">
      <button
        v-if="tx.status === 'Collectables'"
        @click="confirmAndMarkDone(tx)"
        class="flex items-center gap-2 text-orange-500 hover:text-green-600 transition"
        style="background: transparent; border: none; padding: 0; cursor: pointer;"
        title="Mark as Done"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Collectables
      </button>
      <span v-else class="flex items-center gap-2 text-green-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          ircle cx="12" cy="12" r="10" />
          <path d="M16 12l-4 4-4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Done
      </span>
    </td>
  </tr>
</tbody>

        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { useSalesStore } from '../stores/useSalesStore';
import { mapState, mapGetters, mapActions } from 'pinia';

export default {
  name: 'Dashboard',
  computed: {
    ...mapState(useSalesStore, [
      'showAddSale',
      'sale',
      'activeFilter',
      'searchQuery',
      'transactions',
    ]),
    ...mapGetters(useSalesStore, [
      'totalAmount',
      'filteredTransactions',
      'totalRevenue',
      'totalCollectables',
      'totalEarnings',
      'totalGallonsSold',
      'avgSalesPerDay',
      'totalTransactions',
      'totalRefillsCompleted',
      'walkInRefills',
      'deliveryRefills',
      'totalGallonsDispensed',
    ]),
    isSaleFormValid() {
      const s = this.sale;
      return (
        s.name && s.name.trim() !== '' &&
        (s.purpose === 'Walk-in' || s.purpose === 'Delivery') &&
        s.gallons > 0 &&
        s.price_per_gallon > 0 &&
        (s.status === 'Collectables' || s.status === 'Done')
      );
    },
  },
  methods: {
    ...mapActions(useSalesStore, [
      'saveSale',
      'setFilter',
      'confirmAndMarkDone',
      'openAddSale',
      'closeAddSale',
      'fetchTransactions',
    ]),
  },
  mounted() {
    this.fetchTransactions();
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fadeIn {
  animation: fadeIn 0.2s;
}
</style>
