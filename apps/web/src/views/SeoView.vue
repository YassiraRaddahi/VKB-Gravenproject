<template>
  <div class="d-flex justify-center mb-10">
    <h1 class="titleLightBlue">SEO - Top 10</h1>
  </div>

  <v-container>
    <v-row>
      <v-col v-for="(item, index) in seoItems" :key="index" cols="12" md="6">
        <v-card class="pa-4 h-100" variant="outlined">
          <v-card-title class="text-darkBlue font-weight-bold">
            {{ index + 1 }}. {{ item.title }}
          </v-card-title>
          <v-card-text>{{ item.description }}</v-card-text>
          <v-chip class="ma-2" :color="item.applied ? 'darkBlue' : 'grey'" variant="flat" size="small">
            <span class="text-white">{{ item.applied ? 'Toegepast' : 'Niet toegepast' }}</span>
          </v-chip>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const seoItems = [
  {
    title: 'Content-kwaliteit en relevantie',
    description: 'De allerbelangrijkste factor. Zonder goede, unieke en relevante content helpt al het andere weinig. Google\'s hele algoritme is erop gericht het beste antwoord op een zoekopdracht te vinden.',
    applied: true,
  },
  {
    title: 'Title tag per pagina',
    description: 'Het sterkste on-page signaal. Google gebruikt de titel om te bepalen waar een pagina over gaat, en hij wordt direct getoond in de zoekresultaten. Uniek per pagina via afterEach-hook in de router.',
    applied: true,
  },
  {
    title: 'Mobielvriendelijk / responsive design',
    description: 'Google gebruikt mobile-first indexing: de mobiele versie van je site bepaalt je ranking. Een niet-responsive site valt direct hard terug in de resultaten. Vuetify zorgt voor volledig responsive layout.',
    applied: true,
  },
  {
    title: 'Laadsnelheid (Core Web Vitals)',
    description: 'Bevestigde rankingfactor sinds 2021. LCP, CLS en INP worden gemeten. Trage sites verliezen niet alleen rankings, maar ook bezoekers. Toegepast via lazy-loaded routes.',
    applied: true,
  },
  {
    title: 'HTTPS (SSL-certificaat)',
    description: 'Bevestigde rankingfactor. Zonder HTTPS waarschuwt Chrome bezoekers, wat de bounce rate omhoog schiet. De live site draait op HTTPS via Antagonist.',
    applied: true,
  },
  {
    title: 'Heading-structuur (één <h1> per pagina)',
    description: 'Sterk inhoudssignaal. Google gebruikt headings om de hiërarchie en het hoofdonderwerp van de pagina te begrijpen. Alle views hebben precies één <h1>.',
    applied: true,
  },
  {
    title: 'Meta description per pagina',
    description: 'Geen directe rankingfactor, maar beïnvloedt de click-through rate (CTR) sterk. Hoge CTR\'s verhogen indirect je ranking. Dynamisch bijgewerkt via de router.',
    applied: true,
  },
  {
    title: 'Alt-teksten op afbeeldingen',
    description: 'Belangrijk voor Google Afbeeldingen-zoekresultaten en voor toegankelijkheid. Levert extra organisch verkeer op via image search. Alle v-img-componenten hebben beschrijvende alt-teksten.',
    applied: true,
  },
  {
    title: 'Semantische HTML5-structuur',
    description: 'Helpt Google de structuur van de pagina te begrijpen. Indirecte maar consistente winst door gebruik van correcte HTML-elementen.',
    applied: false,
  },
  {
    title: 'Taalinstelling (lang-attribuut)',
    description: 'Zorgt dat de site verschijnt bij Nederlandstalige zoekopdrachten en niet verkeerd wordt geclassificeerd. lang="nl" ingesteld in index.html.',
    applied: true,
  },
]
</script>
