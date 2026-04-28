<template>
  <v-app>
    <v-layout>
      <Header />

      <v-main class="d-flex flex-column">
        <v-container class="d-flex flex-grow-1 flex-column pa-0 pt-10" fluid>

          <div class="flex-grow-1">

            <template v-if="$route.meta.showBreadcrumbs">
              <div>
                <Breadcrumbs />
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

import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { computed } from 'vue'

const route = useRoute()

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