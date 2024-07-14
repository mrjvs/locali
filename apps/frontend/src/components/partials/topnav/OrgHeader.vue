<template>
  <div class="flex items-center pb-8 pt-2">
    <div class="bg-primary block border-2 border-primaryContrast rounded-full h-28 w-28 mr-6" />
    <div class="flex-1 flex flex-col">
      <p class="font-extrabold font-heading text-primaryContrast text-lg">{{ props.org.name }}</p>
      <p class="text-primaryBgSmallContrast">{{ props.org.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OrgRes } from '~/services/api/org';

const props = defineProps<{
  org: OrgRes;
}>();
</script>
