<template>
  <div class="flex items-center">
    <NuxtLink :to="`/org/${props.org.id}`" class="flex items-center cursor-pointer">
      <span class="bg-primary block border border-primaryContrast rounded-full h-8 w-8 mr-2" />
      <span class="text-primaryContrast font-bold bg-primaryBgLighter bg-opacity-0 hover:bg-opacity-100 active:scale-105 duration-100 transition py-1.5 px-2 rounded">{{ props.org.name }}</span>
    </NuxtLink>
    <div v-if="props.project" class="w-px mx-1 opacity-25 h-[1.5rem] rotate-6 bg-primaryBgSmallContrast" />
    <NuxtLink v-if="props.project" :to="`/org/${props.org.id}/project/${props.project.id}`" class="flex items-center cursor-pointer">
      <span class="bg-primaryBgLighter bg-opacity-0 hover:bg-opacity-100 active:scale-105 transition duration-100 py-1.5 px-2 rounded">{{ props.project.name }}</span>
    </NuxtLink>
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
