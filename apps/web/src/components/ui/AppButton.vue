<template>
  <v-btn
    :color="config.color"
    :variant="config.variant"
    :class="config.class"
    v-bind="$attrs"
  >
    <slot />
  </v-btn>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps({
  kind: {
    type: String,
    default: 'darkBlue'
  }
})

const kindMap = {
  darkBlue:     { color: 'darkBlue',   variant: 'elevated' },
  darkOrange:   { color: 'darkOrange', variant: 'elevated' },
  lightBlue:    { color: 'lightBlue',  variant: 'elevated', class: 'text-darkBlue' },
  white:        { variant: 'flat',     class: 'rounded-xl bg-white text-darkBlue' },
  whiteOutline: { variant: 'outlined', class: 'rounded-xl border-white text-white text-caption' },
}

const config = computed(() => kindMap[props.kind] ?? kindMap.darkBlue)
</script>
