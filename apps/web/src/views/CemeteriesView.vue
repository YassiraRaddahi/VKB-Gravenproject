<template>
  <v-container fluid class="fill-height pa-0">
    <v-container class="py-10">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h1 class="titleLightBlue">Lijst met begraafplaatsen</h1>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-card rounded="xl" elevation="3" class="pa-4 mb-8">
        <v-row dense align="center">
          <v-col cols="12" md="4">
            <v-text-field v-model="search" label="Zoeken..." prepend-inner-icon="mdi-magnify" variant="outlined"
              clearable hide-details />
          </v-col>

          <v-col cols="12" md="3">
            <v-select v-model="managerFilter" :items="managerOptions" label="Beheerder" variant="outlined" clearable
              hide-details />
          </v-col>

          <v-col cols="12" md="3">
            <v-select v-model="cityFilter" :items="cityOptions" label="Plaats" variant="outlined" clearable
              hide-details />
          </v-col>

          <v-col cols="12" md="2">
            <v-btn color="primary" size="large" rounded="lg" block prepend-icon="mdi-plus" @click="addCemetery">
              Toevoegen
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <v-container>
      <v-row dense>
        <v-col v-for="cemetery in filteredCemeteries" :key="cemetery.id" cols="12" sm="6" md="4" lg="3">
          <v-card rounded="xl" elevation="3" hover class="d-flex flex-column" height="350"
            @click="openDialog(cemetery)">
            <v-img :src="cemetery.image_url || 'https://via.placeholder.com/400x250?text=Geen afbeelding'" height="200"
              cover />

            <v-sheet height="100" class="d-flex align-center justify-center px-3">
              <v-card-text class="text-center font-weight-bold" lines="2">
                {{ cemetery.name }}
              </v-card-text>
            </v-sheet>

          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" max-width="600">
      <v-card rounded="xl">
        <v-img v-if="selectedCemetery?.image_url" :src="selectedCemetery.image_url" height="200" cover />
        <v-card-title class="font-weight-bold">
          {{ selectedCemetery?.name }}
        </v-card-title>

        <v-card-text>
          <v-list density="compact">
            <v-list-item>
              <v-list-item-title>
                <strong>Adres:</strong> {{ selectedCemetery?.address }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <strong>Postcode:</strong> {{ selectedCemetery?.postal_code }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <strong>Plaats:</strong> {{ selectedCemetery?.city }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" rounded="lg" @click="goToGraves">
            Ga naar graven
          </v-btn>
          <v-btn variant="text" @click="dialog = false">
            Sluiten
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" color="success" location="top center" timeout="3000">
      Begraafplaats toegevoegd!
    </v-snackbar>

  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const cemeteries = ref([])
const search = ref('')
const managerFilter = ref(null)
const cityFilter = ref(null)
const dialog = ref(false)
const snackbar = ref(false)
const selectedCemetery = ref(null)

const url = 'http://localhost:3001/api/cemeteries'

const managerOptions = computed(() => {
  const map = new Map()
  cemeteries.value.forEach(c => {
    c.cemetery_managers?.forEach(m => {
      if (!map.has(m.id)) {
        map.set(m.id, {
          title: `${m.first_name} ${m.infix ?? ''} ${m.last_name}`,
          value: m.id
        })
      }
    })
  })
  return [...map.values()]
})

const cityOptions = computed(() =>
  [...new Set(cemeteries.value.map(c => c.city))].map(city => ({
    title: city,
    value: city
  }))
)

const filteredCemeteries = computed(() =>
  cemeteries.value.filter(c => {
    return (
      c.name.toLowerCase().includes(search.value.toLowerCase()) &&
      (!managerFilter.value || c.cemetery_managers?.some(m => m.id === managerFilter.value)) &&
      (!cityFilter.value || c.city === cityFilter.value)
    )
  })
)

function openDialog(cemetery) {
  selectedCemetery.value = cemetery
  dialog.value = true
}

function goToGraves() {
  dialog.value = false
  router.push({ name: 'Graves', params: { cemetery_id: selectedCemetery.value.id } })
}

function addCemetery() {
  snackbar.value = true
}

onMounted(async () => {
  const res = await axios.get(url)
  cemeteries.value = res.data.cemeteries
})
</script>