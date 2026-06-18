<template>
  <v-app-bar app class="px-6">

    <!-- left side -->

    <v-app-bar-nav-icon v-if="showDrawerToggle" @click="$emit('toggle-drawer')" />

    <v-btn :to="{ name: user?.id ? 'Dashboard' : 'Home' }" class="pa-0 no-active" min-width="0" height="auto">
      <img :src="logoUrl" :key="logoUrl" alt="Logo VKB met kerken in frisse kleuren die deels buiten een kader vallen"
        height="70" />
    </v-btn>

    <v-spacer />


    <!-- right side -->
    <v-spacer />

    <template v-if="!user?.id">
      <AppButton kind="darkOrange" :to="{ name: 'Login' }" class="text-decoration-none">
        Log In
      </AppButton>
    </template>

    <template v-else>
      <ContactDialog />

      <v-btn :to="{ name: 'Profile' }" color="#0d475a" class="text-decoration-none" v-ripple.center>
        <div class="d-flex align-center ga-2">
          <!-- Profile picture or fallback icon -->
          <v-avatar size="30">
            <v-img v-if="user?.id && user.profile_picture_url" :src="profilePictureUrl" 
              :key="user.profile_picture_url" :alt="`Profielfoto van ingelogde gebruiker ${userFullName()}`" cover>
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
            {{ userFullName() }}
          </span>
        </div>
      </v-btn>
    </template>
  </v-app-bar>
</template>


<script setup>
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import ContactDialog from '@/components/ContactDialog.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

defineProps({
  showDrawerToggle: {
    type: Boolean,
    default: false
  }
})

const logoUrl = '/images/logo/VKB_Logo.svg'

const profilePictureUrl = computed(() => {
  return user.value?.profile_picture_url
    ? `${import.meta.env.VITE_API_URL}/${user.value.profile_picture_url}`
    : null
})

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const route = useRoute()

const userFullName = () => {
  return [
    user.value.first_names.trim().split(/\s+/)[0] || '', // Gebruik alleen de eerste voornaam
    user.value.infix,
    user.value.last_name
  ]
    .filter(Boolean)
    .join(' ')
}

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