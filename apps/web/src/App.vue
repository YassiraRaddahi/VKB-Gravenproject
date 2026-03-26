<template>
  <div id="app" class="container mx-auto px-10 md:px-20 pt-10">
    <header>
      <nav class="flex flex-wrap gap-4 justify-center md:justify-start">
        <router-link to="/" class="text-blue-500 hover:underline">Home</router-link>
        <router-link to="/begraafplaatsen" class="text-blue-500 hover:underline">Begraafplaatsen</router-link>
        <router-link to="/beheerders" class="text-blue-500 hover:underline">Beheerders</router-link>
      </nav>
    </header>

    <main>

      <router-view />

    </main>

    <footer class="text-center mt-10 mb-4 text-gray-500">
      &copy; 2026 Dutch cemetery management. All rights reserved.
    </footer>
  </div>
</template>

<script setup>

</script>
