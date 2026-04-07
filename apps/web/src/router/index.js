import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeView.vue'
import Cemeteries from '../views/CemeteriesView.vue'
import Graves from '../views/GravesView.vue'
import CemeteryManagers from '../views/CemeteryManagersView.vue'
import Profile from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'
import Dashboard from '../views/DashboardView.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: Home },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/begraafplaatsen', name: 'Cemeteries', component: Cemeteries },
    { path: '/graven/:cemetery_id', name: 'Graves', component: Graves },
    { path: '/beheerders', name: 'CemeteryManagers', component: CemeteryManagers }, 
    { path: '/profiel', name: 'Profile', component: Profile },
    { path: '/login', name: 'Login', component: LoginView }
  ]
})

export default router