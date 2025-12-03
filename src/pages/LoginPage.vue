<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-[#101b2b] overflow-hidden"
  >
    <!-- Background -->
    <div
      class="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#14223e] via-[#141c2b] via-80% to-[#101221] pointer-events-none"
    ></div>

    <!-- Logo (top-left, independent of centering) -->
    <div class="absolute top-6 left-10 flex items-center z-20">
      <img
        :src="aquatracklogo"
        alt="Aquatrack logo"
        class="h-14 w-14 rounded-lg border shadow"
      />
      <div
        class="ml-4 text-2xl text-white font-semibold tracking-wider drop-shadow"
      >
        Aquatrack
      </div>
    </div>

    <!-- Centered Card -->
    <div
      class="z-10 bg-[#09152b]/90 rounded-2xl shadow-2xl max-w-lg w-full px-10 py-12 flex flex-col items-center"
    >
      <h1
        class="text-5xl font-extrabold text-white mb-7 text-center drop-shadow"
      >
        Log in
      </h1>

      <form @submit.prevent="submit" class="w-full">
        <!-- Name -->
        <div class="mb-6">
          <input
            v-model="name"
            type="text"
            placeholder="Name"
            class="block w-full rounded-full px-6 py-3 font-medium bg-white/10 text-white placeholder-gray-300 focus:ring-2 ring-[#3586ff] outline-none transition"
            required
          />
        </div>

        <!-- Password + eye -->
        <div class="mb-3 relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            class="block w-full rounded-full px-6 py-3 font-medium bg-white/10 text-white placeholder-gray-300 focus:ring-2 ring-[#3586ff] outline-none transition pr-12"
            required
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            tabindex="-1"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-400 outline-none"
          >
            <svg
              v-if="showPassword"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.165.512-.386 1.003-.655 1.47M18.364 18.364l-1.414-1.414A9.956 9.956 0 0012 19c-4.478 0-8.268-2.943-9.542-7 .484-1.505 1.268-2.91 2.254-4.093"
              ></path>
            </svg>
            <svg
              v-else
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="3" stroke-width="2"></circle>
              <path
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Remember Me and Forgot Password Row -->
        <div class="flex items-center justify-between mb-7">
          <label
            class="inline-flex items-center text-gray-400 text-base cursor-pointer select-none"
          >
            <input
              type="checkbox"
              v-model="rememberMe"
              class="rounded border-gray-300 focus:ring-blue-500 focus:ring-2 w-4 h-4 mr-2 accent-blue-500"
            />
            Remember Me
          </label>
          <button
            type="button"
            class="text-base text-[#bfe8ff] hover:underline hover:text-white transition"
          >
          </button>
        </div>

        <!-- Error -->
        <p v-if="error" class="text-red-400 text-sm mb-3 text-center">
          {{ error }}
        </p>

        <!-- Submit -->
        <button
          class="block w-full mt-1 bg-gradient-to-r from-[#3586ff] to-[#2563eb] hover:from-[#2563eb] hover:to-[#3586ff] text-lg font-bold py-3 text-white rounded-full shadow-md hover:scale-[1.015] transition"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import aquatracklogo from "../assets/aquatracklogo.png";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore";

const name = ref("");
const password = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);
const error = ref("");

const auth = useAuthStore();
const router = useRouter();

async function submit() {
  error.value = "";
  try {
    await auth.login(name.value, password.value);
    router.push("/dashboard");
  } catch (e) {
    error.value = "Invalid name or password";
  }
}
</script>