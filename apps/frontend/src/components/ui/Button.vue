<template>
  <NuxtLink v-if="props.to" :to="props.to" :class="c({
    align: props.align,
    type: props.type,
    disabled: props.disabled,
    size: props.size,
  })" @click="click">
    <span :class="{
      'opacity-0': props.pending,
    }">
      <slot />
    </span>
    <span v-if="props.pending" :class="{
      'absolute inset-0 flex items-center justify-center': true,
    }">
      <Loading />
    </span>
  </NuxtLink>
  <button v-else :class="c({
    align: props.align,
    type: props.type,
    disabled: props.disabled,
    size: props.size,
  })"
    @click="click"
    >
    <span :class="{
      'opacity-0': props.pending,
    }">
      <slot />
    </span>
    <span v-if="props.pending" :class="{
      'absolute inset-0 flex items-center justify-center': true,
    }">
      <Loading />
    </span>
  </button>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants';

const c = tv({
  base: 'rounded-xl border-2 text-center cursor-pointer relative',
  variants: {
    align: {
      stretch: 'w-full',
      hug: '',
    },
    type: {
      primary: 'bg-gradient-to-b border-primaryLighter from-primaryLighter to-primary hover:from-primary hover:border-primary hover:to-primaryDarker transition-[background,border-color,transform] text-primaryContrast active:scale-105',
      secondary: '',
    },
    size: {
      wide: 'py-2 px-12',
      normal: 'py-2 px-5',
    },
    disabled: {
      true: 'text-opacity-25 opacity-75 pointer-events-none',
    }
  },
  defaultVariants: {
    align: 'hug',
    type: 'primary',
    size: 'normal'
  }
})

const props = defineProps<{
  align?: 'stretch' | 'hug';
  type?: "primary" | "secondary";
  size?: "wide" | "normal";
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
