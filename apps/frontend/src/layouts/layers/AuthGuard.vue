<template>
  <div v-if="hasUser">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const auth = useAuthStore();
const router = useRouter();
const hasUser = computed(() => auth.isAuthenticated);

const shouldShowLogin = computed(() => {
  return auth.initialized && !hasUser.value;
});

watch(
  shouldShowLogin,
  () => {
    if (shouldShowLogin.value) {
      router.push("/auth/login");
    }
  },
  { immediate: true },
);
</script>
