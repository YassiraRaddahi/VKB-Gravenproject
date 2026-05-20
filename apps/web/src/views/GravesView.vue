<template>
  <v-container fluid class="pa-0 list-page-container">

    <TitleUnderline :title="`Graven van ${cemetery?.name}`" underline-class="underlineLightBlue" />

    <v-container fluid class="pa-4">
      <SearchAddBar :search="search" @update:search="search = $event" search-label="Zoek graf..." :search-md="4"
        density="comfortable" @add="addCemetery">
        <v-col cols="12" md="2">
          <v-select v-model="statusFilter" :items="statusOptions" label="Status" clearable outlined
            density="comfortable" color="primary" class="filter-select" />
        </v-col>
      </SearchAddBar>

      <EmptyState v-if="visibleGraves.length === 0" message="Geen graven gevonden." />

      <v-row density="comfortable">
        <v-col v-for="grave in visibleGraves" :key="grave.grave_number" cols="12" sm="6" md="4" lg="3"
          class="d-flex align-stretch">
          <ItemCard :image="grave.image_url"
            :image-alt="`Vooraanzicht van graf ${grave.grave_number} op ${cemetery?.name}`" :title="grave.grave_number"
            title-class="text-h6">
            <div class="text-caption">Status: {{ grave.status }}</div>
          </ItemCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import TitleUnderline from '@/components/ui/TitleUnderline.vue'
import SearchAddBar from '@/components/ui/SearchAddBar.vue'
import ItemCard from '@/components/ui/ItemCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

const route = useRoute()
const cemetery_id = route.params.cemetery_id

const graves = ref([])
const cemetery = ref(null)
const search = ref('')
const statusFilter = ref(null)
const url = `${import.meta.env.VITE_API_URL}/cemeteries/${cemetery_id}/graves`

const statusOptions = [
  { title: 'Beschikbaar', value: 'beschikbaar' },
  { title: 'In gebruik', value: 'in gebruik' },
  { title: 'Gereserveerd', value: 'gereserveerd' }
]

const visibleGraves = computed(() => {
  let result = graves.value


  const query = search.value.toLowerCase().trim()
  if (query) {
    result = result.filter(grave => grave.grave_number.toString().toLowerCase().includes(query))
  }

  if (statusFilter.value) {
    result = result.filter(grave => grave.status?.toLowerCase() === statusFilter.value.toLowerCase())
  }

  return result
})

let pageTitle = computed(() => {
  return cemetery.value?.name
    ? `Graven van ${cemetery.value?.name} | Kerkhovenbeheer Nederland`
    : "Graven van uw kerkhof | Kerkhovenbeheer Nederland"
})

let pageDescription = computed(() => {
  return cemetery.value?.name
    ? `Bekijk en beheer al uw graven van ${cemetery.value?.name} op één plek. Zoek, filter of klik op een graf en bekijk de details, voeg nieuwe graven toe en houd uw gegevens up-to-date.`
    : "Beheer al uw graven van uw kerkhof op één plek. Zoek, filter of klik op een graf en bekijk de details, voeg nieuwe graven toe en houd uw gegevens up-to-date."
})

useHead({
  title: pageTitle,
  meta: [
    {
      name: 'description',
      content: pageDescription
    }
  ]
})



function addCemetery() {
  alert('Toevoegen graf knop geklikt (functie is nog niet gemaakt)')
}

onMounted(() => {
  axios.get(url)
    .then(response => {
      console.log(response)
      graves.value = response.data.graves
      cemetery.value = response.data.cemetery
    })
    .catch(error => {
      console.error("Fout bij ophalen graven:", error)
    })
})


</script>

<style scoped>
.search-field :deep(.v-field) {
  min-height: 32px;
}

.search-field :deep(.v-field__input) {
  font-size: 0.8rem;
  padding: 0px 3px;
}

.search-field :deep(.v-field__control) {
  min-height: 32px;
}

.filter-select :deep(.v-field) {
  min-height: 32px;
}

.filter-select :deep(.v-field__input) {
  font-size: 0.8rem;
  padding: 1px 2px;
}

.filter-select :deep(.v-field__control) {
  min-height: 32px;
}

.filter-select :deep(.v-field--appended .v-field__input) {
  padding-right: 2px;
}
</style>
