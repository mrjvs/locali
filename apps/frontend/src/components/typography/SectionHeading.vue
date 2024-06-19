<template>
  <div class="flex mb-4">
    <div class="flex-1">
      <Heading>{{ props.title }}</Heading>
      <p v-if="props.description" class="mt-2">{{ props.description }}</p>
    </div>
    <div class="flex items-end">
      <slot name="right" />
    </div>
  </div>
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
  title: string;
  description?: string;
}>();
</script>
