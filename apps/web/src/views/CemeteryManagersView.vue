<template>
  <v-container fluid class="fill-height pa-0">

    <!-- Header -->
    <v-container class="py-10">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h2 class="titleLightBlue">Lijst met beheerders</h2>
        </v-col>
      </v-row>
    </v-container>

    <!-- Zoek en Toevoegen -->
    <v-container>
      <v-card rounded="xl" elevation="3" class="pa-4 mb-8">
        <v-row dense align="center">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="search"
              label="Zoek beheerder..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="comfortable"
              clearable
              hide-details
            />
          </v-col>

          <v-col cols="12" md="6" class="d-flex justify-end">
            <v-btn
              color="primary"
              size="large"
              rounded="lg"
              prepend-icon="mdi-plus"
              @click="addManager"
            >
              Toevoegen
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!-- Kaarten met beheerders -->
    <v-container>
      <v-row>
        <v-col
          v-for="manager in filteredManagers"
          :key="manager.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            rounded="xl"
            elevation="3"
            class="d-flex flex-column h-100"
            hover
            @click="openDialog(manager)"
          >
            <v-card-text class="text-center d-flex flex-column justify-center align-center py-6 px-4">
              <v-avatar :size="smAndUp ? 180 : 140">
                <v-img
                  v-if="manager.profile_picture_url"
                  :src="manager.profile_picture_url"
                  cover
                >
                  <template #error>
                    <v-icon color="#0d475a" :size="smAndUp ? 180 : 140">mdi-account</v-icon>
                  </template>
                </v-img>
                <v-icon v-else color="#0d475a" :size="smAndUp ? 180 : 140">mdi-account</v-icon>
              </v-avatar>

              <div class="text-subtitle-1 font-weight-medium mt-4">
                {{ manager.first_name }} {{ manager.infix ?? '' }} {{ manager.last_name }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card rounded="xl" elevation="3">
        <v-img
          v-if="selectedManager?.profile_picture_url"
          :src="selectedManager.profile_picture_url"
          height="auto"
          cover
        />

        <v-card-title class="font-weight-bold">
          {{ selectedManager?.first_name }} {{ selectedManager?.infix ?? '' }} {{ selectedManager?.last_name }}
        </v-card-title>

        <v-card-text>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <strong>Email:</strong> {{ selectedManager?.email || 'Geen e-mail' }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  <strong>Telefoon:</strong> {{ selectedManager?.phone_number || 'Geen telefoonnummer' }}
                </v-list-item-subtitle>
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

    <!-- Snackbar bovenaan -->
    <v-snackbar
      v-model="snackbar"
      color="success"
      location="top center"
      timeout="3000"
    >
      Actie uitgevoerd
    </v-snackbar>

  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useDisplay } from 'vuetify'

const { smAndUp } = useDisplay()

const url = 'http://localhost:3001/api/cemetery-managers'

const cemeteryManagers = ref([])
const search = ref('')
const dialog = ref(false)
const snackbar = ref(false)
const selectedManager = ref(null)

const filteredManagers = computed(() => {
  const query = search.value.toLowerCase().trim()
  if (!query) return cemeteryManagers.value
  return cemeteryManagers.value.filter(m => {
    const fullName = `${m.first_name} ${m.infix ?? ''} ${m.last_name}`.toLowerCase()
    return fullName.includes(query)
  })
})

function addManager() {
  snackbar.value = true
}

function openDialog(manager) {
  selectedManager.value = manager
  dialog.value = true
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