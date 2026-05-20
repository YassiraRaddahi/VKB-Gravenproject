<template>
  <component
    :is="to ? RouterLink : 'div'"
    :to="to"
    class="text-decoration-none w-100 d-flex h-100"
  >
    <v-card :elevation="elevation" class="item-card d-flex flex-column w-100">

      <div v-if="image" class="image-wrapper">
        <v-img :src="image" :alt="imageAlt" cover class="image-fill" />
      </div>

      <v-card-text class="item-card-text text-center d-flex flex-column justify-center align-center">

        <v-avatar v-if="showAvatar" :size="smAndUp ? 200 : 150" class="mb-2">
          <v-img v-if="avatar" :src="avatar" :alt="imageAlt" cover>
            <template #error>
              <v-icon color="darkBlue" :size="mdAndUp ? 200 : 150">mdi-account</v-icon>
            </template>
          </v-img>
          <v-icon v-else color="darkBlue" :size="mdAndUp ? 200 : 150">mdi-account</v-icon>
        </v-avatar>

        <div class="font-weight-bold mb-1" :class="titleClass">{{ title }}</div>

        <slot />

      </v-card-text>
    </v-card>
  </component>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useDisplay } from 'vuetify'

defineProps({
  title:      { type: String,          required: true },
  image:      { type: String,          default: undefined },
  imageAlt:   { type: String,          default: '' },
  showAvatar: { type: Boolean,         default: false },
  avatar:     { type: String,          default: undefined },
  to:         { type: [Object, String],default: undefined },
  elevation:  { type: Number,          default: 2 },
  titleClass: { type: String,          default: 'text-subtitle-1' },
})

const { smAndUp, mdAndUp } = useDisplay()
</script>

<style scoped>
.item-card {
  min-height: 300px;
  width: 100%;
}

.item-card-text {
  flex: 1 1 auto;
  padding: 16px;
}

.image-wrapper {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.image-fill {
  width: 100%;
  height: 100%;
}
</style>
