<template>
  <v-container fluid class="pa-0">
    <v-row class="justify-center mt-10 mb-12">
      <v-col cols="12" class="text-center">
        <h2 class="title">Lijst met begraafplaatsen</h2>
      </v-col>
    </v-row>
  </v-container>

  <v-container fluid class="pa-4">

    <!-- Filters -->
    <v-row no-gutters class="mb-6 gap-2 d-flex align-center">
      <v-col cols="12" md="4">
        <v-text-field v-model="search" label="Zoeken..." prepend-inner-icon="mdi-magnify" clearable outlined dense
          color="primary" class="search-field" />
      </v-col>

      <v-col cols="12" md="2">
        <v-select v-model="managerFilter" :items="managerOptions" label="Beheerder" clearable outlined dense
          color="primary" class="filter-select" />
      </v-col>

      <v-col cols="12" md="2">
        <v-select v-model="cityFilter" :items="cityOptions" label="Plaats" clearable outlined dense color="primary"
          class="filter-select" />
      </v-col>

      <v-col cols="12" md="5" class="d-flex align-center justify-end">
        <v-btn color="primary" dark class="ma-0" @click="addCemetery">
          <v-icon left>mdi-plus</v-icon>
          Toevoegen
        </v-btn>
      </v-col>
    </v-row>

    <!-- Cemetery cards -->
    <v-row dense class="d-flex align-stretch">
      <v-col v-for="cemetery in filteredCemeteries" :key="cemetery.id" cols="12" sm="6" md="4" lg="3"
        class="d-flex align-stretch">
        <router-link :to="{ name: 'Graves', params: { cemetery_id: cemetery.id } }"
          class="text-decoration-none w-100 d-flex full-height">
          <v-card class="cemetery-card d-flex flex-column ">

            <v-img :src="cemetery.image_url" height="200" class="white--text align-end">
            </v-img>

            <v-card-text class="cemetery-card-text text-center">
              <div class="text-subtitle-1 font-weight-bold mb-2">
                {{ cemetery.name }}
              </div>

              <div class="manager-list text-body-2 text-grey-darken-1">
                <div v-if="cemetery.cemetery_managers?.length > 0" v-for="cemeteryManager in cemetery.cemetery_managers"
                  :key="cemeteryManager.id" class="manager-item">
                  <span class="manager-label">Beheerder</span>
                  <span class="manager-name">
                    {{ cemeteryManager.first_name }}
                    {{ cemeteryManager.infix }}
                    {{ cemeteryManager.last_name }}
                  </span>
                </div>

                <div v-else class="manager-item">
                  <span class="manager-label">Beheerder</span>
                  <span class="manager-name text-grey-darken-2">
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
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const cemeteries = ref([])
const search = ref('')
const managerFilter = ref(null)
const cityFilter = ref(null)
const url = 'http://localhost:3001/api/cemeteries'
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
  alert('Toevoegen begraafplaats knop geklikt (Helaas functie is nog niet gemaakt)')
}

onMounted(() => {
  axios.get(url)
    .then(res => cemeteries.value = res.data.cemeteries)
    .catch(err => console.error('Fout bij ophalen begraafplaatsen:', err))
})
</script>

<style scoped>
v-field {
  max-width: 500px;
}
.full-height {
  height: 100%;
}

.cemetery-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 450px;
}

.cemetery-image {
  width: 100%;
  height: 200px;
  display: block;
  object-fit: cover;
}

.cemetery-card-text {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
}

.manager-list {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.manager-item {
  width: 100%;
  padding: 8px 12px;
  border-radius: 10px;
  background: rgba(30, 76, 111, 0.05);
}

.manager-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: #164653;
  margin-bottom: 4px;
}

.manager-name {
  display: block;
  font-size: 0.95rem;
  color: #2f4f6d;
}
</style>