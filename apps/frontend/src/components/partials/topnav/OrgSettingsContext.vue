<template>
  <div class="flex items-center pb-8 pt-2">
    <div class="bg-primary block border-2 border-primaryContrast rounded-full h-14 w-14 mr-4" />
    <div class="flex-1 flex flex-col">
      <p class="font-extrabold font-heading text-primaryContrast text-lg">{{ props.name }}</p>
      <p class="text-primaryBgSmallContrast">Organisation</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();
</script>
