import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import Dashboard from '../pages/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
    // meta: { requiresAuth: true } // add this if you use auth guards
  }
  // Add other routes here...
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
