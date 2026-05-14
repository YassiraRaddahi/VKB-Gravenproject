<template>
    <TitleUnderline
        :title="cemeteryManager ? `Beheerder details van ${managerFullName(cemeteryManager)}` : 'Beheerder details'"
        underline-class="underlineLightBlue" />
    <v-container class="mt-12 d-flex justify-center">
        <v-card v-if="cemeteryManager" class="pa-10 rounded-xl bg-detail-card" elevation="0" max-width="1100"
            width="100%">
            <v-row align="center">
                <!-- Linkerkant -->
                <v-col cols="12" md="5" class="text-center">
                    <v-avatar size="220" color="#f47b59">
                        <v-img v-if="cemeteryManager.profile_picture_url" :src="cemeteryManager.profile_picture_url"
                            cover />
                        <v-icon v-else size="160" color="#bfe4e1">
                            mdi-account
                        </v-icon>
                    </v-avatar>
                    <div v-if="!isEditing" class="mt-16">
                        <v-btn color="#ff2d35" class="text-none text-white">
                            Verwijder
                        </v-btn>
                    </div>
                    <div class="mt-16">
                        <v-btn v-if="isEditing" color="#0d475a" class="text-none text-white">
                            Foto uploaden
                        </v-btn>
                    </div>
                </v-col>

                <!-- Rechterkant -->
                <v-col cols="12" md="7">
                    <v-row align="center" class="mb-8">
                        <v-col cols="3" class="text-h5">Naam:</v-col>
                        <v-col cols="9">
                            <v-text-field v-if="isEditing" v-model="editManager.name" variant="solo" density="compact"
                                hide-details />

                            <v-sheet v-else class="pa-3 rounded-pill text-h6">
                                {{ managerFullName(cemeteryManager) }}
                            </v-sheet>
                        </v-col>
                    </v-row>

                    <v-row align="center" class="mb-12">
                        <v-col cols="3" class="text-h5">E-mail:</v-col>
                        <v-col cols="9">
                            <v-text-field v-if="isEditing" v-model="editManager.email" variant="solo" density="compact"
                                hide-details />

                            <v-sheet v-else class="pa-3 rounded-pill text-h6">
                                {{ cemeteryManager.email }}
                            </v-sheet>
                        </v-col>
                    </v-row>

                    <v-row align="center" class="mb-12">
                        <v-col cols="3" class="text-h5">Telefoon:</v-col>

                        <v-col cols="9">
                            <v-text-field v-if="isEditing" v-model="editManager.phone_number" variant="solo"
                                density="compact" hide-details />

                            <v-sheet v-else class="pa-3 rounded-pill text-h6">
                                {{ cemeteryManager.phone_number }}
                            </v-sheet>
                        </v-col>
                    </v-row>



                    <div class="d-flex justify-end">
                        <v-btn color="#0d475a" class="text-none text-white px-16" size="x-large" rounded="lg"
                            @click="isEditing ? saveManager() : isEditing = true">
                            {{ isEditing ? 'Opslaan' : 'Wijzig' }}
                        </v-btn>
                    </div>

 <div v-if="!isEditing && linkedCemeteryId" class="mt-16 d-flex justify-end">
    <router-link
        :to="{ 
            name: 'Cemeteries',
            query: { manager: cemeteryManager.user_id }
        }"
        class="text-decoration-none"
    >
        <v-btn color="#0d475a" class="text-none text-white">
            Bekijk gekoppelde kerkhoven
        </v-btn>
    </router-link>
</div>
                </v-col>
            </v-row>
        </v-card>

        <div v-else class="text-center">
            Beheerder niet gevonden
        </div>
    </v-container>
</template>

<script setup>
import TitleUnderline from '@/components/TitleUnderline.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from '../router'

const route = useRoute()

const managerName = decodeURIComponent(route.params.user_id)

const cemeteryManager = ref(null)
const isEditing = ref(false)

const linkedCemeteryId = ref(null)

const editManager = ref({
    name: '',
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

async function saveManager() {
    try {
        const nameParts = editManager.value.name.trim().split(' ')

        const first_name = nameParts.shift() || ''
        const last_name = nameParts.pop() || ''
        const infix = nameParts.join(' ') || null

        const userId = Number(
            cemeteryManager.value?.user_id ||
            cemeteryManager.value?.id
        )

        console.log('Manager object:', cemeteryManager.value)
        console.log('Gebruikte ID:', userId)

        if (!userId) {
            console.error('Geen geldige ID gevonden')
            return
        }

        await axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
            first_name,
            infix,
            last_name,
            email: editManager.value.email,
            phone_number: editManager.value.phone_number
        })

        cemeteryManager.value = {
            ...cemeteryManager.value,
            first_name,
            infix,
            last_name,
            email: editManager.value.email,
            phone_number: editManager.value.phone_number
        }

        isEditing.value = false

        console.log('Opslaan gelukt')
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

            console.log('Alle beheerders:', managers)

            cemeteryManager.value = managers.find(manager =>
                managerFullName(manager).trim() === managerName.trim()
            )

            console.log('Gevonden beheerder:', cemeteryManager.value)

            if (cemeteryManager.value) {
                editManager.value = {
                    name: managerFullName(cemeteryManager.value),
                    email: cemeteryManager.value.email,
                    phone_number: cemeteryManager.value.phone_number
                }

                axios.get(`${import.meta.env.VITE_API_URL}/cemeteries`)
                    .then(res => {
                       
const linkedCemetery = res.data.cemeteries.find(cemetery =>
    cemetery.cemetery_managers?.some(manager =>
        Number(manager.user_id) === Number(cemeteryManager.value.user_id)
    )
)


                        linkedCemeteryId.value = linkedCemetery?.id || null

                        console.log('Linked cemetery:', linkedCemetery)
                    })
            }
        })
        .catch(error => {
            console.error('Fout bij ophalen beheerder:', error)
        })
})
</script>


<style scoped>
.bg-detail-card {
    background-color: #f8b18b;
}
</style>