<template>
  <div class="fixed bottom-4 right-4 flex flex-col">
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
