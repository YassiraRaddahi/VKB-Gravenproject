<template>
  <TitleUnderline title="Profielgegevens" underline-class="underlineLightBlue" />


  <v-row>
    <ProfileSideBar />

    <!-- Card -->
    <v-col cols="12" lg="10" class="py-6 pa-lg-6">

      <v-row class="badge-container">
        <v-col class="d-flex justify-end mb-2">
          <v-chip color="#feca00" class="px-4 py-2 btn-text-color" size="large" variant="flat">
            U bent een {{ user.role_name }}
          </v-chip>
        </v-col>
      </v-row>


      <FormCard embedded bg-color="orange" padding="py-6" class="profile-card">

        <v-card-text class="px-0 px-md-4">
          <v-row :key="$route.fullPath">

            <v-col cols="12" md="4" class="d-flex flex-column align-center ga-4">
              <v-avatar :size="mdAndUp ? 200 : 150">
                <!-- Profile picture or fallback icon -->
                <v-img v-if="user.profile_picture_url" :src="user.profile_picture_url"
                  :key="user.profile_picture_url + '-' + $route.fullPath"
                  :alt="`Profielfoto van ingelogde gebruiker ${userFullName()}`" cover>
                  <template #error>
                    <v-icon color="#0d475a" :size="mdAndUp ? 200 : 150">
                      mdi-account
                    </v-icon>
                  </template>
                </v-img>

                <v-icon v-else color="#0d475a" :size="mdAndUp ? 200 : 150">
                  mdi-account
                </v-icon>
              </v-avatar>

              <!-- <v-file-upload-item v-model='file' accept="image/*" @change="upload"></v-file-upload-item> -->

              <AppButton kind="lightBlue" class="mb-4">
                Foto Uploaden
              </AppButton>

            </v-col>


            <v-col cols="12" md="8">
              <v-form v-model="valid" class="px-0 px-md-4">
                <AppInput v-model="user.first_name" :rules="nameRules" label="Voornaam" required class="mb-4" />
                <AppInput v-model="user.infix" :rules="nameRules" label="Tussenvoegsel" class="mb-4" />
                <AppInput v-model="user.last_name" :rules="nameRules" label="Achternaam" required class="mb-4" />

                <template v-if="user.role_name === 'rechthebbende'">
                  <AppInput v-model="user.address" :rules="adressRules" label="Adres" required class="mb-4" />
                  <AppInput v-model="user.zip_code" :rules="zipcodeRules" label="Postcode" required class="mb-4" />
                  <AppInput v-model="user.city" :rules="cityRules" label="Woonplaats" required class="mb-4" />
                </template>

                <AppInput v-model="user.email" :rules="emailRules" label="E-mailadres" required class="mb-4" />
                <AppInput v-model="user.phone_number" :rules="phoneRules" label="Telefoonnummer" />
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-4 px-md-8">
          <v-spacer />
          <AppButton kind="darkBlue" @click="saveProfile">
            Opslaan
          </AppButton>

          <SnackbarSuccess variant="tonal" color="success" class="snackbar-success" v-model="showSnackbar"
            message="Profiel succesvol bijgewerkt!" timeout="2000" />
        </v-card-actions>

      </FormCard>
    </v-col>
  </v-row>

</template>


<script setup>
import ProfileSideBar from '@/components/profile/ProfileSideBar.vue'
import SnackbarSuccess from '@/components/ui/SnackbarSuccess.vue'
import TitleUnderline from '@/components/ui/TitleUnderline.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import FormCard from '@/components/ui/FormCard.vue'

import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'


const { mdAndUp } = useDisplay()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const userFullName = () => {
  return [
    user.value.first_name,
    user.value.infix,
    user.value.last_name
  ]
    .filter(Boolean)
    .join(' ')
}

const showSnackbar = ref(false)

const saveProfile = () => {
  showSnackbar.value = true
}

</script>

<style scoped>
/* ===== PROFILE CONTENT ===== */

.badge-container {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}

.profile-card {
  max-width: 900px;
  width: 100%;
  margin: 20px auto;
  border-radius: 10px;
  box-sizing: border-box;
}

/* ===== MOBILE ===== */
@media (max-width: 1144px) {

  .profile-card {
    max-width: 100%;
    border-radius: 0px;
  }

  .badge-container {
    max-width: 100%;
    padding: 0 16px;
  }

}
</style>