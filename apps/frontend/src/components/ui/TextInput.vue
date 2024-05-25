<template>
  <div class="my-2">
    <label v-if="props.label">{{ props.label }}</label>
    <input :type="props.type ?? 'text'" v-model="text" :placeholder="props.placeholder" class="w-full border px-2 py-1" />
  </div>
</template>

<script setup lang="ts">
const text = defineModel();
const props = defineProps<{
  label?: string;
  placeholder?: string;
  type?: 'text' | "password",
}>();
</script>
