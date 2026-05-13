<template>
  <v-container fluid class="pa-0">

    <!-- Titel -->
    <v-row>
      <v-col
        cols="12"
        class="text-center d-flex justify-center mt-10 mb-12"
      >
        <h1
          class="text-h3 font-weight-bold"
          style="color: #16495d;"
        >
          Welkom {{ user.first_name }} {{ user.infix }} {{ user.last_name }}!
        </h1>
      </v-col>
    </v-row>

  </v-container>

  <!-- Dashboard cards -->
  <v-container fluid class="pa-4">

    <v-row class="d-flex justify-center ga-6">

      <!-- Kerkhoven -->
      <v-col cols="12" md="4" class="d-flex justify-center">

        <v-card
          elevation="3"
          rounded="xl"
          color="#16495d"
          class="w-100 d-flex align-center justify-center"
          style="max-width: 360px; min-height: 180px; cursor: pointer;"
          @click="goToCemeteries"
        >

          <v-card-text
            class="text-center text-white text-h5 font-weight-bold text-none"
          >
            <div>
              Beheer Kerkhoven
            </div>

            <div
              class="mt-3"
              style="color: rgba(255, 255, 255, 0.8);"
            >
              <v-icon size="56">
                mdi-cross
              </v-icon>
            </div>
          </v-card-text>

        </v-card>

      </v-col>

      <!-- Beheerders -->
      <v-col cols="12" md="4" class="d-flex justify-center">

        <v-card
          elevation="3"
          rounded="xl"
          color="#16495d"
          class="w-100 d-flex align-center justify-center"
          style="max-width: 360px; min-height: 180px; cursor: pointer;"
          @click="goToManagers"
        >

          <v-card-text
            class="text-center text-white text-h5 font-weight-bold text-none"
          >
            <div>
              Beheer Beheerders
            </div>

            <div
              class="mt-3"
              style="color: rgba(255, 255, 255, 0.8);"
            >
              <v-icon size="56">
                mdi-account-group
              </v-icon>
            </div>
          </v-card-text>

        </v-card>

      </v-col>

    </v-row>

  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const router = useRouter()

function goToCemeteries() {
  router.push({ name: 'Cemeteries' })
}

function goToManagers() {
  router.push({ name: 'CemeteryManagers' })
}
</script>