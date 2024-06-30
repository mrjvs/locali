<template>
  <div class="flex mb-5">
    <div class="flex-1">
      <Heading>{{ props.title }}</Heading>
      <p v-if="props.description" class="mt-2">{{ props.description }}</p>
    </div>
    <div class="flex items-end">
      <slot name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description?: string;
}>();
</script>
