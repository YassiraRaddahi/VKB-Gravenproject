<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ul>
      <li v-for="(item, index) in breadcrumbs" :key="item.text">
        <router-link v-if="item.to && index < breadcrumbs.length - 1" :to="item.to" class="breadcrumb-link">
          {{ item.text }}
        </router-link>
        <span v-else class="breadcrumb-current">
          {{ item.text }}
        </span>
        <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator">&nbsp; &gt;</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const route = useRoute()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const labelMap = computed(() => ({
  Dashboard: 'Dashboard',

  Cemeteries: 'kerkhoven',
    // user.value?.role_name === 'beheerder'
    //   ? 'Gekoppelde kerkhoven'
    //   : 'Kerkhoven',
  CemeteriesOfManager: 'Gekoppelde kerkhoven',

  Graves: 'Graven',
  CemeteryManagers: 'Beheerders',
  CemeteryManagerView: 'Beheerder Details',
  UserManagement: 'Personenbeheer',

  UserManagementByRole:
    route.params.role === 'overledenen'
      ? 'Overledenen'
      : route.params.role === 'rechthebbenden'
        ? 'Rechthebbenden'
        : route.params.role === 'grafonderhouders'
          ? 'Grafonderhouders'
          : 'Personenbeheer',
}))

const parentMap = {
  Cemeteries: 'Dashboard',
  CemeteriesOfManager: 'Dashboard',
  CemeteryManagers: 'Dashboard',
  Graves: 'Cemeteries',
  CemeteryManagerView: 'CemeteryManagers',
  UserManagement: 'Dashboard',
  UserManagementByRole: 'UserManagement',
}

const routeParams = {
  Graves: () => ({ cemetery_id: route.params.cemetery_id }),
  CemeteryManagerView: () => ({ cemetery_manager_id: route.params.cemetery_manager_id }),
}

const breadcrumbs = computed(() => {
  if (!route.name) return []

  const chain = []

  let current = route.name

  while (current) {
    const label = labelMap.value[current] || current

    const isCurrent = current === route.name

    const to = isCurrent
      ? undefined
      : routeParams[current]
        ? {
          name: current,
          params: routeParams[current]()
        }
        : {
          name: current
        }
    chain.unshift({
      text: label,
      to
    })

    current = parentMap[current]
  }

  if (chain.length === 0) return []

  if (chain[0].text !== 'Dashboard') {
    chain.unshift({
      text: 'Dashboard',
      to: { name: 'Dashboard' }
    })
  }

  return chain
})
</script>

<style scoped>
.breadcrumbs ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
  padding-right: 40px;
}

.breadcrumb-link {
  color: #1e4c6f;
  text-decoration: none;
  font-weight: 600;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-current {
  color: #ea5a0b;
  font-weight: 700;
}

.breadcrumb-separator {
  color: #7a8a99;
}
</style>
