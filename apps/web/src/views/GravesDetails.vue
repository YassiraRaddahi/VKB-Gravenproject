<template>
  <v-container fluid class="pa-0">

    <Breadcrumbs class="px-4 pt-3" />

    <TitleUnderline :title="grave?.grave_number || 'Graf details'" underline-class="underlineLightBlue" />

    <v-container class="d-flex justify-center py-6">
<NavigationDrawer />
      <v-card class="pa-4 pa-md-6 w-100" max-width="900" rounded="xl" color="#f1a07b">

        <v-form @submit.prevent="saveGrave">

          <v-row dense>

            <!-- IMAGE -->
            <v-col cols="12" md="4">
              <v-card rounded="xl" class="overflow-hidden position-relative">

                <v-img :src="imagePreview || grave?.image_url || ''" height="260" cover class="bg-grey-lighten-2" />

                <v-btn icon color="#16495d" class="position-absolute" style="right: 12px; bottom: 12px"
                  @click="fileInput?.click()">
                  <v-icon color="white">mdi-camera</v-icon>
                </v-btn>

                <input ref="fileInput" type="file" class="d-none" @change="handleFile" />

              </v-card>
            </v-col>

            <!-- FORM -->
            <v-col cols="12" md="8">
              <v-row dense>

                <v-col cols="12" sm="6" class="text-white">
                  <v-text-field v-model="form.grave_number" label="Grafnummer" :readonly="!editMode" />
                </v-col>

                <v-col cols="12" sm="6" class="text-white">
                  <v-select v-model="form.status" :items="statusOptions" label="Status" :readonly="!editMode" />
                </v-col>

                <v-col cols="12" sm="6" class="text-white">
                  <v-select v-model="form.type" :items="typeOptions" label="Type" :readonly="!editMode" />
                </v-col>

                <v-col cols="12" sm="6" class="text-white">
                  <v-select v-model="form.sort" :items="sortOptions" label="Soort" :readonly="!editMode" />
                </v-col>

                <v-col cols="12" sm="6" class="text-white">
                  <v-text-field v-model="form.latitude" label="Latitude" :readonly="!editMode" />
                </v-col>
                <v-col cols="12" sm="6" class="text-white">
                  <v-text-field v-model="form.longitude" label="Longitude" :readonly="!editMode" />
                </v-col>
                <v-col cols="12">
                  <v-row dense>

                    <v-col cols="12" sm="4" class="text-white">
                      <v-text-field :model-value="formatDate(form.last_opened_at)" label="Laatst geopend" readonly />
                    </v-col>

                    <v-col cols="12" sm="4" class="text-white">
                      <v-text-field :model-value="getGrafrustTot(form.last_opened_at)" label="Grafrust tot" readonly />
                    </v-col>

                    <v-col cols="12" sm="4" class="text-white">
                      <v-text-field :model-value="form.last_cleared_at
                        ? new Date(form.last_cleared_at).toLocaleDateString('nl-NL')
                        : '-'" label="Laatst geruimd" readonly />
                    </v-col>

                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row dense>

                    <template v-if="form.sort !== 'urnengraf'">

                      <v-col cols="12" sm="6" class="text-white">
                        <v-text-field v-model="form.width" label="Breedte (cm)" :readonly="!editMode" />
                      </v-col>

                      <v-col cols="12" sm="6" class="text-white">
                        <v-text-field v-model="form.length" label="Lengte (cm)" :readonly="!editMode" />
                      </v-col>

                    </template>

                  </v-row>
                </v-col>

                <v-col cols="12" class="text-white">
                  <v-textarea v-model="form.remarks" label="Opmerkingen" rows="5" auto-grow :readonly="!editMode" />
                </v-col>

              </v-row>
            </v-col>

          </v-row>

          <!-- BUTTONS -->
          <v-row class="mt-4">
            <v-col cols="12" class="d-flex justify-end ga-2 flex-wrap">

              <v-btn v-if="canEdit" color="#16495d" @click="toggleEdit">
                {{ editMode ? 'Annuleren' : 'Wijzig' }}
              </v-btn>


              <v-btn v-if="editMode && canEdit" color="#023047" type="submit">
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
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Breadcrumbs from '@/components/layout/Breadcrumbs.vue'
import TitleUnderline from '@/components/ui/TitleUnderline.vue'
import NavigationDrawer from '@/components/layout/NavigationDrawer.vue'

const route = useRoute()
const API = import.meta.env.VITE_API_URL

// =====================
// ✅ PERMISSIONS
// =====================
const canEdit = ref(false)

// =====================
// STATE
// =====================
const grave = ref(null)

const form = ref({
  grave_number: '',
  status: '',
  type: '',
  sort: '',
  latitude: '',
  longitude: '',
  width: '',
  length: '',
  remarks: '',
  last_opened_at: null,
  last_cleared_at: null
})

const editMode = ref(false)

// =====================
// IMAGE
// =====================
const fileInput = ref(null)
const imagePreview = ref('')

// =====================
// SETTINGS
// =====================
const graveSettings = ref({})

const loadSettings = async () => {
  try {
    const res = await axios.get(`${API}/settings/grave`)
    graveSettings.value = res.data
  } catch (err) {
    console.error('Fout bij laden settings', err)
  }
}

// =====================
// OPTIONS
// =====================
const statusOptions = ['beschikbaar', 'in gebruik', 'gereserveerd']
const typeOptions = ['algemeen graf', 'particulier graf']
const sortOptions = [
  'dubbel graf',
  'enkel graf',
  'kindergraf',
  'urnengraf',
  'keldergraf'
]

// =====================
// HELPER DIMENSIONS
// =====================
function getDefaultDimensions(sort) {
  if (!sort) return null

  const key = sort.trim().toLowerCase()

  const match = Object.keys(graveSettings.value).find(
    k => k.toLowerCase() === key
  )

  return match ? graveSettings.value[match] : null
}

// =====================
// LOAD GRAVE
// =====================
const loadGrave = async () => {
  const res = await axios.get(`${API}/graves/${route.params.grave_id}`)
  const data = res.data.grave

  grave.value = data

  form.value = {
    grave_number: data.grave_number || '',
    status: data.status || '',
    type: data.type || '',
    sort: data.sort || '',
    latitude: data.latitude || '',
    longitude: data.longitude || '',
    width: data.width != null ? String(data.width) : '',
    length: data.length != null ? String(data.length) : '',
    remarks: data.remarks || '',
    last_opened_at: data.last_opened_at,
    last_cleared_at: data.last_cleared_at
  }
}

// =====================
// WATCH → auto dimensions
// =====================
watch(() => form.value.sort, (newSort) => {
  const dims = getDefaultDimensions(newSort)
  if (!dims) return

  form.value.width = dims.width != null ? String(dims.width) : ''
  form.value.length = dims.length != null ? String(dims.length) : ''
})

// =====================
// INIT
// =====================
onMounted(async () => {
  try {

    const res = await axios.get(`${API}/active-token`, {
      withCredentials: true
    })

    const user = res.data.user

    console.log('USER:', user)

    // ✅ hier gebeurt de magie
    canEdit.value = user.role_name === 'admin' || user.role_name === 'beheerder'

    console.log('CAN EDIT:', canEdit.value)

    await loadSettings()
    await loadGrave()

  } catch (err) {
    console.error('Fout bij laden gebruiker:', err)
  }
})

// =====================
// EDIT
// =====================
function toggleEdit() {
  if (!canEdit.value) return

  if (editMode.value) {
    form.value = { ...grave.value }
  }

  editMode.value = !editMode.value
}

// =====================
// SAVE
// =====================
async function saveGrave() {
  if (!canEdit.value) return

  try {
    await axios.put(
      `${API}/graves/${route.params.grave_id}`,
      form.value
    )

    await loadGrave()
    editMode.value = false
    imagePreview.value = ''

  } catch (err) {
    console.error('Fout bij opslaan', err)
  }
}
function getGrafrustTot(date) {
  if (!date) return '-'

  const d = new Date(date)
  d.setFullYear(d.getFullYear() + 10)

  return d.toLocaleDateString('nl-NL')
}
// =====================
// IMAGE
// =====================
function handleFile(e) {
  const file = e.target.files?.[0]
  if (!file) return

  imagePreview.value = URL.createObjectURL(file)
}
function formatDate(date) {
  if (!date) return '-'

  return new Date(date).toLocaleDateString('nl-NL')
}

</script>