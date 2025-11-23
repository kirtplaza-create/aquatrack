import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

import LoginPage from './pages/LoginPage.vue'
import Dashboard from './pages/Dashboard.vue'

const routes = [
  { path: '/', component: LoginPage },
  { path: '/dashboard', component: Dashboard },
  {path: '/sales', component: () => import('./pages/SalesRecord.vue') },
  {path: '/account', component: () => import('./pages/Account.vue') },
  {path: '/settings', component: () => import('./pages/Settings.vue') },
  {path: '/logout', component: () => import('./pages/Logout.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
