import { defineStore } from 'pinia'
import { ref, computed } from 'vue'


export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  function login(payload) {
    user.value = { email: payload.email }
  }

  function logout() {
    user.value = null
  }

  // Computed property to check authentication status
  const isAuthenticated = computed(() => user.value !== null)

  return { user, login, logout, isAuthenticated }
})
