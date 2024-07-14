<template>
  <div class="fixed z-50 flex justify-center items-center inset-0">
    <div
      class="absolute inset-0 bg-black bg-opacity-40"
      @click="emit('click')"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: 'click'): void;
}>();
</script>
