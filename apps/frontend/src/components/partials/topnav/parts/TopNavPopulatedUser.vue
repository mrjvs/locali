<template>
  <TopNavUser v-if="user" :user="user" />
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const auth = useAuthStore();
const user = computed(() => {
  if (!auth.user) return null;
  return {
    name: auth.user.user.email,
  }
});
</script>
