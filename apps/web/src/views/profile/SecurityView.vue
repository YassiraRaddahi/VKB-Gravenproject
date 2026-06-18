<template>

  <v-container fluid>
    <v-row>
    
       <ProfileSideBar />
      <v-col cols="12" lg="10" class="py-6 pa-lg-6">

        <TitleUnderline title="Wachtwoord aanpassen" underline-class="underlineLightBlue" />

        <v-card color="#f08360" class="py-6 security-card">

          <v-card-text class="px-4 px-md-8">
            <FormAlert :message="formError" />

            <v-row>
              <v-col cols="12">
                <v-text-field v-model="currentPassword" :type="showCurrentPassword ? 'text' : 'password'"
                  label="Huidig wachtwoord" :append-inner-icon="showCurrentPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showCurrentPassword = !showCurrentPassword" @input="formError = ''"
                  @keyup.enter="save"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="newPassword" :type="showNewPassword ? 'text' : 'password'"
                  label="Nieuw wachtwoord" :append-inner-icon="showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showNewPassword = !showNewPassword" @input="formError = ''"
                  @keyup.enter="save"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                  label="Nieuw wachtwoord bevestigen"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword" @input="formError = ''"
                  @keyup.enter="save"></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="pa-4 px-md-8">
            <v-spacer />
            <v-btn class="bg-darkBlue" variant="elevated" v-ripple.center :loading="securityStore.loading"
              :disabled="!currentPassword || !newPassword || !confirmPassword || formError.length > 0" @click="save">
              Opslaan
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <Snackbar variant="tonal" color="success" class="snackbar-success" v-model="showSnackbar"
    message="Wachtwoord succesvol bijgewerkt!" timeout="4000" />
</template>

<script setup>

import ProfileSideBar from '@/components/profile/ProfileSideBar.vue'
import TitleUnderline from '@/components/ui/TitleUnderline.vue';
import FormAlert from '@/components/ui/FormAlert.vue';
import Snackbar from '@/components/ui/Snackbar.vue';

import { ref } from 'vue'
import { useSecurityStore } from '@/stores/securityStore'

const securityStore = useSecurityStore()

const formError = ref('')

const currentPassword = ref('')
const showCurrentPassword = ref(false)

const newPassword = ref('')
const showNewPassword = ref(false)

const confirmPassword = ref('')
const showConfirmPassword = ref(false)

const showSnackbar = ref(false)


async function save() {
  formError.value = ''

  if (newPassword.value.length < 6) {
    formError.value = 'Nieuw wachtwoord moet minimaal 6 tekens zijn'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    formError.value = 'Wachtwoorden komen niet overeen'
    return
  }

  // De API verifieert het huidige wachtwoord met bcrypt en slaat een nieuwe hash op
  const success = await securityStore.changePassword(currentPassword.value, newPassword.value)

  if (!success) {
    formError.value = securityStore.error
    return
  }

  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  showSnackbar.value = true
}

</script>

<style scoped>
/* ===== PROFILE CONTENT ===== */

.security-card {
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

  .security-card {
    max-width: 100%;
    width: 100%;
    margin: 0;
    border-radius: 0px;
  }

}
</style>