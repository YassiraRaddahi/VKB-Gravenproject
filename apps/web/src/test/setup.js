import { beforeAll, vi } from 'vitest'
import { config } from '@vue/test-utils'

config.global.mocks = {
  $route: {
    fullPath: '/',
  }
}


config.global.stubs = {
  'v-row': { template: '<div><slot /></div>' },
  'v-col': { template: '<div><slot /></div>' },
  'v-card': { template: '<div><slot /></div>' },
  'v-card-text': { template: '<div><slot /></div>' },
  'v-card-actions': { template: '<div><slot /></div>' },
  'v-btn': { template: '<button><slot /></button>' },
  'v-text-field': { template: '<input />' },
  'v-select': true,
  'v-container': { template: '<div><slot /></div>' },
  'v-form': { template: '<form><slot /></form>' },
  'v-avatar': { template: '<div><slot /></div>' },
  'v-img': { template: '<img />' },
  'v-icon': true,
  'v-chip': true,
  'v-spacer': true,
  'v-sheet': { template: '<div><slot /></div>' },
  'ProfileSideBar': true,
  'v-snackbar': {
    template: `<div><slot /></div>`
  },
  'Snackbar': {
    template: `
    <div v-if="modelValue" data-testid="$attrs['data-testid']">
      {{ message }}
    </div>
  `,
    props: ['modelValue', 'message']
  },
  'TitleUnderline': true
}

config.global.directives = {
  ripple: () => { }
}

// Mock CSS imports globally
vi.mock('*.css', () => ({}))
vi.mock('vuetify/styles', () => ({}))

// Mock Vuetify composable
vi.mock('vuetify', () => ({
  useDisplay: () => ({
    mdAndUp: { value: true },
    smAndUp: { value: true }

  })
}))


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