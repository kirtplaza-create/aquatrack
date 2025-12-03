<template>
  <div
    :class="[
      'relative min-h-screen max-w-full overflow-x-hidden bg-white py-6 px-4 md:px-8 space-y-8',
      showAddSale || confirmDeleteModal.show ? 'overflow-hidden' : ''
    ]"
  >
    <!-- Top Greeting Banner -->
    <div
      class="rounded-2xl bg-gradient-to-r from-[#246af3] via-[#357Cf5] to-[#3588ff] text-white py-6 px-10 flex justify-between items-center shadow-lg"
    >
      <div>
        <h1 class="text-3xl font-bold mb-1">Welcome back, Owner</h1>
        <p class="text-base font-light">
          Here's what's happening with your business today
        </p>
      </div>
      <div class="flex items-center gap-4">
        <!-- reserve for future quick actions -->
      </div>
    </div>

    <!-- Top Card Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Total Revenue -->
      <div
        class="rounded-2xl bg-white p-6 flex items-center shadow transition duration-200 hover:shadow-lg hover:-translate-y-1"
      >
        <div class="flex items-center gap-6 w-full justify-between">
          <div>
            <div class="rounded-xl bg-violet-100 p-3 inline-block mb-2">
              <span class="text-2xl text-violet-600">₱</span>
            </div>
            <div class="font-semibold text-slate-600">Total Revenue</div>
            <div class="text-2xl font-bold text-slate-900 mt-1">
              ₱{{ totalRevenue }}
            </div>
          </div>
          <span
            class="bg-violet-600 text-white px-4 py-1 rounded-full text-sm font-medium"
          >
            Today
          </span>
        </div>
      </div>

      <!-- Collectables -->
      <div
        class="rounded-2xl bg-white p-6 flex items-center shadow transition duration-200 hover:shadow-lg hover:-translate-y-1"
      >
        <div class="flex items-center gap-6 w-full justify-between">
          <div>
            <div class="rounded-xl bg-orange-100 p-3 inline-block mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8v4l3 3"
                />
              </svg>
            </div>
            <div class="font-semibold text-slate-600">Collectables</div>
            <div class="text-2xl font-bold text-slate-900 mt-1">
              {{ totalCollectables }}
            </div>
          </div>
          <span
            class="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium"
          >
            Today
          </span>
        </div>
      </div>

      <!-- Add New Sale -->
      <button
        type="button"
        class="rounded-2xl bg-gradient-to-r from-[#246af3] to-[#3588ff] p-6 shadow flex flex-col justify-between cursor-pointer relative transition duration-200 hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        @click="openAddSale"
      >
        <div class="flex items-center gap-4">
          <span
            class="bg-white/20 rounded-xl p-3 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M6 20h12M10 6l4 4-4 4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <div>
            <div class="text-white font-semibold text-sm">Add New Sale</div>
            <div class="text-xl font-bold text-white">Click to Add</div>
          </div>
        </div>
      </button>
    </div>

    <!-- Add / Edit Sales Modal -->
    <div
      v-if="showAddSale"
      class="fixed inset-0 z-40 flex items-center justify-center"
    >
      <!-- Fullscreen blurred overlay -->
      <div class="fixed inset-0 bg-black/40 backdrop-blur-lg"></div>

      <div
        class="bg-gradient-to-r from-[#246af3] via-[#357Cf5] to-[#3588ff] rounded-2xl p-8 w-full max-w-md relative shadow-lg animate-fadeIn"
      >
        <button
          type="button"
          class="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold transition hover:scale-125"
          @click="closeAddSale"
        >
          ×
        </button>
        <h2 class="text-2xl font-bold text-white mb-6">
          {{ sale.id ? "Edit Sale" : "Add Sales" }}
        </h2>

        <form @submit.prevent="saveSale">
          <!-- Customer Name -->
          <div class="mb-4">
            <label class="block text-white mb-1">Customer Name: (Optional)</label>
            <input
              v-model="sale.name"
              type="text"
              class="w-full px-3 py-2 rounded-xl border border-gray-200 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <!-- Purpose -->
          <div class="mb-4">
            <label class="block text-white mb-1">Purpose:</label>
            <select
              v-model="sale.purpose"
              class="w-full px-3 py-2 rounded-xl border border-gray-200 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            >
              <option disabled value="">Select</option>
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
              required
            />
          </div>

          <!-- Price + Total -->
          <div class="mb-4 flex flex-col md:flex-row gap-3">
            <div class="flex-1">
              <label class="block text-white mb-1">Price per Gallon:</label>
              <input
                v-model.number="sale.price_per_gallon"
                type="number"
                min="1"
                class="w-full px-3 py-2 rounded-xl border border-gray-200 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                required
              />
              <span class="text-xs text-white">Auto Fills</span>
            </div>
            <div class="flex-1">
              <label class="block text-white mb-1">Total Amount:</label>
              <input
                :value="totalAmount"
                type="text"
                class="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white/80"
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
              required
            >
              <option disabled value="">Select</option>
              <option value="Collectables">Collectables</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <!-- Buttons -->
          <div class="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              class="flex-1 bg-black text-white py-3 rounded-xl font-semibold transition hover:bg-gray-800 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!isSaleFormValid"
            >
              {{ sale.id ? "Update Sale" : "Save Sale" }}
            </button>

            <button
              type="button"
              class="flex-1 bg-white text-blue-600 py-3 rounded-xl font-semibold transition hover:bg-blue-100 hover:scale-[1.02]"
              @click="closeAddSale"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Main Grids -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <!-- Total Sales Summary -->
      <div
        class="rounded-2xl bg-white p-6 shadow-lg transition duration-200 hover:shadow-xl hover:-translate-y-1"
      >
        <div class="font-semibold text-2xl mb-1 text-slate-900">
          Total Sales Summary
        </div>
        <div class="text-base text-slate-500 mb-6">
          Overview of your sales performance
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="rounded-xl bg-green-50 p-5 flex flex-col">
            <span class="text-green-500 text-2xl mb-2">₱</span>
            <span class="font-semibold text-slate-500">Gross Revenue</span>
            <span class="font-bold text-xl text-slate-900 mt-1">
              ₱{{ totalEarnings }}
            </span>
          </div>
          <div class="rounded-xl bg-blue-50 p-5 flex flex-col">
            <span class="text-blue-500 text-2xl mb-2">👜</span>
            <span class="font-semibold text-slate-500">Total Gallons Sold</span>
            <span class="font-bold text-xl text-slate-900 mt-1">
              {{ totalGallonsSold }} <span class="text-xs">gallons</span>
            </span>
          </div>
          <div class="rounded-xl bg-purple-50 p-5 flex flex-col">
            <span class="text-purple-500 text-2xl mb-2">₱</span>
            <span class="font-semibold text-slate-500">Avg Sales per Day</span>
            <span class="font-bold text-xl text-slate-900 mt-1">
              ₱{{ avgSalesPerDay }}
            </span>
          </div>
          <div class="rounded-xl bg-orange-50 p-5 flex flex-col">
            <span class="text-orange-500 text-2xl mb-2">🧾</span>
            <span class="font-semibold text-slate-500">Total Transactions</span>
            <span class="font-bold text-xl text-slate-900 mt-1">
              {{ totalTransactions }}
              <span class="text-xs text-green-600">completed</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Total Refills Overview -->
      <div
        class="rounded-2xl bg-white p-6 shadow-lg transition duration-200 hover:shadow-xl hover:-translate-y-1"
      >
        <div class="font-semibold text-2xl mb-1 text-slate-900">
          Total Refills Overview
        </div>
        <div class="text-base text-slate-500 mb-6">
          Breakdown of refill types and volumes
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="rounded-xl bg-sky-50 p-5 flex flex-col">
            <span class="text-sky-500 text-2xl mb-2">📦</span>
            <span class="font-semibold text-slate-500">
              Total Refills Completed
            </span>
            <span class="font-bold text-xl text-slate-900 mt-1">
              {{ totalRefillsCompleted }}
            </span>
          </div>
          <div class="rounded-xl bg-green-50 p-5 flex flex-col">
            <span class="text-green-500 text-2xl mb-2">🚶</span>
            <span class="font-semibold text-slate-500">Walk-in Refills</span>
            <span class="font-bold text-xl text-slate-900 mt-1">
              {{ walkInRefills }}
            </span>
          </div>
          <div class="rounded-xl bg-purple-50 p-5 flex flex-col">
            <span class="text-purple-500 text-2xl mb-2">🚚</span>
            <span class="font-semibold text-slate-500">Delivery Refills</span>
            <span class="font-bold text-xl text-slate-900 mt-1">
              {{ deliveryRefills }}
            </span>
          </div>
          <div class="rounded-xl bg-blue-50 p-5 flex flex-col">
            <span class="text-blue-500 text-2xl mb-2">💧</span>
            <span class="font-semibold text-slate-500">
              Total Gallons Dispensed
            </span>
            <span class="font-bold text-xl text-slate-900 mt-1">
              {{ totalGallonsDispensed }}
              <span class="text-xs">gallons</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Overview -->
    <div class="rounded-2xl bg-white p-8 shadow-lg">
      <div class="mb-4">
        <div class="text-2xl font-semibold text-gray-800">
          Transaction Overview
        </div>
        <div class="text-base text-gray-500">
          All transactions and orders
        </div>
      </div>

      <div class="flex flex-col md:flex-row gap-4 items-center mb-6">
        <div class="flex-1 w-full">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search customer name..."
              class="w-full py-3 pl-12 rounded-xl bg-[#f5faff] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400 transition"
            />
            <span class="absolute left-4 top-3.5 text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </span>
          </div>
        </div>

        <div class="flex gap-2">
          <button
            :class="[
              'rounded-xl px-6 py-2 text-sm font-semibold shadow transition',
              activeFilter === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-blue-100'
            ]"
            @click="setFilter('All')"
          >
            All
          </button>
          <button
            :class="[
              'rounded-xl px-6 py-2 text-sm font-semibold shadow transition',
              activeFilter === 'Done'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-blue-100'
            ]"
            @click="setFilter('Done')"
          >
            Done
          </button>
          <button
            :class="[
              'rounded-xl px-6 py-2 text-sm font-semibold shadow transition',
              activeFilter === 'Collectables'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-orange-600 hover:bg-orange-100'
            ]"
            @click="setFilter('Collectables')"
          >
            Collectables
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-gray-700">
          <thead>
            <tr class="border-b bg-slate-50">
              <th class="px-4 py-3 font-semibold text-left">Customer</th>
              <th class="px-4 py-3 font-semibold text-left">Type</th>
              <th class="px-4 py-3 font-semibold text-left">Date &amp; Time</th>
              <th class="px-4 py-3 font-semibold text-left">Gallons</th>
              <th class="px-4 py-3 font-semibold text-left">Amount</th>
              <th class="px-4 py-3 font-semibold text-left">Status</th>
              <th class="px-4 py-3 font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
           <tr
            v-for="tx in paginatedTodayTransactions"
            :key="tx.id"
            class="border-b last:border-0 transition duration-150 hover:bg-blue-50"
          >

              <!-- Customer -->
              <td class="px-4 py-3 flex items-center gap-3">
                <span
                  class="rounded-full bg-blue-500 text-white w-9 h-9 flex items-center justify-center font-semibold shadow-sm"
                >
                  {{ (tx.name || "?").charAt(0) }}
                </span>
                <span class="font-medium text-gray-800">{{ tx.name }}</span>
              </td>

              <!-- Type -->
              <td class="px-4 py-3">
                <span
                  :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
                    tx.purpose === 'Walk-in'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  ]"
                >
                  {{ tx.purpose }}
                </span>
              </td>

              <!-- Date & Time -->
              <td class="px-4 py-3">
                <span class="block">
                  {{ tx.created_at ? tx.created_at.slice(0, 10) : "" }}
                </span>
                <span class="text-gray-400 text-xs">
                  {{ tx.created_at ? tx.created_at.slice(11, 19) : "" }}
                </span>
              </td>

              <!-- Gallons -->
              <td class="px-4 py-3 flex items-center gap-2">
                <span class="text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M8 20v-5m8 5v-5m3-9a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2h9a2 2 0 002-2V6z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <span>{{ tx.gallons }} gal</span>
              </td>

              <!-- Amount -->
              <td class="px-4 py-3 font-bold">₱{{ tx.total_amount }}</td>

              <!-- Status -->
              <td class="px-4 py-3">
                <button
                  v-if="tx.status === 'Collectables'"
                  type="button"
                  @click="confirmAndMarkDone(tx)"
                  class="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full hover:bg-orange-100 hover:text-orange-700 transition"
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

              <!-- Actions -->
              <td class="px-4 py-3">
                <div class="flex gap-2">
                  <button
                    type="button"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100"
                    @click="openEdit(tx)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100"
                    @click="openConfirmDelete(tx)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
            <div class="flex items-center justify-between mt-4">
      <p class="text-sm text-gray-500">
        Showing
        <span class="font-semibold">
          {{ paginatedTodayTransactions.length }}
        </span>
        of
        <span class="font-semibold">
          {{ todaysSortedTransactions.length }}
        </span>
        transactions today
      </p>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="px-3 py-1 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 disabled:opacity-40"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Prev
        </button>

        <span class="text-sm text-gray-600">
          Page {{ currentPage }} of {{ totalPages }}
        </span>

        <button
          type="button"
          class="px-3 py-1 rounded-lg text-sm font-medium border border-gray-300 text-gray-700 disabled:opacity-40"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>

      </div>
    </div>

    

    <!-- Admin password confirmation for delete -->
    <div
      v-if="confirmDeleteModal.show"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- Fullscreen blurred overlay -->
      <div class="fixed inset-0 bg-black/40 backdrop-blur-lg"></div>

      <!-- Modal card with smooth animation -->
      <div
        class="relative z-50 bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg animate-fadeIn"
      >
        <h3 class="text-lg font-semibold text-gray-800 mb-2">
          Confirm Delete
        </h3>
        <p class="text-sm text-gray-600 mb-4">
          Enter the admin password to delete this transaction.
        </p>

        <input
          v-model="adminPasswordInput"
          type="password"
          placeholder="Admin password"
          class="w-full mb-4 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
        />

        <div class="flex justify-end gap-3">
          <button
            type="button"
            class="px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"
            @click="closeConfirmDelete"
          >
            Cancel
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700"
            @click="onConfirmDeleteClick"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSalesStore } from "../stores/useSalesStore";
import { mapState, mapGetters, mapActions } from "pinia";

export default {
  name: "Dashboard",
  data() {
  return {
    adminPasswordInput: "",
    txToEdit: null, // NEW: transaction waiting to be edited
  };
},

  computed: {
    ...mapState(useSalesStore, [
      "showAddSale",
      "sale",
      "activeFilter",
      "transactions",
      "confirmDeleteModal",
    ]),
    ...mapGetters(useSalesStore, [
      "totalAmount",
      "filteredTransactions",
      "totalRevenue",
      "totalCollectables",
      "totalEarnings",
      "totalGallonsSold",
      "avgSalesPerDay",
      "totalTransactions",
      "totalRefillsCompleted",
      "walkInRefills",
      "deliveryRefills",
      "totalGallonsDispensed",
    ]),

    // NEW: sorted version of filteredTransactions (newest first)
    sortedTransactions() {
      return [...this.filteredTransactions].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    },

    // only today's transactions (by date part)
    todaysSortedTransactions() {
      const today = new Date();
      const y = today.getFullYear();
      const m = today.getMonth();
      const d = today.getDate();

      return this.sortedTransactions.filter((tx) => {
        if (!tx.created_at) return false;
        const tDate = new Date(tx.created_at);
        return (
          tDate.getFullYear() === y &&
          tDate.getMonth() === m &&
          tDate.getDate() === d
        );
      });
    },

    // pagination state (stored in Pinia)
    currentPage: {
      get() {
        const store = useSalesStore();
        return store.currentPage || 1;
      },
      set(val) {
        const store = useSalesStore();
        store.currentPage = val;
      },
    },

    perPage() {
      return 10;
    },

    totalPages() {
      return Math.max(
        1,
        Math.ceil(this.todaysSortedTransactions.length / this.perPage)
      );
    },

    paginatedTodayTransactions() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.todaysSortedTransactions.slice(start, end);
    },

    // writable computed so v-model works with Pinia state
    searchQuery: {
      get() {
        const store = useSalesStore();
        return store.searchQuery;
      },
      set(value) {
        const store = useSalesStore();
        store.searchQuery = value;
      },
    },

    isSaleFormValid() {
      const s = this.sale;
      return (
        s.name &&
        s.name.trim() !== "" &&
        (s.purpose === "Walk-in" || s.purpose === "Delivery") &&
        s.gallons > 0 &&
        s.price_per_gallon > 0 &&
        (s.status === "Collectables" || s.status === "Done")
      );
    },
  },
  methods: {
    ...mapActions(useSalesStore, [
      "saveSale",
      "setFilter",
      "confirmAndMarkDone",
      "openAddSale",
      "closeAddSale",
      "fetchTransactions",
      "openEditSale",
      "deleteTransaction",
      "openConfirmDelete",
      "closeConfirmDelete",
      "confirmDeleteWithPassword",
    ]),
    openEdit(tx) {
      this.openEditSale(tx);
    },
    onConfirmDeleteClick() {
      this.confirmDeleteWithPassword(this.adminPasswordInput);
    },
  },
  mounted() {
    this.fetchTransactions();
  },
};
</script>

<style scoped>
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-fadeIn {
  animation: fadeInScale 0.25s ease-out both;
}
</style>