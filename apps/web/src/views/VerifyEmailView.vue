<template>
    <v-container fluid class="fill-height">
        <v-row align="center" justify="center" class="fill-height">
            <v-card class="pa-6" color="orange" :variant="variant" max-width="800" title="E-mailadres verificatie">
                <v-card-text class="pb-2">Bedankt voor het laten verifiëren van uw e-mailadres. Hieronder is de status
                    van uw
                    verificatie
                    te zien:
                </v-card-text>
                <v-card-text class="pt-0" color="primary">
                    <span v-if="status === 'verifying'">Bezig met verifiëren...</span>
                    <span v-else-if="status === 'success'">E-mailadres geverifieerd</span>
                    <span v-else-if="status === 'required'">Token is vereist</span>
                    <span v-else-if="status === 'invalid'">Ongeldige token</span>
                    <span v-else-if="status === 'expired'">Token is verlopen</span>
                    <span v-else-if="status === 'verification_error'">
                        Fout bij het verifiëren van het e-mailadres</span>
                    <span v-else>Er ging iets mis</span>
                </v-card-text>

            </v-card>
        </v-row>
    </v-container>
</template>


<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
import FormCard from '@/components/ui/FormCard.vue'
import { ref, onMounted } from 'vue'

const route = useRoute()
const token = route.query.token

const status = ref('verifying')

onMounted(async () => {
    if (!token) {
        status.value = 'required'
    } else {

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/users/verify-email`,
                {
                    params: {
                        token: token
                    }
                }

            );

            status.value = 'success'


        } catch (error) {

            if (error.response && error.response.status === 404) {
                status.value = 'invalid';
            } else if (error.response && error.response.status === 410) {
                status.value = 'expired';
            } else {
                status.value = 'verification_error';
            }

        }
    }

})
</script>

<style scoped></style>
