<template>

    <div class="flex justify-center mt-10 mb-20">
      <h2 class="title w-min min-[350px]:w-fit">
        Lijst met graven
      </h2>
    </div>


    <div v-if="graves.length === 0" class="flex justify-center h-[50vh] items-center">
      <div class="text-center">
        <p>Geen graven gevonden.</p>
      </div>
    </div>


    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
      <div v-for="grave in graves" :key="grave.grave_number">

        <div class="aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
          <img :src="grave.image_url" :alt="grave.grave_number"
            class="w-full h-full object-cover border border-gray-200 shadow-lg rounded-lg">
        </div>

        <div class="p-4 flex justify-center">
          <div class="flex flex-col items-center text-center gap-2">
            <h2 class="text-lg font-bold">{{ grave.grave_number }}</h2>
            <p>Status: {{ grave.status }}</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import axios from 'axios'

const params = new URLSearchParams(window.location.search)
const cemetery_id = params.get('cemetery_id')

const graves = ref([])
const url = `http://localhost:3001/api/graves?cemetery_id=${cemetery_id}`




onMounted(() => {
  axios.get(url)
    .then(response => {
      console.log(response)
      graves.value = response.data.graves
    })
    .catch(error => {
      console.error("Fout bij ophalen graven:", error)
    })
})
</script>

<style scoped>
/* alleen voor deze component */
</style>