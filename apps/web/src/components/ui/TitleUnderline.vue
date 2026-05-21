<template>
        <div class="titlecontainer mt-16 mb-10 text-center">
            <h1 class="title" :class="underlineClass">
                {{ title }}
            </h1>
        </div>
</template>

<script setup>


const props = defineProps({
  title: {
    type: String,
    required: true
  },
  underlineClass: {
    type: String,
    default: 'underlineOrange'
  }
})


</script>

<style scoped></style>