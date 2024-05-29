<template>
  <div class="fixed bottom-4 inset-x-0 pointer-events-none flex flex-col items-center">
    <LclTransition animation="slide-from-bottom-fade-out" group>
      <div v-for="t of showingToasts" :key="t.id" class="mt-4 pointer-events-auto">
        <Toast :toast="t.toast" />
      </div>
    </LclTransition>
  </div>
</template>

<script setup lang="ts">
const toasts = useToasts();

const showingToasts = computed(() => toasts.all.filter(v=>v.state === 'showing'))
</script>
