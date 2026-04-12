<template>
  <div class="d-flex justify-center mb-20">
    <h2 class="titleLightBlue">
      Profielgegevens
    </h2>
  </div>


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
                <v-img v-if="user.profile_picture_url" :src="user.profile_picture_url" :key="user.profile_picture_url + '-' + $route.fullPath" alt="profielfoto" cover>
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
                  <v-row v-if="user.role_name === 'rechthebbende'">
                    <v-col cols="12">
                      <v-text-field v-model="user.address" :rules="adressRules" label="Adres" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="user.role_name === 'rechthebbende'">
                    <v-col cols="12">
                      <v-text-field v-model="user.zip_code" :rules="zipcodeRules" label="Postcode"
                        required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="user.role_name === 'rechthebbende'">
                    <v-col cols="12">
                      <v-text-field v-model="user.city" :rules="cityRules" label="Woonplaats" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="user.phone_number" :rules="phoneRules"
                        label="Telefoonnummer"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-4 px-md-8">
          <v-spacer />
          <v-btn color="#0d475a" variant="elevated" v-ripple.center>
            Opslaan
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-col>
  </v-row>

</template>


<script setup>
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import ProfileSideBar from '@/components/ProfileSideBar.vue'

const { mdAndUp } = useDisplay()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)


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