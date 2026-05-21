<template>
  <v-row no-gutters class="d-flex align-center mb-6 gap-2">
    <v-col cols="12" :md="searchMd">
      <v-text-field :model-value="search" @update:model-value="$emit('update:search', $event)" :label="searchLabel"
        prepend-inner-icon="mdi-magnify" clearable outlined :density="density" color="primary" class="search-field" />
    </v-col>
    <slot />
    <v-col cols="12" class="d-flex align-center justify-end ml-auto" style="flex: 0 0 auto">
      <AppButton kind="darkOrange" class="ma-0" @click="$emit('add')">
        <v-icon left>mdi-plus</v-icon>
        {{ addLabel }}
      </AppButton>
    </v-col>
  </v-row>
</template>

<script setup>
import AppButton from '@/components/ui/AppButton.vue'

defineProps({
  search: { type: String, default: '' },
  searchLabel: { type: String, default: 'Zoeken...' },
  searchMd: { type: [String, Number], default: 4 },
  addLabel: { type: String, default: 'Toevoegen' },
  density: { type: String, default: 'default' }
})

defineEmits(['update:search', 'add'])
</script>
