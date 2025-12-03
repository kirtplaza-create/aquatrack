<template>
  <div class="flex bg-[#f7faff] min-h-screen w-full pt-20 pb-14 px-8">
    <div class="mx-auto w-full max-w-4xl">
      <div class="rounded-2xl bg-gradient-to-br from-[#389cff] to-[#246af3] shadow-2xl p-10 flex flex-col gap-10 items-center">
        <div class="flex flex-col md:flex-row gap-16 w-full items-start">
          <!-- Profile Section -->
          <div class="w-full md:w-[320px] flex flex-col items-center gap-3">
            <div class="rounded-full bg-white flex items-center justify-center h-32 w-32 shadow-lg mb-2">
              <!-- Proper user icon SVG! -->
              <svg class="h-24 w-24 text-blue-400" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="9" r="5" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M4 20c0-3 4-5 8-5s8 2 8 5" stroke="currentColor" stroke-width="2" fill="none"/>
              </svg>
            </div>
            <div class="text-white text-2xl font-bold mt-1 mb-[-3px]"></div>
            <div class="text-white/80 text-base mb-4"></div>
            <div class="flex flex-col gap-3 mt-1 w-full text-white text-sm">
              <!-- Phone Row (SVG fixed) -->
              <div class="flex items-center gap-2">
                <svg class="h-5 w-5 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    d="M22 16.92V21a2 2 0 01-2.18 2A19.86 19.86 0 013 5.18 2 2 0 015 3h4.09a2 2 0 012 1.72c.13 1.14.4 2.25.77 3.32a2 2 0 01-.45 2.11L9.91 10.91a16 16 0 006.12 6.13l1.77-1.77a2 2 0 012.11-.45c1.07.37 2.18.64 3.32.77A2 2 0 0121 16.92z"/>
                </svg>
                <span>Phone</span>
                <span class="ml-auto font-semibold text-[#bfe8ff]"></span>
              </div>
              <!-- Email Row -->
              <div class="flex items-center gap-2">
                <svg class="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2"/>
                  <path stroke-width="2" d="M4 8h16"/>
                </svg>
                <span>Email</span>
                <span class="ml-auto font-semibold text-[#bfe8ff] truncate"></span>
              </div>
              <!-- Address Row -->
              <div class="flex items-center gap-2">
                <svg class="h-5 w-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-width="2" d="M17 10V8A5 5 0 007 8v2"/>
                  <rect x="2" y="10" width="20" height="10" rx="2" stroke-width="2"/>
                </svg>
                <span>Address</span>
                <span class="ml-auto font-semibold text-[#bfe8ff] w-36 text-right"></span>
              </div>
            </div>
          </div>
          <!-- Form Section -->
          <form class="flex-1 flex flex-col gap-7 justify-center" @submit.prevent="saveAccount">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block text-white text-base font-medium mb-2">Name</label>
                <input v-model="form.name" type="text" class="w-full rounded-lg px-5 py-3 border-none focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-[#bfe8ff] text-base shadow bg-white text-[#246af3]" placeholder="Name"/>
              </div>
              <div>
                <label class="block text-white text-base font-medium mb-2">Phone Number</label>
                <input v-model="form.phone" type="text" class="w-full rounded-lg px-5 py-3 border-none focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-[#bfe8ff] text-base shadow bg-white text-[#246af3]" placeholder="Phone Number"/>
              </div>
              <div>
                <label class="block text-white text-base font-medium mb-2">Email</label>
                <input v-model="form.email" type="email" class="w-full rounded-lg px-5 py-3 border-none focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-[#bfe8ff] text-base shadow bg-white text-[#246af3]" placeholder="Email"/>
              </div>
              <div>
                <label class="block text-white text-base font-medium mb-2">Address</label>
                <input v-model="form.address" type="text" class="w-full rounded-lg px-5 py-3 border-none focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-[#bfe8ff] text-base shadow bg-white text-[#246af3]" placeholder="Address"/>
              </div>
              <div>
                <label class="block text-white text-base font-medium mb-2">Change Password</label>
                <input v-model="form.password" type="password" class="w-full rounded-lg px-5 py-3 border-none focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-[#bfe8ff] text-base shadow bg-white text-[#246af3]" placeholder="Password"/>
              </div>
              <div>
                <label class="block text-white text-base font-medium mb-2">Confirm Password</label>
                <input v-model="form.confirmPassword" type="password" class="w-full rounded-lg px-5 py-3 border-none focus:outline-none focus:ring-2 focus:ring-blue-200 placeholder:text-[#bfe8ff] text-base shadow bg-white text-[#246af3]" placeholder="Confirm Password"/>
              </div>
            </div>
            <div class="flex gap-4 mt-4 justify-center">
              <button type="submit" class="flex items-center justify-center gap-2 bg-black text-white py-3 px-12 rounded-lg font-semibold transition hover:bg-blue-900 hover:scale-[1.01] shadow min-w-[150px]">
                <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                Save
              </button>
              <button type="button" class="flex items-center justify-center gap-2 border-2 border-white py-3 px-12 rounded-lg font-semibold text-white transition hover:bg-white hover:text-[#246af3] hover:scale-[1.01] shadow min-w-[150px]" @click="cancel">
                <svg class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Animated Save Popup -->
    <transition name="fade">
      <div v-if="popup.text"
        class="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white text-[#246af3] font-semibold px-8 py-3 rounded-xl shadow-lg border border-blue-100 transition z-50"
      >
        {{ popup.text }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  password: '',
  confirmPassword: ''
})

const popup = ref({ text: '' })
let popupTimeout = null

function showPopup(msg) {
  popup.value.text = msg
  clearTimeout(popupTimeout)
  popupTimeout = setTimeout(() => popup.value.text = '', 1600)
}
function saveAccount() {
  showPopup('Saved successfully!')
}
function cancel() {
  showPopup('Cancelled')
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
