<template>
  <v-container fluid class="pa-0 list-page-container">
    <TitleUnderline title="Lijst met beheerders" underline-class="underlineLightBlue" />

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

      <v-row dense :key="$route.fullPath">
        <v-col v-for="cemeteryManager in filteredManagers" :key="cemeteryManager.user_id" cols="12" sm="6" md="4" lg="3"
          class="d-flex align-stretch">
           <router-link
    :to="`/beheerders/${managerFullName(cemeteryManager)}`"
    class="text-decoration-none w-100 d-flex full-height"
  >
            <v-card class="manager-card py-6 px-4 d-flex flex-column h-100" elevation="4">
              <v-card-text class="text-center d-flex flex-column justify-center align-center">
                <v-avatar :size="smAndUp ? 200 : 150">
                  <!-- Profile picture or fallback icon -->
                  <v-img v-if="cemeteryManager.profile_picture_url" :src="cemeteryManager.profile_picture_url"
                    :key="cemeteryManager.profile_picture_url + '-' + $route.fullPath"
                    :alt="`Profielfoto van beheerder ${managerFullName(cemeteryManager)}`" cover>
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
                  {{ managerFullName(cemeteryManager) }}
                </div>
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import { useDisplay } from 'vuetify'
import TitleUnderline from '../components/TitleUnderline.vue'


const { smAndUp, mdAndUp } = useDisplay()

let url = `${import.meta.env.VITE_API_URL}/cemetery-managers`

const cemeteryManagers = ref([])

const managerFullName = (cemeteryManager) => {
  return [
    cemeteryManager.first_name,
    cemeteryManager.infix,
    cemeteryManager.last_name
  ]
    .filter(Boolean)
    .join(' ')
}


const search = ref('')

//property voor gefilterde beheerders
const filteredManagers = computed(() => {
  const query = search.value.toLowerCase().trim()
  if (!query) return cemeteryManagers.value
  return cemeteryManagers.value.filter(m => {
    const fullName = managerFullName(m).toLowerCase()
    return fullName.includes(query)
  })
})

function addManager() {
  alert('Toevoegen beheerder knop geklikt (functie is nog niet gemaakt)')
}

onMounted(() => {
  axios.get(url)
    .then(response => {
      console.log(response.data)

      cemeteryManagers.value =
        response.data['cemetery-managers'] ||
        response.data.cemeteryManagers ||
        response.data
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
