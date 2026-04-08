<template>
  <div class="d-flex justify-center mb-20">
    <h2 class="title">
      Profielgegevens
    </h2>
  </div>

  <v-card color="#f08360" class="pa-6 rounded-xl">
    <v-card-text>
      <v-row align="start" no-gutters>

        <v-col cols="12" md="4" class="d-flex flex-column align-center justify-center ga-4">
          <v-avatar size="200">
            <!-- Profile picture or fallback icon -->
            <v-img v-if="user.profile_picture_url" :src="user.profile_picture_url" alt="profielfoto" cover>
              <template #error>
                <v-icon color="#0d475a" size="200">
                  mdi-account
                </v-icon>
              </template>
            </v-img>

            <v-icon v-else color="#0d475a" size="200">
              mdi-account
            </v-icon>
          </v-avatar>

          <v-btn color="#bee1e0" class="btn-text-color" v-ripple.center>
            Foto Uploaden
          </v-btn>
        </v-col>


        <v-col cols="12" md="8">
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="user.first_name" :rules="nameRules" label="Voornaam"
                  required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="user.last_name" :rules="nameRules" label="Achternaam"
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
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn color="#0d475a" variant="elevated" v-ripple.center>
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

    // email: 'liza2511liza@gmail.com',
    // password: 'test123'

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
.btn-text-color {
  color: #0d475a;
}
</style>