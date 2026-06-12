<template>
  <v-container fluid class="pa-0">

    <!-- Titel -->
    <v-row>
      <v-col cols="12" class="text-center d-flex justify-center mt-10 mb-12">
        <h1 class="title">
          Welkom {{ userFullName(user) }}!
        </h1>
      </v-col>
    </v-row>

  </v-container>

  <!-- Dashboard cards -->
  <v-container fluid class="pa-4">
    <v-row class="d-flex justify-center gap-6">
      <v-col
        v-for="dashboard in dashboards"
        :key="dashboard.title"
        cols="12"
        md="4"
        class="d-flex justify-center"
      >
        <v-card
          class="dashboard-card"
          elevation="3"
          @click="goToDashboard(dashboard.routeName)"
        >
          <v-card-text class="dashboard-card-text text-center">
            <div>{{ dashboard.title }}</div>
            <div class="dashboard-card-subtitle">
              <v-icon size="48">{{ dashboard.icon }}</v-icon>
            </div>
          </v-card-text>

        </v-card>

      </v-col>

    </v-row>

  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const userFullName = (user) => {
  return [
    user.first_names?.trim().split(/\s+/)[0] || '', // Gebruik alleen de eerste voornaam
    user.infix,
    user.last_name
  ]
    .filter(Boolean)
    .join(' ')
}

const router = useRouter()

const dashboards = computed(() => {
  if (user.value.role_name === 'admin') {
    return [
      {
        title: 'Beheer Kerkhoven',
        icon: 'mdi-cross',
        routeName: 'Cemeteries'
      },
      {
        title: 'Beheer Beheerders',
        icon: 'mdi-account-group',
        routeName: 'CemeteryManagers'
      }
    ]
  }

 if (user.value.role_name === 'beheerder') {
  return [
    {
      title: 'Beheer gekoppelde kerkhoven',
      icon: 'mdi-cross',
      routeName: 'Cemeteries',
      query: { manager: user.value.id }
    },
    {
      title: 'Beheer rechthebbenden, overledenen en grafonderhouders',
      icon: 'mdi-account-group',
      routeName: 'UserManagement'
    }
  ]
}

  return []
})

function goToDashboard(routeName) {
  router.push({ name: routeName })
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
