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


      <v-card color="#f08360" class="py-6 profile-card">

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

              <v-btn color="#bee1e0" class="btn-text-color mb-4" v-ripple.center>
                Foto Uploaden
              </v-btn>

            </v-col>


            <v-col cols="12" md="8">
              <v-form v-model="valid">
                <v-container class="px-0 px-md-4">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="user.initials" :rules="nameRules" label="Voorletters"
                        required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="user.first_name" :rules="nameRules" label="Voornaam"
                        required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="user.infix" :rules="nameRules" label="Tussenvoegsel"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="user.last_name" :rules="nameRules" label="Achternaam"
                        required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-template v-if="user.role_name === 'rechthebbende'">
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="user.partner_infix" :rules="nameRules" label="Voorvoegsel partner"
                        required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="user.partner_last_name" :rules="nameRules" label="Achternaam partner"
                        required></v-text-field>
                    </v-col>
                  </v-row>
                  
                    <v-row>
                      <v-col cols="12">
                        <v-select v-model="user.name_usage" :items="nameUsageOptions" item-title="label"
                          item-value="value" label="Naamgebruik" required></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field :model-value="formatDateNl(user.date_of_birth)" label="Geboortedatum"
                          readonly></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field :model-value="user.place_of_birth" :rules="nameRules" label="Geboorteplaats"
                          readonly></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="user.street_name" :rules="adressRules" label="Straat"
                          required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <v-text-field v-model="user.house_number" :rules="adressRules" label="Huisnummer"
                          required></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field v-model="user.house_letter" :rules="adressRules" label="Letter"
                          required></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field v-model="user.house_number_addition" :rules="adressRules" label="Toevoeging"
                          required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="user.zip_code" :rules="zipcodeRules" label="Postcode"
                          required></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="user.city" :rules="cityRules" label="Woonplaats" required></v-text-field>
                      </v-col>
                    </v-row>
                  </v-template>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="user.email" :rules="emailRules" label="E-mailadres"
                        required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="user.phone_number" :rules="phoneRules"
                        label="Telefoonnummer"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="user.mobile_number" :rules="phoneRules"
                        label="Mobiel nummer"></v-text-field>
                    </v-col>
                  </v-row>
                  <template v-if="user.role_name !== 'rechthebbende'">
                   <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="user.position" :rules="nameRules"
                        label="Functie" :readonly="user.role_name !== 'admin'"></v-text-field>
                    </v-col>
                  </v-row>
                  </template>
                </v-container>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-4 px-md-8">
          <v-spacer />
          <v-btn color="#0d475a" variant="elevated" v-ripple.center @click="saveProfile">
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