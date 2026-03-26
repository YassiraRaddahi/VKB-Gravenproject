<template>
  <div id="app" class="min-h-screen flex flex-col container mx-auto px-10 md:px-20 pt-10">
    <Header />

    <main class="flex-1">
      <router-view />
    </main>

    <Footer />
  </div>
</template>


<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>
