<template>
  <v-app-bar flat color="transparent" class="header-bar">
    <v-container fluid class="pa-0">
      <v-row align="center" justify="space-between" class="w-100">
        <v-col cols="12" md="auto">
          <v-row class="d-flex flex-wrap" align="center" justify="center" no-gutters>
            <!-- <v-col cols="auto">
              <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
            </v-col>
            <v-col cols="auto">
              <router-link to="/begraafplaatsen" class="nav-link">Begraafplaatsen</router-link>
            </v-col>
            <v-col cols="auto">
              <router-link to="/beheerders" class="nav-link">Beheerders</router-link>
            </v-col> -->
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup>
// logica, imports, props, reactive state
</script>

<style scoped>
.header-bar {
  padding-left: 0;
  padding-right: 0;
  margin-bottom: 16px;
}

.nav-link {
  display: inline-block;
  margin: 0 12px;
  color: #1e4c6f;
  font-weight: 600;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>