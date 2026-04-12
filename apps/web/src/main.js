import { createApp } from 'vue'
import './assets/css/main.css'
import 'flowbite'

import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import { createPinia } from 'pinia'
import router from './router'
import { useUserStore } from '@/stores/userStore'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          darkBlue: '#0d475a',    // donkerblauw
          orange: '#f08360',  // oranje
          lightBlue: '#bee1e0',     // lichtblauw
          yellow: '#feca00',     // geel
          darkOrange: '#ea5a0b',     // donker oranje
        }
      }
    }
  }
})

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)


const userStore = useUserStore()

try {
  await userStore.fetchUser()
} catch(error) {
  console.error('User is not logged in')
  // if this fails, the user is not logged in
}

app.use(router).use(vuetify).mount('#app')
