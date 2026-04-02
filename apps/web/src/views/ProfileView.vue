<template>
  <div class="d-flex justify-center mb-20">
    <h2 class="title">
      Profielgegevens
    </h2>
  </div>

  <v-card color="#f08360">
    <v-card-text>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="user.first_name" :counter="10" :rules="nameRules" label="Voornaam"
                required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="user.last_name" :counter="10" :rules="nameRules" label="Achternaam"
                required></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn color="#0d475a" variant="flat">
        Opslaan
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const user = ref({})


const url = 'http://localhost:3001/api/login'

onMounted(() => {
  axios.post(url, {
    email: 'j.kempenaar@kerkrentmeester.nl',
    password: 'test123'
  })
    .then(response => {
      console.log(response)
      user.value = response.data.user
    })
    .catch(error => {
      console.error("Fout bij ophalen gebruikersgegevens:", error)
    })
}

)

</script>

<style scoped>
/* alleen voor deze component */
</style>