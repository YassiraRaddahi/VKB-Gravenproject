<template>
  <v-app>
    <!-- <div class="min-h-screen flex flex-col container mx-auto px-10 md:px-20 pt-10"> -->
    <div class="h-screen d-flex flex-column mx-auto px-10 px-md-20 pt-10">
      <Header />
      

      <v-main class="flex-1">
        <nav class="d-flex ga-6 mb-4">
          <router-link to="/" class="text-blue">Home</router-link>
          <router-link to="/begraafplaatsen" class="text-blue">Begraafplaatsen</router-link>
          <router-link to="/beheerders" class="text-blue">Beheerders</router-link>
        </nav>
        <router-view />
      </v-main>

      <Footer />
    </div>
  </v-app>
</template>


<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>
