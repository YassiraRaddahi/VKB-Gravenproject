<template>
  <v-container fluid class="fill-height pa-0 list-page-container">

    <!-- Header -->
    <v-container class="py-10">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h2 class="titleLightBlue">Lijst met graven</h2>
        </v-col>
      </v-row>
    </v-container>

    <!-- Filters -->
    <v-container>
      <v-card rounded="xl" elevation="3" class="pa-4 mb-8">
        <v-row dense align="center">
          <v-col cols="12" md="6">
            <v-text-field v-model="search" label="Zoek graf..." prepend-inner-icon="mdi-magnify" variant="outlined"
              density="comfortable" clearable hide-details />
          </v-col>

          <v-col cols="12" md="3">
            <v-select v-model="statusFilter" :items="statusOptions" label="Status" variant="outlined"
              density="comfortable" clearable hide-details />
          </v-col>

          <v-col cols="12" md="3">
            <v-btn color="primary" size="large" rounded="lg" block prepend-icon="mdi-plus" @click="addGrave">
              Toevoegen
            </v-btn>  
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!-- Cards -->
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center" v-if="filteredGraves.length === 0">
          <v-alert type="info" border="left" color="blue" elevation="0">
            Geen graven gevonden.
          </v-alert>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col v-for="grave in filteredGraves" :key="grave.id" cols="12" sm="6" md="4" lg="3">
          <v-card rounded="xl" elevation="3" class="d-flex flex-column h-100" hover @click="openDialog(grave)">
            <v-img :src="grave.image_url" height="180" cover />
            <v-card-title class="text-h6 font-weight-bold">
              {{ grave.grave_number }}
            </v-card-title>
            <v-card-subtitle>
              Status: {{ grave.status }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Grave Dialog -->
    <v-dialog v-model="dialog" max-width="480">
      <v-card rounded="xl">
        <v-img v-if="selectedGrave?.image_url" :src="selectedGrave.image_url" height="200" cover />
        <v-card-title class="font-weight-bold">
          Graf {{ selectedGrave?.grave_number }}
        </v-card-title>
        <v-card-text>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title><strong>Type:</strong> {{ selectedGrave?.type }}</v-list-item-title>
                <v-list-item-subtitle><strong>Soort:</strong> {{ selectedGrave?.sort }}</v-list-item-subtitle>
                <v-list-item-subtitle><strong>Status:</strong> {{ selectedGrave?.status }}</v-list-item-subtitle>
                <v-list-item-subtitle><strong>Latitude:</strong> {{ selectedGrave?.latitude }}</v-list-item-subtitle>
                <v-list-item-subtitle><strong>Longitude:</strong> {{ selectedGrave?.longitude }}</v-list-item-subtitle>
                <v-list-item-subtitle><strong>Laatste opening:</strong> {{ selectedGrave?.last_opened_at || 'Niet beschikbaar' }}</v-list-item-subtitle>
                <v-list-item-subtitle><strong>Laatste schoonmaak:</strong> {{ selectedGrave?.last_cleared_at || 'Niet beschikbaar' }}</v-list-item-subtitle>
                <v-list-item-subtitle><strong>Opmerkingen:</strong> {{ selectedGrave?.remarks || 'Geen opmerkingen' }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">Sluiten</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="showSnackbar" location="top center" timeout="3000">
      <v-alert color="success" variant="tonal" border="left" class="d-flex align-center">
        <v-icon class="me-2">mdi-check-circle</v-icon>
        Graf succesvol toegevoegd!
        <v-btn variant="text" class="ms-auto" @click="showSnackbar = false">Sluiten</v-btn>
      </v-alert>
    </v-snackbar>

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
const dialog = ref(false)
const selectedGrave = ref(null)
const showSnackbar = ref(false)

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
    result = result.filter(grave => grave.grave_number.toLowerCase().includes(query))
  }

  if (statusFilter.value) {
    result = result.filter(grave => grave.status?.toLowerCase() === statusFilter.value.toLowerCase())
  }

  return result
})

function addGrave() {
  // Hier kun je later API call toevoegen
  showSnackbar.value = true
  console.log("Toevoegen knop geklikt")
}

function openDialog(grave) {
  selectedGrave.value = grave
  dialog.value = true
}

onMounted(() => {
  axios.get(url)
    .then(response => {
      graves.value = response.data.graves
    })
    .catch(error => {
      console.error("Fout bij ophalen graven:", error)
    })
})
</script>