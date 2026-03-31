<template>
  <div class="flex justify-center mt-10 mb-20">
            <h2 class="title">
                Nederlands Kerkhof
            </h2>
        </div>

        <div class="content">
            <p class="max-w-2xl mx-auto text-center">
                Donec augue justo, dapibus porttitor sem sit amet, elementum vestibulum leo. Phasellus eget justo in
                magna pulvinar dictum. Sed tempus sit amet ante eget pulvinar. Ut dictum diam nec quam mattis aliquam.
                Morbi et porttitor justo. Praesent nisi ante, faucibus eu dui et, sagittis posuere odio. Nulla euismod
                tellus finibus neque dictum volutpat. Cras vitae massa tincidunt, blandit nisi in, luctus ex. In hac
                habitasse platea dictumst. Etiam tempor dolor risus, vel tempor nulla auctor vel. Nunc tempor lectus sed
                fringilla lobortis.
                Aliquam convallis erat sed venenatis rutrum. Etiam sed quam dapibus, gravida tellus non, fringilla leo.
                Sed tempus commodo accumsan. Ut condimentum nisl ut sagittis finibus.
            </p>
        </div>
       
        <div id="carousel">
            <v-container class="max-w-6xl mx-auto mt-20">
                <v-carousel height="400px" cycle interval="2500" show-arrows="hover" hide-delimiter-background>
                    <v-carousel-item
                    v-for="(slide, i) in slides"
                    :key="i"
                    >
                        <v-img :src="slide.src" cover class=" rounded-xl"></v-img>
                    </v-carousel-item>
                </v-carousel>
            </v-container>
        </div>
        <div class="flex justify-center mt-20 mb-20">
            <button class="bg-orange-500 text-white px-8 py-4 rounded-full text-lg hover:bg-orange-600 transition"
                onclick="window.location.href='login.html'">
                Inloggen
            </button>
            
        </div>
              
</template>

<script setup>
const slides = [
  { src: '/images/cemeteries/bergklooster.png' },
  { src: '/images/cemeteries/het_heilige_kruis.png' },
  { src: '/images/cemeteries/kranenburg.webp' },
  { src: '/images/cemeteries/meppelerstraatweg.png' },
]
</script>

<style scoped>
.v-carousel :deep(.v-btn--icon) {
  background-color: #bee1e0; 
}
.v-carousel :deep(img) {
  width: 100%;
  object-fit: cover;
}
.v-carousel :deep(.v-window__prev),
.v-carousel :deep(.v-window__next) {
  width: auto;
    height: auto;
  
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

  .v-carousel :deep(.v-window__prev) {
    left: 12px;
  }

  .v-carousel :deep(.v-window__next) {
    right: 12px;
  }
}
</style>