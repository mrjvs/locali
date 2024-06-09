<template>
  <h1 :class="c(props)"><slot /></h1>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants';

const c = tv({
  base: 'text-bold',
  variants: {
    size: {
      large: 'text-2xl font-heading font-extrabold',
      sub: 'text-xl font-heading font-extrabold',
      label: 'text-lg font-sans font-bold',
      text: 'text-base font-sans font-bold',
    },
    color: {
      normal: 'text-bold',
      primary: 'text-primaryContrast',
    }
  },
  defaultVariants: {
    size: 'large',
    color: 'normal',
  }
})

const props = defineProps<{
  size?: "large" | "sub" | "label" | "text",
  color?: "primary" | "normal",
}>();
</script>
