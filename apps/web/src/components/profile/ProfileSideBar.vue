<template>
  <!-- Sidebar -->
    <v-col cols="12" lg="2" class="sidebar">
      <div class="h-100 d-flex flex-column justify-space-between">

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
            <v-list-item-title>Log uit <v-icon>mdi-door-open</v-icon></v-list-item-title>
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
  min-height: 100vh;
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
  font-size: 18px;
  font-weight: 700;
  color: #0d475a;
}

.activeLink .v-list-item-title {
  text-decoration: underline;
}

/* Hover state */
:deep(.v-list-item:hover) {
  background-color: rgba(190, 225, 224, 0.16); /* #bee1e0 */
}

/* Active (current route) */
:deep(.v-list-item--active) {
  background-color: rgba(190, 225, 224, 0.28);
}

/* Active + hover (slightly stronger) */
:deep(.v-list-item--active:hover) {
  background-color: rgba(190, 225, 224, 0.35);
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
  font-size: 18px;
}

/* ===== MOBILE ===== */
@media (max-width: 1144px) {
  .sidebar {
    width: 100%;
    min-height: auto;
    border-right: none;
    border-bottom: 2px solid #000;
    padding: 20px 16px;
  }

  .sidebar-link .v-list-item-title,
  .logout-link .v-list-item-title {
    font-size: 16px;
  }

}
</style>