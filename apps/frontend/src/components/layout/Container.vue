<template>
  <div :class="c({ size: props.size })">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants';

const c = tv({
  base: 'mx-auto px-4',
  variants: {
    size: {
      normal: 'max-w-[1200px] w-full',
      medium: 'max-w-[1000px] w-full',
      small: 'max-w-[750px] w-full',
    },
  },
  defaultVariants: {
    size: 'normal'
  }
})

const props = defineProps<{
  size?: "normal" | "small" | "medium";
}>();
</script>
