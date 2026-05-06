<template>
  <TitleUnderline 
    title="Kerkhovenbeheer Nederland" 
    underline-class="underlineOrange"
    />
  
  <div class="home-text mx-auto text-center px-7">
    <p>
      Welkom op de homepagina van Kerkhovenbeheer Nederland van de Vereniging Kerkrentmeesterlijk Beheer.
      Wij zijn een organisatie die zich onder andere inzet voor het vereenvoudigen en uniformeren van het
      kerkhovenbeheer in Nederland.
      Ons systeem is ontworpen om kerkhoven efficiënt te beheren en te onderhouden, met functies als grafbeheer en
      -onderhoud en het beheer van beheerders, rechthebbenden en overledenen.
      We streven ernaar om het beheren van kerkhoven eenvoudiger en effectiever te maken voor onze leden.
      Wij hebben daarom dit krachtige en gebruiksvriendelijk automatiseringsysteem op de markt gebracht waarmee
      kerkhoven efficiënt kunnen worden beheerd.
    </p>

    <p class="mt-6">
      Vragen omtrent ons systeem of onze diensten? Neem gerust contact met ons op via de <a
        href="https://www.kerkrentmeester.nl/contact/" target="_blank" rel="noopener noreferrer"
        class="anchor-decoration">contactpagina van de VKB</a>.
      We hopen dat u hier alles vindt wat u zoekt en dat we u kunnen helpen bij het beheren van uw kerkhoven.
    </p>
  </div>

  <div id="carousel" :key="$route.fullPath">
    <v-container class="carousel-container mt-20 px-7">
      <v-carousel height="400px" cycle interval="2500" show-arrows="hover" hide-delimiter-background class="mx-auto">
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-img :src="slide.src" :alt="`Impressiefoto van aangesloten kerkhof ${slide.name}`"
            :key="slide.src + '-' + $route.fullPath" cover height="100%" class="rounded-xl"></v-img>
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </div>
</template>

<script setup>
import TitleUnderline from '@/components/TitleUnderline.vue'

const slides = [
  { src: '/images/cemeteries/bergklooster.png', name: 'Bergklooster' },
  { src: '/images/cemeteries/het_heilige_kruis.png', name: 'Het Heilige Kruis' },
  { src: '/images/cemeteries/kranenburg.webp', name: 'Kranenburg' },
  { src: '/images/cemeteries/meppelerstraatweg.png', name: 'Meppelerstraatweg' },
]
</script>

<style scoped>
.home-text {
  max-width: 672px;
}

.carousel-container {
  max-width: 1152px;
}

.v-carousel {
  position: relative;
}

.v-carousel :deep(.v-btn--icon, .v-icon) {
  background-color: #bee1e0;
  width: 40px;
  height: 40px;
  font-size: 20px;
}

.v-carousel :deep(.v-btn--icon:hover) {
  background-color: #f08360;
}

.v-carousel :deep(img) {
  width: 100%;
  object-fit: cover;
}

.v-carousel :deep(.v-carousel__controls__item) {
  width: 20px;
  height: 20px;
}

.v-carousel :deep(.v-carousel__controls__item .v-icon) {
  display: none;
}

.v-carousel :deep(.v-window__prev),
.v-carousel :deep(.v-window__next) {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.v-image {
  height: max-content;
}

.v-carousel :deep(.v-window__prev) {
  left: 10px;
}

.v-carousel :deep(.v-window__next) {
  right: 10px;
}

@media (max-width: 600px) {
  .v-carousel {
    max-width: 95%;
  }

  .v-image {
    height: 250px;
  }

  .v-carousel :deep(.v-window__prev) {
    left: 12px;
  }

  .v-carousel :deep(.v-window__next) {
    right: 12px;
  }

  .v-carousel :deep(.v-btn--icon) {
    width: 32px;
    height: 32px;
  }

  .v-carousel :deep(.v-btn--icon .v-icon) {
    font-size: 16px;
  }

  .v-carousel :deep(.v-carousel__controls__item) {
    width: 15px;
    height: 15px;
  }
}
</style>