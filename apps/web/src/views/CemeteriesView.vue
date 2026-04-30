<template>
  <v-container fluid class="pa-0 list-page-container">
    <ListSideBar />

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>Toevoegen</v-card-title>
        <v-card-text>
          Toevoegen begraafplaats knop geklikt.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false">Sluiten</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-container fluid class="pa-0">
      <v-row>
        <v-col cols="12" class="text-center d-flex justify-center mt-10 mb-12">
          <h2 class="titleLightBlue">Lijst met begraafplaatsen</h2>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="pa-4">
      <v-row no-gutters class="d-flex align-center mb-6">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="search"
            label="Zoek begraafplaats..."
            prepend-inner-icon="mdi-magnify"
            clearable
            outlined
            dense
            color="primary"
            class="search-input"
          />
        </v-col>

        <v-col cols="12" md="6" class="d-flex align-center justify-end">
          <v-btn color="primary" dark class="ma-0" @click="addCemetery">
            <v-icon left>mdi-plus</v-icon>
            Toevoegen
          </v-btn>
        </v-col>
      </v-row>

      <v-row dense :key="$route.fullPath">
        <v-col
          v-for="cemetery in filteredCemeteries"
          :key="cemetery.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="d-flex align-stretch"
        >
          <v-card class="manager-card py-6 px-4 d-flex flex-column h-100" elevation="4">
            <v-card-text class="text-center d-flex flex-column justify-center align-center">
              
              <!-- Afbeelding -->
              <v-avatar :size="smAndUp ? 200 : 150">
                <v-img
                  v-if="cemetery.image_url"
                  :src="cemetery.image_url"
                  :key="cemetery.image_url + '-' + $route.fullPath"
                  alt="begraafplaats afbeelding"
                  cover
                >
                  <template #error>
                    <v-icon color="#0d475a" :size="mdAndUp ? 200 : 150">
                      mdi-image-off
                    </v-icon>
                  </template>
                </v-img>

                <v-icon v-else color="#0d475a" :size="mdAndUp ? 200 : 150">
                  mdi-image
                </v-icon>
              </v-avatar>

              <!-- Naam -->
              <div class="text-subtitle-1 font-weight-medium">
                {{ cemetery.name }}
              </div>

            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import { useDisplay } from 'vuetify'
import ListSideBar from '@/components/ListSideBar.vue'

const { smAndUp, mdAndUp } = useDisplay()

let url = 'http://localhost:3001/api/cemeteries'

const cemeteries = ref([])
const search = ref('')
const dialog = ref(false)

const filteredCemeteries = computed(() => {
  const query = search.value.toLowerCase().trim()
  if (!query) return cemeteries.value

  return cemeteries.value.filter(c =>
    c.name.toLowerCase().includes(query)
  )
})

function addCemetery() {
  dialog.value = true
}

onMounted(() => {
  axios.get(url)
    .then(response => {
      cemeteries.value = response.data.cemeteries
    })
    .catch(error => {
      console.error('Fout bij ophalen begraafplaatsen:', error)
    })
})
</script>

<style scoped>
.manager-card {
  min-height: 250px;
  width: 100%;
}

.manager-card .v-avatar {
  margin: 10px;
}
</style>