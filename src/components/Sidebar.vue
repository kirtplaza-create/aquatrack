<template>
  <aside class="w-60 min-h-screen bg-[#101929] text-white flex flex-col py-6">
    <!-- Top logo section -->
    <div>
      <div class="flex items-center gap-3 px-6 mb-8">
        <div class="flex flex-col items-center justify-center bg-[#246af3] rounded-full h-14 w-14 shadow-lg">
          <!-- Water icon SVG -->
         <div class="flex items-center justify-center">
          <img :src="aquatracklogo" alt="Aquatrack logo" class="h-12 w-12 rounded-full object-cover bg-white p-1 shadow" />
          </div>


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
          class="flex items-center gap-2 px-6 py-2 rounded-xl text-white font-medium"
          :class="$route.path === '/dashboard' ? 'bg-[#3586FF]' : 'hover:bg-[#162238] text-[#C7D3E0]'"
        >
          <!-- Dashboard SVG -->
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
          class="flex items-center gap-2 px-6 py-2 rounded-xl text-white font-medium"
          :class="$route.path === '/sales' ? 'bg-[#3586FF]' : 'hover:bg-[#162238] text-[#C7D3E0]'"
        >
          <!-- Sales Records SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7v10M17 7v10M7 7h10" />
          </svg>
          Sales Records
        </router-link>
      </nav>
    </div>
    <!-- Stacking bottom section below navigation naturally -->
    <div class="flex flex-col gap-1 px-6 mt-8">
      <router-link
        to="/account"
        class="flex items-center gap-2 py-2 rounded-xl font-medium"
        :class="$route.path === '/account' ? 'bg-[#3586FF] text-white' : 'hover:bg-[#162238] text-[#C7D3E0]'"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM4 20v-2a4 4 0 014-4h8a4 4 0 014 4v2" />
        </svg>
        Account
      </router-link>
      <router-link
        to="/settings"
        class="flex items-center gap-2 py-2 rounded-xl font-medium"
        :class="$route.path === '/settings' ? 'bg-[#3586FF] text-white' : 'hover:bg-[#162238] text-[#C7D3E0]'"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 4v2M12 18v2M4.93 4.93l1.41 1.41M16.66 16.66l1.41 1.41M4 12h2M18 12h2M4.93 19.07l1.41-1.41M16.66 7.34l1.41-1.41" />
        </svg>
        Settings
      </router-link>
      
      <!-- Log Out should only show hover effect, not active highlight -->
      <button @click="logout"
        class="flex items-center gap-2 py-2 rounded-xl w-full text-left font-medium text-[#C7D3E0] hover:bg-[#162238] transition"
      >
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
import aquatracklogo from '../assets/aquatracklogo.png'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

function logout() {
  router.push('/logout');
}

</script>
