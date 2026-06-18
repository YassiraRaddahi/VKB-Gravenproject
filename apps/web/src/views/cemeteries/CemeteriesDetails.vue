<template>
    <v-container fluid class="pa-0 list-page-container">

        <TitleUnderline :title="cemetery.name || 'Begraafplaats details'" underline-class="underlineLightBlue" />

        <!-- CENTER WRAPPER -->
        <v-container class="d-flex justify-center py-8">

            <v-card rounded="xl" elevation="5" color="#f1a07b" class="pa-6 w-100" max-width="900">

                <v-row class="ga-6" align="start">

                    <!-- IMAGE -->
                    <v-col cols="12" md="4" class="d-flex flex-column align-center">

                        <v-card rounded="xl" elevation="5" width="100%" max-width="260"
                            class="position-relative overflow-hidden">

                            <!-- FOTO -->
                            <v-img :src="imagePreview || cemetery.image_url" :alt="`Foto van ${cemetery.name}`" cover
                                height="260">
                            </v-img>

                            <!-- CAMERA BUTTON -->
                            <v-btn icon size="large" elevation="6" color="#16495d" class="position-absolute opacity-90"
                                style="right: 12px; bottom: 12px;" @click="selectFile">
                                <v-icon color="white">
                                    mdi-camera
                                </v-icon>
                            </v-btn>

                            <!-- HIDDEN INPUT -->
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
                                        <v-text-field label="Naam begraafplaats" v-model="form.name"
                                            :readonly="!editMode" hide-details class="text-white" required />
                                    </v-col>
                                </v-row>

                                <!-- ADDRESS -->
                                <v-row>

                                    <v-col cols="12" md="4">
                                        <v-text-field label="Stad" v-model="form.city" :readonly="!editMode"
                                            hide-details class="text-white" />
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field label="Straatnaam" v-model="form.street_name"
                                            :readonly="!editMode" hide-details class="text-white" />
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field label="Huisnummer" v-model="form.house_number"
                                            :readonly="!editMode" hide-details class="text-white" />
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-text-field label="Huisletter" v-model="form.house_letter"
                                            :readonly="!editMode" hide-details class="text-white" />
                                    </v-col>
                                    <v-text-field label="Postcode" v-model="form.zip_code" :readonly="!editMode"
                                        hide-details class="text-white" />
                                    <v-col cols="12" md="4">
                                        <v-text-field label="Toevoeging" v-model="form.house_number_addition"
                                            :readonly="!editMode" hide-details class="text-white" />
                                    </v-col>

                                </v-row>


                                <!-- CONTACT -->
                                <v-row>

                                    <v-col cols="12">
                                        <v-text-field label="E-mail" v-model="form.email" :readonly="!editMode"
                                            hide-details class="text-white" />
                                    </v-col>

                                    <v-col cols="12">
                                        <v-text-field label="Telefoonnummer" v-model="form.phone_number"
                                            :readonly="!editMode" hide-details class="text-white" />
                                    </v-col>

                                </v-row>

                                <!-- WEBSITE -->
                                <v-row>

                                    <v-col cols="12">
                                        <v-text-field label="Website" v-model="form.website_url" :readonly="!editMode"
                                            hide-details class="text-white" />
                                    </v-col>

                                </v-row>

                                <!-- REMARKS -->
                                <v-row>
                                    <v-col cols="12" md="10">
                                        <v-textarea label="Opmerkingen" v-model="form.remarks" :readonly="!editMode"
                                            auto-grow rows="5" class="custom-textarea text-white" hide-details />
                                    </v-col>
                                </v-row>
                                <!-- IBAN -->
                                <v-row>
                                    <v-col cols="12">

                                        <div class="text-white mb-2 font-weight-medium">
                                            IBAN
                                        </div>

                                        <!-- VIEW MODE -->
                                        <v-text-field v-if="!editMode" :value="displayedIban" readonly hide-details
                                            class="text-white" @mouseenter="showIban = true"
                                            @mouseleave="showIban = false" />

                                        <!-- EDIT MODE -->
                                        <v-text-field v-else v-model="form.iban" label="IBAN" hide-details
                                            class="text-white" />

                                    </v-col>
                                </v-row>
                                <v-row class="mb-4">
                                    <v-col cols="12">
                                        <v-sheet class="pa-4 d-flex justify-space-between" color="#16495d" rounded="lg">

                                            <div class="text-white">
                                                Totaal Graven: {{ graveStats.total }}
                                            </div>

                                            <div class="text-white">
                                                Beschikbaar: {{ graveStats.available }}
                                            </div>

                                            <div class="text-white">
                                                In gebruik: {{ graveStats.occupied }}
                                            </div>

                                            <div class="text-white">
                                                Gereserveerd: {{ graveStats.reserved }}
                                            </div>

                                        </v-sheet>
                                    </v-col>
                                </v-row>


                                <!-- MANAGERS -->
                                <v-col cols="12">

                                    <div class="text-subtitle-2 font-weight-medium mb-2 text-white">
                                        Gekoppelde beheerder(s)
                                    </div>

                                    <v-sheet rounded="lg" class="pa-4" elevation="1">

                                        <!-- EDIT MODE -->
                                        <template v-if="editMode">

                                            <!-- SELECT -->
                                            <v-select v-model="selectedManagerIds" :items="allManagers"
                                                item-title="full_name" item-value="id" label="Selecteer beheerder(s)"
                                                multiple chips clearable variant="outlined"
                                                prepend-inner-icon="mdi-account-group" class="mb-6" />

                                            <v-divider class="my-4" />

                                            <!-- CREATE -->
                                            <div class="text-subtitle-2 font-weight-bold mb-3">
                                                Nieuwe beheerder aanmaken
                                            </div>

                                            <v-row>

                                                <v-col cols="12" md="4">

                                                    <v-text-field v-model="newManager.first_names" label="Voornaam"
                                                        variant="outlined" density="comfortable" hide-details />

                                                </v-col>

                                                <v-col cols="12" md="4">

                                                    <v-text-field v-model="newManager.infix" label="Tussenvoegsel"
                                                        variant="outlined" density="comfortable" hide-details />

                                                </v-col>

                                                <v-col cols="12" md="4">

                                                    <v-text-field v-model="newManager.last_name" label="Achternaam"
                                                        variant="outlined" density="comfortable" hide-details />

                                                </v-col>
                                                <v-col cols="12" class="d-flex justify-end">
                                                    <v-text-field v-model="newEmail" label="E-mail" variant="outlined"
                                                        density="comfortable" hide-details />
                                                </v-col>
                                                <v-col cols="12" class="d-flex justify-end">
                                                    <v-text-field v-model="newPhoneNumber" label="Telefoonnummer"
                                                        variant="outlined" density="comfortable"
                                                        hide-details></v-text-field>
                                                </v-col>
                                            </v-row>

                                            <div class="d-flex justify-end mt-4">

                                                <v-btn color="#16495d" prepend-icon="mdi-plus"
                                                    :loading="creatingManager" @click="createManager">
                                                    Beheerder toevoegen
                                                </v-btn>

                                            </div>

                                        </template>

                                        <!-- VIEW MODE -->
                                        <template v-else>

                                            <template v-if="cemetery.cemetery_managers?.length">

                                                <v-row>

                                                    <v-col v-for="manager in cemetery.cemetery_managers"
                                                        :key="manager.id" cols="12">

                                                        <div class="d-flex align-center ga-3">

                                                            <v-avatar size="34" color="#f3a983">

                                                                <v-icon size="18" color="#16495d">
                                                                    mdi-account
                                                                </v-icon>

                                                            </v-avatar>

                                                            <div class="text-body-2">
                                                                {{ manager.full_name }}
                                                            </div>

                                                        </div>

                                                    </v-col>

                                                </v-row>

                                            </template>

                                            <template v-else>

                                                <div class="text-body-2">
                                                    Geen beheerders ingesteld
                                                </div>

                                            </template>

                                        </template>

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

                            </v-container>

                        </v-form>

                    </v-col>

                </v-row>

            </v-card>

        </v-container>

    </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import TitleUnderline from '@/components/ui/TitleUnderline.vue'

const route = useRoute()
const router = useRouter()

const cemetery = ref({
    id: null,
    name: '',
    city: '',
    street_name: '',
    house_number: '',
    house_number_addition: '',
    house_letter: '',
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

const fileInput = ref(null)

const imagePreview = ref('')

const allManagers = ref([])

const selectedManagerIds = ref([])

const newManager = ref({
    first_names: '',
    infix: '',
    last_name: ''
})

const creatingManager = ref(false)

const cemeteryId = route.params.cemetery_id

const managerFullName = (manager) =>
    `${manager.first_names} ${manager.infix || ''} ${manager.last_name}`.trim()

const selectedManagers = computed(() => {
    return allManagers.value.filter(manager =>
        selectedManagerIds.value.includes(manager.id)
    )
})

const loadCemetery = async () => {

    try {

        const apiUrl =
            `${import.meta.env.VITE_API_URL}/cemeteries/${cemeteryId}`

        const response = await axios.get(apiUrl)

        cemetery.value = {
            ...response.data.cemetery,
            cemetery_managers:
                response.data.cemetery.cemetery_managers.map(manager => ({
                    ...manager,
                    full_name: managerFullName(manager)
                }))
        }

        form.value = {
            name: response.data.cemetery.name,
            city: response.data.cemetery.city,
            street_name: response.data.cemetery.street_name,
            house_number: response.data.cemetery.house_number,
            house_letter: response.data.cemetery.house_letter,
            house_number_addition: response.data.cemetery.house_number_addition,
            zip_code: response.data.cemetery.zip_code,
            email: response.data.cemetery.email,
            phone_number: response.data.cemetery.phone_number,
            website_url: response.data.cemetery.website_url,
            remarks: response.data.cemetery.remarks,
            iban: response.data.cemetery.iban || ''
        };

        selectedManagerIds.value =
            cemetery.value.cemetery_managers.map(manager => manager.id)

    } catch (error) {

        console.error('Error fetching cemetery details:', error)

    }

}

const loadAllManagers = async () => {

    try {

        const apiUrl =
            `${import.meta.env.VITE_API_URL}/cemetery-managers`

        const response = await axios.get(apiUrl)

        allManagers.value =
            response.data['cemetery-managers'].map(manager => ({
                ...manager,
                full_name: managerFullName(manager)
            }))

    } catch (error) {

        if (!error.response || error.response.status !== 404) {
            console.error('Error loading manager list:', error)
        }

        allManagers.value = []

    }

}
const loadGraves = async () => {
    const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/cemeteries/${cemeteryId}/graves`
    )

    graves.value = res.data.graves || []
}
onMounted(() => {
    loadCemetery()
    loadAllManagers()
    loadGraves()
})

function startEdit() {

    editMode.value = true

    form.value = {
        ...cemetery.value,
        iban: cemetery.value.iban || ''

    }

    selectedManagerIds.value =
        cemetery.value.cemetery_managers.map(manager => manager.id)

}

function cancelEdit() {

    editMode.value = false

    form.value = {
        ...cemetery.value,
        iban: cemetery.value.iban || ''

    }

    selectedManagerIds.value =
        cemetery.value.cemetery_managers.map(manager => manager.id)

}

function removeManager(managerId) {

    selectedManagerIds.value =
        selectedManagerIds.value.filter(id => id !== managerId)

}

async function createManager() {

    if (
        !newManager.value.first_name?.trim() ||
        !newManager.value.last_name?.trim()
    ) {

        alert('Voornaam en achternaam zijn verplicht')

        return

    }

    creatingManager.value = true

    try {

        const apiUrl =
            `${import.meta.env.VITE_API_URL}/cemetery-managers`

        const payload = {
            first_names: newManager.value.first_names.trim(),
            infix: newManager.value.infix?.trim() || '',
            last_name: newManager.value.last_name.trim()
        }

        console.log('POST URL:', apiUrl)
        console.log('PAYLOAD:', payload)

        const response = await axios.post(apiUrl, payload)

        console.log('FULL RESPONSE:', response)
        console.log('RESPONSE DATA:', response.data)

        const managerData =
            response.data.manager ||
            response.data.cemetery_manager ||
            response.data.data ||
            response.data

        console.log('MANAGER DATA:', managerData)

        if (!managerData || !managerData.id) {

            alert(
                'Manager aangemaakt maar geen geldig object ontvangen. Check console.'
            )

            return

        }

        const createdManager = {
            ...managerData,
            full_name: managerFullName(managerData)
        }

        const exists = allManagers.value.some(
            manager => manager.id === createdManager.id
        )

        if (!exists) {
            allManagers.value.push(createdManager)
        }

        if (!selectedManagerIds.value.includes(createdManager.id)) {
            selectedManagerIds.value.push(createdManager.id)
        }

        newManager.value = {
            first_names: '',
            infix: '',
            last_name: ''
        }

        alert('Beheerder succesvol aangemaakt')

    } catch (error) {

        console.error('CREATE MANAGER ERROR:', error)
        console.error('ERROR RESPONSE:', error.response)
        console.error('ERROR DATA:', error.response?.data)

        alert(
            error.response?.data?.message ||
            error.message ||
            'Fout bij aanmaken beheerder'
        )

    } finally {

        creatingManager.value = false

    }

}


async function saveChanges() {

    try {

        await axios.put(
            `${import.meta.env.VITE_API_URL}/cemeteries/${cemeteryId}`,
            {
                name: form.value.name,
                city: form.value.city,
                street_name: form.value.street_name,
                house_number: form.value.house_number,
                house_letter: form.value.house_letter,
                house_number_addition: form.value.house_number_addition,
                zip_code: form.value.zip_code,
                email: form.value.email,
                phone_number: form.value.phone_number,
                website_url: form.value.website_url,
                remarks: form.value.remarks,
                iban: form.value.iban
            }
        );

        await axios.put(
            `${import.meta.env.VITE_API_URL}/cemeteries/${cemeteryId}/managers`,
            {
                manager_ids: selectedManagerIds.value
            }
        );

        await loadCemetery();

        editMode.value = false;

    } catch (error) {
        console.error(error);
    }
}

function goToGraves() {

    router.push({
        name: 'Graves',
        params: {
            cemetery_id: cemeteryId
        }
    })

}

function selectFile() {

    fileInput.value?.click()

}

async function handleFileUpload(event) {

    const file = event.target.files?.[0]

    if (!file) {
        return
    }

    imagePreview.value = URL.createObjectURL(file)

    try {

        const reader = new FileReader()

        const base64Data = await new Promise((resolve, reject) => {

            reader.onload = () => {

                const result = reader.result

                if (!result || typeof result !== 'string') {
                    return reject(new Error('Failed to read file'))
                }

                resolve(result.split(',')[1])

            }

            reader.onerror = () => {
                reject(new Error('Failed to read file'))
            }

            reader.readAsDataURL(file)

        })

        const apiUrl =
            `${import.meta.env.VITE_API_URL}/cemeteries/${cemeteryId}/image`

        const response = await axios.post(apiUrl, {
            file_name: file.name,
            data: base64Data
        })

        cemetery.value.image_url = response.data.image_url

        imagePreview.value = ''

    } catch (error) {

        console.error('Error uploading cemetery image:', error)

    } finally {

        if (fileInput.value) {
            fileInput.value.value = null
        }

    }


}
const showIban = ref(false)

function formatIban(value) {
    if (!value) return ''

    const clean = value.replace(/\s/g, '')

    if (clean.length <= 6) return clean

    return (
        clean.slice(0, 4) +
        '*'.repeat(clean.length - 6) +
        clean.slice(-2)
    )
}

const displayedIban = computed(() => {
    const iban = form.value.iban || ''

    if (editMode.value) return iban
    if (showIban.value) return iban

    return formatIban(iban)
})

const graves = ref([])

const graveStats = computed(() => {
    const total = graves.value.length

    const available = graves.value.filter(
        g => g.status === 'beschikbaar'
    ).length

    const occupied = graves.value.filter(
        g => g.status === 'in gebruik'
    ).length

    const reserved = graves.value.filter(
        g => g.status === 'gereserveerd'
    ).length

    return {
        total,
        available,
        occupied,
        reserved
    }
})
const availabilityColor = computed(() => {
    const free = graveStats.value.available
    const total = graveStats.value.total

    if (total === 0) return 'grey'
    if (free === 0) return 'red'
    if (free < total / 3) return 'orange'
    return 'green'
})
</script>

<style scoped></style>