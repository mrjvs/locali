<template>
  <span class="inline-flex items-center text-primary">
    <IconLogo class="h-[2em] w-[2em]" />
    <span v-if="props.text" class="ml-2 mb-0.5 text-[1.2em] font-heading font-extrabold">Locali</span>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  text?: boolean,
}>()
</script>
