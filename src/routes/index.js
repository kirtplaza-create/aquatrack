// src/routes/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import Dashboard from '../pages/Dashboard.vue'
import SalesRecord from '../pages/SalesRecord.vue'
import Statistics from '../pages/Statistics.vue'

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
  },
  {
    path: '/sales',
    name: 'SalesRecord',
    component: SalesRecord
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../pages/Account.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../pages/Settings.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../pages/Logout.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
