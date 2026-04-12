import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import Dashboard from '../views/DashboardView.vue'
import Cemeteries from '../views/CemeteriesView.vue'
import Graves from '../views/GravesView.vue'
import CemeteryManagers from '../views/CemeteryManagersView.vue'
import Profile from '../views/ProfileView.vue'
import Security from '../views/SecurityView.vue'



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: Home, meta: { showBreadcrumbs: false } },
    { path: '/login', name: 'Login', component: LoginView, meta: { showBreadcrumbs: false } },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { showBreadcrumbs: false } },
    { path: '/begraafplaatsen', name: 'Cemeteries', component: Cemeteries, meta: { showBreadcrumbs: true } },
    { path: '/graven/:cemetery_id', name: 'Graves', component: Graves, meta: { showBreadcrumbs: true } },
    { path: '/beheerders', name: 'CemeteryManagers', component: CemeteryManagers, meta: { showBreadcrumbs: true } }, 
    { path: '/profiel', name: 'Profile', component: Profile, meta: { showBreadcrumbs: false } },
    { path: '/profiel/beveiliging', name: 'Security', component: Security, meta: { showBreadcrumbs: false } }
    
  ]
})

export default router