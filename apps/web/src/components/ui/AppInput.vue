<template>
  <v-text-field
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :label="label"
    :rules="rules"
    :required="required"
    :type="type"
    v-bind="$attrs"
  />
</template>

<script setup>
defineOptions({ inheritAttrs: false })

defineProps({
  modelValue: { type: String, default: '' },
  label:      { type: String, required: true },
  rules:      { type: Array,  default: () => [] },
  required:   { type: Boolean, default: false },
  type:       { type: String, default: 'text' },
})

defineEmits(['update:modelValue'])
</script>
