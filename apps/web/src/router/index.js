import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeView.vue'
import Cemeteries from '../views/CemeteriesView.vue'
import Graves from '../views/GravesView.vue'
import CemeteryManagers from '../views/CemeteryManagersView.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'Home', component: Home },
    { path: '/begraafplaatsen', name: 'Cemeteries', component: Cemeteries },
    { path: '/graven/:cemetery_id', name: 'Graves', component: Graves },
    { path: '/beheerders', name: 'CemeteryManagers', component: CemeteryManagers }, 
  ]
})

export default router