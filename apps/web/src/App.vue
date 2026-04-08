<template>
  <v-app>
    <v-layout>
      <Header />

      <v-main class="d-flex flex-column">
        <!-- <v-container class="d-flex flex-1-1-0 flex-column mx-auto px-10 px-md-20 pt-10"> -->
          <v-container class="h-screen d-flex flex-column">
          <nav class="d-flex ga-6 mb-4">
            <router-link to="/" class="text-blue">Home</router-link>
            <router-link to="/begraafplaatsen" class="text-blue">Begraafplaatsen</router-link>
            <router-link to="/beheerders" class="text-blue">Beheerders</router-link>
          </nav>

          <router-view />

          <Footer />
        </v-container>

      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>
