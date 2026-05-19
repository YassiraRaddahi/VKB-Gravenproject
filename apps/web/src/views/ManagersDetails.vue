<template>
    <v-container fluid class="pa-0 list-page-container">
        <TitleUnderline
            :title="cemeteryManager ? `Beheerder details van ${managerFullName(cemeteryManager)}` : 'Beheerder details'"
            underline-class="underlineLightBlue" />

        <!-- CENTER WRAPPER -->
        <v-container class="d-flex justify-center py-8">
            <v-card v-if="cemeteryManager" rounded="xl" elevation="5" color="#f1a07b" class="pa-6 w-100"
                max-width="900">
                <v-row class="ga-6" align="start">
                    <!-- IMAGE -->
                    <v-col cols="12" md="4" class="d-flex flex-column align-center">
                        <v-sheet elevation="2" class="overflow-hidden" width="100%" max-width="260">
                            <v-img v-if="cemeteryManager.profile_picture_url"
                                :src="cemeteryManager.profile_picture_url"
                                :alt="`Foto van ${managerFullName(cemeteryManager)}`"
                                cover
                                height="220" />

                            <div v-else class="d-flex align-center justify-center" style="height: 220px; background-color: #f3a983;">
                                <v-icon size="140" color="#16495d">
                                    mdi-account
                                </v-icon>
                            </div>
                        </v-sheet>

                        <v-btn v-if="isEditing" color="#0d475a" variant="elevated" rounded="lg" class="mt-6 text-none text-white">
                            Foto uploaden
                        </v-btn>

                        <v-btn v-else color="#ff2d35" variant="elevated" rounded="lg" class="mt-6 text-none text-white">
                            Verwijder
                        </v-btn>
                    </v-col>

                    <!-- FORM -->
                    <v-col cols="12" md="8">
                        <v-form @submit.prevent="saveManager">
                            <v-container>
                                <v-row>
                                    <v-col cols="12" md="4">
                                        <v-text-field label="Voornaam" v-model="editManager.first_name"
                                            :readonly="!isEditing" hide-details class="text-white" />
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field label="Tussenvoegsel" v-model="editManager.infix"
                                            :readonly="!isEditing" hide-details class="text-white" />
                                    </v-col>

                                    <v-col cols="12" md="4">
                                        <v-text-field label="Achternaam" v-model="editManager.last_name"
                                            :readonly="!isEditing" hide-details class="text-white" />
                                    </v-col>
                                </v-row>

                                <v-row>
                                    <v-col cols="12" md="12">
                                        <v-text-field label="E-mail" v-model="editManager.email"
                                            :readonly="!isEditing" hide-details class="text-white" />
                                    </v-col>

                                    <v-col cols="12" md="12">
                                        <v-text-field label="Telefoonnummer" v-model="editManager.phone_number"
                                            :readonly="!isEditing" hide-details class="text-white" />
                                    </v-col>
                                </v-row>

                                <!-- BUTTONS -->
                                <v-col cols="12" class="d-flex justify-end ga-3 flex-wrap pt-2">
                                    <v-btn color="#16495d" variant="elevated" rounded="lg" size="large" class="px-6"
                                        @click="isEditing ? cancelEdit() : startEdit()">
                                        {{ isEditing ? 'Annuleren' : 'Wijzig' }}
                                    </v-btn>

                                    <router-link v-if="!isEditing && linkedCemeteryId"
                                        :to="{
                                            name: 'Cemeteries',
                                            query: { manager: cemeteryManager.user_id }
                                        }"
                                        class="text-decoration-none">
                                        <v-btn color="#0d475a" variant="elevated" rounded="lg" size="large" class="px-6">
                                            Bekijk gekoppelde kerkhoven
                                        </v-btn>
                                    </router-link>

                                    <v-btn v-if="isEditing" type="submit" color="#023047" variant="elevated" rounded="lg"
                                        size="large" class="px-6">
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
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const route = useRoute()

const managerName = decodeURIComponent(route.params.user_id)

const cemeteryManager = ref(null)
const isEditing = ref(false)
const linkedCemeteryId = ref(null)

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
    editManager.value = {
        first_name: cemeteryManager.value?.first_name || '',
        infix: cemeteryManager.value?.infix || '',
        last_name: cemeteryManager.value?.last_name || '',
        email: cemeteryManager.value?.email || '',
        phone_number: cemeteryManager.value?.phone_number || ''
    }
}

function startEdit() {
    isEditing.value = true
    fillEditManager()
}

function cancelEdit() {
    isEditing.value = false
    fillEditManager()
}

async function saveManager() {
    try {
        const userId = Number(
            cemeteryManager.value?.user_id ||
            cemeteryManager.value?.id
        )

        if (!userId) {
            console.error('Geen geldige ID gevonden')
            return
        }

        await axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
            first_name: editManager.value.first_name,
            infix: editManager.value.infix || null,
            last_name: editManager.value.last_name,
            email: editManager.value.email,
            phone_number: editManager.value.phone_number
        })

        cemeteryManager.value = {
            ...cemeteryManager.value,
            first_name: editManager.value.first_name,
            infix: editManager.value.infix || null,
            last_name: editManager.value.last_name,
            email: editManager.value.email,
            phone_number: editManager.value.phone_number
        }

        isEditing.value = false
    } catch (error) {
        console.error('Fout bij opslaan beheerder:', error)
    }
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
                                Number(manager.user_id) === Number(cemeteryManager.value.user_id)
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

<style scoped></style>
