<template>
  <BaseLayout>
    <AuthPopulator
      @pending="(val: boolean) => (pending = val)"
      @error="(val: unknown) => (error = val)"
    />
    <div v-if="error" class="flex h-screen flex-col items-center justify-center text-error">
      <Icon name="mingcute:alert-fill" class="!mb-2 block text-lg" />
      <p class="font-bold">Couldn't load account data</p>
    </div>
    <div v-else-if="pending" class="flex h-screen text-2xl text-primary items-center justify-center">
      <Loading />
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
