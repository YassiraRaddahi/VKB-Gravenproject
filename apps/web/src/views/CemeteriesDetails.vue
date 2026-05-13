<template>
    <v-container fluid class="pa-0 list-page-container">

        <TitleUnderline :title="cemetery.name || 'Begraafplaats details'" underline-class="underlineLightBlue" />

        <!-- CENTER WRAPPER -->
        <v-container class="d-flex justify-center py-8">

            <v-card rounded="xl" elevation="5" color="#f1a07b" class="pa-6 w-100" max-width="900">

                <v-row class="ga-6" align="start">

                    <!-- IMAGE -->
                    <v-col cols="12" md="4" class="d-flex justify-center">
                        <v-sheet rounded="xl" elevation="2" class="overflow-hidden" width="100%" max-width="260">
                            <v-img :src="cemetery.image_url" :alt="`Foto van ${cemetery.name}`" cover height="220" />
                        </v-sheet>
                    </v-col>

                    <!-- FORM -->
                    <v-col cols="12" md="8">

                        <v-form @submit.prevent="saveChanges">

                            <v-row class="ga-4">

                                <!-- NAME -->
                                <v-col cols="12">
                                    <v-text-field label="Naam begraafplaats" v-model="form.name" :readonly="!editMode"
                                        variant="outlined" density="compact" hide-details class="bg-white" />
                                </v-col>

                                <!-- ADDRESS -->
                                <v-col cols="12" md="4">
                                    <v-text-field label="Stad" v-model="form.city" :readonly="!editMode"
                                        variant="outlined" density="compact" hide-details class="bg-white" />
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field label="Adres" v-model="form.address" :readonly="!editMode"
                                        variant="outlined" density="compact" hide-details class="bg-white" />
                                </v-col>

                                <v-col cols="12" md="4">
                                    <v-text-field label="Postcode" v-model="form.zip_code" :readonly="!editMode"
                                        variant="outlined" density="compact" hide-details class="bg-white" />
                                </v-col>

                                <!-- CONTACT -->
                                <v-col cols="12" md="6">
                                    <v-text-field label="E-mail" v-model="form.email" :readonly="!editMode"
                                        variant="outlined" density="compact" hide-details class="bg-white" />
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-text-field label="Telefoonnummer" v-model="form.phone_number"
                                        :readonly="!editMode" variant="outlined" density="compact" hide-details
                                        class="bg-white" />
                                </v-col>

                                <!-- EXTRA -->
                                <v-col cols="12" md="6">
                                    <v-text-field label="Website" v-model="form.website_url" :readonly="!editMode"
                                        variant="outlined" density="compact" hide-details class="bg-white" />
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-textarea label="Opmerkingen" v-model="form.remarks" :readonly="!editMode"
                                        variant="outlined" density="compact" rows="2" hide-details class="bg-white" />
                                </v-col>

                                <!-- MANAGERS -->
                                <v-col cols="12">
                                    <div class="text-subtitle-2 font-weight-medium mb-2">
                                        Gekoppelde beheerder(s)a
                                    </div>

                                    <v-sheet rounded="lg" class="pa-3 bg-white" elevation="1">

                                        <v-row class="ga-2">

                                            <template v-if="cemetery.cemetery_managers?.length">
                                                <v-col v-for="manager in cemetery.cemetery_managers" :key="manager.id"
                                                    cols="12" class="d-flex align-center ga-3">
                                                    <v-avatar size="32" color="#f3a983">
                                                        <v-icon size="18" color="#16495d">
                                                            mdi-account
                                                        </v-icon>
                                                    </v-avatar>

                                                    <div class="text-body-2">
                                                        {{
                                                            `${manager.first_name} ${manager.infix || ''}
                                                        ${manager.last_name}`.trim()
                                                        }}
                                                    </div>
                                                </v-col>
                                            </template>

                                            <template v-else>
                                                <v-col cols="12">
                                                    <div class="text-body-2">
                                                        Geen beheerders ingesteld
                                                    </div>
                                                </v-col>
                                            </template>

                                        </v-row>

                                    </v-sheet>
                                </v-col>

                                <!-- BUTTONS -->
                                <v-col cols="12" class="d-flex justify-end ga-3 flex-wrap pt-2">

                                    <v-btn color="#16495d" variant="elevated" rounded="lg" size="large" class="px-6"
                                        @click="editMode ? cancelEdit() : startEdit()">
                                        {{ editMode ? 'Annuleren' : 'Wijzig' }}
                                    </v-btn>

                                    <v-btn color="#0d475a" variant="elevated" rounded="lg" size="large" class="px-6"
                                        @click="goToGraves">
                                        Bekijk Graven
                                    </v-btn>

                                    <v-btn v-if="editMode" type="submit" color="#023047" variant="elevated" rounded="lg"
                                        size="large" class="px-6">
                                        Opslaan
                                    </v-btn>

                                </v-col>

                            </v-row>

                        </v-form>

                    </v-col>

                </v-row>

            </v-card>
        </v-container>

    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import TitleUnderline from '@/components/TitleUnderline.vue'

const route = useRoute()
const router = useRouter()

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

const form = ref({ ...cemetery.value })
const editMode = ref(false)

const cemeteryId = route.params.cemetery_id

const loadCemetery = async () => {
    try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/cemeteries/${cemeteryId}`
        const response = await axios.get(apiUrl)

        cemetery.value = response.data.cemetery
        form.value = { ...response.data.cemetery }
    } catch (error) {
        console.error('Error fetching cemetery details:', error)
    }
}

onMounted(loadCemetery)

function startEdit() {
    editMode.value = true
    form.value = { ...cemetery.value }
}

function cancelEdit() {
    editMode.value = false
    form.value = { ...cemetery.value }
}

async function saveChanges() {
    try {
        const apiUrl = `${import.meta.env.VITE_API_URL}/cemeteries/${cemeteryId}`

        await axios.put(apiUrl, {
            name: form.value.name,
            city: form.value.city,
            address: form.value.address,
            zip_code: form.value.zip_code,
            email: form.value.email,
            phone_number: form.value.phone_number,
            website_url: form.value.website_url,
            remarks: form.value.remarks
        })

        cemetery.value = { ...form.value }
        editMode.value = false
    } catch (error) {
        console.error('Error saving cemetery details:', error)
    }
}

function goToGraves() {
    router.push({ name: 'Graves', params: { cemetery_id: cemeteryId } })
}
</script>