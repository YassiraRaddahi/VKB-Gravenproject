<template>
    <v-container fluid class="pa-0">

        <TitleUnderline title="Personenbeheer" underline-class="underlineLightBlue" />


        <v-container fluid class="pa-4">
            <v-row class="d-flex justify-center gap-6">

                <v-col v-for="item in dashboardItems" :key="item.title" cols="12" md="4" class="d-flex justify-center">
                    <Subdashboard :title="item.title" :icon="item.icon" :route-name="item.routeName"
                        :params="item.params" />
                </v-col>

            </v-row>
        </v-container>

    </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import Subdashboard from '@/components/Subdashboard.vue'
import TitleUnderline from '@/components/ui/TitleUnderline.vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const dashboardItems = computed(() => {

    if (user.value.role_name === 'beheerder') {
        return [
            {
                title: 'Overledenen',
                icon: 'mdi-account',
                routeName: 'UserManagementByRole',
                params: { role: 'overledenen' },
            },
            {
                title: 'Rechthebbenden',
                icon: 'mdi-account-group',
                routeName: 'UserManagementByRole',
                params: { role: 'rechthebbenden' },
            },
            {
                title: 'Grafonderhouders',
                icon: 'mdi-account-hard-hat',
                routeName: 'UserManagementByRole',
                params: { role: 'grafonderhouders' },
            }
        ]
    }

    return []
})

function goToDashboard(routeName) {
    router.push({ name: routeName })
}
</script>
<style scoped></style>