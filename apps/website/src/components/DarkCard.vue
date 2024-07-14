<template>
  <div class="p-7 rounded-2xl bg-accentDimmed-c400 border">
    <h1 class="font-heading text-xl font-extrabold mb-3 mt-4 text-white">
      {{ props.title }}
    </h1>
    <p class="text-accentDimmed-c100">
      <slot />
    </p>
    <button @click="scroll" class="w-full hover:to-accent-c400 active:scale-105 transition mt-6 rounded-lg text-center text-neutral-c50 py-2 px-4 border border-accent-c200 from-accent-c200 to-accent-c300 bg-gradient-to-b">
      Join the waitlist!
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();

function scroll() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
