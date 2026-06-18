<template>
    <v-dialog v-model="dialog" max-width="500" transition="scale-transition">
        <template #activator="{ props }">
            <v-btn v-bind="props" color="darkBlue" variant="text" v-ripple.center class="mr-0 mr-sm-2 pr-0 pr-sm-4">
                <v-icon start>mdi-email-outline</v-icon>
                <span class="d-none d-sm-block">Contact</span>
            </v-btn>
        </template>

        <v-card class="pa-2 rounded-xl">
            <v-card-title class="text-h6 font-weight-bold pt-4 px-6">
                Contact opnemen
            </v-card-title>

            <v-card-subtitle class="px-6 pb-2">
                Stuur een bericht naar de kerkhovenbeheer uitgevers.
            </v-card-subtitle>

            <v-card-text class="px-6">
                <v-textarea v-model="message" label="Uw bericht" rows="5" auto-grow :rules="messageRules" counter="500"
                    maxlength="500" variant="outlined"></v-textarea>
            </v-card-text>

            <v-card-actions class="px-6 pb-4">
                <v-btn variant="text" @click="close">Annuleren</v-btn>
                <v-spacer />
                <v-btn :loading="loading" color="darkBlue" variant="elevated" :disabled="!message.trim()" @click="send">
                    Versturen
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const dialog = ref(false)
const message = ref('')
const loading = ref(false)

const messageRules = [
    v => !!v.trim() || 'Bericht is verplicht',
    v => v.length <= 500 || 'Maximaal 500 tekens',
]

function close() {
    dialog.value = false
    message.value = ''
}

async function send() {

    loading.value = true

    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/contact`, {
             message: message.value,
             email: user.value.email
            })
        
        close()
    } catch (error) {
        console.error('Fout bij versturen contactbericht:', error)
    } finally {
        loading.value = false
    }
}
</script>