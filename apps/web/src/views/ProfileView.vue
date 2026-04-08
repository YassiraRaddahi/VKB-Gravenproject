<template>
  <div class="d-flex justify-center mb-20">
    <h2 class="title">
      Profielgegevens
    </h2>
  </div>


<!--   <v-container fluid class="pa-0">
    <v-row no-gutters>
      <!-- Sidebar -->
<v-col cols="auto" class="sidebar">
  <div class="sidebar-inner d-flex flex-column justify-space-between">
    
    <!-- Boven -->
    <div>
     <v-list bg-color="transparent" class="pa-0">
  <v-list-item
    class="sidebar-link"
    :class="{ activeLink: $route.path === '/profiel' }"
    to="/profiel"
    link
  >
    <v-list-item-title>Gegevens</v-list-item-title>
  </v-list-item>

  <v-list-item
    class="sidebar-link"
    :class="{ activeLink: $route.path === '/profiel/beveiliging' }"
    to="/profiel/beveiliging"
    link
  >
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
      <!-- Content -->
      <v-col cols="12" md="9" class="pa-4">

        <v-card class="profile-card" color="#f08360">
          <v-card-text>
            <v-form v-model="valid">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="user.first_name"
                      :counter="10"
                      :rules="nameRules"
                      label="Voornaam"
                      required
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="user.last_name"
                      :counter="10"
                      :rules="nameRules"
                      label="Achternaam"
                      required
                    />
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="user.email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn color="#0d475a" variant="flat">
              Opslaan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-card color="#f08360" class="pa-6 rounded-xl"> -->
    
    <v-card-text>
      <v-row align="start" no-gutters>

        <v-col cols="12" md="4" class="d-flex flex-column align-center justify-center ga-4">
          <v-avatar size="200">
            <!-- Profile picture or fallback icon -->
            <v-img v-if="user.profile_picture_url" :src="user.profile_picture_url" alt="profielfoto" cover>
              <template #error>
                <v-icon color="#0d475a" size="200">
                  mdi-account
                </v-icon>
              </template>
            </v-img>

            <v-icon v-else color="#0d475a" size="200">
              mdi-account
            </v-icon>
          </v-avatar>

          <v-btn color="#bee1e0" class="btn-text-color" v-ripple.center>
            Foto Uploaden
          </v-btn>
        </v-col>


        <v-col cols="12" md="8">
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="user.first_name" :rules="nameRules" label="Voornaam"
                  required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="user.last_name" :rules="nameRules" label="Achternaam"
                  required></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="user.email" :rules="emailRules" label="E-mail" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn color="#0d475a" variant="elevated" v-ripple.center>
        Opslaan
      </v-btn>
    </v-card-actions>

  </v-card>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const activeTab = ref('gegevens')

const user = ref({})


const url = 'http://localhost:3001/api/login'

onMounted(() => {
  axios.post(url, {
    email: 'j.kempenaar@kerkrentmeester.nl',
    password: 'test123'

    // email: 'liza2511liza@gmail.com',
    // password: 'test123'

  })
    .then(response => {
      console.log(response)
      user.value = response.data.user
    })
    .catch(error => {
      console.error("Fout bij ophalen gebruikersgegevens:", error)
    })
}

)

</script>

<style scoped>
/* ===== PROFILE CONTENT ===== */
.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  width: 100%;
}

.content-wrapper .v-card {
  max-width: 900px;
  width: 100%;
  border-radius: 30px;
  padding: 20px;
  box-sizing: border-box;
}

.profile-card {
  max-width: 900px;
  width: 100%;
  margin: 20px auto;
  border-radius: 10px;
  box-sizing: border-box;
}

.v-text-field {
  margin-bottom: 20px;
}

/* ===== SIDEBAR ===== */
.sidebar {
  width: 220px;
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
@media (max-width: 960px) {
  .sidebar {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 2px solid #000;
    padding: 20px 16px;
  }

  .sidebar-link .v-list-item-title,
  .logout-link .v-list-item-title {
    font-size: 18px;
  }

  .content-wrapper {
    padding: 16px;
    padding-top: 20px;
    justify-content: flex-start;
  }

  .content-wrapper .v-card {
    max-width: 100%;
    border-radius: 20px;
    padding: 16px;
  }

  .profile-card {
    max-width: 100%;
    width: 100%;
    margin: 0;
    border-radius: 20px;
  }
}
.btn-text-color {
  color: #0d475a;
}
</style>