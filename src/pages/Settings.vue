<template>
  <div class="flex bg-[#f7faff] min-h-screen w-full items-center justify-center">
    <div class="max-w-md w-full px-2">
      <div class="rounded-2xl bg-gradient-to-br from-[#389cff] to-[#247af3] shadow-2xl px-9 py-10 flex flex-col gap-5 items-center">
        <h2 class="text-2xl font-bold text-white mb-4 w-full text-left">Settings</h2>
        <form class="w-full flex flex-col gap-4">
          <!-- Notification -->
          <div>
            <label class="text-white text-base font-medium mb-2 block">Notification Sound</label>
            <div class="relative">
              <select v-model="form.notif" class="w-full rounded-xl px-5 py-3 bg-white text-blue-700 font-semibold shadow focus:outline-none transition hover:ring-2 hover:ring-blue-200">
                <option value="On">On</option>
                <option value="Off">Off</option>
              </select>
              <svg v-if="form.notif==='On'" class="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-width="2" d="M12 22a2 2 0 002-2h-4a2 2 0 002 2z"/>
                <path stroke-width="2" d="M18 16v-5a6 6 0 10-12 0v5M7 16h10"/>
              </svg>
            </div>
          </div>
          <!-- Price input -->
          <div>
            <label class="text-white text-base font-medium mb-2 block">Default Price per Gallon</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-semibold text-white/80 pointer-events-none">₱</span>
              <input v-model="form.price" type="number" min="0"
                class="pl-8 w-full rounded-xl px-5 py-3 bg-white text-blue-700 font-semibold shadow focus:outline-none transition hover:ring-2 hover:ring-blue-200"
                placeholder="20"
              />
            </div>
          </div>
          <!-- Save/Cancel -->
          <div class="flex gap-2 mt-1">
            <button
              type="button"
              @click="save"
              class="flex-1 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-xl font-semibold transition hover:bg-blue-900 hover:scale-[1.01] shadow"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              Save
            </button>
            <button
              type="button"
              @click="cancel"
              class="flex-1 flex items-center justify-center gap-2 border-2 border-white py-2 rounded-xl font-semibold text-white transition hover:bg-white hover:text-[#246af3] hover:scale-[1.01] shadow"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Cancel
            </button>
          </div>
          <!-- Export -->
          <hr class="border-blue-200 my-3" />
          <div class="flex gap-2">
            <button @click="exportCSV" type="button"
              class="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-xl font-semibold transition hover:bg-green-600 hover:scale-[1.01] shadow">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2"/>
                <path stroke-width="2" d="M8 8h8v8H8V8z"/>
              </svg>
              Export CSV
            </button>
            <button @click="exportPDF" type="button"
              class="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-xl font-semibold transition hover:bg-red-600 hover:scale-[1.01] shadow">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-width="2" d="M16 8v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8"/>
                <path stroke-width="2" d="M16 8V6a2 2 0 00-2-2H8a2 2 0 00-2 2v2"/>
              </svg>
              Export PDF
            </button>
          </div>
          <!-- Reset -->
          <div>
            <h3 class="text-white font-bold mt-3 mb-2">Reset All Data</h3>
            <button type="button"
              @click="showReset = true"
              class="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-xl font-semibold transition hover:bg-red-700 hover:scale-[1.01] shadow"
            >
              <!-- Warning Triangle Icon -->
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 9v4m0 4h.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.29 3.86l-8.08 14a2 2 0 001.72 3h16.14a2 2 0 001.72-3l-8.08-14a2 2 0 00-3.44 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Reset System
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- Popup and Modal -->
    <transition name="fade">
      <div v-if="popup.text"
        class="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white text-[#246af3] font-semibold px-8 py-3 rounded-xl shadow-lg border border-blue-100 transition"
      >
        {{ popup.text }}
      </div>
    </transition>
    <transition name="fade">
      <div v-if="showReset"
        class="fixed inset-0 bg-[#101929]/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-7 shadow-xl text-center w-[350px]">
          <div class="flex justify-center mb-4">
            <div class="rounded-full bg-red-100 p-3">
              <!-- Large warning triangle in modal -->
              <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 9v4m0 4h.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.29 3.86l-8.08 14a2 2 0 001.72 3h16.14a2 2 0 001.72-3l-8.08-14a2 2 0 00-3.44 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="text-lg font-bold text-[#246af3] mb-2">Reset System?</div>
          <div class="text-gray-600 mb-5 text-sm">This will permanently delete all your data. This action cannot be undone.</div>
          <div class="flex gap-2">
            <button
              @click="reset"
              class="flex-1 bg-red-600 text-white rounded-xl py-2 font-medium transition hover:bg-red-700 hover:scale-105">Yes, Reset</button>
            <button
              @click="showReset = false"
              class="flex-1 bg-gray-100 text-[#246af3] rounded-xl py-2 font-medium transition hover:bg-gray-200 hover:scale-105">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const form = ref({ notif: 'On', price: 20 })

const popup = ref({ text: '' })
let popupTimeout = null

function showPopup(msg) {
  popup.value.text = msg
  clearTimeout(popupTimeout)
  popupTimeout = setTimeout(() => popup.value.text = '', 1600)
}
function save() { showPopup('Saved successfully!') }
function cancel() { showPopup('Canceled.') }
function exportCSV() { showPopup('Exported CSV!') }
function exportPDF() { showPopup('Exported PDF!') }

const showReset = ref(false)
function reset() {
  showPopup('System reset!')
  showReset.value = false
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
