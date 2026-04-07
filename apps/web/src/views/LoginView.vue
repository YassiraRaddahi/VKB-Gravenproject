<template>
    <v-form @submit.prevent="submit">

      <v-alert v-if="loginError" type="error" class="mb-4" > {{ loginError }} </v-alert>

      <v-text-field
        v-model="state.email"
        :error-messages="v$.email.$errors.map(e => e.$message)"
        label="E-mail"
        required
        @blur="v$.email.$touch"
      ></v-text-field>
  
      <v-text-field
        v-model="state.password"
        :error-messages="v$.password.$errors.map(e => e.$message)"
        label="Wachtwoord"
        type="password"
        required
        @blur="v$.password.$touch"
      ></v-text-field>
  
      <v-btn class="me-4" type="submit" block>
        Login
      </v-btn>
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
    const response = await axios.post('http://localhost:3001/api/login', {
      email: state.email,
      password: state.password,
    })

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