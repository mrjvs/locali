<template>
  <div class="flex items-center">
    <div class="bg-primary rounded-full h-9 w-9 mr-3" />
    <div class="flex flex-col">
      <p class="font-bold font-heading text-bold mb-0.5">{{ props.user.name }}</p>
      <p>{{ props.user.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  user: {
    name: string;
    email: string;
  }
}>();
</script>
