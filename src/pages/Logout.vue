<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Blurred overlay -->
    <div class="fixed inset-0 bg-black/40 backdrop-blur-[2px]"></div>
    <!-- Dialog Card -->
    <div class="relative z-10 bg-gradient-to-br from-[#389cff] to-[#247af3] rounded-2xl shadow-2xl px-10 py-10 max-w-xl min-w-[350px] flex flex-col items-center animate-fadeIn">
      <!-- Close Icon -->
      <button @click="cancel" class="absolute right-5 top-5 text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 transition focus:outline-none">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <!-- Text -->
      <div class="text-2xl text-white text-center font-semibold leading-snug my-2 mt-4">
        Are you sure you want to log<br />out of the system?
      </div>
      <!-- Buttons -->
      <div class="flex gap-5 mt-8 w-full justify-center">
        <button
          class="flex-1 px-0 py-3 rounded-lg bg-black text-white font-semibold text-lg transition hover:bg-blue-900 hover:scale-105 shadow active:scale-100"
          @click="logout"
        >Yes</button>
        <button
          class="flex-1 px-0 py-3 rounded-lg bg-white text-blue-600 font-semibold text-lg transition hover:bg-blue-50 border-2 border-transparent hover:border-blue-100 hover:scale-105 active:scale-100"
          @click="cancel"
        >No</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function logout() {
  // Place your logout logic here
  // E.g., clear user store, tokens, etc.
  router.push('/') // Redirect to login/home
}
function cancel() {
  router.back?.() // Go to previous page
  // Or route somewhere else if needed: router.push('/dashboard')
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px);}
  to   { opacity: 1; transform: translateY(0);}
}
.animate-fadeIn {
  animation: fadeIn 0.3s cubic-bezier(.53,1.5,.39,1.01);
}
</style>
