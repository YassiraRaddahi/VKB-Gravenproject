<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="6" class="py-6">

        <TitleUnderline
          title="Instellingen van graven"
          underline-class="underlineLightBlue"
        />

        <FormCard embedded bg-color="orange" padding="py-6">
          <v-card-text class="px-4 px-md-8">
            <v-container>

              <v-row
                v-for="grave in graves"
                :key="grave.key"
                class="mb-2"
              >
                <!-- Label -->
                <v-col cols="12" md="4" class="d-flex align-center">
                  <strong>{{ grave.label }}</strong>
                </v-col>

                <!-- Breedte -->
                <v-col cols="6" md="4">
                  <AppInput
                    v-model="form[grave.key].breedte"
                    label="Breedte (cm)"
                    :readonly="!editMode"
                  />
                </v-col>

                <!-- Lengte -->
                <v-col cols="6" md="4">
                  <AppInput
                    v-model="form[grave.key].lengte"
                    label="Lengte (cm)"
                    :readonly="!editMode"
                  />
                </v-col>
              </v-row>

            </v-container>
          </v-card-text>

          <v-card-actions class="px-4 px-md-8">
            <v-spacer />

            <AppButton v-if="canEdit" @click="toggleEdit">
              {{ editMode ? 'Annuleren' : 'Wijzig' }}
            </AppButton>

            <AppButton
              v-if="editMode"
              kind="darkBlue"
              @click="saveSettings"
            >
              Opslaan
            </AppButton>

          </v-card-actions>
        </FormCard>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

import { useUserStore } from '@/stores/userStore'

import TitleUnderline from '@/components/ui/TitleUnderline.vue'
import FormCard from '@/components/ui/FormCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'

// API
const API = import.meta.env.VITE_API_URL

// store
const userStore = useUserStore()

// permission
const canEdit = computed(() => {
  return userStore.hasPermission('admin.edit_settings')
})

// edit state
const editMode = ref(false)

// grave types
const graves = [
  { key: 'dubbel', label: 'Dubbel graf' },
  { key: 'enkel', label: 'Enkel graf' },
  { key: 'kind', label: 'Kindergraf' },
  { key: 'kelder', label: 'Keldergraf' }
]

// form data
const form = ref({
  dubbel: { breedte: '', lengte: '' },
  enkel: { breedte: '', lengte: '' },
  kind: { breedte: '', lengte: '' },
  kelder: { breedte: '', lengte: '' }
})

const originalForm = ref(null)

// ✅ DATA LADEN
onMounted(async () => {
  try {
    const res = await axios.get(`${API}/settings/grave`)
    form.value = res.data
  } catch (err) {
    console.error(err)
  }
})

// toggle edit
function toggleEdit() {
  if (!editMode.value) {
    originalForm.value = JSON.parse(JSON.stringify(form.value))
  } else {
    form.value = JSON.parse(JSON.stringify(originalForm.value))
  }

  editMode.value = !editMode.value
}

// save
async function saveSettings() {
  try {
    await axios.put(`${API}/settings/grave`, form.value)
    editMode.value = false
    console.log('Instellingen opgeslagen!')
  } catch (error) {
    console.error('Fout bij opslaan:', error)
  }
}
</script>
