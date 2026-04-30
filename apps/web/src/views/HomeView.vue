<template>
  <div class="d-flex justify-center mt-10 mb-20">
            <h1 class="titleLightBlue">
                Kerkhovenbeheer Nederland
            </h1>
        </div>

        <div>
            <p class="home-text mx-auto text-center">
                Ruim 400 protestantse kerkgemeenten beheren al eeuwenlang eigen begraafplaatsen en kerkhoven.
                Het beheer hiervan is door toenemende regelgeving en krimpende vrijwilligersgroepen steeds complexer geworden.
                Kerkhovenbeheer Nederland biedt kerkelijke gemeenten een overzichtelijke digitale omgeving om
                begraafplaatsen, graven en beheerders centraal te registreren en beheren.
                Zo wordt het administratieve werk vereenvoudigd, blijft informatie up-to-date en kunnen gemeenten
                voldoen aan de geldende wet- en regelgeving.
                Samen zorgen we ervoor dat deze waardevolle stukken cultuurhistorisch erfgoed goed beheerd en bewaard blijven.
            </p>
        </div>
       
        <div id="carousel" :key="$route.fullPath">
            <v-container class="carousel-container mt-20">
                <v-carousel height="400px" cycle interval="2500" show-arrows="hover" hide-delimiter-background>
                    <v-carousel-item
                    v-for="(slide, i) in slides"
                    :key="i"
                    >
                        <v-img :src="slide.src" :alt="slide.alt" :key="slide.src + '-' + $route.fullPath" cover height="100%" class="rounded-xl"></v-img>
                    </v-carousel-item>
                </v-carousel>
            </v-container>
        </div>
</template>

<script setup>
const slides = [
  { src: '/images/cemeteries/bergklooster.png', alt: 'Begraafplaats Bergklooster' },
  { src: '/images/cemeteries/het_heilige_kruis.png', alt: 'Begraafplaats Het Heilige Kruis' },
  { src: '/images/cemeteries/kranenburg.webp', alt: 'Begraafplaats Kranenburg' },
  { src: '/images/cemeteries/meppelerstraatweg.png', alt: 'Begraafplaats Meppelerstraatweg' },
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
  width:40px;
  height:40px;
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