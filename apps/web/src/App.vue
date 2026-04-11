<template>
  <v-app>
    <v-layout>
      <Header />

      <v-main class="d-flex flex-column">
        <v-container class="d-flex flex-grow-1 flex-column pa-0 pt-10" fluid>

          <nav class="d-flex ga-2 mb-4 justify-center flex-wrap">
            <router-link to="/" class="text-blue">Home</router-link>
            <router-link to="/begraafplaatsen" class="text-blue">Begraafplaatsen</router-link>
            <router-link to="/beheerders" class="text-blue">Beheerders</router-link>
          </nav>

          <div class="flex-grow-1">
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
</script>
