<template>
     <v-container fluid class="pa-4">
    <TitleUnderline 
         :title="`Lijst van Rechthebbenden`"
         underline-class="underlineLightBlue"
        />
     <v-container fluid class="pa-4">
      <SearchAddBar :search="search" @update:search="search = $event" search-label="Zoek rechthebbende..." :search-md="6"
        @add="addRightHolder" />

      <EmptyState v-if="visibleRightHolders.length === 0" message="Geen rechthebbenden gevonden." />

      <v-row dense :key="$route.fullPath">
        <v-col v-for="rightHolder in visibleRightHolders" :key="rightHolder.id" cols="12" sm="6" md="4" lg="3"
          class="d-flex align-stretch">
          <ItemCard show-avatar :avatar="rightHolder.profile_picture_url"
            :image-alt="`Profielfoto van rechthebbende ${graveOwnerFullName(rightHolder)}`"
            :title="graveOwnerFullName(rightHolder)" :elevation="4" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

import TitleUnderline from '../components/ui/TitleUnderline.vue'
import SearchAddBar from '@/components/ui/SearchAddBar.vue'
import ItemCard from '@/components/ui/ItemCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

const search = ref('')
const graveOwners = ref([])

const url = `${import.meta.env.VITE_API_URL}/grave-owners`

const graveOwnerFullName = (graveOwner) => {
  return [
    graveOwner.first_names?.trim().split(/\s+/)[0] || '',
    graveOwner.infix,
    graveOwner.last_name
  ]
    .filter(Boolean)
    .join(' ')
}

const visibleRightHolders = computed(() => {
  const query = search.value.toLowerCase().trim()

  if (!query) return graveOwners.value

  return graveOwners.value.filter((rh) => {
    const fullName = graveOwnerFullName(rh).toLowerCase()
    return fullName.includes(query)
  })
})

const addRightHolder = () => {
  // bijvoorbeeld:
  // router.push({ name: 'CreateGraveOwner' })
}

onMounted(() => {
  axios.get(url)
    .then((response) => {
      graveOwners.value =
        response.data['grave-owners'] ||
        response.data['grave-owners'] ||
        response.data
    })
    .catch((error) => {
      console.error('Fout bij ophalen rechthebbenden:', error)
    })
})
</script>
<style scoped></style>