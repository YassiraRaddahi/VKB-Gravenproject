<template>
  <v-app-bar app class="px-6" :key="$route.fullPath">

    <!-- left side -->

    <v-btn :to="{ name: user?.id ? 'Dashboard' : 'Home' }" class="pa-0 no-active" min-width="0" height="auto">
      <img :src="logoUrl" :key="logoUrl + '-' + $route.fullPath" alt="logo" height="70" />
    </v-btn>

    <v-spacer />


    <!-- right side -->
    <v-spacer />

    <v-btn variant="text" color="darkBlue" class="mr-2" @click="seoDialog = true">
      <v-icon start>mdi-magnify</v-icon>
      SEO
    </v-btn>

    <v-dialog v-model="seoDialog" max-width="400" transition="scale-transition">
      <v-card class="pa-2 rounded-xl">
        <v-card-title class="font-weight-bold pt-4 px-6">SEO-optimalisaties</v-card-title>
        <v-card-text class="px-6">
          Wil je bekijken welke SEO-optimalisaties er op deze site zijn toegepast en waarom ze belangrijk zijn?
        </v-card-text>
        <v-card-actions class="px-6 pb-4">
          <v-btn variant="text" @click="seoDialog = false">Annuleren</v-btn>
          <v-spacer />
          <v-btn color="darkBlue" variant="elevated" :to="{ name: 'Seo' }" @click="seoDialog = false">
            Bekijken
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <template v-if="user?.id ? false : true">
      <v-tooltip text="Inloggen op uw account" location="bottom">
        <template #activator="{ props }">
          <v-btn v-bind="props" :to="{ name: 'Login' }" color="#ea5a0b" class="text-decoration-none" v-ripple.center variant="elevated">
            <span class="text-white">Log In</span>
          </v-btn>
        </template>
      </v-tooltip>
    </template>

    <template v-else>
      <ContactDialog />

      <v-btn :to="{ name: 'Profile' }" color="#0d475a" class="text-decoration-none" v-ripple.center>
        <div class="d-flex align-center ga-2">
          <!-- Profile picture or fallback icon -->
          <v-avatar size="30">
            <v-img v-if="user.profile_picture_url" :src="user.profile_picture_url" :key="user.profile_picture_url + '-' + $route.fullPath" alt="profielfoto" cover>
              <template #error>
                <v-icon color="#0d475a" size="30">
                  mdi-account
                </v-icon>
              </template>
            </v-img>

            <v-icon v-else color="#0d475a" size="32">
              mdi-account
            </v-icon>
          </v-avatar>

          <span class="user-name d-none d-sm-block">
            {{ user.first_name }} {{ user.last_name }}
          </span>
        </div>
      </v-btn>
    </template>
  </v-app-bar>
</template>


<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import ContactDialog from '@/components/ContactDialog.vue'

const seoDialog = ref(false)

const logoUrl = '/images/logo/VKB_Logo.svg'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)


</script>

<style scoped>
.user-name {
  font-weight: 500;
  color: #0d475a;
}

.no-active {
  color: transparent !important;
}
</style>