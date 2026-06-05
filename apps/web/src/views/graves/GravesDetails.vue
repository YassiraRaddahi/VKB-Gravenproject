<template>
  <v-container fluid class="pa-0">

    <!-- BREADCRUMBS -->
    <Breadcrumbs class="px-4 pt-3" />

    <!-- TITLE -->
    <TitleUnderline
      :title="grave?.grave_number || 'Graf details'"
      underline-class="underlineLightBlue"
    />

    <v-container class="d-flex justify-center py-6">

      <v-card
        class="pa-4 pa-md-6 w-100"
        max-width="900"
        rounded="xl"
        color="#f1a07b"
      >

        <v-form @submit.prevent="saveGrave">

          <v-row dense>

            <!-- IMAGE -->
            <v-col cols="12" md="4">

              <v-card rounded="xl" class="overflow-hidden position-relative">

                <v-img
                  :src="imagePreview || grave?.image_url"
                  height="260"
                  cover
                  class="bg-grey-lighten-2"
                />

                <v-btn
                  icon
                  color="#16495d"
                  class="position-absolute"
                  style="right: 12px; bottom: 12px"
                  @click="fileInput?.click()"
                >
                  <v-icon color="white">mdi-camera</v-icon>
                </v-btn>

                <input
                  ref="fileInput"
                  type="file"
                  class="d-none"
                  @change="handleFile"
                />

              </v-card>

            </v-col>

            <!-- FORM -->
            <v-col cols="12" md="8">

              <v-row dense>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.grave_number"
                    class="text-white"
                    label="Grafnummer"
                    :readonly="!editMode"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    v-model="form.status"
                    :items="statusOptions"
                    label="Status"
                    class="text-white"
                    :readonly="!editMode"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    v-model="form.type"
                    :items="typeOptions"
                    label="Type"
                    class="text-white"
                    :readonly="!editMode"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-select
                    v-model="form.sort"
                    :items="sortOptions"
                    label="Soort"
                    class="text-white"
                    :readonly="!editMode"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.latitude"
                    label="Latitude"
                    class="text-white"
                    :readonly="!editMode"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.longitude"
                    label="Longitude"
                    class="text-white"
                    :readonly="!editMode"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="form.remarks"
                    label="Opmerkingen"
                    class="text-white"
                    :readonly="!editMode"
                    rows="5"
                    auto-grow
                  />
                </v-col>

              </v-row>

            </v-col>

          </v-row>

          <!-- BUTTONS -->
          <v-row class="mt-4">
            <v-col cols="12" class="d-flex justify-end ga-2 flex-wrap">

              <v-btn color="#16495d" @click="toggleEdit">
                {{ editMode ? 'Annuleren' : 'Wijzig' }}
              </v-btn>

              <v-btn
                v-if="editMode"
                color="#023047"
                type="submit"
              >
                Opslaan
              </v-btn>

            </v-col>
          </v-row>

        </v-form>

      </v-card>

    </v-container>

  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import TitleUnderline from '@/components/ui/TitleUnderline.vue'

const route = useRoute()
const API = import.meta.env.VITE_API_URL

const grave = ref(null)
const form = ref({})
const editMode = ref(false)

const fileInput = ref(null)
const imagePreview = ref('')

const statusOptions = ['beschikbaar', 'in gebruik', 'gereserveerd']
const typeOptions = ['algemeen graf', 'particulier graf']
const sortOptions = ['dubbel graf', 'enkel graf', 'kindergraf', 'urnengraf', 'keldergraf']

const loadGrave = async () => {
  const res = await axios.get(`${API}/graves/${route.params.grave_id}`)
  grave.value = res.data.grave
  form.value = { ...res.data.grave }
}

onMounted(loadGrave)

function toggleEdit() {
  if (editMode.value) {
    form.value = { ...grave.value }
  }
  editMode.value = !editMode.value
}

async function saveGrave() {
  await axios.put(`${API}/graves/${route.params.grave_id}`, form.value)

  await loadGrave()
  editMode.value = false
  imagePreview.value = ''
}

function handleFile(e) {
  const file = e.target.files?.[0]
  if (!file) return

  imagePreview.value = URL.createObjectURL(file)
}
</script>