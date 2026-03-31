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
        <div class="flex justify-center mt-20 mb-20">
            <!-- <h2 class="title fancy-title2 text-[#f08360]">
                Aangesloten begraafplaatsen
            </h2> -->
        </div>
        <div id="indicators-carousel" class="relative w-full" data-carousel="slide" data-carousel-interval="3000">

            <div class="relative h-60 w-2/4 mx-auto overflow-hidden rounded-lg">

                <div class="hidden duration-700 ease-in-out absolute inset-0" data-carousel-item="active">
                    <img src="/images/cemeteries/bergklooster.png"
                        class="w-full h-full object-cover object-center">
                </div>

                <div class="hidden duration-700 ease-in-out absolute inset-0" data-carousel-item>
                    <img src="/images/cemeteries/bergklooster.png">
                        class="w-full h-full object-cover object-center">
                </div>

                <div class="hidden duration-700 ease-in-out absolute inset-0" data-carousel-item>
                    <img src="/images/cemeteries/kranenburg.webp"
                        class="w-full h-full object-cover object-center">
                </div>

            </div>
        </div>

        <div class="flex justify-center mt-20 mb-20">
            <button class="bg-orange-500 text-white px-8 py-4 rounded-full text-lg hover:bg-orange-600 transition"
                onclick="window.location.href='login.html'">
                Inloggen
            </button>
        </div>
</template>

<script setup>
// logica, imports, props, reactive state
</script>

<style scoped>
/* alleen voor deze component */
</style>