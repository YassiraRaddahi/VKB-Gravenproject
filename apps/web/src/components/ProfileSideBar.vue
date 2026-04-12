<template>
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
          <v-list-item class="logout-link" @click="userStore.logout()">
            <v-list-item-title>Log uit</v-list-item-title>
          </v-list-item>
        </div>

      </div>
    </v-col>

</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()

</script>

<style scoped>
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

}
</style>