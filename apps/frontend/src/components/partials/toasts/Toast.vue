<template>
  <div class="bg-error text-errorContrast min-w-[300px] max-w-full rounded-lg flex overflow-hidden">
    <div class="px-4 flex-1 py-2 flex items-center">
      <Icon name="mingcute:alert-fill" class="mr-3 text-lg" />
      <p class="flex-1">
        <b class="font-bold">{{ props.toast.title }}</b>
        <span v-if="props.toast.description" class="ml-2 opacity-75">{{ props.toast.description }}</span>
      </p>
    </div>
    <button v-if="props.toast.button" class="bg-black bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-25 px-4 py-2 font-bold" type="button" @click="click">
      {{ props.toast.button }}
    </button>
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
