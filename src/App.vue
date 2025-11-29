<template>
  <div class="flex min-h-screen bg-white">
    <!-- Sidebar only shows if not on login page -->
    <Sidebar v-if="!isLogin" />

    <!-- Right side scrollable content -->
    <div
      :class="[
        'flex-1 min-h-screen overflow-y-auto p-0',
        isLogin ? '' : 'ml-60'
      ]"
    >
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: { Sidebar },
  computed: {
    isLogin() {
      return this.$route.path === '/'
    }
  }
}
</script>
