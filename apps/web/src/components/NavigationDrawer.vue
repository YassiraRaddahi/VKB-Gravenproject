<template>
  <v-navigation-drawer expand-on-hover permanent rail width="256">
    <v-list nav>
      <v-list-item class="menu-title-section" prepend-icon="mdi-menu-close" title="Menu" :subtitle="toUpperCaseFirstLetter(user?.role_name)"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list class="navigation-list" density="compact" nav>
      <v-list-item prepend-icon="mdi-home" title="Homepagina" value="homepage" :to="{ name: 'Home' }"></v-list-item>
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"
        :to="{ name: 'Dashboard' }"></v-list-item>
      <v-list-item prepend-icon="mdi-cross" title="Kerkhoven" value="cemeteries"
        :to="{ name: 'Cemeteries' }"></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Beheerders" value="cemetery_managers"
        :to="{ name: 'CemeteryManagers' }"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useUserStore} from '@/stores/userStore';
import { storeToRefs } from 'pinia'

const userStore = useUserStore();
const { user } = storeToRefs(userStore)

function toUpperCaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

</script>

<style scoped>
/* Hover state */
:deep(.navigation-list .v-list-item:hover) {
  background-color: rgba(190, 225, 224, 0.16);
  /* #bee1e0 */
}

/* Active (current route) */
:deep(.navigation-list .v-list-item--active) {
  background-color: rgba(190, 225, 224, 0.28);
}

/* Active + hover (slightly stronger) */
:deep(.navigation-list .v-list-item--active:hover) {
  background-color: rgba(190, 225, 224, 0.35);
}


/* List item titles */
:deep(.v-list-item-title) {
  color: #0d475a;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.5;
}

:deep(.menu-title-section .v-list-item-title) {
  color: #f08360;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.5;
}

:deep(.menu-title-section .v-list-item-subtitle) {
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.4;
}



/* Icons */
:deep(.v-list-item__prepend .v-icon) {
  color: #ea5a0b;
  font-size: 28px;
}


:deep(.v-list-item) {
  padding: 4.667px;
}



@media (max-width: 1144px) {}
</style>