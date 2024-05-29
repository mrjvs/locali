<template>
  <div class="shadow-sm p-4 border-cardStroke max-w-full w-56 bg-card rounded-md">
    <p>{{ props.toast.type }}</p>
    <h2 class="font-bold text-bold">{{ props.toast.title }}</h2>
    <p v-if="props.toast.description">{{ props.toast.description }}</p>
    <button v-if="props.toast.button" type="button" @click="click">{{ props.toast.button }}</button>
  </div>
</template>

<script setup lang="ts">
import type { Toast } from '~/composables/useToasts';

const props = defineProps<{
  toast: Toast;
}>();

function click() {
  props.toast.onClick?.();
}
</script>
