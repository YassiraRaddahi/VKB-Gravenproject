<template>
  <v-container fluid class="pa-0 list-page-container">
    <TitleUnderline title="Lijst met beheerders" underline-class="underlineLightBlue" />

    <v-container fluid class="pa-4">
      <SearchAddBar :search="search" @update:search="search = $event" search-label="Zoek beheerder..." :search-md="6"
        @add="addManager" />

      <EmptyState v-if="visibleManagers.length === 0" message="Geen beheerders gevonden." />

      <v-row dense :key="$route.fullPath">
        <v-col v-for="cemeteryManager in visibleManagers" :key="cemeteryManager.id" cols="12" sm="6" md="4" lg="3"
          class="d-flex align-stretch">
          <ItemCard show-avatar :avatar="cemeteryManager.profile_picture_url"
            :image-alt="`Profielfoto van beheerder ${managerFullName(cemeteryManager)}`"
            :to="{ name: 'CemeteryManager', params: { manager_id: cemeteryManager.id } }"
            :title="managerFullName(cemeteryManager)" :elevation="4" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import TitleUnderline from '@/components/ui/TitleUnderline.vue'
import SearchAddBar from '@/components/ui/SearchAddBar.vue'
import ItemCard from '@/components/ui/ItemCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

let url = `${import.meta.env.VITE_API_URL}/cemetery-managers`

const cemeteryManagers = ref([])

const managerFullName = (manager) => {
  return [
    manager.first_names?.trim().split(/\s+/)[0] || '', // Gebruik alleen de eerste voornaam
    manager.infix,
    manager.last_name
  ]
    .filter(Boolean)
    .join(' ')
}


const search = ref('')

//property voor gefilterde beheerders
const visibleManagers = computed(() => {
  const query = search.value.toLowerCase().trim()
  if (!query) return cemeteryManagers.value
  return cemeteryManagers.value.filter(m => {
    const fullName = managerFullName(m).toLowerCase()
    return fullName.includes(query)
  })
})

function addManager() {
  alert('Toevoegen beheerder knop geklikt (functie is nog niet gemaakt)')
}

onMounted(() => {
  axios.get(url)
    .then(response => {
      console.log(response.data)

      cemeteryManagers.value =
        response.data['cemetery-managers'] ||
        response.data.cemeteryManagers ||
        response.data
    })
    .catch(error => {
      console.error('Fout bij ophalen beheerders:', error)
    })
})
</script>

<style scoped></style>
