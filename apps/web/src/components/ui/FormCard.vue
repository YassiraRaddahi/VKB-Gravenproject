<template>
  <v-card v-if="embedded" :class="cardClasses">
    <slot />
  </v-card>

  <v-container v-else :fluid="fluid" :class="{ 'px-0': !smAndUp }">
    <v-row justify="center">
      <v-col :cols="cols" :sm="sm" :lg="lg" :xl="xl" :xxl="xxl">
        <v-card :class="cardClasses">
          <slot />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps({
  bgColor: { type: String, default: 'darkBlue' },
  padding: { type: String, default: 'pa-8' },
  fluid: { type: Boolean, default: false },
  embedded: { type: Boolean, default: false },
  cols: { type: [String, Number], default: 12 },
  sm: { type: [String, Number], default: 8 },
  lg: { type: [String, Number], default: 6 },
  xl: { type: [String, Number], default: 5 },
  xxl: { type: [String, Number], default: 4 },
})

const { smAndUp } = useDisplay()

const cardClasses = computed(() => [
  { 'rounded-xl': smAndUp.value, 'rounded-0': !smAndUp.value },
  props.padding,
  `bg-${props.bgColor}`,
])
</script>
