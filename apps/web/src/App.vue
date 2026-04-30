<template>
  <v-app>
    <v-layout>
    <Header @toggle-drawer="drawer = !drawer" /> 
        <ListSideBar 
        v-model="drawer"
      />

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
import { ref } from 'vue'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Breadcrumbs from './components/Breadcrumbs.vue'
import ListSideBar from './components/ListSideBar.vue'

const drawer = defineModel()
</script>