<template>
  <div class="fixed bottom-4 inset-x-0 flex flex-col items-center">
    <div v-for="t of toasts.all" :key="t.id" class="mt-4">
      <LclTransition animation="slide-from-top" :show="t.state === 'showing'">
        <Toast :toast="t.toast" />
      </LclTransition>
    </div>
  </div>
</template>

<script setup lang="ts">
const toasts = useToasts();
</script>
