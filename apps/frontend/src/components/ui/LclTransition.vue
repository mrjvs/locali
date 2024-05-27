<template>
  <TransitionChild
    v-if="props.child"
    :enter="classes.enter"
    :enter-from="classes.enterFrom"
    :enter-to="classes.enterTo"
    :entered="classes.entered"
    :leave="classes.leave"
    :leave-from="classes.leaveFrom"
    :leave-to="classes.leaveTo"
  >
    <slot />
  </TransitionChild>
  <TransitionRoot
    v-else
    :show="props.show"
    :enter="classes.enter"
    :enter-from="classes.enterFrom"
    :enter-to="classes.enterTo"
    :entered="classes.entered"
    :leave="classes.leave"
    :leave-from="classes.leaveFrom"
    :leave-to="classes.leaveTo"
  >
    <slot />
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionChild, TransitionRoot } from "@headlessui/vue";

export type AnimationClasses = {
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  entered?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
};

export type Animation = "slide-from-top" | "none";
const animations: Record<Animation, AnimationClasses> = {
  "slide-from-top": {
    enter: "transition-[transform,opacity] duration-100",
    enterFrom: "opacity-0 -translate-y-2",
    enterTo: "opacity-100 translate-y-0",
    leave: "transition-[transform,opacity] duration-100",
    leaveFrom: "opacity-100 translate-y-0",
    leaveTo: "opacity-0 -translate-y-2",
  },
  "none": {},
};

const props = defineProps<{
  child?: boolean;
  show?: boolean;
  animation: Animation;
}>();

const classes = computed(() => animations[props.animation]);
</script>
