import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/DashboardView.vue'
import Cemeteries from '../views/CemeteriesView.vue'
import Graves from '../views/GravesView.vue'
import CemeteryManagers from '../views/CemeteryManagersView.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard },
    { path: '/begraafplaatsen', name: 'Cemeteries', component: Cemeteries },
    { path: '/graven/:cemetery_id', name: 'Graves', component: Graves },
    { path: '/beheerders', name: 'CemeteryManagers', component: CemeteryManagers }, 
  ]
})

export default router