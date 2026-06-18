<template>
  <v-alert v-if="message" :type="type" class="mb-4" v-bind="$attrs">
    {{ message }}
  </v-alert>
</template>

<script setup>
defineOptions({ inheritAttrs: false })

defineProps({
  message: { type: String, default: '' },
  type: { type: String, default: 'error' },
})
</script>
