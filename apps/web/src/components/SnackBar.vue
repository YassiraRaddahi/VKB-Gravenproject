<template>
  <v-snackbar v-model="model" :color="color" :timeout="timeout" location="bottom right">
    {{ message }}
    <template #actions>
      <v-btn variant="text" color="lightBlue" @click="model = false">Sluiten</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
defineProps({
  message: String,
  color: { type: String, default: 'darkBlue' },
  timeout: { type: Number, default: 3000 },
})

const model = defineModel()
</script>
