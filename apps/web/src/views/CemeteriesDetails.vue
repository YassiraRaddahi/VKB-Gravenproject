<template>
    <v-container fluid class="pa-0 list-page-container">

        <TitleUnderline
            :title="cemetery.name || 'Begraafplaats details'"
            underline-class="underlineLightBlue"
        />

        <v-container class="d-flex justify-center py-8">

            <v-card
                rounded="xl"
                elevation="5"
                color="#f1a07b"
                class="pa-6 w-100"
                max-width="900"
            >

                <v-row class="ga-6" align="start">

                    <!-- IMAGE -->
                    <v-col cols="12" md="4" class="d-flex flex-column align-center">

                        <v-card
                            rounded="xl"
                            elevation="5"
                            width="100%"
                            max-width="260"
                            class="position-relative overflow-hidden"
                        >

                            <v-img
                                :src="imagePreview || cemetery.image_url"
                                :alt="`Foto van ${cemetery.name}`"
                                cover
                                height="260"
                            >
                                <template #placeholder>
                                    <div class="d-flex align-center justify-center fill-height">
                                        <v-progress-circular
                                            indeterminate
                                            color="white"
                                        />
                                    </div>
                                </template>
                            </v-img>

                            <v-btn
                                icon
                                size="large"
                                elevation="6"
                                color="#16495d"
                                class="position-absolute opacity-90"
                                style="right: 12px; bottom: 12px;"
                                @click="selectFile"
                            >
                                <v-icon color="white">
                                    mdi-camera
                                </v-icon>
                            </v-btn>

                            <input
                                ref="fileInput"
                                type="file"
                                accept="image/*"
                                class="d-none"
                                @change="handleFileUpload"
                            />

                        </v-card>

                    </v-col>

                    <!-- FORM -->
                    <v-col cols="12" md="8">

                        <v-form @submit.prevent="saveChanges">

                            <v-container>

                                <!-- NAME -->
                                <v-row>

                                    <v-col cols="12">

                                        <v-text-field
                                            label="Naam begraafplaats"
                                            v-model="form.name"
                                            :readonly="!editMode"
                                            hide-details
                                            class="text-white"
                                            required
                                        />

                                    </v-col>

                                </v-row>

                                <!-- ADDRESS -->
                                <v-row>

                                    <v-col cols="12" md="4">

                                        <v-text-field
                                            label="Stad"
                                            v-model="form.city"
                                            :readonly="!editMode"
                                            hide-details
                                            class="text-white"
                                        />

                                    </v-col>

                                    <v-col cols="12" md="4">

                                        <v-text-field
                                            label="Adres"
                                            v-model="form.address"
                                            :readonly="!editMode"
                                            hide-details
                                            class="text-white"
                                        />

                                    </v-col>

                                    <v-col cols="12" md="4">

                                        <v-text-field
                                            label="Postcode"
                                            v-model="form.zip_code"
                                            :readonly="!editMode"
                                            hide-details
                                            class="text-white"
                                        />

                                    </v-col>

                                </v-row>

                                <!-- CONTACT -->
                                <v-row>

                                    <v-col cols="12">

                                        <v-text-field
                                            label="E-mail"
                                            v-model="form.email"
                                            :readonly="!editMode"
                                            hide-details
                                            class="text-white"
                                        />

                                    </v-col>

                                    <v-col cols="12">

                                        <v-text-field
                                            label="Telefoonnummer"
                                            v-model="form.phone_number"
                                            :readonly="!editMode"
                                            hide-details
                                            class="text-white"
                                        />

                                    </v-col>

                                </v-row>

                                <!-- WEBSITE -->
                                <v-row>

                                    <v-col cols="12">

                                        <v-text-field
                                            label="Website"
                                            v-model="form.website_url"
                                            :readonly="!editMode"
                                            hide-details
                                            class="text-white"
                                        />

                                    </v-col>

                                </v-row>

                                <!-- REMARKS -->
                                <v-row>

                                    <v-col cols="12">

                                        <v-textarea
                                            label="Opmerkingen"
                                            v-model="form.remarks"
                                            :readonly="!editMode"
                                            rows="2"
                                            hide-details
                                            class="text-white"
                                        />

                                    </v-col>

                                </v-row>


                                <!-- BUTTONS -->
                                <v-col
                                    cols="12"
                                    class="d-flex justify-end ga-3 flex-wrap pt-2"
                                >

                                    <v-btn
                                        type="button"
                                        color="#16495d"
                                        variant="elevated"
                                        rounded="lg"
                                        size="large"
                                        class="px-6"
                                        @click="editMode ? cancelEdit() : startEdit()"
                                    >
                                        {{ editMode ? 'Annuleren' : 'Wijzig' }}
                                    </v-btn>

                                    <v-btn
                                        type="button"
                                        color="#0d475a"
                                        variant="elevated"
                                        rounded="lg"
                                        size="large"
                                        class="px-6"
                                        @click="goToGraves"
                                    >
                                        Bekijk Graven
                                    </v-btn>

                                    <v-btn
                                        v-if="editMode"
                                        type="submit"
                                        color="#023047"
                                        variant="elevated"
                                        rounded="lg"
                                        size="large"
                                        class="px-6"
                                    >
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import TitleUnderline from '@/components/TitleUnderline.vue'

const route = useRoute()
const router = useRouter()

const cemeteryId = route.params.cemetery_id

const cemetery = ref({
    id: null,
    name: '',
    city: '',
    address: '',
    zip_code: '',
    email: '',
    phone_number: '',
    website_url: '',
    remarks: '',
    image_url: '',
    cemetery_managers: []
})

const form = ref({})

const editMode = ref(false)

const fileInput = ref(null)
const imagePreview = ref('')

const allManagers = ref([])
const selectedManagerIds = ref([])

const managerToAdd = ref(null)
const addManagerMode = ref(false)

const createManagerMode = ref(false)

const newManager = ref({
    first_name: '',
    infix: '',
    last_name: '',
    email: '',
    phone_number: ''
})

/* ---------------- HELPERS ---------------- */
const managerFullName = (m) =>
    `${m.first_name} ${m.infix || ''} ${m.last_name}`.trim()

/* ---------------- LOAD CEMETERY ---------------- */
async function loadCemetery() {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/cemeteries/${cemeteryId}`
        )

        cemetery.value = {
            ...data.cemetery,
            cemetery_managers: data.cemetery.cemetery_managers.map(m => ({
                ...m,
                id: String(m.id),
                full_name: managerFullName(m)
            }))
        }

        form.value = { ...cemetery.value }

        selectedManagerIds.value =
            cemetery.value.cemetery_managers.map(m => String(m.id))

    } catch (err) {
        console.error('loadCemetery error', err)
    }
}

/* ---------------- LOAD MANAGERS ---------------- */
async function loadManagers() {
    try {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/cemetery-managers`
        )

        allManagers.value = data['cemetery-managers'].map(m => ({
            ...m,
            id: String(m.id),
            full_name: managerFullName(m)
        }))
    } catch (err) {
        console.error('loadManagers error', err)
        allManagers.value = []
    }
}

/* ---------------- COMPUTED ---------------- */
const selectedManagerObjects = computed(() =>
    allManagers.value.filter(m =>
        selectedManagerIds.value.includes(m.id)
    )
)

const availableManagers = computed(() =>
    allManagers.value.filter(m =>
        !selectedManagerIds.value.includes(m.id)
    )
)

/* ---------------- EDIT MODE ---------------- */
function startEdit() {
    editMode.value = true
    form.value = { ...cemetery.value }

    selectedManagerIds.value =
        cemetery.value.cemetery_managers.map(m => String(m.id))
}

function cancelEdit() {
    editMode.value = false
    form.value = { ...cemetery.value }

    selectedManagerIds.value =
        cemetery.value.cemetery_managers.map(m => String(m.id))

    addManagerMode.value = false
    createManagerMode.value = false
    managerToAdd.value = null

    resetNewManager()
}

/* ---------------- MANAGERS ---------------- */
function addManager() {
    if (!managerToAdd.value) return

    const id = String(managerToAdd.value)

    if (!selectedManagerIds.value.includes(id)) {
        selectedManagerIds.value.push(id)
    }

    managerToAdd.value = null
    addManagerMode.value = false
}

function removeManager(id) {
    selectedManagerIds.value =
        selectedManagerIds.value.filter(x => x !== String(id))
}

/* ---------------- CREATE MANAGER ---------------- */
function resetNewManager() {
    newManager.value = {
        first_name: '',
        infix: '',
        last_name: '',
        email: '',
        phone_number: ''
    }
}

function cancelCreateManager() {
    createManagerMode.value = false
    resetNewManager()
}

async function createManager() {
    try {
        const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/cemetery-managers`,
            newManager.value
        )

        const m = data['cemetery-manager']

        const created = {
            ...m,
            id: String(m.id),
            full_name: managerFullName(m)
        }

        allManagers.value.push(created)
        selectedManagerIds.value.push(created.id)

        createManagerMode.value = false
        resetNewManager()

    } catch (err) {
        console.error('createManager error', err)
    }
}

/* ---------------- SAVE ---------------- */
async function saveChanges() {
    try {
        await axios.put(
            `${import.meta.env.VITE_API_URL}/cemeteries/${cemeteryId}`,
            form.value
        )

        await axios.put(
            `${import.meta.env.VITE_API_URL}/cemeteries/${cemeteryId}/managers`,
            {
                manager_ids: selectedManagerIds.value
            }
        )

        cemetery.value = {
            ...form.value,
            cemetery_managers: selectedManagerObjects.value
        }

        editMode.value = false

    } catch (err) {
        console.error('saveChanges error', err)
    }
}

/* ---------------- IMAGE ---------------- */
function selectFile() {
    fileInput.value?.click()
}

async function handleFileUpload(event) {
    const file = event.target.files?.[0]
    if (!file) return

    imagePreview.value = URL.createObjectURL(file)

    try {
        const base64 = await new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = () =>
                resolve(reader.result.split(',')[1])

            reader.onerror = reject

            reader.readAsDataURL(file)
        })

        const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/cemeteries/${cemeteryId}/image`,
            {
                file_name: file.name,
                data: base64
            }
        )

        cemetery.value.image_url = data.image_url
        imagePreview.value = ''

    } catch (err) {
        console.error('image upload error', err)
    } finally {
        if (fileInput.value) fileInput.value.value = null
    }
}

/* ---------------- NAV ---------------- */
function goToGraves() {
    router.push({
        name: 'Graves',
        params: { cemetery_id: cemeteryId }
    })
}

/* ---------------- INIT ---------------- */
onMounted(() => {
    loadCemetery()
    loadManagers()
})

/*------------foto uploaden--------*/
const search = ref('')
const managerFilter = ref(null)
const cityFilter = ref(null)
const url = `${import.meta.env.VITE_API_URL}/cemeteries`

</script>