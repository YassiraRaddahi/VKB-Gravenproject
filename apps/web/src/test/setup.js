import { beforeAll } from 'vitest'

// Mock CSS imports globally
vi.mock('*.css', () => ({}))
vi.mock('vuetify/styles', () => ({}))

// Mock axios
import axios from 'axios'
vi.mock('axios')
axios.create = vi.fn(() => axios)

// Mock Vue Router
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Dashboard', component: {} },
    { path: '/cemeteries', name: 'Cemeteries', component: {} },
    { path: '/graves/:cemetery_id', name: 'Graves', component: {} }
  ]
})

// Global test setup
beforeAll(() => {
  // Setup global mocks if needed
})