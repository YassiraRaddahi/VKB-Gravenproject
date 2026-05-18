<template>
  <TitleUnderline title="Profielgegevens" underline-class="underlineLightBlue" />


  <v-row>
    <ProfileSideBar />

    <!-- Card -->
    <v-col cols="12" lg="10" class="py-6 pa-lg-6">

      <v-row class="badge-container" v-if="userStore.hasPermission('user.view.role')">
        <v-col class="d-flex justify-end mb-2">
          <v-chip data-testid="role-name" color="#feca00" class="px-4 py-2 btn-text-color" size="large" variant="flat">
            U bent een {{ user.role_name }}
          </v-chip>
        </v-col>
      </v-row>


      <v-card color="#f08360" class="py-6 profile-card">

        <v-card-text class="px-0 px-md-4">
          <v-row :key="$route.fullPath">

            <v-col cols="12" md="4" class="d-flex flex-column align-center ga-4"
              v-if="userStore.hasPermission('user.view.profile_picture')">
              <v-avatar :size="mdAndUp ? 200 : 150">
                <!-- Profile picture or fallback icon -->
                <v-img data-testid="profile-picture-url" v-if="user.profile_picture_url" :src="user.profile_picture_url"
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

                <v-btn data-testid="profile-picture-upload-btn"
                  v-if="userStore.hasPermission('user.edit.profile_picture')" icon size="large" elevation="6"
                  color="#16495d" class="avatar-btn position-absolute" @click="selectFile">
                  <v-icon color="white">
                    mdi-camera
                  </v-icon>
                </v-btn>

                <!-- HIDDEN INPUT -->
                <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="handleFileUpload" />
              </v-avatar>

              <!-- <v-file-upload-item v-model='file' accept="image/*" @change="upload"></v-file-upload-item> -->
            </v-col>

            <v-col cols="12" md="8">
              <v-form v-model="valid">
                <v-container class="px-0 px-md-4">
                  <v-row v-if="userStore.hasPermission('user.view.name')">
                    <v-col cols="12">
                      <v-text-field data-testid="initials" v-model="user.initials" :rules="nameRules"
                        label="Voorletters" :readonly="!userStore.hasPermission('user.edit.name')"
                        :required="userStore.hasPermission('user.edit.name')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.name')">
                    <v-col cols="12">
                      <v-text-field data-testid="first-name" v-model="user.first_name" :rules="nameRules"
                        label="Voornaam" :readonly="!userStore.hasPermission('user.edit.name')"
                        :required="userStore.hasPermission('user.edit.name')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.name')">
                    <v-col cols="12">
                      <v-text-field data-testid="infix" v-model="user.infix" :rules="nameRules" label="Tussenvoegsel"
                        :readonly="!userStore.hasPermission('user.edit.name')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.name')">
                    <v-col cols="12">
                      <v-text-field data-testid="last-name" v-model="user.last_name" :rules="nameRules"
                        label="Achternaam" :readonly="!userStore.hasPermission('user.edit.name')"
                        :required="userStore.hasPermission('user.edit.name')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.partner_name')">
                    <v-col cols="12">
                      <v-text-field data-testid="partner-infix" v-model="user.partner_infix" :rules="nameRules"
                        label="Voorvoegsel partner" :readonly="!userStore.hasPermission('user.edit.partner_name')"
                        :required="userStore.hasPermission('user.edit.partner_name')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.partner_name')">
                    <v-col cols="12">
                      <v-text-field data-testid="partner-last-name" v-model="user.partner_last_name" :rules="nameRules"
                        label="Achternaam partner" :readonly="!userStore.hasPermission('user.edit.partner_name')"
                        :required="userStore.hasPermission('user.edit.partner_name')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.name_usage')">
                    <v-col cols="12">
                      <v-select data-testid="name-usage" v-model="user.name_usage" :items="nameUsageOptions"
                        item-title="label" item-value="value" label="Naamgebruik"
                        :readonly="!userStore.hasPermission('user.edit.name_usage')"
                        :required="userStore.hasPermission('user.edit.name_usage')"></v-select>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.date_of_birth')">
                    <v-col cols="12">
                      <v-text-field data-testid="date-of-birth" :model-value="formatDateNl(user.date_of_birth)"
                        label="Geboortedatum" :readonly="!userStore.hasPermission('user.edit.date_of_birth')"
                        :required="userStore.hasPermission('user.edit.date_of_birth')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.place_of_birth')">
                    <v-col cols="12">
                      <v-text-field data-testid="place-of-birth" :model-value="user.place_of_birth" :rules="nameRules"
                        label="Geboorteplaats" :readonly="!userStore.hasPermission('user.edit.place_of_birth')"
                        :required="userStore.hasPermission('user.edit.place_of_birth')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.address')">
                    <v-col cols="12">
                      <v-text-field data-testid="street-name" v-model="user.street_name" :rules="addressRules"
                        label="Straat" :readonly="!userStore.hasPermission('user.edit.address')"
                        :required="userStore.hasPermission('user.edit.address')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.address')">
                    <v-col cols="4">
                      <v-text-field data-testid="house-number" v-model="user.house_number" :rules="addressRules"
                        label="Huisnummer" :readonly="!userStore.hasPermission('user.edit.address')"
                        :required="userStore.hasPermission('user.edit.address')"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field data-testid="house-letter" v-model="user.house_letter" :rules="addressRules"
                        label="Letter" :readonly="!userStore.hasPermission('user.edit.address')"
                        :required="userStore.hasPermission('user.edit.address')"></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field data-testid="house-number-addition" v-model="user.house_number_addition"
                        :rules="addressRules" label="Toevoeging"
                        :readonly="!userStore.hasPermission('user.edit.address')"
                        :required="userStore.hasPermission('user.edit.address')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.address')">
                    <v-col cols="12">
                      <v-text-field data-testid="zip-code" v-model="user.zip_code" :rules="zipcodeRules"
                        label="Postcode" :readonly="!userStore.hasPermission('user.edit.address')"
                        :required="userStore.hasPermission('user.edit.address')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.address')">
                    <v-col cols="12">
                      <v-text-field data-testid="city" v-model="user.city" :rules="cityRules" label="Woonplaats"
                        :readonly="!userStore.hasPermission('user.edit.address')"
                        :required="userStore.hasPermission('user.edit.address')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.contact')">
                    <v-col cols="12">
                      <v-text-field data-testid="email" v-model="user.email" :rules="emailRules" label="E-mailadres"
                        :readonly="!userStore.hasPermission('user.edit.contact')"
                        :required="userStore.hasPermission('user.edit.contact')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.contact')">
                    <v-col cols="12">
                      <v-text-field data-testid="phone-number" v-model="user.phone_number" :rules="phoneRules"
                        label="Telefoonnummer" :readonly="!userStore.hasPermission('user.edit.contact')"
                        :required="userStore.hasPermission('user.edit.contact')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.contact')">
                    <v-col cols="12">
                      <v-text-field data-testid="mobile-number" v-model="user.mobile_number" :rules="phoneRules"
                        label="Mobiel nummer" :readonly="!userStore.hasPermission('user.edit.contact')"
                        :required="userStore.hasPermission('user.edit.contact')"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="userStore.hasPermission('user.view.position')">
                    <v-col cols="12">
                      <v-text-field data-testid="position" v-model="user.position" :rules="nameRules" label="Functie"
                        :readonly="!userStore.hasPermission('user.edit.position')"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-4 px-md-8">
          <v-spacer />
          <v-btn data-testid="save-button" color="#0d475a" variant="elevated" v-ripple.center @click="saveProfile">
            Opslaan
          </v-btn>

          <SnackbarSuccess variant="tonal" color="success" class="snackbar-success" v-model="showSnackbar"
            message="Profiel succesvol bijgewerkt!" timeout="2000" />
        </v-card-actions>

      </v-card>
    </v-col>
  </v-row>

</template>


<script setup>
import ProfileSideBar from '@/components/ProfileSideBar.vue'
import SnackbarSuccess from '@/components/SnackBarSuccess.vue'
import TitleUnderline from '../components/TitleUnderline.vue'

import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { mdAndUp } = useDisplay()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const nameUsageOptions = [

  { label: 'Eigennaam', value: 'eigennaam' },
  { label: 'Partnernaam', value: 'partnernaam' },
  { label: 'Eigennaam en dan partnernaam', value: 'eigennaam_partnernaam' },
  { label: 'Partnernaam en dan eigennaam', value: 'partnernaam_eigennaam' }

]

function formatDateNl(date) {
  if (!date) return ''
  let d = new Date(date)
  return d.toLocaleDateString('nl-NL')
}

const userFullName = () => {
  return [
    user.value.first_name,
    user.value.infix,
    user.value.last_name
  ]
    .filter(Boolean)
    .join(' ')
}

const fileInput = ref(null)

const selectFile = () => {
  fileInput.value.click()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]

  if (!file) {
    return
  }

  // preview maken
  const imageUrl = URL.createObjectURL(file)

  // user updaten zodat v-img meteen verandert
  user.value.profile_picture_url = imageUrl

  // Hier zou je de upload logica implementeren, bijvoorbeeld een API call om het bestand te uploaden
  console.log('Geselecteerd bestand:', file)

}

const valid = ref(true)

const showSnackbar = ref(false)

const saveProfile = () => {
  if (!valid.value) {
    return
  }

  showSnackbar.value = true
}

</script>

<style scoped>
/* ===== PROFILE CONTENT ===== */

.avatar-btn {
  opacity: 0;
  transition: 'opacity 0.2s, transform 0.2s';
  transform: scale(0.8);
}

.v-avatar:hover .avatar-btn {
  opacity: 0.9;
  transform: scale(1);
}



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

.btn-text-color {
  color: #0d475a;
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