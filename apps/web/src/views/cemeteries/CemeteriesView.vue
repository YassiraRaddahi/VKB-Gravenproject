<template>
  <v-container fluid class="pa-0 list-page-container">
    <TitleUnderline title="Lijst met kerkhoven" underline-class="underlineLightBlue" />

    <v-container fluid class="pa-4">

      <!-- Filters -->
      <SearchAddBar :search="search" @update:search="search = $event" search-label="Zoek kerkhof..." :search-md="4"
        @add="addCemetery">
        <v-col cols="12" md="2">
          <v-select v-model="managerFilter" :items="managerOptions" label="Beheerder" clearable outlined dense
            color="primary" />
        </v-col>
        <v-col cols="12" md="2">
          <v-select v-model="cityFilter" :items="cityOptions" label="Plaats" clearable outlined dense color="primary" />
        </v-col>
      </SearchAddBar>

      <EmptyState v-if="visibleCemeteries.length === 0" message="Geen kerkhoven gevonden." />

      <!-- Cemetery cards -->
      <v-row dense class="d-flex align-stretch" :key="$route.fullPath">
        <v-col v-for="cemetery in visibleCemeteries" :key="cemetery.id" cols="12" sm="6" md="4" lg="3"
          class="d-flex align-stretch">
          
          <ItemCard :image="cemetery.image_url" :image-alt="`Impressiefoto van ${cemetery.name}`" :title="cemetery.name"
            :to="{ name: 'CemeteryDetails', params: { cemetery_id: cemetery.id } }">
            <div class="manager-list text-body-2 text-grey-darken-1 w-100">
              <template v-if="cemetery.cemetery_managers?.length > 0">
                <div v-for="manager in cemetery.cemetery_managers" :key="manager.id" class="manager-item">
                  <span class="manager-label">Beheerder</span>
                  <span class="manager-name">
                    {{ managerFullName(manager) }}
                  </span>
                </div>
              </template>
              <div v-else class="manager-item">
                <span class="manager-label">Beheerder</span>
                <span class="manager-name text-grey-darken-2">Nog niet toegewezen</span>
              </div>
            </div>
          </ItemCard>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import TitleUnderline from '@/components/ui/TitleUnderline.vue'
import SearchAddBar from '@/components/ui/SearchAddBar.vue'
import ItemCard from '@/components/ui/ItemCard.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

import axios from 'axios'
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const route = useRoute()
const router = useRouter()

const cemeteries = ref([])
const search = ref('')
const managerFilter = ref(null)
const cityFilter = ref(null)


const url = `${import.meta.env.VITE_API_URL}/cemeteries`


const managerFullName = (manager) => {
  return [
    manager.first_names?.trim().split(/\s+/)[0] || '', // Gebruik alleen de eerste voornaam
    manager.infix,
    manager.last_name
  ]
    .filter(Boolean)
    .join(' ')
}

// Router
if (route.query.manager) {
  managerFilter.value = Number(route.query.manager)
}



// Computed properties voor filteropties
const pageTitle = computed(() => {
  return user.value?.role_name === 'beheerder'
    ? 'Lijst met gekoppelde kerkhoven'
    : 'Lijst met kerkhoven'
})

// Dynamisch unieke beheerders verzamelen voor filteropties
const managerOptions = computed(() => {
  const managers = new Map()

  cemeteries.value.forEach(cemetery => {
    cemetery.cemetery_managers?.forEach(manager => {
      const key = Number(manager.id)

      const label =
        `${manager.first_names} ${manager.infix || ''} ${manager.last_name}`.trim()

      if (!managers.has(key)) {
        managers.set(key, {
          title: label,
          value: key
        })
      }
    })
  })

  return Array.from(managers.values())
})

// Dynamisch unieke steden verzamelen voor filteropties
const cityOptions = computed(() => {
  const cities = new Set()

  cemeteries.value.forEach(cemetery => {
    if (cemetery.city?.trim()) {
      cities.add(cemetery.city.trim())
    }
  })

  return Array.from(cities)
    .sort()
    .map(city => ({
      title: city,
      value: city
    }))
})

// Filter logica
const visibleCemeteries = computed(() => {
  let result = cemeteries.value

  // Alleen gekoppelde kerkhoven tonen voor beheerder
  if (user.value?.role_name === 'beheerder') {
    result = result.filter(cemetery =>
      cemetery.cemetery_managers?.some(manager =>
        Number(manager.id) === Number(user.value.id)
      )
    )
  }

  // Zoekfilter
  const query = search.value.toLowerCase().trim()

  if (query) {
    result = result.filter(c =>
      c.name.toLowerCase().includes(query)
    )
  }

  // Filteren op beheerder
  if (managerFilter.value) {
    result = result.filter(cemetery =>
      cemetery.cemetery_managers?.some(manager =>
        Number(manager.id) === Number(managerFilter.value)
      )
    )
  }

  // Filteren op stad
  if (cityFilter.value) {
    result = result.filter(cemetery =>
      cemetery.city === cityFilter.value
    )
  }

  return result
})

// knop toevoegen
function addCemetery() {
  router.push({ name: 'AddCemetery' })
}

onMounted(() => {
  axios.get(url)
    .then(res => {
      cemeteries.value = res.data.cemeteries

      const managerId = route.params.manager_id

      if (managerId) {
        const foundManager = managerOptions.value.find(manager =>
          manager.value === Number(managerId)
        )

        if (foundManager) {
          managerFilter.value = foundManager.value
        }
      }
    })
    .catch(err => console.error('Fout bij ophalen kerkhoven:', err))
})
</script>

<style scoped>
.manager-list {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
}

.manager-item {
  width: 100%;
  padding: 8px 12px;
  border-radius: 10px;
  background: rgba(30, 76, 111, 0.05);
}

.manager-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  color: #164653;
  margin-bottom: 4px;
}

.manager-name {
  display: block;
  font-size: 0.95rem;
  color: #2f4f6d;
}
</style>
