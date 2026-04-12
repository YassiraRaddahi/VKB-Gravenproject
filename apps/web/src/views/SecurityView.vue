<template>
  <div class="d-flex justify-center mb-20">
    <h2 class="titleLightBlue">
      Wachtwoord aanpassen
    </h2>
  </div>
  
    <v-row>
      <ProfileSideBar />

    </v-row>
</template>

<script setup>
import ProfileSideBar from '@/components/ProfileSideBar.vue'

</script>

<style scoped>
/* ===== PROFILE CONTENT ===== */

.profile-card {
   max-width: 900px;
  width: 100%;
  margin: 20px auto;
  border-radius: 10px;
  box-sizing: border-box;
}

.btn-text-color {
  color: #0d475a;
}




/* ===== MOBILE ===== */
 @media (max-width: 1144px) {
 
  .profile-card {
    max-width: 100%;
    width: 100%;
    margin: 0;
    border-radius: 20px;
  }

} 
</style>