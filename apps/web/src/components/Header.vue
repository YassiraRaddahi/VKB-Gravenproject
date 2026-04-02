<template>
  <v-app-bar app class="px-6">

    <!-- left side -->
    <!---... --->

    <!-- right side -->
    <v-spacer />

    <template v-if="!loggedIn">
      <v-btn :to="{ name: 'Login' }" color="#ea5a0b" class="text-decoration-none" 
      v-ripple.center variant="elevated">
          <span class="text-white">
          Log In
          </span>
      </v-btn>
    </template>

    <template v-else>
      <v-btn :to="{ name: 'Profile' }" color="#0d475a" class="text-decoration-none" v-ripple.center>
          <div class="d-flex align-center ga-2">
            <!-- Profile picture or fallback icon -->
            <v-avatar v-if="user.profile_picture_url" size="40">
              <img :src="user.profile_picture_url" />
            </v-avatar>
            <v-icon v-else color="#0d475a" size="32">
              mdi-account
            </v-icon>
            <span class="user-name">
              {{ user.first_name }} {{ user.last_name }}
            </span>
          </div>
      </v-btn>
    </template>
  </v-app-bar>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const user = ref({})

const loggedIn = ref(false)


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
.user-name {
  font-weight: 500;
  color: #0d475a;
}
</style>