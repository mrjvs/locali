<template>
  <div
    class="bg-card relative rounded-lg min-w-[350px] overflow-hidden max-w-full"
  >
    <div v-if="props.title" class="px-6 py-4 flex justify-between items-center">
      <Heading size="sub">{{props.title}}</Heading>
      <button v-if="props.dismissable" type="button" class="p-2 items-center rounded-full flex justify-center bg-opacity-0 bg-cardStroke active:scale-105 transition duration-100 hover:bg-opacity-100" @click="emit('close')">
        <Icon name="mingcute:close-fill" />
      </button>

    </div>
    <Divider v-if="props.title" />
    <div class="px-6 py-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  dismissable?: boolean;
  title?: string;
}>();
const emit = defineEmits<{
  (event: "close"): void;
}>();
</script>
