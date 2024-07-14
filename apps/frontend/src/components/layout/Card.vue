<template>
  <div :class="c(props)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants';

const c = tv({
  variants: {
    padding: {
      sm: 'p-4',
      md: 'p-8',
      none: '',
    },
    type: {
      normal: 'rounded-lg border border-cardStroke bg-card shadow-sm shadow-shadowColor/5',
      primary: 'rounded-lg bg-primaryBgDarker shadow-shadowColor/5'
    }
  },
  defaultVariants: {
    type: 'normal',
    padding: "sm",
  }
})

const props = defineProps<{
  padding?: "sm" | "md" | "none",
  type?: "normal" | "primary"
}>();
</script>
