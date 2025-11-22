import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

import LoginPage from './pages/LoginPage.vue'
import ForgotPassword from './pages/ForgotPassword.vue'
import Dashboard from './pages/Dashboard.vue'

const routes = [
  { path: '/', component: LoginPage },
  { path: '/forgot', component: ForgotPassword },
  { path: '/dashboard', component: Dashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
