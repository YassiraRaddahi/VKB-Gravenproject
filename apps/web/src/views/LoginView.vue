<template>
  <div class="d-flex justify-center mb-20">
    <h2 class="titleLogin">
      Login
    </h2>
  </div>
    <v-form @submit.prevent="submit">

      <v-alert v-if="loginError" type="error" class="mb-4" > {{ loginError }} </v-alert>

  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="5">

        <v-card class="pa-8 rounded-xl bg-darkBlue">

<v-text-field
  v-model="state.email"
  label="E-mailadres"
  variant="solo"
  bg-color="white"
  color="darkBlue"
  rounded="xl"
  class="mb-4"
></v-text-field>

<v-text-field
  v-model="state.password"
  label="Wachtwoord"
  type="password"
  variant="solo"
  bg-color="white"
  color="darkBlue"
  rounded="xl"
  class="mb-4"
></v-text-field>

<v-row align="center">
  <v-col>
    <v-btn class="rounded-xl border-white text-darkBlue text-caption">
      Wachtwoord vergeten
    </v-btn>
  </v-col>
  <v-col cols="auto">
    <v-btn type="submit" class="rounded-xl bg-white text-darkBlue">
      Log in
    </v-btn>
  </v-col>
</v-row>

</v-card>

      </v-col>
    </v-row>
  </v-container>
    </v-form>
  </template>
  
  <script setup>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const loginError = ref('')

const initialState = {
  email: '',
  password: '',
}

const state = reactive({ ...initialState })

const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
}

const v$ = useVuelidate(rules, state)

async function submit() {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  loginError.value = ''

  try {
    const response = await axios.post('http://localhost:3001/api/login', 
      {email: state.email, password: state.password,}, 
    { withCredentials: true, }
    )

    router.push('/dashboard')

  } catch (error) {
    state.password = ''
    v$.value.password.$reset()

    if (error.response?.status === 429) {
        loginError.value = 'Te veel pogingen, probeer het later opnieuw'
      } else if (error.response?.status === 401) {
      loginError.value = 'E-mail of wachtwoord is onjuist'
    } else {
      loginError.value = 'Er is iets misgegaan, probeer opnieuw'
    }
  }
}
</script>
  
  <style scoped>
  /* alleen voor deze component */
  </style>