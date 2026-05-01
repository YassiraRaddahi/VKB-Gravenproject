<template>
  <v-snackbar
    v-model="internalValue"
    :timeout="timeout"
    :color="color"
    location="bottom right"
  >
    {{ message }}

    <template #actions>
      <v-btn variant="text" @click="internalValue = false">
        Sluiten
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    default: ''
  },
  timeout: {
    type: Number,
    default: 3000
  },
  color: {
    type: String,
    default: 'success'
  }
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>