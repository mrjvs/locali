<template>
  <NuxtLink :to="props.to" :class="classes" :active-class="props.exact ? '' : activeClasses" :exact-active-class="props.exact ? activeClasses : ''">
    <Icon v-if="props.icon" :name="props.icon" class="mr-2" />
    <span>
      <slot />
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string;
  icon?: string;
  exact?: boolean;
}>();

const classes = "bg-opacity-0 bg-card flex items-center border border-opacity-0 duration-100 rounded-md border-cardStroke hover:bg-opacity-100 hover:border-opacity-100 transition hover:text-bold text-text py-1 px-3";
const activeClasses = "!bg-opacity-100 !border-opacity-100 !text-bold";
</script>
