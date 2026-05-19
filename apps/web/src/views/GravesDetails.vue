<template>
  <v-container fluid class="pa-0 list-page-container">

    <TitleUnderline :title="grave.name || 'Graf details'" underline-class="underlineLightBlue" />

    <v-container class="d-flex justify-center py-8">
      <v-card rounded="xl" elevation="5" color="#f1a07b" class="pa-6 w-100" max-width="900">

        <v-row class="ga-6" align="start">

          <!-- IMAGE -->
          <v-col cols="12" md="4" class="d-flex flex-column align-center">
            <v-card rounded="xl" elevation="5" width="100%" max-width="260" class="position-relative overflow-hidden">

              <v-img :src="imagePreview || grave.image_url" :alt="`Foto van ${grave.name}`" cover height="260">
                <template #placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular indeterminate color="white" />
                  </div>
                </template>
              </v-img>

              <v-btn icon size="large" elevation="6" color="#16495d" class="position-absolute opacity-90"
                     style="right: 12px; bottom: 12px;" @click="selectFile">
                <v-icon color="white">mdi-camera</v-icon>
              </v-btn>

              <input ref="fileInput" type="file" accept="image/*" class="d-none"
                     @change="handleFileUpload" />

            </v-card>
          </v-col>

          <!-- FORM -->
          <v-col cols="12" md="8">
            <v-form @submit.prevent="saveChanges">
              <v-container>

                <!-- NAME -->
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Grafnaam" v-model="form.name" :readonly="!editMode"
                                  hide-details class="text-white" required />
                  </v-col>
                </v-row>

                <!-- LOCATION -->
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field label="Rij" v-model="form.row" :readonly="!editMode" hide-details class="text-white" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Vak" v-model="form.section" :readonly="!editMode" hide-details class="text-white" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field label="Nummer" v-model="form.number" :readonly="!editMode" hide-details class="text-white" />
                  </v-col>
                </v-row>

                <!-- REMARKS -->
                <v-row>
                  <v-col cols="12">
                    <v-textarea label="Opmerkingen" v-model="form.remarks" :readonly="!editMode" rows="2"
                                hide-details class="text-white" />
                  </v-col>
                </v-row>

                <!-- BUTTONS -->
                <v-col cols="12" class="d-flex justify-end ga-3 flex-wrap pt-2">
                  <v-btn color="#16495d" variant="elevated" rounded="lg" size="large" class="px-6"
                         @click="editMode ? cancelEdit() : startEdit()">
                    {{ editMode ? 'Annuleren' : 'Wijzig' }}
                  </v-btn>

                  <v-btn v-if="editMode" type="submit" color="#023047" variant="elevated" rounded="lg"
                         size="large" class="px-6">
                    Opslaan
                  </v-btn>
                </v-col>

              </v-container>
            </v-form>
          </v-col>

        </v-row>
      </v-card>
    </v-container>

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import TitleUnderline from '@/components/TitleUnderline.vue'

const route = useRoute()
const graveId = route.params.grave_id

const grave = ref({
  id: null,
  name: '',
  row: '',
  section: '',
  number: '',
  remarks: '',
  image_url: ''
})

const form = ref({ ...grave.value })
const editMode = ref(false)
const fileInput = ref(null)
const imagePreview = ref('')

const loadGrave = async () => {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/graves/${graveId}`
    const response = await axios.get(apiUrl)
    grave.value = response.data.grave
    form.value = { ...grave.value }
  } catch (error) {
    console.error('Error fetching grave details:', error)
  }
}

onMounted(loadGrave)

function startEdit() {
  editMode.value = true
  form.value = { ...grave.value }
}

function cancelEdit() {
  editMode.value = false
  form.value = { ...grave.value }
}

async function saveChanges() {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/graves/${graveId}`
    await axios.put(apiUrl, { ...form.value })
    grave.value = { ...form.value }
    editMode.value = false
  } catch (error) {
    console.error('Error saving grave:', error)
  }
}

function selectFile() {
  fileInput.value?.click()
}

async function handleFileUpload(event) {
  const file = event.target.files?.[0]
  if (!file) return
  imagePreview.value = URL.createObjectURL(file)
  try {
    const reader = new FileReader()
    const base64Data = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result.split(',')[1])
      reader.onerror = () => reject(new Error('Failed to read file'))
      reader.readAsDataURL(file)
    })
    const apiUrl = `${import.meta.env.VITE_API_URL}/graves/${graveId}/image`
    const response = await axios.post(apiUrl, { file_name: file.name, data: base64Data })
    grave.value.image_url = response.data.image_url
    imagePreview.value = ''
  } catch (error) {
    console.error('Error uploading grave image:', error)
  } finally {
    if (fileInput.value) fileInput.value.value = null
  }
}
</script>

<style scoped></style>