<template>
  <div class="p-7 rounded-2xl bg-accentDimmed-c400 border">
    <h1 class="font-heading mb-3 mt-4 text-white">
      {{ props.title }}
    </h1>
    <p class="text-accentDimmed-c200">
      <slot />
    </p>
    <button class="w-full m-1.5 text-center text-neutral-c50 py-2 px-4 border border-accent-c200 from-accent-c200 to-accent-c300 bg-gradient-to-b">
      Join the waitlist!
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>
