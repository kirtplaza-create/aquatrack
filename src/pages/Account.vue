<template>
  <div class="min-h-screen w-full bg-[#f7faff] pt-10 pb-6 px-4 md:px-8">
    <div
      class="w-full max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-[#389cff] to-[#246af3]
             shadow-2xl px-6 md:px-10 lg:px-12 py-6 md:py-7 flex flex-col gap-5"
    >
      <!-- header -->
      <div class="flex items-center justify-between mb-1">
        <div>
          <h1 class="text-white text-xl md:text-2xl font-bold tracking-tight">
            Account Settings
          </h1>
          <p class="text-white/80 text-xs md:text-sm">
            Manage your personal information and account security.
          </p>
        </div>
      </div>

      <!-- main content -->
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full items-start">
        <!-- Profile column -->
        <div class="w-full lg:w-[260px] flex flex-col items-center lg:items-start gap-4">
          <div
            class="rounded-full bg-white/95 flex items-center justify-center h-24 w-24 shadow-xl
                   ring-4 ring-white/10"
          >
            <svg class="h-14 w-14 text-[#389cff]" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="9" r="5" stroke="currentColor" stroke-width="2" />
              <path d="M4 20c0-3 4-5 8-5s8 2 8 5" stroke="currentColor" stroke-width="2" />
            </svg>
          </div>

          <div class="text-center lg:text-left w-full">
            <p class="text-white text-lg font-semibold">
              {{ form.name || 'Your Name' }}
            </p>
            <p class="text-white/70 text-xs">
              Aquatrack Account
            </p>
          </div>

          <div class="mt-2 w-full space-y-2 text-white text-xs">
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M22 16.92V21a2 2 0 01-2.18 2A19.86 19.86 0 013 5.18 2 2 0 015 3h4.09a2 2 0 012 1.72c.13 1.14.4 2.25.77 3.32a2 2 0 01-.45 2.11L9.91 10.91a16 16 0 006.12 6.13l1.77-1.77a2 2 0 012.11-.45c1.07.37 2.18.64 3.32.77A2 2 0 0121 16.92z"
                />
              </svg>
              <span class="opacity-80">Phone</span>
              <span class="ml-auto font-semibold text-[#d6f0ff]">
                {{ form.phone || 'Not set' }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <svg class="h-4 w-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2" />
                <path stroke-width="2" d="M4 8h16" />
              </svg>
              <span class="opacity-80">Email</span>
              <span class="ml-auto font-semibold text-[#d6f0ff] truncate max-w-[150px] text-right">
                {{ form.email || 'Not set' }}
              </span>
            </div>

            <div class="flex items-center gap-2">
              <svg class="h-4 w-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-width="2" d="M17 10V8A5 5 0 007 8v2" />
                <rect x="2" y="10" width="20" height="10" rx="2" stroke-width="2" />
              </svg>
              <span class="opacity-80">Address</span>
              <span class="ml-auto font-semibold text-[#d6f0ff] max-w-[160px] text-right truncate">
                {{ form.address || 'Not set' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Form column -->
        <form
        class="flex-1 flex flex-col gap-10
              bg-white/15
              backdrop-blur-sm rounded-2xl
              px-5 md:px-6 py-5
              shadow-lg
              border border-white/40"
        @submit.prevent="saveAccount"
      >


          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            <div>
              <label class="block text-white text-xs font-medium mb-1.5">Name</label>
              <input
                v-model="form.name"
                type="text"
                class="w-full rounded-lg px-4 py-2.5 bg-white text-[#246af3] text-sm
                       shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200
                       placeholder:text-[#9ecbff]"
                placeholder="Name"
              />
            </div>

            <div>
              <label class="block text-white text-xs font-medium mb-1.5">Phone Number</label>
              <input
                v-model="form.phone"
                type="text"
                class="w-full rounded-lg px-4 py-2.5 bg-white text-[#246af3] text-sm
                       shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200
                       placeholder:text-[#9ecbff]"
                placeholder="Phone Number"
              />
            </div>

            <div>
              <label class="block text-white text-xs font-medium mb-1.5">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="w-full rounded-lg px-4 py-2.5 bg-white text-[#246af3] text-sm
                       shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200
                       placeholder:text-[#9ecbff]"
                placeholder="Email"
              />
            </div>

            <div>
              <label class="block text-white text-xs font-medium mb-1.5">Address</label>
              <input
                v-model="form.address"
                type="text"
                class="w-full rounded-lg px-4 py-2.5 bg-white text-[#246af3] text-sm
                       shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200
                       placeholder:text-[#9ecbff]"
                placeholder="Address"
              />
            </div>

            <div>
              <label class="block text-white text-xs font-medium mb-1.5">Current Password</label>
              <div class="relative">
                <input
                  v-model="form.currentPassword"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  class="w-full rounded-lg px-4 py-2.5 pr-12 bg-white text-[#246af3] text-sm
                         shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200
                         placeholder:text-[#9ecbff]"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-3 flex items-center text-[11px] font-semibold text-[#246af3]/70"
                  @click="toggleCurrentPassword"
                >
                  {{ showCurrentPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>

            <div>
              <label class="block text-white text-xs font-medium mb-1.5">New Password</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showNewPassword ? 'text' : 'password'"
                  class="w-full rounded-lg px-4 py-2.5 pr-12 bg-white text-[#246af3] text-sm
                         shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200
                         placeholder:text-[#9ecbff]"
                  placeholder="New password"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-3 flex items-center text-[11px] font-semibold text-[#246af3]/70"
                  @click="toggleNewPassword"
                >
                  {{ showNewPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>

            <div>
              <label class="block text-white text-xs font-medium mb-1.5">Confirm New Password</label>
              <div class="relative">
                <input
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="w-full rounded-lg px-4 py-2.5 pr-12 bg-white text-[#246af3] text-sm
                         shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200
                         placeholder:text-[#9ecbff]"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-3 flex items-center text-[11px] font-semibold text-[#246af3]/70"
                  @click="toggleConfirmPassword"
                >
                  {{ showConfirmPassword ? 'Hide' : 'Show' }}
                </button>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-2 justify-end mt-1">
            

            <button
              type="submit"
              class="flex items-center justify-center gap-2 bg-black/90 text-white
                     px-8 py-2 rounded-lg text-sm font-semibold shadow-lg
                     hover:bg-black transition"
            >
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                      d="M5 13l4 4L19 7" />
              </svg>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- popup -->
    <transition name="fade">
      <div
        v-if="popup.text"
        class="fixed top-10 left-1/2 -translate-x-1/2 bg-white text-[#246af3]
               font-semibold px-8 py-3 rounded-xl shadow-lg border border-blue-100 z-50"
      >
        {{ popup.text }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/axios'

const form = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  currentPassword: '',
  password: '',
  confirmPassword: ''
})

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const toggleCurrentPassword = () => (showCurrentPassword.value = !showCurrentPassword.value)
const toggleNewPassword = () => (showNewPassword.value = !showNewPassword.value)
const toggleConfirmPassword = () => (showConfirmPassword.value = !showConfirmPassword.value)

const popup = ref({ text: '' })
let popupTimeout = null

function showPopup(msg) {
  popup.value.text = msg
  clearTimeout(popupTimeout)
  popupTimeout = setTimeout(() => (popup.value.text = ''), 1600)
}

/* NEW: password strength helper */
function isPasswordStrong(pw) {
  // at least 8 chars, 1 uppercase, 1 special character
  const pattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
  return pattern.test(pw)
}

async function loadProfile() {
  try {
    const res = await api.get('/account')
    form.value.name = res.data.name || ''
    form.value.phone = res.data.phone || ''
    form.value.email = res.data.email || ''
    form.value.address = res.data.address || ''
  } catch (error) {
    console.error('Error loading profile', error)
    showPopup('Failed to load profile')
  }
}

async function saveAccount() {
  // Only run checks if user typed something in password fields
  if (form.value.password || form.value.confirmPassword) {
    if (form.value.password !== form.value.confirmPassword) {
      showPopup('Passwords do not match')
      return
    }

    if (!isPasswordStrong(form.value.password)) {
      showPopup(
        'Password must be at least 8 characters with 1 uppercase letter and 1 special character.'
      )
      return
    }
  }

  try {
    await api.put('/account', {
      name: form.value.name,
      phone: form.value.phone,
      email: form.value.email,
      address: form.value.address,
      currentPassword: form.value.currentPassword || undefined,
      newPassword: form.value.password || undefined
    })

    form.value.currentPassword = ''
    form.value.password = ''
    form.value.confirmPassword = ''
    showPopup('Saved successfully!')
  } catch (error) {
    console.error('Error saving profile', error)
    showPopup(error.response?.data?.message || 'Failed to save profile')
  }
}

function cancel() {
  loadProfile()
  showPopup('Cancelled')
}

onMounted(loadProfile)
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
