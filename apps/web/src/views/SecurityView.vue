<template>
  <div class="d-flex justify-center mb-20">
    <h1 class="titleLightBlue">
      Wachtwoord aanpassen
    </h1>
  </div>

  <v-row>
    <ProfileSideBar />

    <v-col cols="12" lg="10" class="py-6 pa-lg-6">
      <v-card color="#f08360" class="py-6 profile-card">

        <v-card-text class="px-4 px-md-8">
          <v-alert v-if="formError" type="error" class="mb-4">{{ formError }}</v-alert>

          <v-row>
            <v-col cols="12">
              <v-text-field v-model="currentPassword" label="Huidig wachtwoord" type="password"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="newPassword" label="Nieuw wachtwoord" type="password"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="confirmPassword" label="Nieuw wachtwoord bevestigen"
                type="password"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-4 px-md-8">
          <v-spacer />
          <v-btn class="bg-darkBlue" variant="elevated" v-ripple.center
            :disabled="!currentPassword || !newPassword || !confirmPassword" @click="save">
            Opslaan
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-col>
  </v-row>

  <SnackBar v-model="snackbar" message="Wachtwoord succesvol gewijzigd" />
</template>

<script setup>
import { ref } from 'vue'
import ProfileSideBar from '@/components/ProfileSideBar.vue'
import SnackBar from '@/components/SnackBar.vue'

const snackbar = ref(false)
const formError = ref('')
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

function save() {
  if (newPassword.value.length < 6) {
    formError.value = 'Nieuw wachtwoord moet minimaal 6 tekens zijn'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    formError.value = 'Wachtwoorden komen niet overeen'
    return
  }
  formError.value = ''
  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  snackbar.value = true
}
</script>

<style scoped>
.profile-card {
  max-width: 900px;
  width: 100%;
  margin: 20px auto;
  border-radius: 10px;
  box-sizing: border-box;
}

@media (max-width: 1144px) {
  .profile-card {
    max-width: 100%;
    border-radius: 0px;
  }
}
</style>
