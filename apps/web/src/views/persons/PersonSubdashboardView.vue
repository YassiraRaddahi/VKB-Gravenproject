<template>
    <TitleUnderline :title="pageConfig.title" underline-class="underlineLightBlue" />

    <v-container fluid class="pa-4">
        <v-row class="d-flex justify-center gap-10">
            <v-col v-for="item in pageConfig.items" :key="item.title" cols="12" md="4" class="d-flex justify-center">
                <Subdashboard :title="item.title" :icon="item.icon" :route-name="item.routeName" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TitleUnderline from '../../components/ui/TitleUnderline.vue'
import Subdashboard from '@/components/Subdashboard.vue'

const route = useRoute()
const router = useRouter()


const pageConfig = computed(() => {
    switch (route.params.role) {
        case 'overledenen':
            return {
                title: 'Dashboard Overledenen',
                items: [
                    {
                        title: 'Beheer overledenen',
                        icon: 'mdi-account',
                        routeName: 'Deceased'
                    },
                    {
                        title: 'Koppel overledene aan graf',
                        icon: 'mdi-link',
                        routeName: 'LinkDeceasedToGrave'
                    },
                ]
            }

        case 'rechthebbenden':
            return {
                title: 'Dashboard Rechthebbenden',
                items: [
                    {
                        title: 'Beheer rechthebbenden',
                        icon: 'mdi-account-group',
                        routeName: 'RightsHolders'
                    },
                    {
                        title: 'Koppel rechthebbende aan graf',
                        icon: 'mdi-link',
                        routeName: 'LinkRightHolderToGrave'
                    },
                ]
            }

        case 'grafonderhouders':
            return {
                title: 'Dashboard Grafonderhouders',
                items: [
                    {
                        title: 'Beheer grafonderhouders',
                        icon: 'mdi-account-hard-hat',
                        routeName: 'GraveCaretakers'
                    },
                    {
                        title: 'Koppel grafonderhouder aan graf',
                        icon: 'mdi-link',
                        routeName: 'LinkGraveCaretakerToGrave'
                    },
                ]
            }
        default:
            return {
                title: 'Personenbeheer',
                items: []
            }
    }
})
</script>

<style scoped>

</style>