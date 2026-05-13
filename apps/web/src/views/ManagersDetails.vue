<template> 

      <TitleUnderline 
     :title="`Beheerder details van ${managerId}`"
     underline-class="underlineLightBlue"
    />
<v-container>
<v-row class="manager-container">
    <div class="">
        
    </div>
</v-row>
</v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import TitleUnderline from '@/components/TitleUnderline.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const managerId = route.params.id

</script>

<style scoped>

</style>