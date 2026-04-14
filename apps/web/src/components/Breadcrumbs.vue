<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ul>
      <li v-for="(item, index) in breadcrumbs" :key="item.text">
        <router-link
          v-if="item.to && index < breadcrumbs.length - 1"
          :to="item.to"
          class="breadcrumb-link"
        >
          {{ item.text }}
        </router-link>
        <span v-else class="breadcrumb-current">
          {{ item.text }}
        </span>
        <span v-if="index < breadcrumbs.length - 1" class="breadcrumb-separator"> &gt;</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const labelMap = {
  Dashboard: 'Dashboard',
  Cemeteries: 'Begraafplaatsen',
  Graves: 'Graven',
  CemeteryManagers: 'Beheerders',
}

const parentMap = {
  Cemeteries: 'Dashboard',
  CemeteryManagers: 'Dashboard',
  Graves: 'Cemeteries',
}

const routeParams = {
  Graves: () => ({ cemetery_id: route.params.cemetery_id }),
}

const breadcrumbs = computed(() => {
  if (!route.name) return []

  const chain = []
  let current = route.name

  while (current) {
    const label = labelMap[current] || current
    const isCurrent = current === route.name
    const to = isCurrent
      ? undefined
      : routeParams[current]
        ? { name: current, params: routeParams[current]() }
        : { name: current }

    chain.unshift({ text: label, to })
    current = parentMap[current]
  }

  if (chain.length === 0) return []

  if (chain[0].text !== 'Dashboard') {
    chain.unshift({ text: 'Dashboard', to: { name: 'Dashboard' } })
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
