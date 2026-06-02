<template>
  <v-app>
    <v-layout>
      <Header :show-drawer-toggle="showDrawerToggle" @toggle-drawer="drawer = !drawer" />

      <v-main class="d-flex flex-column">
        <v-container class="d-flex flex-grow-1 flex-column pa-0 pt-10" fluid>

          <div class="flex-grow-1">

            <template v-if="$route.meta.showBreadcrumbs">
              <div>
                <Breadcrumbs />
              </div>
            </template>

            <template v-if="showNavigationDrawer">
              <div>
                <NavigationDrawer v-model="drawer" :permanent="mdAndUp" :temporary="!mdAndUp" />
              </div>
            </template>

            <router-view />
          </div>

          <Footer />
        </v-container>

      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import Breadcrumbs from './components/layout/Breadcrumbs.vue'
import NavigationDrawer from './components/layout/NavigationDrawer.vue'

import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useUserStore } from '@/stores/userStore'
import { useHead } from '@vueuse/head'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()


let tokenCheck = null
onMounted(() => {
  tokenCheck = setInterval(async () => {
    if (!userStore.user) return
    try {
      await userStore.fetchUser()
    } catch {
      userStore.user = null
      userStore.permissions = []
      router.push('/login')
    }
  }, 60000)
})
onUnmounted(() => clearInterval(tokenCheck))


const { mdAndUp } = useDisplay()
const drawer = ref(false)


watch(mdAndUp, (value) => {
  if (value) {
    drawer.value = true
  }
}, { immediate: true }
)



const showNavigationDrawer = computed(() => route.meta?.showNavigationDrawer && userStore.user)

const showDrawerToggle = computed(() =>
  showNavigationDrawer.value && !mdAndUp.value
)



const title = computed(() =>
  route.meta?.title || 'Kerkhovenbeheer Nederland'
)

const description = computed(() =>
  route.meta?.description ||
  'Kerkhovenbeheer Nederland is een automatiseringsysteem voor beheer van kerkhoven en graven.'
)

useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description
    }
  ]
})


</script>