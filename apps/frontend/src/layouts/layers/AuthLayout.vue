<template>
  <BaseLayout>
    <AuthPopulator
      @pending="(val: boolean) => (pending = val)"
      @error="(val: unknown) => (error = val)"
    />
    <div v-if="error">
      <p>Failed to fetch user</p>
    </div>
    <div v-else-if="pending">
      <p>Loading...</p>
    </div>

    <AuthGuard v-else>
      <slot />
    </AuthGuard>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from './BaseLayout.vue';
import AuthPopulator from './AuthPopulator.vue';
import AuthGuard from './AuthGuard.vue';

const pending = ref(false);
const error = ref<unknown | null>(null);
</script>
