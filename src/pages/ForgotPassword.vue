<template>
  <div class="max-w-md mx-auto bg-white p-6 rounded shadow">
    <h1 class="text-2xl font-semibold mb-4">Forgot password</h1>
    <form @submit.prevent="submit">
      <label class="block mb-4">
        <span>Email</span>
        <input v-model="email" type="email" class="mt-1 block w-full border rounded p-2" required/>
      </label>
      <div class="flex justify-end">
        <button class="px-4 py-2 bg-green-600 text-white rounded">Send reset</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ForgotPassword',
  data() { return { email: '' } },
  methods: {
    submit() {
      // demo: show alert
      alert('If this were connected to a backend, a reset email would be sent to ' + this.email)
    }
  }
}
</script>
