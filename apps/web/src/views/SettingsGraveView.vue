```vue
<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="11" md="10" lg="8" xl="6" class="py-6 px-2">
        <TitleUnderline title="Instellingen van graven" underline-class="underlineLightBlue" />

        <FormCard embedded bg-color="orange" padding="py-6" rounded="lg">
          <v-card-text class="px-4 px-md-8">
            <v-container fluid>
              <v-row v-for="grave in graves" :key="grave.key" class="mb-2">
                <!-- Label -->
                <v-col cols="12" sm="4" md="4" class="d-flex align-center py-1">
                  <strong>{{ grave.label }}</strong>
                </v-col>

                <!-- Breedte -->
                <v-col cols="12" sm="4" md="4">
                  <AppInput v-model="form[grave.key].width" label="Breedte (cm)" :readonly="!editMode" />
                </v-col>

                <!-- Lengte -->
                <v-col cols="12" sm="4" md="4">
                  <AppInput v-model="form[grave.key].length" label="Lengte (cm)" :readonly="!editMode" />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions class="px-4 px-md-8 flex-wrap">
            <v-spacer class="d-none d-sm-flex" />

            <AppButton v-if="canEdit" class="w-100 w-sm-auto mb-2 mb-sm-0" @click="toggleEdit">
              {{ editMode ? 'Annuleren' : 'Wijzig' }}
            </AppButton>

            <AppButton v-if="editMode" kind="darkBlue" class="w-100 w-sm-auto" @click="saveSettings">
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
  return userStore.hasPermission('admin.edit_grave_settings')
})

// edit state
const editMode = ref(false)

// grave types
const graves = [
  { key: 'dubbel graf', label: 'Dubbel graf' },
  { key: 'enkel graf', label: 'Enkel graf' },
  { key: 'kindergraf', label: 'Kindergraf' },
  { key: 'keldergraf', label: 'Keldergraf' },
  { key: 'urnengraf', label: 'Urnengraf' }
]

// form data
const form = ref({
  'dubbel graf': { width: '', length: '' },
  'enkel graf': { width: '', length: '' },
  'kindergraf': { width: '', length: '' },
  'keldergraf': { width: '', length: '' },
  'urnengraf': { width: '', length: '' }
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
defineExpose({
  form,
  editMode,
  toggleEdit,
  saveSettings
})
</script>