<template>
  <v-app>
    <v-container class="h-screen d-flex flex-column mx-auto px-10 px-md-20 pt-10">
      <Header />

      <v-main class="flex-1">
        <router-view />
      </v-main>

      <Footer />
    </v-container>
  </v-app>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>