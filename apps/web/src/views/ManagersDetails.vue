<template> 

      <TitleUnderline 
     :title="`Beheerder details van ${managerId}`"
     underline-class="underlineLightBlue"
    />
<v-container>
<v-row class="manager-container">
    <div class="manager-details">
        
    </div>
</v-row>
</v-container>
</template>

<script setup>
import TitleUnderline from '@/components/TitleUnderline.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const managerId = route.params.user_id

const managerFullName = (cemeteryManager) => {
  return [
    cemeteryManager.first_name,
    cemeteryManager.infix,
    cemeteryManager.last_name
  ]
    .join(' ')
}
</script>

<style scoped>

</style>