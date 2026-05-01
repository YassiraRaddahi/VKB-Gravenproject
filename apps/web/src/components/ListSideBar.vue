<template>
   <v-navigation-drawer
    v-model="drawer"
    location="left"
    :temporary="mobile"
    :scrim="mobile"
    :width="mobile ? '100%' : 210"
  >
    <v-list>
      <v-list-item title="Menu" subtitle="Beheer"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav>
      <v-list-item
        prepend-icon="mdi-grave-stone"
        title="Begraafplaatsen"
        to="/begraafplaatsen"
        link
      />

      <v-list-item
        prepend-icon="mdi-account-group"
        title="Beheerders"
        to="/beheerders"
        link
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const drawer = defineModel()
</script>
