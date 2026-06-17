<template>


  <v-container fluid>
    <v-row>
      <ProfileSideBar />

      <!-- Card -->
      <v-col cols="12" lg="10" class="py-6 pa-lg-6">

        <TitleUnderline title="Profielgegevens" underline-class="underlineLightBlue" />

        <v-row class="badge-container" v-if="userStore.hasPermission('user.view.role')">
          <v-col class="d-flex justify-end mb-2">
            <v-chip data-testid="role-name" color="#feca00" class="px-4 py-2 btn-text-color" size="large"
              variant="flat">
              U bent een {{ user.role_name }}
            </v-chip>
          </v-col>
        </v-row>


        <FormCard embedded bg-color="orange" padding="py-6" class="profile-card">

          <v-card-text class="px-4 px-md-8">
            <v-row>

              <v-col cols="12" md="4" class="d-flex flex-column align-center ga-4"
                v-if="userStore.hasPermission('user.view.profile_picture')">

                <v-sheet class="position-relative bg-transparent">
                  <v-avatar :size="mdAndUp ? 200 : 150">
                    <!-- Profile picture or fallback icon -->
                    <v-img data-testid="profile-picture-url" v-if="displayImage"
                      :src="displayImage" :key="user.profile_picture_url + '-' + $route.fullPath"
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

                    <!-- HIDDEN INPUT -->
                    <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="handleFileUpload" />
                  </v-avatar>

                  <AppButton data-testid="profile-picture-upload-btn"
                    v-if="userStore.hasPermission('user.edit.profile_picture')" icon size="large"
                    class="avatar-btn position-absolute" @click="selectFile">
                    <v-icon color="white">
                      mdi-camera
                    </v-icon>
                  </AppButton>
                </v-sheet>
              </v-col>

              <v-col cols="12" md="8">
                <v-form v-model="valid">
                  <v-container class="px-0 px-md-4">
                    <v-row v-if="userStore.hasPermission('user.view.name')">
                      <v-col cols="12">
                        <AppInput data-testid="initials" v-model="user.initials" :rules="initialsRules"
                          label="Voorletters" :readonly="!userStore.hasPermission('user.edit.name')"
                          :required="userStore.hasPermission('user.edit.name')" />
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.name')">
                      <v-col cols="12">
                        <AppInput data-testid="first-names" v-model="user.first_names" :rules="firstNamesRules"
                          label="Voornamen" :readonly="!userStore.hasPermission('user.edit.name')"
                          :required="userStore.hasPermission('user.edit.name')" />
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.name')">
                      <v-col cols="12">
                        <AppInput data-testid="infix" v-model="user.infix" :rules="infixRules" label="Tussenvoegsel"
                          :readonly="!userStore.hasPermission('user.edit.name')"
                          :required="userStore.hasPermission('user.edit.name')" />
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.name')">
                      <v-col cols="12">
                        <AppInput data-testid="last-name" v-model="user.last_name" :rules="lastNameRules"
                          label="Achternaam" :readonly="!userStore.hasPermission('user.edit.name')"
                          :required="userStore.hasPermission('user.edit.name')" />
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.partner_name')">
                      <v-col cols="12">
                        <AppInput data-testid="partner-infix" v-model="user.partner_infix" :rules="infixRules"
                          label="Voorvoegsel partner" :readonly="!userStore.hasPermission('user.edit.partner_name')"
                          :required="userStore.hasPermission('user.edit.partner_name')" />
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.partner_name')">
                      <v-col cols="12">
                        <AppInput data-testid="partner-last-name" v-model="user.partner_last_name"
                          :rules="lastNamePartnerRules" label="Achternaam partner"
                          :readonly="!userStore.hasPermission('user.edit.partner_name')"
                          :required="userStore.hasPermission('user.edit.partner_name')" />
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
                    <v-row v-if="userStore.hasPermission('user.view.gender')">
                      <v-col cols="12">
                        <v-select data-testid="gender" v-model="user.gender" :items="genderOptions" item-title="label"
                          item-value="value" label="Geslacht" :readonly="!userStore.hasPermission('user.edit.gender')"
                          :required="userStore.hasPermission('user.edit.gender')"></v-select>
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.date_of_birth')">
                      <v-col cols="12">
                        <AppInput data-testid="date-of-birth" :model-value="formatDateNl(user.date_of_birth)"
                          label="Geboortedatum" :readonly="!userStore.hasPermission('user.edit.date_of_birth')"
                          :required="userStore.hasPermission('user.edit.date_of_birth')" />
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.place_of_birth')">
                      <v-col cols="12">
                        <AppInput data-testid="place-of-birth" :model-value="user.place_of_birth" label="Geboorteplaats"
                          :readonly="!userStore.hasPermission('user.edit.place_of_birth')"
                          :required="userStore.hasPermission('user.edit.place_of_birth')" />
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.address')">
                      <v-col cols="12">
                        <AppInput data-testid="street-name" v-model="user.street_name" :rules="streetNameRules"
                          label="Straat" :readonly="!userStore.hasPermission('user.edit.address')"
                          :required="userStore.hasPermission('user.edit.address')" />
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.address')">
                      <v-col cols="4">
                        <AppInput data-testid="house-number" v-model="user.house_number" :rules="houseNumberRules"
                          label="Huisnummer" :readonly="!userStore.hasPermission('user.edit.address')"
                          :required="userStore.hasPermission('user.edit.address')" />
                      </v-col>
                      <v-col cols="4">
                        <AppInput data-testid="house-letter" v-model="user.house_letter" :rules="houseLetterRules"
                          label="Letter" :readonly="!userStore.hasPermission('user.edit.address')"
                          :required="userStore.hasPermission('user.edit.address')" />
                      </v-col>
                      <v-col cols="4">
                        <AppInput data-testid="house-number-addition" v-model="user.house_number_addition"
                          :rules="houseNumberAdditionRules" label="Toevoeging"
                          :readonly="!userStore.hasPermission('user.edit.address')"
                          :required="userStore.hasPermission('user.edit.address')" />
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.address')">
                      <v-col cols="12">
                        <AppInput data-testid="zip-code" v-model="user.zip_code" :rules="zipcodeRules" label="Postcode"
                          :readonly="!userStore.hasPermission('user.edit.address')"
                          :required="userStore.hasPermission('user.edit.address')" />
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.address')">
                      <v-col cols="12">
                        <AppInput data-testid="city" v-model="user.city" :rules="cityRules" label="Woonplaats"
                          :readonly="!userStore.hasPermission('user.edit.address')"
                          :required="userStore.hasPermission('user.edit.address')" />
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.contact')">
                      <v-col cols="12">
                        <AppInput data-testid="email" v-model="user.email" :rules="emailRules" label="E-mailadres"
                          :readonly="!userStore.hasPermission('user.edit.contact')"
                          :required="userStore.hasPermission('user.edit.contact')" />
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.contact')">
                      <v-col cols="12">
                        <AppInput data-testid="phone-number" v-model="user.phone_number" :rules="phoneRules"
                          label="Telefoonnummer" :readonly="!userStore.hasPermission('user.edit.contact')"
                          :required="userStore.hasPermission('user.edit.contact')" />
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.contact')">
                      <v-col cols="12">
                        <AppInput data-testid="mobile-number" v-model="user.mobile_number" :rules="phoneRules"
                          label="Mobiel nummer" :readonly="!userStore.hasPermission('user.edit.contact')"
                          :required="userStore.hasPermission('user.edit.contact')" />
                      </v-col>
                    </v-row>
                    <v-row v-if="userStore.hasPermission('user.view.position')">
                      <v-col cols="12">
                        <AppInput data-testid="position" v-model="user.position" :rules="positionRules" label="Functie"
                          :readonly="!userStore.hasPermission('user.edit.position')" />
                      </v-col>
                    </v-row>

                  </v-container>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="pa-4 px-md-8">
            <v-spacer />
            <AppButton v-if="canEdit" data-testid="save-button" kind="darkBlue" v-ripple.center :disabled="!valid"
              :loading="loadingProfileSave" @click="saveProfile">
              Opslaan
            </AppButton>


          </v-card-actions>

        </FormCard>
      </v-col>
    </v-row>
  </v-container>
  <Snackbar data-testid="snackbar-success" variant="tonal" color="success" class="snackbar-success"
    v-model="showSnackbarSuccess" message="Profiel succesvol bijgewerkt!" :timeout="4000" />
  <Snackbar data-testid="snackbar-failure" variant="tonal" color="error" class="snackbar-failure"
    v-model="showSnackbarFailure" message="Er is een fout opgetreden tijdens het bijwerken van het profiel."
    :timeout="4000" />
</template>


<script setup>
import ProfileSideBar from '@/components/profile/ProfileSideBar.vue'
import Snackbar from '@/components/ui/Snackbar.vue'
import TitleUnderline from '@/components/ui/TitleUnderline.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import FormCard from '@/components/ui/FormCard.vue'

import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { DisplaySymbol } from 'vuetify/lib/composables/display.mjs'

const { mdAndUp } = useDisplay()

const userStore = useUserStore()
const { user, permissions } = storeToRefs(userStore)

const initialsRules = [
  v => !!v || 'Dit veld is verplicht',
  v => (v && /^([A-ZÀ-ÖØ-Þ]\.\s?)+$/.test(v)) || 'Voorletters moeten in hoofdletters zijn en eindigen met een punt (bijv. J.D.)',
  v => (v && v.length <= 10) || 'Maximaal 10 tekens toegestaan'
]

const firstNamesRules = [
  v => !!v || 'Dit veld is verplicht',
  v => (v && /^[a-zA-ZÀ-ÖØ-öø-ÿ'\s-]+$/.test(v)) || 'Ongeldige voornamen',
  v => (v && v.length <= 255) || 'Maximaal 255 tekens toegestaan'
]

const infixRules = [
  v => (!v || /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]*$/.test(v)) || 'Ongeldig tussenvoegsel',
  v => (!v || v.length <= 20) || 'Maximaal 20 tekens toegestaan'
]

const lastNameRules = [
  v => !!v || 'Dit veld is verplicht',
  v => (v && /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/.test(v)) || 'Ongeldige achternaam',
  v => (v && v.length <= 100) || 'Maximaal 100 tekens toegestaan'
]

const lastNamePartnerRules = [
  v => (!v || /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/.test(v)) || 'Ongeldige achternaam partner',
  v => (!v || v.length <= 100) || 'Maximaal 100 tekens toegestaan'
]

const streetNameRules = [
  v => !!v || 'Dit veld is verplicht',
  v => (v && /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/.test(v)) || 'Ongeldige straatnaam',
  v => (v && v.length <= 100) || 'Maximaal 100 tekens toegestaan'
]

const houseNumberRules = [
  v => !!v || 'Dit veld is verplicht',
  v => (v && /^[0-9]+$/.test(v)) || 'Ongeldig huisnummer',
  v => (v && v.length <= 10) || 'Maximaal 10 cijfers toegestaan'
]

const houseLetterRules = [
  v => (!v || /^[a-zA-Z]?$/.test(v)) || 'Ongeldige huisletter',
  v => (!v || v.length <= 4) || 'Maximaal 4 tekens toegestaan'
]

const houseNumberAdditionRules = [
  v => (!v || /^[a-zA-Z0-9\s-]*$/.test(v)) || 'Ongeldige toevoeging',
  v => (!v || v.length <= 10) || 'Maximaal 10 tekens toegestaan'
]

const zipcodeRules = [
  v => !!v || 'Dit veld is verplicht',
  v => (v && /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/i.test(v)) || 'Ongeldige postcode'
]

const cityRules = [
  v => !!v || 'Dit veld is verplicht',
  v => (v && /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/.test(v)) || 'Ongeldige woonplaats',
  v => (v && v.length <= 100) || 'Maximaal 100 tekens toegestaan'
]
const emailRules = [
  v => !!v || 'Dit veld is verplicht',
  v => (v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) || 'Ongeldig e-mailadres'
]

const phoneRules = [
  v => !!v || 'Dit veld is verplicht',
  v => (v && /^[0-9+\s()-]{8,15}$/.test(v)) || 'Ongeldig telefoonnummer'
]

const positionRules = [
  v => !!v || 'Dit veld is verplicht',
  v => (v && /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/.test(v)) || 'Ongeldige functie',
  v => (v && v.length <= 100) || 'Maximaal 100 tekens toegestaan'
]

function normalizeInputs() {
  if (user.value.zip_code) {
    user.value.zip_code = user.value.zip_code
      .toUpperCase()
      .replace(/\s+/g, '')
      .replace(/^(\d{4})([A-Z]{2})$/, '$1 $2')

  }

  if (user.value.initials) {
    user.value.initials = user.value.initials
      .replace(/\s+/g, '')
      .toUpperCase()
  }
}

const nameUsageOptions = [

  { label: 'Eigennaam', value: 'eigennaam' },
  { label: 'Partnernaam', value: 'partnernaam' },
  { label: 'Eigennaam en dan partnernaam', value: 'eigennaam_partnernaam' },
  { label: 'Partnernaam en dan eigennaam', value: 'partnernaam_eigennaam' }

]

const genderOptions = [
  { label: 'Man', value: 'man' },
  { label: 'Vrouw', value: 'vrouw' },
  { label: 'Anders', value: 'anders' },
  { label: 'Onbekend', value: 'onbekend' }
]

function formatDateNl(date) {
  if (!date) return ''
  let d = new Date(date)
  return d.toLocaleDateString('nl-NL')
}

const userFullName = () => {
  return [
    user.value.first_names,
    user.value.infix,
    user.value.last_name
  ]
    .filter(Boolean)
    .join(' ')
}

function getInitials(firstNames) {
  if (!firstNames) return ''
  return firstNames
    .split(' ')
    .filter(name => name.length > 0)
    .map(name => name.charAt(0).toUpperCase() + '.')
    .join('')
}

watch(() => user.value?.first_names, (newFirstNames, oldFirstNames) => {
  if (!user.value) return
  const oldInitials = getInitials(oldFirstNames || '')
  if (!user.value.initials || user.value.initials === oldInitials) {
    user.value.initials = getInitials(newFirstNames)
  }
}, { immediate: true })

const fileInput = ref(null)

const selectFile = () => {
  fileInput.value.click()
}

const selectedFile = ref(null)
const previewUrl = ref(null)

const displayImage = computed(() => {
 return previewUrl.value || `${import.meta.env.VITE_API_URL}/${user.value.profile_picture_url}` || null
})

const handleFileUpload = (event) => {
  const file = event.target.files[0]

  if (!file) {
    return
  }

  if (!file.type.startsWith('image/')) {
    alert('Ongeldig bestandstype. Selecteer een afbeelding.')
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    alert('Maximaal 2MB toegestaan')
    return
  }

  selectedFile.value = file

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
  }

  // preview maken
  previewUrl.value = URL.createObjectURL(file)

  console.log('Geselecteerd bestand:', file)

}

const canEdit = computed(() => {
  return permissions.value.some(p => p.startsWith('user.edit.'))
})

const valid = ref(true)

const showSnackbarSuccess = ref(false)
const showSnackbarFailure = ref(false)


const loadingProfileSave = ref(false)

const saveProfile = async () => {
  if (!valid.value) {
    showSnackbarFailure.value = true
    return
  }

  normalizeInputs()
  loadingProfileSave.value = true

  try {

    await userStore.updateUserProfile(user.value)

    if (selectedFile.value) {
      const formData = new FormData()
      formData.append('profile_picture', selectedFile.value)


      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/profile-picture`,
        formData,
        { withCredentials: true }
      );

      user.value.profile_picture_url = response.data.profile_picture_url

      if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value)
        previewUrl.value = null
      }
    }

    showSnackbarSuccess.value = true

  }
  catch (error) {
    console.error('Fout bij het opslaan van profiel:', error)
    showSnackbarFailure.value = true
    return
  }
  finally {
    loadingProfileSave.value = false
    selectedFile.value = null
  }


}

</script>

<style scoped>
/* ===== PROFILE CONTENT ===== */

.avatar-btn {
  right: 0;
  bottom: 0;
  transform: scale(0.8);
  transition: transform 0.2s;

}

.v-sheet:hover .avatar-btn {
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