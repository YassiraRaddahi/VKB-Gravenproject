<template>

  <TitleUnderline title="Login" underline-class="underlineDarkOrange" />


  <FormCard bg-color="darkBlue">
    <v-form @submit.prevent="submit">
      <v-alert v-if="loginError" type="error" class="mb-4">
        {{ loginError }}
      </v-alert>

      <AppInput v-model="state.email" label="E-mailadres" variant="solo" bg-color="white" color="darkBlue" rounded="xl"
        class="mb-6" :error-messages="emailErrors" @blur="v$.email.$touch" />

      <AppInput v-model="state.password" label="Wachtwoord" type="password" variant="solo" bg-color="white"
        color="darkBlue" rounded="xl" class="mb-6" :error-messages="passwordErrors" @blur="v$.password.$touch" />

      <v-row class="align-center">
        <v-col>
          <AppButton kind="whiteOutline">
            Wachtwoord vergeten
          </AppButton>
        </v-col>
        <v-col cols="auto">
          <AppButton kind="white" type="submit">
            Log in
          </AppButton>
        </v-col>
      </v-row>
    </v-form>
  </FormCard>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, required, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import TitleUnderline from '@/components/ui/TitleUnderline.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import FormCard from '@/components/ui/FormCard.vue'

const userStore = useUserStore()
const router = useRouter()
const loginError = ref('')

const initialState = {
  email: '',
  password: '',
}

const state = reactive({ ...initialState })

const rules = {
  email: {
    required: helpers.withMessage(
      'E-mailadres is verplicht',
      required
    ),
    email: helpers.withMessage(
      'Ongeldig e-mailadres',
      email
    )
  },
  password: {
    required: helpers.withMessage(
      'Wachtwoord is verplicht',
      required
    )
  }

}

const v$ = useVuelidate(rules, state)

const emailErrors = computed(() => {
  return v$.value.email.$errors.map(e => e.$message)
})
const passwordErrors = computed(() => {
  return v$.value.password.$errors.map(e => e.$message)
})

async function submit() {
  const isValid = await v$.value.$validate()
  if (!isValid) return

  loginError.value = ''

  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/login`,
      { email: state.email, password: state.password, },
      { withCredentials: true, }
    )

    await userStore.fetchUser()

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
/* Foutmelding tekst */
:deep(.v-messages__message) {
  color: #f08360 !important;
}
</style>