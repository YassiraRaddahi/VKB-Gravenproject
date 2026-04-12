<template>
  <v-container fluid class="pa-0 list-page-container">
    <v-container fluid class="pa-0">
      <v-row>
        <v-col cols="12" class="text-center d-flex justify-center mt-10 mb-12">
          <h2 class="title">Lijst met graven</h2>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="pa-4">
      <v-row no-gutters class="d-flex align-center mb-6 gap-2">
        <v-col cols="12" md="4">
          <v-text-field v-model="search" label="Zoek graf..." prepend-inner-icon="mdi-magnify" clearable outlined dense
            color="primary" class="search-field" />
        </v-col>
        <v-col cols="12" md="2">
          <v-select v-model="statusFilter" :items="statusOptions" label="Status" clearable outlined dense
            color="primary" class="filter-select" />
        </v-col>
        <v-col cols="12" md="6" class="d-flex justify-end">
          <v-btn color="primary" dark class="ma-0" @click="addCemetery">
            <v-icon left>mdi-plus</v-icon>
            Toevoegen
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="text-center" v-if="filteredGraves.length === 0">
          <v-alert type="info" border="left" color="blue" elevation="0">
            Geen graven gevonden.
          </v-alert>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col v-for="grave in filteredGraves" :key="grave.grave_number" cols="12" sm="6" md="4" lg="3"
          class="d-flex align-stretch">
          <v-card elevation="2" class="grave-card d-flex flex-column h-100">
            <v-img :src="grave.image_url" :alt="grave.grave_number" height="220" cover class="grave-image" />
            <v-card-text class="text-center d-flex flex-column justify-center">
              <div class="text-h6 font-weight-bold mb-1">{{ grave.grave_number }}</div>
              <div class="caption">Status: {{ grave.status }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>

import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const cemetery_id = route.params.cemetery_id

const graves = ref([])
const search = ref('')
const statusFilter = ref(null)
const url = `http://localhost:3001/api/graves/${cemetery_id}`

const statusOptions = [
  { title: 'Beschikbaar', value: 'beschikbaar' },
  { title: 'In gebruik', value: 'in gebruik' },
  { title: 'Gereserveerd', value: 'gereserveerd' }
]

const filteredGraves = computed(() => {
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




onMounted(() => {
  axios.get(url)
    .then(response => {
      console.log(response)
      graves.value = response.data.graves
    })
    .catch(error => {
      console.error("Fout bij ophalen graven:", error)
    })
})
</script>

<style scoped>
.grave-image {
  width: 100%;
  height: 220px;
  min-height: 220px;
  max-height: 220px;
  object-fit: cover;
}

.grave-card {
  min-height: 450px;
  width: 100%;
}

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
