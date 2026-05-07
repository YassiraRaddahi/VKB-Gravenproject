<template>
  <v-container class="pa-6">
  <Breadcrumbs :items="[
    { text: 'Dashboard', to: { name: 'Dashboard' } },
    { text: 'SEO & Optimalisatie', to: { name: 'SEO' } }
  ]" />
    <!-- Titel -->
    <v-row>
      <v-col cols="12" class="text-center mb-10">
        <h2 class="titleLightBlue">
          SEO & Optimalisatie
        </h2>
      </v-col>
    </v-row>

    <!-- Intro -->
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <p class="mb-6">
          SEO (Search Engine Optimization) gaat over het verbeteren van de
          vindbaarheid en gebruiksvriendelijkheid van een website.
          In dit project is SEO toegepast binnen een frontend‑only webapplicatie
          voor het beheren van begraafplaatsen.
        </p>

        <p class="mb-6">
          De focus ligt op een duidelijke structuur, logische navigatie
          en een goede gebruikerservaring.
        </p>

        <v-divider class="my-6" />

        <!-- Top 10 -->
        <h3 class="mb-4">
          Top 10 SEO‑onderdelen in deze website
        </h3>

        <v-list density="comfortable">
          <v-list-item
            v-for="(item, index) in seoTop10"
            :key="index"
            class="mb-3"
          >
            <v-list-item-title>
              <strong>{{ index + 1 }}. {{ item.title }}</strong>
            </v-list-item-title>

            <v-list-item-subtitle class="mt-1">
              {{ item.description }}
            </v-list-item-subtitle>

            <v-list-item-subtitle class="mt-1 text-grey-darken-1">
              <em>Voorbeeld:</em> {{ item.example }}
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <v-divider class="my-8" />

        <!-- Conclusie -->
        <h3 class="mb-4">
          Conclusie
        </h3>

        <v-alert type="success" variant="tonal">
          Door deze SEO‑onderdelen toe te passen is de website overzichtelijk,
          makkelijk te gebruiken en goed leesbaar op verschillende apparaten.
          Dit past bij de eisen van het keuzedeel Frontend Development.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
import Breadcrumbs from '@/components/Breadcrumbs.vue'

/* Top 10 SEO */
const seoTop10 = [
  {
    title: 'Duidelijke titels',
    description: 'Elke pagina heeft een duidelijke titel.',
    example: 'De titel laat zien wat je op de pagina kunt doen.'
  },
  {
    title: 'Logische menu en pagina’s',
    description: 'De website heeft een duidelijk menu.',
    example: 'Dashboard → Begraafplaatsen → Graven'
  },
  {
    title: 'Website werkt op mobiel en computer',
    description: 'De website werkt goed op alle schermen.',
    example: 'Dit is gemaakt met Vuetify.'
  },
  {
    title: 'Duidelijke hoofdtitel op elke pagina',
    description: 'Elke pagina begint met een grote titel.',
    example: 'De titel beschrijft de inhoud van de pagina.'
  },
  {
    title: 'Teksten passen bij het onderwerp',
    description: 'De teksten zijn relevant.',
    example: 'Begraafplaatsen, graven en beheerders.'
  },
  {
    title: 'Afbeeldingen hebben beschrijving',
    description: 'Afbeeldingen hebben een alt‑tekst.',
    example: 'Zo is de afbeelding beter te begrijpen.'
  },
  {
    title: 'Website is snel en rustig',
    description: 'De website laadt snel.',
    example: 'Geen zware animaties.'
  },
  {
    title: 'Gebruiker kan makkelijk klikken',
    description: 'De website is makkelijk te gebruiken.',
    example: 'Gebruik van cards, knoppen en dialogs.'
  },
  {
    title: 'Mooie en duidelijke layout',
    description: 'De layout is overal hetzelfde.',
    example: 'Dit maakt de website rustig.'
  },
  {
    title: 'Website is makkelijk te lezen',
    description: 'De tekst is goed leesbaar.',
    example: 'Duidelijke tekst en iconen.'
  }
]

</script>
<style scoped>
.v-list-item-title {
  font-size: 1.2rem;
}
</style>