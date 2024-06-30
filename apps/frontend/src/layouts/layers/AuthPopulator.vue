<template><div /></template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const { pending, error, execute } = useImmediateAction({
  action: () => authStore.retrieve()
});

const emit = defineEmits<{
  (event: 'pending', value: typeof pending.value): void;
  (event: 'error', value: typeof error.value): void;
}>();

defineExpose({
  fetch: () => execute(),
});

watch(
  [pending],
  () => {
    emit('pending', pending.value);
  },
  { immediate: true },
);
watch(
  [error],
  () => {
    emit('error', error.value);
  },
  { immediate: true },
);
</script>
