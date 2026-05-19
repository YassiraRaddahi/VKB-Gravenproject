<template>
    <v-container fluid class="pa-0 list-page-container">
        <TitleUnderline
            :title="cemeteryManager ? `Beheerder details van ${managerFullName(cemeteryManager)}` : 'Beheerder details'"
            underline-class="underlineLightBlue" />

        <v-container class="d-flex justify-center py-8">
            <v-card v-if="cemeteryManager" rounded="xl" elevation="5" color="#f1a07b" class="pa-4 pa-md-6 w-100"
                max-width="900">
                <v-row align="center">
                    <v-col cols="12" md="4" class="d-flex flex-column align-center justify-center">
                        <v-avatar size="220" class="position-relative profile-avatar mb-6">
                            <v-img v-if="cemeteryManager.profile_picture_url" :src="cemeteryManager.profile_picture_url"
                                :alt="`Profielfoto van beheerder ${managerFullName(cemeteryManager)}`" cover>
                                <template #error>
                                    <v-icon color="#0d475a" size="150">
                                        mdi-account
                                    </v-icon>
                                </template>
                            </v-img>

                            <v-icon v-else color="#0d475a" size="150">
                                mdi-account
                            </v-icon>

                            <v-btn v-if="isEditing" icon size="large" elevation="6" color="#16495d" class="avatar-btn"
                                @click="selectFile">
                                <v-icon color="white">
                                    mdi-camera
                                </v-icon>
                            </v-btn>

                            <input ref="fileInput" type="file" accept="image/*" class="d-none"
                                @change="handleFileUpload" />
                        </v-avatar>

                        <v-btn v-if="!isEditing" color="#ff2d35" variant="elevated" rounded="lg" size="large"
                            class="mt-6 px-6">
                            Verwijder
                        </v-btn>
                    </v-col>

                    <v-col cols="12" md="8">
                        <v-form @submit.prevent="saveManager">
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field label="Voornaam" v-model="editManager.first_name"
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

                                <v-col cols="12" class="d-flex flex-column flex-sm-row justify-end ga-3 pt-6">
                                    <v-btn color="#16495d" variant="elevated" rounded="lg" size="large" class="px-6"
                                        @click="cancelOrEdit">
                                        {{ isEditing ? 'Annuleren' : 'Wijzig' }}
                                    </v-btn>

                                    <v-btn v-if="!isEditing" color="#0d475a" variant="elevated" rounded="lg"
                                        size="large" class="px-6" @click="goToLinkedCemeteries">
                                        Naar gekoppelde kerkhoven
                                    </v-btn>

                                    <v-btn v-if="isEditing" type="submit" color="#023047" variant="elevated"
                                        rounded="lg" size="large" class="px-6">
                                        Opslaan
                                    </v-btn>
                                </v-col>
                            </v-container>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card>

            <div v-else class="text-center">
                Beheerder niet gevonden
            </div>
        </v-container>
    </v-container>
</template>

<script setup>
import TitleUnderline from '@/components/TitleUnderline.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const managerName = decodeURIComponent(route.params.user_id)

const cemeteryManager = ref(null)
const isEditing = ref(false)
const linkedCemeteryId = ref(null)
const fileInput = ref(null)



const editManager = ref({
    first_name: '',
    infix: '',
    last_name: '',
    email: '',
    phone_number: ''
})

const managerFullName = (manager) => {
    if (!manager) return ''

    return [
        manager.first_name,
        manager.infix,
        manager.last_name
    ]
        .filter(Boolean)
        .join(' ')
}

function fillEditManager() {
    if (!cemeteryManager.value) return

    editManager.value = {
        first_name: cemeteryManager.value.first_name || '',
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
            first_name: editManager.value.first_name,
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
        .get(`${import.meta.env.VITE_API_URL}/cemetery-managers`)
        .then(response => {
            const managers =
                response.data['cemetery-managers'] ||
                response.data.cemeteryManagers ||
                response.data

            cemeteryManager.value = managers.find(manager =>
                managerFullName(manager).trim() === managerName.trim()
            )

            if (cemeteryManager.value) {
                fillEditManager()

                axios.get(`${import.meta.env.VITE_API_URL}/cemeteries`)
                    .then(res => {
                        const linkedCemetery = res.data.cemeteries.find(cemetery =>
                            cemetery.cemetery_managers?.some(manager =>
                                Number(manager.id) === Number(cemeteryManager.value.id)
                            )
                        )

                        linkedCemeteryId.value = linkedCemetery?.id || null
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
}

.avatar-btn {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%) scale(0.8);

    opacity: 0;

    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
}

.profile-avatar:hover .avatar-btn {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
}

/* .profile-avatar {
    overflow: hidden;
} */
</style>