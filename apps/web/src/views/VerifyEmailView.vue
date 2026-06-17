<template>
    <v-container fluid>
        <v-row>
            
            <div v-if="status === 'verifying'">Bezig met verifiëren...</div>
            <div v-else-if="status === 'success'">E-mailadres geverifieerd</div>
            <div v-else-if="status === 'required'">Token is vereist</div>
            <div v-else-if="status === 'invalid'">Ongeldige token</div>
            <div v-else-if="status === 'expired'">Token is verlopen</div>
            <div v-else-if="status === 'verification_error'">Fout bij het verifiëren van het e-mailadres</div>
            <div v-else>Er ging iets mis</div>
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
