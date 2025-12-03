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
      <transition name="page-fade" mode="out-in">
        <router-view />
      </transition>
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

<style>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}
</style>
