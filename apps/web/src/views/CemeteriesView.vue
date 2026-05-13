<template>
  <v-container fluid class="pa-0 list-page-container">
    <TitleUnderline 
    title="Lijst met kerkhoven" 
    underline-class="underlineLightBlue"
    />

    <v-container fluid class="pa-4">

      <!-- Filters -->
      <v-row no-gutters class="mb-6 gap-3 d-flex align-center">
        <v-col cols="12" md="4">
          <v-text-field v-model="search" label="Zoek kerkhof..." prepend-inner-icon="mdi-magnify" clearable outlined dense
            color="primary" />
        </v-col>

        <v-col cols="12" md="2">
          <v-select v-model="managerFilter" :items="managerOptions" label="Beheerder" clearable outlined dense
            color="primary" />
        </v-col>

        <v-col cols="12" md="2">
          <v-select v-model="cityFilter" :items="cityOptions" label="Plaats" clearable outlined dense color="primary" />
        </v-col>

        <v-col cols="12" md="4" class="d-flex align-center justify-end">
          <v-btn color="primary" dark class="ma-0" @click="addCemetery">
            <v-icon left>mdi-plus</v-icon>
            Toevoegen
          </v-btn>
        </v-col>
      </v-row>

      <!-- Cemetery cards -->
      <v-row dense class="d-flex align-stretch" :key="$route.fullPath">
        <v-col v-for="cemetery in filteredCemeteries" :key="cemetery.id" cols="12" sm="6" md="4" lg="3"
          class="d-flex align-stretch">
            <router-link :to="{ name: 'CemeteryDetails', params: { cemetery_id: cemetery.id } }"
            class="text-decoration-none w-100 d-flex h-100">
            <v-card class="d-flex flex-column w-100" style="min-height: 450px;">

              <div class="w-100" style="height: 200px; overflow: hidden;">
                <v-img :src="cemetery.image_url" :alt="`Impressiefoto van ${cemetery.name}`" :key="cemetery.image_url + '-' + $route.fullPath" cover class="w-100 h-100" />
              </div>

              <v-card-text class="flex-grow-1 d-flex flex-column justify-space-between pa-4">
                <div class="text-subtitle-1 font-weight-bold mb-2" align="center">
                  {{ cemetery.name }}
                </div>

                <div class="d-flex flex-column justify-end" style="min-height: 100px; gap: 10px;">
                  <div v-if="cemetery.cemetery_managers?.length > 0"
                    v-for="cemeteryManager in cemetery.cemetery_managers" :key="cemeteryManager.id"
                    class="w-100" style="padding: 8px 12px; border-radius: 10px; background: rgba(30, 76, 111, 0.05);">
                    <span class="d-block text-body-2 font-weight-bold mb-1" align="center" style="color: #164653;">Beheerder</span>
                    <span class="d-block text-body-1" style="color: #2f4f6d;" align="center">
                      {{ cemeteryManager.first_name }}
                      {{ cemeteryManager.infix }}
                      {{ cemeteryManager.last_name }}
                    </span>
                  </div>

                  <div v-else class="w-100" style="padding: 8px 12px; border-radius: 10px; background: rgba(30, 76, 111, 0.05);">
                    <span class="d-block text-body-2 font-weight-bold mb-1" align="center" style="color: #164653;">Beheerder</span>
                    <span class="d-block text-body-1 text-grey-darken-2" align="center">
                      Nog niet toegewezen
                    </span>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import TitleUnderline from '../components/TitleUnderline.vue'

const cemeteries = ref([])
const search = ref('')
const managerFilter = ref(null)
const cityFilter = ref(null)
const url = `${import.meta.env.VITE_API_URL}/cemeteries`

// Dynamisch unieke beheerders verzamelen voor filteropties
const managerOptions = computed(() => {
  const managers = new Map()
  cemeteries.value.forEach(cemetery => {
    cemetery.cemetery_managers?.forEach(manager => {
      const key = manager.id
      const label = `${manager.first_name} ${manager.infix || ''} ${manager.last_name}`.trim()
      if (!managers.has(key)) {
        managers.set(key, { title: label, value: key })
      }
    })
  })
  return Array.from(managers.values())
})

// Dynamisch unieke steden verzamelen voor filteropties
const cityOptions = computed(() => {
  const cities = new Set()
  cemeteries.value.forEach(cemetery => {
    if (cemetery.city?.trim()) cities.add(cemetery.city.trim())
  })
  return Array.from(cities)
    .sort()
    .map(city => ({ title: city, value: city }))
})

// Filter logica
const filteredCemeteries = computed(() => {
  let result = cemeteries.value
  const query = search.value.toLowerCase().trim()
  if (query) result = result.filter(c => c.name.toLowerCase().includes(query))
  //filteren op beheerder
  if (managerFilter.value) {
    result = result.filter(cemetery =>
      cemetery.cemetery_managers?.some(manager => manager.id === managerFilter.value)
    )
  }

  // Filteren op stad
  if (cityFilter.value) {
    result = result.filter(cemetery => cemetery.city === cityFilter.value)
  }

  return result
})

//knop tovoegen 
function addCemetery() {
  alert('Toevoegen kerkhof knop geklikt (Helaas is de functie nog niet gemaakt)')
}

onMounted(() => {
  axios.get(url)
    .then(res => cemeteries.value = res.data.cemeteries)
    .catch(err => console.error('Fout bij ophalen kerkhoven:', err))
})
</script>

<style scoped>
</style>