<template>
  <div class="flex items-center">
    <div class="flex items-center">
      <div class="bg-primary border border-primaryContrast rounded-full h-8 w-8 mr-4" />
      <p class="text-primaryContrast font-bold">{{ props.org.name }}</p>
    </div>
    <div v-if="props.project" class="w-px mx-3 opacity-50 h-[1.5rem] rotate-6 bg-primaryBgSmallContrast" />
    <div v-if="props.project" class="flex items-center">
      <p>{{ props.project.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  org: {
    name: string;
    id: string;
  },
  project?: {
    name: string;
    id: string;
  }
}>();
</script>
