<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="12" class="text-center d-flex justify-center mt-10 mb-12" >
        <h2 class="title">Dashboard</h2>
      </v-col>
    </v-row>
  </v-container>

  <v-container fluid class="pa-4">
    <v-row class="d-flex justify-center gap-6">
      <v-col cols="12" md="4" class="d-flex justify-center">
        <v-card class="dashboard-card" elevation="3" @click="goToCemeteries">
          <v-card-text class="dashboard-card-text text-center">
            <div>Beheer Begraafplaatsen</div>
            <div class="dashboard-card-subtitle">
              <v-icon size="48">mdi-cross</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" class="d-flex justify-center">
        <v-card class="dashboard-card" elevation="3" @click="goToManagers">
          <v-card-text class="dashboard-card-text text-center">
            <div>Beheer Beheerders</div>
            <div class="dashboard-card-subtitle">
              <v-icon size="48">mdi-account-group</v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToCemeteries() {
  router.push({ name: 'Cemeteries' })
}

function goToManagers() {
  router.push({ name: 'CemeteryManagers' })
}
</script>

<style scoped>

.dashboard-card {
  width: 100%;
  max-width: 360px;
  min-height: 180px;
  border-radius: 40px;
  background-color: #16495d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard-card-text {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: none;
}

.dashboard-card-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  margin-top: 0.5rem;
  font-weight: 400;
}
</style>