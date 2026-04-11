<template>
  <v-app>
    <v-layout>
      <Header />

      <v-main class="d-flex flex-column">
        <v-container class="d-flex flex-grow-1 flex-column pa-0 pt-10" fluid>

          <div class="flex-grow-1">
            <Breadcrumbs />
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
</script>