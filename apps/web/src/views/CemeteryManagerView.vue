<template>
    <v-container fluid class="pa-0 list-page-container">
        <TitleUnderline
            :title="cemeteryManager ? `Beheerder details van ${managerFullName(cemeteryManager)}` : 'Beheerder details'"
            underline-class="underlineLightBlue" />

        <v-container>
            <FormCard v-if="cemeteryManager" embedded bg-color="orange">
                <v-row>
                    <v-col cols="12" md="4" class="d-flex flex-column align-center">
                        <v-sheet class="position-relative bg-transparent">
                            <v-avatar :size="mdAndUp ? 200 : 150">
                                <!-- Profile picture or fallback icon -->
                                <v-img data-testid="profile-picture-url" v-if="cemeteryManager.profile_picture_url"
                                    :src="cemeteryManager.profile_picture_url"
                                    :key="cemeteryManager.profile_picture_url + '-' + $route.fullPath"
                                    :alt="`Profielfoto van beheerder ${managerFullName(cemeteryManager)}`" cover>
                                    <template #error>
                                        <v-icon color="#0d475a" :size="mdAndUp ? 200 : 150">
                                            mdi-account
                                        </v-icon>
                                    </template>
                                </v-img>

                                <v-icon v-else color="#0d475a" :size="mdAndUp ? 200 : 150">
                                    mdi-account
                                </v-icon>

                                <!-- HIDDEN INPUT -->
                                <input ref="fileInput" type="file" accept="image/*" class="d-none"
                                    @change="handleFileUpload" />
                            </v-avatar>

                            <AppButton v-if="isEditing" data-testid="profile-picture-upload-btn" icon size="large"
                                class="avatar-btn position-absolute" @click="selectFile">
                                <v-icon color="white">
                                    mdi-camera
                                </v-icon>
                            </AppButton>
                        </v-sheet>
                    </v-col>

                    <v-col cols="12" md="8">
                        <v-form @submit.prevent="saveManager">
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field label="Voornamen" v-model="editManager.first_names"
                                            :readonly="!isEditing" hide-details class="text-white" />
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field label="Tussenvoegsel" v-model="editManager.infix"
                                            :readonly="!isEditing" hide-details class="text-white" />
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field label="Achternaam" v-model="editManager.last_name"
                                            :readonly="!isEditing" hide-details class="text-white" />
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field label="E-mail" v-model="editManager.email" :readonly="!isEditing"
                                            hide-details class="text-white" />
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field label="Telefoonnummer" v-model="editManager.phone_number"
                                            :readonly="!isEditing" hide-details class="text-white" />
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>

                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" class="d-flex flex-column flex-sm-row justify-end ga-3 pt-6">

                        <v-btn v-if="!isEditing" color="#ff2d35" variant="elevated" rounded="lg" size="large">
                            Verwijder
                        </v-btn>
                       <v-spacer />
                        <v-btn color="#16495d" variant="elevated" rounded="lg" size="large" class="px-6"
                            @click="cancelOrEdit">
                            {{ isEditing ? 'Annuleren' : 'Wijzig' }}
                        </v-btn>

                        <v-btn v-if="!isEditing" color="#0d475a" variant="elevated" rounded="lg" size="large"
                            class="px-6" @click="goToLinkedCemeteries">
                            Naar gekoppelde kerkhoven
                        </v-btn>

                        <v-btn v-if="isEditing" @click="saveManager" color="#023047" variant="elevated" rounded="lg"
                            size="large" class="px-6">
                            Opslaan
                        </v-btn>
                    </v-col>
                </v-row>
            </FormCard>
            <div v-else class="text-center">
                Beheerder niet gevonden
            </div>
        </v-container>
    </v-container>
</template>

<script setup>
import TitleUnderline from '@/components/ui/TitleUnderline.vue'
import AppButton from '@/components/ui/AppButton.vue'
import FormCard from '@/components/ui/FormCard.vue'

import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
const route = useRoute()
const router = useRouter()

const cemeteryManager = ref(null)
const managerId = Number(route.params.id)

const isEditing = ref(false)
const linkedCemeteryId = ref(null)
const fileInput = ref(null)



const editManager = ref({
    first_names: '',
    infix: '',
    last_name: '',
    email: '',
    phone_number: ''
})

const managerFullName = (manager) => {
    return [
        manager.first_names?.trim().split(/\s+/)[0] || '', // Gebruik alleen de eerste voornaam
        manager.infix,
        manager.last_name
    ]
        .filter(Boolean)
        .join(' ')
}

function fillEditManager() {
    if (!cemeteryManager.value) return

    editManager.value = {
        first_names: cemeteryManager.value.first_names || '',
        infix: cemeteryManager.value.infix || '',
        last_name: cemeteryManager.value.last_name || '',
        email: cemeteryManager.value.email || '',
        phone_number: cemeteryManager.value.phone_number || ''
    }
}

function cancelOrEdit() {
    if (isEditing.value) {
        fillEditManager()
        isEditing.value = false
        return
    }

    isEditing.value = true
}

function goToLinkedCemeteries() {
    if (!cemeteryManager.value) return

    router.push({
        name: 'Cemeteries',
        query: {
            manager: cemeteryManager.value.id
        }
    })
}

async function saveManager() {
    try {
        const userId = Number(cemeteryManager.value?.id)

        if (!userId) {
            console.error('Geen geldige ID gevonden')
            return
        }
        await axios.put(`${import.meta.env.VITE_API_URL}/cemetery-managers/${userId}`, {
            first_names: editManager.value.first_names,
            infix: editManager.value.infix || null,
            last_name: editManager.value.last_name,
            email: editManager.value.email,
            phone_number: editManager.value.phone_number
        })

        cemeteryManager.value = {
            ...cemeteryManager.value,
            ...editManager.value,
            infix: editManager.value.infix || null
        }

        isEditing.value = false
    } catch (error) {
        console.error('Fout bij opslaan beheerder:', error.response?.data || error)
        alert('Er is een fout opgetreden bij het opslaan van de beheerder.')
    }
}

const selectFile = () => {
    fileInput.value?.click()
}

const handleFileUpload = (event) => {
    const file = event.target.files[0]

    if (!file || !cemeteryManager.value) return

    const imageUrl = URL.createObjectURL(file)

    cemeteryManager.value.profile_picture_url = imageUrl

    console.log('Geselecteerd bestand:', file)
}

onMounted(() => {
    axios
        .get(`${import.meta.env.VITE_API_URL}/cemetery-managers/${managerId}`)
        .then(response => {
            cemeteryManager.value = response.data.cemetery_manager

            if (cemeteryManager.value) {
                fillEditManager()

                axios.get(`${import.meta.env.VITE_API_URL}/cemeteries`)
                    .then(res => {
                        // const linkedCemetery = res.data.cemeteries.find(cemetery =>
                        //     cemetery.cemetery_managers?.some(manager =>
                        //         Number(manager.id) === Number(cemeteryManager.value.id)
                        //     )
                        // )

                        // linkedCemeteryId.value = linkedCemetery?.id || null
                    })
            }
        })
        .catch(error => {
            console.error('Fout bij ophalen beheerder:', error)
        })
})
</script>

<style scoped>
.profile-avatar {
    overflow: hidden;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar-btn {
    right: 0;
    bottom: 0;
    transform: scale(0.8);
    transition: transform 0.2s;

}

.v-sheet:hover .avatar-btn {
    transform: scale(1);
}
</style>