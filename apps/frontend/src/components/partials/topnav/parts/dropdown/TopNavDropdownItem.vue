<template>
  <NuxtLink v-if="props.to" :to="props.to" :class="classes">
    <Icon v-if="props.icon" :name="props.icon" class="text-lg mr-2" />
    <span>
      <slot />
    </span>
  </NuxtLink>
  <button v-else :class="classes" @click="emit('click')">
    <Icon v-if="props.icon" :name="props.icon" class="text-lg mr-2" />
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: string;
  active?: boolean;
  to?: string;
}>();

const emit = defineEmits<{
  (event: "click"): void;
}>();

const classes = computed(() => [
  props.active ? 'text-bold !bg-opacity-100' : 'text-text hover:text-bold hover:bg-opacity-100',
  'group flex items-center rounded-md transition active:scale-105 duration-100 px-2 py-1.5 bg-cardShade bg-opacity-0',
])
</script>
