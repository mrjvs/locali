<template>
  <label class="block my-2">
    <Label v-if="props.label">{{ props.label }}</Label>
    <input :type="props.type ?? 'text'" v-model="text" :placeholder="props.placeholder" class="w-full border rounded-md focus:ring-0 focus:outline-none focus:border-primary shadow-input border-inputBorder transition-colors px-4 py-1.5 text-bold" />
  </label>
</template>

<script setup lang="ts">
const text = defineModel();
const props = defineProps<{
  label?: string;
  placeholder?: string;
  type?: 'text' | "password",
}>();
</script>
