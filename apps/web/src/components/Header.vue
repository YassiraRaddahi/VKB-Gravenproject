<template>
  <v-app-bar app class="px-6">

    <!-- left side -->

    <v-btn :to="{ name: user?.id ? 'Dashboard' : 'Home' }" class="pa-0 no-active" min-width="0" height="auto">
      <img :src="logoUrl" :key="logoUrl" alt="logo" height="70" />
    </v-btn>

    <v-spacer />


    <!-- right side -->
    <v-spacer />

    <template v-if="user?.id ? false : true">
      <v-btn :to="{ name: 'Login' }" color="#ea5a0b" class="text-decoration-none" v-ripple.center variant="elevated">
        <span class="text-white">
          Log In
        </span>
      </v-btn>
    </template>

    <template v-else>
      <v-btn :to="{ name: 'Profile' }" color="#0d475a" class="text-decoration-none" v-ripple.center>
        <div class="d-flex align-center ga-2">
          <!-- Profile picture or fallback icon -->
          <v-avatar size="30">
            <v-img v-if="user.profile_picture_url" :src="user.profile_picture_url" :key="user.profile_picture_url" alt="profielfoto" cover>
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
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

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