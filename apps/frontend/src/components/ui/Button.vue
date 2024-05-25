<template>
  <NuxtLink v-if="props.to" :class="c({
    align: props.align,
    type: props.type,
    disabled: props.disabled,
  })" @click="click">
    <slot />
  </NuxtLink>
  <button v-else :class="c({
    align: props.align,
    type: props.type,
    disabled: props.disabled,
  })"
    @click="click"
    >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants';

const c = tv({
  base: 'rounded-md py-2 px-5 border',
  variants: {
    align: {
      stretch: 'w-full',
      hug: '',
    },
    type: {
      primary: '',
      secondary: '',
    },
    disabled: {
      true: 'text-opacity-25 opacity-75 pointer-events-none',
    }
  },
  defaultVariants: {
    align: 'hug',
    type: 'primary',
  }
})

const props = defineProps<{
  align?: 'stretch' | 'hug';
  type?: "primary" | "secondary";
  to?: string;
  disabled?: boolean;
  pending?: boolean;
}>();

const emit = defineEmits<{
  (event: "click"): void;
}>();

function click() {
  if (props.disabled || props.pending) return;
  emit('click');
}
</script>
