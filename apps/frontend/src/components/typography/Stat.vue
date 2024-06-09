<template>
  <div class="flex items-center my-1" :class="{
    'text-primaryBgSmallContrast': color === 'primary',
    'text-text': color === 'normal',
  }">
    <div class="mr-3">
      <slot name="icon">
        <Icon name="mingcute:alert-fill" class="text-lg" />
      </slot>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  color?: 'normal' | "primary",
}>()
const color = computed(() => props.color ?? 'normal');
</script>
