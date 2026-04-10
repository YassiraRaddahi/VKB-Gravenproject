<template>
  <v-app>
    <v-container class="app-shell h-screen d-flex flex-column mx-auto px-4 px-md-10 pt-6">
      <Header />

      <v-main class="flex-1">
        <Breadcrumbs />
        <router-view />
      </v-main>

      <Footer />
    </v-container>
  </v-app>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Breadcrumbs from './components/Breadcrumbs.vue'
</script>