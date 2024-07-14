<template>
  <div class="mb-12">
    <p class="text-sm font-bold my-1 mx-3 opacity-50">{{ props.name }}</p>
    <div class="space-y-1 flex flex-col">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();
</script>
