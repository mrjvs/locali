<template>
  <hr :class="c(props)" />
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants';

const c = tv({
  base: 'h-px w-full border-none',
  variants: {
    type: {
      normal: 'bg-cardStroke',
      primary: 'bg-primaryBgLighter',
    }
  },
  defaultVariants: {
    type: 'normal',
  }
})

const props = defineProps<{
  type?: "normal" | "primary"
}>();
</script>
