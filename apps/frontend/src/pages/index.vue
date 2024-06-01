<template>
  <div>
    <p>Hello world!</p>
    <hr />
    <p>Logged in: {{ auth.isAuthenticated }}</p>
    <p>User email: {{ auth.user?.user.email }}</p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const auth = useAuthStore();
</script>
