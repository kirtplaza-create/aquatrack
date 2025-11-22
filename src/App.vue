<template>
  <div class="min-h-screen">
    <div class="flex">
      <!-- Sidebar only shows if not on login page -->
      <Sidebar v-if="$route.path !== '/'" />
      <div class="flex-1 p-0">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
export default {
  name: 'App',
  components: { Sidebar },
  computed: {
    $route() {
      return this.$router.currentRoute.value
    }
  }
}
</script>
