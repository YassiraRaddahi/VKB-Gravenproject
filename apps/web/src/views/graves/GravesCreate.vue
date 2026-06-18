<template>
  <v-container fluid class="pa-0 list-page-container">

    <TitleUnderline title="Graf aanmaken" underline-class="underlineLightBlue" />

    <v-container>
      <FormCard embedded bg-color="orange">

        <v-form ref="formRef" @submit.prevent="createGrave">

          <FormAlert :message="errorMessage" />

          <v-row dense>

            <v-col cols="12" md="4">
              <v-sheet rounded="xl" class="overflow-hidden position-relative bg-transparent">

                <v-img :src="imagePreview" height="260" cover class="bg-grey-lighten-2" />

                <AppButton kind="darkBlue" icon class="position-absolute" style="right: 12px; bottom: 12px"
                  @click="fileInput?.click()">
                  <v-icon color="white">mdi-camera</v-icon>
                </AppButton>

                <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="handleFile" />

              </v-sheet>
            </v-col>

            <v-col cols="12" md="8">
              <v-row dense>

                <v-col cols="12" sm="6">
                  <AppInput v-model="form.grave_number" label="Grafnummer" class="text-white" :rules="[required]" />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select v-model="form.status" :items="statusOptions" label="Status" class="text-white"
                    :rules="[required]" />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select v-model="form.type" :items="typeOptions" label="Type" class="text-white"
                    :rules="[required]" />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select v-model="form.sort" :items="sortOptions" label="Soort" class="text-white"
                    :rules="[required]" />
                </v-col>

                <v-col cols="12" sm="6">
                  <AppInput v-model="form.latitude" label="Latitude" class="text-white" :rules="[required, isNumber]" />
                </v-col>

                <v-col cols="12" sm="6">
                  <AppInput v-model="form.longitude" label="Longitude" class="text-white"
                    :rules="[required, isNumber]" />
                </v-col>

                <v-col cols="12">
                  <v-textarea v-model="form.remarks" label="Opmerkingen" class="text-white" rows="5" auto-grow />
                </v-col>

              </v-row>
            </v-col>

          </v-row>

          <v-row class="mt-4">
            <v-col cols="12" class="d-flex justify-end ga-2 flex-wrap">
              <AppButton kind="darkBlue" class="px-6" type="submit">
                Aanmaken
              </AppButton>
            </v-col>
          </v-row>

        </v-form>

      </FormCard>
    </v-container>

    <SnackbarSuccess v-model="showSuccess" message="Graf succesvol aangemaakt." />

  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import TitleUnderline from '@/components/ui/TitleUnderline.vue'
import FormCard from '@/components/ui/FormCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import FormAlert from '@/components/ui/FormAlert.vue'
import SnackbarSuccess from '@/components/ui/SnackbarSuccess.vue'

const route = useRoute()
const router = useRouter()
const API = import.meta.env.VITE_API_URL

const form = ref({
  grave_number: '',
  status: '',
  type: '',
  sort: '',
  latitude: '',
  longitude: '',
  remarks: '',
})

const formRef = ref(null)
const fileInput = ref(null)
const imagePreview = ref('')
const imageFile = ref(null)
const showSuccess = ref(false)
const errorMessage = ref('')

const statusOptions = ['beschikbaar', 'in gebruik', 'gereserveerd']
const typeOptions = ['algemeen graf', 'particulier graf']
const sortOptions = ['dubbel graf', 'enkel graf', 'kindergraf', 'urnengraf', 'keldergraf']

const required = (v) => (v !== null && v !== undefined && v !== '') || 'Verplicht veld'
const isNumber = (v) => !isNaN(parseFloat(v)) || 'Vul een geldig getal in'

async function createGrave() {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  errorMessage.value = ''

  try {
    const payload = new FormData()
    Object.entries(form.value).forEach(([key, value]) => {
      payload.append(key, value ?? '')
    })
    if (imageFile.value) {
      payload.append('image', imageFile.value)
    }

    const res = await axios.post(
      `${API}/cemeteries/${route.params.cemetery_id}/graves`,
      payload
    )

    showSuccess.value = true

    setTimeout(() => {
      router.push({
        name: 'GravesDetails',
        params: {
          cemetery_id: route.params.cemetery_id,
          grave_id: res.data.grave_id,
        },
      })
    }, 1200)
  } catch (error) {
    console.error('Fout bij aanmaken graf:', error.response?.data || error)

    errorMessage.value =
      error.response?.data?.error ||
      'Er is een fout opgetreden bij het aanmaken van het graf.'
  }
}

function handleFile(e) {
  const file = e.target.files?.[0]
  if (!file) return

  imageFile.value = file
  imagePreview.value = URL.createObjectURL(file)
}
</script>
