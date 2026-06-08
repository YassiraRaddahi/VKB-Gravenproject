<template>
    <v-container fluid class="pa-0 list-page-container">
        <TitleUnderline 
             :title="`Kerkhof toevoegen`"
            underline-class="underlineLightBlue"
        />
        <v-container fluid class="d-flex justify-center py-8">



        </v-container>
    </v-container>
</template> 


<script setup>  
import TitleUnderline from '../components/ui/TitleUnderline.vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();



</script>