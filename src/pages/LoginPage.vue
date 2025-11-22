<template>
  <div class="bg-gradient-to-br from-[#14223e] to-[#101221] min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full bg-white/90 p-8 rounded-2xl shadow-lg transition duration-300 hover:shadow-[0_0_32px_0_#3586ff50] mx-auto">
      <h1 class="text-4xl font-bold text-center mb-8 text-[#101929]">
        Sign in
      </h1>
      <form @submit.prevent="submit">
        <label class="block mb-6">
          <span class="block text-[#333] font-medium mb-2">Email</span>
          <input
            v-model="email"
            type="email"
            class="block w-full rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white/70"
            required
          />
        </label>
        <label class="block mb-8">
          <span class="block text-[#333] font-medium mb-2">Password</span>
          <input
            v-model="password"
            type="password"
            class="block w-full rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white/70"
            required
          />
        </label>
        <div class="flex items-center justify-between">
          <button
            class="px-6 py-3 bg-gradient-to-r from-[#3586ff] to-[#2563eb] text-white font-semibold rounded-lg shadow hover:scale-105 transition"
          >
            Sign in
          </button>
          <router-link
            to="/forgot"
            class="text-sm text-blue-600 hover:underline ml-3 transition"
          >
            Forgot password?
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
export default {
  name: "LoginPage",
  data() {
    return { email: "", password: "" };
  },
  setup() {
    const user = useUserStore();
    return { user };
  },
  methods: {
    submit() {
      this.user.login({ email: this.email });
      this.$router.push("/dashboard");
    },
  },
};
</script>
