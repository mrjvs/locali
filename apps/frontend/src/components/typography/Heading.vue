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
      sub: 'text-lg font-sans font-bold',
    }
  },
  defaultVariants: {
    size: 'large',
  }
})

const props = defineProps<{
  size?: "large" | "sub",
}>();
</script>
