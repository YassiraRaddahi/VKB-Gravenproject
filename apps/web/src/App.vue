<template>
  <v-app>
    <v-layout>

      <!-- HEADER -->
      <Header
        :show-drawer-toggle="showDrawerToggle"
        @toggle-drawer="drawer = !drawer"
      />

      <v-main class="d-flex flex-column">
        <v-container
          class="d-flex flex-grow-1 flex-column pa-0 pt-10"
          fluid
        >

          <div class="flex-grow-1">

            <!-- BREADCRUMBS -->
            <div v-if="$route.meta.showBreadcrumbs">
              <Breadcrumbs />
            </div>

            <!-- SIDEBAR -->
            <NavigationDrawer
              v-if="showNavigationDrawer"
              v-model="drawer"
              :permanent="mdAndUp"
              :temporary="!mdAndUp"
            />

            <!-- PAGE CONTENT -->
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
import { useHead } from '@unhead/vue'
import { computed, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/userStore'

const route = useRoute()
const userStore = useUserStore()

const { mdAndUp } = useDisplay()
const drawer = ref(false)

/**
 * Sidebar is default ON,
 * except on GraveDetail page
 */
const showNavigationDrawer = computed(() =>
  userStore.user && route.name !== 'GraveDetail'
)

/**
 * Only show toggle button on mobile + when sidebar exists
 */
const showDrawerToggle = computed(() =>
  showNavigationDrawer.value && !mdAndUp.value
)

/**
 * Auto open drawer on desktop
 */
watch(mdAndUp, (value) => {
  if (value) {
    drawer.value = true
  }
}, { immediate: true })

/**
 * SEO
 */
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