<template>
  <div class="d-flex justify-center mb-20">
    <h2 class="title">
      Profielgegevens
    </h2>
  </div>


  <v-row>
    <!-- Sidebar -->
    <v-col cols="12" lg="2" class="sidebar">
      <div class="sidebar-inner d-flex flex-column justify-space-between">

        <!-- Boven -->
        <div>
          <v-list bg-color="transparent" class="pa-0">
            <v-list-item class="sidebar-link" :class="{ activeLink: $route.path === '/profiel' }" to="/profiel" link>
              <v-list-item-title>Gegevens</v-list-item-title>
            </v-list-item>

            <v-list-item class="sidebar-link" :class="{ activeLink: $route.path === '/profiel/beveiliging' }"
              to="/profiel/beveiliging" link>
              <v-list-item-title>Beveiliging</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>

        <!-- Onder -->
        <div class="logout-wrapper">
          <v-list-item class="logout-link" @click="logout">
            <v-list-item-title>Log uit</v-list-item-title>
          </v-list-item>
        </div>

      </div>
    </v-col>

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
          <v-row>

            <v-col cols="12" md="4" class="d-flex flex-column align-center ga-4">
              <v-avatar :size="mdAndUp ? 200 : 150">
                <!-- Profile picture or fallback icon -->
                <v-img v-if="user.profile_picture_url" :src="user.profile_picture_url" alt="profielfoto" cover>
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
                  <v-row v-if="user.role === 'rechthebbende'">
                    <v-col cols="12">
                      <v-text-field v-model="user.address" :rules="adressRules" label="Adres" required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="user.role === 'rechthebbende'">
                    <v-col cols="12">
                      <v-text-field v-model="user.zip_code" :rules="zipcodeRules" label="Postcode"
                        required></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="user.role === 'rechthebbende'">
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()

// const activeTab = ref('gegevens')

const user = ref({})

onMounted(() => {
  axios.get('http://localhost:3001/api/active-token', {
    withCredentials: true
  })
    .then(response => {
      console.log(response)
      user.value = response.data.user
    })
    .catch(error => {
      console.error("Fout bij ophalen gebruikersgegevens:", error)
    })
})


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


/* ===== SIDEBAR ===== */
.sidebar {
  width: 220px;
  max-width: 100%;
  min-height: 50vh;
  border-right: 2px solid #000;
  padding-top: 120px;
  padding-left: 30px;
  box-sizing: border-box;
}

.sidebar-link {
  min-height: 56px;
  padding-left: 0;
  cursor: pointer;
}

.sidebar-link .v-list-item-title {
  font-size: 20px;
  font-weight: 700;
  color: #0d475a;
}

.activeLink .v-list-item-title {
  text-decoration: underline;
}

.logout-wrapper {
  padding-bottom: 30px;
}

.logout-link {
  padding-left: 0;
  cursor: pointer;
}

.logout-link .v-list-item-title {
  color: #ff4d4d;
  font-size: 20px;
}

/* ===== MOBILE ===== */
@media (max-width: 1144px) {
  .sidebar {
    /* width: 100%; */
    min-height: auto;
    border-right: none;
    border-bottom: 2px solid #000;
    padding: 20px 16px;
  }

  .sidebar-link .v-list-item-title,
  .logout-link .v-list-item-title {
    font-size: 18px;
  }


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