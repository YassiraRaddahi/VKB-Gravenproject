<template>
  <v-container fluid class="pa-0 list-page-container">
    <v-container fluid class="pa-0">
      <v-row>
        <v-col cols="12" class="text-center d-flex justify-center mt-10 mb-12">
          <h2 class="title">Lijst met beheerders</h2>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="pa-4">
      <v-row no-gutters class="d-flex align-center mb-6">
        <v-col cols="12" md="6">
          <v-text-field v-model="search" label="Zoek beheerder..." prepend-inner-icon="mdi-magnify" clearable outlined
            dense color="primary" class="search-input" />
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center justify-end">
          <v-btn color="primary" dark class="ma-0" @click="addManager">
            <v-icon left>mdi-plus</v-icon>
            Toevoegen
          </v-btn>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col v-for="cemeteryManager in filteredManagers" :key="cemeteryManager.id" cols="12" sm="6" md="4" lg="3"
          class="d-flex align-stretch">
          <v-card class="manager-card py-6 px-4 d-flex flex-column h-100" elevation="4">
            <v-card-text class="text-center d-flex flex-column justify-center align-center">
              <v-avatar :size="smAndUp ? 200 : 150">
                <!-- Profile picture or fallback icon -->
                <v-img v-if="cemeteryManager.profile_picture_url" :src="cemeteryManager.profile_picture_url" :key="cemeteryManager.profile_picture_url" alt="profielfoto" cover>
                  <template #error>
                    <v-icon color="#0d475a" :size="mdAndUp ? 200 : 150">
                      mdi-account
                    </v-icon>
                  </template>
                </v-img>

                <v-icon v-else color="#0d475a" :size="mdAndUp ? 200 : 150">
                  mdi-account
                </v-icon>
              </v-avatar>

              <div class="text-subtitle-1 font-weight-medium">
                {{ cemeteryManager.first_name }} {{ cemeteryManager.infix }} {{ cemeteryManager.last_name }}
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

const { smAndUp, mdAndUp } = useDisplay()

let url = 'http://localhost:3001/api/cemetery-managers'

const cemeteryManagers = ref([])
const search = ref('')

//property voor gefilterde beheerders
const filteredManagers = computed(() => {
  const query = search.value.toLowerCase().trim()
  if (!query) return cemeteryManagers.value
  return cemeteryManagers.value.filter(m => {
    const fullName = `${m.first_name} ${m.infix ?? ''} ${m.last_name}`.toLowerCase()
    return fullName.includes(query)
  })
})

function addManager() {
  alert('Toevoegen beheerder knop geklikt (functie is nog niet gemaakt)')
}

onMounted(() => {
  axios.get(url)
    .then(response => {
      cemeteryManagers.value = response.data['cemetery-managers']
    })
    .catch(error => {
      console.error('Fout bij ophalen beheerders:', error)
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
