<template>
  <NuxtLink v-if="props.to" :to="props.to" :class="[c, conditionalClasses]" @click="click">
    <IconArrowRight v-if="props.flip && props.arrow" :class="arrowClass" />
    <slot />
    <IconArrowRight v-if="!props.flip && props.arrow" :class="arrowClass" />
  </NuxtLink>
  <button v-else :class="[c, conditionalClasses]"
    @click="click"
    >
    <IconArrowRight v-if="props.flip && props.arrow" :class="arrowClass" />
    <slot />
    <IconArrowRight v-if="!props.flip && props.arrow" :class="arrowClass" />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  to?: string;
  disabled?: boolean;
  arrow?: boolean;
  flip?: boolean;
}>();

const c = "cursor-pointer text-primary hover:text-primaryDarker group transition-colors font-bold";
const conditionalClasses = computed(() => !props.arrow ? 'hover:underline' : '');
const arrowClass = computed(() => !props.flip ? "inline-block ml-2 transition-[color,transform] group-hover:translate-x-1" : "inline-block mr-2 rotate-180 transition-[color,transform] group-hover:-translate-x-1");

const emit = defineEmits<{
  (event: "click"): void;
}>();

function click() {
  if (props.disabled) return;
  emit('click');
}
</script>
