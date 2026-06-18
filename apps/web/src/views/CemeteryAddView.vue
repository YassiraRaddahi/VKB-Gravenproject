<template>
    <v-container fluid class="pa-0 list-page-container">
        <TitleUnderline title="Kerkhof toevoegen" underline-class="underlineLightBlue" />

        <v-container fluid class="d-flex justify-center py-8">
            <v-card rounded="xl" elevation="5" color="#f1a07b" class="pa-6 w-100" max-width="900">
                <v-form @submit.prevent="addCemetery">
                    <v-container>

                        <div class="text-body-2 mb-4 text-white">
                            Velden gemarkeerd met <strong>*</strong> zijn verplicht.
                        </div>

                        <!-- FOTO -->
                        <v-row class="mb-4">
                            <v-col cols="12" class="d-flex justify-center">
                                <v-card rounded="xl" elevation="5" width="100%" max-width="260"
                                    class="position-relative overflow-hidden">
                                    <v-img :src="imagePreview || '/images/cemeteries/placeholder_image_camera.png'"
                                        height="260" cover />

                                    <v-btn icon size="large" elevation="6" color="#16495d" class="position-absolute"
                                        style="right: 12px; bottom: 12px;" @click="selectFile">
                                        <v-icon color="white">
                                            mdi-camera
                                        </v-icon>
                                    </v-btn>

                                    <input ref="fileInput" type="file" accept="image/*" class="d-none"
                                        @change="handleFileUpload" />
                                </v-card>
                            </v-col>
                        </v-row>

                        <!-- NAAM -->
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="form.name" :label="requiredLabel('Naam begraafplaats')"
                                    class="text-white" hide-details required />
                            </v-col>
                        </v-row>

                        <!-- ADRES -->
                        <v-row>
                            <v-col cols="12" md="4">
                                <v-text-field v-model="form.city" :label="requiredLabel('Stad')" class="text-white"
                                    hide-details required />
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="form.street_name" :label="requiredLabel('Straatnaam')"
                                    class="text-white" hide-details required />
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="form.house_number" label="Huisnummer" class="text-white"
                                    hide-details />
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="form.house_letter" label="Huisletter" class="text-white"
                                    hide-details />
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="form.zip_code" :label="requiredLabel('Postcode')"
                                    label="Postcode" class="text-white" hide-details required />
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field v-model="form.house_number_addition" label="Toevoeging" class="text-white"
                                    hide-details />
                            </v-col>
                        </v-row>

                        <!-- CONTACT -->
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="form.email" :label="requiredLabel('E-mail')" type="email"
                                    class="text-white" hide-details required />
                            </v-col>

                            <v-col cols="12">
                                <v-text-field v-model="form.phone_number" label="Telefoonnummer" class="text-white"
                                    hide-details />
                            </v-col>
                        </v-row>

                        <!-- WEBSITE -->
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="form.website_url" label="Website" class="text-white"
                                    hide-details />
                            </v-col>
                        </v-row>

                        <!-- OPMERKINGEN -->
                        <v-row>
                            <v-col cols="12">
                                <v-textarea v-model="form.remarks" label="Opmerkingen" class="text-white" auto-grow
                                    rows="5" hide-details />
                            </v-col>
                        </v-row>

                        <!-- BUTTONS -->
                        <v-row>
                            <v-col cols="12" class="d-flex justify-end ga-3 flex-wrap">
                                <v-btn color="#16495d" rounded="lg" @click="router.back()">
                                    Annuleren
                                </v-btn>

                                <v-btn type="submit" color="#023047" rounded="lg">
                                    Kerkhof toevoegen
                                </v-btn>
                            </v-col>
                        </v-row>

                    </v-container>
                </v-form>
            </v-card>
        </v-container>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TitleUnderline from '../components/ui/TitleUnderline.vue'
import axios from 'axios'

const router = useRouter()

const fileInput = ref(null)
const imagePreview = ref('')
const selectedImage = ref(null)

const form = ref({
    name: '',
    city: '',
    street_name: '',
    house_number: '',
    house_letter: '',
    house_number_addition: '',
    zip_code: '',
    email: '',
    phone_number: '',
    website_url: '',
    remarks: '',
    municipality_id: '',
})

const requiredLabel = (label) => `${label} *`

function selectFile() {
    fileInput.value?.click()
}

function handleFileUpload(event) {
    const file = event.target.files?.[0]

    if (!file) return

    selectedImage.value = file
    imagePreview.value = URL.createObjectURL(file)
}

async function addCemetery() {
    if (
        !form.value.name.trim() ||
        !form.value.email.trim() ||
        !form.value.zip_code.trim() ||
        !form.value.city.trim() ||
        !form.value.street_name.trim()
    ) {
        alert('Naam, E-mail, Postcode, Stad en Straatnaam zijn verplicht')
        return
    }

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/cemeteries/add`,
            {
                ...form.value,
                municipality_id: form.value.municipality_id || 1
            }
        )

        const cemeteryId = response.data.id

        if (selectedImage.value) {
            const reader = new FileReader()

            reader.onload = async () => {
                const base64 = reader.result.split(',')[1]

                await axios.post(
                    `${import.meta.env.VITE_API_URL}/cemeteries/${cemeteryId}/image`,
                    {
                        file_name: selectedImage.value.name,
                        data: base64
                    }
                )

                router.push('/kerkhoven')
            }

            reader.readAsDataURL(selectedImage.value)
        } else {
            router.push('/kerkhoven')
        }
    } catch (error) {
        console.error(error)
        alert(error.response?.data?.error || 'Kerkhof kon niet opgeslagen worden')
    }
}

</script>