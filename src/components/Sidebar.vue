<template>
  <aside class="w-60 bg-[#101929] text-white min-h-screen flex flex-col justify-between py-6">
    <!-- Top logo section -->
    <div>
      <div class="flex items-center gap-3 px-6 mb-8">
        <div class="bg-[#3586FF] rounded-xl p-3 flex items-center">
          <!-- Placeholder SVG for water icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3v2m0 0c-.333 2.833-4.333 6.5-4.333 10.5A4.333 4.333 0 0012 20.333c2.396 0 4.333-1.929 4.333-4.333C16.333 11.5 12.333 7.833 12 5z" />
          </svg>
        </div>
        <div>
          <div class="font-bold text-lg">Aquatrack</div>
          <div class="text-xs text-[#AFCBFF]">Sales System</div>
        </div>
      </div>
      <!-- Navigation -->
      <nav class="flex flex-col gap-1">
        <router-link
          to="/dashboard"
          class="flex items-center gap-2 px-6 py-2 rounded-xl bg-[#3586FF] text-white font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="4" y="4" width="7" height="7" rx="2" fill="currentColor"/>
            <rect x="13" y="4" width="7" height="7" rx="2" fill="currentColor"/>
            <rect x="4" y="13" width="7" height="7" rx="2" fill="currentColor"/>
            <rect x="13" y="13" width="7" height="7" rx="2" fill="currentColor"/>
          </svg>
          Dashboard
        </router-link>
        <router-link
          to="/sales"
          class="flex items-center gap-2 px-6 py-2 rounded-xl text-[#C7D3E0] hover:bg-[#162238] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7v10M17 7v10M7 7h10" />
          </svg>
          Sales Records
        </router-link>
      </nav>
    </div>
    <!-- Bottom section -->
    <div class="flex flex-col gap-1 px-6">
      <router-link to="/account" class="flex items-center gap-2 py-2 text-[#C7D3E0] hover:bg-[#162238] rounded-xl">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM4 20v-2a4 4 0 014-4h8a4 4 0 014 4v2" />
        </svg>
        Account
      </router-link>
      <router-link to="/settings" class="flex items-center gap-2 py-2 text-[#C7D3E0] hover:bg-[#162238] rounded-xl">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 4v2M12 18v2M4.93 4.93l1.41 1.41M16.66 16.66l1.41 1.41M4 12h2M18 12h2M4.93 19.07l1.41-1.41M16.66 7.34l1.41-1.41" />
        </svg>
        Settings
      </router-link>
      <!-- Log Out Button replaces router-link -->
      <button @click="logout" class="flex items-center gap-2 py-2 text-[#C7D3E0] hover:bg-[#162238] rounded-xl w-full text-left">
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 11-4 0v-1m4-10a2 2 0 11-4 0v1" />
        </svg>
        Log Out
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

function logout() {
  userStore.logout()
  router.push('/')
}
</script>
