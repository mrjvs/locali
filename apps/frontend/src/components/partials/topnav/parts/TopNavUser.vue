<template>
  <div class="flex items-center">
    <div class="bg-primary rounded-full h-7 w-7 mr-2" />
    <p>{{ props.user.name }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  user: {
    name: string;
  }
}>();
</script>
