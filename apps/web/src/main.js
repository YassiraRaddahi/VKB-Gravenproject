import { createApp } from 'vue'
import './assets/css/main.css'
import router from './router'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

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

createApp(App).use(router).use(vuetify).mount('#app')
