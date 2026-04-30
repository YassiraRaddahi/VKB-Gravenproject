
<template>
  <v-btn @click="snackbar = true">
    Klik mij
  </v-btn>

  <SnackBar
    v-model:show="snackbar"
    text="Dit is een voorbeeld snackbar"
  />
</template>
<script setup>
import { ref } from 'vue'
import SnackBar from '@/components/SnackBar.vue'

const snackbar = ref(false)
</script>
