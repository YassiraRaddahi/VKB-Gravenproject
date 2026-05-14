<template>
    <v-snackbar v-model="internalValue" :timeout="timeout" location="bottom right">
        {{ message }}

        <template v-slot:actions>
            <v-btn  @click="internalValue = false">
                Sluiten
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script setup>
import { computed } from 'vue'


const props =defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    timeout: {
        type: Number,
        default: 3000
    }
})

const emit = defineEmits(['update:modelValue'])


const internalValue = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
})


</script>

<style scoped></style>