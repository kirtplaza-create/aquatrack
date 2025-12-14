<template>
  <div class="min-h-screen w-full bg-[#f7faff] flex items-center justify-center py-16 px-6">
    <div class="w-full max-w-3xl rounded-3xl bg-gradient-to-r from-[#389cff] to-[#247af3]
                shadow-2xl px-10 py-10 flex flex-col gap-8">
      <!-- Header -->
      <div>
        <h2 class="text-3xl font-bold text-white">Settings</h2>
        <p class="text-white/80 text-sm mt-1">
          Configure pricing and system options for Aquatrack.
        </p>
      </div>

      <form class="w-full flex flex-col gap-8">
        <!-- Pricing section -->
        <div>
          <h3 class="text-white font-semibold text-lg mb-3">Gallon Pricing</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Regular price -->
            <div>
              <label class="text-white text-sm font-medium mb-2 block">
                Regular Gallon Price
              </label>
              <div class="relative">
                <span
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold text-white/80 pointer-events-none">
                  ₱
                </span>
                <input
                  v-model.number="localRegular"
                  type="number"
                  min="0"
                  class="pl-8 w-full rounded-xl px-5 py-3 bg-white text-blue-700 font-semibold shadow
                         focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="15"
                />
              </div>
            </div>

            <!-- Small price -->
            <div>
              <label class="text-white text-sm font-medium mb-2 block">
                Small Gallon Price
              </label>
              <div class="relative">
                <span
                  class="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold text-white/80 pointer-events-none">
                  ₱
                </span>
                <input
                  v-model.number="localSmall"
                  type="number"
                  min="0"
                  class="pl-8 w-full rounded-xl px-5 py-3 bg-white text-blue-700 font-semibold shadow
                         focus:outline-none focus:ring-2 focus:ring-blue-200"
                  placeholder="10"
                />
              </div>
            </div>
          </div>
          <p class="text-xs text-white/80 mt-2">
            These prices are used when calculating totals for new sales.
          </p>
        </div>

        <!-- Reset section -->
<div class="pt-4 border-t border-white/20">
  <h3 class="text-white font-semibold text-lg mb-2">Reset All Data</h3>
  <p class="text-white/80 text-xs mb-3">
    Permanently delete all sales records from the system.
  </p>
  <button
    type="button"
    @click="showReset = true"
    class="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2.5
           rounded-xl font-semibold transition hover:bg-red-700 hover:scale-[1.01] shadow"
  >
    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M12 9v4m0 4h.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M10.29 3.86l-8.08 14a2 2 0 001.72 3h16.14a2 2 0 001.72-3l-8.08-14a2 2 0 00-3.44 0z"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      />
    </svg>
    Reset System
  </button>
</div>

<!-- Buttons -->
<div class="flex flex-col sm:flex-row gap-3 justify-end">
  <button
    type="button"
    @click="save"
    class="flex-1 sm:flex-none sm:w-40 flex items-center justify-center gap-2 bg-black text-white
           py-2.5 rounded-xl font-semibold transition hover:bg-gray-900 hover:scale-[1.01] shadow"
  >
    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
    Save
  </button>
</div>
</form>
</div>

<!-- NEW: Reset confirmation modal -->
<transition name="fade">
  <div
    v-if="showReset"
    class="fixed inset-0 z-40 flex items-center justify-center bg-black/40"
  >
    <div class="bg-white rounded-2xl shadow-xl max-w-md w-full px-6 py-5 text-center">
      <div
        class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500"
      >
        !
      </div>
      <h2 class="text-lg md:text-xl font-semibold text-[#183153] mb-2">
        Reset System?
      </h2>
      <p class="text-sm text-gray-600 mb-4">
        This will permanently delete all sales data. This action cannot be undone.
      </p>

      <div class="mb-3 text-left">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Admin password
        </label>
        <input
          v-model="resetPassword"
          type="password"
          class="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 outline-none"
        />
      </div>

      <div class="mb-4 text-left">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Type <span class="font-mono font-semibold">RESET SYSTEM</span> to confirm
        </label>
        <input
          v-model="resetPhrase"
          type="text"
          class="w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-red-400 outline-none"
        />
      </div>

      <div class="flex justify-end gap-2">
        <button
          type="button"
          class="px-4 py-2 rounded-lg border text-sm"
          @click="showReset = false"
        >
          Cancel
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 disabled:opacity-50"
          :disabled="!isResetValid"
          @click="reset"
        >
          Yes, Reset
        </button>
      </div>
    </div>
  </div>
</transition>

    <!-- Popup -->
    <transition name="fade">
      <div
        v-if="popup.text"
        class="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white text-[#246af3]
               font-semibold px-8 py-3 rounded-xl shadow-lg border border-blue-100"
      >
        {{ popup.text }}
      </div>
    </transition>

    
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSalesStore } from '../stores/useSalesStore'
import api from '../api/axios'

const salesStore = useSalesStore()

// local copies so user can cancel changes
const localRegular = ref(0)
const localSmall = ref(0)

const popup = ref({ text: '' })
let popupTimeout = null

function showPopup(msg) {
  popup.value.text = msg
  clearTimeout(popupTimeout)
  popupTimeout = setTimeout(() => (popup.value.text = ''), 1600)
}

onMounted(async () => {
  await salesStore.loadPrices()
  localRegular.value = salesStore.priceRegular
  localSmall.value = salesStore.priceSmall
})

async function save() {
  salesStore.priceRegular = Number(localRegular.value) || 0
  salesStore.priceSmall = Number(localSmall.value) || 0

  await api.put('/settings/prices', {
    price_regular: salesStore.priceRegular,
    price_small: salesStore.priceSmall,
  })

  showPopup('Settings saved!')
}

function cancel() {
  localRegular.value = salesStore.priceRegular
  localSmall.value = salesStore.priceSmall
  showPopup('Changes canceled.')
}

/* ===== Reset System modal state & logic ===== */

const showReset = ref(false)
const resetPassword = ref('')
const resetPhrase = ref('')
const REQUIRED_PHRASE = 'RESET SYSTEM'

const isResetValid = computed(
  () =>
    resetPassword.value.trim().length > 0 &&
    resetPhrase.value.trim() === REQUIRED_PHRASE
)

async function reset() {
  if (!isResetValid.value) return

  try {
    await api.post('/settings/reset-system', {
      password: resetPassword.value,
    })

    // clear fields, close modal, show message
    resetPassword.value = ''
    resetPhrase.value = ''
    showReset.value = false
    showPopup('System reset successfully.')
    // optional: reload data if needed
    // await salesStore.fetchTransactions()
  } catch (error) {
    console.error('Error resetting system', error)
    showPopup(error.response?.data?.message || 'Failed to reset system')
  }
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
