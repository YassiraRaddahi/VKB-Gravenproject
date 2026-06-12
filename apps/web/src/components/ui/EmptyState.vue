<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <v-alert type="info" border="left" color="blue" elevation="0">
        {{ message }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script setup>
defineProps({
  message: { type: String, required: true }
})
</script>
