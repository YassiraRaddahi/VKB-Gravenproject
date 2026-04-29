<template>
  <v-app>
    <v-layout>
      <Header :show-drawer-toggle="showDrawerToggle" @toggle-drawer="drawer = !drawer" />

      <v-main class="d-flex flex-column">
        <v-container class="d-flex flex-grow-1 flex-column pa-0 pt-10" fluid>

          <div class="flex-grow-1">

            <template v-if="$route.meta.showBreadcrumbs">
              <div>
                <Breadcrumbs />
              </div>
            </template>

            <template v-if="showNavigationDrawer">
              <div>
                <NavigationDrawer v-model="drawer" :permanent="smAndUp" :temporary="!smAndUp" />
              </div>
            </template>

            <router-view />
          </div>

          <Footer />
        </v-container>

      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Breadcrumbs from './components/Breadcrumbs.vue'
import NavigationDrawer from './components/NavigationDrawer.vue'

import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const userStore = useUserStore()

const drawer = ref(false)
const { smAndUp } = useDisplay()


const showNavigationDrawer = computed(() => route.meta?.showNavigationDrawer && userStore.user)

const showDrawerToggle = computed(() =>
  showNavigationDrawer.value && !smAndUp.value
)



const title = computed(() =>
  route.meta?.title || 'Kerkhovenbeheer Nederland'
)

const description = computed(() =>
  route.meta?.description ||
  'Kerkhovenbeheer Nederland is een automatiseringsysteem voor beheer van kerkhoven en graven.'
)

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description
    }
  ]
})


</script>