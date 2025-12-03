import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import Dashboard from '../pages/Dashboard.vue'
import SalesRecord from '../pages/SalesRecord.vue'

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
// meta: { requiresAuth: true }
},
{
path: '/sales', // or '/sales-record'
name: 'SalesRecord',
component: SalesRecord
// meta: { requiresAuth: true }
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