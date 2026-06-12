import { createApp } from 'vue'
import './assets/css/tokens.css'
import './assets/css/main.css'

import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
 
import { createHead } from '@vueuse/head'
 
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
 
// Pinia
import { createPinia } from 'pinia'
 
// Router
import router from './router'
 
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
const head = createHead()
const pinia = createPinia()
 
 
 
app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(head)
app.mount('#app')
