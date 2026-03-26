<template>

    <div class="flex justify-center mt-10 mb-20 ">
      <h2 class="title w-min min-[500px]:w-fit">
        Lijst met beheerders
      </h2>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      <div v-for="beheerder in beheerders" :key="beheerder.id" class="flex flex-col items-center text-center gap-4">
        <div class="h-40 w-40 mb-4">
          <img :src="beheerder.foto_url" :alt="beheerder.naam">
        </div>
        <div class="flex gap-1">
          <span v-for="header in headers">{{ beheerder[header.field] }} </span>
        </div>
      </div>
    </div>
</template>

<script setup>

import { onMounted, ref } from 'vue'
import axios from 'axios'

let url = "http://localhost:3001/api/beheerders"


const beheerders = ref([])
const headers = [
  { field: "voornaam" },
  { field: "tussenvoegsel" },
  { field: "achternaam" },
  // { field: "e-mail" },
  // { field: "telefoonnummer" },
]


onMounted(() => {

  axios.get(url)
    .then(response => {
      beheerders.value = response.data.beheerders
    })
    .catch(error => {
      console.error("Fout bij ophalen beheerders:", error)
    })
})
</script>

<style scoped>
/* alleen voor deze component */
</style>