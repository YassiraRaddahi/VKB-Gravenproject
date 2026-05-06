<template>
    <v-navigation-drawer expand-on-hover permanent rail>
        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home" title="Homepagina" value="homepage"  :to="{ name: 'Home' }"></v-list-item>
            <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard" :to="{ name: 'Dashboard' }"></v-list-item>
            <v-list-item prepend-icon="mdi-cross" title="Kerkhoven" value="cemeteries" :to="{ name: 'Cemeteries' }"></v-list-item>
            <v-list-item prepend-icon="mdi-account-multiple" title="Beheerders" value="cemetery_managers" :to="{ name: 'CemeteryManagers' }"></v-list-item>
            <v-list-item prepend-icon="mdi-format-list-numbered" title="Top 10 SEO" value="top_ten_seo" :to="{ name: 'TopTenSEO' }"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
</script>

<style scoped>

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

/* List item titles */
:deep(.v-list-item-title) {
  color: #0d475a;
  font-size: 0.95rem;
  font-weight: 500;

}

/* Icons */
:deep(.v-list-item__prepend .v-icon) {
  color: #ea5a0b;
  font-size: 28px;
}


:deep(.v-list-item) {
  padding: 4.667px;
}



@media (max-width: 1144px) {
}

</style>