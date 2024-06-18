<template>
  <div class="shadow-sm p-7 rounded-2xl bg-neutral-c50 border border-neutral-c300">
    <div class="h-9 w-9 bg-opacity-15 rounded-full flex items-center justify-center" :class="props.bgColorClass">
      <Icon :name="props.icon" :class="props.iconColorClass" class="text-xl" />
    </div>
    <h1 class="font-heading text-xl font-extrabold mb-3 mt-4 text-neutral-c800">
      {{ props.title }}
    </h1>
    <p>
      <slot />
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  icon: string;
  bgColorClass: string;
  iconColorClass: string;
}>();
</script>
