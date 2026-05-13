<template>
  <TitleUnderline
    :title="`Beheerder details van ${managerName}`"
        underline-class="underlineLightBlue"
    />

  <v-container>
    <v-row class="manager-container">
      <v-col cols="12">

        <!-- Card -->
        <v-card
          v-if="cemeteryManager"
          class="pa-6"
          elevation="4"
        >
          <div class="d-flex flex-column align-center">

            <!-- Profielfoto -->
            <v-avatar size="180" class="mb-4">
              <v-img
                v-if="cemeteryManager.profile_picture_url"
                :src="cemeteryManager.profile_picture_url"
                cover
              >
                <template #error>
                  <v-icon size="180" color="#0d475a">
                    mdi-account
                  </v-icon>
                </template>
              </v-img>

              <v-icon
                v-else
                size="180"
                color="#0d475a"
              >
                mdi-account
              </v-icon>
            </v-avatar>

            <!-- Naam -->
            <h2 class="text-h5 mb-2">
              {{ managerFullName(cemeteryManager) }}
            </h2>

            <!-- Email -->
            <p>{{ cemeteryManager.email }}</p>

            <!-- Stad -->
            <p>{{ cemeteryManager.city }}</p>

            <!-- Telefoon -->
            <p>{{ cemeteryManager.phone_number }}</p>

          </div>
        </v-card>

        <!-- Niet gevonden -->
        <div v-else class="text-center">
          Beheerder niet gevonden
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import TitleUnderline from '@/components/TitleUnderline.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const route = useRoute()

// Naam uit URL halen
const managerName = decodeURIComponent(Object.values(route.params)[0])

// State
const cemeteryManager = ref(null)

// Naam formatteren
const managerFullName = (manager) => {
  if (!manager) return ''

  return [
    manager.first_name,
    manager.infix,
    manager.last_name
  ]
    .filter(Boolean)
    .join(' ')
}

// Alle beheerders ophalen
onMounted(() => {
  axios
    .get(`${import.meta.env.VITE_API_URL}/cemetery-managers`)
    .then(response => {

      const managers =
        response.data['cemetery-managers'] ||
        response.data.cemeteryManagers ||
        response.data

      // Juiste beheerder zoeken op naam
      cemeteryManager.value = managers.find(manager =>
        managerFullName(manager).trim() === managerName.trim()
      )

      console.log('Gevonden beheerder:', cemeteryManager.value)
    })
    .catch(error => {
      console.error('Fout bij ophalen beheerder:', error)
    })
})
</script>

<style scoped>
.manager-container {
  justify-content: center;
}

.v-card {
  max-width: 500px;
  margin: auto;
}
</style>