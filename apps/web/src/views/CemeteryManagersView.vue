<template>

    <div class="flex justify-center mt-10 mb-20 ">
      <h2 class="title w-min min-[500px]:w-fit">
        Lijst met beheerders
      </h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      <div v-for="cemeteryManager in cemeteryManagers" :key="cemeteryManager.id" class="flex flex-col items-center text-center gap-4">
        <div class="h-40 w-40 mb-4">
          <img :src="cemeteryManager.profile_picture_url" :alt="cemeteryManager.name">
        </div>
        <div class="flex gap-1">
          <span v-for="header in headers">{{ cemeteryManager[header.field] }} </span>
        </div>
      </div>
    </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import axios from 'axios'

let url = "http://localhost:3001/api/cemetery-managers"


const cemeteryManagers = ref([])
const headers = [
  { field: "first_name" },
  { field: "infix" },
  { field: "last_name" },
  // { field: "email" },
  // { field: "phone_number" },
]


onMounted(() => {

  axios.get(url)
    .then(response => {
      cemeteryManagers.value = response.data['cemetery-managers']
    })
    .catch(error => {
      console.error("Fout bij ophalen beheerders:", error)
    })
})
</script>

<style scoped>
/* alleen voor deze component */
</style>