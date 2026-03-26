<template>
    <div class="flex justify-center mt-10 mb-20">
      <h2 class="title w-min min-[600px]:w-fit">
        Lijst met begraafplaatsen
      </h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      <div v-for="cemetery in cemeteries" :key="cemetery.id">

        <router-link :to="{ name: 'Graves', query: { cemetery_id: cemetery.id } }">
          <div class="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
            <img :src="cemetery.image_url" :alt="cemetery.name"
              class="w-full h-full object-cover border border-gray-200 shadow-lg rounded-lg">
          </div>
        </router-link>
        
        <div class="p-4 flex justify-center">
          <div class="flex flex-col items-center text-center gap-2">
            <h2 class="text-md font-bold">{{ cemetery.name }}</h2>
            <div v-for="cemeteryManager in cemetery.cemetery_managers" :key="cemeteryManager.id">
              <p class="text-sm">Beheerder: {{ cemeteryManager.first_name }} {{ cemeteryManager.infix }} {{
                cemeteryManager.last_name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'

const cemeteries = ref([])
const url = 'http://localhost:3001/api/cemeteries'

onMounted(() => {
  axios.get(url)
    .then(response => {
      console.log(response)
      cemeteries.value = response.data.cemeteries
    })
    .catch(error => {
      console.error("Fout bij ophalen begraafplaatsen:", error)
    })
}

)
</script>

<style scoped>
/* alleen voor deze component */
</style>