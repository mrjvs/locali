<template>
  <NuxtLink :to="props.to" :class="classes" :active-class="props.exact ? '' : activeClasses" :exact-active-class="props.exact ? activeClasses : ''">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string;
  exact?: boolean;
}>();

const classes = "bg-opacity-0 hover:bg-opacity-100 hover:text-primaryContrast bg-primaryBgLighter transition duration-100 active:scale-105 rounded-full text-primaryBgSmallContrast py-1 px-4 m-0.5";
const activeClasses = "!bg-opacity-100 !text-primaryContrast";
</script>
