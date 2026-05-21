<template>
  <v-container fluid class="pa-0">

    <v-row>
      <v-col
        cols="12"
        class="text-center d-flex justify-center mt-10 mb-12"
      >
        <h1 class="title">Personenbeheer</h1>
      </v-col>
    </v-row>

    <v-container fluid class="pa-4">
      <v-row class="d-flex justify-center gap-6">

        <v-col
          v-for="item in dashboardItems"
          :key="item.title"
          cols="12"
          md="4"
          class="d-flex justify-center"
        >
          <Subdashboard
            :title="item.title"
            :icon="item.icon"
            :route-name="item.routeName"
            :params:="item.params"
          />
        </v-col>

      </v-row>
    </v-container>

  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import Subdashboard from '@/components/Subdashboard.vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const dashboardItems = computed(() => {

  if (user.value.role_name === 'beheerder') {
    return [
      {
        title: 'Overledenen',
        icon: 'mdi-account',
        routeName: 'DeceasedDashboard',
        params: { role: 'overledenen' },
      },
      {
        title: 'Rechthebbenden',
        icon: 'mdi-account-group',
        routeName: 'RightHoldersDashboard',
        params: { role: 'rechthebbenden' },
      },
      {
        title: 'Grafonderhouders',
        icon: 'mdi-account-hard-hat',
        routeName: 'GraveCaretakersDashboard',
        params: { role: 'grafonderhouders' },
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

</style>